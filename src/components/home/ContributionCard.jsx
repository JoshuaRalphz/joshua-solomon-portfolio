import { useId, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';

/**
 * "My contribution" card: screenshot, role tag, name, one first-person line, a link out
 * and a "Read more" toggle that shows the project overview. The overview is in the
 * prerendered HTML (crawlers read it) but stays hidden until the toggle runs, so it needs JS.
 */
export default function ContributionCard({ id, name, role, line, href, linkLabel, image, overview, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <li id={id} className="tile site-card flex flex-col p-3">
      <div className="shot-frame">
        <span className="shot-bar" aria-hidden="true"><i /><i /><i /></span>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          alt={image.alt}
          width={image.w}
          height={image.h}
          loading="lazy"
          decoding="async"
          className="site-thumb"
        />
      </div>
      <div className="flex flex-col px-2 pb-1 pt-4">
        <p className="role-tag">{role}</p>
        <h4 className="t-h3 mt-2.5">{name}</h4>
        <p className="mt-1.5 text-sm leading-snug text-body">{line}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            {linkLabel}<span className="sr-only">: {name} (opens in a new tab)</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="more-toggle"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? 'Read less' : 'Read more'}<span className="sr-only"> about {name}</span>
            <Plus size={16} aria-hidden="true" className="more-icon" />
          </button>
        </div>

        <div id={panelId} hidden={!isOpen} className="overview">
          <p className="label">Project overview</p>
          {overview.map((paragraph) => <p key={paragraph} className="mt-2">{paragraph}</p>)}
          {children}
        </div>
      </div>
    </li>
  );
}
