import { ArrowRight } from 'lucide-react';
import Diagram from '../Diagram.jsx';
import BrowserShot from '../media/BrowserShot.jsx';
import VideoFacade from '../media/VideoFacade.jsx';

/** Three numbers from the case's results, as a dense proof row. */
function ProofRow({ results }) {
  return (
    <ul className="proof proof--3 mt-6">
      {results.slice(0, 3).map((r) => (
        <li key={r.label}>
          <span className="t-chip block text-ink">{r.value}</span>
          <span className="mt-1 block text-sm font-medium leading-snug text-muted">{r.label}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A case study on the home page: business problem -> what I built -> what changed,
 * with the real product visual beside it and (on wide screens) the architecture.
 */
export default function CaseCard({ study, isFirst = false, showDiagram = false }) {
  const hasVideo = Boolean(study.video);

  return (
    <article id={`work-${study.slug}`} className="tile case" aria-labelledby={`${study.slug}-title`}>
      <div className={`case-grid ${hasVideo ? 'case-grid--video' : ''}`}>
        <div className="min-w-0">
          <p className="label"><span className="label-num">{study.num}</span> {study.kicker}</p>
          <h3 id={`${study.slug}-title`} className="t-h2 mt-3">{study.name}</h3>
          <p className="t-outcome t-outcome--sm mt-3">{study.outcome}</p>

          <dl className="case-facts mt-5">
            <div>
              <dt className="label">The problem</dt>
              <dd>{study.problem}</dd>
            </div>
            <div>
              <dt className="label">What I built</dt>
              <dd>{study.summary}</dd>
            </div>
            <div>
              <dt className="label">For your team</dt>
              <dd>{study.businessAngle}</dd>
            </div>
          </dl>

          <ProofRow results={study.results} />

          <a href={study.path} className="btn btn-primary mt-6">
            Read the case study<span className="sr-only">: {study.name}</span> <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="min-w-0">
          {hasVideo
            ? <VideoFacade video={study.video} />
            : <BrowserShot shot={study.shots[0]} phone={study.phoneShots?.[0]} isEager={isFirst} />}
        </div>
      </div>

      {/* The diagram where its wide drawing fits (first case only, to keep the page short);
          narrower screens and the other cases show it on the case-study page. */}
      {showDiagram && (
      <div className="case-diagram mt-[var(--pad)] rounded-inner bg-sunk p-4 md:p-5">
        <p className="label mb-4">Architecture</p>
        <Diagram id={`home-${study.slug}`} diagram={study.diagram} showNote={false} />
      </div>
      )}
    </article>
  );
}
