// Helpers for untrusted text going in (visitor input) and coming out (model output).

/** Plain, bounded string from untrusted model output. Long dashes become commas. */
export function clean(value, maxChars = 400) {
  if (typeof value !== 'string') return '';
  const text = value
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
  return text.length > maxChars ? `${text.slice(0, maxChars - 1).trimEnd()}…` : text;
}

/** Bounded list of cleaned strings. */
export function cleanList(value, max, maxChars = 200) {
  return (Array.isArray(value) ? value : []).map((item) => clean(item, maxChars)).filter(Boolean).slice(0, max);
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
