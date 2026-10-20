import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PROJECT_HASH, profile, WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../../data/content.js';

// What the message is about. The message label and hint follow the choice.
const TOPICS = {
  role: { label: 'Hiring for a role', ask: 'What’s the role?', hint: 'Role title, timeline, stack, team size. Whatever’s helpful.' },
  project: { label: 'A project for my business', ask: 'What busywork do you want gone?', hint: 'What your team does by hand today, the tools you use and how often. A few lines is plenty.' },
  other: { label: 'Something else', ask: 'Your message', hint: 'Whatever’s on your mind. Or just say hi.' },
};

/** Label + control + error text, wired together for assistive tech. */
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle size={15} aria-hidden="true" className="flex-none" />
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * id + error wiring shared by every control. `aria-required` (not `required`)
 * tells assistive tech up front and keeps the custom error messages.
 */
function controlProps(id, error, isRequired = false) {
  return {
    id,
    className: 'field',
    'aria-required': isRequired ? 'true' : undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  };
}

/** The contact form: react-hook-form + Web3Forms + honeypot. */
export default function ContactForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { topic: '' } });
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const successHeadingRef = useRef(null);
  const topic = TOPICS[watch('topic')] ?? TOPICS.other;

  // "Ask for a free call" links to #start-a-project: land here with the business topic picked.
  useEffect(() => {
    const pickProjectFromHash = () => {
      if (window.location.hash === PROJECT_HASH) setValue('topic', 'project', { shouldValidate: true });
    };
    pickProjectFromHash();
    window.addEventListener('hashchange', pickProjectFromHash);
    return () => window.removeEventListener('hashchange', pickProjectFromHash);
  }, [setValue]);

  // The form (and the focused button) is replaced on success: move focus to the
  // confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (submitStatus === 'success') successHeadingRef.current?.focus();
  }, [submitStatus]);

  const onSubmit = async (data) => {
    // Clear the last result so a second failure is announced again.
    setSubmitStatus(null);
    try {
      // Honeypot — Web3Forms rejects the submission if `botcheck` is filled.
      // Real users never see/fill it; only bots auto-completing every field do.
      if (data.botcheck) {
        setSubmitStatus('success'); // silent success so bots don't retry
        reset();
        return;
      }

      // Web3Forms payload — `access_key` auths the request; everything else
      // is included verbatim in the email sent to solomonjoshua101602@gmail.com.
      const topicLabel = TOPICS[data.topic]?.label ?? TOPICS.other.label;
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio inquiry: ${topicLabel} — ${data.name || 'no name'}${data.company ? ` (${data.company})` : ''}`,
        from_name: 'solomonjoshua.com contact form',
        topic: topicLabel,
        name: data.name || '',
        email: data.email || '',
        company: data.company || '',
        message: data.message || '',
        source: 'portfolio_contact_form',
        page: '/#contact',
        submitted_at: new Date().toISOString(),
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) { setSubmitStatus('success'); reset(); }
      else { setSubmitStatus('error'); }
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="tile grid place-items-center py-12 text-center" role="status">
        <div>
          <CheckCircle2 size={44} aria-hidden="true" className="mx-auto text-action" />
          <h3 ref={successHeadingRef} tabIndex={-1} className="t-h3 mt-4 rounded-inner">Thanks, message received.</h3>
          <p className="mt-2 text-body">I'll reply personally within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tile">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field id="contact-topic" label="What’s it about?" error={errors.topic?.message}>
          <select
            {...register('topic', { required: 'Pick one' })}
            {...controlProps('contact-topic', errors.topic, true)}
          >
            <option value="" disabled>Choose one</option>
            {Object.entries(TOPICS).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
        <Field id="contact-name" label="Your name" error={errors.name?.message}>
          <input
            {...register('name', { required: 'Required' })}
            {...controlProps('contact-name', errors.name, true)}
            placeholder="Jane Cooper"
            autoComplete="name"
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <input
            {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
            {...controlProps('contact-email', errors.email, true)}
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </Field>
        <Field id="contact-company" label="Company (optional)">
          <input
            {...register('company')}
            {...controlProps('contact-company')}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
        <Field id="contact-message" label={topic.ask} error={errors.message?.message}>
          <textarea
            {...register('message', { required: 'Required', minLength: { value: 10, message: 'A few more details please' } })}
            {...controlProps('contact-message', errors.message, true)}
            rows={5}
            placeholder={topic.hint}
            style={{ resize: 'vertical' }}
          />
        </Field>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        {submitStatus === 'error' && (
          <div role="alert" className="flex items-start gap-2 rounded-inner border-[1.5px] border-danger bg-card p-3 text-sm font-medium text-danger">
            <AlertCircle size={16} aria-hidden="true" className="mt-0.5 flex-none" />
            <span className="wrap-anywhere min-w-0">
              Something broke. Email me directly:{' '}
              <a href={`mailto:${profile.email}`} className="font-semibold underline">{profile.email}</a>
            </span>
          </div>
        )}
        {/* Honeypot — hidden from humans, bots fill it and get rejected. Last in
            the form so it does not push the first field down (space-y). */}
        <input
          type="checkbox"
          {...register('botcheck')}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, opacity: 0 }}
          aria-hidden="true"
        />
      </form>
    </div>
  );
}
