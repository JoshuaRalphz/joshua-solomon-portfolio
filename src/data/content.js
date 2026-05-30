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
    body: 'GoHighLevel, HubSpot, Mailchimp, Kajabi, ActiveCampaign, n8n, Make, Zapier, Claude API, plus custom React + Vite when a build calls for it. I ship in whatever your team already uses.',
  },
  {
    icon: 'UserCheck',
    title: 'Founder-friendly communication.',
    body: 'I translate automation and implementation details into plain English on calls and in writing. Comfortable speaking directly to founders, senior stakeholders, and end clients.',
  },
  {
    icon: 'Shield',
    title: 'Async-first, US-hours overlap.',
    body: 'Olongapo, Philippines — I work US business hours and overlap EST/CST/MST/PST every workday. Strong written communication for distributed teams.',
  },
  {
    icon: 'TrendingUp',
    title: 'I build the systems I work in.',
    body: 'Recently built AGC HUB — a custom internal platform (React + Vite + Firebase + GHL/Canva/Google Sheets APIs) unifying a US consultancy\'s scattered tool stack. In daily production.',
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
      'Campaign builds — newsletters, promos, onboarding, win-back',
      'Audience segmentation + list hygiene',
      'Automated nurture & retention flows',
      'Multi-touch sequences with branching logic',
      'A/B testing on subject lines, copy, and timing',
      'Open / click / delivery analytics reporting',
    ],
    outcome: 'Lifecycle programs that nurture, retain, and re-engage on autopilot.',
  },
  {
    id: 'crm',
    title: 'CRM Configuration & Automation',
    summary: 'GoHighLevel, HubSpot, and Mailchimp builds tied to real sales processes. Sub-account setup, pipelines, lead routing, booking automations, and A2P 10DLC-compliant SMS campaigns.',
    bullets: [
      'GoHighLevel full builds — pipelines, automations, sub-accounts',
      'A2P 10DLC SMS brand approval (the GHL setup most builders avoid)',
      'HubSpot + Mailchimp + Kajabi configuration',
      'Lead routing + booking automations',
      'Business profiles + email service connections',
      'GHL-Gmail-Zapier glue across founder workflows',
    ],
    outcome: 'Every lead routed, every follow-up automated, every conversation logged.',
  },
  {
    id: 'deliverability',
    title: 'Deliverability & Compliance',
    summary: 'Dedicated sending domains with SPF/DKIM/DMARC properly aligned, warmup to high-volume capacity, and A2P 10DLC SMS registration so email and text campaigns actually reach the inbox — legally.',
    bullets: [
      'Dedicated sending subdomains configured end-to-end',
      'SPF / DKIM / DMARC alignment + SSL',
      'Email warmup to 6,500+/day verified capacity',
      'A2P 10DLC SMS registration + brand approval',
      'Inbox-placement diagnostics + warmup recovery',
      'Square payment integration for checkout/intake flows',
    ],
    outcome: 'Email and SMS that land in the inbox, not spam — and stay compliant.',
  },
  {
    id: 'automation',
    title: 'Workflow Automation & AI',
    summary: 'n8n, Make, and Zapier builds connecting your stack. Anthropic Claude API wired into outreach personalization, content drafting, and lead scoring. Self-hostable or cloud — whichever the team prefers.',
    bullets: [
      'n8n self-hosted on DigitalOcean — full control, no per-task billing',
      'Make.com + Zapier for connector-heavy SaaS workflows',
      'Anthropic Claude API for personalized drafting + scoring',
      'GHL API + Canva API + Google Sheets API integrations',
      'Error handling + Slack alerts + documented hand-off',
      'Multi-provider email enrichment pipelines',
    ],
    outcome: 'Repetitive work automated end-to-end — hours back every week.',
  },
  {
    id: 'web-tools',
    title: 'Custom Sites & Internal Tools',
    summary: 'Hand-coded HTML/CSS/JS sites on Cloudflare Pages, plus React + Vite + Firebase internal tools. Recently built AGC HUB — a custom platform unifying a US agency\'s scattered tool stack. In daily production.',
    bullets: [
      'Custom-coded sites on Cloudflare Pages — sub-second loads',
      'React + Vite + Tailwind for app-style tools and portfolios',
      'Wix Studio + Velo extensions for client self-edit access',
      'WordPress when full editing freedom is the priority',
      'Firebase + GitHub Actions CI/CD + auto-deploy',
      'PWA architecture — installable, offline-aware, mobile-first',
    ],
    outcome: 'Fast sites and internal tools the team owns forever.',
  },
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
    gallery: [
      { src: '/work-thumbs/agchub-1.png', label: 'Team dashboard — live view of everything in motion' },
      { src: '/work-thumbs/agchub-2.png', label: 'Schedule board — newsletter + social calendar' },
      { src: '/work-thumbs/agchub-3.png', label: 'Client reports — website + email analytics' },
    ],
    previewLine: 'Internal company tool — these are real screenshots from the live app. Full walkthrough available on request; happy to demo it in an interview.',
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
      'Build and run monthly email and SMS marketing campaigns and lifecycle automations across multiple client accounts — audience segmentation, automated nurture and retention flows — and report open, click, and delivery analytics directly to the founder and clients.',
      'Configure GoHighLevel sub-accounts per client end-to-end — automations, pipelines, business profiles, dedicated sending domains, and email service connections — and manage Cloudflare DNS across the portfolio.',
      'Own email and SMS deliverability across the portfolio: dedicated sending domains, SPF/DKIM/DMARC configuration, and A2P 10DLC registration for compliant text campaigns.',
      'Technical lead for client onboarding — owning the full implementation stack (GoHighLevel configuration, custom-coded sites, domain go-lives, compliance) end-to-end across multiple accounts.',
      'Built AGC HUB — a custom internal platform unifying the agency\'s scattered tools (Drive, ClickUp, Trello, GHL, Canva) into one system. Runs the end-to-end content production workflow: task assignment → team submission → review via GHL + Canva APIs → PM scheduling. Stack: React + Vite + Firebase + GHL/Canva/Google Sheets APIs. In daily production.',
      'Acted as technical advisor to clients and the founder — translating implementation and automation details into plain language during onboarding calls and answering live technical questions.',
      'Built and shipped custom-coded HTML/CSS/JS websites on Cloudflare Pages, plus Wix Velo extensions for platforms requiring client self-edit access.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant',
    company: 'Doneverse',
    location: 'Philippines',
    type: 'VMA agency — recruits, trains, and matches Virtual Marketing Assistants to US founders',
    dates: 'Sep 2025 — Feb 2026',
    bullets: [
      'Built and shipped Mailchimp and HubSpot email marketing systems for SMB clients — automated onboarding sequences, nurture flows, and Kajabi course-platform integrations.',
      'Ran multi-touch LinkedIn outreach and follow-up sequences on behalf of clients — connection note writing, nurture cadences, and lead nurturing through to booked discovery calls.',
      'Owned client onboarding for new platform setups, including domain configuration and email deliverability setup.',
      'Primary technical implementer across the agency — built and configured client accounts on Wix Studio, Kajabi, Mailchimp, and HubSpot.',
      'Delivered Wix Studio sites with integrated Square payment processing for client checkout and intake flows.',
    ],
  },
];

// Mirrors the "Technical Skills" block in the PDF resume
export const coreExpertise = [
  {
    label: 'Email & Lifecycle Marketing',
    items: 'Campaign builds, audience segmentation, automated nurture & retention flows, multi-touch sequences, A/B testing, analytics reporting',
  },
  {
    label: 'CRM & Marketing Platforms',
    items: 'GoHighLevel (GHL), HubSpot, Mailchimp, Kajabi, ActiveCampaign',
  },
  {
    label: 'Automation & Integrations',
    items: 'n8n, Make.com, Zapier, GHL API, Google Sheets API, Canva API, Anthropic Claude API',
  },
  {
    label: 'Deliverability & Compliance',
    items: 'A2P 10DLC SMS registration, dedicated sending domains, SPF/DKIM/DMARC, Square Payment integration',
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
