import { CONTACT, PROJECTS, PROJECT_IDS } from './profile.js';

const MAX_STRENGTHS = 5;
const MAX_GAPS = 6;
const MAX_HELP = 3;
const MAX_PROJECTS = 4;
const MAX_QUESTIONS = 3;
const NOTE_WORD_LIMIT = 90;
const FIELD_CHARS = 400;
const VERDICT_CHARS = 240;

const CONTACT_LINE = `You can reach me at ${CONTACT.email} or see my work at ${CONTACT.portfolio}.`;

// Shown when the model returns no gaps: an empty list would read as a perfect fit.
const FALLBACK_GAP = {
  requirement: 'Anything not listed above',
  note: "This check only knows what is in my CV and portfolio. If the role needs something not shown here, assume I haven't done it yet and ask me.",
};

const PROJECT_BY_ID = new Map(PROJECTS.map((project) => [project.id, project]));

/** Plain, bounded string from untrusted model output. Dashes become commas. */
function cleanText(value, maxChars = FIELD_CHARS) {
  if (typeof value !== 'string') return '';
  const text = value
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxChars ? `${text.slice(0, maxChars - 1).trimEnd()}…` : text;
}

const words = (text) => text.split(/\s+/).filter(Boolean);

/** At most 90 words and always ending with how to reach Josh. */
export function fixNote(rawNote) {
  const note = cleanText(rawNote, 2000);
  const hasContact = note.includes(CONTACT.email);
  if (hasContact && words(note).length <= NOTE_WORD_LIMIT) return note;

  const body = hasContact ? note.slice(0, note.indexOf(CONTACT.email)).replace(/[^.!?]*$/, '') : note;
  const budget = NOTE_WORD_LIMIT - words(CONTACT_LINE).length;
  // Split only at a sentence end followed by a capital, so "e.g." and "U.S." survive.
  const sentences = body.trim().split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/).filter(Boolean);
  const kept = [];
  let used = 0;
  for (const sentence of sentences) {
    const count = words(sentence).length;
    if (used + count > budget) break;
    kept.push(sentence);
    used += count;
  }
  if (!kept.length && body.trim()) kept.push(`${words(body).slice(0, budget).join(' ').replace(/[,;:]$/, '')}.`);
  const text = kept.join(' ').trim();
  const ended = text && !/[.!?]$/.test(text) ? `${text}.` : text;
  return [ended, CONTACT_LINE].filter(Boolean).join(' ');
}

const asArray = (value) => (Array.isArray(value) ? value : []);

function toProject(id) {
  const project = PROJECT_BY_ID.get(id);
  return project ? { id: project.id, title: project.title, summary: project.summary, link: project.link } : null;
}

/**
 * Validates and bounds the model's JSON. Unknown project ids are dropped; the
 * client only ever sees projects from the fixed allowlist.
 * @param {unknown} raw parsed JSON from the model
 */
export function normalizeResult(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  // A reply without a score or a verdict is broken, not a "0% fit": report an error instead.
  if (!Number.isFinite(data.fit_score) || !cleanText(data.verdict)) throw new Error('incomplete model output');
  const score = Math.round(data.fit_score);

  const strengths = asArray(data.strengths)
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      requirement: cleanText(item.requirement),
      evidence: cleanText(item.evidence),
      outcome: cleanText(item.outcome),
      project: PROJECT_IDS.has(item.project_id) ? toProject(item.project_id) : null,
    }))
    .filter((item) => item.requirement && item.evidence)
    .slice(0, MAX_STRENGTHS);

  const gaps = asArray(data.gaps)
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({ requirement: cleanText(item.requirement), note: cleanText(item.note) }))
    .filter((item) => item.requirement)
    .slice(0, MAX_GAPS);

  const listOfText = (value, max) => asArray(value).map((item) => cleanText(item)).filter(Boolean).slice(0, max);

  const projectIds = [...new Set(asArray(data.matching_projects))].filter((id) => PROJECT_IDS.has(id));

  return {
    fit_score: Math.min(100, Math.max(0, score)),
    verdict: cleanText(data.verdict, VERDICT_CHARS),
    strengths,
    gaps: gaps.length ? gaps : [FALLBACK_GAP],
    how_i_would_help: listOfText(data.how_i_would_help, MAX_HELP),
    matching_projects: projectIds.slice(0, MAX_PROJECTS).map(toProject),
    interview_questions_to_ask_him: listOfText(data.interview_questions_to_ask_him, MAX_QUESTIONS),
    short_note: fixNote(data.short_note),
  };
}
