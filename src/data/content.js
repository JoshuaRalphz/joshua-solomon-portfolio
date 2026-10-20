// All copy for the home page lives here. Case-study copy lives in ./cases.js.
//
// Positioning (Josh, 2026-10-20): AI Solutions Engineer. Lead with systems shipped,
// told as business problem -> what I built -> what changed, tech second.
// Layout (Josh, 2026-10-20): the old "AI Engineer" design (rail, bento, Explore cards,
// Projects grid, Results, Services, About, Contact) carrying this new content.
// TRUTH: facts only from the v9 CV, cases.js and the project READMEs. No invented
// numbers, clients, titles or testimonials. Estimates and projections say so.

export const profile = {
  name: 'Joshua Solomon',
  title: 'AI Solutions Engineer',
  available: 'Available for full-time remote work · can start within 1–2 weeks',
  // Exact wording agreed with Josh. Never "2 years of experience".
  experienceLine: 'Building software with AI since 2024 (Cursor, in college). Professionally since 2025.',
  email: 'solomonjoshua101602@gmail.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  handle: '@JoshuaRalphz',
  shortLocation: 'Olongapo City, PH · Remote',
  status: 'Available for full-time work',
  // The ONE place the resume link is set. Old resume URLs 301 here (public/_redirects).
  resumeUrl: '/Joshua_Solomon_Resume_v9_AI_Solutions_Engineer.pdf',
  photo: '/joshua-solomon.webp',
  avatar: '/joshua-solomon-avatar.webp',
  // Optional intro video for the hero portrait tile (Josh's AI-twin intro, not made yet).
  // null = the photo exactly as before. To turn it on, host the files under public/media/:
  // introVideo: { mp4: '/media/intro.mp4', webm: '/media/intro.webm', captionsVtt: '/media/intro.en.vtt', poster: '/joshua-solomon.webp' }
  introVideo: null,
};

export const initials = profile.name.split(' ').map((word) => word[0]).join('');

// The wired section menu (rail, top bar, footer), the Explore cards and the scroll spy read this.
export const sections = [
  { id: 'top', num: '00', label: 'Overview' },
  { id: 'work', num: '01', label: 'Projects' },
  { id: 'fit-agent', num: '02', label: 'How I’d help' },
  { id: 'results', num: '03', label: 'Results' },
  { id: 'capabilities', num: '04', label: 'Services' },
  { id: 'about', num: '05', label: 'About' },
  { id: 'contact', num: '06', label: 'Contact' },
];

export const hero = {
  outcome: 'I build AI that saves businesses time and money.',
  promise: 'Claude or OpenAI does the drafting, writing or sorting. The code around it keeps costs known, output checked and a person in charge of anything customer-facing.',
};

// Hero proof: system numbers only, each from a README or the CV.
export const heroStats = [
  { value: '30 → 10', label: 'job posts vetted, then applications written and honesty-checked by Claude each day' },
  { value: '~$1', label: 'per finished AI video, vs ~$12 for generated video' },
  { value: '~5 wks', label: 'first commit to 6 client accounts live' },
  { value: '3,200+', label: 'automated tests on one production platform' },
];

// "I'm a…" switch in the hero. Each audience gets a one-line answer and its own second
// button; the main button (the live fit check) is the same for everyone.
// `forYou` = the Explore cards that get a "For you" tag for that audience.
export const audiences = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    answer: 'AI Solutions Engineer, open to full-time remote work and able to start in 1–2 weeks. Paste your job post below for an honest fit check, gaps included.',
    cta: { label: 'Download CV', href: profile.resumeUrl, isDownload: true },
    forYou: ['work', 'fit-agent', 'about'],
  },
  {
    id: 'owner',
    label: 'Business owner',
    answer: 'I take repetitive work off your team with AI. You see the cost before it runs, and you approve what goes out.',
    cta: { label: 'Tell me what eats your week', href: '#contact' },
    forYou: ['fit-agent', 'results', 'capabilities'],
  },
  {
    id: 'leader',
    label: 'Leader',
    answer: 'AI that is safe to run: rules enforced in code and in the database, daily cost caps, a person approving what matters, and 3,200+ tests on one platform.',
    cta: { label: 'How I keep AI safe', href: '#safety' },
    forYou: ['work', 'results', 'about'],
  },
];

