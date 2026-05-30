// Centralized content so it's easy to edit without touching JSX.
//
// This portfolio is positioned as a HIRING portfolio (full-time remote,
// contract, retainer roles). Pricing, retainer tiers, and "my team produces"
// references were removed intentionally — Joshua handles freelance offers via
// a separate company brand, not this site.

export const profile = {
  name: 'Joshua Solomon',
  role: 'Implementation Specialist — CRM, Web & Marketing Systems',
  subtitle: 'GoHighLevel · Cloudflare · Email Automation · AI Workflows',
  location: 'Olongapo City, PH · Open to remote (US business hours)',
  available: 'Open to full-time remote, contract & fractional roles',
  email: 'solomonjoshua101602@gmail.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  facebook: 'https://www.facebook.com/lionheart016',
  bishopUrl: 'https://bishoproofing.company',
};

export const stats = [
  { value: '3+', label: 'Years building marketing systems professionally' },
  { value: '14d', label: 'Average project turnaround · kickoff to launch' },
  { value: '24h', label: 'Reply time · async-first · US business hours' },
];

// GHL Inbound Webhook for the portfolio contact form.
// Trigger lives in WF-PORTFOLIO workflow (sub-account: Joshua Solomon).
export const PORTFOLIO_GHL_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/n3Mhd91c4sG1CNdf5zdN/webhook-trigger/c93afe4a-d360-4235-9be8-55771da5e86f';

// Strengths shown on the Home page — candidate-facing, employee-positioned.
export const benefits = [
  {
    icon: 'Layers',
    title: 'End-to-end implementation, not just one slice.',
    body: 'I configure the CRM, build the site, set up the email infrastructure, wire the integrations, and ship the automations. One person owning the stack means fewer handoffs and faster launches.',
  },
  {
    icon: 'Zap',
    title: 'Ship in days, not quarters.',
    body: 'Average kickoff-to-launch is 14 days. I work async with shared checklists and Loom walkthroughs — no week-long status meetings, no padded timelines.',
  },
  {
    icon: 'Wrench',
    title: 'Comfortable across the stack.',
    body: 'GoHighLevel, HubSpot, Mailchimp, Kajabi, custom-coded React + Vite, Wix Velo, n8n, Make, Zapier, Claude/OpenAI APIs, A2P 10DLC compliance — I pick up new tools quickly and ship in whatever your team uses.',
  },
  {
    icon: 'UserCheck',
    title: 'Founder-friendly communication.',
    body: 'I translate implementation details into plain English on calls and in writing. Comfortable speaking directly to founders, senior stakeholders, and end clients.',
  },
  {
    icon: 'Shield',
    title: 'Async-first, US-hours overlap.',
    body: 'Olongapo, Philippines — I work US business hours and overlap EST/CST/MST/PST every workday. Strong written communication for distributed teams.',
  },
  {
    icon: 'TrendingUp',
    title: 'I build the systems I work in.',
    body: 'Recently built AGC HUB — a custom PWA (React + Vite + Firebase + GHL/Canva/Google Sheets APIs) replacing a scattered tool stack for a US consultancy. In daily production.',
  },
];

// Vite auto-imports every graphic in src/assets/samples/graphics/.
// Drop a file in that folder → it shows up here at build time. Sorted with
// natural numeric ordering, so 1.jpg comes before 2.jpg comes before 10.jpg.
const graphicsModules = import.meta.glob(
  '../assets/samples/graphics/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);

const autoGraphics = Object.entries(graphicsModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const filename = path.split('/').pop();
    return { src, alt: `Graphic sample — ${filename}` };
  });

// Content samples shown on the Services page.
// Disclosure copy: these are real agency deliverables — Joshua planned and
// QC'd; the creative production team executed under his approval.
export const contentSamples = {
  disclosure:
    'Selected deliverables shipped under Arrow Group Consulting (Michigan, USA) — campaigns I planned, scoped, and quality-checked end-to-end. Shown with permission.',
  graphics: autoGraphics,
  videos: [
    // Long-form / 16:9 — promotional videos, logo animations, event recaps
    { id: '54eYZKVqTK4', label: 'Promotional app video', vertical: false },
    { id: 'NHhRFoTk1rE', label: 'Promotional event video', vertical: false },
    { id: 'VKBRePCRE6w', label: 'Logo animation · ADAP', vertical: false },
    { id: 'Ax-o06kIDSI', label: 'Logo animation · Shotoboy', vertical: false },
    // Short-form / 9:16 — reels for IG, TikTok, YouTube Shorts
    { id: 'IwHT1dxwr70', label: 'Short-form reel', vertical: true },
    { id: 'n9sJrxJx0Zk', label: 'Street team taco review · Michigan', vertical: true },
    { id: 'FI5a3G5bY6s', label: 'Dr. Wine promo reel', vertical: true },
  ],
};

