// Small drawn scenes for the four "Try it" cards: decorative (aria-hidden), drawn in
// the site palette via classes in play.css, so they need no image files.

function Busywork() {
  return (
    <>
      <g className="pa-float">
        <rect x="22" y="34" width="104" height="30" rx="8" className="pa-card pa-stroke" />
        <rect x="34" y="45" width="56" height="8" rx="4" className="pa-line" />
        <rect x="30" y="72" width="104" height="30" rx="8" className="pa-card pa-stroke" />
        <rect x="42" y="83" width="70" height="8" rx="4" className="pa-line" />
        <rect x="38" y="110" width="104" height="30" rx="8" className="pa-card pa-stroke" />
        <rect x="50" y="121" width="46" height="8" rx="4" className="pa-line" />
      </g>
      <path d="M154 87 h28" className="pa-wire" />
      <path d="M176 80 l8 7 -8 7" className="pa-wire" />
      <rect x="194" y="26" width="108" height="118" rx="12" className="pa-ink" />
      <text x="206" y="46" className="pa-mono pa-on-ink">PLAN</text>
      <rect x="206" y="58" width="60" height="9" rx="4.5" className="pa-lime" />
      <rect x="206" y="76" width="80" height="9" rx="4.5" className="pa-lime" opacity=".7" />
      <rect x="206" y="94" width="40" height="9" rx="4.5" className="pa-lime" opacity=".45" />
      <text x="206" y="130" className="pa-big pa-on-ink-lime">3–7 h</text>
    </>
  );
}

function Triage() {
  const rows = [
    { y: 26, tag: 'pa-lime', w: 46, label: 'URGENT' },
    { y: 60, tag: 'pa-sunk', w: 40, label: 'QUOTE' },
    { y: 94, tag: 'pa-danger', w: 38, label: 'SPAM' },
  ];
  return (
    <>
      {rows.map((r) => (
        <g key={r.y}>
          <rect x="18" y={r.y} width="190" height="26" rx="8" className="pa-card pa-stroke" />
          <circle cx="34" cy={r.y + 13} r="6" className="pa-sunk" />
          <rect x="48" y={r.y + 9} width="80" height="8" rx="4" className="pa-line" />
          <rect x={196 - r.w} y={r.y + 6} width={r.w} height="14" rx="7" className={r.tag} />
          <text x={196 - r.w / 2} y={r.y + 16.5} textAnchor="middle" className={`pa-tiny ${r.tag === 'pa-danger' ? 'pa-on-ink' : ''}`}>{r.label}</text>
        </g>
      ))}
      <path d="M30 140 H290" className="pa-wire" />
      {[30, 117, 203, 290].map((x, i) => <circle key={x} cx={x} cy="140" r="7" className={i < 3 ? 'pa-ink' : 'pa-lime pa-stroke-ink'} />)}
      <rect x="222" y="30" width="84" height="88" rx="12" className="pa-ink" />
      <rect x="232" y="44" width="62" height="7" rx="3.5" className="pa-mist" opacity=".8" />
      <rect x="232" y="58" width="50" height="7" rx="3.5" className="pa-mist" opacity=".55" />
      <rect x="232" y="88" width="62" height="20" rx="10" className="pa-lime" />
      <text x="263" y="101.5" textAnchor="middle" className="pa-tiny">APPROVE</text>
    </>
  );
}

function Ask() {
  return (
    <>
      <rect x="20" y="24" width="150" height="34" rx="14" className="pa-sunk" />
      <rect x="34" y="37" width="96" height="8" rx="4" className="pa-line" />
      <rect x="64" y="70" width="236" height="74" rx="14" className="pa-ink" />
      <rect x="80" y="84" width="170" height="8" rx="4" className="pa-mist" opacity=".85" />
      <rect x="80" y="98" width="130" height="8" rx="4" className="pa-mist" opacity=".6" />
      <rect x="80" y="118" width="56" height="16" rx="8" className="pa-lime" />
      <text x="108" y="129.5" textAnchor="middle" className="pa-tiny">1 · CV</text>
      <rect x="142" y="118" width="70" height="16" rx="8" className="pa-lime" />
      <text x="177" y="129.5" textAnchor="middle" className="pa-tiny">2 · CASE</text>
      <circle cx="252" cy="38" r="16" className="pa-card pa-stroke-ink" />
      <path d="M264 50 l14 14" className="pa-wire-ink" />
    </>
  );
}

function MissedCall() {
  return (
    <>
      <rect x="40" y="10" width="92" height="150" rx="16" className="pa-ink" />
      <rect x="48" y="24" width="76" height="122" rx="9" className="pa-mist" />
      <circle cx="86" cy="58" r="16" className="pa-danger" />
      <path d="M79 52 l14 12 M93 52 l-14 12" className="pa-x" />
      <rect x="62" y="84" width="48" height="7" rx="3.5" className="pa-line" />
      <rect x="54" y="104" width="64" height="20" rx="8" className="pa-lime" />
      <path d="M150 72 h26" className="pa-wire" />
      <rect x="186" y="34" width="118" height="30" rx="12" className="pa-lime pa-stroke-ink" />
      <rect x="198" y="45" width="80" height="8" rx="4" className="pa-ink" opacity=".75" />
      <rect x="206" y="74" width="98" height="26" rx="12" className="pa-card pa-stroke" />
      <rect x="218" y="83" width="60" height="8" rx="4" className="pa-line" />
      <rect x="186" y="110" width="118" height="30" rx="12" className="pa-lime pa-stroke-ink" />
      <text x="198" y="129" className="pa-tiny">BOOKED · THU 9:00</text>
    </>
  );
}

const SCENES = { 'busywork-plan': Busywork, 'lead-triage': Triage, 'ask-my-portfolio': Ask, 'missed-call-text-back': MissedCall };

export default function PlayArt({ slug, className = '' }) {
  const Scene = SCENES[slug];
  if (!Scene) return null;
  return (
    <svg viewBox="0 0 320 168" className={`play-art ${className}`} aria-hidden="true" focusable="false">
      <Scene />
    </svg>
  );
}
