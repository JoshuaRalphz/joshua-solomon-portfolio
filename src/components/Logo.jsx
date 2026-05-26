/**
 * Joshua Solomon logo mark.
 * Bold centered "J" monogram inside a navy rounded square,
 * with a gold accent dot (automation spark).
 */
export default function Logo({ size = 36, mono = false }) {
  const fillBg = mono ? 'currentColor' : '#0F4C81';
  const fillFg = mono ? 'white' : 'white';
  const accent = mono ? 'currentColor' : '#FBBF24';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-label="Joshua Solomon logo">
      <rect x="0" y="0" width="40" height="40" rx="9" fill={fillBg} />
      {/* Modern J letterform — top cap + descender hook */}
      <path
        d="M14 10 L28 10 M23 10 L23 26 Q23 30 19 30 L17 30 Q13 30 13 26"
        stroke={fillFg}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Gold accent dot — automation spark */}
      <circle cx="32" cy="32" r="2.6" fill={accent} />
    </svg>
  );
}

/** Wordmark version (logo + name) used in nav and footer */
export function Wordmark({ size = 32, vertical = false, light = false }) {
  return (
    <div className={`inline-flex items-center ${vertical ? 'flex-col gap-1' : 'gap-2.5'}`}>
      <Logo size={size} />
      <div className="flex flex-col leading-tight">
        <span className={`font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`} style={{ fontSize: size * 0.5 }}>
          Joshua Solomon
        </span>
        {!vertical && (
          <span className={`text-[10px] font-semibold tracking-[0.12em] uppercase ${light ? 'text-white/55' : 'text-muted'}`}>
            CRM &amp; Automation
          </span>
        )}
      </div>
    </div>
  );
}