// Capabilities — what I deliver. No pricing, no tier framing.
export const services = [
  {
    id: 'crm',
    title: 'CRM Configuration & Lifecycle Automation',
    summary: 'GoHighLevel, HubSpot, and Mailchimp builds tied to real sales processes. Pipelines, automations, lead routing, lifecycle email + SMS sequences, calendar booking, and A2P 10DLC compliance.',
    bullets: [
      'GoHighLevel full builds — pipelines, automations, sub-account configuration',
      'A2P 10DLC SMS brand approval (the GHL setup most builders avoid)',
      'HubSpot + Mailchimp lifecycle email automation',
      'Lead routing + multi-step nurture sequences',
      'Calendar booking flows synced to client calendars',
      'GHL-Gmail-Zapier glue across founder workflows',
    ],
    outcome: 'Every lead routed, every follow-up automated, every conversation logged.',
  },
  {
    id: 'website',
    title: 'Custom-Coded & Platform Websites',
    summary: 'Hand-coded HTML/CSS/JS sites on Cloudflare Pages for performance-critical builds. Wix Studio, Wix Velo, WordPress, Squarespace, or GoHighLevel sites where client self-edit matters.',
    bullets: [
      'Custom-coded sites on Cloudflare Pages — sub-second loads, full SEO health',
      'React + Vite + Tailwind for app-style portfolios and internal tools',
      'Wix Studio + Velo extensions for client-editable production sites',
      'WordPress, Squarespace, GHL sites + funnels when self-edit is the priority',
      'Mobile-first responsive design, technical SEO baked in',
      'Cloudflare DNS + domain go-lives + GHL domain connect',
    ],
    outcome: 'Fast, indexable sites that ship in 14 days and run for years.',
  },
  {
    id: 'email-infra',
    title: 'Email Infrastructure & Deliverability',
    summary: 'Dedicated sending subdomains with SPF/DKIM/DMARC properly aligned, warmup to high-volume capacity, transactional + marketing flows in Mailgun, GHL Email, Mailchimp, and HubSpot.',
    bullets: [
      'Dedicated sending subdomains configured end-to-end (SPF/DKIM/DMARC)',
      'Email warmup to 6,500+/day verified inbox capacity',
      'Mailgun, GHL Email, HubSpot, Mailchimp integration',
      'Transactional flows — invoicing, billing reminders, lifecycle triggers',
      'Newsletter cadence + drip sequences with measurable open/click rates',
      'Inbox delivery diagnostics + warmup recovery for damaged domains',
    ],
    outcome: 'Emails land in inboxes, not spam — and stay there.',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation & AI Integration',
    summary: 'n8n, Make, and Zapier builds. Anthropic Claude + OpenAI APIs wired into outreach personalization, content drafting, and lead scoring. Self-hostable or cloud — whichever the team prefers.',
    bullets: [
      'n8n self-hosted on DigitalOcean — full control, no per-task billing',
      'Make.com + Zapier for connector-heavy SaaS workflows',
      'Anthropic Claude API for personalized outreach drafting + scoring',
      'OpenAI API for content generation + structured data extraction',
      'GHL API + Canva API + Google Sheets API integrations',
      'Error handling + Slack alerts + Loom-documented hand-off',
    ],
    outcome: 'Repetitive work automated end-to-end — measurable hours back per week.',
  },
  {
    id: 'internal-tools',
    title: 'Internal Tools & PWAs',
    summary: 'React + Vite + Firebase PWAs replacing scattered tool stacks. Recently built AGC HUB — a custom internal platform unifying Drive, ClickUp, Trello, GHL, and Canva for a US agency. In daily production.',
    bullets: [
      'React + Vite + Firebase + Tailwind stack',
      'Multi-API orchestration (GHL, Canva, Google Sheets, Slack)',
      'Role-based access + Firebase Auth integration',
      'PWA architecture — installable, offline-aware, mobile-first',
      'GitHub Actions CI/CD + Cloudflare Pages or Firebase Hosting deploys',
      'Used to replace scattered SaaS stacks costing $200+/mo combined',
    ],
    outcome: 'One platform replacing five — owned by the team forever.',
  },
];

