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
  shortRole: 'Marketing Automation & Lifecycle Specialist',
  shortLocation: 'Olongapo City, PH · Remote',
  status: 'Available for full-time work',
  resumeUrl: '/Joshua_Solomon_Resume_v7.pdf',
  // No photo yet: the avatar renders a monogram until this is set to an image path.
  photo: null,
  bio: 'Marketing automation specialist with hands-on agency experience building and running lifecycle email and SMS systems on GoHighLevel, Mailchimp, HubSpot, and Kajabi: audience segmentation, automated nurture and retention flows, A2P 10DLC SMS, and deliverability, plus the custom-coded sites and integrations behind them. Open to full-time remote, contract, or fractional roles.',
  loom: {
    shareUrl: 'https://www.loom.com/share/4b6619181760484796d88a5fc52827f1',
    embedUrl: 'https://www.loom.com/embed/4b6619181760484796d88a5fc52827f1',
  },
};

// Monogram for the avatar and the video poster.
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
  headline: 'I build email and SMS systems that get delivered.',
  promise: 'I set up GoHighLevel and run lifecycle email and SMS for a US agency and its clients: segmentation, nurture flows, and the sending-domain and A2P 10DLC work that gets messages delivered.',
};

export const stats = [
  { value: '8', label: 'Clients handled at once at a US agency' },
  { value: '~1 yr', label: 'Remote work for US clients, since Sep 2025' },
  { value: '24h', label: 'Reply time · US Eastern hours preferred' },
];

// The hero "how a campaign moves" tile. It describes a process, it is not live data.
export const flow = [
  { label: 'Segment', caption: 'Split the audience by tags and fields' },
  { label: 'Build', caption: 'Emails, texts and the nurture flow' },
  { label: 'Deliver', caption: 'SPF, DKIM, DMARC and A2P in place' },
  { label: 'Report', caption: 'Opens, clicks and delivery, back to you' },
];

// Numbers only, each with where it came from. The projected ~89% cost figure is
// deliberately NOT a result: it stays inside the Arrow Platform summary, worded "projected".
// The lead result compares two months' average click rates (3 campaigns in April,
// 11 in May). It is not a before/after test, so the bars are labelled by month.
export const results = [
  { lead: true, value: '2x', title: 'Nonprofit average email click rate', note: '4.5% to 9.5% (Apr–May 2026)', before: 4.5, after: 9.5, beforeLabel: 'April 2026', afterLabel: 'May 2026' },
  { value: '6,500', unit: '/day', title: 'Sending capacity after warmup', note: 'Dedicated sending subdomain, SPF/DKIM/DMARC aligned · HOME.FM', workId: 'homefm' },
  { value: 'A2P 10DLC', title: 'SMS brand approval', note: 'Approved, with a verified business number · Alpha Omega Utility Services', workId: 'aoutility' },
  { value: '6', unit: 'accounts', title: 'Live about 5 weeks after the first commit', note: 'Aug–Sep 2026 · Arrow Platform', workId: 'arrowplatform' },
  { value: '3,200+', title: 'Automated tests', note: 'Arrow Platform', workId: 'arrowplatform' },
];

