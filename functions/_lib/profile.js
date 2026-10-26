// The ONLY facts the fit agent may use about Josh. Every line comes from
// cv/Joshua_Solomon_CV_v8_AI_Engineer.md, applications/2026-10-20_ai-engineer-profiles.md,
// applications/my-real-stories.md or src/data/content.js. Do not add a claim here
// that those files do not support: the model is told this is everything it knows.

export const CONTACT = {
  name: 'Joshua Solomon',
  email: 'solomonjoshua101602@gmail.com',
  portfolio: 'solomonjoshua.com',
};

// Fixed allowlist. The model may only cite these ids; the server drops anything else.
// `link` is an anchor on this site (or a live client site the portfolio already links).
export const PROJECTS = [
  {
    id: 'behindworks',
    title: 'Behind Works Platform (outreach and job applications)',
    summary: 'My own CRM and email platform on Cloudflare Workers + D1: pipeline board, campaigns that stop on a reply, an approval queue, and a jobs module with Claude-drafted applications, each with a fit score.',
    link: '#work-behindworks',
  },
  {
    id: 'replytracker',
    title: 'Job Tracker (Gmail reply alerts in Apps Script)',
    summary: 'Google Apps Script that checks Gmail every 10 minutes for replies, logs them to a Sheet, labels them and flags look-alike scam emails.',
    link: '#work-replytracker',
  },
  {
    id: 'arrowplatform',
    title: 'Arrow Platform (in-house email and SMS platform)',
    summary: 'Built for a US agency with Claude Code: contacts, newsletters, SMS, reply inbox. 6 accounts live about 5 weeks after the first commit, 3,200+ automated tests, now replacing GoHighLevel.',
    link: '#work-arrowplatform',
  },
  {
    id: 'contentops',
    title: 'AGC HUB (content-operations app)',
    summary: "Brought an agency content team's work from 5 tools into one React + Firebase app, with Claude Haiku features: subject lines, revision suggestions, a help chat and task-image analysis.",
    link: '#about',
  },
  {
    id: 'aoutility',
    title: 'Alpha Omega Safety Solutions (A2P SMS + marketing system)',
    summary: 'Got a Michigan contractor approved for A2P 10DLC texting, plus website, lifecycle email, CRM and domain setup.',
    link: '#work-aosafe',
  },
  {
    id: 'homefm',
    title: 'HOME.FM (dedicated email sending)',
    summary: 'Dedicated sending subdomain for a radio station, SPF/DKIM/DMARC aligned, warmed to 6,500 emails a day.',
    link: '#work-homefm',
  },
  {
    id: 'adas',
    title: 'Arrow Consignment (startup back-office, https://www.arrowconsignment.com)',
    summary: 'Launch site and back-office for a student consignment startup: live inventory and instant sale notifications via Apps Script.',
    link: '#work-adas',
  },
  {
    id: 'ghlrebuilds',
    title: 'GoHighLevel rebuilds (TrueCare, Big Brothers Big Sisters, HOME.FM)',
    summary: 'Three of his client projects rebuilt in GoHighLevel sample sub-accounts: a funnel page with the client’s real photos and offer, a native form, a pipeline, a follow-up workflow (instant text, confirmation email, team alert, follow-up text that stops on reply) and an email template, plus an invoice for HOME.FM. Why rebuilt: these clients now run on the in-house email and lead platform he built for the agency, which replaced its $297-a-month GoHighLevel plan; he rebuilt their funnels in GoHighLevel to show the same work on the platform most teams use.',
    link: '#ghl-rebuilds',
  },
  {
    id: 'emailcampaigns',
    title: 'Email campaigns he launched (agency clients)',
    summary: 'Emails he built and launched for agency clients on the platform he built, Sep-Oct 2026: 34 campaigns, 69,000+ inboxes. The portfolio shows 8 with a desktop and phone preview: a radio station (HOME.FM: Heat for the Holidays, Christmas sponsor spots, Top Teachers), a safety-training company (the Safety Bullet bulletin), a nonprofit (Big Brothers Big Sisters Game Day Gala thank-you), a chiropractic clinic (TrueCare World Spine Day), a university tennis team (SAU Pro-Am thank-you) and a consignment shop (Arrow Consignment rename).',
    link: '#work-emails',
  },
  {
    id: 'socialgraphics',
    title: 'Social media graphics (agency clients)',
    summary: "Five graphics he designed for agency clients, as they went out on the clients' pages: TrueCare Chiropractic's four-post new-doctor launch series on Facebook and Instagram (Oct 2026) and an Alpha Omega Safety Solutions Facebook post promoting a training partner's lineworker video (Sep 2026).",
    link: '#work-social',
  },
];

export const PROJECT_IDS = new Set(PROJECTS.map((project) => project.id));

const projectLines = PROJECTS.map((p) => `- ${p.id}: ${p.title}. ${p.summary}`).join('\n');

