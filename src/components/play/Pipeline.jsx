/**
 * The site's wire, lying flat: numbered nodes on one line that light up in order.
 * `states` gives each step 'idle' | 'active' | 'done'. Always vertical with `vertical`,
 * otherwise vertical on small screens and in a row from 900px.
 */
export default function Pipeline({ steps, states, label, tone = 'light', vertical = false }) {
  return (
    <ol className={`play-pipe play-pipe--${tone}${vertical ? ' play-pipe--col' : ''}`} aria-label={label}>
      {steps.map((step, i) => {
        const state = states?.[i] ?? 'idle';
        return (
          <li key={step.label} data-state={state} aria-current={state === 'active' ? 'step' : undefined}>
            <span className="play-pipe-node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="min-w-0">
              <strong>{step.label}</strong>
              {step.caption && <span>{step.caption}</span>}
              <span className="sr-only">{state === 'done' ? ' (done)' : state === 'active' ? ' (in progress)' : ''}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** States for a pipeline that is `at` step i: earlier done, i active, later idle. */
export function pipeStates(count, at, { finished = false } = {}) {
  return Array.from({ length: count }, (_, i) => {
    if (finished || i < at) return 'done';
    return i === at ? 'active' : 'idle';
  });
}
