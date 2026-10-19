// Centralized content so it's easy to edit without touching JSX.
//
// This portfolio is positioned as a HIRING portfolio (full-time remote,
// contract, retainer roles). Pricing, retainer tiers, and "my team produces"
// references were removed intentionally — Joshua handles freelance offers via
// a separate company brand, not this site.

export const profile = {
  name: 'Joshua Solomon',
  available: 'Available for full-time work · can start within 1-2 weeks of an offer',
  email: 'solomonjoshua101602@gmail.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  facebook: 'https://www.facebook.com/lionheart016',
  handle: '@JoshuaRalphz',
  shortRole: 'AI Engineer',
  shortLocation: 'Olongapo City, PH · Remote',
  status: 'Available for full-time work',
  // The ONE place the resume link is set (rail, top bar, contact all read it).
  // To switch CVs, change this line, e.g. to '/Joshua_Solomon_Resume_v8_AI_Engineer.pdf',
  // and add a "/Joshua_Solomon_Resume_v7.pdf -> new file 301" line in public/_redirects.
  resumeUrl: '/Joshua_Solomon_Resume_v8_AI_Engineer.pdf',
  // Portrait tile photo and its square face crop for the round avatar. Null falls back to the monogram.
  photo: '/joshua-solomon.webp',
  avatar: '/joshua-solomon-avatar.webp',
  bio: 'AI Engineer with about a year of remote work for US clients (since Sep 2025). I build LLM apps and AI automation on the Claude and OpenAI APIs, Cloudflare Workers + D1 and Google Apps Script, using AI-assisted development in Claude Code: my own AI video engine, my own outreach and job-application platform, and Gmail automation. Alongside that, hands-on agency work in GoHighLevel, lifecycle email and SMS, deliverability, and the custom-coded sites behind them. Open to full-time remote, contract, or fractional roles.',
};

// Monogram fallback for the avatar and the portrait tile.
export const initials = profile.name.split(' ').map((word) => word[0]).join('');

// The wired section menu (rail, top bar, footer) and the scroll spy read this.
export const sections = [
  { id: 'top', num: '00', label: 'Overview' },
  { id: 'work', num: '01', label: 'Projects' },
  { id: 'results', num: '02', label: 'Results' },
  { id: 'capabilities', num: '03', label: 'Services' },
  { id: 'about', num: '04', label: 'About' },
  { id: 'contact', num: '05', label: 'Contact' },
];

export const hero = {
  headline: 'AI Engineer. I build LLM apps and AI automation.',
  promise: 'On the Claude and OpenAI APIs, built with Claude Code: a video engine that turns a one-line topic into a finished, captioned MP4, my own outreach and job-application platform on Cloudflare Workers, and Gmail automation in Apps Script. A human stays in the loop: I approve what goes out, and anything that sends by itself waits behind a hold I can stop.',
};

export const stats = [
  { value: '3', label: 'AI and automation builds of my own, in use' },
  { value: '~1 yr', label: 'Remote work for US clients, since Sep 2025' },
  { value: '24h', label: 'Reply time · US Eastern hours preferred' },
];

// The hero "how my AI pipelines run" tile. It describes a process, it is not live data.
export const flow = [
  { label: 'Brief', caption: 'A one-line topic or task, given in Claude Code chat' },
  { label: 'Generate', caption: 'Claude writes; OpenAI makes the images and voice' },
  { label: 'Check', caption: 'Tests, checks and a cost estimate before spending' },
  { label: 'Approve', caption: 'Nothing sends or posts without a human yes' },
];

