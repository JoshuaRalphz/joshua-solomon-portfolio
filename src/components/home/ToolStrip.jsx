import {
  siAnthropic, siClaude, siCloudflare, siCloudflareworkers, siFastapi,
  siGoogleappsscript, siHono, siPython, siReact, siTypescript,
} from 'simple-icons';
import { alsoUsed, tools } from '../../data/content.js';

// Named imports only, so the bundle carries these few paths, not the whole icon set.
const ICONS = {
  siAnthropic, siClaude, siCloudflare, siCloudflareworkers, siFastapi,
  siGoogleappsscript, siHono, siPython, siReact, siTypescript,
};

/** A brand mark from simple-icons, drawn inline (no third-party request, CSP stays 'self'). */
function Mark({ name }) {
  const icon = name ? ICONS[name] : null;
  if (!icon) return null;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="flex-none">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

/** About twelve AI and infrastructure tools, static, plus one "also used" line. */
export default function ToolStrip({ className = '' }) {
  return (
    <div className={`tile ${className}`}>
      <h2 className="label">The stack I ship with</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <li key={tool.name} className="tool-chip">
            <Mark name={tool.icon} />
            {tool.name}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm font-medium leading-snug text-muted">
        <span className="font-semibold text-ink">Also used:</span> {alsoUsed}
      </p>
    </div>
  );
}
