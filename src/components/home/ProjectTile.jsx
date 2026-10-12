import { Check, ExternalLink, MapPin } from 'lucide-react';
import { webpSrcSet } from '../../lib/images.js';

// A tile is half the main column from 768px (the rail takes about 22vw from
// 1024px) and the full width below that.
const THUMB_SIZES = '(min-width: 1024px) 34vw, (min-width: 768px) 46vw, 92vw';

/**
 * One client project: the 16:9 screenshot on top at every width (a side-by-side
 * layout cropped it to a strip), then what it was, the stack and the live link.
 */
export default function ProjectTile({ work }) {
  const [name, subtitle] = work.title.split(' — ');
  const hostname = work.liveUrl ? new URL(work.liveUrl).hostname.replace('www.', '') : null;

  return (
    <li className="flex md:[grid-column:span_3] xl:[grid-column:span_6]">
      <article id={`work-${work.id}`} className="tile flex w-full flex-col overflow-hidden p-0">
        {/* Initials sit under the screenshot as the fallback if it fails to load. */}
        <div className="relative grid aspect-video place-items-center overflow-hidden bg-sunk">
          <span aria-hidden="true" className="text-5xl font-extrabold text-muted">{work.initials}</span>
          {work.thumb && (
            <img
              src={work.thumb}
              srcSet={webpSrcSet(work.thumb)}
              sizes={THUMB_SIZES}
              alt={`${name} website screenshot`}
              width={1920}
              height={1032}
              loading="lazy"
              decoding="async"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-[var(--pad)]">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-ink">{work.tag}</span>
            {work.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} aria-hidden="true" className="flex-none" />
                {work.location}
              </span>
            )}
          </p>

          <h4 className="t-h3 mt-3">{name}</h4>
          {subtitle && <p className="mt-1 text-sm font-medium leading-snug text-muted">{subtitle}</p>}
          <p className="mt-3 text-sm leading-relaxed text-body">{work.summary}</p>

          {work.wins && (
            <ul className="mt-3 space-y-1.5">
              {work.wins.map((win) => (
                <li key={win} className="flex items-start gap-2 text-sm font-medium text-ink">
                  <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
                  {win}
                </li>
              ))}
            </ul>
          )}

          <p className="wrap-anywhere mt-auto pt-4 font-mono text-xs leading-relaxed text-muted">
            {work.stack.join(' · ')}
          </p>
          {hostname && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link wrap-anywhere relative mt-1 inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-sm"
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