// Numbers only, each with where it came from. The projected ~89% cost figure is
// deliberately NOT a result: it stays inside the Arrow Platform summary, worded "projected".
// The lead result compares two months' average click rates (3 campaigns in April,
// 11 in May). It is not a before/after test, so the bars are labelled by month.
export const results = [
  { lead: true, value: '2x', title: 'Nonprofit average email click rate', note: '4.5% to 9.5% (Apr–May 2026)', before: 4.5, after: 9.5, beforeLabel: 'April 2026', afterLabel: 'May 2026' },
  // Four sub-results keep the 2x2 grid beside the lead tile. The email-only HOME.FM
// (6,500/day) and A2P figures stay on their project tiles and in Services.
// yt-engine figures: README "Costs per video" (a real 2-part run: $0.49 + $0.23) and its test table (406 unit tests).
  { value: '$0.72', title: 'Real API cost of a 2-part AI video story', note: 'Script, images and voice, measured on a real run · AI video engine', workId: 'ytengine' },
  { value: '400+', title: 'Unit tests on the AI video engine', note: 'Plus acceptance suites against a fake stand-in for the paid APIs', workId: 'ytengine' },
  { value: '3,200+', title: 'Automated tests', note: 'Arrow Platform, built with Claude Code', workId: 'arrowplatform' },
  { value: '6', unit: 'accounts', title: 'Live about 5 weeks after the first commit', note: 'Aug–Sep 2026 · Arrow Platform', workId: 'arrowplatform' },
];

// The five Explore cards. The 01 title is computed from works in ExploreCards.jsx.
export const explore = [
  { num: '01', id: 'work', label: 'PROJECTS', title: null, line: 'My own AI builds first, then an in-house platform and client work shown with permission.' },
  { num: '02', id: 'results', label: 'RESULTS', title: '$0.72', line: 'Real API cost of a 2-part AI video story: script, images and voice. More numbers inside.' },
  { num: '03', id: 'capabilities', label: 'SERVICES', title: 'Five things I can own', line: 'LLM apps, AI automation, Workers apps, then email and CRM.' },
  { num: '04', id: 'about', label: 'ABOUT', title: 'About and experience', line: 'Arrow Group Consulting, Feb 2026 to present. Doneverse before that.' },
  { num: '05', id: 'contact', label: 'CONTACT', title: 'Hiring, contracting, or just want to talk?', line: 'I reply within 24 hours.' },
];

// Where and how I work (About section).
export const setup = [
  'Olongapo City, Philippines',
  'US Eastern hours preferred; PH, AU or European hours also work',
  'Laptop, two internet providers (one as backup), and a UPS for the internet router',
  'English (professional working proficiency), Filipino (native)',
];

export const education = [
  {
    degree: 'BS Computer Science',
    school: 'Gordon College · Olongapo City, Philippines',
    dates: '2021 — 2025',
    note: 'Thesis published at IRCITE 2025 (Bulacan State University).',
  },
  {
    degree: 'Senior High School — TVL ICT Track',
    school: 'Columban College Inc. · Olongapo City, Philippines',
    dates: '2019 — 2021',
    note: 'Graduated With High Honors.',
  },
];

// Web3Forms access key for the portfolio contact form.
// Forwards form submissions directly to solomonjoshua101602@gmail.com.
// Generated at web3forms.com — replaces the previous GHL WF-PORTFOLIO webhook.
export const WEB3FORMS_ACCESS_KEY = 'babb1c1a-29c2-466a-a459-aab61c331600';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Strengths shown on the Home page — candidate-facing, employee-positioned.
export const benefits = [
  {
    title: 'AI pipelines, end to end.',
    body: 'From the brief to the finished output: Claude writes, OpenAI makes the images and voice, my code checks and renders, and every run records what it actually cost. I build the whole pipeline, not just one prompt.',
  },
  {
    title: 'A human in the loop, on purpose.',
    body: 'What I build waits for a yes before it acts: emails in my platform\'s Approvals queue, job applications through the Gmail bridge, videos before they are posted. Cost estimates come first; money is spent only after a go.',
  },
  {
    title: 'Comfortable across the stack.',
    body: 'Claude Code, the Claude and OpenAI APIs, Python + FastAPI, Cloudflare Workers + D1 with Hono, Google Apps Script + Gmail API, React + Vite, plus GoHighLevel, HubSpot and Mailchimp from agency work. I pick up whatever your team already uses.',
  },
  {
    title: 'Founder-friendly communication.',
    body: 'I translate AI, automation and implementation details into plain English on calls and in writing. Comfortable speaking directly to founders, senior stakeholders, and end clients.',
  },
  {
    title: 'Async-first, flexible hours.',
    body: 'Olongapo, Philippines — US Eastern hours preferred; PH, AU or European hours also work. Work setup: laptop, two internet providers (one as backup), and a UPS for the internet router. Strong written communication for distributed teams.',
  },
  {
    title: 'I build the systems I work in.',
    body: 'Recently built an internal content-operations hub (React + Firebase PWA with Vercel serverless routes and the GoHighLevel API) that brings a US consultancy\'s 5 scattered tools into one app. In daily production. Also built the agency\'s in-house email/SMS platform (Cloudflare Workers + D1), which is now replacing GoHighLevel.',
  },
];

