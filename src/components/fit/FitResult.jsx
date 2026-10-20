import { forwardRef, useState } from 'react';
import { ArrowUpRight, Check, CircleDashed, Copy, MessageCircleQuestion } from 'lucide-react';
import ScoreRing, { scoreBand } from './ScoreRing.jsx';

// Links come from the server's fixed allowlist; still, only same-page anchors render.
const safeAnchor = (link) => (typeof link === 'string' && /^#[a-z0-9-]+$/i.test(link) ? link : null);

function ProjectChip({ project }) {
  const href = safeAnchor(project.link);
  if (!href) return null;
  return (
    <a href={href} className="fit-chip">
      {project.title}
      <ArrowUpRight size={14} aria-hidden="true" className="flex-none" />
    </a>
  );
}

function CopyNote({ note }) {
  const [status, setStatus] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note);
      setStatus('Copied');
    } catch {
      setStatus('Copy failed. Select the text instead.');
    }
    window.setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button type="button" className="btn btn-secondary" onClick={handleCopy}>
        <Copy size={17} aria-hidden="true" /> Copy the note
      </button>
      <span role="status" className="text-sm font-semibold text-action">{status}</span>
    </div>
  );
}

/** The answer: score, what I'd do first, where I fit, honest gaps, questions, the note. */
const FitResult = forwardRef(function FitResult({ result, company, isMock }, headingRef) {
  const forWhom = company || 'your team';

  return (
    <div className="bento mt-[var(--gap)]">
      <div className="tile tile--ink on-ink flex flex-col md:[grid-column:span_6] xl:[grid-column:1/6]">
        <h3 ref={headingRef} tabIndex={-1} className="label">
          Fit for {forWhom}
          {isMock && <span className="fit-mock">Demo answer</span>}
        </h3>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <ScoreRing score={result.fit_score} />
          <div className="min-w-0 flex-1 basis-48">
            <p className="t-h3">{scoreBand(result.fit_score)}</p>
            <p className="mt-2 text-mist-dim">{result.verdict}</p>
          </div>
        </div>
        {result.matching_projects.length > 0 && (
          <div className="mt-auto pt-6">
            <p className="label">Closest projects</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.matching_projects.map((project) => <ProjectChip key={project.id} project={project} />)}
            </div>
          </div>
        )}
      </div>

      <div className="tile tile--lime flex flex-col md:[grid-column:span_6] xl:[grid-column:6/13]">
        <h3 className="label">How I'd help in the first 30 to 60 days</h3>
        <ol className="fit-help mt-4">
          {result.how_i_would_help.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <p className="mt-auto pt-6 text-sm font-medium text-ink">
          A starting plan read from your post, not a promise. I'd check it with your team in week one.
        </p>
      </div>

      <div className="tile md:[grid-column:span_6] xl:[grid-column:1/8]">
        <h3 className="label">Where I fit · and what it gets you</h3>
        <ul className="mt-4 divide-y divide-line">
          {result.strengths.map((strength) => (
            <li key={strength.requirement} className="py-4 first:pt-0 last:pb-0">
              <p className="flex items-start gap-2 font-bold leading-snug text-ink">
                <Check size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
                {strength.requirement}
              </p>
              {strength.outcome && <p className="mt-1.5 pl-[1.625rem] font-semibold leading-snug text-ink">{strength.outcome}</p>}
              <p className="mt-1 pl-[1.625rem] text-sm leading-relaxed text-muted">{strength.evidence}</p>
              {strength.project && safeAnchor(strength.project.link) && (
                <a href={strength.project.link} className="text-link ml-[1.625rem] mt-1 inline-flex min-h-[2.75rem] items-center gap-1 text-sm">
                  {strength.project.title}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-col gap-[var(--gap)] md:[grid-column:span_6] xl:[grid-column:8/13]">
        <div className="tile fit-gaps">
          <h3 className="label">Honest gaps</h3>
          <p className="mt-2 text-sm font-medium text-muted">What I haven't clearly done yet. Better you hear it here.</p>
          <ul className="mt-4 space-y-4">
            {result.gaps.map((gap) => (
              <li key={gap.requirement} className="flex items-start gap-2.5">
                <CircleDashed size={18} aria-hidden="true" className="mt-0.5 flex-none text-muted" />
                <div className="min-w-0">
                  <p className="font-bold leading-snug text-ink">{gap.requirement}</p>
                  {gap.note && <p className="mt-1 text-sm leading-relaxed text-body">{gap.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {result.interview_questions_to_ask_him.length > 0 && (
          <div className="tile flex-1 bg-sunk">
            <h3 className="label">Ask me about</h3>
            <ul className="mt-4 space-y-3">
              {result.interview_questions_to_ask_him.map((question) => (
                <li key={question} className="flex items-start gap-2.5 font-medium leading-snug text-ink">
                  <MessageCircleQuestion size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="tile md:[grid-column:span_6] xl:[grid-column:1/-1]">
        <h3 className="label">A short note from me</h3>
        <blockquote className="fit-note mt-4">{result.short_note}</blockquote>
        <CopyNote note={result.short_note} />
      </div>
    </div>
  );
});

export default FitResult;
