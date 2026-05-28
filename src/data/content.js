// Centralized content so it's easy to edit without touching JSX.

export const profile = {
  name: 'Joshua Solomon',
  role: 'CRM & Automation Specialist',
  subtitle: 'Marketing Systems Builder',
  location: 'Olongapo City, PH · Working US hours',
  available: 'Available for new retainers',
  email: 'josh@lc.solomonjoshua.com',
  whatsapp: '+63 961 556 2117',
  whatsappLink: 'https://wa.me/639615562117',
  github: 'https://github.com/JoshuaRalphz',
  linkedin: 'https://www.linkedin.com/in/joshua-ralph-adrian-solomon-1a0745347/',
  facebook: 'https://www.facebook.com/lionheart016',
  bishopUrl: 'https://bishoproofing.company',
};

export const stats = [
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
    title: 'Live in two weeks.',
    body: 'I build the whole system in the first 14 days — your website, your CRM, the follow-up emails, the lead capture. You start collecting leads before your next paycheck.',
  },
  {
    icon: 'UserCheck',
    title: 'You talk to me. Not a team.',
    body: 'Message me directly. I reply in hours during US business time. No project managers, no junior staff, no email chains routed through three people.',
  },
  {
    icon: 'Wrench',
    title: 'I work in YOUR tools.',
    body: 'You already use HubSpot? Mailchimp? Squarespace? I work in what you have. No forced migrations, no "you have to switch to this platform."',
  },
  {
    icon: 'Layers',
    title: 'Technical work, handled.',
    body: 'The boring stuff most freelancers refuse — domain setup, making sure emails reach inboxes, connecting payment systems, hooking up your tools. Done.',
  },
  {
    icon: 'Shield',
    title: 'You own everything.',
    body: 'Your website code, your CRM account, your customer list — everything in your name from day one. If we part ways, you keep it all.',
  },
  {
    icon: 'TrendingUp',
    title: 'Grows with your business.',
    body: 'New offer next quarter? New email sequence? New lead flow? Included in your retainer. No "that\'s a separate project" surprises.',
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
      'CRM set up to match your real sales process',
      'Up to 5 automated workflows running for you',
      'A website built on your platform of choice (WP, Wix, Squarespace, GHL, or custom-coded)',
      'Your domain + emails configured to land in inboxes (not spam)',
      'Forms that capture every lead the moment they hit submit',
      'Branded email templates that look professional everywhere',
      'Ongoing fixes + small updates whenever you need',
      'GoHighLevel Pro account included (saves you $297/mo)',
      'Direct messaging · I reply within 24 hours, US business time',
    ],
  },
  {
    id: 'automation-pro',
    name: 'Automation Pro',
    tagline: 'Core + AI lead gen + workflow automation.',
    bestFor: 'SaaS founders and startups scaling outbound or building serious automation.',
    price: '$1,500',
    period: '/ month',
    commitment: '5-month minimum',
    recommended: true,
    badge: 'Most popular · the system I run on myself',
    bullets: [
      'Everything in Core, plus:',
      'Automation that handles your repetitive weekly tasks',
      'AI tools that draft emails, score leads, summarize data for you',
      'Lead-gen system designed to deliver 25+ qualified prospects every week — fully automated, queued for review',
      'Verified email finder that gets the right contact every time',
      'Tools that talk to each other — no more copying data between platforms',
      'A simple dashboard showing how your business is performing',
      'Priority response — I reply the same business day',
    ],
  },
  {
    id: 'full',
    name: 'Full Marketing',
    tagline: 'Tech + team. The whole marketing function, off your plate.',
    bestFor: 'Service businesses, agencies, and founders who want marketing handled end-to-end — no separate creative team, no separate ads manager, no juggling vendors.',
    price: '$2,000',
    period: '/ month',
    commitment: '3-month minimum',
    badge: 'Replaces a $5k/mo marketing hire + creative team',
    bullets: [
      'Everything in Automation Pro, plus:',
      'A content team that posts for you — I approve every piece before it goes out',
      'Daily social posts on Facebook, Instagram, and LinkedIn',
      'A month of content planned in advance — you approve once, we ship it all',
      'Graphics designed for posts, ads, and brochures — branded to your business',
      'Short-form videos edited for Reels, TikTok, and YouTube Shorts',
      'Blog posts written for Google search — 1–2 per month',
      'Paid ads on Facebook and Google — we make the ads, target the right people, send you the report',
      '4–6 creative deliverables per week (social posts, reels, graphics, ad creative)',
      'Project management included — you don\'t chase deadlines, I do',
      'Shorter commitment (3 months) — fastest path to handing off the whole thing',
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
    title: 'CRM + Email System',
    summary: 'A single place where every lead lives, gets followed up automatically, and never falls through the cracks. Built on GoHighLevel — I include the $297/mo platform so you don\'t pay it separately.',
    process: 'You tell me how you actually sell. I map that into the CRM with stages, automations, and follow-up emails. Within 14 days, every form submission, call booking, and lead lands in one dashboard — and gets nurtured even when you sleep.',
    bullets: [
      'One dashboard for every lead — no more "where did that email go?"',
      'Automatic follow-up emails — welcome, nurture, re-engagement sequences',
      'Legal SMS to US numbers (carrier compliance handled — you can text leads at scale)',
      'Your emails land in inboxes, not spam folders',
      'Branded email templates that look professional in Gmail + Outlook',
      'Online calendar booking — clients pick a slot, it syncs to your calendar',
      'Monthly newsletter goes out without you writing it',
      'GoHighLevel Pro included — you don\'t pay GHL separately',
    ],
    outcome: 'Every lead in one place. Automatic follow-up. Nothing slips through.',
  },
  {
    id: 'website',
    title: 'Custom Sites',
    summary: 'A website that loads fast, looks modern, and works on every device. Pick the platform that fits your team — WordPress, Squarespace, Wix, GoHighLevel sites/funnels, or hand-coded for maximum speed. I build it. You own it.',
    process: 'We start with what you actually need — edit it yourself? Pick Squarespace or Wix. Want it to load in under a second? Hand-coded. E-commerce? WordPress. Funnel + CRM in one? GHL. You don\'t need to know the tech — I match the platform to the work.',
    bullets: [
      'WordPress — full editing freedom + e-commerce',
      'Squarespace — clean, easy for you to update yourself later',
      'Wix Studio or Wix Velo — drag-and-drop with custom code where needed',
      'GoHighLevel sites + funnels — one-platform marketing if you want lock-step CRM',
      'Hand-coded sites on Cloudflare — fastest possible loads, complete control',
      'Mobile-friendly + Google-friendly on every option',
      'You own everything — platform account or code repo lives in your name',
    ],
    outcome: 'A site that loads fast, converts visitors, and you can hand off to anyone if we part ways.',
  },
  {
    id: 'content-social',
    title: 'Content & Social Media',
    summary: 'Your social posts, reels, and graphics — done for you. You send raw photos and video clips, my team produces the finished content, I review and approve every piece before it goes out. Available in the Full Marketing tier only.',
    process: 'You drop raw footage and photos into a shared folder. My team designs the graphics, edits the reels, writes the captions, and schedules them out. I review every post before it publishes. You wake up to a feed that\'s already been posted.',
    bullets: [
      'Social posts on Facebook, Instagram, LinkedIn — scheduled and posted for you',
      'Short-form reels edited for Instagram, TikTok, and YouTube Shorts',
      'Graphic design for posts, ads, brochures, anything you need branded',
      '30-day content calendar — we plan a month at a time, you approve once',
      'Blog posts written for SEO — one or two per month, depending on tier focus',
      'You send raw clips and photos. We make them look good. I approve everything.',
      'See live samples in the gallery below this section',
    ],
    outcome: 'Your social media stays alive without you posting it. No hiring 3 freelancers separately.',
  },
  {
    id: 'lead-gen',
    title: 'Lead Generation Systems',
    summary: 'A system that finds people who might want to buy from you — every single week — and writes the first outreach message for you. You just review and hit send. Designed to deliver 25+ qualified prospects per week, fully automated.',
    process: 'The system runs in the background while you sleep. It scans job boards and company sites for businesses that match your ideal customer. It finds the right person\'s real email. It writes a personal first line about THEIR business using AI. Then it drops a finished draft into your Gmail. You read it (5 seconds), edit if you want, hit send.',
    bullets: [
      'Scans LinkedIn, Wellfound, and remote job boards for prospects that match you',
      'Finds verified email addresses (3 services rotating so we always get the best data)',
      'AI writes a personal first line about EACH prospect — no generic templates',
      'Every lead lands in your CRM automatically with full context',
      'Email drafts sit in your Gmail — you review in 5 seconds, never auto-send',
      'Live demo before we build yours — see the architecture walk-through',
    ],
    outcome: 'Designed to deliver 25+ personalized prospect drafts in your inbox every week, ready to review.',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    summary: 'The repetitive work you do every week — copying data between tools, sending the same emails, posting reports — I build a system that does it for you. AI handles the smart decisions, automation handles the rest. You stop being the bottleneck.',
    process: 'You tell me what you do every Monday morning. What you do every time a new client signs. What you do after every sales call. I map each routine and build it as an automation. The work still happens — just without you touching anything.',
    bullets: [
      'Tell me what you repeat — invoicing, reporting, lead routing, onboarding, anything',
      'I build it as an automation in n8n, Zapier, or Make (pick what fits your stack)',
      'AI handles the smart parts — drafting emails, scoring leads, summarizing data',
      'Built-in error handling — if something breaks, I get a Slack alert + fix it',
      'Self-hosted option on a $5/mo server — you own the system forever',
      'Loom walkthrough of every workflow so you can hand off to anyone',
    ],
    outcome: 'The repetitive work happens without you. Hours back per week.',
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
  videoId: '6mhNTswiVmk',
  title: 'Watch the pipeline I built for myself.',
  description: "Same architecture I'll build for you in Automation Pro. No outsourcing, no theory. Designed to deliver 25+ AI-personalized prospect drafts per week, queued for review.",
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
    summary: 'A fictional Texas roofing client, real working build. A 6-page website, a CRM that captures every lead, two automated email flows that follow up the moment someone shows interest, and an interactive demo that walks you through the backend — so you can see exactly how the system works before we even talk.',
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
    title: 'Alpha Omega Utility Services — legal SMS + full marketing system',
    tag: 'CRM · SMS · Email · Web',
    summary: 'Got this Michigan utility contractor fully approved to text customers legally and at scale (a federal compliance process most freelancers won\'t touch). Plus the full marketing system around it: website, email follow-up, CRM, and complete domain setup so emails actually reach inboxes.',
    stack: ['GoHighLevel', 'Legal SMS approval', 'Domain setup', 'Email automation', 'Website'],
    wins: ['Approved to text customers legally', 'Verified business number', 'Full domain migration'],
    initials: 'AO',
    liveUrl: 'https://www.aoutilityservices.com',
    location: 'Michigan, USA',
    thumb: '/work-thumbs/aoutility.png',
  },
  {
    id: 'endtime',
    title: 'Endtime Entrepreneurs — website, CRM, music distribution & SEO',
    tag: 'Custom Build · SEO · CRM',
    summary: 'Built the full website from scratch for an indie game + music studio. Run their CRM, music distribution (DistroKid), email marketing, domain setup, and ongoing SEO so the site keeps showing up on Google.',
    stack: ['Custom website', 'GoHighLevel', 'DistroKid', 'SEO', 'Domain setup', 'Email'],
    initials: 'EE',
    liveUrl: 'https://endtimeentrepreneurs.com',
    location: 'USA',
    thumb: '/work-thumbs/endtime.png',
  },
  {
    id: 'adas',
    title: 'Ada\'s Closet — full back-office for a student consignment startup',
    tag: 'Custom Build · Ops · Integration',
    summary: 'Built the launch website plus the entire back-office for a student-run consignment business. Listings flow into Poshmark, eBay, and Depop, and a live inventory database the team can check anytime — with instant notifications on every new sale.',
    stack: ['Custom website', 'Live inventory database', 'Poshmark', 'eBay', 'Depop', 'Sale notifications'],
    initials: 'AC',
    liveUrl: 'https://www.adasclosetsau.com',
    location: 'Spring Arbor, MI',
    thumb: '/work-thumbs/adas.png',
  },
  {
    id: 'homefm',
    title: 'HOME.FM — emails that actually land in inboxes',
    tag: 'Email · CRM · Web',
    summary: 'Built a dedicated email setup for this Michigan radio station so they can send up to 6,500 emails per day — and have them land in inboxes, not spam folders. Plus ongoing CRM management and website updates. The difference between "we sent the newsletter" and "people actually read it."',
    stack: ['Dedicated email setup', 'Inbox delivery', 'Email warmup to 6,500/day', 'GoHighLevel', 'CRM', 'Website updates'],
    wins: ['Dedicated sending setup', '6,500 emails/day capacity', 'Inbox delivery proven'],
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

// Mirrors the "Service Offer" block in the PDF resume
export const serviceOffer = {
  title: 'Done-For-You Marketing System',
  price: '$1,000/mo Core · $1,500/mo Automation Pro · $2,000/mo Full Marketing',
  bullets: [
    'Core: GHL CRM + custom Cloudflare site + email automation',
    'Automation Pro: Core + AI lead-gen pipeline + n8n/Make/Zapier workflow builds',
    'Full Marketing: Automation Pro + content + paid ads + design (my team produces)',
    'GHL Pro sub-account + Cloudflare hosting bundled into every tier',
    'No setup fees — first invoice is just your first month',
    'All software costs (Hunter, n8n, Canva, etc.) included in every tier',
  ],
};
