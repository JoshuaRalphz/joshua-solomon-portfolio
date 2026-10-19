import { ArrowRight, Check, Info, ShieldCheck } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import ProjectTile from './ProjectTile.jsx';
import { aiBuilds, works } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';

const featured = works.find((work) => work.featured);
const clientWorks = works.filter((work) => !work.featured);
// The projects with wins lead; the rest keep their content.js order.
const orderedClientWorks = [
  ...clientWorks.filter((work) => work.wins),
  ...clientWorks.filter((work) => !work.wins),
];

// About 7/12 of the feature tile from 1280px; the full main column below that.
const SHOT_SIZES = '(min-width: 1280px) 38vw, (min-width: 1024px) 60vw, 90vw';

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
          onError={(event) => { event.currentTarget.closest('figure').style.display = 'none'; }}
          className="h-auto w-full rounded-inner border border-line shadow-lift"
        />
      </a>
      <figcaption className="mt-2 text-sm font-medium leading-snug text-muted">{shot.label}</figcaption>
    </figure>
  );
}

/**
 * One of my own AI builds: what it is on the left, what it does and the stack in
 * a sunk well on the right (stacked below 1280px). No screenshots: all three are private.
 */
function AiBuildTile({ build }) {
  const [name, subtitle] = build.title.split(' — ');

  return (
    <li>
      <article id={`work-${build.id}`} className="tile split gap-[var(--pad)]">
        <div className="min-w-0">
          <p className="label text-action">{build.tag}</p>
          <h4 className="t-h3 mt-3">{name}</h4>
          {subtitle && <p className="mt-1 text-sm font-medium leading-snug text-muted">{subtitle}</p>}
          <p className="mt-3 max-w-[68ch] text-body">{build.summary}</p>
        </div>

        <div className="flex min-w-0 flex-col rounded-inner bg-sunk p-4 xl:self-start">
          <p className="label">What it does</p>
          <ul className="mt-3 space-y-2">
            {build.wins.map((win) => (
              <li key={win} className="flex items-start gap-2 text-sm font-medium leading-snug text-ink">
                <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
                {win}
              </li>
            ))}
          </ul>
          <p className="wrap-anywhere mt-4 border-t border-line pt-3 font-mono text-xs leading-relaxed text-muted">
            {build.stack.join(' · ')}
          </p>
        </div>
      </article>
    </li>
  );
}

/** The in-house platform: text, then screenshots, then the note and the ask. */
function ArrowFeature() {
  const [firstShot, ...otherShots] = featured.gallery;

  return (
    <article id={`work-${featured.id}`} className="tile split gap-[var(--pad)] xl:[grid-template-rows:auto_1fr]">
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="label text-action">{featured.tag}</span>
          <span className="text-sm font-medium text-muted">{featured.role}</span>
        </p>
        <h3 className="t-h3 mt-3">{featured.title}</h3>
        <p className="mt-3 max-w-[68ch] text-body">{featured.summary}</p>
        <ul className="mt-4 grid gap-x-5 gap-y-2 md:grid-cols-2 xl:grid-cols-1">
          {featured.wins.map((win) => (
            <li key={win} className="flex items-start gap-2 text-sm font-medium text-ink">
              <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
              {win}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 rounded-inner bg-sunk p-3 shadow-well md:p-4 xl:self-start xl:[grid-column:2] xl:[grid-row:1/span_2]">
        <Screenshot shot={firstShot} />
        {otherShots.map((shot) => (
          <Screenshot key={shot.src} shot={shot} className="ml-auto w-[88%]" />
        ))}
      </div>

      <div className="xl:[grid-column:1] xl:[grid-row:2]">
        <div className="flex items-start gap-3 rounded-inner bg-sunk p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          <div className="min-w-0">
            <p className="label">About this build</p>
            <p className="mt-1 text-sm font-medium leading-snug text-ink">{featured.previewLine}</p>
          </div>
        </div>
        <p className="wrap-anywhere mt-4 font-mono text-xs leading-relaxed text-muted">
          Stack: {featured.stack.join(' · ')}
        </p>
        <a href="#contact" className="btn btn-secondary mt-4">
          Request a walkthrough <ArrowRight size={18} aria-hidden="true" />
        </a>
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
        intro="Every project below is my own hands-on work. My AI builds come first; then the platform I built at work, and client work shown with permission. Want a code or live walkthrough? Just ask."
      />

      <h3 className="label mb-4">My AI builds · built with Claude Code</h3>
      <Reveal>
        <ul className="flex flex-col gap-[var(--gap)]">
          {aiBuilds.map((build) => <AiBuildTile key={build.id} build={build} />)}
        </ul>
      </Reveal>

      {featured && (
        <>
          <h3 className="label mb-4 mt-8">At work · an in-house platform</h3>
          <Reveal>
            <ArrowFeature />
          </Reveal>
        </>
      )}

      <h3 className="label mb-4 mt-8">Supporting experience · client work</h3>
      <Reveal>
        <ul className="bento">
          {orderedClientWorks.map((work) => (
            <ProjectTile key={work.id} work={work} />
          ))}
        </ul>
      </Reveal>

      <p className="mt-5 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        Client work delivered under Arrow Group Consulting (Michigan, USA), shown with permission · references on request
      </p>
    </section>
  );
}
