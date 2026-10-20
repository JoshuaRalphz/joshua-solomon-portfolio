import { ArrowRight, Download } from 'lucide-react';
import FlowTile from './FlowTile.jsx';
import ToolStrip from './ToolStrip.jsx';
import PortraitMedia from './PortraitMedia.jsx';
import { hero, heroStats, profile } from '../../data/content.js';

/** Who, what it does for a business, the proof and the two actions. Never animated (largest paint). */
function HeadlineTile() {
  return (
    <div className="tile flex flex-col xl:[grid-column:1/9] xl:[grid-row:1]">
      <div className="cq flex flex-1 flex-col">
        <p className="inline-flex max-w-full items-start gap-2.5 self-start rounded-inner bg-sunk px-3.5 py-2 text-sm font-medium leading-snug text-ink md:rounded-full">
          <span aria-hidden="true" className="mt-[.3125rem] h-2.5 w-2.5 flex-none rounded-full bg-lime shadow-[0_0_0_1.5px_#0D2B23]" />
          {profile.available}
        </p>

        <h1 className="mt-5 md:mt-6">
          <span className="label block text-action">{profile.name}</span>
          <span className="t-h1 mt-3 block">{profile.title}</span>
        </h1>
        <p className="t-outcome mt-4 max-w-[30ch]">{hero.outcome}</p>
        <p className="t-lead mt-3 max-w-[62ch] text-body">{hero.promise}</p>
        <p className="mt-3 font-mono text-xs leading-relaxed text-muted">{profile.experienceLine}</p>

        <div className="mb-7 mt-6 flex flex-wrap gap-2.5">
          <a href="#fit-agent" className="btn btn-primary">
            See how I’d help your team <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href={profile.resumeUrl} download className="btn btn-secondary">
            <Download size={18} aria-hidden="true" /> Download CV
          </a>
        </div>

        <ul className="proof mt-auto pt-7" aria-label="Results from client, agency and own work">
          {heroStats.map((stat) => (
            <li key={stat.label}>
              <span className="t-chip block text-ink">{stat.value}</span>{' '}
              <span className="mt-1 block text-sm font-medium leading-snug text-muted">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PortraitTile() {
  return (
    <div className="tile flex flex-col md:[grid-column:span_2] xl:[grid-column:9/13] xl:[grid-row:1]">
      <div className="portrait">
        <PortraitMedia />
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-muted">
        <span className="font-bold text-ink">{profile.name}</span> · {profile.shortLocation}
      </p>
    </div>
  );
}

/** First screen: headline + proof, portrait, how the systems run, and the stack. */
export default function HeroBento() {
  return (
    <section aria-label="Overview" className="bento">
      <HeadlineTile />
      <PortraitTile />
      <FlowTile className="md:[grid-column:span_4] xl:[grid-column:1/8] xl:[grid-row:2]" />
      <ToolStrip className="md:[grid-column:span_6] xl:[grid-column:8/13] xl:[grid-row:2]" />
    </section>
  );
}
