import { ArrowRight, Check, Info, ShieldCheck, Users } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import Diagram from '../Diagram.jsx';
import BrowserShot from '../media/BrowserShot.jsx';
import VideoFacade from '../media/VideoFacade.jsx';
import SectionHead from './SectionHead.jsx';
import ProjectTile from './ProjectTile.jsx';
import CompareToggle from './CompareToggle.jsx';
import { cases } from '../../data/cases.js';
import { agencyCase, clientWork, compare, jobTracker } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';

// The anchors the fit agent links to (functions/_lib/profile.js) and the old site used.
const ANCHOR = { 'ai-job-hunt': 'work-behindworks', 'ai-video-engine': 'work-ytengine' };

// About 7/12 of the feature tile from 1280px; the full main column below that.
const SHOT_SIZES = '(min-width: 1280px) 38vw, (min-width: 1024px) 60vw, 90vw';

function Checks({ items, className = '' }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm font-medium leading-snug text-ink">
          <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Three numbers from the case's results, as a dense proof row. */
function ProofRow({ results }) {
  return (
    <ul className="proof proof--3 mt-5">
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
 * One of my own AI systems: the problem, manual vs my system, the proof and the case
 * study on the left; the real product visual in a sunk well on the right.
 */
function BuildTile({ study, showDiagram }) {
  return (
    <article id={ANCHOR[study.slug]} className="tile case split split--rev gap-[var(--pad)]" aria-labelledby={`${study.slug}-title`}>
      <div className="min-w-0">
        <p className="label text-action"><span className="label-num">{study.num}</span> {study.kicker}</p>
        <h4 id={`${study.slug}-title`} className="t-h2 mt-3">{study.name}</h4>
        <p className="t-outcome t-outcome--sm mt-3">{study.outcome}</p>

        <dl className="case-facts mt-5">
          <div>
            <dt className="label">The problem</dt>
            <dd>{study.problem}</dd>
          </div>
          <div>
            <dt className="label flex items-center gap-1.5"><Users size={14} aria-hidden="true" /> For your team</dt>
            <dd>{study.businessAngle}</dd>
          </div>
        </dl>

        <CompareToggle {...compare[study.slug]} title={study.name} />
        <ProofRow results={study.results} />

        <a href={study.path} className="btn btn-primary mt-6">
          Read the case study<span className="sr-only">: {study.name}</span> <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      <div className="flex min-w-0 flex-col gap-4 rounded-inner bg-sunk p-3 shadow-well md:p-4 xl:self-start">
        {study.video
          ? <VideoFacade video={study.video} />
          : <BrowserShot shot={study.shots[0]} phone={study.phoneShots?.[0]} />}
        {study.shotsNote && <p className="text-sm font-medium leading-snug text-muted">{study.shotsNote}</p>}
        <p className="wrap-anywhere border-t border-line pt-3 font-mono text-xs leading-relaxed text-muted">
          {study.stack.join(' · ')}
        </p>
      </div>

      {/* The diagram where its wide drawing fits; narrower screens see it on the case page. */}
      {showDiagram && (
        <div className="case-diagram rounded-inner bg-sunk p-4 md:p-5 xl:[grid-column:1/-1]">
          <p className="label mb-4">Architecture</p>
          <Diagram id={`home-${study.slug}`} diagram={study.diagram} showNote={false} />
        </div>
      )}
    </article>
  );
}

/** The page shows a WebP copy; the link opens the full-size PNG. */
function Screenshot({ shot, className = '' }) {
  return (
    <figure className={className}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size screenshot: ${shot.label} (opens in a new tab)`}
        className="block rounded-inner"
      >
        <img
          src={shot.src}
          srcSet={webpSrcSet(shot.src)}
          sizes={SHOT_SIZES}
          alt={shot.label}
          width={shot.w}
          height={shot.h}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-inner border border-line shadow-lift"
        />
      </a>
      <figcaption className="mt-2 text-sm font-medium leading-snug text-muted">{shot.label}</figcaption>
    </figure>
  );
}

/** The in-house platform: text, then screenshots, then the note and the ask. */
function AgencyFeature() {
  const [firstShot, ...otherShots] = agencyCase.gallery;

  return (
    <article id={`work-${agencyCase.id}`} className="tile split gap-[var(--pad)] xl:[grid-template-rows:auto_1fr]">
      <div>
        <p className="label text-action">{agencyCase.tag}</p>
        <h4 className="t-h2 mt-3">{agencyCase.title}</h4>
        <p className="t-outcome t-outcome--sm mt-3">{agencyCase.outcome}</p>
        <CompareToggle {...compare.agency} title={agencyCase.title} />
        <Checks items={agencyCase.changed} className="mt-5" />
      </div>

      <div className="flex flex-col gap-4 rounded-inner bg-sunk p-3 shadow-well md:p-4 xl:self-start xl:[grid-column:2] xl:[grid-row:1/span_2]">
        <Screenshot shot={firstShot} />
        {otherShots.map((shot) => (
          <Screenshot key={shot.src} shot={shot} className="ml-auto w-[88%]" />
        ))}
      </div>

      <div className="xl:[grid-column:1] xl:[grid-row:2]">
        <p className="flex items-start gap-2 text-sm font-medium leading-snug text-body">
          <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          {agencyCase.safety}
        </p>
        <div className="mt-4 flex items-start gap-3 rounded-inner bg-sunk p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          <div className="min-w-0">
            <p className="label">About this build</p>
            <p className="mt-1 text-sm font-medium leading-snug text-ink">{agencyCase.note}</p>
          </div>
        </div>
        <p className="wrap-anywhere mt-4 font-mono text-xs leading-relaxed text-muted">
          Stack: {agencyCase.stack.join(' · ')}
        </p>
        <a href="#contact" className="btn btn-secondary mt-4">
          Request a walkthrough <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

/** A small own build: what it is on the left, what it does in a sunk well on the right. */
function SmallBuildTile({ build }) {
  return (
    <article id={`work-${build.id}`} className="tile split gap-[var(--pad)]">
      <div className="min-w-0">
        <p className="label text-action">{build.tag}</p>
        <h4 className="t-h3 mt-3">{build.title}</h4>
        <p className="mt-1 text-sm font-medium leading-snug text-muted">{build.subtitle}</p>
      </div>
      <div className="flex min-w-0 flex-col rounded-inner bg-sunk p-4 xl:self-start">
        <p className="label">What it does</p>
        <Checks items={build.wins} className="mt-3" />
        <p className="wrap-anywhere mt-4 border-t border-line pt-3 font-mono text-xs leading-relaxed text-muted">
          {build.stack.join(' · ')}
        </p>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title">
      <SectionHead
        num="01"
        id="work"
        label="Projects"
        title="Real builds. Clearly labelled."
        intro="Each one told the same way: the business problem, what I built, then what changed. My own AI systems first, then the platform I built at work, then client work shown with permission."
      />

      <h3 className="label mb-4">My AI systems · built with Claude Code</h3>
      <div className="flex flex-col gap-[var(--gap)]">
        {cases.map((study, i) => (
          <Reveal key={study.slug}><BuildTile study={study} showDiagram={i === 0} /></Reveal>
        ))}
        <Reveal><SmallBuildTile build={jobTracker} /></Reveal>
      </div>

      <h3 className="label mb-4 mt-8">At work · an in-house platform</h3>
      <Reveal>
        <AgencyFeature />
      </Reveal>

      <h3 className="label mb-4 mt-8">Supporting experience · client work</h3>
      <Reveal>
        <ul className="bento">
          {clientWork.map((work) => <ProjectTile key={work.id} work={work} />)}
        </ul>
      </Reveal>

      <p className="mt-5 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        Client work delivered under Arrow Group Consulting (Michigan, USA), shown with permission · references on request
      </p>
    </section>
  );
}
