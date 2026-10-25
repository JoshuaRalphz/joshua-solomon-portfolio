import { Info, Sparkles } from 'lucide-react';
import { emailGraphics } from '../../data/content.js';

// 2 across on phones, 4 across once the tile is wide enough (container query in styles.css).
const GFX_SIZES = '(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 45vw';

function Graphic({ item }) {
  const full = `${item.img}-${item.w}.webp`;
  const alt = `${item.client}: ${item.what}`;

  return (
    <li>
      <figure>
        <a href={full} target="_blank" rel="noopener noreferrer" className="gfx-thumb">
          <img
            src={`${item.img}-${item.small}.webp`}
            srcSet={`${item.img}-${item.small}.webp ${item.small}w, ${full} ${item.w}w`}
            sizes={GFX_SIZES}
            alt={alt}
            width={item.w}
            height={item.h}
            loading="lazy"
            decoding="async"
            style={item.focus ? { objectPosition: item.focus } : undefined}
          />
          <span className="sr-only"> (open full size in a new tab)</span>
        </a>
        <figcaption className="mt-2.5">
          <span className="block text-sm font-bold leading-snug text-ink">{item.client}</span>
          <span className="mt-0.5 block text-sm leading-snug text-body">{item.what}</span>
          <span className="mt-1.5 block font-mono text-xs leading-relaxed text-muted">
            {item.date} · {item.delivered} delivered · {item.clicked} clicked
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Email marketing graphics that went out in real newsletters, with honest reach numbers. */
export default function EmailGraphics() {
  return (
    <article id="work-graphics" className="tile case" aria-labelledby="graphics-title">
      <p className="label"><span className="label-num">02</span> {emailGraphics.kicker}</p>
      <h4 id="graphics-title" className="t-h2 mt-3">{emailGraphics.title}</h4>
      <p className="t-outcome t-outcome--sm mt-3">{emailGraphics.outcome}</p>
      <p className="mt-3 flex max-w-[66ch] items-start gap-2 text-sm leading-relaxed text-body">
        <Sparkles size={16} aria-hidden="true" className="mt-1 flex-none text-action" />
        {emailGraphics.how}
      </p>
      <ul className="gfx mt-5">
        {emailGraphics.items.map((item) => <Graphic key={item.img} item={item} />)}
      </ul>
      <p className="mt-4 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <Info size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        {emailGraphics.note}
      </p>
    </article>
  );
}
