import { cases } from './data/cases.js';
import { profile } from './data/content.js';

export const SITE = 'https://solomonjoshua.com';

const HOME_DESCRIPTION = 'AI Solutions Engineer: I build AI that saves businesses time and money. Claude or OpenAI does the drafting, writing or sorting; the code around it keeps costs known, output checked and a person in charge. Case studies: an AI system that checks job fit, catches scams and drafts honest applications for my approval (Claude Opus on Cloudflare Workers), and an AI video engine at about $1 per video. For business owners: custom systems, built and then run every month.';

/** Every prerendered page: path, file to write, and its head. */
export const routes = [
  {
    path: '/',
    file: 'index.html',
    title: `${profile.name} · ${profile.title}`,
    description: HOME_DESCRIPTION,
  },
  ...cases.map((c) => ({
    path: c.path,
    file: `${c.path.replace(/^\/|\/$/g, '')}/index.html`,
    title: `${c.name}: case study · ${profile.name}, ${profile.title}`,
    description: c.seo,
  })),
  {
    path: '/404',
    file: '404.html',
    title: `Page not found · ${profile.name}`,
    description: 'This page does not exist. See the systems Joshua Solomon has shipped.',
    noindex: true,
  },
];

/** @param {string} pathname */
export function normalizePath(pathname) {
  if (pathname === '/' || pathname === '/index.html') return '/';
  const clean = pathname.replace(/index\.html$/, '');
  return clean.endsWith('/') ? clean : `${clean}/`;
}