// Capabilities — what I deliver. No pricing, no tier framing.
// Ordered to lead with AI engineering; email/CRM follow as supporting experience.
export const services = [
  {
    id: 'ai-engineering',
    title: 'AI Engineering & LLM Apps',
    summary: 'LLM pipelines on the Claude and OpenAI APIs: scripts, drafts and topic ideas from Claude, images and voice from OpenAI, with checks, retries and cost tracking around every call. Built with Claude Code, with a human approval step before anything goes out.',
    bullets: [
      'Claude API pipelines: scripts, drafting, extraction, topic ideas',
      'OpenAI API for image generation and text-to-speech',
      'Cost estimate before every paid run; the actual cost recorded per run',
      'Retries that resume where they stopped, never paying twice for a step',
      'Tests against a fake stand-in for the paid APIs',
      'AI-assisted development in Claude Code, driving the apps from chat',
      'Human approval before anything sends or posts',
    ],
    outcome: 'AI pipelines that do real work, at a known cost, with a person signing off.',
  },
  {
    id: 'automation',
    title: 'Workflow Automation & Integrations',
    summary: 'Google Apps Script and Gmail API automations, webhook/API integrations connecting your stack, and an n8n lead-generation workflow I designed.',
    bullets: [
      'Google Apps Script + Gmail API: reply tracking, sending from your own Gmail',
      'The smallest Gmail permission that does the job; never deletes mail',
      'GoHighLevel API + Google Sheets API integrations',
      'n8n — designed a 47-node lead-generation workflow (personal project)',
      'Multi-provider email enrichment (Hunter → Snov → Apollo)',
      'Error handling + fallbacks + human review before anything sends',
    ],
    outcome: 'Repetitive work automated, with human review before anything sends.',
  },
  {
    id: 'web-tools',
    title: 'Apps, Sites & Internal Tools',
    summary: 'Cloudflare Workers + D1 apps with Hono, React + Vite + Firebase internal tools, and hand-coded HTML/CSS/JS sites on Cloudflare Pages. Recently built an internal content-operations hub unifying a US agency\'s scattered tool stack. In daily production.',
    bullets: [
      'Cloudflare Workers + D1 apps with Hono',
      'Custom-coded sites on Cloudflare Pages',
      'React + Vite + Tailwind for app-style tools and portfolios',
      'Firebase + GitHub Actions CI/CD + auto-deploy',
      'PWA architecture — installable, offline-aware, mobile-first',
      'Square API payments on a Cloudflare-hosted client site',
      'Wix Studio + Velo, or WordPress, when the client needs to self-edit',
    ],
    outcome: 'Fast apps and internal tools the team owns forever.',
  },
  {
    id: 'email-lifecycle',
    title: 'Email, Lifecycle & Deliverability',
    summary: 'End-to-end lifecycle programs on GoHighLevel, Mailchimp, HubSpot, and Kajabi — segmentation, nurture and retention flows, A/B tests and analytics — on dedicated sending domains with SPF/DKIM/DMARC aligned, so they reach the inbox.',
    bullets: [
      'Campaign builds — newsletters, promos, onboarding sequences',
      'Audience segmentation + automated nurture & retention flows',
      'A/B split tests on subject lines and content',
      'Open / click / delivery analytics reporting',
      'Dedicated sending subdomains, SPF / DKIM / DMARC + SSL',
      'Email warmup to 6,500/day sending capacity',
      'Pre-send QA — test sends, link + unsubscribe checks, phone preview',
    ],
    outcome: 'Lifecycle programs that land in the inbox and re-engage automatically.',
  },
  {
    id: 'crm',
    title: 'CRM Configuration & SMS',
    summary: 'GoHighLevel, HubSpot, and Mailchimp builds tied to real sales processes. Sub-account setup, pipelines, workflows triggered by tags and custom fields, and A2P 10DLC-compliant SMS campaigns.',
    bullets: [
      'GoHighLevel full builds — pipelines, automations, sub-accounts',
      'A2P 10DLC SMS brand approval (the GHL setup most builders avoid)',
      'HubSpot + Mailchimp + Kajabi configuration',
      'GHL tags + custom fields that trigger workflows',
      'Business profiles + email service connections',
      'Pages built in the GHL website + funnel builder',
    ],
    outcome: 'Every lead tagged, every follow-up automated, every conversation logged.',
  },
];

