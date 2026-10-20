import { Mail, Sparkles } from 'lucide-react';
import { profile } from '../data/content.js';

/**
 * Placeholder for the live "see how I'd help your team" demo (built on branch
 * feat/fit-agent: src/components/fit/*, functions/api/fit.js).
 *
 * To mount the demo, edit ONE line in src/components/home/FitAgentSection.jsx:
 * replace <FitAgentSlot /> with the demo component. The demo must be SSR-safe
 * (no window/document during render) because every page is prerendered.
 */
function Teaser() {
  return (
    <div className="tile tile--lime flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 max-w-[60ch]">
        <p className="label flex items-center gap-2">
          <Sparkles size={16} aria-hidden="true" className="flex-none" />
          Live demo · coming soon
        </p>
        <p className="t-h3 mt-3">Describe your team’s busywork. Get the system I’d build.</p>
        <p className="mt-2 text-ink">
          Tell it what eats your team’s week. It sketches what I would build, what the AI would do
          inside it, where a person approves, and roughly what it would cost to run.
        </p>
      </div>
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent('A workflow I want off my team’s plate')}`}
        className="btn btn-secondary flex-none"
      >
        <Mail size={18} aria-hidden="true" /> Until then, email me your workflow
      </a>
    </div>
  );
}

export default function FitAgentSlot() {
  return <Teaser />;
}
