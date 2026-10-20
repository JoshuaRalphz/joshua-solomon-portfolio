import { sections } from '../../data/content.js';
import { useActiveSection } from '../../hooks/useActiveSection.jsx';

/**
 * Section heading: wire node + mono label ("01 PROJECTS"), the h2 and an
 * optional intro. The node turns lime while its section is on screen, the same
 * node the rail and the Explore cards use.
 */
export default function SectionHead({ num: fallbackNum, id, label, title, intro }) {
  const isActive = sections[useActiveSection()]?.id === id;
  // The number comes from `sections` (content.js), so the menu and the heads never disagree.
  const num = sections.find((section) => section.id === id)?.num ?? fallbackNum;

  return (
    <div className="mb-6">
      <p className="label flex items-center gap-2.5">
        <span className="wire-node" data-active={isActive} aria-hidden="true" />
        <span>
          <span className="label-num">{num}</span> {label}
        </span>
      </p>
      <h2 id={`${id}-title`} className="t-h2 mt-3">{title}</h2>
      {intro && <p className="intro mt-3">{intro}</p>}
    </div>
  );
}