// Plain text the system prompt embeds. Keep it factual and short.
export const PROFILE_TEXT = `NAME: ${CONTACT.name}. Based in Olongapo City, Philippines. Works remote; US Eastern hours preferred, PH/AU/European hours also work. Available for full-time work, can start within 1-2 weeks.

POSITIONING: AI Solutions Engineer. Ships production systems with AI coding agents (Claude Code) and puts AI inside them (Claude API and OpenAI API features).
Building software with AI since 2024 (Cursor, in college). Professionally since 2025.

EXPERIENCE
1. AI & Systems Lead, Arrow Group Consulting (US outsourced-CMO agency, Michigan; remote, part-time contract), Feb 2026 to now. Handles 8 client accounts at once.
   - Built and launched the agency's in-house email/SMS platform (TypeScript, Cloudflare Workers + Hono, D1, Queues, Resend, Twilio, React/Vite) with Claude Code. 6 accounts live about 5 weeks after the first commit (Aug-Sep 2026); 3,200+ automated tests; the agency is replacing GoHighLevel with it.
   - Added Claude API drafting helpers for subject lines and preview text, plus OpenAI gpt-image-1 image generation.
   - Wrote the business case (PROJECTED about 89% lower monthly platform cost; a projection, not a result) and moved 11,600+ client contacts across; the $297/month GoHighLevel plan was cancelled 2026-09-23 and no client runs on it now (9 live client accounts).
   - Send-safety and access controls: test mode by default with a server-side recipient allowlist, opt-outs re-checked before every send, SMS blocked until A2P 10DLC approval, fail-closed API, 4-role default-deny authorization. Tests run inside workerd against isolated databases and fake provider credentials.
   - AGC HUB content-operations app (React, Firebase, Vercel serverless, GoHighLevel API): brought the content team's work from 5 tools (Drive, ClickUp, Trello, GoHighLevel, Canva) into one app that runs its daily workflow; added Claude Haiku 4.5 features (subject lines, revision suggestions, help chat, task-image analysis).
   - Client back-office tools on Cloudflare Workers (a nonprofit funnel-tracker dashboard; a resale startup's admin dashboard with a GoHighLevel signup webhook, payout emails, hourly reconcile). Square API payments on a client site. Moves client sites to Cloudflare.
   - Runs client onboarding end to end (GoHighLevel sub-accounts, Cloudflare Pages sites, DNS, SPF/DKIM/DMARC, A2P 10DLC registration) and explains each build in plain language on onboarding calls. Warmed a radio station's sending subdomain to 6,500 emails/day.
2. Virtual Marketing Assistant, Doneverse (agency placement, Philippines), Sep 2025 to Feb 2026, about 6 months. Technical implementer for 2 US founders. Worked in Wix (Wix Studio), Mailchimp, GoHighLevel, ActiveCampaign, Jotform, Kajabi and HubSpot. Learned HubSpot on the job, then recommended HubSpot and ActiveCampaign; the agency adopted both, and ActiveCampaign fixed one client's Mailchimp login errors. This placement led to the direct hire above.

OWN AI PROJECTS (personal, built with Claude Code; walkthroughs on request)
- Behind Works Platform: single-user CRM and email platform (JavaScript, Hono, Cloudflare Workers, D1, Cron Triggers, Email Routing). Contacts, 7-stage pipeline board, 1-5 step campaigns that stop on reply/unsubscribe/bounce, hosted forms, threaded conversations, approval queue. Jobs module: Claude-researched job posts and Claude-drafted applications with a fit score and verdict in an approve/hold/skip queue; auto-send only for strong fits with no open questions (database CHECK constraint, re-checked before sending). Gmail bridge (Apps Script) sends approved applications and reports the first real reply back. Real sending off by default, HMAC-signed links, suppression list, idempotent retries; 546 automated tests.
- Job Tracker: Apps Script + Gmail API, checks replies every 10 minutes, logs to a Sheet, labels, sends one alert, flags look-alike scam emails, smallest Gmail permission, never deletes mail.

SKILLS (as documented)
Claude API (Haiku 4.5, Opus 5.5), OpenAI API (images), prompt design, human-in-the-loop approval flows, cost estimates and spend tracking; Python (FastAPI), JavaScript, TypeScript, Hono, React, Vite, Tailwind; Cloudflare Workers, D1, Queues, Cron Triggers, R2, Pages, Tunnel; Firebase; Vercel; Vitest; GitHub Actions; REST APIs, webhooks, Google Apps Script, Gmail API, Google Sheets API, GoHighLevel API, Resend, Twilio, Stripe, Square API. CRM/email: GoHighLevel, HubSpot, Kajabi, Mailchimp, ActiveCampaign, SPF/DKIM/DMARC, A2P 10DLC. n8n: familiar only (one 47-node workflow design, personal project, never run for a client).

EDUCATION: BS Computer Science, Gordon College, 2021-2025; thesis published at IRCITE 2025.

KNOWN LIMITS (be honest about these when a posting asks for them)
- No machine-learning model training, fine-tuning or data-science work.
- No RAG system or vector database built yet. No formal eval suites for LLM output.
- No multi-step autonomous AI agent in production; AI features are single LLM calls inside larger systems, plus daily use of Claude Code as a coding agent.
- No Zapier or Make experience. n8n is a design only.
- About 1 year of professional experience (since Sep 2025), current role is a part-time contract; no experience leading a team or working inside a large engineering org.
- Python is from personal projects and university, not a paid Python job.
- No AWS, GCP or Azure production work documented (hosting is Cloudflare, Vercel, Firebase).
- No published metrics beyond the ones listed above. Never invent numbers.

MATCHABLE PROJECT IDS (use only these exact ids)
${projectLines}`;
