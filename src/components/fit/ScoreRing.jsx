import { useEffect, useState } from 'react';

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function scoreBand(score) {
  if (score >= 80) return 'Strong fit';
  if (score >= 60) return 'Good fit';
  if (score >= 40) return 'Partial fit';
  return 'A different kind of role';
}

/**
 * The fit score as a lime arc on an ink ring. The arc grows once after mount
 * (CSS transition, so prefers-reduced-motion makes it instant).
 */
export default function ScoreRing({ score }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(score));
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="fit-ring" role="img" aria-label={`Fit score ${score} out of 100: ${scoreBand(score)}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="fit-ring-track" cx="60" cy="60" r={RADIUS} />
        <circle
          className="fit-ring-arc"
          cx="60"
          cy="60"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - shown / 100)}
        />
      </svg>
      <span className="fit-ring-value" aria-hidden="true">
        <span className="fit-ring-num">{score}</span>
        <span className="fit-ring-of">/100</span>
      </span>
    </div>
  );
}
