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
  const fromPlan = location.state?.recommendation;

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
        from_planner: Boolean(fromPlan),
        plan_tier_name: fromPlan ? fromPlan.tier.name : '',
        plan_tier_label: fromPlan ? fromPlan.tier.label : '',
        plan_setup_fee: fromPlan ? fromPlan.setupFee : '',
        plan_monthly_total: fromPlan ? fromPlan.monthlyTotal : '',
        plan_first_invoice: fromPlan ? fromPlan.firstInvoice : '',
        plan_year1_total: fromPlan ? fromPlan.year1Total : '',
        plan_live_by: fromPlan ? fromPlan.liveBy : '',
        plan_recs: fromPlan ? fromPlan.recs.map(r => `${r.tag}: ${r.service}`).join(' | ') : '',
        plan_addons: fromPlan && fromPlan.addOnSuggestions?.length
          ? fromPlan.addOnSuggestions.map(a => `${a.name} (${a.price})`).join(' | ')
          : '',
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
              Tell me what's broken. I'll reply within hours.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl">
              {fromPlan
                ? 'Your project plan is attached to this message. I\'ll send back a scoped proposal within a few hours.'
                : 'Send a short note about what you\'re trying to fix. No long sales process — async-first, one message, one reply, then a scoped proposal back within hours.'}
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
                  {fromPlan && (
                    <div className="bg-navy-tint border border-navy/15 rounded-lg p-4 text-sm text-navy">
                      <div className="font-bold mb-1">✓ Your project plan will be attached</div>
                      <div className="text-xs text-navy/75">{fromPlan.tier.name} tier ({fromPlan.tier.label}) · First invoice: {fromPlan.firstInvoice} · Live by: {fromPlan.liveBy}</div>
                    </div>
                  )}

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

                  <Field label="Company / business">
                    <input
                      {...register('company')}
                      placeholder="Acme Marketing"
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>

                  <Field label="What are you trying to fix?" error={errors.message?.message}>
                    <textarea
                      {...register('message', { required: 'Required', minLength: { value: 10, message: 'A few more details please' } })}
                      rows={5}
                      placeholder="Quick context on your current stack and what's broken..."
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10 resize-y"
                    />
                  </Field>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending…' : 'Send message →'}
                  </button>

                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Something broke. Email me directly: <a href="mailto:solomonjoshua101602@gmail.com" className="underline font-semibold">{profile.email}</a></span>
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
