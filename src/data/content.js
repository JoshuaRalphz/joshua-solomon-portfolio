// All copy for the home page lives here. Case-study copy lives in ./cases.js.
//
// Positioning (Josh, 2026-10-20): AI Solutions Engineer. Lead with systems shipped,
// told as business problem -> what I built -> what changed, tech second.
// Facts only from the v8 CV, the project READMEs (yt-engine, Behind Works Pipeline)
// and Josh's own statements. No invented numbers, clients or titles.

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
  // (webm optional; poster defaults to `photo`). Never autoplays; the photo shows if it fails.
  introVideo: null,
};

export const initials = profile.name.split(' ').map((word) => word[0]).join('');

// The wired section menu (rail, top bar, footer) and the scroll spy read this.
export const sections = [
  { id: 'top', num: '00', label: 'Overview' },
  { id: 'work', num: '01', label: 'Systems' },
  { id: 'fit-agent', num: '02', label: 'How I’d help' },
  { id: 'build', num: '03', label: 'What I build' },
  { id: 'work-with-me', num: '04', label: 'Work with me' },
  { id: 'results', num: '05', label: 'Results' },
  { id: 'about', num: '06', label: 'About' },
  { id: 'contact', num: '07', label: 'Contact' },
];

export const hero = {
  outcome: 'I build AI that saves businesses time and money.',
  promise: 'Systems that take the busywork off a team: Claude or OpenAI does the drafting, writing or sorting, and the code around it keeps costs known, output checked and a person in charge of anything customer-facing. I ship them by directing AI coding agents (Claude Code).',
};

// Hero proof: business results first (client and agency work), each from the CV or a
// case below. Test counts live in Results and on the case pages, not here.
export const heroStats = [
  { value: '6,500/day', label: 'emails from HOME.FM’s sending domain, which I set up and warmed' },
  { value: '~89%', label: 'lower monthly platform cost for the agency (projected, in my business case)' },
  { value: '~$1', label: 'per finished AI video, vs ~$12 for paid generative video' },
  { value: '9.5%', label: 'a nonprofit client’s email click rate in May 2026, up from 4.5% in April (two months compared)' },
];

// "How my AI systems run": a process, not live data.
export const flow = [
  { label: 'Trigger', caption: 'A schedule, an email, a form or a request in chat' },
  { label: 'AI does the work', caption: 'Claude reads, scores and drafts; OpenAI makes images and voice' },
  { label: 'Code checks it', caption: 'Rules, caps and budgets enforced in code and in the database' },
  { label: 'You approve', caption: 'A person signs off on what matters before it goes out' },
];

// About 12 AI / infra tools. `icon` is a simple-icons export name (see ToolStrip.jsx); null = name only.
export const tools = [
  { name: 'Claude Code', icon: 'siClaude' },
  { name: 'Claude API', icon: 'siAnthropic' },
  { name: 'OpenAI API', icon: null },
  { name: 'Python', icon: 'siPython' },
  { name: 'FastAPI', icon: 'siFastapi' },
  { name: 'TypeScript', icon: 'siTypescript' },
  { name: 'Hono', icon: 'siHono' },
  { name: 'Cloudflare Workers', icon: 'siCloudflareworkers' },
  { name: 'Cloudflare D1', icon: 'siCloudflare' },
  { name: 'FFmpeg', icon: 'siFfmpeg' },
  { name: 'Apps Script + Gmail API', icon: 'siGoogleappsscript' },
  { name: 'React', icon: 'siReact' },
];
export const alsoUsed = 'GoHighLevel, HubSpot, Mailchimp, ActiveCampaign, Kajabi, Wix Studio, Jotform, Resend, Twilio, Square API, Firebase, Vercel.';

// The shorter third case, shown on the home page only. Facts from the v8 CV and the
// existing card; screenshots approved by the agency owner. No new private details.
export const agencyCase = {
  id: 'agency',
  kicker: 'At work · Arrow Group Consulting · 2026',
  title: 'Agency email & SMS platform',
  outcome: 'The agency stops renting its marketing platform: a projected ~89% lower monthly platform cost, with no external build spend.',
  changed: [
    '6 client accounts live on the platform about 5 weeks after the first commit (Aug–Sep 2026)',
    'Now replacing GoHighLevel at the agency, with the old platform run in parallel',
    '3,200+ automated tests, run inside the Workers runtime so no test can send a real message',
    'Claude API helpers draft subject lines and preview text; OpenAI makes images',
  ],
  safety: 'Safe by default: test mode until switched on, opt-outs re-checked before every send, SMS blocked until A2P 10DLC approval, and 4-role default-deny access.',
  stack: ['TypeScript', 'Cloudflare Workers + Hono', 'D1', 'Queues', 'React', 'Resend', 'Twilio', 'Claude API'],
  gallery: [
    { src: '/work-thumbs/arrowplatform-1.png', w: 1600, h: 925, label: 'Client dashboard: the month at a glance, with a monthly report' },
    { src: '/work-thumbs/arrowplatform-2.png', w: 1600, h: 680, label: 'Campaigns: delivery, opens, clicks and unsubscribes for every send' },
  ],
  note: 'Private company platform, so there is no public link. Screenshots shown with the agency owner’s approval; the client’s name and figures are blurred.',
};