// "How my AI systems run": a process, not live data. `example` is the same step in the
// AI job hunt (cases.js), shown when a visitor hovers or taps the step.
export const flow = [
  {
    label: 'Trigger',
    caption: 'A schedule, an email, a form or a request in chat',
    example: 'Every 5 minutes Cloudflare’s cron wakes the job hunt. Once a day it reads five public job APIs and keeps up to 30 new AI roles. My PC can be off.',
  },
  {
    label: 'AI does the work',
    caption: 'Claude reads, scores and drafts; OpenAI makes images and voice',
    example: 'Claude Opus 5.5 vets each post (fit 1–10, scam risk, pay), writes the best 10 applications, then a second Claude pass removes anything not in my CV.',
  },
  {
    label: 'Code checks it',
    caption: 'Rules, caps and budgets enforced in code and in the database',
    example: 'A database CHECK refuses any auto-send that isn’t a strong fit with nothing to ask me. A hard daily AI budget and a 10-a-day cap sit in code.',
  },
  {
    label: 'You approve',
    caption: 'A person signs off on what matters before it goes out',
    example: 'Strong fits send after a 3-hour hold I can stop. Interview times, pay, tests and offers always wait for me.',
  },
];

// The hero tool strip. `icon` is a simple-icons export name (ToolStrip.jsx draws it inline,
// no third-party request); null = name only. Every tool here is in the v9 CV.
export const toolStrip = [
  { name: 'Claude Code', icon: 'siClaude' },
  { name: 'Claude API', icon: 'siAnthropic' },
  { name: 'OpenAI API', icon: null },
  { name: 'Cloudflare Workers', icon: 'siCloudflareworkers' },
  { name: 'Cloudflare D1', icon: 'siCloudflare' },
  { name: 'Hono', icon: 'siHono' },
  { name: 'Python', icon: 'siPython' },
  { name: 'FastAPI', icon: 'siFastapi' },
  { name: 'FFmpeg', icon: 'siFfmpeg' },
  { name: 'TypeScript', icon: 'siTypescript' },
  { name: 'React', icon: 'siReact' },
  { name: 'Vite', icon: 'siVite' },
  { name: 'Tailwind CSS', icon: 'siTailwindcss' },
  { name: 'Apps Script', icon: 'siGoogleappsscript' },
  { name: 'Gmail API', icon: 'siGmail' },
  { name: 'Cursor', icon: 'siCursor' },
  { name: 'GitHub Actions', icon: 'siGithubactions' },
  { name: 'Vitest', icon: 'siVitest' },
  { name: 'Resend', icon: 'siResend' },
  { name: 'Firebase', icon: 'siFirebase' },
  { name: 'Vercel', icon: 'siVercel' },
  { name: 'Square API', icon: 'siSquare' },
  { name: 'Stripe', icon: 'siStripe' },
  { name: 'GoHighLevel', icon: null },
  { name: 'HubSpot', icon: 'siHubspot' },
  { name: 'Mailchimp', icon: 'siMailchimp' },
  { name: 'Wix Studio', icon: 'siWix' },
];

// The full list under the strip, grouped as the v9 CV groups its skills.
export const toolGroups = [
  { category: 'AI and LLMs', items: ['Claude API (Haiku 4.5, Opus 5.5)', 'OpenAI API (images, text-to-speech)', 'fal.ai', 'ElevenLabs', 'Structured JSON output', 'Prompt-injection checks', 'Human-in-the-loop approval', 'Daily AI budgets'] },
  { category: 'Code', items: ['Python (FastAPI)', 'JavaScript', 'TypeScript', 'Hono', 'React', 'Vite', 'Tailwind CSS', 'FFmpeg'] },
  { category: 'Cloud', items: ['Cloudflare Workers', 'D1', 'Queues', 'Cron Triggers', 'R2', 'Pages', 'Email Routing', 'Tunnel', 'Firebase', 'Vercel'] },
  { category: 'Automation', items: ['REST APIs and webhooks', 'Cron jobs and queues', 'Idempotent retries', 'Google Apps Script', 'Gmail API', 'Google Sheets API', 'GoHighLevel API'] },
  { category: 'Email and CRM', items: ['Resend', 'Twilio', 'GoHighLevel', 'HubSpot', 'Kajabi', 'Mailchimp', 'ActiveCampaign', 'SPF/DKIM/DMARC', 'A2P 10DLC'] },
  { category: 'Tools', items: ['Claude Code (daily)', 'Cursor (since 2024)', 'Git', 'GitHub Actions', 'Vitest', 'workerd', 'Square API', 'Stripe', 'Wix / Wix Studio', 'Jotform'] },
];