// The five Explore cards. The 01 title is computed from works in ExploreCards.jsx.
export const explore = [
  { num: '01', id: 'work', label: 'PROJECTS', title: null, line: 'An in-house email and SMS platform I built, and client work shown with permission.' },
  { num: '02', id: 'results', label: 'RESULTS', title: '2x', line: 'Nonprofit average email click rate, 4.5% to 9.5% (Apr–May 2026). More numbers inside.' },
  { num: '03', id: 'capabilities', label: 'SERVICES', title: 'Five things I can own', line: 'Lifecycle email, CRM, deliverability, automation, custom sites.' },
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
    title: 'Lifecycle systems, end to end.',
    body: 'Audience segmentation, automated nurture and retention flows, multi-touch sequences, A/B testing, and the deliverability that gets them to the inbox. I build the whole lifecycle, not just one email.',
  },
  {
    title: 'Email + SMS that actually lands.',
    body: 'I own deliverability: dedicated sending domains, SPF/DKIM/DMARC alignment, warmup, and A2P 10DLC registration for compliant text campaigns. Then I report open, click, and delivery analytics back to stakeholders.',
  },
  {
    title: 'Comfortable across the stack.',
    body: 'GoHighLevel, HubSpot, Mailchimp, Kajabi, ActiveCampaign, n8n, Google Apps Script, Claude API, plus custom React + Vite when a build calls for it. I pick up whatever your team already uses.',
  },
  {
    title: 'Founder-friendly communication.',
    body: 'I translate automation and implementation details into plain English on calls and in writing. Comfortable speaking directly to founders, senior stakeholders, and end clients.',
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
// Ordered to lead with lifecycle/email — matches the resume's positioning.
export const services = [
  {
    id: 'email-lifecycle',
    title: 'Email & Lifecycle Marketing',
    summary: 'End-to-end lifecycle programs on GoHighLevel, Mailchimp, HubSpot, and Kajabi — audience segmentation, automated nurture and retention flows, multi-touch sequences, A/B testing, and analytics reporting back to stakeholders.',
    bullets: [
      'Campaign builds — newsletters, promos, onboarding sequences',
      'Audience segmentation + list hygiene',
      'Automated nurture & retention flows',
      'Multi-touch drip sequences',
      'A/B split tests on subject lines and content',
      'Open / click / delivery analytics reporting',
    ],
    outcome: 'Lifecycle programs that nurture, retain, and re-engage automatically.',
  },
  {
    id: 'crm',
    title: 'CRM Configuration & Automation',
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
  {
    id: 'deliverability',
    title: 'Deliverability & Compliance',
    summary: 'Dedicated sending domains with SPF/DKIM/DMARC properly aligned, warmup to high-volume capacity, and A2P 10DLC SMS registration so email and text campaigns actually reach the inbox — legally.',
    bullets: [
      'Dedicated sending subdomains configured end-to-end',
      'SPF / DKIM / DMARC alignment + SSL',
      'Email warmup to 6,500/day sending capacity',
      'A2P 10DLC SMS registration + brand approval',
      'Pre-send QA — test sends, link + unsubscribe checks, phone preview',
    ],
    outcome: 'Email and SMS that land in the inbox, not spam — and stay compliant.',
  },
  {
    id: 'automation',
    title: 'Workflow Automation & AI',
    summary: 'Google Apps Script and webhook/API integrations connecting your stack, plus an n8n lead-generation workflow I designed. Anthropic Claude API wired into outreach personalization and content drafting.',
    bullets: [
      'n8n — designed a 47-node lead-generation workflow (personal project)',
      'Google Apps Script automations',
      'Anthropic Claude API for personalized drafting + extraction',
      'GoHighLevel API + Google Sheets API integrations',
      'Error handling + fallbacks + human review before anything sends',
      'Multi-provider email enrichment (Hunter → Snov → Apollo)',
    ],
    outcome: 'Repetitive work automated, with human review before anything sends.',
  },
  {
    id: 'web-tools',
    title: 'Custom Sites & Internal Tools',
    summary: 'Hand-coded HTML/CSS/JS sites on Cloudflare Pages, plus React + Vite + Firebase internal tools. Recently built an internal content-operations hub unifying a US agency\'s scattered tool stack. In daily production.',
    bullets: [
      'Custom-coded sites on Cloudflare Pages',
      'React + Vite + Tailwind for app-style tools and portfolios',
      'Wix Studio + Velo extensions for client self-edit access',
      'WordPress when full editing freedom is the priority',
      'Firebase + GitHub Actions CI/CD + auto-deploy',
      'PWA architecture — installable, offline-aware, mobile-first',
      'Square API payments on a Cloudflare-hosted client site',
    ],
    outcome: 'Fast sites and internal tools the team owns forever.',
  },
];

// The site lists these grouped by `category`. `tier` (how often each is used) is
// kept here for reference only and is NOT shown: no CV states a usage frequency,
// so show it again only once Joshua confirms each tier.
export const tools = [
  // CRM & Marketing Platforms
  { name: 'GoHighLevel', tier: 'Daily', category: 'CRM' },
  // HubSpot, Mailchimp, Kajabi: used at Doneverse (Sep 2025 – Feb 2026), not daily now
  { name: 'HubSpot',     tier: 'Occasional', category: 'CRM' },
  { name: 'Mailchimp',   tier: 'Occasional', category: 'CRM' },
  { name: 'Kajabi',      tier: 'Occasional', category: 'CRM' },
  { name: 'ActiveCampaign', tier: 'Occasional', category: 'CRM' },

  // Automation — n8n: one personal 47-node workflow (designed; deployment not confirmed)
  { name: 'n8n',         tier: 'Occasional', category: 'Automation' },

  // AI & LLM
  { name: 'Claude API',  tier: 'Weekly', category: 'AI' },
  { name: 'OpenAI API',  tier: 'Weekly', category: 'AI' },

  // SMS & Compliance
  { name: 'GHL A2P 10DLC',  tier: 'Occasional', category: 'SMS' },
  { name: 'SMS Automation', tier: 'Weekly', category: 'SMS' },

  // Hosting & DevOps
  { name: 'Cloudflare Pages', tier: 'Daily', category: 'Hosting' },
  { name: 'Cloudflare DNS',   tier: 'Daily', category: 'Hosting' },
  { name: 'Vercel',           tier: 'Weekly', category: 'Hosting' },
  { name: 'Firebase',         tier: 'Weekly', category: 'Hosting' },
  { name: 'GitHub Actions',   tier: 'Weekly', category: 'Hosting' },

  // Code
  { name: 'HTML/CSS/JS',         tier: 'Daily',  category: 'Code' },
  { name: 'React',               tier: 'Weekly', category: 'Code' },
  { name: 'Vite',                tier: 'Weekly', category: 'Code' },
  { name: 'Tailwind CSS',        tier: 'Daily',  category: 'Code' },
  { name: 'Git / GitHub',        tier: 'Daily',  category: 'Code' },
  { name: 'Google Apps Script',  tier: 'Weekly', category: 'Code' },

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

  // Email & Deliverability
  { name: 'SPF/DKIM/DMARC', tier: 'Weekly', category: 'Email' },

  // Design
  { name: 'Figma', tier: 'Weekly', category: 'Design' },
  { name: 'Canva', tier: 'Weekly', category: 'Design' },

  // Specialized Integrations
  { name: 'DistroKid',              tier: 'Occasional', category: 'Distribution' },
  { name: 'Poshmark / eBay / Depop', tier: 'Occasional', category: 'Distribution' },
];

// The hero tool strip: name + Simple Icons slug (null = no real mark, name only).
// Every name here is also in `tools` above.
export const toolStrip = [
  { name: 'GoHighLevel', slug: null },
  { name: 'Cloudflare Pages', slug: 'cloudflare' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Kajabi', slug: null },
  { name: 'ActiveCampaign', slug: null },
  { name: 'n8n', slug: 'n8n' },
  { name: 'Claude API', slug: 'anthropic' },
  { name: 'OpenAI API', slug: null },
  { name: 'Google Apps Script', slug: 'googleappsscript' },
  { name: 'React', slug: 'react' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'Git / GitHub', slug: 'github' },
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

export const works = [
  {
    id: 'arrowplatform',
    featured: true,
    title: 'Arrow Platform — in-house email & SMS marketing platform (Arrow Group Consulting)',
    tag: 'Featured · In-house platform',
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
