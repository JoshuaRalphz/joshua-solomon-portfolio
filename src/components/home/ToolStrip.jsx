import { useState } from 'react';
import { ChevronDown, Pause, Play } from 'lucide-react';
import {
  siAnthropic, siClaude, siCloudflare, siCloudflareworkers, siCursor, siFastapi, siFfmpeg,
  siFirebase, siGithubactions, siGmail, siGoogleappsscript, siHono, siHubspot, siMailchimp,
  siPython, siReact, siResend, siSquare, siStripe, siTailwindcss, siTypescript, siVercel,
  siVite, siVitest, siWix,
} from 'simple-icons';
import { Reveal } from '../Reveal.jsx';
import { toolGroups, toolStrip } from '../../data/content.js';

// Named imports only, so the bundle carries these few paths, not the whole icon set.
const ICONS = {
  siAnthropic, siClaude, siCloudflare, siCloudflareworkers, siCursor, siFastapi, siFfmpeg,
  siFirebase, siGithubactions, siGmail, siGoogleappsscript, siHono, siHubspot, siMailchimp,
  siPython, siReact, siResend, siSquare, siStripe, siTailwindcss, siTypescript, siVercel,
  siVite, siVitest, siWix,
};

/** One chip. The brand mark is drawn inline (no third-party request, CSP stays 'self'). */
function ToolChip({ tool }) {
  const icon = tool.icon ? ICONS[tool.icon] : null;
  return (
    <li className="tool-chip">
      {icon && (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="flex-none">
          <path d={icon.path} fill="currentColor" />
        </svg>
      )}
      {tool.name}
    </li>
  );
}

/**
 * One slow marquee row with a pause control, and the full tool list (grouped as the CV
 * groups it) in a disclosure under it. Under reduced motion the strip is a static
 * wrapped list and the pause button is hidden (styles/signature.css).
 */
export default function ToolStrip({ className = '' }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Reveal className={`tile px-0 ${className}`}>
      <div className="flex min-h-[2.75rem] items-center justify-between gap-3 px-[var(--pad)]">
        <h2 className="label">The stack I ship with</h2>
        {/* The label alone carries the state: no aria-pressed beside it. */}
        <button
          type="button"
          className="icon-link marquee-toggle -mr-2"
          aria-label={isPaused ? 'Play the tools strip' : 'Pause the tools strip'}
          onClick={() => setIsPaused((wasPaused) => !wasPaused)}
        >
          {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        </button>
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
          Full list of tools
          <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
        </summary>
        <div className="grid grid-cols-2 gap-x-[var(--pad)] gap-y-5 pb-1 pt-3 md:grid-cols-3 xl:grid-cols-6">
          {toolGroups.map((group) => (
            <div key={group.category} className="min-w-0">
              <h3 className="label">{group.category}</h3>
              <ul className="mt-2 space-y-1 text-sm font-medium text-body">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </Reveal>
  );
}
