import { useEffect, useId, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, Check, Inbox, Loader2, Send, ShieldAlert, Trash2 } from 'lucide-react';
import Pipeline, { pipeStates } from './Pipeline.jsx';
import { lengthHint, useStepTicker } from './controls.jsx';
import { postPlay } from './api.js';
import { CALL_HREF, CALL_LABEL } from '../../data/play.js';

const MIN_CHARS = 15;
const MAX_CHARS = 3000;
const BUSINESS = 'Northside Plumbing & Heating';

const STAGES = [
  { label: 'Received', caption: 'The enquiry lands' },
  { label: 'Classified', caption: 'Type, urgency, spam risk' },
  { label: 'Drafted', caption: 'A short reply' },
  { label: 'Your approval', caption: 'Nothing goes out without it' },
];

const SAMPLES = [
  { label: 'Burst pipe', text: 'HELP. A pipe under the kitchen sink just burst and there is water everywhere. I turned the tap off but it is still dripping. I am in Maple Heights. Can anyone come right now?? Call 555-0142' },
  { label: 'Water heater quote', text: 'Hi there, our water heater is about 14 years old and we are thinking about replacing it before winter. Could you give us a rough idea of the cost and how long the install takes? Thanks, Priya' },
  { label: 'Vague message', text: 'hey do you guys do bathrooms' },
  { label: 'SEO pitch', text: 'Hello! I noticed your website is not on page 1 of Google. Our team guarantees top rankings and 50 new leads a month for only $299. Reply YES and I will send you a free audit.' },
  { label: 'Payment scam', text: 'Dear vendor, your invoice #44821 is overdue. To avoid service suspension please verify your account and pay with the secure link below within 24 hours: http://pay-portal-verify.example' },
];

const CATEGORY_LABEL = {
  new_job: 'New job', quote_request: 'Quote request', emergency: 'Emergency', existing_customer: 'Existing customer',
  complaint: 'Complaint', sales_pitch: 'Sales pitch', spam_or_scam: 'Spam or scam', other: 'Other',
};
const URGENCY = [
  { id: 'no_rush', label: 'No rush' },
  { id: 'this_week', label: 'This week' },
  { id: 'today', label: 'Today' },
  { id: 'emergency', label: 'Emergency' },
];

function UrgencyMeter({ urgency }) {
  const level = URGENCY.findIndex((u) => u.id === urgency);
  return (
    <div>
      <p className="label">Urgency</p>
      <p className="mt-1 t-h3">{URGENCY[level]?.label ?? 'Unclear'}</p>
      <div className="play-meter mt-2" data-level={level} aria-hidden="true">
        {URGENCY.map((u, i) => <span key={u.id} data-on={i <= level} />)}
      </div>
    </div>
  );
}

function TriageCard({ result, isMock, headingRef }) {
  const risk = result.spam_risk;
  return (
    <div className="tile flex min-w-0 flex-col">
      <h3 ref={headingRef} tabIndex={-1} className="label">
        Triage{isMock && <span className="play-mock play-mock--light">Demo answer</span>}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="play-badge" data-kind={result.category}>{CATEGORY_LABEL[result.category] ?? 'Other'}</span>
        <span className="play-badge" data-risk={risk}>
          {risk === 'low' ? <Check size={14} aria-hidden="true" /> : <ShieldAlert size={14} aria-hidden="true" />}
          Spam risk: {risk}
        </span>
      </div>
      <p className="t-h3 mt-4">{result.job_type}</p>
      <p className="mt-1 text-body">{result.summary}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <UrgencyMeter urgency={result.urgency} />
          {result.urgency_reason && <p className="mt-2 text-sm text-body">{result.urgency_reason}</p>}
        </div>
        <div>
          <p className="label">Still missing</p>
          {result.missing_info.length ? (
            <ul className="mt-2 space-y-1.5">
              {result.missing_info.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-ink">
                  <span aria-hidden="true" className="mt-[.45rem] h-1.5 w-1.5 flex-none rounded-full bg-action" />{item}
                </li>
              ))}
            </ul>
          ) : <p className="mt-2 text-sm text-body">Nothing important.</p>}
        </div>
      </div>

      {result.spam_signals.length > 0 && (
        <div className="mt-5 rounded-inner bg-sunk p-3">
          <p className="label flex items-center gap-1.5"><AlertTriangle size={14} aria-hidden="true" /> Warning signs</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {result.spam_signals.map((signal) => <li key={signal} className="play-tool">{signal}</li>)}
          </ul>
        </div>
      )}
      {result.note_for_owner && (
        <p className="mt-auto pt-5 text-sm font-semibold text-ink">For you: <span className="font-medium text-body">{result.note_for_owner}</span></p>
      )}
    </div>
  );
}

