import { Reveal } from '../PageTransition.jsx';
import LoomFacade from './LoomFacade.jsx';
import FlowTile from './FlowTile.jsx';
import ToolStrip from './ToolStrip.jsx';
import { hero, profile, stats } from '../../data/content.js';

/** Who, what, proof: the headline tile is never animated (it is the largest paint). */
function HeadlineTile() {
  return (
    <div className="tile flex flex-col xl:[grid-column:1/8] xl:[grid-row:1]">
      <div className="cq flex flex-1 flex-col">
        <p className="inline-flex max-w-full items-start gap-2.5 self-start rounded-inner bg-sunk px-3.5 py-2 text-sm font-medium leading-snug text-ink md:rounded-full">
          <span
            aria-hidden="true"
            className="mt-[.3125rem] h-2.5 w-2.5 flex-none rounded-full bg-lime shadow-[0_0_0_1.5px_#0D2B23]"
          />
          {profile.available}
        </p>

        <h1 className="t-h1 mt-5 md:mt-6">{hero.headline}</h1>
        <p className="t-lead mt-4 max-w-[68ch] text-body md:mt-5">{hero.promise}</p>

        <ul className="mt-auto grid grid-cols-3 pt-6 max-[359px]:grid-cols-1 md:pt-8">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`min-w-0 border-line max-[359px]:flex max-[359px]:items-baseline max-[359px]:gap-3 max-[359px]:py-2.5 min-[360px]:px-3 ${
                i === 0
                  ? 'min-[360px]:pl-0'
                  : 'max-[359px]:border-t min-[360px]:border-l'
              }`}
            >
              <span className="t-chip block flex-none text-ink max-[359px]:w-[4.5rem]">{stat.value}</span>
              <span className="block text-sm font-medium leading-snug text-muted min-[360px]:mt-1.5">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VideoTile() {
  return (
    <Reveal className="tile flex flex-col md:[grid-column:span_4] xl:[grid-column:8/13] xl:[grid-row:1]">
      <h2 className="label">Intro · 70 sec</h2>
      {/* From 1280 the ink panel stretches to the row height; below that it is 16:9. */}
      <div className="mt-3 xl:flex xl:flex-1 xl:flex-col">
        <LoomFacade />
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-muted">
        A short Loom intro. Nothing loads from Loom until you press play.{' '}
        <a
          href={profile.loom.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link relative inline-block"
        >
          Open on Loom<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </Reveal>
  );
}

/** First screen: headline + proof chips, intro video, the flow tile and the tools strip. */
export default function HeroBento() {
  return (
    <section aria-label="Overview" className="bento">
      <HeadlineTile />
      <VideoTile />
      <FlowTile className="md:[grid-column:span_2] xl:[grid-column:1/-1] xl:[grid-row:2]" />
      <ToolStrip />
    </section>
  );
}
