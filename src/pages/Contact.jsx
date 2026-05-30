import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, MessageCircle, Linkedin, Facebook, CheckCircle2, AlertCircle } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { profile, PORTFOLIO_GHL_WEBHOOK } from '../data/content.js';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      // Field shape mirrors the test payload used to map WF-PORTFOLIO in GHL.
      // Keep keys stable — renaming will silently break the GHL custom-field mappings.
      const payload = {
        name: data.name || '',
        email: data.email || '',
        company: data.company || '',
        message: data.message || '',
        source: 'portfolio_contact_form',
        page: location.pathname || '/contact',
        submitted_at: new Date().toISOString(),
      };

      if (!PORTFOLIO_GHL_WEBHOOK) {
        // Defensive: webhook not configured. Fail loudly in console, show error UI.
        // eslint-disable-next-line no-console
        console.error('PORTFOLIO_GHL_WEBHOOK is not set in content.js');
        setSubmitStatus('error');
        return;
      }

      const res = await fetch(PORTFOLIO_GHL_WEBHOOK, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <PageTransition>
      <section className="pt-20 pb-12">
        <div className="container-x">
          <Reveal>
            <div className="label">Contact</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-3xl leading-tight">
              Hiring, contracting, or just want to talk? Send a note.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl">
              Open to full-time remote, contract, or fractional engagements. Reply within hours during US business time. References available on request.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="bg-white border border-line rounded-2xl p-7 md:p-9">
              {submitStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald/15 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Thanks — message received.</h3>
                  <p className="text-body">I'll reply personally within a few hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Field label="Your name" error={errors.name?.message}>
                    <input
                      {...register('name', { required: 'Required' })}
                      placeholder="Jane Cooper"
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>

                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                      })}
                      type="email"
                      placeholder="jane@yourcompany.com"
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>

                  <Field label="Company">
                    <input
                      {...register('company')}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>

                  <Field label="What's the role / opportunity?" error={errors.message?.message}>
                    <textarea
                      {...register('message', { required: 'Required', minLength: { value: 10, message: 'A few more details please' } })}
                      rows={5}
                      placeholder="Role title, timeline, stack, team size — whatever's helpful. Or just say hi."
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10 resize-y"
                    />
                  </Field>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending…' : 'Send message →'}
                  </button>

                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Something broke. Email me directly: <a href={`mailto:${profile.email}`} className="underline font-semibold">{profile.email}</a></span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          {/* Direct contact */}
          <Reveal delay={0.1} className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-bold text-muted mb-4">Or reach me directly</div>
            <ContactCard icon={Mail} label="Email · replies in hours" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactCard icon={MessageCircle} label="WhatsApp · fastest channel" value={profile.whatsapp} href={profile.whatsappLink} />
            <ContactCard icon={Linkedin} label="LinkedIn" value="Joshua Solomon" href={profile.linkedin} />
            <ContactCard icon={Facebook} label="Facebook · Messenger" value="Joshua Solomon" href={profile.facebook} />

            <div className="pt-6 mt-6 border-t border-line text-xs text-muted leading-relaxed">
              <div className="font-bold text-ink mb-1.5">Working hours</div>
              US Eastern, 8 AM – 6 PM (Mon–Fri).
              <br />
              I respond within hours, not days. Weekends I check WhatsApp.
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-2">{label}{error && <span className="text-red-600 font-normal text-xs ml-2">{error}</span>}</span>
      {children}
    </label>
  );
}

function ContactCard({ icon: Icon, label, value, href }) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="flex items-center gap-4 p-4 bg-white border border-line rounded-xl hover:border-navy hover:shadow-soft transition-all">
      <div className="w-10 h-10 rounded-lg bg-navy-tint flex items-center justify-center text-navy flex-shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs uppercase tracking-wider text-muted font-semibold">{label}</div>
        <div className="text-sm font-semibold text-ink truncate">{value}</div>
      </div>
    </a>
  );
}