// The six Explore cards: one per section after the overview. `lines` reframe each card
// for the audience picked in the hero (recruiter is the default and the no-JS text).
export const explore = [
  {
    num: '01', id: 'work', label: 'PROJECTS', title: '2 AI systems, an agency platform and 6 client projects',
    lines: {
      recruiter: 'Proof for the role: AI systems I built end to end, then the platform I built at work.',
      owner: 'Busywork taken off: a job search that runs itself and videos at about $1 each.',
      leader: 'Each one shows its gates: database checks, cost caps and human approval.',
    },
  },
  {
    num: '02', id: 'fit-agent', label: 'LIVE DEMO', title: 'Paste a job post. See the fit.',
    lines: {
      recruiter: 'An AI agent checks your role against my real work, gaps included.',
      owner: 'See what I’d likely fix for your team first.',
      leader: 'One capped Claude call that can only cite real projects.',
    },
  },
  {
    num: '03', id: 'results', label: 'RESULTS', title: '~$1',
    lines: {
      recruiter: 'Per finished AI video. Every number links to its source.',
      owner: 'Per finished AI video, vs about $12 for paid generative video.',
      leader: 'Per video, with a cost estimate before any paid step.',
    },
  },
  {
    num: '04', id: 'capabilities', label: 'SERVICES', title: 'Five things I can own',
    lines: {
      recruiter: 'AI workflows, content pipelines, internal platforms, integrations, email.',
      owner: 'What I’d build for you, and how working with me goes.',
      leader: 'Each with a person approving and a cost known first.',
    },
  },
  {
    num: '05', id: 'about', label: 'ABOUT', title: 'About, experience and how I keep AI safe',
    lines: {
      recruiter: 'AI & Systems Lead at Arrow Group Consulting, Feb 2026 to now. Doneverse before that.',
      owner: 'Who you’d work with, and where and when I work.',
      leader: 'Six rules I build by: approval, budgets, database checks, tests.',
    },
  },
  {
    num: '06', id: 'contact', label: 'CONTACT', title: 'Hiring, contracting, or just want to talk?',
    lines: {
      recruiter: 'I reply within 24 hours. CV and references on request.',
      owner: 'Tell me the work that eats your week. I reply within 24 hours.',
      leader: 'Ask for a code or live walkthrough of any system here.',
    },
  },
];

// "By hand" vs "with my system" for each build: the toggle on its Projects tile.
// Every line restates cases.js or the CV; the agency figure is a projection and says so.
export const compare = {
  'ai-job-hunt': {
    before: ['Find real remote roles by hand', 'Judge every post, write each application', 'Answer replies fast, in the evenings', 'Rushed applications come out generic'],
    after: ['Up to 30 new AI roles read a day', 'Best 10 written, then honesty-checked against my CV', 'Strong fits send after a 3-hour hold; the rest wait for me', '~$1–2.50 estimated AI cost a day, under a hard budget'],
  },
  'ai-video-engine': {
    before: ['About $12 a video for paid generative video', 'Shots drift and morph between cuts', 'Hours of script, visuals, voice and edit each time'],
    after: ['About $1 a video ($0.72 for a real 2-part story)', 'One style anchor keeps every image consistent', 'A 24-second video renders in about 37 seconds', 'Cost estimate first; I approve and post every video'],
  },
  agency: {
    before: ['Rent GoHighLevel every month', '10,000+ client contacts on a rented platform'],
    after: ['Its own email and SMS platform, built in-house', 'Projected ~89% lower monthly platform cost (business case)', 'Old platform runs in parallel during the move'],
  },
};

