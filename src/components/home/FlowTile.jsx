import { useId, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import { flow } from '../../data/content.js';
import { useInViewOnce } from '../../hooks/useInView.js';

/**
 * "How my AI systems run": four nodes on a line. One staggered run when it enters
 * view, then it rests lit. Hover, tap or press a step to see that same step in the
 * real AI job hunt. With no JavaScript the first example shows and every caption reads.
 */
export default function FlowTile({ className = '' }) {
  const listRef = useRef(null);
  const isLit = useInViewOnce(listRef, 0.5);
  const [active, setActive] = useState(0);
  const panelId = useId();

  return (
    <Reveal className={`tile tile--ink on-ink flex flex-col ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="label">How my AI systems run</h2>
        <p className="text-sm font-medium text-mist-dim">Hover or tap a step for a real example</p>
      </div>
      <ol ref={listRef} className="flow mt-5" data-lit={isLit}>
        {flow.map((step, i) => (
          <li key={step.label} style={{ '--n': i }} data-active={i === active}>
            <button
              type="button"
              className="flow-step"
              aria-pressed={i === active}
              aria-controls={panelId}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <strong>{step.label}</strong>
              <span>{step.caption}</span>
            </button>
          </li>
        ))}
      </ol>

      <div id={panelId} aria-live="polite" className="flow-example mt-5">
        <p className="label">
          <span className="label-num">Step {active + 1} of {flow.length}</span> · In the AI Job Hunt engine
        </p>
        <p className="mt-2 max-w-[80ch] text-sm font-medium leading-relaxed text-mist">{flow[active].example}</p>
        <a href="/work/ai-job-hunt/" className="proof-link text-lime">
          Read the case study <ArrowRight size={16} aria-hidden="true" className="flex-none" />
        </a>
      </div>
    </Reveal>
  );
}
