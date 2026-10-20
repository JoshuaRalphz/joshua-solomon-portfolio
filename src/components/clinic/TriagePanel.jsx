import { useId, useState } from 'react';
import { AlertTriangle, Check, Mail, MessageSquare, Send, ShieldAlert, Stethoscope, Trash2 } from 'lucide-react';

export const TREATMENT_LABEL = {
  botox: 'Botox / anti-wrinkle', fillers: 'Dermal fillers', glp1_weight_loss: 'GLP-1 weight loss', skin: 'Skin treatment',
  consultation: 'Consultation', other: 'Other / unclear', none: 'No treatment',
};
export const INTENT_LABEL = {
  book: 'Wants to book', price_question: 'Price question', aftercare_concern: 'Aftercare concern', general_question: 'General question', spam: 'Spam',
};
const URGENCY = [
  { id: 'no_rush', label: 'No rush' },
  { id: 'this_week', label: 'This week' },
  { id: 'today', label: 'Today' },
  { id: 'urgent', label: 'Urgent' },
];

function Score({ score, temperature, blocked }) {
  return (
    <div>
      <p className="label">Lead score</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="t-num text-ink">{score}</span>
        <span className="text-sm font-bold text-ink">{blocked ? 'filtered' : `${temperature} lead`}</span>
      </p>
      <div className="cl-bar mt-2" aria-hidden="true"><span style={{ transform: `scaleX(${score / 100})` }} data-temp={blocked ? 'none' : temperature} /></div>
    </div>
  );
}

function Urgency({ urgency, reason }) {
  const level = URGENCY.findIndex((u) => u.id === urgency);
  return (
    <div>
      <p className="label">Urgency</p>
      <p className="mt-1 t-h3">{URGENCY[level]?.label ?? 'Unclear'}</p>
      <div className="cl-meter mt-2" data-level={level} aria-hidden="true">
        {URGENCY.map((u, i) => <span key={u.id} data-on={i <= level} />)}
      </div>
      {reason && <p className="mt-2 text-sm text-body">{reason}</p>}
    </div>
  );
}

