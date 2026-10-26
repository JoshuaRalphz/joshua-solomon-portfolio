import { cases } from './data/cases.js';
import { profile } from './data/content.js';

export const SITE = 'https://solomonjoshua.com';
// Unlisted interview demo: noindex, and not in the nav, home page, sitemap.xml or llms.txt.
export const CLINIC_DEMO_PATH = '/demo/clinic/';

const HOME_DESCRIPTION = 'AI Solutions Engineer: I build AI that saves businesses time and money. Claude or OpenAI does the drafting, writing or sorting; the code around it keeps costs known, output checked and a person in charge. Work: an AI system that checks job fit, catches scams and drafts honest applications for my approval (Claude Opus on Cloudflare Workers), client websites, GoHighLevel funnels and follow-up workflows, client email campaigns and social graphics. For business owners: custom systems, built and then run every month.';

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
    path: CLINIC_DEMO_PATH,
    file: 'demo/clinic/index.html',
    title: `Clinic enquiry assistant (demo) · ${profile.name}`,
    description: 'An interview demo: a clinic website enquiry is triaged by Claude, replies are drafted for a person to approve, and code decides the GoHighLevel routing. Fictional clinic and enquiries.',
    noindex: true,
  },
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