// Scope boundaries — clarity about role fit (positive framing only).
export const focus = [
  'Marketing technology implementation roles',
  'Technical client onboarding + solutions architecture',
  'Full-stack systems work for early-stage and SMB companies',
  'CRM administration + lifecycle automation roles',
  'Email marketing + deliverability operations',
  'Internal tooling + back-office automation builds',
];

export const tools = [
  // CRM & Marketing Platforms
  { name: 'GoHighLevel', tier: 'Daily', category: 'CRM' },
  { name: 'HubSpot',     tier: 'Daily', category: 'CRM' },
  { name: 'Mailchimp',   tier: 'Weekly', category: 'CRM' },
  { name: 'Kajabi',      tier: 'Weekly', category: 'CRM' },
  { name: 'ActiveCampaign', tier: 'Occasional', category: 'CRM' },

  // Automation
  { name: 'Zapier',      tier: 'Daily',  category: 'Automation' },
  { name: 'n8n',         tier: 'Weekly', category: 'Automation' },
  { name: 'Make.com',    tier: 'Weekly', category: 'Automation' },

  // AI & LLM
  { name: 'Claude API',  tier: 'Weekly', category: 'AI' },
  { name: 'OpenAI API',  tier: 'Weekly', category: 'AI' },
  { name: 'GHL Conversation AI', tier: 'Occasional', category: 'AI' },

  // SMS & Compliance
  { name: 'GHL A2P 10DLC',  tier: 'Daily',  category: 'SMS' },
  { name: 'SMS Automation', tier: 'Weekly', category: 'SMS' },

  // Hosting & DevOps
  { name: 'Cloudflare Pages', tier: 'Daily', category: 'Hosting' },
  { name: 'Cloudflare DNS',   tier: 'Daily', category: 'Hosting' },
  { name: 'Vercel',           tier: 'Weekly', category: 'Hosting' },
  { name: 'Firebase',         tier: 'Weekly', category: 'Hosting' },
  { name: 'GitHub Actions',   tier: 'Weekly', category: 'Hosting' },
  { name: 'GitHub Pages',     tier: 'Occasional', category: 'Hosting' },

  // Code
  { name: 'HTML/CSS/JS',         tier: 'Daily',  category: 'Code' },
  { name: 'React',               tier: 'Weekly', category: 'Code' },
  { name: 'Vite',                tier: 'Weekly', category: 'Code' },
  { name: 'Tailwind CSS',        tier: 'Daily',  category: 'Code' },
  { name: 'Git / GitHub',        tier: 'Daily',  category: 'Code' },
  { name: 'Google Apps Script',  tier: 'Weekly', category: 'Code' },

  // SEO
  { name: 'On-page SEO',           tier: 'Daily',  category: 'SEO' },
  { name: 'Technical SEO',         tier: 'Weekly', category: 'SEO' },
  { name: 'Google Search Console', tier: 'Weekly', category: 'SEO' },

  // CMS / Site Builders
  { name: 'Wix Studio',    tier: 'Weekly', category: 'CMS' },
  { name: 'Wix Velo',      tier: 'Weekly', category: 'CMS' },
  { name: 'WordPress',     tier: 'Weekly', category: 'CMS' },
  { name: 'Squarespace',   tier: 'Occasional', category: 'CMS' },

  // Ops & Project Management
  { name: 'ClickUp',          tier: 'Daily',  category: 'Ops' },
  { name: 'Google Workspace', tier: 'Daily',  category: 'Ops' },
  { name: 'Notion',           tier: 'Weekly', category: 'Ops' },

  // Payments
  { name: 'Square',        tier: 'Weekly', category: 'Payments' },
  { name: 'Stripe',        tier: 'Weekly', category: 'Payments' },
  { name: 'PayPal',        tier: 'Occasional', category: 'Payments' },

  // Email & Deliverability
  { name: 'Mailgun',        tier: 'Weekly', category: 'Email' },
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
    summary: 'Custom React + Vite + Firebase PWA unifying the agency\'s scattered tools (Drive, ClickUp, Trello, GHL, Canva) into one platform. Runs the end-to-end content production workflow: task assignment → team submission → review via GHL + Canva APIs → PM scheduling. In daily production. Replaces ~$200/mo of overlapping SaaS subscriptions.',
    stack: ['React', 'Vite', 'Tailwind', 'Firebase Auth', 'Firestore', 'GHL API', 'Canva API', 'Google Sheets API', 'Cloudflare Pages'],
    wins: [
      'Replaced 5+ tools with one internal platform',
      'Multi-API orchestration (GHL + Canva + Sheets)',
      'PWA architecture — installable, offline-aware',
      'GitHub Actions CI/CD + auto-deploy',
    ],
    previewLine: 'Not publicly accessible (internal company tool). Walkthrough available on request — happy to demo live in an interview.',
  },
  {
    id: 'bishop',
    title: 'Bishop Roofing & Exteriors — full marketing system (demo build)',
    tag: 'Demo · Web · CRM · Automation',
    summary: 'Fictional Texas roofing client, real working build. 6-page custom-coded site, GoHighLevel CRM with two live workflows, A2P-compliant SMS, dedicated email sending domain, plus an interactive in-browser GHL backend demo — submit a form and watch the workflow fire in real-time. Built end-to-end as a portfolio demonstration of the full stack I work in.',
    stack: ['HTML', 'CSS', 'JS', 'GoHighLevel', 'Cloudflare Pages', 'Cloudflare DNS', 'Mailgun', 'GitHub auto-deploy'],
    wins: ['Interactive in-browser GHL backend demo', '6-page custom-coded site', 'Two live workflows (WF1 + WF3)', '12-page lead-magnet PDF'],
    initials: 'BR',
    liveUrl: 'https://bishoproofing.company',
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
    wins: ['Dedicated sending subdomain configured', '6,500 emails/day verified capacity', 'Inbox delivery proven'],
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
    type: 'Part-time ongoing contract',
    dates: 'Feb 2026 — Present',
    bullets: [
      'Technical lead for client onboarding — owning the full implementation stack (GoHighLevel configuration, custom-coded sites, domain go-lives, A2P 10DLC compliance) end-to-end across multiple accounts.',
      'Built and shipped custom-coded HTML/CSS/JS websites deployed on Cloudflare Pages, plus Wix Velo extensions for platforms requiring client self-edit access.',
      'Configured GoHighLevel sub-accounts per client — automations, business profiles, dedicated sending domains, email service connections — and managed Cloudflare DNS across the portfolio.',
      'Built AGC HUB — a custom internal PWA unifying the agency\'s scattered tools (Drive, ClickUp, Trello, GHL, Canva) into one platform. Runs the end-to-end content production workflow: task assignment → team submission → review via GHL + Canva APIs → PM scheduling. Stack: React + Vite + Firebase + GHL/Canva/Google Sheets APIs. In daily production.',
      'Designed and shipped monthly email marketing campaigns and lifecycle automations; reported analytics from email and SMS blasts directly to founder and clients.',
      'Acted as the technical advisor to both clients and the founder — translating implementation details into plain language during onboarding calls and answering live technical questions.',
      'Coordinated with the project manager and social media manager to keep onboarding timelines on track; handled invoicing and back-office workflows.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant',
    company: 'Doneverse',
    location: 'Philippines',
    type: 'VMA agency — recruits, trains, and matches Virtual Marketing Assistants to US founders',
    dates: 'Sep 2025 — Feb 2026',
    bullets: [
      'Primary technical implementer across the agency — built and configured client accounts on Wix Studio, Kajabi, Mailchimp, and HubSpot.',
      'Delivered Wix Studio sites with integrated Square payment processing for client checkout and intake flows.',
      'Configured Kajabi course platforms and shipped Mailchimp/HubSpot email marketing systems for SMB clients.',
      'Ran LinkedIn outreach campaigns on behalf of clients — connection note writing, multi-touch follow-up sequences, lead nurturing through to booked discovery calls.',
      'Owned client onboarding for new platform setups, including domain configuration and email deliverability setup.',
    ],
  },
];

// Mirrors the "Core Expertise" block in the PDF resume
export const coreExpertise = [
  {
    label: 'CRM & Marketing Platforms',
    items: 'GoHighLevel (GHL), HubSpot, Mailchimp, Kajabi, ActiveCampaign',
  },
  {
    label: 'Web Development',
    items: 'HTML5, CSS3, JavaScript, React, Vite, Tailwind CSS, Wix Studio + Velo, WordPress, Squarespace',
  },
  {
    label: 'Hosting & DevOps',
    items: 'Cloudflare Pages, Cloudflare DNS, Vercel, Firebase, GitHub Actions',
  },
  {
    label: 'Workflow Automation',
    items: 'n8n, Make.com, Zapier, Anthropic Claude API, Google Sheets API, Canva API, GHL API',
  },
  {
    label: 'Compliance & Integrations',
    items: 'A2P 10DLC SMS registration, Square Payment integration, dedicated sending domain configuration (SPF/DKIM/DMARC)',
  },
  {
    label: 'Languages',
    items: 'English (professional working proficiency), Filipino (native)',
  },
];
