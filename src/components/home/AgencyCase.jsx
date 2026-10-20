import { Check, Info } from 'lucide-react';
import { agencyCase } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';

const SHOT_SIZES = '(min-width: 1280px) 40vw, (min-width: 1024px) 64vw, 92vw';

function Shot({ shot, className }) {
  return (
    <img
      src={shot.src}
      srcSet={webpSrcSet(shot.src)}
      sizes={SHOT_SIZES}
      alt={shot.label}
      width={shot.w}
      height={shot.h}
      loading="lazy"
      decoding="async"
      className={`h-auto rounded-inner border border-line shadow-lift ${className}`}
    />
  );
}

/** The shorter third case: business outcome first, existing approved screenshots only. */
export default function AgencyCase() {
  const [first, second] = agencyCase.gallery;

  return (
    <article id="work-agency" className="tile case" aria-labelledby="agency-title">
      <div className="case-grid">
        <div className="min-w-0">
          <p className="label"><span className="label-num">03</span> {agencyCase.kicker}</p>
          <h3 id="agency-title" className="t-h2 mt-3">{agencyCase.title}</h3>
          <p className="t-outcome t-outcome--sm mt-3">{agencyCase.outcome}</p>
          <ul className="mt-5 space-y-2">
            {agencyCase.changed.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm font-medium leading-snug text-ink">
                <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-body">{agencyCase.safety}</p>
          <p className="wrap-anywhere mt-4 font-mono text-xs leading-relaxed text-muted">{agencyCase.stack.join(' · ')}</p>
          <p className="mt-4 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
            <Info size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
            {agencyCase.note}
          </p>
        </div>

        <figure className="min-w-0">
          <Shot shot={first} className="w-full" />
          <Shot shot={second} className="relative ml-auto mt-3 w-[82%] md:-mt-[12%]" />
          <figcaption className="mt-3 text-sm font-medium leading-snug text-muted">
            {first.label}. {second.label}.
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