function ReplyCard({ result, decision, onDecide }) {
  const [draft, setDraft] = useState(result.reply_draft);
  const draftId = useId();

  if (!result.reply_draft) {
    return (
      <div className="tile play-dashed flex min-w-0 flex-col">
        <p className="label">Reply</p>
        <p className="t-h3 mt-3">No reply drafted.</p>
        <p className="mt-2 text-body">This looks like spam, a scam or a sales pitch, so the system doesn’t draft one. In a real setup it would be filed away, and you could still open it.</p>
      </div>
    );
  }

  if (decision) {
    const isSent = decision === 'sent';
    return (
      <div className={`tile flex min-w-0 flex-col ${isSent ? 'tile--lime' : 'play-dashed'}`}>
        <p className="label">{isSent ? 'Approved' : 'Discarded'}</p>
        <p className="t-h3 mt-3">{isSent ? 'Sent (simulated).' : 'Reply discarded.'}</p>
        <p className="mt-2 text-ink">
          {isSent
            ? 'Nothing actually left this page. In a real setup this reply would go out from your own email or SMS tool, and the enquiry would move to “Waiting on customer”.'
            : 'Nothing was sent. In a real setup the enquiry stays in your inbox for you to answer yourself.'}
        </p>
        {isSent && <blockquote className="play-quote mt-4">{draft}</blockquote>}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <button type="button" className="btn btn-secondary" onClick={() => onDecide(null)}>Back to the draft</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tile tile--ink on-ink flex min-w-0 flex-col">
      <label htmlFor={draftId} className="label">Draft reply · edit it if you like</label>
      <textarea id={draftId} className="field play-reply mt-3" value={draft} onChange={(event) => setDraft(event.target.value)} />
      <p className="mt-2 text-sm text-mist-dim">Written for this enquiry by Claude. It never promises prices or times: a person confirms those.</p>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
        <button type="button" className="btn btn-primary" onClick={() => onDecide('sent')} disabled={!draft.trim()}>
          <Send size={17} aria-hidden="true" /> Approve &amp; send (simulated)
        </button>
        <button type="button" className="btn play-btn-ghost" onClick={() => onDecide('discarded')}>
          <Trash2 size={17} aria-hidden="true" /> Discard
        </button>
      </div>
    </div>
  );
}

/** Lead triage playground: paste an enquiry, watch it get sorted, approve the reply. */
export default function LeadTriage() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [decision, setDecision] = useState(null);
  const [runId, setRunId] = useState(0);
  const textareaRef = useRef(null);
  const resultRef = useRef(null);
  const ids = { text: useId(), hint: useId() };
  const isRunning = status === 'running';
  const step = useStepTicker(isRunning, 3, 1100);
  const count = text.trim().length;
  const isTooLong = count > MAX_CHARS;

  useEffect(() => {
    if (status === 'done') resultRef.current?.focus();
  }, [status]);

  const handleSample = (sample) => {
    setText(sample.text);
    setFormError('');
    textareaRef.current?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRunning) return;
    if (count < MIN_CHARS || count > MAX_CHARS) {
      setFormError(lengthHint(count, MIN_CHARS, MAX_CHARS));
      textareaRef.current?.focus();
      return;
    }
    setStatus('running');
    setError('');
    setFormError('');
    setAnswer(null);
    setDecision(null);
    const { data, error: message } = await postPlay('/api/play/triage', { text: text.trim() });
    if (data) {
      setAnswer({ result: data.result, isMock: Boolean(data.mock) });
      setRunId((n) => n + 1);
      setStatus('done');
    } else {
      setError(message);
      setStatus('error');
    }
  };

  let states = pipeStates(STAGES.length, -1);
  if (isRunning) states = pipeStates(STAGES.length, step);
  if (status === 'done') {
    const hasReply = Boolean(answer?.result.reply_draft);
    states = hasReply ? pipeStates(STAGES.length, 3, { finished: Boolean(decision) }) : ['done', 'done', 'idle', 'idle'];
  }
  const stageNote = status === 'done' && !decision && answer?.result.reply_draft ? 'Waiting for your approval' : '';

  return (
    <section aria-labelledby="demo-title" className="play-demo">
      <h2 id="demo-title" className="sr-only">Try it</h2>
      <div className="tile">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label flex items-center gap-2"><Inbox size={16} aria-hidden="true" /> Inbox of {BUSINESS} <span className="play-tag">demo business</span></p>
          {stageNote && <p className="play-pulse-note text-sm font-bold text-ink">{stageNote}</p>}
        </div>
        <div className="mt-5"><Pipeline steps={STAGES} states={states} label="Enquiry pipeline" /></div>
      </div>

      <div className="split mt-[var(--gap)]">
        <form onSubmit={handleSubmit} className="tile tile--ink on-ink flex min-w-0 flex-col" noValidate>
          <p className="label"><span className="label-num">01</span> The enquiry</p>
          <p className="mt-4 text-sm font-semibold text-mist">Pick a sample</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SAMPLES.map((sample) => (
              <button key={sample.label} type="button" className="play-chip" aria-pressed={text === sample.text} onClick={() => handleSample(sample)} disabled={isRunning}>
                {sample.label}
              </button>
            ))}
          </div>
          <label htmlFor={ids.text} className="mt-4 block text-sm font-semibold text-mist">…or paste your own</label>
          <textarea
            id={ids.text}
            ref={textareaRef}
            className="field play-textarea mt-1.5"
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-describedby={ids.hint}
            aria-invalid={isTooLong || undefined}
            placeholder="Paste a customer email, form message or text."
          />
          <p id={ids.hint} className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm font-medium">
            <span className={isTooLong ? 'play-warn' : 'text-mist-dim'}>{lengthHint(count, MIN_CHARS, MAX_CHARS)}</span>
            <span className={`font-mono text-xs ${isTooLong ? 'play-warn' : 'text-mist-dim'}`}>{count} / {MAX_CHARS.toLocaleString('en-US')}</span>
          </p>
          {formError && <p role="alert" className="play-warn mt-3 text-sm font-semibold">{formError}</p>}
          <div className="mt-5">
            <button type="submit" className="btn btn-primary" aria-disabled={isRunning}>
              {isRunning ? <Loader2 size={18} aria-hidden="true" className="play-spin" /> : <ArrowRight size={18} aria-hidden="true" />}
              {isRunning ? 'Triaging…' : 'Triage it'}
            </button>
          </div>
          <p className="label mt-auto pt-6">Claude Opus 5.5 · nothing is sent · your text isn’t stored</p>
        </form>

        {answer && status === 'done' ? (
          <TriageCard result={answer.result} isMock={answer.isMock} headingRef={resultRef} />
        ) : (
          <div className="tile play-dashed flex min-w-0 flex-col justify-center">
            <p className="label">02 · The triage</p>
            <p className="t-h3 mt-3">{isRunning ? 'Reading the enquiry…' : 'Pick a sample or paste an enquiry.'}</p>
            <p className="mt-2 text-body">You’ll see the job type, how urgent it is, whether it looks like spam or a scam, what’s missing, and a reply waiting for your yes.</p>
          </div>
        )}
      </div>

      {answer && status === 'done' && (
        <div className="split split--rev mt-[var(--gap)]">
          <ReplyCard key={runId} result={answer.result} decision={decision} onDecide={setDecision} />
          <div className="tile flex min-w-0 flex-col">
            <p className="label">For your business</p>
            <p className="t-h3 mt-3">The same triage, on your real inbox.</p>
            <p className="mt-2 text-body">Your email, forms or texts, your job types and your tone of voice, with you approving every reply until you trust it.</p>
            <div className="mt-auto pt-5">
              <a href={CALL_HREF} className="btn btn-primary">{CALL_LABEL} <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {isRunning && 'Triaging the enquiry.'}
        {status === 'done' && answer && `Triage done: ${CATEGORY_LABEL[answer.result.category]}, urgency ${answer.result.urgency.replace('_', ' ')}, spam risk ${answer.result.spam_risk}. ${answer.result.reply_draft ? 'A reply is waiting for your approval.' : 'No reply drafted.'}`}
        {decision === 'sent' && 'Reply approved. Sent, simulated: nothing left this page.'}
        {decision === 'discarded' && 'Reply discarded.'}
      </div>

      {status === 'error' && (
        <div role="alert" className="tile play-error mt-[var(--gap)]">
          <p className="font-semibold text-ink">{error}</p>
        </div>
      )}
    </section>
  );
}
