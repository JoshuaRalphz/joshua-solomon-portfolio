import { useRef } from 'react';
import { flow } from '../../data/content.js';
import { useInViewOnce } from '../../hooks/useInView.js';

/**
 * "How my AI systems run": four nodes on a line. One staggered run when it enters
 * view, then it rests lit. It describes a process; it is not live data.
 */
export default function FlowTile({ className = '' }) {
  const listRef = useRef(null);
  const isLit = useInViewOnce(listRef, 0.5);

  return (
    <div className={`tile tile--ink on-ink ${className}`}>
      <h2 className="label">How my AI systems run</h2>
      <ol ref={listRef} className="flow mt-5" data-lit={isLit}>
        {flow.map((step, i) => (
          <li key={step.label} style={{ '--n': i }}>
            <strong>{step.label}</strong>
            <span>{step.caption}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
