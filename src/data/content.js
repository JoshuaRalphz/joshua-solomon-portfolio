// Centralized content so it's easy to edit without touching JSX.

export const profile = {
  name: 'Joshua Solomon',
  role: 'CRM & Automation Specialist',
  subtitle: 'Marketing Systems Builder',
  location: 'Olongapo City, PH · Working US hours',
  available: 'Available for new retainers',
  email: 'solomonjoshua101602@gmail.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  facebook: 'https://www.facebook.com/lionheart016',
  bishopUrl: 'https://bishoproofing.company',
};

export const stats = [
  { value: '3+',  label: 'Years shipping marketing systems' },
  { value: '14d', label: 'Average project turnaround' },
  { value: '$1k', label: 'Flat monthly retainer · no agency layers' },
  { value: '24h', label: 'Reply time · email-first · US hours' },
];

// GHL Inbound Webhook for the portfolio contact form + planner submission.
// Trigger lives in WF-PORTFOLIO workflow (sub-account: Joshua Solomon).
export const PORTFOLIO_GHL_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/n3Mhd91c4sG1CNdf5zdN/webhook-trigger/c93afe4a-d360-4235-9be8-55771da5e86f';

export const benefits = [
  {
    icon: 'Zap',
    title: 'Setup once. Live in two weeks.',
    body: 'I build your full system end-to-end in the first 14 days — site, CRM, automation, integrations. You start collecting leads before your next pay period.',
  },
  {
    icon: 'UserCheck',
    title: 'One operator, not an agency.',
    body: 'You message me directly. I respond within hours during US business time. No project managers, no juniors, no email chains routed through three people.',
  },
  {
    icon: 'Wrench',
    title: 'Tool-stack flexibility.',
    body: 'I work in your existing stack — GHL, HubSpot, Wix, WordPress, Squarespace, ClickUp. No forced migrations. No vendor lock-in.',
  },
  {
    icon: 'Layers',
    title: 'Full-stack technical depth.',
    body: 'Custom code when platforms break down. DNS, domains, payment integrations, email authentication — the unsexy plumbing that most freelancers refuse.',
  },
  {
    icon: 'Shield',
    title: 'Code is yours, day one.',
    body: 'Sites built in your GitHub. CRMs in your GHL sub-account. If we part ways, you keep everything. No lock-in.',
  },
  {
    icon: 'TrendingUp',
    title: 'Built to grow with you.',
    body: 'Adding a new offer, a new pipeline, a new email sequence next quarter? Included in the retainer. No per-project quotes for ongoing work.',
  },
];

// Three retainer paths — Core foundation, Automation Pro middle, Full Marketing end-to-end.
export const pricingTiers = [
  {
    id: 'core',
    name: 'Core',
    tagline: 'The foundational build.',
    bestFor: 'Founders and solo operators who\'ll handle their own content.',
    price: '$1,000',
    period: '/ month',
    commitment: '6-month minimum',
    bullets: [
      'GoHighLevel CRM setup + pipeline config',
      'Up to 5 active automation workflows',
      'Custom-coded site on Cloudflare Pages',
      'DNS, domain, SPF/DKIM/DMARC email auth',
      'Form integration with any platform',
      'Branded HTML email templates',
      'Ongoing bug fixes + minor updates',
      'GHL Pro sub-account + Cloudflare hosting — bundled (~$300/mo value)',
      'Direct messaging · 24h response, US business hours',
    ],
  },
  {
    id: 'automation-pro',
    name: 'Automation Pro',
    tagline: 'Core + AI lead gen + workflow automation.',
    bestFor: 'SaaS founders and startups scaling outbound or building serious automation.',
    price: '$1,500',
    period: '/ month',
    commitment: '4-month minimum',
    recommended: true,
    badge: 'Most popular · the system I run on myself',
    bullets: [
      'Everything in Core, plus:',
      'n8n / Make / Zapier workflow builds',
      'AI integration (Claude API + OpenAI API)',
      'Lead generation pipeline — the same system I run for myself',
      'Multi-provider email enrichment (Hunter + Snov + Apollo)',
      'Custom API integrations + webhooks',
      'Light reporting dashboards (Sheets, Notion)',
      'Priority response — same business day',
    ],
  },
  {
    id: 'full',
    name: 'Full Marketing',
    tagline: 'Tech + team. The whole marketing function, off your plate.',
    bestFor: 'Service businesses, agencies, and founders who want marketing handled end-to-end — no separate creative team, no separate ads manager, no juggling vendors.',
    price: '$2,500',
    period: '/ month',
    commitment: '3-month minimum',
    badge: 'Replaces a $5k/mo marketing hire + creative team',
    bullets: [
      'Everything in Automation Pro, plus:',
      'Dedicated content team — my team produces, I plan + QC every deliverable',
      'Social media management — Meta, IG, LinkedIn (organic posting cadence)',
      '30-day content calendar — strategy + execution, end-to-end',
      'Graphic design — branded social, marketing collateral, ad creative (Canva + light Adobe)',
      'Short-form reels editing — IG + TikTok + YouTube Shorts',
      'Blog + SEO content writing — keyword-targeted, monthly cadence',
      'Paid ads management — Meta + Google, including creative + targeting + reporting',
      'Light project coordination — you don\'t chase me, I manage timelines',
      'Shorter 3-month commitment — fastest path to fully hands-off marketing',
    ],
  },
];