// The site lists these grouped by `category`, in this order (AI first). `tier`
// (how often each is used) is kept for reference only and is NOT shown: no CV
// states a usage frequency. Tools added for the AI Engineer update have no tier
// rather than a guessed one.
export const tools = [
  // AI & LLM
  { name: 'Claude Code', category: 'AI' },
  { name: 'Claude API',  tier: 'Weekly', category: 'AI' },
  { name: 'OpenAI API',  tier: 'Weekly', category: 'AI' },

  // Code
  { name: 'Python',              category: 'Code' },
  { name: 'FastAPI',             category: 'Code' },
  { name: 'TypeScript',          category: 'Code' },
  { name: 'Hono',                category: 'Code' },
  { name: 'HTML/CSS/JS',         tier: 'Daily',  category: 'Code' },
  { name: 'React',               tier: 'Weekly', category: 'Code' },
  { name: 'Vite',                tier: 'Weekly', category: 'Code' },
  { name: 'Tailwind CSS',        tier: 'Daily',  category: 'Code' },
  { name: 'FFmpeg',              category: 'Code' },
  { name: 'Git / GitHub',        tier: 'Daily',  category: 'Code' },

  // Hosting & DevOps
  { name: 'Cloudflare Workers', category: 'Hosting' },
  { name: 'Cloudflare D1',      category: 'Hosting' },
  { name: 'Cloudflare Pages', tier: 'Daily', category: 'Hosting' },
  { name: 'Cloudflare DNS',   tier: 'Daily', category: 'Hosting' },
  { name: 'Cloudflare Tunnel', category: 'Hosting' },
  { name: 'Vercel',           tier: 'Weekly', category: 'Hosting' },
  { name: 'Firebase',         tier: 'Weekly', category: 'Hosting' },
  { name: 'GitHub Actions',   tier: 'Weekly', category: 'Hosting' },

  // Automation — n8n: one personal 47-node workflow (designed; deployment not confirmed)
  { name: 'Google Apps Script',  tier: 'Weekly', category: 'Automation' },
  { name: 'Gmail API',   category: 'Automation' },
  { name: 'Google Sheets API', category: 'Automation' },
  { name: 'n8n',         tier: 'Occasional', category: 'Automation' },

  // CRM & Marketing Platforms
  { name: 'GoHighLevel', tier: 'Daily', category: 'CRM' },
  // HubSpot, Mailchimp, Kajabi: used at Doneverse (Sep 2025 – Feb 2026), not daily now
  { name: 'HubSpot',     tier: 'Occasional', category: 'CRM' },
  { name: 'Mailchimp',   tier: 'Occasional', category: 'CRM' },
  { name: 'Kajabi',      tier: 'Occasional', category: 'CRM' },
  { name: 'ActiveCampaign', tier: 'Occasional', category: 'CRM' },

  // Email & Deliverability
  { name: 'Resend',         category: 'Email' },
  { name: 'SPF/DKIM/DMARC', tier: 'Weekly', category: 'Email' },

  // SMS & Compliance
  { name: 'GHL A2P 10DLC',  tier: 'Occasional', category: 'SMS' },
  { name: 'SMS Automation', tier: 'Weekly', category: 'SMS' },

  // SEO
  { name: 'On-page SEO',           tier: 'Weekly', category: 'SEO' },
  { name: 'Technical SEO',         tier: 'Weekly', category: 'SEO' },

  // CMS / Site Builders — Wix work was mainly at Doneverse (Sep 2025 – Feb 2026)
  { name: 'Wix Studio',    tier: 'Occasional', category: 'CMS' },
  { name: 'Wix Velo',      tier: 'Occasional', category: 'CMS' },
  { name: 'WordPress',     tier: 'Occasional', category: 'CMS' },

  // Ops & Project Management
  { name: 'ClickUp',          tier: 'Daily',  category: 'Ops' },
  { name: 'Google Workspace', tier: 'Daily',  category: 'Ops' },
  { name: 'Notion',           tier: 'Weekly', category: 'Ops' },

  // Payments
  { name: 'Square',        tier: 'Occasional', category: 'Payments' },
  { name: 'Stripe',        tier: 'Occasional', category: 'Payments' },

  // Design
  { name: 'Figma', tier: 'Weekly', category: 'Design' },
  { name: 'Canva', tier: 'Weekly', category: 'Design' },

  // Specialized Integrations
  { name: 'DistroKid',              tier: 'Occasional', category: 'Distribution' },
  { name: 'Poshmark / eBay / Depop', tier: 'Occasional', category: 'Distribution' },
];

