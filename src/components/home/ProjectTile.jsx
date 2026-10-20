import { ExternalLink, MapPin } from 'lucide-react';
import { webpSrcSet } from '../../lib/images.js';

// A tile is half the main column from 768px (the rail takes about 22vw from
// 1024px) and the full width below that.
const THUMB_SIZES = '(min-width: 1024px) 34vw, (min-width: 768px) 46vw, 92vw';

/**
 * One client project: the 16:9 screenshot on top at every width, then what changed
 * for the client and the live link (only where the domain still belongs to them).
 */
export default function ProjectTile({ work }) {
  const hostname = work.url ? new URL(work.url).hostname.replace('www.', '') : null;

  return (
    <li className="flex md:[grid-column:span_3] xl:[grid-column:span_4]">
      <article id={`work-${work.id}`} className="tile flex w-full flex-col overflow-hidden p-0">
        {/* Initials sit under the screenshot as the fallback if it fails to load. */}
        <div className="relative grid aspect-video place-items-center overflow-hidden bg-sunk">
          <span aria-hidden="true" className="text-5xl font-extrabold text-muted">{work.initials}</span>
          <img
            src={work.thumb}
            srcSet={webpSrcSet(work.thumb)}
            sizes={THUMB_SIZES}
            alt={`${work.name} website screenshot`}
            width={1920}
            height={1032}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-left-top"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-[var(--pad)]">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-ink">{work.tag}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" className="flex-none" />
              {work.place}
            </span>
          </p>
          <h4 className="t-h3 mt-3">{work.name}</h4>
          <p className="mt-2 text-sm leading-relaxed text-body">{work.line}</p>

          {hostname && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link wrap-anywhere relative mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 self-start pt-2 text-sm"
            >
              <ExternalLink size={15} aria-hidden="true" className="flex-none" />
              {hostname}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </article>
    </li>
  );
}
