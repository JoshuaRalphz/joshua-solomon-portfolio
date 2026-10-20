import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, CalendarCheck, MessageSquareText, PhoneIncoming, PhoneMissed, RotateCcw, Star } from 'lucide-react';
import { CALL_HREF, CALL_LABEL } from '../../data/play.js';

const BUSINESS = 'Northside Plumbing';

const REPLIES = [
  { id: 'urgent', label: '“Pipe burst under my sink!”', text: 'A pipe just burst under my kitchen sink, water everywhere!' },
  { id: 'quote', label: '“Need a quote for a water heater”', text: 'Hi, I need a quote to replace my water heater.' },
  { id: 'hours', label: '“Are you open Saturdays?”', text: 'Are you open on Saturdays?' },
];
const SLOTS = ['Thu 9:00 am', 'Thu 1:00 pm', 'Fri 10:00 am'];
const DEFAULT_PATH = { reply: 'quote', slot: SLOTS[0] };

/** The demo conversation for one path. Every step has a timing; messages are demo text. */
function buildScript({ reply, slot }) {
  const chosen = REPLIES.find((r) => r.id === reply);
  const steps = [
    { id: 'call', Icon: PhoneIncoming, time: 'Tue 7:42 pm', title: 'A customer calls', detail: 'Dana finds the business in a search and rings.' },
    { id: 'missed', Icon: PhoneMissed, time: '7:42 pm', title: 'Missed call', detail: 'The team is out on a job. No one picks up, and there is no voicemail callback yet.' },
    { id: 'text', Icon: MessageSquareText, time: '+5 sec', title: 'Instant text-back', detail: 'An automatic text goes out before Dana rings the next plumber.', from: 'biz', text: `Hi, it's ${BUSINESS}. Sorry we missed your call! What can we help with? Reply here and we'll sort it.` },
    { id: 'reply', Icon: MessageSquareText, time: '+2 min', title: 'The customer replies', detail: 'Dana answers by text. In the demo, you choose what Dana says.', from: 'them', text: chosen?.text, choose: 'reply' },
  ];
  if (reply === 'urgent') {
    steps.push(
      { id: 'escalate', Icon: Bell, time: '+2 min', title: 'Urgent: the owner is alerted', detail: 'Words like “burst” flag it as urgent: the owner gets an alert to call back now.', from: 'biz', text: 'That sounds urgent. If you can, turn off the water at the main valve. Our on-call plumber has your number and is calling you now.' },
      { id: 'review', Icon: Star, time: '2 hours after the job', title: 'Review request', detail: 'One polite ask, sent once.', from: 'biz', text: `Thanks for choosing ${BUSINESS}! If we did a good job, would you leave a quick review? northside.example/review` },
    );
    return steps;
  }
  const opener = reply === 'hours'
    ? "Yes, we're open Monday to Saturday, 7 am to 6 pm. Want us to take a look? Pick a time:"
    : 'Happy to help! Pick a time for a free estimate visit:';
  steps.push(
    { id: 'booking', Icon: CalendarCheck, time: '+2 min', title: 'Booking link', detail: 'A link to open slots, so nobody plays phone tag. In the demo, you pick the slot.', from: 'biz', text: `${opener} northside.example/book`, choose: 'slot' },
    { id: 'booked', Icon: CalendarCheck, time: '+4 min', title: 'Booked', detail: 'The visit lands in the calendar with Dana’s details.', from: 'biz', text: `You're booked for ${slot}. We'll text you a reminder the day before.` },
    { id: 'reminder', Icon: Bell, time: 'Day before, 6:00 pm', title: 'Reminder', detail: 'Fewer no-shows and wasted trips.', from: 'biz', text: `Reminder: ${BUSINESS} visits tomorrow (${slot}). Reply C to confirm or R to reschedule.` },
    { id: 'review', Icon: Star, time: '2 hours after the visit', title: 'Review request', detail: 'One polite ask, sent once.', from: 'biz', text: `Thanks for choosing ${BUSINESS}! If we did a good job, would you leave a quick review? northside.example/review` },
  );
  return steps;
}

