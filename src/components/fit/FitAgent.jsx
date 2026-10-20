import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, FileText, Loader2, Mail } from 'lucide-react';
import SectionHead from '../home/SectionHead.jsx';
import FitResult from './FitResult.jsx';
import { SAMPLE_COMPANY, SAMPLE_JOB } from './sampleJob.js';
import { useTurnstile } from './useTurnstile.js';
import { profile } from '../../data/content.js';
import './fit.css';

const MIN_CHARS = 200;
const MAX_CHARS = 8000;
const STEP_MS = 2600;
const REQUEST_TIMEOUT_MS = 75_000;

const STEPS = [
  { label: 'Reading the post', caption: 'Pulls out what the role and the business really need' },
  { label: 'Matching requirements', caption: 'Checks each one against my real projects and work' },
  { label: 'Checking gaps', caption: "Lists what I haven't clearly done, plainly" },
  { label: 'Writing the note', caption: 'Drafts a short note in my own voice' },
];

const FALLBACK_ERROR = "The fit check isn't available right now.";
const mailto = `mailto:${profile.email}?subject=${encodeURIComponent('A role I would like your take on')}`;

async function requestFit(body) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch('/api/fit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) return { data };
    return { error: typeof data?.message === 'string' ? data.message : FALLBACK_ERROR };
  } catch {
    return { error: 'That took too long or the connection dropped. Try again in a moment.' };
  } finally {
    window.clearTimeout(timer);
  }
}

function lengthHint(count) {
  if (count === 0) return `Paste ${MIN_CHARS.toLocaleString('en-US')} to ${MAX_CHARS.toLocaleString('en-US')} characters.`;
  if (count < MIN_CHARS) return `${MIN_CHARS - count} more characters needed.`;
  if (count > MAX_CHARS) return `${(count - MAX_CHARS).toLocaleString('en-US')} characters over the limit.`;
  return 'Ready when you are.';
}

