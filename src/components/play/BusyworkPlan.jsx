import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Bot, Clock, Loader2, Mail, MessageCircle, UserCheck, Wand2 } from 'lucide-react';
import Pipeline, { pipeStates } from './Pipeline.jsx';
import { ChipGroup, lengthHint, useStepTicker } from './controls.jsx';
import { postPlay } from './api.js';
import { CALL_HREF, CALL_LABEL, playBySlug } from '../../data/play.js';
import { profile } from '../../data/content.js';

const MIN_CHARS = 30;
const MAX_CHARS = 1500;
const TEAM_SIZES = ['Just me', '2–5', '6–20', '21–50', '50+'];
const INDUSTRIES = ['Home services', 'Clinic or health', 'Retail or e-commerce', 'Agency or consulting', 'Nonprofit', 'Real estate', 'Other'];
const STEPS = playBySlug['busywork-plan'].how;

const EXAMPLES = [
  {
    label: 'Copying leads',
    text: 'Every morning I copy new leads from our website form and Facebook messages into a spreadsheet, then email each one back by hand. It is about 15 a day.',
    teamSize: '2–5',
    industry: 'Home services',
  },
  {
    label: 'Chasing invoices',
    text: 'Every Friday someone checks in Square which clients have paid, then writes payment reminder emails one by one to everyone who is late.',
    teamSize: '6–20',
    industry: 'Agency or consulting',
  },
  {
    label: 'Same questions',
    text: 'Patients email all day to book or move appointments, and the front desk answers the same questions about hours, insurance and parking over and over.',
    teamSize: '6–20',
    industry: 'Clinic or health',
  },
];

/** Range bars on one shared scale: each automation's low..high hours a week. */
function HoursChart({ automations }) {
  const max = Math.max(4, ...automations.map((a) => a.hours_high));
  return (
    <ul className="play-hours mt-5" aria-label="Estimated hours saved per week, per automation">
      {automations.map((a, i) => (
        <li key={`${i}-${a.title}`}>
          <span className="play-hours-name">{String(i + 1).padStart(2, '0')} {a.title}</span>
          <span className="play-hours-track" aria-hidden="true">
            <span
              className="play-hours-bar"
              style={{ left: `${(a.hours_low / max) * 100}%`, width: `${Math.max(3, ((a.hours_high - a.hours_low) / max) * 100)}%` }}
            />
          </span>
          <span className="play-hours-val">{a.hours_low}–{a.hours_high} h</span>
        </li>
      ))}
    </ul>
  );
}

function AutomationCard({ item, index }) {
  return (
    <li className="tile flex flex-col">
      <p className="label"><span className="label-num">Build {String(index + 1).padStart(2, '0')}</span></p>
      <h4 className="t-h3 mt-2">{item.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-body">{item.how_it_works}</p>
      <dl className="mt-4 grid gap-3 text-sm leading-snug">
        {item.ai_part && (
          <div className="flex items-start gap-2.5">
            <Bot size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
            <div><dt className="font-bold text-ink">The AI’s part</dt><dd className="text-body">{item.ai_part}</dd></div>
          </div>
        )}
        {item.human_step && (
          <div className="flex items-start gap-2.5">
            <UserCheck size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
            <div><dt className="font-bold text-ink">You stay in charge</dt><dd className="text-body">{item.human_step}</dd></div>
          </div>
        )}
        <div className="flex items-start gap-2.5">
          <Clock size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          <div>
            <dt className="font-bold text-ink">{item.hours_low}–{item.hours_high} hours a week <span className="play-tag">estimate</span></dt>
            <dd className="text-body">{item.assumption}</dd>
          </div>
        </div>
      </dl>
      {item.tools.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tools">
          {item.tools.map((tool) => <li key={tool} className="play-tool">{tool}</li>)}
        </ul>
      )}
    </li>
  );
}

