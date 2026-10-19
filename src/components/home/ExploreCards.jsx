import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import { aiBuilds, explore, sections, works } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';
import { useActiveSection } from '../../hooks/useActiveSection.jsx';

const featured = works.find((work) => work.featured);
// "Projects", not "builds": one of them is ongoing email, site and SEO work.
const clientProjectCount = works.filter((work) => !work.featured).length;
// AI builds lead the title, the same order as the Projects section.
const projectsTitle = featured
  ? `${aiBuilds.length} AI builds, ${featured.title.split(' — ')[0]} and ${clientProjectCount} client projects`
  : `${aiBuilds.length} AI builds and ${clientProjectCount} client projects`;
const peekShot = featured?.gallery?.[0];
// The card is half the main column from 1280px and the full main column below.
const PEEK_SIZES = '(min-width: 1280px) 34vw, (min-width: 1024px) 62vw, 90vw';

// Five cards, four sizes. The 2+4 then 4+2 mirror at 768 is deliberate.
const CARD_LAYOUT = {
  work: { place: 'xl:[grid-column:1/7] xl:[grid-row:1/3]', tone: 'overflow-hidden' },
  results: { place: 'col-span-1 md:[grid-column:span_2] xl:[grid-column:7/10] xl:[grid-row:1]', tone: 'tile--lime', line: 'text-ink', isHalf: true },
  capabilities: { place: 'col-span-1 md:[grid-column:span_4] xl:[grid-column:10/13] xl:[grid-row:1]', isHalf: true },
  about: { place: 'md:[grid-column:span_4] xl:[grid-column:7/13] xl:[grid-row:2]' },
  contact: { place: 'md:[grid-column:span_2] xl:[grid-column:1/-1] xl:[grid-row:3]', tone: 'tile--ink on-ink', line: 'text-mist-dim', arrow: 'text-lime' },
};

function ExploreCard({ card, isActive }) {
  const { place = '', tone = '', line = 'text-body', arrow = 'text-ink', isHalf = false } = CARD_LAYOUT[card.id] ?? {};
  const isProjects = card.id === 'work';
  const isResults = card.id === 'results';
  const title = isProjects ? projectsTitle : card.title;

  return (
    <li className={`flex ${place}`}>
      <a href={`#${card.id}`} className={`tile flex w-full flex-col ${tone}`}>
        <span className="flex min-h-[1.5rem] items-start justify-between gap-2">
          <span className="label flex min-w-0 items-center gap-2.5">
            <span className="wire-node" data-active={isActive} aria-hidden="true" />
            <span>
              <span className="label-num">{card.num}</span> {card.label}
            </span>
          </span>
          {/* The two half-width cards drop the arrow on phones so the label fits. */}
          <ArrowUpRight
            size={20}
            aria-hidden="true"
            className={`nudge flex-none ${arrow} ${isHalf ? 'max-md:hidden' : ''}`}
          />
        </span>

        <h3 className={`mt-4 ${isResults ? 't-num-lead' : 't-h3'}`}>{title}</h3>
        <p className={`mt-2 max-w-[52ch] text-sm font-medium leading-snug ${line}`}>
          {card.line}
        </p>

        {isProjects && peekShot && (
          <span
            aria-hidden="true"
            className="relative ml-[var(--pad)] mr-[calc(var(--pad)*-1)] mt-5 hidden min-h-[clamp(9rem,16vw,14rem)] flex-1 overflow-hidden rounded-tl-inner border-l border-t border-line bg-sunk [margin-bottom:calc(var(--pad)*-1)] md:block"
          >
            <img
              src={peekShot.src}
              srcSet={webpSrcSet(peekShot.src)}
              sizes={PEEK_SIZES}
              alt=""
              width={peekShot.w}
              height={peekShot.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          </span>
        )}
      </a>
    </li>
  );
}

/** Five numbered cards. Each one is a real link that jumps to its section. */
export default function ExploreCards() {
  const activeId = sections[useActiveSection()]?.id;

  return (
    <section aria-labelledby="explore-title">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="explore-title" className="label">Explore</h2>
        <p className="text-sm font-medium text-muted">Five cards. Each one opens a section.</p>
      </div>
      <Reveal>
        <ul className="bento">
          {explore.map((card) => (
            <ExploreCard key={card.id} card={card} isActive={card.id === activeId} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
