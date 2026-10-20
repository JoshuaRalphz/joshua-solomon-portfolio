import { useEffect, useRef, useState } from 'react';
import { MAX_MESSAGE, MIN_MESSAGE } from '../../../functions/_lib/demo/clinicShared.js';
import EnquiryForm from './EnquiryForm.jsx';
import { DraftsCard, TriageCard, INTENT_LABEL } from './TriagePanel.jsx';
import GhlPanel from './GhlPanel.jsx';
import { EMPTY_FORM } from './samples.js';
import { postDemo } from './api.js';
import './clinic.css';

const WORKING = ['Reading the enquiry', 'Classifying: treatment, intent, urgency', 'Checking for medical, spam and injection', 'Drafting the SMS and email'];
const TICK_MS = 1400;

function checkForm(form) {
  if (!form.name.trim()) return 'Add a name.';
  if (!form.phone.trim() && !form.email.trim()) return 'Add a phone number or an email address.';
  const count = form.message.trim().length;
  if (count < MIN_MESSAGE) return `Add a message (at least ${MIN_MESSAGE} characters).`;
  if (count > MAX_MESSAGE) return `Keep the message under ${MAX_MESSAGE.toLocaleString('en-US')} characters.`;
  return '';
}

function Waiting({ step, isRunning }) {
  return (
    <div className="tile cl-dashed flex min-w-0 flex-col justify-center">
      <p className="label"><span className="label-num">02</span> Claude’s triage</p>
      {isRunning ? (
        <ol className="cl-working mt-4" aria-label="Progress">
          {WORKING.map((label, i) => <li key={label} data-state={i < step ? 'done' : i === step ? 'active' : 'idle'}>{label}</li>)}
        </ol>
      ) : (
        <>
          <p className="t-h3 mt-3">Pick a sample, then press “Send enquiry”.</p>
          <p className="mt-2 text-body">You will see the treatment, intent, urgency, a lead score, a nurse flag for anything medical, drafts for a person to approve, and exactly what would fire in GoHighLevel.</p>
        </>
      )}
    </div>
  );
}

/** The whole demo: form -> Claude triage -> drafts for approval -> GoHighLevel routing. */
export default function ClinicDemo() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeSample, setActiveSample] = useState('');
  const [status, setStatus] = useState('idle');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [decision, setDecision] = useState(null);
  const [runId, setRunId] = useState(0);
  const [step, setStep] = useState(0);
  const resultRef = useRef(null);
  const isRunning = status === 'running';

  useEffect(() => {
    if (!isRunning) return undefined;
    setStep(0);
    const timer = window.setInterval(() => setStep((s) => Math.min(s + 1, WORKING.length - 1)), TICK_MS);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (status === 'done') resultRef.current?.focus();
  }, [status]);

  const handleChange = (next) => {
    setForm(next);
    setActiveSample('');
  };

  const handleSample = (sample) => {
    setForm(sample.form);
    setActiveSample(sample.id);
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRunning) return;
    const problem = checkForm(form);
    if (problem) {
      setFormError(problem);
      return;
    }
    setStatus('running');
    setError('');
    setFormError('');
    setAnswer(null);
    setDecision(null);
    const body = { ...form, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), message: form.message.trim() };
    const { data, error: message } = await postDemo('/api/demo/clinic', body);
    if (data) {
      setAnswer({ result: data.result, isMock: Boolean(data.mock), costUsd: data.costUsd, name: body.name });
      setRunId((n) => n + 1);
      setStatus('done');
    } else {
      setError(message);
      setStatus('error');
    }
  };

  const done = answer && status === 'done';

  return (
    <>
      <div className="split">
        <EnquiryForm form={form} onChange={handleChange} onSample={handleSample} onSubmit={handleSubmit} activeSample={activeSample} isRunning={isRunning} formError={formError} />
        <div className="flex min-w-0 flex-col gap-[var(--gap)]">
          {done ? <TriageCard result={answer.result} isMock={answer.isMock} costUsd={answer.costUsd} headingRef={resultRef} /> : <Waiting step={step} isRunning={isRunning} />}
          {done && <DraftsCard key={runId} result={answer.result} decision={decision} onDecide={setDecision} />}
          {status === 'error' && (
            <div role="alert" className="tile cl-error"><p className="font-semibold text-ink">{error}</p></div>
          )}
        </div>
      </div>

      {done && <GhlPanel result={answer.result} name={answer.name} decision={decision} />}

      <div aria-live="polite" className="sr-only">
        {isRunning && 'Sorting the enquiry.'}
        {done && `Triage done: ${INTENT_LABEL[answer.result.intent]}, urgency ${answer.result.urgency.replace('_', ' ')}, lead score ${answer.result.lead_score}.`}
        {decision === 'sent' && 'Replies approved. Sent, simulated: nothing left this page.'}
        {decision === 'discarded' && 'Replies discarded.'}
      </div>
    </>
  );
}