// Client work, shown as one compact list. `url` only where the domain still belongs to
// that client: adasclosetsau.com and aoutilityservices.com now redirect to other brands.
// Ada's Closet's site is arrowconsignment.com (Josh confirmed, 2026-10-20).
export const clientWork = [
  { name: 'Alpha Omega Safety Solutions', place: 'Michigan', line: 'Built the website, plus approved business texting (A2P 10DLC brand registration on GoHighLevel), email and domain setup.', url: 'https://aosafe.com' },
  { name: 'HOME.FM', place: 'Spring Arbor, MI', line: 'Built the website, plus email that reaches the inbox: a dedicated sending subdomain with SPF/DKIM/DMARC, warmed to 6,500 emails a day.', url: 'https://listenhome.fm' },
  { name: 'Ada’s Closet', place: 'Spring Arbor, MI', line: 'Built the website and back-office for a student consignment startup: listings to Poshmark, eBay and Depop, live inventory, sale alerts in Apps Script.', url: 'https://www.arrowconsignment.com/' },
  { name: 'Alliance Service Brands', place: 'Jackson, MI', line: 'Built one custom website that unifies six home-service brands.', url: 'https://www.allianceservicebrands.com' },
  { name: 'Endtime Entrepreneurs', place: 'USA', line: 'Built the website from scratch on Cloudflare Pages, plus CRM, music distribution and SEO.', url: 'https://endtimeentrepreneurs.com' },
  { name: 'TrueCare Chiropractic', place: 'Lansing, MI', line: 'Built the website, plus email marketing, upkeep and SEO for a chiropractic clinic.', url: 'https://www.truecarechiro.com' },
];

// "What I build": three offers, framed as what the business gets.
export const offers = [
  {
    id: 'busywork',
    title: 'Take the busywork off your team',
    body: 'AI workflows that read, sort, draft and reply: inbound email, leads, applications, support. Code enforces the rules and caps; a person approves the exceptions.',
    proof: { label: 'AI Job Hunt engine', href: '/work/ai-job-hunt/' },
  },
  {
    id: 'content',
    title: 'Content at a cost you know first',
    body: 'AI production pipelines (scripts, images, voice, video) that show a cost estimate before every paid step and never publish without a yes.',
    proof: { label: 'AI Video Engine', href: '/work/ai-video-engine/' },
  },
  {
    id: 'own',
    title: 'Own your tools instead of renting them',
    body: 'Internal platforms on Cloudflare Workers and D1 that replace per-seat software: built fast with Claude Code, covered by tests, safe by default.',
    proof: { label: 'Agency email & SMS platform', href: '#work-agency' },
  },
];

// "Work with me": for business owners. Wording, prices and steps exactly as Josh set them
// (2026-10-20, final: lead with a monthly partnership). No testimonials yet, no other guarantees.
export const PROJECT_HASH = '#start-a-project'; // lands on the contact form with "A project for my business" picked
export const workWithMe = {
  title: 'I build your custom system, then keep it running every month.',
  body: 'The tools your team runs on every day: a client portal, an AI lead pipeline, an internal dashboard, an email/SMS platform. Built around how you work, not forced into a generic app.',
  monthly: '$1,000/month',
  build: '$2,500',
  // Real systems I built that show the kind of thing, each with its own page or section.
  examples: [
    { label: 'AI job hunt platform', note: 'An AI pipeline that vets, screens for scams and drafts honest applications', href: '/work/ai-job-hunt/' },
    { label: 'Agency email & SMS platform', note: 'An agency’s own platform, now replacing GoHighLevel', href: '#work-agency' },
    { label: 'AI video engine', note: 'Content at a cost known before it runs', href: '/work/ai-video-engine/' },
  ],
  steps: [
    { title: '15-minute call', body: 'Free. Tell me the busywork.' },
    { title: 'Fixed quote', body: 'One clear price for the build.' },
    { title: 'I build it', body: 'You approve what goes out.' },
    { title: 'I run it', body: 'And improve it every month.' },
  ],
};

