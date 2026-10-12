import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronDown, Pause, Play } from 'lucide-react';
import { Reveal } from '../PageTransition.jsx';
import { toolStrip, tools } from '../../data/content.js';

const TIERS = ['Daily', 'Weekly', 'Occasional'];
const ICON_CDN = 'https://cdn.simpleicons.org';
const ICON_COLOUR = '0D2B23';

/** One chip. Tools without a real mark show the name only: no made-up badges. */
function ToolChip({ tool }) {
  return (
    <li className="tool-chip">
      {tool.slug && (
        <img
          src={`${ICON_CDN}/${tool.slug}/${ICON_COLOUR}`}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      )}
      {tool.name}
    </li>
  );
}

/**
 * One slow marquee row with a pause control, and the full tool list (by how
 * often each is used) in a disclosure under it. Under reduced motion the strip
 * is a static wrapped list and the pause button is not rendered.
 */
export default function ToolStrip({ className = '' }) {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal className={`tile px-0 ${className}`}>
      <div className="flex min-h-[2.75rem] items-center justify-between gap-3 px-[var(--pad)]">
        <h2 className="label">Tools I work with</h2>
        {!prefersReducedMotion && (
          <button
            type="button"
            className="icon-link -mr-2"
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Play the tools strip' : 'Pause the tools strip'}
            onClick={() => setIsPaused((wasPaused) => !wasPaused)}
          >
            {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
        )}
      </div>

      <div className={`marquee-wrap marquee-mask mt-3 ${isPaused ? 'is-paused' : ''}`}>
        <div className="marquee-track">
          <ul>
            {toolStrip.map((tool) => <ToolChip key={tool.name} tool={tool} />)}
          </ul>
          {/* Second copy makes the loop seamless; hidden from assistive tech. */}
          <ul aria-hidden="true">
            {toolStrip.map((tool) => <ToolChip key={tool.name} tool={tool} />)}
          </ul>
        </div>
      </div>

      <details className="mt-3 px-[var(--pad)]">
        <summary>
          Full list, by how often I use it
          <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
        </summary>
        <div className="grid gap-x-[var(--pad)] gap-y-5 pb-1 pt-3 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier} className="min-w-0">
              <h3 className="label">{tier}</h3>
              <ul className="mt-2 space-y-1 text-sm font-medium text-body">
                {tools.filter((tool) => tool.tier === tier).map((tool) => (
                  <li key={tool.name}>{tool.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </Reveal>
  );
}
