import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import { agencyCase, audiences, explore, sections } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';
import { useActiveSection } from '../../hooks/useActiveSection.jsx';

const peekShot = agencyCase.gallery[0];
// The card is half the main column from 1280px and the full main column below.
const PEEK_SIZES = '(min-width: 1280px) 34vw, (min-width: 1024px) 62vw, 90vw';

// Six cards, five sizes. Phones: two half cards side by side, the rest full width.
const CARD_LAYOUT = {
  work: { place: 'xl:[grid-column:1/7] xl:[grid-row:1/3]', tone: 'overflow-hidden' },
  'fit-agent': { place: 'col-span-1 md:[grid-column:span_3] xl:[grid-column:7/10] xl:[grid-row:1]', tone: 'tile--lime', line: 'text-ink', isHalf: true },
  results: { place: 'col-span-1 md:[grid-column:span_3] xl:[grid-column:10/13] xl:[grid-row:1]', isHalf: true, isNumber: true },
  capabilities: { place: 'md:[grid-column:span_2] xl:[grid-column:7/13] xl:[grid-row:2]' },
  about: { place: 'md:[grid-column:span_4] xl:[grid-column:1/7] xl:[grid-row:3]' },
  contact: { place: 'md:[grid-column:span_6] xl:[grid-column:7/13] xl:[grid-row:3]', tone: 'tile--ink on-ink', line: 'text-mist-dim', arrow: 'text-lime' },
};

/** Which audiences get the "For you" tag on this card, as a data-aud list. */
const forYou = (id) => audiences.filter((a) => a.forYou.includes(id)).map((a) => a.id).join(' ');

function ExploreCard({ card, isActive }) {
  const { place = '', tone = '', line = 'text-body', arrow = 'text-ink', isHalf = false, isNumber = false } = CARD_LAYOUT[card.id] ?? {};
  const isProjects = card.id === 'work';
  const tagFor = forYou(card.id);

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
          <ArrowUpRight size={20} aria-hidden="true" className={`nudge flex-none ${arrow} ${isHalf ? 'max-md:hidden' : ''}`} />
        </span>

        {tagFor && <span data-aud={tagFor} className="for-you mt-3">For you</span>}

        <h3 className={`mt-3 ${isNumber ? 't-num-lead' : 't-h3'}`}>{card.title}</h3>
        {Object.entries(card.lines).map(([audience, text]) => (
          <span key={audience} data-aud={audience} className={`mt-2 block max-w-[52ch] text-sm font-medium leading-snug ${line}`}>
            {text}
          </span>
        ))}

        {isProjects && (
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

/** Six numbered cards. Each one is a real link that jumps to its section. */
export default function ExploreCards() {
  const activeId = sections[useActiveSection()]?.id;

  return (
    <section aria-labelledby="explore-title">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="explore-title" className="label">Explore</h2>
        <p className="text-sm font-medium text-muted">Six cards. Each one opens a section; the ones tagged “For you” fit who you are.</p>
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