// The shorter third case: the in-house platform at work. Facts from the v9 CV;
// screenshots approved by the agency owner, client name and figures blurred.
export const agencyCase = {
  id: 'arrowplatform',
  tag: 'At work · Arrow Group Consulting · 2026',
  title: 'Agency email & SMS platform',
  outcome: 'The agency stops renting its marketing platform: a projected ~89% lower monthly platform cost, with no external build spend.',
  changed: [
    '6 client accounts live about 5 weeks after the first commit (Aug–Sep 2026)',
    'Now replacing GoHighLevel at the agency',
    '3,200+ automated tests that can never send a real message',
    'Claude drafts subject lines and preview text; OpenAI makes images',
  ],
  safety: 'Safe by default: test mode until switched on, opt-outs re-checked before every send, SMS blocked until A2P 10DLC approval, and 4-role default-deny access.',
  stack: ['TypeScript', 'Cloudflare Workers + Hono', 'D1', 'Queues', 'React', 'Resend', 'Twilio', 'Claude API'],
  gallery: [
    { src: '/work-thumbs/arrowplatform-1.png', w: 1600, h: 925, label: 'Client dashboard: the month at a glance, with a monthly report' },
    { src: '/work-thumbs/arrowplatform-2.png', w: 1600, h: 680, label: 'Campaigns: delivery, opens, clicks and unsubscribes for every send' },
  ],
  note: 'Private company platform, so there is no public link. Screenshots shown with the agency owner’s approval; the client’s name and figures are blurred.',
};

// A small own build kept from the old site (also in the fit agent's profile, which links to it).
export const jobTracker = {
  id: 'replytracker',
  tag: 'Own build · Automation',
  title: 'Job Tracker',
  subtitle: 'Gmail reply alerts in Apps Script',
  wins: [
    'Checks Gmail for replies every 10 minutes, even with my computer off',
    'Logs each reply to a Sheet, labels it and sends one alert',
    'Look-alike scam emails are flagged, not trusted',
    'Smallest Gmail permission that allows labelling; never deletes mail',
  ],
  stack: ['Google Apps Script', 'Gmail API', 'Google Sheets', 'Built with Claude Code'],
};

// Client work, shown as the old screenshot grid (existing, approved screenshots only).
// `url` only where the domain still belongs to that client: adasclosetsau.com and
// aoutilityservices.com now redirect to other brands.
export const clientWork = [
  { id: 'aoutility', name: 'Alpha Omega Utility Services', tag: 'CRM · SMS · Email · Web', place: 'Michigan', initials: 'AO', thumb: '/work-thumbs/aoutility.png', line: 'Business texting approved: A2P 10DLC brand registration on GoHighLevel, plus site, email and domain setup.' },
  { id: 'homefm', name: 'HOME.FM', tag: 'Email · CRM · Web', place: 'Spring Arbor, MI', initials: 'HF', thumb: '/work-thumbs/homefm.png', line: 'Email that reaches the inbox: a dedicated sending subdomain with SPF/DKIM/DMARC, warmed to 6,500 emails a day.', url: 'https://www.home.fm' },
  { id: 'adas', name: 'Ada’s Closet', tag: 'Ops · Integration', place: 'Spring Arbor, MI', initials: 'AC', thumb: '/work-thumbs/adas.png', line: 'Back-office for a student consignment startup: listings to Poshmark, eBay and Depop, live inventory, sale alerts in Apps Script.' },
  { id: 'alliance', name: 'Alliance Service Brands', tag: 'Custom build · Web', place: 'Jackson, MI', initials: 'AS', thumb: '/work-thumbs/alliance.png', line: 'One custom site that unifies six home-service brands.', url: 'https://www.allianceservicebrands.com' },
  { id: 'endtime', name: 'Endtime Entrepreneurs', tag: 'Custom build · SEO · CRM', place: 'USA', initials: 'EE', thumb: '/work-thumbs/endtime.png', line: 'A site built from scratch on Cloudflare Pages, plus CRM, music distribution and SEO.', url: 'https://endtimeentrepreneurs.com' },
  { id: 'truecare', name: 'TrueCare Chiropractic', tag: 'Email · SEO · DNS', place: 'Lansing, MI', initials: 'TC', thumb: '/work-thumbs/truecare.png', line: 'Email marketing, site upkeep and SEO for a chiropractic clinic.', url: 'https://www.truecarechiro.com' },
];

