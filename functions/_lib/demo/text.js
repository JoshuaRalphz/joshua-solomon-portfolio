// Helpers for untrusted text going in (visitor input) and coming out (model output).

/** Plain, bounded string from untrusted model output. Em dashes (and spaced en dashes) become commas; ranges like 2021–2025 stay. */
export function clean(value, maxChars = 400) {
  if (typeof value !== 'string') return '';
  // Cut first: the whitespace regexes below should never see a huge string.
  const text = value
    .slice(0, maxChars * 4)
    .replace(/\s*—\s*|\s+–\s+/g, ', ')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text.length > maxChars ? `${text.slice(0, maxChars - 1).trimEnd()}…` : text;
}

/** Bounded list of cleaned strings. */
export function cleanList(value, max, maxChars = 200) {
  return [...new Set((Array.isArray(value) ? value : []).map((item) => clean(item, maxChars)).filter(Boolean))].slice(0, max);
}

/** Removes our own delimiter tags from untrusted text, so it cannot close the data block. */
export function neutralizeTags(text, tags) {
  const pattern = new RegExp(`<\\s*\\/?\\s*(${tags.join('|')})\\b[^>]*>`, 'gi');
  return text.replace(pattern, '[tag removed]');
}

/** Visitor text: a string, trimmed, control characters removed (newlines and tabs kept). */
export function readText(value) {
  if (typeof value !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}

/** One value from a fixed list, or '' (never free text). */
export function pick(value, allowed) {
  return typeof value === 'string' && allowed.includes(value) ? value : '';
}