function Phone({ steps, at }) {
  const shown = steps.slice(0, at + 1);
  const current = steps[at];
  const isCallScreen = current.id === 'call' || current.id === 'missed';
  const threadRef = useRef(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [at, steps]);

  return (
    <div className="play-phone" aria-hidden="true">
      <div className="play-phone-notch" />
      <div className="play-phone-top">
        <span className="play-phone-avatar">NP</span>
        <span><strong>{BUSINESS}</strong><small>Demo business</small></span>
      </div>
      {isCallScreen ? (
        <div className={`play-call ${current.id === 'missed' ? 'is-missed' : ''}`}>
          <span className="play-call-ring">{current.id === 'missed' ? <PhoneMissed size={30} /> : <PhoneIncoming size={30} />}</span>
          <strong>{current.id === 'missed' ? 'Missed call' : 'Calling…'}</strong>
          <small>{current.time}</small>
        </div>
      ) : (
        <div ref={threadRef} className="play-thread">
          <p className="play-thread-sys"><PhoneMissed size={13} /> Missed call · 7:42 pm</p>
          {shown.filter((s) => s.text).map((s) => (
            <p key={s.id} className={`play-sms play-sms--${s.from}`}>{s.text}<small>{s.time}</small></p>
          ))}
        </div>
      )}
    </div>
  );
}

function Savings() {
  const [calls, setCalls] = useState(6);
  const [share, setShare] = useState(25);
  const [value, setValue] = useState(300);
  const ids = { calls: useId(), share: useId(), value: useId() };
  const clamp = (n, max) => (Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0);
  const c = clamp(calls, 500);
  const s = clamp(share, 100);
  const v = clamp(value, 100000);
  const jobsPerMonth = (c * (s / 100) * 52) / 12;
  const perMonth = jobsPerMonth * v;
  const money = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const field = (id, label, current, set, { suffix, prefix, max, step = 1 }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">{label}</label>
      <div className="play-num mt-1.5">
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input id={id} type="number" inputMode="numeric" min={0} max={max} step={step} value={current}
          onChange={(event) => set(event.target.value === '' ? 0 : Number(event.target.value))} />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="tile tile--lime">
      <p className="label">What this could be worth to you · illustrative</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {field(ids.calls, 'Missed calls a week', calls, setCalls, { max: 500 })}
        {field(ids.share, 'Share you’d win back with a text', share, setShare, { suffix: '%', max: 100 })}
        {field(ids.value, 'Average job value', value, setValue, { prefix: '$', max: 100000, step: 10 })}
      </div>
      <p className="mt-2 text-sm font-medium text-ink">These start as example numbers, not data. Put in your own.</p>
      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2" aria-live="polite">
        <p><span className="t-num-lead text-ink">${money(perMonth)}</span> <span className="font-bold text-ink">a month</span></p>
        <p className="pb-2 font-semibold text-ink">≈ {jobsPerMonth.toLocaleString('en-US', { maximumFractionDigits: 1 })} jobs a month you might keep</p>
      </div>
      <p className="play-formula mt-3">
        {c} calls × {s}% won back × ${money(v)} × 52 weeks ÷ 12 months
      </p>
      <p className="mt-3 text-sm text-ink">Illustrative only. Your real share depends on your market, how fast you reply and how good the text is.</p>
    </div>
  );
}

/**
 * Missed-call text-back simulator. Prerendered (and with JavaScript off) it is the
 * whole conversation as a readable list; after hydration it becomes step-by-step.
 */