// Results: the lime lead tile compares two costs with bars; the four tiles beside it
// are system numbers. Each links to where it comes from.
export const leadResult = {
  value: '~$1',
  title: 'Per finished AI video',
  note: 'vs about $12 for paid generative video · AI Video Engine',
  href: '/work/ai-video-engine/',
  bars: [
    { label: 'Paid generative video', value: 12, display: '~$12' },
    { label: 'My engine (motion on AI stills)', value: 1, display: '~$1' },
  ],
};
export const results = [
  { value: '700+', title: 'Automated tests on the AI job hunt', note: 'Run with no server and no network', href: '/work/ai-job-hunt/' },
  { value: '$0.72', title: 'Real API cost of a 2-part AI video story', note: '$0.49 + $0.23, measured on a real run', href: '/work/ai-video-engine/' },
  { value: '3,200+', title: 'Automated tests on the agency platform', note: 'None of them can send a real message', href: '#work-arrowplatform' },
  { value: '6', unit: 'accounts', title: 'Live about 5 weeks after the first commit', note: 'Aug–Sep 2026 · agency platform', href: '#work-arrowplatform' },
];
export const agencyMarketingResult = 'From agency email work: a nonprofit’s average click rate went from 4.5% (April 2026) to 9.5% (May 2026). Two months compared, not an A/B test.';

// Services: what the business gets. The lead one is open; the others fold their detail.
// Bullets restate the v9 CV and cases.js.
export const services = [
  {
    id: 'busywork',
    Icon: 'Inbox',
    title: 'Take the busywork off your team',
    outcome: 'AI that reads, sorts, drafts and replies, with a person approving the exceptions.',
    summary: 'Inbound email, leads, applications, support: Claude does the reading and drafting, code enforces the rules and caps, and anything that matters waits for a yes.',
    bullets: [
      'Claude scores and drafts in a fixed JSON schema',
      'A second AI pass strips claims that aren’t true',
      'Outside text treated as untrusted (prompt-injection checks)',
      'Rules enforced in the database, re-checked before sending',
      'Daily AI budgets and send caps in code',
      'Human approval queue for anything customer-facing',
    ],
    proof: { label: 'AI Job Hunt engine', href: '/work/ai-job-hunt/' },
  },
  {
    id: 'content',
    Icon: 'Clapperboard',
    title: 'Content at a cost you know first',
    outcome: 'Scripts, images, voice and video, with a cost estimate before every paid step.',
    summary: 'AI production pipelines that never publish without a yes.',
    bullets: ['Claude scripts; OpenAI images and voice', 'Custom FFmpeg render with burned captions', 'Retries that never pay twice for a step', 'Real cost recorded for every video'],
    proof: { label: 'AI Video Engine', href: '/work/ai-video-engine/' },
  },
  {
    id: 'own',
    Icon: 'Server',
    title: 'Own your tools instead of renting them',
    outcome: 'Internal platforms that replace per-seat software, covered by tests, safe by default.',
    summary: 'Built fast with Claude Code on Cloudflare Workers and D1.',
    bullets: ['Test mode until switched on', '4 user roles, default-deny access', 'Tests that never send a real message', 'Old platform kept running during the move'],
    proof: { label: 'Agency email & SMS platform', href: '#work-arrowplatform' },
  },
  {
    id: 'automation',
    Icon: 'Workflow',
    title: 'Connect the tools you already use',
    outcome: 'Webhooks, cron jobs and Gmail automation that keep running when no one is watching.',
    summary: 'REST APIs, webhooks, queues and Apps Script, with retries that are safe to repeat.',
    bullets: ['Google Apps Script + Gmail API', 'Google Sheets and GoHighLevel APIs', 'Cron jobs, queues, idempotent retries', 'HMAC-signed links', 'Square API payments on a client site'],
    proof: { label: 'Job Tracker', href: '#work-replytracker' },
  },
  {
    id: 'email',
    Icon: 'Mail',
    title: 'Email and SMS that reach people',
    outcome: 'Sending set up properly, so messages land in the inbox and texting gets approved.',
    summary: 'Supporting experience from agency work.',
    bullets: ['SPF/DKIM/DMARC on dedicated sending domains', 'Domain warm-up (one to 6,500 emails a day)', 'A2P 10DLC registration for business texting', 'GoHighLevel, HubSpot, Mailchimp, ActiveCampaign, Kajabi'],
    proof: { label: 'Client work', href: '#work-homefm' },
  },
];

// For business owners: what working with me looks like. A process, not a result.
export const workSteps = [
  { title: 'Tell me the busywork', body: 'On a call, by email, or paste a job post into the fit check.' },
  { title: 'See the plan and the cost', body: 'What the AI does, where a person approves, and what it costs to run.' },
  { title: 'I build it, tests first', body: 'Built with Claude Code, in test mode until you switch it on.' },
  { title: 'You stay in charge', body: 'You approve what goes out. I explain every part in plain language.' },
];

