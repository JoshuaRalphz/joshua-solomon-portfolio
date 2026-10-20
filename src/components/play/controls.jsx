import { useEffect, useId, useState } from 'react';

/**
 * Single-choice chips (toggle buttons). Pressing the selected chip clears it,
 * so every group stays optional. Keyboard: Tab between chips, Space/Enter to toggle.
 */
export function ChipGroup({ label, options, value, onChange, disabled = false }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="mt-4">
      <p id={id} className="text-sm font-semibold text-mist">
        {label} <span className="font-medium text-mist-dim">(optional)</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="play-chip"
            aria-pressed={value === option}
            disabled={disabled}
            onClick={() => onChange(value === option ? '' : option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/** While `isRunning`, moves 0 -> count-1 one step every `ms` (and stays on the last). */
export function useStepTicker(isRunning, count, ms = 1600) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isRunning) return undefined;
    setStep(0);
    const timer = window.setInterval(() => setStep((current) => Math.min(current + 1, count - 1)), ms);
    return () => window.clearInterval(timer);
  }, [isRunning, count, ms]);
  return step;
}

/** Character count hint under a textarea. */
export function lengthHint(count, min, max, ready = 'Ready when you are.') {
  if (count === 0) return `${min.toLocaleString('en-US')} to ${max.toLocaleString('en-US')} characters.`;
  if (count < min) return `${min - count} more characters needed.`;
  if (count > max) return `${(count - max).toLocaleString('en-US')} characters over the limit.`;
  return ready;
}
