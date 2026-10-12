import { Reveal } from '../Reveal.jsx';
import FlowTile from './FlowTile.jsx';
import ToolStrip from './ToolStrip.jsx';
import { hero, initials, profile, stats } from '../../data/content.js';

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

        <ul className="mt-auto grid grid-cols-3 pt-6 max-[479px]:grid-cols-1 md:pt-8">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`min-w-0 border-line max-[479px]:flex max-[479px]:items-baseline max-[479px]:gap-3 max-[479px]:py-2.5 min-[480px]:px-3 ${
                i === 0
                  ? 'min-[480px]:pl-0'
                  : 'max-[479px]:border-t min-[480px]:border-l'
              }`}
            >
              <span className="t-chip block flex-none text-ink max-[479px]:w-[4.5rem]">{stat.value}</span>
              <span className="block text-sm font-medium leading-snug text-muted min-[480px]:mt-1.5">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The photo, or the monogram until profile.photo is set. */
function PortraitTile() {
  return (
    <Reveal className="tile flex flex-col md:[grid-column:span_4] xl:[grid-column:8/13] xl:[grid-row:1]">
      {/* From 1280 the panel stretches to the row height; below that it has a fixed ratio. */}
      <div className="portrait">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={960}
            height={1399}
            className="absolute inset-0 h-full w-full object-cover object-[50%_8%]"
          />
        ) : (
          <span className="portrait-mark" aria-hidden="true">{initials}</span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-muted">
        <span className="font-bold text-ink">{profile.name}</span> · {profile.shortLocation}
      </p>
    </Reveal>
  );
}

/** First screen: headline + proof chips, portrait, the flow tile and the tools strip. */
export default function HeroBento() {
  return (
    <section aria-label="Overview" className="bento">
      <HeadlineTile />
      <PortraitTile />
      <FlowTile className="md:[grid-column:span_2] xl:[grid-column:1/-1] xl:[grid-row:2]" />
      <ToolStrip />
    </section>
  );
}
