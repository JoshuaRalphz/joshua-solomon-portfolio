// Builds the "Ask my portfolio" knowledge base: Josh's real documents split into short
// passages with stable ids, written to functions/_lib/play/knowledge.json (committed, so
// the Pages Function bundles it and tests run offline). Runs at the start of `npm run build`;
// tests/play-ask.test.mjs fails if the committed file is out of date.
//
// Sources (nothing else is ever used):
//   kb/cv.md            copy of cv/Joshua_Solomon_CV_v9_AI_Solutions_Engineer.md (same text as the public PDF)
//   src/data/cases.js   the two case studies
//   src/data/content.js the home page copy
//   public/llms.txt     the site summary
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const OUT_FILE = join(root, 'functions/_lib/play/knowledge.json');

const slug = (text) => text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);

/** Markdown to plain text: no links syntax, emphasis, comments or heading marks. */
const plain = (text) =>
  text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s*[-*]\s+/gm, '- ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

function chunker() {
  const chunks = [];
  const seen = new Map();
  return {
    chunks,
    add(id, title, url, text, source) {
      const body = plain(Array.isArray(text) ? text.filter(Boolean).join('\n') : text);
      if (!body) return;
      const base = slug(id);
      const count = (seen.get(base) ?? 0) + 1;
      seen.set(base, count);
      chunks.push({ id: count === 1 ? base : `${base}-${count}`, title, url, source, text: body });
    },
  };
}

function cvChunks(add, markdown, resumeUrl) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let h2 = 'Contact';
  let h3 = '';
  let h4 = '';
  let buffer = [];
  const flush = () => {
    const text = buffer.join('\n').trim();
    buffer = [];
    if (!text) return;
    const name = h4 || h3 || h2;
    const heading = [h2, h3 && h3.split('||')[0].trim(), h4].filter(Boolean).join(' · ');
    if (h2 === 'Skills') {
      // One passage per skill group, so a question about one area finds it directly.
      for (const line of text.split('\n').filter((l) => l.trim())) {
        const label = line.match(/\*\*([^*]+):?\*\*/)?.[1]?.replace(/:$/, '') ?? 'Skills';
        add(`cv-skills-${label}`, `CV · Skills · ${label}`, resumeUrl, line, 'CV');
      }
      return;
    }
    const titleLine = h3 && !h4 ? `${h3.replace('||', '·')}\n` : '';
    add(`cv-${name.split('||')[0]}`, `CV · ${heading}`, resumeUrl, `${titleLine}${text}`, 'CV');
  };
  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.*)$/);
    if (!match) {
      buffer.push(line);
      continue;
    }
    flush();
    const [, hashes, title] = match;
    if (hashes.length === 1) {
      buffer.push(`Name: ${title}`);
    } else if (hashes.length === 2) {
      [h2, h3, h4] = [title, '', ''];
    } else if (hashes.length === 3) {
      [h3, h4] = [title, ''];
    } else {
      h4 = title;
    }
  }
  flush();
}

function caseChunks(add, study) {
  const at = (hash) => `${study.path}#${hash}`;
  const label = `Case study · ${study.name}`;
  add(`${study.slug}-overview`, label, study.path, [study.name, study.kicker, study.outcome, study.summary, `The problem: ${study.problem}`, study.businessAngle], 'Case study');
  add(`${study.slug}-constraints`, `${label} · Constraints`, at('constraints'), study.constraints.map((c) => `- ${c}`), 'Case study');
  study.built.forEach((b) => add(`${study.slug}-built-${b.title}`, `${label} · ${b.title}`, at('built'), `${b.title}: ${b.body}`, 'Case study'));
  study.decisions.forEach((d, i) => add(`${study.slug}-decision-${i + 1}`, `${label} · Decision ${i + 1}`, at('decisions'), `Chose: ${d.chose}. Rejected: ${d.rejected}. Why: ${d.why}`, 'Case study'));
  study.broke.forEach((b) => add(`${study.slug}-broke-${b.title}`, `${label} · What broke: ${b.title}`, at('broke'), `${b.title}: ${b.body}`, 'Case study'));
  add(`${study.slug}-results`, `${label} · Results`, at('results'), study.results.map((r) => `- ${r.value}: ${r.label}`), 'Case study');
  add(`${study.slug}-stack`, `${label} · Stack`, at('stack'), `Stack: ${study.stack.join(', ')}`, 'Case study');
}