/** What Claude decided about the enquiry (after the server's checks). */
export function TriageCard({ result, isMock, costUsd, headingRef }) {
  return (
    <div className="tile flex min-w-0 flex-col">
      <h2 ref={headingRef} tabIndex={-1} className="label">
        <span className="label-num">02</span> Claude’s triage{isMock && <span className="cl-mock">Mock answer (local)</span>}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="cl-badge" data-kind={result.intent}>{INTENT_LABEL[result.intent]}</span>
        <span className="cl-badge">{TREATMENT_LABEL[result.treatment]}</span>
        <span className="cl-badge" data-risk={result.spam_risk}>
          {result.spam_risk === 'low' ? <Check size={14} aria-hidden="true" /> : <ShieldAlert size={14} aria-hidden="true" />} Spam risk: {result.spam_risk}
        </span>
        {result.existing_patient && <span className="cl-badge">Existing patient</span>}
      </div>
      <p className="mt-4 text-ink">{result.summary}</p>

      {result.injection_attempt && (
        <div className="cl-alert mt-4" data-tone="danger">
          <ShieldAlert size={18} aria-hidden="true" className="flex-none" />
          <p><strong>Prompt injection caught.</strong> The message tried to give the assistant orders. Code drops every draft and sends it to a person.</p>
        </div>
      )}
      {result.needs_nurse && (
        <div className="cl-alert mt-4" data-tone={result.urgency === 'urgent' ? 'danger' : 'ink'}>
          <Stethoscope size={18} aria-hidden="true" className="flex-none" />
          <p><strong>Goes to the nurse.</strong> {result.nurse_reason} The assistant never gives medical advice.</p>
        </div>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Score score={result.lead_score} temperature={result.ghl.temperature} blocked={result.blocked} />
          {result.score_reason && <p className="mt-2 text-sm text-body">{result.score_reason}</p>}
        </div>
        <Urgency urgency={result.urgency} reason={result.urgency_reason} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="label">Still missing</p>
          {result.missing_info.length ? (
            <ul className="mt-2 space-y-1.5">
              {result.missing_info.map((item) => <li key={item} className="cl-li">{item}</li>)}
            </ul>
          ) : <p className="mt-2 text-sm text-body">Nothing the front desk needs.</p>}
        </div>
        {result.spam_signals.length > 0 && (
          <div>
            <p className="label flex items-center gap-1.5"><AlertTriangle size={14} aria-hidden="true" /> Warning signs</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {result.spam_signals.map((signal) => <li key={signal} className="cl-tool">{signal}</li>)}
            </ul>
          </div>
        )}
      </div>
      {result.note_for_staff && <p className="mt-5 text-sm font-semibold text-ink">For staff: <span className="font-medium text-body">{result.note_for_staff}</span></p>}
      <p className="label mt-auto pt-5">Claude Opus 5.5{typeof costUsd === 'number' && !isMock ? ` · this run cost $${costUsd.toFixed(3)}` : ''}</p>
    </div>
  );
}

/** The drafted SMS and email, editable, waiting for a person. Approval is simulated. */
export function DraftsCard({ result, decision, onDecide }) {
  const { canSms, canEmail } = result.ghl;
  const [sms, setSms] = useState(result.sms_draft);
  const [subject, setSubject] = useState(result.email_subject);
  const [body, setBody] = useState(result.email_draft);
  const ids = { sms: useId(), subject: useId(), body: useId() };
  const smsStep = result.ghl.steps.find((s) => s.id === 'sms');
  const emailStep = result.ghl.steps.find((s) => s.id === 'email');

  if (!canSms && !canEmail) {
    return (
      <div className="tile cl-dashed flex min-w-0 flex-col">
        <p className="label"><span className="label-num">03</span> Replies</p>
        <p className="t-h3 mt-3">No reply drafted.</p>
        <p className="mt-2 text-body">{result.blocked ? 'Spam and flagged messages never get a reply. The code decides this, whatever the model writes.' : 'There is no way to reach this person that the clinic is allowed to use.'}</p>
      </div>
    );
  }

  if (decision) {
    const isSent = decision === 'sent';
    return (
      <div className={`tile flex min-w-0 flex-col ${isSent ? 'tile--lime' : 'cl-dashed'}`}>
        <p className="label"><span className="label-num">03</span> {isSent ? 'Approved' : 'Discarded'}</p>
        <p className="t-h3 mt-3">{isSent ? 'Sent (simulated).' : 'Replies discarded.'}</p>
        <p className="mt-2 text-ink">
          {isSent
            ? `Nothing left this page. In GoHighLevel the approved replies would go out from the clinic’s own number and email${result.ghl.stage === 'new_lead' ? ', and the lead would move to “Contacted”' : ''}.`
            : 'Nothing was sent. The task stays with the front desk to answer by hand.'}
        </p>
        <div className="mt-auto pt-5"><button type="button" className="btn btn-secondary" onClick={() => onDecide(null)}>Back to the drafts</button></div>
      </div>
    );
  }

  return (
    <div className="tile tile--ink on-ink flex min-w-0 flex-col">
      <p className="label"><span className="label-num">03</span> Replies waiting for approval · edit them if you like</p>
      {canSms ? (
        <div className="mt-4">
          <label htmlFor={ids.sms} className="flex items-center gap-2 text-sm font-semibold text-mist"><MessageSquare size={16} aria-hidden="true" /> SMS</label>
          <textarea id={ids.sms} className="field cl-sms mt-1.5" value={sms} onChange={(e) => setSms(e.target.value)} maxLength={480} />
          <p className="mt-1 text-right font-mono text-xs text-mist-dim">{sms.length} characters</p>
        </div>
      ) : <p className="mt-4 text-sm text-mist-dim"><MessageSquare size={14} aria-hidden="true" className="mr-1 inline" />SMS skipped: {smsStep?.detail}</p>}
      {canEmail ? (
        <div className="mt-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-mist"><Mail size={16} aria-hidden="true" /> Email</p>
          <label htmlFor={ids.subject} className="sr-only">Email subject</label>
          <input id={ids.subject} className="field mt-1.5 font-semibold" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={120} />
          <label htmlFor={ids.body} className="sr-only">Email body</label>
          <textarea id={ids.body} className="field cl-email mt-2" value={body} onChange={(e) => setBody(e.target.value)} maxLength={2000} />
        </div>
      ) : <p className="mt-4 text-sm text-mist-dim"><Mail size={14} aria-hidden="true" className="mr-1 inline" />Email skipped: {emailStep?.detail}</p>}
      <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
        <button type="button" className="btn btn-primary" onClick={() => onDecide('sent')} disabled={(canSms && !sms.trim()) || (canEmail && !body.trim())}>
          <Send size={17} aria-hidden="true" /> Approve and send (simulated)
        </button>
        <button type="button" className="btn cl-btn-ghost" onClick={() => onDecide('discarded')}>
          <Trash2 size={17} aria-hidden="true" /> Discard
        </button>
      </div>
    </div>
  );
}