// For leaders: the rules every system here is built by (About, #safety). Each one is
// shown in a case study or the CV.
export const principles = [
  { Icon: 'UserCheck', title: 'A person approves what matters', body: 'Interview times, pay, offers and anything customer-facing wait for a human yes. Auto-send is the exception, and it waits behind a hold I can stop.' },
  { Icon: 'Wallet', title: 'Costs are capped and known first', body: 'Daily AI budgets, send caps, and a cost estimate before any paid step. Every video records what it really cost.' },
  { Icon: 'Database', title: 'Rules live in the database', body: 'A prompt can be talked around. A CHECK constraint can’t: a bad auto-send row can’t even be stored, and the queue checks again before sending.' },
  { Icon: 'ShieldCheck', title: 'Outside text is untrusted', body: 'Job posts and emails reach Claude as data, not instructions. A post that tries to steer the AI is sent to me instead.' },
  { Icon: 'FlaskConical', title: 'Tested where it runs', body: '3,200+ tests on the agency platform, 700+ on the job hunt and 406 on the video engine. The agency tests run in the Workers runtime and can never send a real message.' },
  { Icon: 'MessageSquare', title: 'Explained in plain language', body: 'I walk clients and founders through each build on calls, and I write down what broke and what I changed.' },
];

export const bio = 'I ship production systems by directing AI coding agents (Claude Code), and I put AI inside them: Claude and OpenAI do the reading, writing and generating; the code around them keeps every step checked, capped and approved by a person. At a US marketing agency I built its in-house email and SMS platform and lead client onboarding. Before that, about 6 months as a marketing VA with US founders.';

export const setup = [
  'Olongapo City, Philippines',
  'US Eastern hours preferred; PH, AU or European hours also work',
  'Laptop, two internet providers (one as backup), and a UPS for the internet router',
  'English (professional working proficiency), Filipino (native)',
];

export const education = [
  { degree: 'BS Computer Science', school: 'Gordon College · Olongapo City', dates: '2021 — 2025', note: 'Thesis published at IRCITE 2025 (Bulacan State University).' },
  { degree: 'Senior High School · TVL–ICT Track', school: 'Columban College Inc. · Olongapo City', dates: '2019 — 2021', note: 'Graduated With High Honors.' },
];

// Described as the v9 CV does. "AI & Systems Lead" confirmed by the agency owner.
export const experience = [
  {
    role: 'AI & Systems Lead',
    company: 'Arrow Group Consulting',
    meta: 'US outsourced-CMO agency · Michigan, USA (remote) · Part-time contract',
    dates: 'Feb 2026 — Present',
    bullets: [
      'Built and launched the agency’s in-house email/SMS platform with Claude Code: 6 accounts live about 5 weeks after the first commit (Aug–Sep 2026). The agency is now replacing GoHighLevel with it.',
      'Wrote the business case (projected ~89% lower monthly platform cost, no external build spend) and planned the move of 10,000+ client contacts, with the old platform running in parallel.',
      'Lead client onboarding, handling 8 clients at once: GoHighLevel, Cloudflare sites, DNS, SPF/DKIM/DMARC and A2P 10DLC, explained in plain language on calls.',
      'Added Claude Haiku 4.5 features to the team’s daily content app (subject lines, revision ideas, a help chat, task-image analysis) and brought the team’s work from 5 tools into one app.',
      'Built a nonprofit funnel tracker, a resale startup’s admin dashboard and Square payments on a client site, all on Cloudflare.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant (VMA), agency placement',
    company: 'Doneverse',
    meta: 'Philippines · matches marketing talent with US founders',
    dates: 'Sep 2025 — Feb 2026 · about 6 months',
    bullets: [
      'Technical implementer for 2 US founders: Arrow Group Consulting’s founder (which led to a direct hire), then speaker Jonathan Fanning.',
      'Built Wix and Wix Studio sites; set up and ran Mailchimp, GoHighLevel, HubSpot and Kajabi; also used Jotform.',
      'Learned HubSpot on the job, then recommended HubSpot and ActiveCampaign; the agency adopted both.',
    ],
  },
];

export const earlierExperience = {
  label: 'Earlier · working student (2024 to 2025, during college)',
  body: 'Social media for ADAP Real Estate, Subic.',
};

// Web3Forms access keys are public by design (they only route the form to one inbox).
export const WEB3FORMS_ACCESS_KEY = 'babb1c1a-29c2-466a-a459-aab61c331600';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
