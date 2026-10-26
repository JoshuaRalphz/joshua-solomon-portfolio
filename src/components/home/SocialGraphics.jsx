import { socialGraphics } from '../../data/content.js';

// 2 across on phones, 3 in a mid tile, 5 across once the tile is wide (.soc container query).
const SOC_SIZES = '(min-width: 1440px) 13vw, (min-width: 768px) 30vw, 45vw';

function Graphic({ item }) {
  const base = `/work/social/${item.img}`;
  return (
    <li>
      <figure>
        <a href={`${base}-960.webp`} target="_blank" rel="noopener noreferrer" className="gfx-thumb soc-thumb">
          <img
            src={`${base}-480.webp`}
            srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
            sizes={SOC_SIZES}
            alt={`${item.client} social post graphic`}
            width={item.w}
            height={item.h}
            loading="lazy"
            decoding="async"
          />
          <span className="sr-only"> (full size, opens in a new tab)</span>
        </a>
        <figcaption className="mt-2.5">
          <span className="block text-sm font-bold leading-snug text-ink">{item.client}</span>
          <span className="mt-0.5 block text-sm leading-snug text-body">{item.what}</span>
          <span className="mt-1.5 block font-mono text-xs leading-relaxed text-muted">{item.platform} · {item.date}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Social graphics made for agency clients that went out on their pages. */
export default function SocialGraphics() {
  return (
    <article id="work-social" className="tile case" aria-labelledby="social-title">
      <p className="label"><span className="label-num">04</span> {socialGraphics.kicker}</p>
      <h4 id="social-title" className="t-h2 mt-3">{socialGraphics.title}</h4>
      <p className="t-outcome t-outcome--sm mt-3">{socialGraphics.outcome}</p>
      <ul className="soc mt-5">
        {socialGraphics.items.map((item) => <Graphic key={item.img} item={item} />)}
      </ul>
    </article>
  );
}