/** "See how I'd help your team": paste a job post, get an honest fit check from Claude. */
export default function FitAgent() {
  const [jobText, setJobText] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('idle');
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const resultRef = useRef(null);
  const textareaRef = useRef(null);
  const ids = { job: useId(), company: useId(), hint: useId() };
  const turnstile = useTurnstile(import.meta.env.VITE_TURNSTILE_SITE_KEY);

  const count = jobText.trim().length;
  const isRunning = status === 'running';
  const isTooLong = count > MAX_CHARS;

  useEffect(() => {
    if (!isRunning) return undefined;
    const timer = window.setInterval(() => setStep((current) => Math.min(current + 1, STEPS.length - 1)), STEP_MS);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (status === 'done') resultRef.current?.focus();
  }, [status]);

  const handleSample = () => {
    setJobText(SAMPLE_JOB);
    setCompany(SAMPLE_COMPANY);
    setFormError('');
    textareaRef.current?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRunning) return;
    if (count < MIN_CHARS || count > MAX_CHARS) {
      setFormError(lengthHint(count));
      textareaRef.current?.focus();
      return;
    }
    if (turnstile.isEnabled && !turnstile.token) {
      setFormError('Please complete the quick human check first.');
      return;
    }

    setStatus('running');
    setStep(0);
    setError('');
    setFormError('');
    setAnswer(null);
    const { data, error: message } = await requestFit({
      jobText: jobText.trim(),
      company: company.trim(),
      turnstileToken: turnstile.token || undefined,
    });
    turnstile.reset();
    if (data) {
      setAnswer({ result: data.result, company: company.trim(), isMock: Boolean(data.mock) });
      setStatus('done');
    } else {
      setError(message);
      setStatus('error');
    }
  };

  const stepState = (i) => {
    if (status === 'done' || (isRunning && i < step)) return 'done';
    if (isRunning && i === step) return 'active';
    return 'idle';
  };

  return (
    <section id="fit" aria-labelledby="fit-title">
      <SectionHead
        num="AI"
        id="fit"
        label="How I'd help"
        title="See how I'd help your team."
        intro="Paste your job post. An AI agent reads it against my real work and tells you what I'd likely fix for you first, where I fit, and where I don't. The gaps are there on purpose."
      />

      <div className="split split--rev">
        <form onSubmit={handleSubmit} className="fit-form tile tile--ink on-ink flex min-w-0 flex-col" noValidate>
          <p className="label"><span className="label-num">01</span> Your job post</p>

          <label htmlFor={ids.company} className="mt-4 block text-sm font-semibold text-mist">
            Company <span className="font-medium text-mist-dim">(optional)</span>
          </label>
          <input
            id={ids.company}
            className="field mt-1.5"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            maxLength={120}
            autoComplete="organization"
            placeholder="e.g. Brightpath"
          />

          <label htmlFor={ids.job} className="mt-4 block text-sm font-semibold text-mist">Job post</label>
          <textarea
            id={ids.job}
            ref={textareaRef}
            className="field fit-textarea mt-1.5"
            value={jobText}
            onChange={(event) => setJobText(event.target.value)}
            aria-describedby={ids.hint}
            aria-invalid={isTooLong || undefined}
            placeholder="Paste the role summary, responsibilities and requirements."
            spellCheck="false"
          />
          <p id={ids.hint} className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm font-medium">
            <span className={isTooLong ? 'fit-warn' : 'text-mist-dim'}>{lengthHint(count)}</span>
            <span className={`font-mono text-xs ${isTooLong ? 'fit-warn' : 'text-mist-dim'}`}>
              {count.toLocaleString('en-US')} / {MAX_CHARS.toLocaleString('en-US')}
            </span>
          </p>

          {turnstile.isEnabled && <div ref={turnstile.containerRef} className="mt-4 min-h-[65px]" />}
          {formError && <p role="alert" className="fit-warn mt-3 text-sm font-semibold">{formError}</p>}

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" className="btn btn-primary" disabled={isRunning} aria-disabled={isRunning}>
              {isRunning ? <Loader2 size={18} aria-hidden="true" className="fit-spin" /> : <ArrowRight size={18} aria-hidden="true" />}
              {isRunning ? 'Checking the fit…' : 'Run the fit check'}
            </button>
            <button type="button" className="btn fit-btn-ghost" onClick={handleSample} disabled={isRunning}>
              <FileText size={18} aria-hidden="true" /> Try a sample post
            </button>
          </div>

          <p className="label mt-auto pt-6">Powered by Claude Opus 5.5 · capped daily · your text isn't stored</p>
        </form>

        <div className="tile flex min-w-0 flex-col">
          <p className="label"><span className="label-num">02</span> What the agent does</p>
          <ol className="fit-steps mt-5" aria-label="Agent steps">
            {STEPS.map((item, i) => (
              <li key={item.label} data-state={stepState(i)} aria-current={stepState(i) === 'active' ? 'step' : undefined}>
                <strong>{item.label}</strong>
                <span>{item.caption}</span>
              </li>
            ))}
          </ol>
          <div className="mt-auto pt-6">
            <p className="rounded-inner bg-sunk p-4 text-sm font-medium leading-snug text-ink">
              One Claude call with a fixed profile of my real work. It can only point to projects on this page, and
              anything it can't back up shows as a gap.
            </p>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {isRunning && 'Running the fit check. This takes about 15 seconds.'}
        {status === 'done' && answer && `Fit check done. Score ${answer.result.fit_score} out of 100.`}
      </div>

      {status === 'error' && (
        <div role="alert" className="tile fit-error mt-[var(--gap)] flex flex-wrap items-center justify-between gap-4">
          <p className="min-w-0 font-semibold text-ink">{error}</p>
          <a href={mailto} className="btn btn-secondary">
            <Mail size={18} aria-hidden="true" /> Email me instead
          </a>
        </div>
      )}

      {answer && status === 'done' && (
        <FitResult ref={resultRef} result={answer.result} company={answer.company} isMock={answer.isMock} />
      )}
    </section>
  );
}
