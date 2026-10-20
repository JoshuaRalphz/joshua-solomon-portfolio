import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Download, Loader2, Mail, Search, SendHorizontal } from 'lucide-react';
import { postPlay, safePath } from './api.js';
import { profile } from '../../data/content.js';

const MAX_CHARS = 300;
const MAX_TURNS = 6;

const SUGGESTIONS = [
  'Where is Joshua based and what hours can he work?',
  'Has he built anything with the Claude API?',
  'How does the job hunt stop bad applications going out?',
  'How much does one AI video cost to make?',
  'What degree does he have?',
  'Has he built a RAG system before?',
];

function SourceChip({ source, n }) {
  const href = safePath(source.url);
  const isPdf = href?.endsWith('.pdf');
  const Inner = (
    <>
      <span className="play-cite-n" aria-hidden="true">{n}</span>
      <span className="min-w-0">
        <span className="block font-bold leading-snug text-ink">{source.title}</span>
        <span className="mt-0.5 block text-[.8125rem] leading-snug text-body">{source.excerpt}</span>
      </span>
      {href && <ArrowUpRight size={16} aria-hidden="true" className="flex-none text-action" />}
    </>
  );
  return href ? (
    <a href={href} className="play-source" {...(isPdf ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="sr-only">Source {n}: </span>{Inner}
      {isPdf && <span className="sr-only"> (PDF, opens in a new tab)</span>}
    </a>
  ) : (
    <div className="play-source">{Inner}</div>
  );
}

function Answer({ turn }) {
  if (turn.error) {
    return <p className="play-bubble play-bubble--a play-error-text">{turn.error}</p>;
  }
  const { result } = turn;
  if (!result.answered) {
    return (
      <div className="play-bubble play-bubble--a play-bubble--none">
        <p className="font-semibold text-ink">{result.message}</p>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent('A question about your work')}`} className="text-link mt-2 inline-flex min-h-[2.75rem] items-center gap-1.5">
          <Mail size={16} aria-hidden="true" /> Email Joshua
        </a>
      </div>
    );
  }
  const number = new Map(result.sources.map((source, i) => [source.id, i + 1]));
  return (
    <div className="play-bubble play-bubble--a">
      {turn.isMock && <span className="play-mock play-mock--light mb-2 ml-0">Demo answer</span>}
      <p className="leading-relaxed text-ink">
        {result.sentences.map((sentence, i) => (
          <span key={`${i}-${sentence.text}`}>
            {sentence.text}
            {sentence.source_ids.map((id) => (
              <sup key={id} className="play-sup"><span className="sr-only"> source </span>{number.get(id)}</sup>
            ))}{' '}
          </span>
        ))}
      </p>
      <p className="label mt-4">Sources</p>
      <ul className="mt-2 grid gap-2">
        {result.sources.map((source, i) => <li key={source.id}><SourceChip source={source} n={i + 1} /></li>)}
      </ul>
    </div>
  );
}

/** Ask my portfolio: answers only from my documents, each sentence cited. */
export default function AskPortfolio() {
  const [question, setQuestion] = useState('');
  const [turns, setTurns] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [formError, setFormError] = useState('');
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    const last = logRef.current?.lastElementChild;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (last && turns.length) last.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }, [turns]);

  const ask = async (text, { fromInput = false } = {}) => {
    const q = text.replace(/\s+/g, ' ').trim();
    if (isRunning) return;
    if (q.length < 3 || q.length > MAX_CHARS) {
      setFormError(q.length < 3 ? 'Ask a question (a few words is enough).' : `Keep it under ${MAX_CHARS} characters.`);
      inputRef.current?.focus();
      return;
    }
    setFormError('');
    setIsRunning(true);
    if (fromInput) setQuestion('');
    const id = Date.now();
    setTurns((list) => [...list, { id, question: q, pending: true }].slice(-MAX_TURNS));
    const { data, error } = await postPlay('/api/play/ask', { question: q });
    setTurns((list) => list.map((turn) => (turn.id === id
      ? { ...turn, pending: false, result: data?.result, isMock: Boolean(data?.mock), error: data ? '' : error }
      : turn)));
    setIsRunning(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ask(question, { fromInput: true });
  };

  const last = turns.at(-1);
  let liveText = '';
  if (isRunning) liveText = 'Searching my documents.';
  else if (last?.error) liveText = last.error;
  else if (last?.result) liveText = last.result.answered
    ? `Answer: ${last.result.sentences.map((s) => s.text).join(' ')} ${last.result.sources.length} sources listed.`
    : last.result.message;

  return (
    <section aria-labelledby="demo-title" className="play-demo">
      <h2 id="demo-title" className="sr-only">Try it</h2>
      <div className="split split--rev">
        <div className="tile tile--ink on-ink flex min-w-0 flex-col">
          <p className="label"><span className="label-num">01</span> Ask about my work</p>
          <ol ref={logRef} className="play-chat mt-4" aria-label="Questions and answers">
            {turns.length === 0 && (
              <li className="play-bubble play-bubble--a play-bubble--intro">
                <p className="text-ink">Hi, I answer from Josh’s CV, case studies and site summary only, and I show where each answer came from. If it isn’t written down, I’ll say so.</p>
              </li>
            )}
            {turns.map((turn) => (
              <li key={turn.id} className="grid gap-2">
                <p className="play-bubble play-bubble--q">{turn.question}</p>
                {turn.pending ? (
                  <p className="play-bubble play-bubble--a flex items-center gap-2 text-ink">
                    <Loader2 size={16} aria-hidden="true" className="play-spin" /> Searching the documents…
                  </p>
                ) : <Answer turn={turn} />}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="mt-4" noValidate>
            <label htmlFor={inputId} className="sr-only">Your question</label>
            <div className="play-ask">
              <Search size={18} aria-hidden="true" className="flex-none text-muted" />
              <input
                id={inputId}
                ref={inputRef}
                className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
                value={question}
                onChange={(event) => {
                  setQuestion(event.target.value);
                  if (formError) setFormError('');
                }}
                maxLength={MAX_CHARS}
                placeholder="e.g. What has he built with Cloudflare?"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary min-h-[2.75rem] px-4" aria-disabled={isRunning}>
                <SendHorizontal size={17} aria-hidden="true" /><span className="max-[420px]:sr-only">Ask</span>
              </button>
            </div>
            {formError && <p role="alert" className="play-warn mt-2 text-sm font-semibold">{formError}</p>}
          </form>
          <p className="label mt-4">Claude Opus 5.5 · answers only from my documents · questions aren’t stored</p>
        </div>

        <div className="tile flex min-w-0 flex-col">
          <p className="label"><span className="label-num">02</span> Try one of these</p>
          <ul className="mt-4 grid gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button type="button" className="play-suggest" onClick={() => ask(s)} disabled={isRunning}>
                  <BookOpen size={16} aria-hidden="true" className="flex-none text-action" /> {s}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-inner bg-sunk p-4 text-sm font-medium leading-snug text-ink">
            The last one is a test: when my documents don’t say something, the answer should say so instead of guessing.
          </p>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
            <a href={profile.resumeUrl} download className="btn btn-secondary"><Download size={17} aria-hidden="true" /> Download CV</a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary"><Mail size={17} aria-hidden="true" /> Email me</a>
          </div>
        </div>
      </div>
      <div aria-live="polite" className="sr-only">{liveText}</div>
    </section>
  );
}
