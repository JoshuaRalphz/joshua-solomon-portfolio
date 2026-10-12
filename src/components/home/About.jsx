import { ChevronDown } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import {
  benefits, earlierExperience, education, experience, profile, setup,
} from '../../data/content.js';

// How many bullets of each role show before the "Show N more points" disclosure.
const VISIBLE_BULLETS = 3;

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-body">
          <span aria-hidden="true" className="mt-[.5625rem] h-1.5 w-1.5 flex-none rounded-full bg-action" />
          <span className="min-w-0 max-w-[80ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Role({ job }) {
  const visible = job.bullets.slice(0, VISIBLE_BULLETS);
  const rest = job.bullets.slice(VISIBLE_BULLETS);

  return (
    <li className="relative">
      <span aria-hidden="true" className="wire-node absolute -left-7 top-[calc(var(--pad)+.4rem)]" />
      <article className="tile">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h4 className="t-h3">{job.role}</h4>
            <p className="mt-1 text-sm font-medium leading-snug">
              <span className="font-semibold text-action">{job.company}</span>
              <span className="text-muted"> — {job.location} · {job.type}</span>
            </p>
          </div>
          <p className="flex-none rounded-inner bg-sunk px-2.5 py-1 font-mono text-xs text-ink">{job.dates}</p>
        </div>

        <div className="mt-4">
          <Bullets items={visible} />
          {rest.length > 0 && (
            <details className="mt-2">
              <summary>
                Show {rest.length} more points
                <span className="sr-only"> for {job.company}</span>
                <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
              </summary>
              <div className="pt-1">
                <Bullets items={rest} />
              </div>
            </details>
          )}
        </div>
      </article>
    </li>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <SectionHead num="04" id="about" label="About" title="About and experience." />

      <Reveal className="split split--rev">
        <div className="tile">
          <p className="t-lead max-w-[68ch] text-body">{profile.bio}</p>
        </div>
        <div className="tile bg-sunk shadow-none">
          <h3 className="label">Where and how I work</h3>
          <ul className="mt-3 divide-y divide-line">
            {setup.map((line) => (
              <li key={line} className="py-2.5 text-sm font-medium leading-snug text-ink first:pt-0 last:pb-0">{line}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <h3 className="t-h3 mb-4 mt-10">Six things to know about how I work.</h3>
      <Reveal className="tile">
        <ul className="grid gap-x-[var(--pad)] gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="min-w-0 border-t border-line pt-4">
              <p className="font-bold leading-snug text-ink">{benefit.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <h3 id="experience" className="t-h3 mb-4 mt-10">Where I've worked.</h3>
      <Reveal className="relative pl-7">
        <span aria-hidden="true" className="absolute bottom-6 left-1 top-6 w-0.5 bg-line-strong" />
        <ol className="flex flex-col gap-[var(--gap)]">
          {experience.map((job) => <Role key={job.company} job={job} />)}
        </ol>
      </Reveal>

      <p className="mt-[var(--gap)] rounded-tile border border-dashed border-line-strong px-[var(--pad)] py-4 text-sm leading-relaxed text-body">
        <strong className="font-semibold text-ink">{earlierExperience.label}.</strong>{' '}
        {earlierExperience.body}
      </p>

      <h3 className="t-h3 mb-4 mt-10">Education</h3>
      <Reveal className="duo">
        {education.map((entry) => (
          <article key={entry.degree} className="tile">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h4 className="font-bold leading-snug text-ink">{entry.degree}</h4>
              <p className="flex-none font-mono text-xs text-muted">{entry.dates}</p>
            </div>
            <p className="mt-1 text-sm font-semibold leading-snug text-action">{entry.school}</p>
            <p className="mt-3 text-sm leading-relaxed text-body">{entry.note}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
