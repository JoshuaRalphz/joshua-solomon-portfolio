import { ArrowRight } from 'lucide-react';
import PortraitMedia from './PortraitMedia.jsx';
import { hero, heroStats, profile } from '../../data/content.js';

/** Who, what it does for a business, one action and the proof. Never animated (largest paint).
    The CV button and the experience line live in the profile rail and About, so they are not repeated here. */
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
        <p className="t-lead mt-4 max-w-[60ch] text-body">{hero.promise}</p>

        <div className="mb-8 mt-7">
          <a href="#fit-agent" className="btn btn-primary">
            See how I’d help your team <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <ul className="proof proof--3 mt-auto" aria-label="Results from client and agency work">
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
    <div className="tile flex flex-col xl:[grid-column:9/13] xl:[grid-row:1]">
      <div className="portrait">
        <PortraitMedia />
      </div>
    </div>
  );
}

/** First screen: headline + proof beside the portrait. How the systems run follows the Work section. */
export default function HeroBento() {
  return (
    <section aria-label="Overview" className="bento">
      <HeadlineTile />
      <PortraitTile />
    </section>
  );
}