function siteChunks(add, c) {
  const p = c.profile;
  add('site-profile', 'Site · Profile', '/#about', [
    `${p.name}, ${p.title}. ${p.shortLocation}.`, p.available, p.experienceLine, `Email: ${p.email}. WhatsApp: ${p.whatsapp}.`,
  ], 'Website');
  add('site-hero', 'Site · What I do', '/', [c.hero.outcome, c.hero.promise], 'Website');
  add('site-flow', 'Site · How my AI systems run', '/', c.flow.map((f) => `- ${f.label}: ${f.caption}`), 'Website');
  add('site-tools', 'Site · Tools', '/', [`Main tools: ${c.tools.map((t) => t.name).join(', ')}.`, `Also used: ${c.alsoUsed}`], 'Website');
  c.offers.forEach((o) => add(`site-offer-${o.id}`, `Site · What I build · ${o.title}`, '/#build', `${o.title}: ${o.body}`, 'Website'));
  add('site-results', 'Site · Results', '/#results', [...c.results.map((r) => `- ${r.value}: ${r.label}`), c.agencyMarketingResult], 'Website');
  add('site-bio', 'Site · About', '/#about', c.bio, 'Website');
  add('site-setup', 'Site · Work setup', '/#about', c.setup.map((s) => `- ${s}`), 'Website');
  add('site-education', 'Site · Education', '/#about', c.education, 'Website');
  c.experience.forEach((job) => add(`site-experience-${job.company}`, `Site · Experience · ${job.role}`, '/#about', [
    `${job.role}, ${job.company} (${job.meta}), ${job.dates}.`, ...job.bullets.map((b) => `- ${b}`),
  ], 'Website'));
  add('site-earlier-experience', 'Site · Earlier experience', '/#about', c.earlierExperience, 'Website');
  const a = c.agencyCase;
  add('site-agency-platform', `Site · ${a.title}`, '/#work-agency', [a.kicker, a.outcome, ...a.changed.map((x) => `- ${x}`), a.safety, `Stack: ${a.stack.join(', ')}`, a.note], 'Website');
  add('site-client-work', 'Site · Client work', '/#work', c.clientWork.map((w) => `- ${w.name} (${w.place}): ${w.line}`), 'Website');
}

function llmsChunks(add, text) {
  const sections = text.replace(/\r\n/g, '\n').split(/^## /m);
  add('llms-intro', 'Site summary (llms.txt)', '/llms.txt', sections[0].replace(/^# .*\n/, ''), 'Site summary');
  for (const section of sections.slice(1)) {
    const [heading, ...body] = section.split('\n');
    add(`llms-${heading}`, `Site summary · ${heading}`, '/llms.txt', body.join('\n'), 'Site summary');
  }
}

export async function buildKnowledge() {
  const content = await import(pathToFileURL(join(root, 'src/data/content.js')).href);
  const { cases } = await import(pathToFileURL(join(root, 'src/data/cases.js')).href);
  const { chunks, add } = chunker();
  cvChunks(add, await readFile(join(root, 'kb/cv.md'), 'utf8'), content.profile.resumeUrl);
  cases.forEach((study) => caseChunks(add, study));
  siteChunks(add, content);
  llmsChunks(add, await readFile(join(root, 'public/llms.txt'), 'utf8'));
  return { sources: ['kb/cv.md', 'src/data/cases.js', 'src/data/content.js', 'public/llms.txt'], chunks };
}

export const serialize = (kb) => `${JSON.stringify(kb, null, 1)}\n`;

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const kb = await buildKnowledge();
  await writeFile(OUT_FILE, serialize(kb));
  console.log(`knowledge: ${kb.chunks.length} passages -> functions/_lib/play/knowledge.json`);
}
