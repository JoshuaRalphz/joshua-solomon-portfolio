// Centralized content so it's easy to edit without touching JSX.
//
// This portfolio is positioned as a HIRING portfolio (full-time remote,
// contract, retainer roles). Pricing, retainer tiers, and "my team produces"
// references were removed intentionally — Joshua handles freelance offers via
// a separate company brand, not this site.

export const profile = {
  name: 'Joshua Solomon',
  role: 'Marketing Automation & Lifecycle Specialist — CRM, Email & SMS Systems',
  subtitle: 'Lifecycle Email · SMS · GoHighLevel · Deliverability · Automation',
  location: 'Olongapo City, PH · Remote (US Eastern preferred; PH, AU or European hours also work)',
  available: 'Available for full-time work · can start within 1-2 weeks of an offer',
  email: 'solomonjoshua101602@gmail.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  facebook: 'https://www.facebook.com/lionheart016',
};

export const stats = [
  { value: '1 yr', label: 'Remote work for US clients · agency + contract' },
  { value: '2x', label: 'Nonprofit email click rate · 4.5% → 9.5% (Apr–May 2026)' },
  { value: '24h', label: 'Reply time · async-first' },
];

// Web3Forms access key for the portfolio contact form.
// Forwards form submissions directly to solomonjoshua101602@gmail.com.
// Generated at web3forms.com — replaces the previous GHL WF-PORTFOLIO webhook.
export const WEB3FORMS_ACCESS_KEY = 'babb1c1a-29c2-466a-a459-aab61c331600';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Strengths shown on the Home page — candidate-facing, employee-positioned.
export const benefits = [
  {
    icon: 'Layers',
    title: 'Lifecycle systems, end to end.',
    body: 'Audience segmentation, automated nurture and retention flows, multi-touch sequences, A/B testing, and the deliverability that gets them to the inbox. I build the whole lifecycle, not just one email.',
  },
  {
    icon: 'Mail',
    title: 'Email + SMS that actually lands.',
    body: 'I own deliverability: dedicated sending domains, SPF/DKIM/DMARC alignment, warmup, and A2P 10DLC registration for compliant text campaigns. Then I report open, click, and delivery analytics back to stakeholders.',
  },
  {
    icon: 'Wrench',
    title: 'Comfortable across the stack.',
    body: 'GoHighLevel, HubSpot, Mailchimp, Kajabi, ActiveCampaign, n8n, Google Apps Script, Claude API, plus custom React + Vite when a build calls for it. I pick up whatever your team already uses.',
  },
  {
    icon: 'UserCheck',
    title: 'Founder-friendly communication.',
    body: 'I translate automation and implementation details into plain English on calls and in writing. Comfortable speaking directly to founders, senior stakeholders, and end clients.',
  },
  {
    icon: 'Shield',
    title: 'Async-first, flexible hours.',
    body: 'Olongapo, Philippines — US Eastern hours preferred; PH, AU or European hours also work. Work setup: laptop, two internet providers (one as backup), and a UPS for the internet router. Strong written communication for distributed teams.',
  },
  {
    icon: 'TrendingUp',
    title: 'I build the systems I work in.',
    body: 'Recently built AGC HUB — a custom internal platform (React + Firebase PWA with Vercel serverless routes and the GoHighLevel API) that brings a US consultancy\'s 5 scattered tools into one app. In daily production. Also built the agency\'s in-house email/SMS platform (Cloudflare Workers + D1), which is now replacing GoHighLevel.',
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
    outcome: 'Lifecycle programs that nurture, retain, and re-engage on autopilot.',
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
    summary: 'Hand-coded HTML/CSS/JS sites on Cloudflare Pages, plus React + Vite + Firebase internal tools. Recently built AGC HUB — a custom platform unifying a US agency\'s scattered tool stack. In daily production.',
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

export const works = [
  {
    id: 'agchub',
    featured: true,
    title: 'AGC HUB — internal agency PWA (Arrow Group Consulting)',
    tag: '★ Featured · Internal Tool',
    summary: 'Custom React + Firebase PWA with Vercel serverless routes and the GoHighLevel API. Brings the content team\'s work from 5 tools (Drive, ClickUp, Trello, GHL, Canva) into one app that runs its daily workflow: task assignment → team submission → review → PM scheduling. In daily production.',
    stack: ['React', 'Vite', 'Tailwind', 'Firebase Auth', 'Firestore', 'Vercel serverless', 'GoHighLevel API', 'Claude API'],
    wins: [
      'Brought 5 tools into one internal app',
      'GHL campaign stats + bounce / spam / unsubscribe counts via webhook',
      'Claude features via serverless routes — subject lines, revision suggestions, help chat',
      'PWA architecture — installable, offline-aware',
    ],
    gallery: [
      { src: '/work-thumbs/agchub-1.png', label: 'Team dashboard — live view of everything in motion' },
      { src: '/work-thumbs/agchub-2.png', label: 'Schedule board — newsletter + social calendar' },
      { src: '/work-thumbs/agchub-3.png', label: 'Client reports — website + email analytics' },
    ],
    previewLine: 'Internal company tool — these are real screenshots from the live app. Full walkthrough available on request; happy to demo it in an interview.',
  },
  {
    id: 'jobcopilot',
    title: 'Job Co-Pilot — AI job-application tool (personal project)',
    tag: 'Personal Project · AI · React · Claude API',
    summary: 'Built a full AI-powered job-application assistant from scratch. Paste any job posting, get an instant fit score, a tailored cover letter drafted in your voice, answers to screening questions, and an interview-prep packet — in seconds. Runs on your own Anthropic API key so there are no usage limits or subscription fees.',
    stack: ['React', 'Vite', 'Anthropic Claude API', 'Cloudflare Pages', 'Tailwind CSS'],
    wins: [
      'AI fit scoring + tailored draft generation per posting',
      'Screening question answering in one pass',
      'Interview-prep packet output',
      'Zero subscription model — API key pass-through',
    ],
    initials: 'JC',
    location: 'Local build — demo on request',
    thumb: '/work-thumbs/jobcopilot.png',
  },
  {
    id: 'bishop',
    title: 'Bishop Roofing & Exteriors — full marketing system (demo build)',
    tag: 'Demo · Web · CRM · Automation',
    summary: 'Fictional Texas roofing client, real working build. 6-page custom-coded site, GoHighLevel CRM with two workflows, A2P-compliant SMS and a dedicated email sending domain. Built end-to-end as a portfolio demonstration of the full stack I work in — walkthrough on request.',
    stack: ['HTML', 'CSS', 'JS', 'GoHighLevel', 'Cloudflare Pages', 'Cloudflare DNS', 'Dedicated sending domain', 'GitHub auto-deploy'],
    wins: ['6-page custom-coded site', 'Two GHL workflows (WF1 + WF3)', 'A2P-compliant SMS', '12-page lead-magnet PDF'],
    initials: 'BR',
    location: 'Demo build · Texas',
    thumb: '/work-thumbs/bishop.png',
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
    summary: 'Got this Michigan utility contractor approved for A2P 10DLC SMS (a federal compliance process most agencies avoid — it\'s often a blocker for GHL builds). Plus the full marketing system around it: website, lifecycle email, CRM, and complete domain + sending setup.',
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
      'Built AGC HUB — a custom internal platform that brings the content team\'s work from 5 tools (Drive, ClickUp, Trello, GHL, Canva) into one app. Runs the daily content production workflow: task assignment → team submission → review → PM scheduling. Stack: React + Firebase PWA, Vercel serverless routes, GoHighLevel API. In daily production.',
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

// Mirrors the "Technical Skills" block in the PDF resume
export const coreExpertise = [
  {
    label: 'Email & Lifecycle Marketing',
    items: 'Campaign builds, audience segmentation, automated nurture & retention flows, multi-touch sequences, A/B testing, pre-send QA, analytics reporting',
  },
  {
    label: 'CRM & Marketing Platforms',
    items: 'GoHighLevel (GHL — workflows, tags & custom fields, website/funnel builder), HubSpot, Mailchimp, Kajabi, ActiveCampaign',
  },
  {
    label: 'Automation & Integrations',
    items: 'n8n, Google Apps Script, webhooks, GHL API, Google Sheets API, Square API, Anthropic Claude API',
  },
  {
    label: 'Deliverability & Compliance',
    items: 'A2P 10DLC SMS registration, dedicated sending domains, SPF/DKIM/DMARC',
  },
  {
    label: 'Web & Hosting',
    items: 'HTML5, CSS3, JavaScript, React, Vite, Tailwind CSS, Wix Studio + Velo, WordPress; Cloudflare Pages/DNS, Vercel, Firebase, GitHub Actions',
  },
  {
    label: 'Languages',
    items: 'English (professional working proficiency), Filipino (native)',
  },
];
