import { ChevronDown } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { bio, earlierExperience, education, experience, profile, setup } from '../../data/content.js';

// How many bullets of each role show before the "Show N more" disclosure.
const VISIBLE_BULLETS = 2;

function Bullets({ items }) {
  return (
    <ul className="space-y-2">
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
    <li className="tile">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h3 className="t-h3">{job.role}</h3>
          <p className="mt-1 text-sm font-medium leading-snug">
            <span className="font-semibold text-action">{job.company}</span>
            <span className="text-muted"> · {job.meta}</span>
          </p>
        </div>
        <p className="flex-none rounded-inner bg-sunk px-2.5 py-1 font-mono text-xs text-ink">{job.dates}</p>
      </div>
      <div className="mt-4">
        <Bullets items={visible} />
        {rest.length > 0 && (
          <details className="mt-1">
            <summary>
              Show {rest.length} more<span className="sr-only"> points for {job.company}</span>
              <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
            </summary>
            <Bullets items={rest} />
          </details>
        )}
      </div>
    </li>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <SectionHead id="about" label="About" title="About and experience." />
      <Reveal className="split split--rev">
        <div className="tile">
          <p className="t-lead text-ink">{bio}</p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted">{profile.experienceLine}</p>
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

      <Reveal as="ol" className="roles mt-[var(--gap)]">
        {experience.map((job) => <Role key={job.company} job={job} />)}
      </Reveal>
      <p className="mt-[var(--gap)] rounded-tile border border-dashed border-line-strong px-[var(--pad)] py-4 text-sm leading-relaxed text-body">
        <strong className="font-semibold text-ink">Education.</strong> {education} {earlierExperience}
      </p>
    </section>
  );
}
