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
// TODO: paste the webhook URL from your "WF-PORTFOLIO" workflow trigger.
export const PORTFOLIO_GHL_WEBHOOK = null;

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

// Three pricing paths — Core + Full Marketing as recurring retainers,
// One-Time Build as the alternative for clients who don't want a relationship.
export const pricingTiers = [
  {
    id: 'core',
    name: 'Core',
    tagline: 'The technical foundation. You handle your own marketing on top.',
    price: '$1,000',
    period: '/ month',
    commitment: '6-month minimum',
    bullets: [
      'Website on YOUR stack — Cloudflare custom code (default), Wix Studio, WordPress, or Squarespace',
      'GHL CRM + A2P-compliant SMS configured to your real pipeline',
      'Email automation + monthly newsletter',
      'Automated invoicing, billing reminders, payment-receipt flows',
      'DNS, domain, SPF/DKIM/DMARC handled',
      'On-page + technical SEO + Google Search Console',
      'GHL Pro sub-account + Cloudflare hosting — bundled (~$300/mo value)',
      'Direct messaging · US business hours',
    ],
  },
  {
    id: 'one-time',
    name: 'One-Time Build',
    tagline: "For clients who already have GHL Pro and don't want a retainer relationship.",
    price: '$1,500',
    period: 'one-time',
    alternative: true,
    bullets: [
      'GHL CRM configured on YOUR own GHL Pro account',
      'Pipelines, automations, A2P SMS — all built',
      'You own everything from day one',
      'Hand-off + 30-day support window',
      'No retainer, no recurring relationship after hand-off',
      'You handle ongoing maintenance yourself',
      'Heads-up: Core retainer is $1k/mo and INCLUDES this same build + ongoing support',
    ],
  },
  {
    id: 'full',
    name: 'Full Marketing',
    tagline: 'Foundation + paid leads + the content engine. End-to-end.',
    price: '$2,000',
    period: '/ month',
    commitment: '3-month minimum',
    recommended: true,
    badge: 'Most popular · shorter commitment than Core, more bundled in',
    bullets: [
      'Everything in Core, plus:',
      'Paid ads setup & management — Google or Meta',
      'Ad creative + lead-routing tuned for paid traffic',
      '30-day content calendar — I plan, my team executes',
      'Social posts, reels editing, graphic design',
      'Expanded newsletter cadence',
      'You provide raw video + photos; we handle the rest',
    ],
  },
];

// No standalone add-ons — everything bundles into the three tiers above.
// This array is kept for backwards-compat with old imports; intentionally empty.
export const addOns = [];

export const services = [
  {
    id: 'website',
    title: 'Marketing website — your platform of choice',
    summary: 'You pick the stack. I build it. Cloudflare custom code by default — or Wix Studio, WordPress, Squarespace if you want a self-edit platform.',
    bullets: [
      'YOUR choice: Cloudflare custom code (default), Wix Studio, WordPress, or Squarespace',
      'Lighthouse 95+ on speed, accessibility, SEO (regardless of platform)',
      'Hosted free on Cloudflare Pages if custom-coded · or stays on your platform of choice',
      'GitHub auto-deploy on custom builds — push to publish',
      'Mobile-responsive, modern design language',
      'Full ownership — site code or platform account lives with you, day one',
    ],
    outcome: 'A site that loads fast, converts, and you can hand to anyone if we part ways.',
  },
  {
    id: 'crm',
    title: 'GoHighLevel CRM build',
    summary: 'Full GHL setup configured to your real pipeline.',
    bullets: [
      'Pipeline stages mapped to your actual sales process',
      'Inbound webhook → instant lead capture',
      'Tags, custom fields, automated routing',
      'Email + SMS automation sequences',
      'Calendar booking integration',
      'Sub-account hosted on my Pro plan (you don\'t pay GHL separately)',
    ],
    outcome: 'Every lead lands in your CRM in under 30 seconds. No leads slip through.',
  },
  {
    id: 'automation',
    title: 'Email, billing & workflow automation',
    summary: 'The drip sequences, invoice flows, and triggers that close — and collect.',
    bullets: [
      'Verified sending subdomain with SPF/DKIM/DMARC',
      'Branded HTML email templates',
      'Multi-step nurture sequences (welcome, lead magnet, re-engagement)',
      'Automated invoice notifications, payment receipts, billing reminders',
      'Trigger-based automations (form submit, status change, deadline)',
      'A/B test setup for subject lines and CTAs',
      'Monthly newsletter cadence handled',
    ],
    outcome: 'Your follow-up and your billing both run without you babysitting them.',
  },
  {
    id: 'integration',
    title: 'Integration & back-office glue',
    summary: 'Connecting tools that don\'t talk natively + automating the boring admin work.',
    bullets: [
      'Cloudflare DNS, domain transfers, email authentication',
      'Square + Stripe + GHL invoicing — full payment + billing flow integration',
      'Recurring billing workflows, late-payment reminders, receipt automation',
      'Zapier middleware for non-supported connections',
      'ClickUp workflows for internal ops',
      'GitHub Actions for deploy automation',
      'API webhooks for custom integrations',
    ],
    outcome: 'Your stack works as one system, and the admin runs itself.',
  },
];

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
  price: '$1,000/mo Core · $2,000/mo Full Marketing · $1,500 one-time build',
  bullets: [
    'Custom-coded website on Cloudflare Pages (or your platform of choice)',
    'GoHighLevel CRM + A2P-compliant SMS configured to your real pipeline',
    'Email automation, monthly newsletter, lead-routing',
    'GHL Pro sub-account + Cloudflare hosting bundled into the retainer',
    'Full Marketing tier adds: paid ads + 30-day content calendar + social + reels',
    'No setup fee on retainer tiers — first invoice is just your first month',
    'Alternative: $1,500 one-time GHL build on your own account (no retainer)',
  ],
};
