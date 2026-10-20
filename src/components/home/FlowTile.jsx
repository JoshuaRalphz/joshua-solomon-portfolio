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
    <div className={`tile tile--ink on-ink flex flex-col ${className}`}>
      <h2 className="label">How my AI systems run</h2>
      <ol ref={listRef} className="flow mb-6 mt-5" data-lit={isLit}>
        {flow.map((step, i) => (
          <li key={step.label} style={{ '--n': i }}>
            <strong>{step.label}</strong>{' '}
            <span>{step.caption}</span>
          </li>
        ))}
      </ol>
      <div className="mt-auto border-t border-white/15 pt-5">
        <p className="label">Example: my job hunt</p>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed opacity-90">
          Every day at 7 AM → Claude vets up to 30 new roles for fit, scam risk and pay → a second pass strips any claim not in my CV → anything unclear waits for my approval, under a hard daily AI budget.
        </p>
        <a href="/work/ai-job-hunt/" className="mt-3 inline-flex min-h-[44px] items-center text-sm font-bold underline underline-offset-4">
          See how it’s built →
        </a>
      </div>
    </div>
  );
}