// Numbers, each with its source. Business results lead, then costs, then test counts;
// the one marketing figure sits under the grid.
export const results = [
  { value: '~89%', label: 'lower monthly platform cost for the agency (projected, not yet measured)', href: '#work-agency' },
  { value: '6,500/day', label: 'emails from HOME.FM’s sending domain, which I set up and warmed', href: '#clients' },
  { value: '6 in ~5 wks', label: 'client accounts live on the agency platform after the first commit', href: '#work-agency' },
  { value: '~$1', label: 'per finished AI video, vs ~$12 for paid generative video', href: '/work/ai-video-engine/' },
  { value: '$0.72', label: 'real API cost of a 2-part AI video story ($0.49 + $0.23)', href: '/work/ai-video-engine/' },
  { value: '~$1–2.50', label: 'estimated AI cost of a full job-hunt day, under a hard daily dollar budget', href: '/work/ai-job-hunt/' },
  { value: '3,200+', label: 'automated tests on the agency platform', href: '#work-agency' },
  { value: '700+', label: 'automated tests on the AI job hunt platform, run with no network', href: '/work/ai-job-hunt/' },
  { value: '406 + 300', label: 'unit tests and acceptance checks on the AI video engine', href: '/work/ai-video-engine/' },
];
export const agencyMarketingResult = 'From agency email work: a nonprofit’s average click rate went from 4.5% (April 2026) to 9.5% (May 2026). Two months compared, not an A/B test.';

export const bio = 'I ship production systems by directing AI coding agents (Claude Code), and I put AI inside them: Claude and OpenAI do the reading, writing and generating; the code around them keeps every step checked, capped and approved by a person. At a US marketing agency I am the technical lead for client onboarding and built its in-house email and SMS platform. Before that, about 6 months as a marketing VA with US founders.';

export const setup = [
  'Olongapo City, Philippines · US Eastern hours preferred; PH, AU or European hours also work',
  'Laptop, two internet providers (one as backup), and a UPS for the internet router',
  'English (professional working proficiency), Filipino (native)',
];

export const education = 'BS Computer Science, Gordon College (2021–2025). Thesis published at IRCITE 2025 (Bulacan State University). Senior High School, TVL–ICT, Columban College, With High Honors.';

// Described as the v8 CV does.
export const experience = [
  {
    role: 'AI & Systems Lead',
    company: 'Arrow Group Consulting',
    meta: 'US outsourced-CMO agency · Michigan, USA (remote) · Part-time contract, on-call',
    dates: 'Feb 2026 — Present',
    bullets: [
      'Built and launched the agency’s in-house email/SMS platform with AI-assisted development in Claude Code: 6 client accounts live on it about 5 weeks after the first commit (Aug–Sep 2026). The agency is now replacing GoHighLevel with it.',
      'Added Claude features: drafting helpers for subject lines and preview text, plus Claude Haiku 4.5 subject lines, revision suggestions, a help chat and task-image analysis in the team’s daily content-operations app.',
      'Wrote the business case (projected ~89% lower monthly platform cost, no external build spend) and planned a phased migration of 10,000+ client contacts, running the old platform in parallel.',
      'Handle 8 of the agency’s clients at once as their technical lead: onboarding end to end (GoHighLevel, Cloudflare sites, DNS, SPF/DKIM/DMARC, A2P 10DLC), explained in plain language on onboarding calls.',
      'Built client back-office tools on Cloudflare Workers (a nonprofit funnel-tracker dashboard and a resale startup’s admin dashboard) and integrated Square payments through the Square API.',
    ],
  },
  {
    role: 'Virtual Marketing Assistant (VMA), agency placement',
    company: 'Doneverse',
    meta: 'Philippines · matches marketing talent with US founders',
    dates: 'Sep 2025 — Feb 2026 · about 6 months',
    bullets: [
      'Marketing VA for 2 US founders: Arrow Group Consulting’s founder (which led to a direct hire), then keynote speaker Jonathan Fanning (Kajabi).',
      'Built sites on Wix Studio; tools used included Mailchimp, HubSpot, Kajabi, GoHighLevel, ActiveCampaign and Jotform.',
      'Learned HubSpot on the job, then recommended HubSpot and ActiveCampaign; the agency adopted both, and ActiveCampaign fixed one client’s Mailchimp login errors.',
    ],
  },
];

export const earlierExperience = 'Earlier (2024–2025, during college): working student doing social media for ADAP Real Estate, Subic.';

// Web3Forms access keys are public by design (they only route the form to one inbox).
export const WEB3FORMS_ACCESS_KEY = 'babb1c1a-29c2-466a-a459-aab61c331600';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
