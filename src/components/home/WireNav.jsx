import { sections } from '../../data/content.js';
import { useActiveSection } from '../../hooks/useActiveSection.jsx';

/**
 * The section menu drawn as a running workflow: one line, a numbered node per section,
 * the line fills in ink down to the current section and a lime packet sits on
 * the active node. Geometry lives in styles/signature.css (.wire).
 */
export default function WireNav({ className = '' }) {
  const index = useActiveSection();

  return (
    <nav aria-label="Sections" className={className}>
      <div className="wire" style={{ '--i': index, '--last': sections.length - 1 }}>
        <ol>
          {sections.map((section, i) => (
            <li key={section.id} data-passed={i < index}>
              <a href={`#${section.id}`} aria-current={i === index ? 'location' : undefined}>
                <span className="font-mono text-xs font-medium text-action">{section.num}</span>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
        <span className="wire-packet" aria-hidden="true" />
      </div>
    </nav>
  );
}
