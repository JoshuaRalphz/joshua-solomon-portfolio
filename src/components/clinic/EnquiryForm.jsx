import { useId } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { CLINIC, FORM_TREATMENTS, MAX_MESSAGE } from '../../../functions/_lib/demo/clinicShared.js';
import { SAMPLES } from './samples.js';

/** The fictional clinic's website form, in a browser frame, with one-click sample enquiries above it. */
export default function EnquiryForm({ form, onChange, onSample, onSubmit, activeSample, isRunning, formError }) {
  const id = useId();
  const field = (name) => ({
    id: `${id}-${name}`,
    name,
    value: form[name],
    onChange: (event) => onChange({ ...form, [name]: event.target.value }),
  });
  const count = form.message.trim().length;

  return (
    <div className="flex min-w-0 flex-col gap-[var(--gap)]">
      <div className="tile tile--ink on-ink">
        <p className="label"><span className="label-num">01</span> Pick a sample enquiry · all fictional</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Sample enquiries">
          {SAMPLES.map((sample) => (
            <button key={sample.id} type="button" className="cl-chip" aria-pressed={activeSample === sample.id} onClick={() => onSample(sample)} disabled={isRunning}>
              {sample.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-mist-dim">Or type your own into the form. It goes to Claude and is not kept by this site.</p>
      </div>

      <div className="shot-frame">
        <div className="shot-bar items-center"><i /><i /><i /><span className="cl-url">northlight-aesthetics.example/contact</span></div>
        <form onSubmit={onSubmit} className="cl-site p-[var(--pad)]" noValidate aria-label={`${CLINIC} enquiry form`}>
          <p className="cl-site-brand">{CLINIC}</p>
          <h2 className="t-h3 mt-1">Book a consultation or ask us anything</h2>
          <div className="cl-fields mt-4">
            <div className="cl-span">
              <label htmlFor={`${id}-name`} className="cl-label">Name</label>
              <input {...field('name')} className="field mt-1" autoComplete="off" maxLength={80} required />
            </div>
            <div>
              <label htmlFor={`${id}-phone`} className="cl-label">Phone</label>
              <input {...field('phone')} type="tel" className="field mt-1" autoComplete="off" maxLength={24} />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className="cl-label">Email</label>
              <input {...field('email')} type="email" className="field mt-1" autoComplete="off" maxLength={120} />
            </div>
            <div className="cl-span">
              <label htmlFor={`${id}-treatment`} className="cl-label">Treatment you are interested in</label>
              <select {...field('treatment')} className="field mt-1">
                <option value="">Choose one</option>
                {FORM_TREATMENTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="cl-span">
              <label htmlFor={`${id}-message`} className="cl-label">Message</label>
              <textarea {...field('message')} className="field cl-textarea mt-1" maxLength={MAX_MESSAGE + 200} aria-describedby={`${id}-count`} />
              <p id={`${id}-count`} className="mt-1 text-right font-mono text-xs text-muted">{count} / {MAX_MESSAGE.toLocaleString('en-US')}</p>
            </div>
            <label className="cl-span cl-consent">
              <input type="checkbox" checked={form.smsConsent} onChange={(event) => onChange({ ...form, smsConsent: event.target.checked })} />
              <span>I agree to get text messages from {CLINIC} about my enquiry. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
            </label>
          </div>
          {formError && <p role="alert" className="mt-3 text-sm font-semibold text-danger">{formError}</p>}
          <button type="submit" className="btn btn-ink mt-4 w-full sm:w-auto" aria-disabled={isRunning}>
            {isRunning ? <Loader2 size={18} aria-hidden="true" className="cl-spin" /> : <ArrowRight size={18} aria-hidden="true" />}
            {isRunning ? 'Sorting the enquiry…' : 'Send enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
