import { Check, ExternalLink, MapPin } from 'lucide-react';

// "lead" = the two client builds with wins; "compact" = the other four.
// Each is a column by default and turns horizontal where the grid gives it room.
const VARIANTS = {
  lead: {
    place: 'md:[grid-column:1/-1] xl:[grid-column:span_6]',
    layout: 'md:grid md:[grid-template-columns:42%_minmax(0,1fr)] xl:flex xl:flex-col',
    thumb: 'aspect-video md:aspect-auto md:min-h-[11rem] xl:aspect-video xl:min-h-0',
  },
  compact: {
    place: 'md:[grid-column:span_3] xl:[grid-column:span_6]',
    layout: 'xl:grid xl:[grid-template-columns:38%_minmax(0,1fr)]',
    thumb: 'aspect-video xl:aspect-auto xl:min-h-[11rem]',
  },
};

/** One client build: screenshot, what it was, the stack, and the live link. */
export default function ProjectTile({ work, variant }) {
  const { place, layout, thumb } = VARIANTS[variant];
  const [name, subtitle] = work.title.split(' — ');
  const hostname = new URL(work.liveUrl).hostname.replace('www.', '');

  return (
    <li className={`flex ${place}`}>
      <article id={`work-${work.id}`} className={`tile flex w-full flex-col overflow-hidden p-0 ${layout}`}>
        {/* Initials sit under the screenshot as the fallback if it fails to load. */}
        <div className={`relative grid place-items-center overflow-hidden bg-sunk ${thumb}`}>
          <span aria-hidden="true" className="text-5xl font-extrabold text-muted">{work.initials}</span>
          <img
            src={work.thumb}
            alt={`${name} website screenshot`}
            width={1920}
            height={1032}
            loading="lazy"
            decoding="async"
            onError={(event) => { event.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 h-full w-full object-cover object-left-top"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-[var(--pad)]">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-ink">{work.tag}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" className="flex-none" />
              {work.location}
            </span>
          </p>

          <h4 className="t-h3 mt-3">{name}</h4>
          {subtitle && <p className="mt-1 text-sm font-medium leading-snug text-muted">{subtitle}</p>}
          <p className="mt-3 text-sm leading-relaxed text-body">{work.summary}</p>

          {variant === 'lead' && work.wins && (
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
        </div>
      </article>
    </li>
  );
}
