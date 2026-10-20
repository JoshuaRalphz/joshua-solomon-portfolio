// Retrieval for "Ask my portfolio": BM25 keyword ranking over the ~70 bundled passages
// in knowledge.js. Why BM25 and not embeddings: the corpus is tiny and fixed, BM25
// runs in well under a millisecond inside the Worker with no binding, no network call
// and no extra cost, it is deterministic, and the offline eval (evals/ask-portfolio.jsonl)
// can test it exactly. Embeddings (e.g. Workers AI) would add a binding, a network hop
// per question and results that are harder to test offline, for little gain at this size.
import knowledge from './knowledge.js';

export const TOP_K = 5;
// A passage must score at least this much to be sent to Claude. Below it, the
// question is answered "not in my documents" without any model call.
export const MIN_SCORE = 2;
// ...and match at least half of the question's words (directly or by synonym), so one
// shared word ("team", "write") cannot pull in an off-topic question.
export const MIN_COVERAGE = 0.5;
const K1 = 1.2;
const B = 0.75;

const STOPWORDS = new Set(`a an and are as at be been but by can could did do does doing for from had has have he her
him his how i if in into is it its josh joshua joshua's josh's me my of on or our out over please she so solomon
tell than that the their them then there these they this those to us was we were what when where which who whom
why will with would you your yours about any anything ever does know like much many some being new get`.split(/\s+/));

// A few recruiter phrasings mapped to the words the documents use.
const SYNONYMS = {
  rag: ['retrieval'], llm: ['claude', 'ai'], llms: ['claude', 'ai'], gpt: ['openai'], chatgpt: ['openai'],
  anthropic: ['claude'], degree: ['education', 'college', 'science'], university: ['college', 'education'],
  school: ['college', 'education'], studied: ['education', 'college'], study: ['education'],
  located: ['based', 'olongapo'], location: ['based', 'olongapo'], live: ['based', 'olongapo'], country: ['philippines'],
  timezone: ['hours', 'eastern'], time: ['hours'], zone: ['hours'], availability: ['available', 'start'],
  start: ['available', 'start'], hire: ['available', 'start'], salary: ['pay'], rate: ['pay'],
  email: ['email', 'gmail.com', 'reach'], contact: ['email', 'gmail.com', 'whatsapp', 'reach'], reach: ['email', 'whatsapp'], phone: ['whatsapp'],
  languages: ['english', 'filipino'], speak: ['english', 'filipino'], english: ['english', 'proficiency'],
  testing: ['tests', 'test'], tests: ['tests', 'test'], cost: ['cost', 'budget'], cheap: ['cost'], price: ['cost'],
  video: ['video', 'ffmpeg'], videos: ['video'], job: ['job', 'work', 'role'], hunting: ['hunt'], crm: ['crm', 'gohighlevel', 'hubspot'],
  automation: ['automation', 'automations'], experience: ['experience', 'professionally'], years: ['since', 'professionally'],
  prompt: ['prompt'], injection: ['injection', 'untrusted'], safety: ['safe', 'approval'], approve: ['approval', 'approve'],
  human: ['approval', 'person'], automatically: ['auto', 'itself'], automatic: ['auto', 'itself'],
  sent: ['send'], stop: ['refuse', 'block', 'hold'], bad: ['weak', 'claim'], wrong: ['broke'], cloud: ['cloudflare'], serverless: ['workers'], python: ['python', 'fastapi'],
};

/** Lowercase words, light stemming. Digits and $ amounts are kept as words. */
export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']s/g, '')
    .replace(/[’']/g, '')
    .split(/[^a-z0-9$.]+/)
    .map((word) => word.replace(/^\.+|\.+$/g, ''))
    .filter((word) => word && !STOPWORDS.has(word))
    .map(stem);
}

function stem(word) {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function buildIndex(chunks) {
  const docs = chunks.map((chunk) => {
    // The title counts twice: it names what the passage is about.
    const terms = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
    const tf = new Map();
    for (const term of terms) tf.set(term, (tf.get(term) ?? 0) + 1);
    return { chunk, tf, length: terms.length };
  });
  const df = new Map();
  for (const doc of docs) for (const term of doc.tf.keys()) df.set(term, (df.get(term) ?? 0) + 1);
  const avgLength = docs.reduce((sum, doc) => sum + doc.length, 0) / docs.length;
  return { docs, df, avgLength, count: docs.length };
}

const INDEX = buildIndex(knowledge.chunks);
export const CHUNKS = knowledge.chunks;
export const CHUNK_BY_ID = new Map(knowledge.chunks.map((chunk) => [chunk.id, chunk]));

/** Each question word with the document words it may match (itself plus synonyms). */
// Keys are compared after stemming, like the question words ("located" -> "locat").
const STEMMED_SYNONYMS = Object.fromEntries(Object.entries(SYNONYMS).map(([key, extra]) => [stem(key), extra]));

function expand(question) {
  return [...new Set(tokenize(question))].map((word) => ({ word, terms: [...new Set([word, ...(STEMMED_SYNONYMS[word] ?? []).map(stem)])] }));
}

/**
 * Top passages for a question, best first, only those scoring at least MIN_SCORE.
 * @returns {{ chunk: { id: string, title: string, url: string, source: string, text: string }, score: number }[]}
 */
export function retrieve(question, { k = TOP_K, minScore = MIN_SCORE, minCoverage = MIN_COVERAGE } = {}) {
  const words = expand(question);
  if (!words.length) return [];
  const { docs, df, avgLength, count } = INDEX;
  const scored = [];
  for (const doc of docs) {
    let score = 0;
    let matched = 0;
    for (const { terms } of words) {
      let hit = false;
      for (const term of terms) {
        const freq = doc.tf.get(term);
        if (!freq) continue;
        hit = true;
        const n = df.get(term);
        const idf = Math.log(1 + (count - n + 0.5) / (n + 0.5));
        score += idf * ((freq * (K1 + 1)) / (freq + K1 * (1 - B + (B * doc.length) / avgLength)));
      }
      if (hit) matched += 1;
    }
    if (score >= minScore && matched / words.length >= minCoverage) scored.push({ chunk: doc.chunk, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id)).slice(0, k);
}