function PlanResult({ result, isMock, headingRef }) {
  if (!result.is_business_task) {
    return (
      <div className="tile play-dashed mt-[var(--gap)]">
        <h3 ref={headingRef} tabIndex={-1} className="t-h3">That doesn’t read like a work task yet.</h3>
        <p className="mt-2 text-body">{result.summary}</p>
        <p className="mt-2 text-sm font-medium text-muted">Try describing one job your team repeats every week, like answering enquiries or copying data between tools.</p>
      </div>
    );
  }
  return (
    <div className="bento mt-[var(--gap)]">
      <div className="tile tile--ink on-ink flex flex-col md:[grid-column:span_6] xl:[grid-column:1/8]">
        <h3 ref={headingRef} tabIndex={-1} className="label">
          Your starting plan{isMock && <span className="play-mock">Demo answer</span>}
        </h3>
        <p className="mt-3 text-mist">{result.summary}</p>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
          <span className="t-num-lead text-lime">{result.hours.low}–{result.hours.high}</span>
          <span className="text-lg font-bold text-mist">hours a week</span>
        </p>
        <p className="mt-1 text-sm font-medium text-mist-dim">Estimated time back, from what you wrote. Each build shows its assumption.</p>
        <HoursChart automations={result.automations} />
      </div>

      <div className="tile tile--lime flex flex-col md:[grid-column:span_6] xl:[grid-column:8/13]">
        <h3 className="label">Where the price starts</h3>
        <ul className="mt-4 grid gap-3">
          {result.offer.items.map((offer) => (
            <li key={offer.label} className="play-offer">
              <span className="font-bold text-ink">{offer.label}</span>
              <span className="t-h3">{offer.price}</span>
            </li>
          ))}
        </ul>
        {result.offer.reason && <p className="mt-4 text-sm font-medium leading-snug text-ink">{result.offer.reason}</p>}
        <p className="mt-4 rounded-inner bg-card/70 px-3 py-2 text-sm font-semibold text-ink">Estimates, not a quote. A real price comes after the free call.</p>
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <a href={CALL_HREF} className="btn btn-secondary">{CALL_LABEL} <ArrowRight size={18} aria-hidden="true" /></a>
          <a href={profile.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        {result.call_agenda && <p className="mt-3 text-sm text-ink"><strong>On the call:</strong> {result.call_agenda}</p>}
      </div>

      <ol className="play-builds [grid-column:1/-1]">
        {result.automations.map((item, i) => <AutomationCard key={`${i}-${item.title}`} item={item} index={i} />)}
      </ol>
    </div>
  );
}

/** "Busywork -> plan & price": describe the busywork, get the first builds and where the price starts. */
export default function BusyworkPlan() {
  const [text, setText] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [industry, setIndustry] = useState('');
  const [status, setStatus] = useState('idle');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const textareaRef = useRef(null);
  const resultRef = useRef(null);
  const ids = { text: useId(), hint: useId() };
  const isRunning = status === 'running';
  const step = useStepTicker(isRunning, STEPS.length);
  const count = text.trim().length;
  const isTooLong = count > MAX_CHARS;

  useEffect(() => {
    if (status === 'done') resultRef.current?.focus();
  }, [status]);

  const handleExample = (example) => {
    setText(example.text);
    setTeamSize(example.teamSize);
    setIndustry(example.industry);
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
    const { data, error: message } = await postPlay('/api/play/busywork', { text: text.trim(), teamSize, industry });
    if (data) {
      setAnswer({ result: data.result, isMock: Boolean(data.mock) });
      setStatus('done');
    } else {
      setError(message);
      setStatus('error');
    }
  };

  let states = pipeStates(STEPS.length, -1);
  if (isRunning) states = pipeStates(STEPS.length, step);
  if (status === 'done') states = pipeStates(STEPS.length, 0, { finished: true });

  return (
    <section aria-labelledby="demo-title" className="play-demo">
      <h2 id="demo-title" className="sr-only">Try it</h2>
      <div className="split split--rev">
        <form onSubmit={handleSubmit} className="tile tile--ink on-ink flex min-w-0 flex-col" noValidate>
          <p className="label"><span className="label-num">01</span> Your busywork</p>
          <label htmlFor={ids.text} className="mt-4 block text-sm font-semibold text-mist">What eats your team’s week?</label>
          <textarea
            id={ids.text}
            ref={textareaRef}
            className="field play-textarea mt-1.5"
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-describedby={ids.hint}
            aria-invalid={isTooLong || undefined}
            maxLength={MAX_CHARS + 200}
            placeholder="e.g. We copy every new enquiry into a spreadsheet and answer each one by hand…"
          />
          <p id={ids.hint} className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm font-medium">
            <span className={isTooLong ? 'play-warn' : 'text-mist-dim'}>{lengthHint(count, MIN_CHARS, MAX_CHARS)}</span>
            <span className={`font-mono text-xs ${isTooLong ? 'play-warn' : 'text-mist-dim'}`}>{count} / {MAX_CHARS}</span>
          </p>

          <ChipGroup label="Team size" options={TEAM_SIZES} value={teamSize} onChange={setTeamSize} disabled={isRunning} />
          <ChipGroup label="Industry" options={INDUSTRIES} value={industry} onChange={setIndustry} disabled={isRunning} />

          {formError && <p role="alert" className="play-warn mt-3 text-sm font-semibold">{formError}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn btn-primary" aria-disabled={isRunning}>
              {isRunning ? <Loader2 size={18} aria-hidden="true" className="play-spin" /> : <Wand2 size={18} aria-hidden="true" />}
              {isRunning ? 'Planning…' : 'Plan it'}
            </button>
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-mist">Or start from an example</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXAMPLES.map((example) => (
                <button key={example.label} type="button" className="btn play-btn-ghost" onClick={() => handleExample(example)} disabled={isRunning}>
                  {example.label}
                </button>
              ))}
            </div>
          </div>
          <p className="label mt-auto pt-6">Claude Haiku 5.5 · capped daily · your text isn’t stored</p>
        </form>

        <div className="tile flex min-w-0 flex-col">
          <p className="label"><span className="label-num">02</span> What happens</p>
          <div className="mt-5"><Pipeline steps={STEPS} states={states} label="Planning steps" tone="light" vertical /></div>
          <p className="mt-auto rounded-inner bg-sunk p-4 pt-4 text-sm font-medium leading-snug text-ink">
            It can only pick tools I actually use and only show my two real prices. Hours are estimates, and it tells you what each one assumes.
          </p>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {isRunning && 'Planning. This usually takes a few seconds.'}
        {status === 'done' && answer && (answer.result.is_business_task
          ? `Plan ready: ${answer.result.automations.length} builds, an estimated ${answer.result.hours.low} to ${answer.result.hours.high} hours a week.`
          : 'That did not read like a work task.')}
      </div>

      {status === 'error' && (
        <div role="alert" className="tile play-error mt-[var(--gap)] flex flex-wrap items-center justify-between gap-4">
          <p className="min-w-0 font-semibold text-ink">{error}</p>
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('The busywork I want off my plate')}`} className="btn btn-secondary">
            <Mail size={18} aria-hidden="true" /> Email me instead
          </a>
        </div>
      )}

      {answer && status === 'done' && <PlanResult result={answer.result} isMock={answer.isMock} headingRef={resultRef} />}
    </section>
  );
}