export default function MissedCall() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [path, setPath] = useState({ reply: '', slot: '' });
  const [at, setAt] = useState(0);
  const [hasActed, setHasActed] = useState(false);
  const timelineRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => setIsInteractive(true), []);

  // Until the visitor picks Dana's reply, that message stays blank (the rest of the path is the default one).
  const steps = buildScript(isInteractive ? { reply: path.reply || DEFAULT_PATH.reply, slot: path.slot || DEFAULT_PATH.slot } : DEFAULT_PATH)
    .map((step) => (isInteractive && step.choose === 'reply' && !path.reply ? { ...step, text: null } : step));
  const last = steps.length - 1;
  const current = steps[isInteractive ? at : last];
  // A step that needs a choice waits until the visitor makes it.
  const waitingFor = isInteractive && current.choose && !path[current.choose] ? current.choose : null;
  const isDone = isInteractive && at === last;

  useEffect(() => {
    if (!isInteractive) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    timelineRef.current?.querySelector('[aria-current="step"]')?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }, [at, isInteractive]);

  // The control group swaps (Next <-> choices); keep keyboard focus inside it once the visitor has acted.
  useEffect(() => {
    if (hasActed) controlsRef.current?.querySelector('[role="group"] button, .btn-primary')?.focus();
  }, [waitingFor, isDone, hasActed]);

  const next = () => {
    setHasActed(true);
    setAt((i) => Math.min(i + 1, last));
  };
  const back = () => setAt((i) => Math.max(i - 1, 0));
  const restart = () => {
    setPath({ reply: '', slot: '' });
    setAt(0);
  };
  const choose = (key, value) => {
    setHasActed(true);
    setPath((p) => ({ ...p, [key]: value }));
  };

  const visible = isInteractive ? steps.slice(0, at + 1) : steps;

  return (
    <section aria-labelledby="demo-title" className="play-demo">
      <h2 id="demo-title" className="sr-only">Try it</h2>
      <div className="play-sim tile">
        <div className="play-sim-phone">
          <Phone steps={steps} at={isInteractive ? at : last} />
          {isInteractive && (
            <div ref={controlsRef} className="play-sim-controls">
              {waitingFor === 'reply' && (
                <div role="group" aria-label="What does Dana reply?" className="grid gap-2">
                  <p className="text-sm font-bold text-ink">What does Dana reply?</p>
                  {REPLIES.map((r) => (
                    <button key={r.id} type="button" className="btn btn-secondary justify-start text-left" onClick={() => choose('reply', r.id)}>{r.label}</button>
                  ))}
                </div>
              )}
              {waitingFor === 'slot' && (
                <div role="group" aria-label="Pick a slot for Dana" className="grid gap-2">
                  <p className="text-sm font-bold text-ink">Pick a slot for Dana</p>
                  <div className="flex flex-wrap gap-2">
                    {SLOTS.map((slot) => (
                      <button key={slot} type="button" className="btn btn-secondary" onClick={() => choose('slot', slot)}>{slot}</button>
                    ))}
                  </div>
                </div>
              )}
              {!waitingFor && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn btn-secondary" onClick={back} disabled={at === 0}><ArrowLeft size={17} aria-hidden="true" /> Back</button>
                  {isDone
                    ? <button type="button" className="btn btn-primary" onClick={restart}><RotateCcw size={17} aria-hidden="true" /> Run it again</button>
                    : <button type="button" className="btn btn-primary" onClick={next}>{at === 0 ? 'Let it ring' : 'Next step'} <ArrowRight size={17} aria-hidden="true" /></button>}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="label"><span className="label-num">Timeline</span> · demo timings</p>
          <ol ref={timelineRef} className="play-timeline mt-4" aria-label="What happens after the missed call">
            {visible.map((step, i) => {
              const { text } = step;
              const isNow = isInteractive && i === at;
              return (
                <li key={step.id} data-state={isNow ? 'active' : 'done'} aria-current={isNow ? 'step' : undefined}>
                  <span className="play-timeline-icon" aria-hidden="true"><step.Icon size={16} /></span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2"><strong className="text-ink">{step.title}</strong><span className="play-time">{step.time}</span></p>
                    <p className="mt-0.5 text-sm text-body">{step.detail}</p>
                    {text && <p className={`play-tl-msg play-tl-msg--${step.from}`}><span className="sr-only">{step.from === 'biz' ? `${BUSINESS} texts: ` : 'Dana texts: '}</span>{text}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
          {isInteractive && !isDone && <p className="mt-3 text-sm font-medium text-muted">{last - at} more {last - at === 1 ? 'step' : 'steps'} to go.</p>}
          {isDone && (
            <div className="mt-5 rounded-inner bg-sunk p-4">
              <p className="font-bold text-ink">That’s the whole flow: one missed call, kept.</p>
              <p className="mt-1 text-sm text-body">
                {path.reply === 'urgent'
                  ? 'Every text above was automatic. A person only stepped in for the urgent call back.'
                  : 'Every text above was automatic. Nobody had to stop the job they were on.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {hasActed && (waitingFor ? `Step ${at + 1}: ${current.title}. Choose an option.` : `Step ${at + 1} of ${last + 1}: ${current.title}. ${current.text ?? ''}`)}
      </div>

      <div className="split mt-[var(--gap)]">
        <Savings />
        <div className="tile tile--ink on-ink flex flex-col">
          <p className="label">For your business</p>
          <p className="t-h3 mt-3">Never lose a job to voicemail.</p>
          <p className="mt-2 text-mist-dim">Your number, your wording, your booking calendar, with business texting registered properly (A2P 10DLC in the US) before anything goes out.</p>
          <div className="mt-auto pt-5">
            <a href={CALL_HREF} className="btn btn-primary">{CALL_LABEL} <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