// No standalone add-ons — everything bundles into the two tiers above.
// This array is kept for backwards-compat with old imports; intentionally empty.
export const addOns = [];

// Vite auto-imports every graphic in src/assets/samples/graphics/.
// Drop a file in that folder → it shows up here at build time. No manual
// editing required. Sorted with natural numeric ordering, so 1.jpg comes
// before 2.jpg comes before 10.jpg.
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

// Content samples shown on the Services page under the Full Marketing tier.
// Disclosure copy is shown at the top of the section so visitors know my team
// produces these — I plan + QC.
export const contentSamples = {
  disclosure:
    'These are deliverables from my Full Marketing tier — I plan + QC, my team produces.',
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

export const services = [
  {
    id: 'crm',
    title: 'GoHighLevel CRMs',
    summary: 'Pipelines configured to your real sales motion. Automated workflows, custom fields, opportunity stages, email infrastructure (DKIM/SPF/DMARC). GHL Pro plan included.',
    bullets: [
      'Pipeline stages mapped to your actual sales process',
      'Inbound webhook → instant lead capture',
      'Tags, custom fields, automated routing',
      'Email + SMS automation sequences (A2P 10DLC compliant)',
      'Calendar booking integration',
      'Sub-account hosted on my Pro plan — you don\'t pay GHL separately',
    ],
    outcome: 'Every lead lands in your CRM in under 30 seconds. No leads slip through.',
  },
  {
    id: 'website',
    title: 'Custom Cloudflare Sites',
    summary: 'Custom-coded sites on Cloudflare Pages. Fast, secure, fully owned. No WordPress bloat, no theme dependencies. Code lives in your GitHub.',
    bullets: [
      'Hand-coded HTML/CSS/JS — no themes, no page builders',
      'Lighthouse 95+ on speed, accessibility, SEO',
      'Hosted free on Cloudflare Pages — global CDN, instant edge',
      'GitHub auto-deploy — push to publish',
      'Mobile-responsive, modern design language',
      'Full ownership — code lives in YOUR GitHub repo from day one',
    ],
    outcome: 'A site that loads fast, converts, and you can hand to anyone if we part ways.',
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    summary: 'Lifecycle, drip, and nurture sequences. Lead routing, behavioral triggers, and integration glue between your CRM and email platform.',
    bullets: [
      'Verified sending domain with SPF/DKIM/DMARC alignment',
      'Branded HTML email templates (Outlook + Gmail tested)',
      'Multi-step nurture sequences (welcome, lead magnet, re-engagement)',
      'Behavioral triggers — form submit, status change, deadline',
      'A/B test setup for subject lines and CTAs',
      'Monthly newsletter cadence handled',
    ],
    outcome: 'Your follow-up runs without you babysitting it.',
  },
  {
    id: 'lead-gen',
    title: 'Lead Generation Systems',
    summary: 'Multi-source AI pipelines that scrape job boards, enrich contacts with Hunter + Snov + Apollo, personalize with Claude, and queue drafts for review. The same system I run for myself — 25 leads/week.',
    bullets: [
      'n8n-based scraper across job boards (LinkedIn, WWR, Remote OK, Wellfound)',
      'Multi-provider email enrichment — Hunter + Snov + Apollo fallback chain',
      'Claude API personalization of opening lines per prospect',
      'GHL integration — every lead lands in your Outbound pipeline',
      'Gmail drafts queued for your 5-second review — never auto-sends',
      'Demo: I\'ll show you the exact system live before we build yours',
    ],
    outcome: '25+ personalized prospect drafts in your inbox every week, ready to send.',
    featured: true,
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    summary: 'n8n, Make, and Zapier builds that connect your tools into reliable pipelines. Custom API integrations, AI workflows, error handling, fallback chains.',
    bullets: [
      'n8n / Make / Zapier — pick what fits your stack',
      'Custom API integrations with retry + fallback logic',
      'AI workflows (Claude, OpenAI, GHL Conversation AI)',
      'Multi-step pipelines with error handling + Slack alerts',
      'Self-hosted n8n on $5/mo DigitalOcean droplet — you own it forever',
      'Documentation + Loom walkthroughs of every workflow',
    ],
    outcome: 'Your stack runs as one system — no manual data transfer between tools.',
    featured: true,
  },
];

// Scope boundaries — what I don't do (filters wrong-fit prospects upfront).
export const boundaries = {
  dontDo: [
    'Standalone graphic design or full brand identity work',
    'Logo design as a primary service',
    'Photography or video production',
    'SEO content writing as a standalone service',
    'Paid ads strategy without underlying CRM/automation work',
    'One-off projects — I work on retainer only',
    'White-label agency reselling without my name attached',
  ],
  doInstead: [
    'Marketing systems that connect and run themselves',
    'Lead generation infrastructure with AI',
    'Workflow automation across your tool stack',
    'GHL CRM builds tied to real sales processes',
    'Custom-coded sites with proper backend integration',
    'Ongoing retainer relationships where I learn your business',
    'Full Marketing tier when you need creative work too',
  ],
};

// Lead-gen demo video shown on Services page below the lead-gen service card.
// Set videoId to a YouTube video ID once recorded; section auto-shows.
export const leadGenDemo = {
  videoId: null, // TODO: paste YouTube video ID once recorded
  title: 'Watch the pipeline I built for myself.',
  description: "Same system I'll build for you in Automation Pro. No outsourcing, no theory — this runs my own outreach. 25 leads/week, AI-personalized, queued for review.",
};

export const tools = [
  // CRM & Automation
  { name: 'GoHighLevel', tier: 'Daily', category: 'CRM' },
  { name: 'HubSpot',     tier: 'Daily', category: 'CRM' },
  { name: 'Mailchimp',   tier: 'Weekly', category: 'CRM' },
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

  // Web Platforms
  { name: 'Cloudflare Pages', tier: 'Daily', category: 'Hosting' },
  { name: 'Cloudflare DNS',   tier: 'Daily', category: 'Hosting' },
  { name: 'GitHub Pages',     tier: 'Weekly', category: 'Hosting' },

  // Code
  { name: 'HTML/CSS/JS',         tier: 'Daily',  category: 'Code' },
  { name: 'React',               tier: 'Weekly', category: 'Code' },
  { name: 'Tailwind CSS',        tier: 'Daily',  category: 'Code' },
  { name: 'Vite',                tier: 'Weekly', category: 'Code' },
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

  // Specialized Integrations
  { name: 'DistroKid',              tier: 'Occasional', category: 'Distribution' },
  { name: 'Poshmark / eBay / Depop', tier: 'Occasional', category: 'Distribution' },

  // Design
  { name: 'Figma', tier: 'Weekly', category: 'Design' },
  { name: 'Canva', tier: 'Weekly', category: 'Design' },
];

export const works = [
  {
    id: 'bishop',
    featured: true,
    title: 'Bishop Roofing & Exteriors — complete marketing system',
    tag: '★ Featured · Live demo',
    summary: 'A fictional Texas roofing client, real working build. Custom-coded 6-page site + GoHighLevel CRM + two live workflows + interactive in-browser demo that walks visitors through the GHL backend in real-time.',
    liveUrl: 'https://bishoproofing.company',
    videos: [
      {
        id: 'QVanl4wbx-g',
        label: 'Storm Guide Flow (60s)',
        sub: 'Lead magnet → 3-email nurture → 12-page PDF download',
      },
      {
        id: 'Halpm7j9el0',
        label: 'Inspection Request Flow (60s)',
        sub: 'Form submit → contact + opp + email + task in under 30 sec',
      },
    ],
    stack: ['HTML', 'CSS', 'JS', 'GoHighLevel', 'Cloudflare Pages', 'Cloudflare DNS', 'Mailgun', 'GitHub auto-deploy'],
    wins: ['Interactive in-browser GHL backend demo', '6-page custom-coded site', 'Two live workflows (WF1 + WF3)', '12-page lead-magnet PDF'],
    previewLine: 'This same architecture is what you\'d get for your business — just configured for your pipeline, your brand, your offers.',
  },
  {
    id: 'alliance',
    title: 'Alliance Service Brands — custom multi-brand home services site',
    tag: 'Custom Build · Web',
    summary: 'Built the full custom website for a Michigan home-services holding company unifying six specialized brands — construction, handyman, windows/doors, real estate, lake property management, and financing — under one clean visual system.',
    stack: ['Custom site', 'Multi-brand architecture', 'Responsive design'],
    initials: 'AS',
    liveUrl: 'https://www.allianceservicebrands.com',
    location: 'Jackson, MI',
    thumb: '/work-thumbs/alliance.png',
  },
  {
    id: 'aoutility',
    title: 'Alpha Omega Utility Services — A2P-approved SMS + full marketing stack',
    tag: 'CRM · A2P SMS · Email · DNS',
    summary: 'Got A2P 10DLC brand approval on GoHighLevel — the single hardest GHL setup, and the thing most agencies fail at — so this Michigan electrical/utility contractor can text leads legally and at scale. Plus the full marketing system around it: website, email marketing, CRM, and end-to-end domain + DNS handling.',
    stack: ['GoHighLevel', 'A2P 10DLC SMS', 'Cloudflare DNS', 'Email automation', 'Website'],
    wins: ['A2P 10DLC Brand Approved', 'Verified business number', 'Full DNS migration'],
    initials: 'AO',
    liveUrl: 'https://www.aoutilityservices.com',
    location: 'Michigan, USA',
    thumb: '/work-thumbs/aoutility.png',
  },
  {
    id: 'endtime',
    title: 'Endtime Entrepreneurs — custom Cloudflare site, CRM, distribution & SEO',
    tag: 'Custom Build · SEO · CRM',
    summary: 'Built the full website from scratch on Cloudflare Pages for an indie game + music studio. Run their GoHighLevel CRM, DistroKid composition distribution, email marketing, DNS, and ongoing SEO to keep the site ranked and alive.',
    stack: ['Cloudflare Pages', 'GoHighLevel', 'DistroKid', 'SEO', 'Cloudflare DNS', 'Email'],
    initials: 'EE',
    liveUrl: 'https://endtimeentrepreneurs.com',
    location: 'USA',
    thumb: '/work-thumbs/endtime.png',
  },
  {
    id: 'adas',
    title: 'Ada\'s Closet — consignment startup ops, site & Apps Script database',
    tag: 'Custom Build · Ops · Integration',
    summary: 'Built the launch site and the entire back-office for a student-run consignment startup. Set up the listing flow across Poshmark / eBay / Depop and a Google Apps Script database the client can view live — with notifications firing on every new sale.',
    stack: ['Custom site', 'Google Apps Script', 'Poshmark', 'eBay', 'Depop', 'Notifications'],
    initials: 'AC',
    liveUrl: 'https://www.adasclosetsau.com',
    location: 'Spring Arbor, MI',
    thumb: '/work-thumbs/adas.png',
  },
  {
    id: 'homefm',
    title: 'HOME.FM — dedicated email infrastructure + ongoing systems',
    tag: 'Email Infra · CRM · Web',
    summary: 'Built dedicated email-sending infrastructure for this Michigan radio station — separate subdomain (mail.listenhome.fm), SPF/DKIM/DMARC properly aligned, SSL issued, warmup completed to 6,500 emails/day capacity. The difference between landing in inbox vs spam folder. Plus ongoing CRM management and site updates.',
    stack: ['Dedicated sending domain', 'SPF/DKIM/DMARC', 'Email warmup', 'GoHighLevel', 'CRM', 'Website updates'],
    wins: ['Dedicated sending subdomain', 'Warmed to 6,500/day', 'SSL issued · SPF/DKIM/DMARC aligned'],
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
    role: 'Technical VA & Web Developer',
    company: 'Arrow Group Consulting',
    location: 'Michigan, USA',
    type: 'Part-time ongoing contract',
    dates: 'Feb 2026 — Present',
    bullets: [
      'Embedded technical implementer for the founder — owning the systems side of new client onboardings end to end.',
      'Built and shipped custom-coded HTML/CSS/JS websites deployed on Cloudflare Pages, plus Wix Velo extensions where platforms were the better fit.',
      'Managed Cloudflare DNS, domain go-lives, and GoHighLevel domain connections across multiple client accounts.',
      'Designed and shipped monthly email newsletter campaigns; set up invoicing and back-office workflows.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant',
    company: 'Doneverse',
    location: 'Philippines',
    type: 'Marketing VA agency',
    dates: 'Sep 2025 — Apr 2026',
    bullets: [
      'Primary technical implementer across the agency — Wix, WordPress, Squarespace, HubSpot, and Mailchimp client accounts.',
      'Built advanced GoHighLevel automations: CRM pipelines, lead-routing rules, booking funnels, and sales sequences.',
      'Designed and rolled out the agency\'s full ClickUp project management system from scratch — including Gmail-to-task automations that eliminated manual triage.',
      'Delivered Wix Studio builds and integrated Square payment processing into client checkout and intake flows.',
    ],
  },
];

// Mirrors the "Core Expertise" block in the PDF resume
export const coreExpertise = [
  {
    label: 'CRM, SMS & Automation',
    items: 'GoHighLevel (GHL) full builds, CRM pipelines, lead routing, booking automations, GHL A2P 10DLC SMS compliance, Zapier, ClickUp',
  },
  {
    label: 'Email & Lifecycle',
    items: 'Mailchimp, HubSpot, GHL Email, newsletter systems, multi-step nurture sequences',
  },
  {
    label: 'Websites, Hosting & SEO',
    items: 'Custom-coded sites (HTML / CSS / JS) deployed on Cloudflare Pages; Wix Classic / Studio / Velo, WordPress, Squarespace as platform alternatives. Ongoing on-page and technical SEO + Google Search Console.',
  },
  {
    label: 'Technical & Integrations',
    items: 'Cloudflare DNS & Pages, domain management, GHL domain connect, Square + Stripe + GHL invoicing flows, automated billing & receipt workflows, Google Apps Script back-office logic, Gmail-to-task pipelines, DistroKid distribution',
  },
  {
    label: 'AI & LLM Integration',
    items: 'Building AI-augmented automation workflows — Claude + OpenAI API integration in n8n & Make for outreach personalization, content drafting, and lead-scoring. LLM-augmented marketing automation as a core differentiator vs no-AI agency builds.',
  },
];

// Mirrors the "Service Offer" block in the PDF resume
export const serviceOffer = {
  title: 'Done-For-You Marketing System',
  price: '$1,000/mo Core · $1,500/mo Automation Pro · $2,500/mo Full Marketing',
  bullets: [
    'Core: GHL CRM + custom Cloudflare site + email automation',
    'Automation Pro: Core + AI lead-gen pipeline + n8n/Make/Zapier workflow builds',
    'Full Marketing: Automation Pro + content + paid ads + design (my team produces)',
    'GHL Pro sub-account + Cloudflare hosting bundled into every tier',
    'No setup fees — first invoice is just your first month',
    'All software costs (Hunter, n8n, Canva, etc.) included in every tier',
  ],
};
