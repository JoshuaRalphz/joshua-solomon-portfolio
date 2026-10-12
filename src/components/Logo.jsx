/**
 * Joshua Solomon logo mark: a "J" on a pine-ink square with one lime signal dot.
 * Decorative; the link around it carries the accessible name.
 */
export default function Logo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="flex-none"
    >
      <rect x="0" y="0" width="40" height="40" rx="9" fill="#0D2B23" />
      <path
        d="M14 10 L28 10 M23 10 L23 26 Q23 30 19 30 L17 30 Q13 30 13 26"
        stroke="#EEF2EC"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="2.6" fill="#C9F26C" />
    </svg>
  );
}
