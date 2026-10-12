import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Reveal } from '../PageTransition.jsx';
import { flow } from '../../data/content.js';

/**
 * "How a campaign moves": four nodes on a line. One staggered run of about
 * 2.5 seconds when it enters view, then it rests lit. No loop, no counters:
 * it describes a process, it is not live data.
 */
export default function FlowTile({ className = '' }) {
  const listRef = useRef(null);
  const isInView = useInView(listRef, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const isLit = Boolean(isInView || prefersReducedMotion);

  return (
    <Reveal className={`tile tile--ink on-ink ${className}`}>
      <h2 className="label">How a campaign moves</h2>
      <ol ref={listRef} className="flow mt-5" data-lit={isLit}>
        {flow.map((step, i) => (
          <li key={step.label} style={{ '--n': i }}>
            <strong>{step.label}</strong>
            <span className="max-md:sr-only">{step.caption}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