// The hero tool strip: name + Simple Icons slug (null = no real mark, name only).
// Every name here is also in `tools` above. AI tooling leads; agency tools follow.
export const toolStrip = [
  { name: 'Claude Code', slug: 'claude' },
  { name: 'Claude API', slug: 'anthropic' },
  { name: 'OpenAI API', slug: null },
  { name: 'Cloudflare Workers', slug: 'cloudflareworkers' },
  { name: 'Cloudflare D1', slug: 'cloudflare' },
  { name: 'Hono', slug: 'hono' },
  { name: 'Python', slug: 'python' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'FFmpeg', slug: 'ffmpeg' },
  { name: 'Google Apps Script', slug: 'googleappsscript' },
  { name: 'Gmail API', slug: 'gmail' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Git / GitHub', slug: 'github' },
  { name: 'Cloudflare Pages', slug: 'cloudflarepages' },
  { name: 'n8n', slug: 'n8n' },
  { name: 'GoHighLevel', slug: null },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Kajabi', slug: null },
  { name: 'ActiveCampaign', slug: null },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'ClickUp', slug: 'clickup' },
  { name: 'Google Workspace', slug: 'google' },
  { name: 'Notion', slug: 'notion' },
  { name: 'Figma', slug: 'figma' },
  { name: 'Canva', slug: null },
  { name: 'Square', slug: 'square' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Wix Studio', slug: 'wix' },
  { name: 'WordPress', slug: 'wordpress' },
];

// My own AI and automation builds. They lead the Projects section, before the
// in-house work platform and the client work. Facts only from each project's own
// README / CLAUDE.md / SETUP.md. All three are private, so there are no live links.
export const aiBuilds = [
  {
    id: 'behindworks',
    title: 'Behind Works Platform — my own outreach and job-application platform',
    tag: 'Own build · Live since Oct 2026',
    summary: 'My own platform, built with Claude Code: contacts, a pipeline board, email campaigns, and an Approvals queue where every drafted email waits for my yes before it sends. It also runs my job-application pipeline: a Gmail bridge sends the applications I approve from my own Gmail with my CV attached, then reports the first real reply back so the application moves to Replied.',
    wins: [
      'Outreach waits for my yes; strong-fit applications send after a 3-hour hold',
      'Outreach capped at 10 emails a day',
      'Approved applications send from my own Gmail; replies flow back',
      'Out-of-office replies and bounce notices are skipped',
    ],
    stack: ['Hono', 'Cloudflare Workers', 'D1', 'Resend', 'Google Apps Script', 'Built with Claude Code'],
  },
  {
    id: 'ytengine',
    title: 'AI video engine — a faceless-video pipeline on the Claude and OpenAI APIs',
    tag: 'Own build · LLM pipeline',
    summary: 'Turns a one-line topic into a finished 9:16 MP4 with burned captions, covers, and ready-to-paste captions for TikTok, YouTube Shorts and Facebook Reels. Claude writes the script and topic ideas, OpenAI makes the images and the voiceover, and FFmpeg renders it on my own PC. I drive it from Claude Code chat through a small control tool: it shows a cost estimate first and only spends after I say go. It never posts by itself.',
    wins: [
      '$0.72 real API cost for a 2-part story (script, images, voice)',
      'Retries pick up where they stopped, never paying twice for a step',
      '400+ unit tests, plus acceptance suites on a fake stand-in for the paid APIs',
      'A phone-friendly Library to watch, download and copy captions',
    ],
    stack: ['Python', 'FastAPI', 'Claude API', 'OpenAI API (images + voice)', 'FFmpeg', 'Cloudflare Tunnel', 'Built with Claude Code'],
  },
  {
    id: 'replytracker',
    title: 'Job Tracker — Gmail reply alerts in Apps Script',
    tag: 'Own build · Automation',
    summary: 'Every 10 minutes a script in my own Google account checks new Gmail for replies to my job applications. It logs each one to a Google Sheet, labels it, and sends me one alert. Emails that only look job-related are flagged as unverified, links are stripped from alerts, and a private phone-friendly page lists my jobs and replies.',
    wins: [
      'Runs every 10 minutes, even with my computer off',
      'Reads only sender, subject and preview; never deletes mail',
      'The smallest Gmail permission that allows labelling',
      'Possible scams flagged, not trusted',
    ],
    stack: ['Google Apps Script', 'Gmail API', 'Google Sheets', 'clasp', 'Built with Claude Code'],
  },
];

export const works = [
  {
    id: 'arrowplatform',
    featured: true,
    title: 'Arrow Platform — in-house email & SMS marketing platform (Arrow Group Consulting)',
    tag: 'In-house platform · built with Claude Code',
    role: 'Built for Arrow Group Consulting · 2026',
    summary: 'Wrote the business case (projected ~89% lower monthly platform cost, no external build spend), then built the agency\'s in-house email and SMS platform with AI-assisted development (Claude Code). It has an agency view plus per-client dashboards, campaigns and reporting. 6 accounts went live about 5 weeks after the first commit (Aug–Sep 2026), and it is now replacing GoHighLevel at the agency.',
    stack: ['TypeScript', 'Cloudflare Workers', 'D1', 'Queues', 'React', 'Resend (email)', 'Twilio (SMS)'],
    wins: [
      '6 accounts live about 5 weeks after the first commit',
      '3,200+ automated tests',
      'One-click unsubscribe + automatic opt-out on bounces and complaints',
      'SMS blocked until A2P 10DLC approval · test mode by default',
    ],
    // w/h = the screenshot's pixel size, so the browser reserves the space.
    gallery: [
      { src: '/work-thumbs/arrowplatform-1.png', w: 1600, h: 925, label: 'Client dashboard — the month at a glance, with a monthly report' },
      { src: '/work-thumbs/arrowplatform-2.png', w: 1600, h: 680, label: 'Campaigns — delivery, opens, clicks and unsubscribes for every send' },
    ],
    previewLine: 'Private company platform, so there is no public link. Screenshots are shown with the agency owner\'s approval.',
  },
  {
    id: 'alliance',
    title: 'Alliance Service Brands — multi-brand home services site',
    tag: 'Custom Build · Web',
    summary: 'Custom website for a Michigan home-services holding company unifying six specialized brands — construction, handyman, windows/doors, real estate, lake property management, and financing — under one clean visual system.',
    stack: ['Custom site', 'Multi-brand architecture', 'Responsive design'],
    initials: 'AS',
    liveUrl: 'https://www.allianceservicebrands.com',
    location: 'Jackson, MI',
    thumb: '/work-thumbs/alliance.png',
  },
  {
    id: 'aoutility',
    title: 'Alpha Omega Utility Services — A2P SMS + full marketing system',
    tag: 'CRM · SMS · Email · Web',
    summary: 'Got this Michigan utility contractor approved for A2P 10DLC SMS, the registration step that often blocks GoHighLevel builds. Plus the full marketing system around it: website, lifecycle email, CRM, and complete domain + sending setup.',
    stack: ['GoHighLevel', 'A2P 10DLC SMS', 'Domain setup', 'Email automation', 'Website'],
    wins: ['A2P 10DLC brand approval', 'Verified business number', 'Full domain migration'],
    initials: 'AO',
    liveUrl: 'https://www.aoutilityservices.com',
    location: 'Michigan, USA',
    thumb: '/work-thumbs/aoutility.png',
  },
  {
    id: 'endtime',
    title: 'Endtime Entrepreneurs — site, CRM, music distribution & SEO',
    tag: 'Custom Build · SEO · CRM',
    summary: 'Built the full website from scratch on Cloudflare Pages for an indie game + music studio. Configured CRM, music distribution (DistroKid), email marketing, domain setup, and ongoing technical SEO.',
    stack: ['Custom website', 'GoHighLevel', 'DistroKid', 'SEO', 'Domain setup', 'Email'],
    initials: 'EE',
    liveUrl: 'https://endtimeentrepreneurs.com',
    location: 'USA',
    thumb: '/work-thumbs/endtime.png',
  },
  {
    id: 'adas',
    title: 'Ada\'s Closet — back-office for a student consignment startup',
    tag: 'Custom Build · Ops · Integration',
    summary: 'Launch website plus the back-office for a student-run consignment business. Listings flow into Poshmark, eBay, and Depop; live inventory database the team checks anytime; instant notifications on every new sale via Google Apps Script.',
    stack: ['Custom website', 'Google Apps Script', 'Live inventory database', 'Poshmark', 'eBay', 'Depop', 'Sale notifications'],
    initials: 'AC',
    liveUrl: 'https://www.adasclosetsau.com',
    location: 'Spring Arbor, MI',
    thumb: '/work-thumbs/adas.png',
  },
  {
    id: 'homefm',
    title: 'HOME.FM — dedicated email-sending infrastructure',
    tag: 'Email · CRM · Web',
    summary: 'Built a dedicated email-sending setup for this Michigan radio station — subdomain mail.listenhome.fm, SPF/DKIM/DMARC aligned, SSL issued, warmup completed to 6,500 emails/day capacity. Plus ongoing CRM management and website updates.',
    stack: ['Dedicated sending domain', 'SPF/DKIM/DMARC', '6,500/day capacity', 'GoHighLevel', 'CRM', 'Website'],
    wins: ['Dedicated sending subdomain configured', 'Warmed to 6,500 emails/day', 'SPF/DKIM/DMARC aligned'],
    initials: 'HF',
    liveUrl: 'https://www.home.fm',
    location: 'Spring Arbor, MI',
    thumb: '/work-thumbs/homefm.png',
  },
  {
    id: 'truecare',
    title: 'TrueCare Chiropractic — email, SEO & Cloudflare migration',
    tag: 'Email · SEO · DNS',
    summary: 'Email marketing, ongoing website maintenance, and SEO for a Lansing, Michigan chiropractic and wellness clinic. Migrating the site to Cloudflare once the current registrar lock clears.',
    stack: ['Email automation', 'SEO', 'Cloudflare migration', 'DNS'],
    initials: 'TC',
    liveUrl: 'https://www.truecarechiro.com',
    location: 'Lansing, MI',
    thumb: '/work-thumbs/truecare.png',
  },
];

export const experience = [
  {
    role: 'Implementation Specialist — CRM, Web & Marketing Systems',
    company: 'Arrow Group Consulting',
    location: 'Michigan, USA',
    type: 'US outsourced-CMO agency · Part-time contract',
    dates: 'Feb 2026 — Present',
    bullets: [
      'Hired directly after the Doneverse placement. Handle 8 clients at once: build and run monthly email campaigns (plus SMS where needed) and lifecycle automations — audience segmentation, automated nurture and retention flows — and report open, click, and delivery analytics directly to the founder and clients.',
      'Configure GoHighLevel sub-accounts per client end-to-end — automations, pipelines, business profiles, dedicated sending domains, and email service connections — and manage Cloudflare DNS across the portfolio.',
      'Own email and SMS deliverability across the portfolio: dedicated sending domains, SPF/DKIM/DMARC configuration, and A2P 10DLC registration for compliant text campaigns.',
      'Technical lead for client onboarding — owning the full implementation stack (GoHighLevel configuration, custom-coded sites, domain go-lives, compliance) end-to-end across multiple accounts.',
      'Moved the agency onto GoHighLevel in Feb 2026 because 2 clients needed SMS. Then wrote the business case (projected ~89% lower monthly platform cost) and built the agency\'s in-house email/SMS platform (Cloudflare Workers + D1, React, Resend, Twilio) with AI-assisted development (Claude Code); 6 accounts went live about 5 weeks after the first commit (Aug–Sep 2026). It is now replacing GoHighLevel.',
      'Built an internal content-operations hub that brings the content team\'s work from 5 tools (Drive, ClickUp, Trello, GHL, Canva) into one app. Runs the daily content production workflow: task assignment → team submission → review → PM scheduling. Stack: React + Firebase PWA, Vercel serverless routes, GoHighLevel API. In daily production.',
      'Acted as technical advisor to clients and the founder — translating implementation and automation details into plain language during onboarding calls and answering live technical questions.',
      'Built and shipped custom-coded HTML/CSS/JS websites on Cloudflare Pages, and integrated Square payments through the Square API on a Cloudflare-hosted client site.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant (VMA)',
    company: 'Doneverse',
    location: 'Philippines',
    type: 'VMA agency — recruits, trains, and matches Virtual Marketing Assistants to US founders',
    dates: 'Sep 2025 — Feb 2026',
    bullets: [
      'Built and shipped Mailchimp and HubSpot email marketing systems for founder clients — automated onboarding sequences and nurture flows.',
      'Owned client onboarding for new platform setups, including domain configuration and email deliverability setup.',
      'Technical implementer for 2 US founders — Arrow Group Consulting\'s founder, then keynote speaker Jonathan Fanning (Kajabi) — building and configuring accounts on Wix Studio, Kajabi, Mailchimp, and HubSpot.',
      'Delivered Wix Studio sites for founder clients.',
      'At Arrow Group Consulting (then on Mailchimp), learned HubSpot on the job, then recommended HubSpot and ActiveCampaign — the agency adopted both.',
    ],
  },
];

// Earlier, pre-career experience — shown as one small note under the
// experience cards (not a full role card: it is a working-student job).
export const earlierExperience = {
  label: 'Earlier · working student (2024 to 2025, during college)',
  body: 'Social media for ADAP Real Estate, Subic — created listing graphics and posted property listings.',
};
