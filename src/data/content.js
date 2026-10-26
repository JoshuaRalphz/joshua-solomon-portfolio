// All copy for the home page lives here. Case-study copy lives in ./cases.js.
//
// Positioning (Josh, 2026-10-20): AI Solutions Engineer. Lead with systems shipped,
// told as business problem -> what I built -> what changed, tech second.
// Facts only from the v8 CV, the Behind Works Pipeline README, the Lux work pack
// (applications/lux-work-pack: work-pack.html, arrow-results.md) and Josh's own
// statements. No invented numbers, clients or titles.
// Never show the AI short-video side project to employers (Josh, 2026-10-21).

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
  { id: 'work', num: '01', label: 'Work' },
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
  { value: '82.7k', label: 'emails delivered in 54 campaigns on the agency platform I built (Sep 17 – Oct 25, 2026)' },
  { value: '9.5%', label: 'a nonprofit client’s email click rate in May 2026, up from 4.5% in April (two months compared)' },
];

// "How my AI systems run": a process, not live data.
export const flow = [
  { label: 'Trigger', caption: 'A schedule, an email, a form or a request in chat' },
  { label: 'AI does the work', caption: 'Claude reads, scores and drafts; OpenAI makes images' },
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
  { name: 'GoHighLevel', icon: null },
  { name: 'Apps Script + Gmail API', icon: 'siGoogleappsscript' },
  { name: 'React', icon: 'siReact' },
];
export const alsoUsed = 'HubSpot, Mailchimp, ActiveCampaign, Kajabi, Wix Studio, Jotform, Resend, Twilio, Square API, Firebase, Vercel.';

// The shorter third case, shown on the home page only. Facts from the v8 CV and the
// existing card; screenshots approved by the agency owner. No new private details.
export const agencyCase = {
  id: 'agency',
  kicker: 'At work · Arrow Group Consulting · 2026',
  title: 'Agency email & SMS platform',
  outcome: 'The agency stops renting its marketing platform: a projected ~89% lower monthly platform cost, with no external build spend.',
  changed: [
    '6 client accounts live on the platform about 5 weeks after the first commit (Aug–Sep 2026)',
    'Replaced GoHighLevel at the agency: the $297-a-month plan was cancelled in Sep 2026; 9 client accounts and 11,600+ contacts now run on it',
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

// Client work, "my contribution" cards: screenshot, role tag, one first-person line,
// a link out and a "Read more" project overview. `thumb` names public/work-thumbs/<thumb>.png
// (+ -640/-1280.webp), a 1440x900 capture of the live homepage. `url` only where the domain
// still belongs to that client: adasclosetsau.com and aoutilityservices.com now redirect to other brands.
// Ada's Closet is now Arrow Consignment (arrowconsignment.com); adasclosetsau.com still answers.
// Campaign figures: arrow-results.md (human clicks only, link-scanner bots filtered out).
export const clientWork = [
  {
    name: 'Alpha Omega Safety Solutions',
    thumb: 'aosafe',
    url: 'https://aosafe.com',
    role: 'Website · business texting · email',
    line: 'I built their website, got the business approved for texting (A2P 10DLC on GoHighLevel), and set up their email and domain.',
    overview: [
      'A safety-training company in Michigan. I built the website, set up their email and domain, and registered the business for A2P 10DLC on GoHighLevel so it can send texts.',
      'I also write, design and send their email campaigns, like the monthly “Safety Bullet” safety bulletin.',
    ],
  },
  {
    name: 'HOME.FM',
    thumb: 'homefm',
    url: 'https://listenhome.fm',
    role: 'Website · email deliverability · lead pipeline',
    line: 'I built the website and set up email that reaches the inbox: a dedicated sending subdomain, warmed to 6,500 emails a day.',
    overview: [
      'A radio station in Spring Arbor, Michigan. I set up a dedicated sending subdomain with SPF, DKIM and DMARC and warmed it to 6,500 emails a day, for weekly emails to about 3,250 people.',
      'Their website forms feed a sales pipeline: from Sep 9 to Oct 25, 2026, 20 deals were created automatically from form submissions. My “Your ad reaches 15,000+ listeners” email reached 3,348 inboxes and 1.5% clicked.',
    ],
  },
  {
    name: 'Arrow Consignment',
    thumb: 'adas',
    url: 'https://www.arrowconsignment.com/',
    role: 'Website · back-office',
    line: 'I built the website and back-office for a student consignment startup: listings to Poshmark, eBay and Depop, live inventory and sale alerts.',
    overview: [
      'A student consignment startup in Spring Arbor, Michigan. I built the launch website and the back-office behind it: items list to Poshmark, eBay and Depop, inventory stays live, and Apps Script sends an alert when something sells.',
    ],
  },
  {
    name: 'Alliance Service Brands',
    thumb: 'alliance',
    url: 'https://www.allianceservicebrands.com',
    role: 'Custom website',
    line: 'I built one custom website that brings six home-service brands under one look.',
    overview: [
      'A group of six home-service brands in Jackson, Michigan. I built the custom website that brings all six under one look.',
    ],
  },
  {
    name: 'Endtime Entrepreneurs',
    thumb: 'endtime',
    url: 'https://endtimeentrepreneurs.com',
    role: 'Website · CRM · SEO',
    line: 'I built the website from scratch on Cloudflare Pages, plus their CRM, music distribution and SEO.',
    overview: [
      'A US business. I built the full website from scratch on Cloudflare Pages, and set up the CRM, email marketing, domain, music distribution and SEO.',
    ],
  },
  {
    name: 'TrueCare Chiropractic',
    thumb: 'truecare',
    url: 'https://www.truecarechiro.com',
    role: 'Website · email · SEO · Google Ads',
    line: 'I built the website, and I handle their email marketing, Google Ads, upkeep and SEO.',
    overview: [
      'A chiropractic clinic in Lansing, Michigan. When their contact form came under a bot attack, the spam filter and bot check I set up blocked about 2,480 junk submissions, and the real enquiries still came through.',
      'I write and send their patient emails: the new-doctor announcement reached 2,330 patients and the World Spine Day email 2,297.',
    ],
  },
];

// Three client projects rebuilt in GoHighLevel sample sub-accounts (Oct 2026). Facts and
// screenshots from the Lux work pack. The Lux Seats Four Us concept demo is left out on
// purpose: it uses Lux's own photos and brand.
export const GHL_REBUILD_LABEL = 'Rebuilt in GoHighLevel by Joshua Solomon from his original client work.';
export const GHL_SAMPLE_NOTE = 'Why rebuilt: these clients now run on the in-house email and lead platform I built for the agency, which replaced its $297-a-month GoHighLevel plan. I rebuilt their funnels in GoHighLevel to show the same work on the platform most teams use.';
export const ghlRebuilds = [
  {
    id: 'ghl-truecare',
    name: 'TrueCare Chiropractic',
    img: '/work/ghl/truecare',
    url: 'https://sites.leadconnectorhq.com/preview/0sXx0W6SW3eu0wplFB2x',
    role: 'GoHighLevel · funnel, pipeline, workflow',
    line: 'I rebuilt their new-patient path in GoHighLevel: a funnel page with their real photos and offer, a native form, a pipeline and a follow-up workflow.',
    overview: [
      'A new request lands in the “New Patient Requests” pipeline. The workflow sends an instant text and a confirmation email with what the first visit includes, alerts the front desk to call, and texts again on day 1 if the patient hasn’t booked. It stops as soon as they reply.',
      'I also rebuilt the new-doctor email I sent for them as a GoHighLevel email template.',
    ],
    pipeline: { src: '/work/ghl/truecare-pipeline-1040.webp', alt: 'The New Patient Requests pipeline in GoHighLevel, with a lead in the first stage' },
  },
  {
    id: 'ghl-bbbs',
    name: 'Big Brothers Big Sisters of Jackson County',
    img: '/work/ghl/bbbs',
    url: 'https://sites.leadconnectorhq.com/preview/5ICjHk65OeRXB9SJ7ZNc',
    role: 'GoHighLevel · volunteer funnel, pipeline',
    line: 'I rebuilt their volunteer recruiting path in GoHighLevel: a “Become a Big” page with their own photos and numbers, a volunteer form, a pipeline and a follow-up workflow.',
    overview: [
      'An inquiry lands in “Volunteer Inquiries”. The workflow sends an instant thank-you text with the office number and a welcome email on the two ways to mentor, alerts the match team to call within 2 business days, and on day 2 texts an invite to an info session. It stops as soon as they reply.',
      'The Game Day Gala thank-you email I sent for them is rebuilt as a GoHighLevel email template. It is based on the bbbsjackson.org forms and emails I run.',
    ],
    pipeline: { src: '/work/ghl/bbbs-pipeline-1040.webp', alt: 'The Volunteer Inquiries pipeline in GoHighLevel, with a lead in the first stage' },
  },
  {
    id: 'ghl-homefm',
    name: 'HOME.FM 106.9',
    img: '/work/ghl/homefm',
    url: 'https://sites.leadconnectorhq.com/preview/tEGtKscf2eVlYinHAVzr',
    role: 'GoHighLevel · ad sales, through to the invoice',
    line: 'I rebuilt their advertiser path in GoHighLevel: the ad page with their real packages ($500 to $2,500 a month), an inquiry form, a pipeline, a follow-up workflow and an invoice.',
    overview: [
      'An inquiry lands in the “Advertiser Pipeline”. The workflow texts that a rep will call within 1 business day, emails the plans (from $500 a month) and alerts the sales rep. If there is no reply, a follow-up text goes out on day 1.',
      'After the call the rep sends the plan and invoice from GoHighLevel. The invoice for the $950 Community Champion plan is linked to the deal, ready to send.',
    ],
    pipeline: { src: '/work/ghl/homefm-pipeline-1040.webp', alt: 'The Advertiser Pipeline in GoHighLevel, with a made-up test deal' },
  },
];

// Emails Joshua built and launched on the agency platform: table A of arrow-results.md only
// (the Workspace task record names him). Delivered = campaigns.delivered. No click figures here.
// Images: public/work/emails/<img>-thumb|desktop|phone.webp; desktopH/phoneH are CSS px heights
// at the 600px desktop and 375px phone widths.
export const emailCampaigns = {
  kicker: 'At work · Arrow Group Consulting · Sep–Oct 2026',
  title: 'Email campaigns I launched',
  outcome: 'Emails I built and launched for agency clients on the platform I built, Sep–Oct 2026.',
  totals: '34 campaigns · 69,000+ inboxes',
  items: [
    { img: 'homefm-heat-holidays', client: 'HOME.FM 106.9', subject: 'Heat for the Holidays: nominate a Jackson County family by Oct. 31', date: 'Oct 8, 2026', delivered: '3,221', desktopH: 2002, phoneH: 2314 },
    { img: 'aoss-safety-bullet', client: 'Alpha Omega Safety Solutions', subject: 'Safety Bullet: Eyes on the line save lives.', date: 'Oct 14, 2026', delivered: '649', desktopH: 2894, phoneH: 3634 },
    { img: 'bbbs-game-day-gala', client: 'Big Brothers Big Sisters of Jackson County', subject: 'Game Day Gala: thank you, Jackson County', date: 'Oct 14, 2026', delivered: '903', desktopH: 2535, phoneH: 2963 },
    { img: 'truecare-spine-day', client: 'TrueCare Chiropractic', subject: 'World Spine Day, October 16: 4 small steps for your spine', date: 'Oct 19, 2026', delivered: '2,297', desktopH: 2191, phoneH: 2311 },
    { img: 'homefm-christmas-sponsors', client: 'HOME.FM 106.9', subject: 'Christmas Music Around the Clock: sponsor spots now open', date: 'Oct 20, 2026', delivered: '3,238', desktopH: 2957, phoneH: 3553 },
    { img: 'sau-tennis-pro-am', client: 'SAU Tennis', subject: 'Thank you for the Pro-Am: see what’s next at Jones', date: 'Oct 6, 2026', delivered: '350', desktopH: 4442, phoneH: 4297 },
    { img: 'arrow-consignment-new-name', client: 'Arrow Consignment', subject: 'Ada’s Closet is now Arrow Consignment', date: 'Oct 12, 2026', delivered: '11', audience: 'its consignors', desktopH: 1821, phoneH: 2038 },
    { img: 'homefm-top-teachers', client: 'HOME.FM 106.9', subject: 'Give a great teacher the recognition they’ve earned', date: 'Oct 1, 2026', delivered: '3,314', desktopH: 1917, phoneH: 2120 },
  ],
};

// Social graphics confirmed posted (arrow-results.md, "Social media graphics"): the public
// post's image matches the file. Unconfirmed or unposted ones are left out on purpose.
// Images: public/work/social/<img>-480|960.webp.
export const socialGraphics = {
  kicker: 'At work · Arrow Group Consulting · Sep–Oct 2026',
  title: 'Social media graphics',
  outcome: 'Graphics I designed for agency clients, as they went out on their pages.',
  items: [
    { img: 'truecare-strunk-1', w: 1080, h: 1350, client: 'TrueCare Chiropractic', what: 'New-doctor launch, post 1: the $88 new-patient special', platform: 'Facebook + Instagram', date: 'Oct 9, 2026' },
    { img: 'truecare-strunk-2', w: 1080, h: 1350, client: 'TrueCare Chiropractic', what: 'Post 2: meet the new doctor', platform: 'Facebook + Instagram', date: 'Oct 12, 2026' },
    { img: 'truecare-strunk-3', w: 1080, h: 1350, client: 'TrueCare Chiropractic', what: 'Post 3: what to expect at your first visit', platform: 'Facebook + Instagram', date: 'Oct 15, 2026' },
    { img: 'truecare-strunk-4', w: 1080, h: 1350, client: 'TrueCare Chiropractic', what: 'Post 4: K-Laser treatment included', platform: 'Facebook + Instagram', date: 'Oct 22, 2026' },
    { img: 'aoss-pole-yard', w: 1200, h: 1200, client: 'Alpha Omega Safety Solutions', what: '“Seven minutes at the pole yard”: a training partner’s lineworker video', platform: 'Facebook', date: 'Sep 4, 2026' },
  ],
};

// "What I build": three offers, framed as what the business gets.
export const offers = [
  {
    id: 'busywork',
    title: 'Take the busywork off your team',
    body: 'AI workflows that read, sort, draft and reply: inbound email, leads, applications, support. Code enforces the rules and caps; a person approves the exceptions.',
    proof: { label: 'AI Job Hunt engine', href: '/work/ai-job-hunt/' },
  },
  {
    id: 'leads',
    title: 'Follow up on every lead',
    body: 'Forms, pipelines and follow-up workflows in GoHighLevel: every enquiry gets an instant reply, lands in a pipeline and gets a follow-up, so no lead is forgotten.',
    proof: { label: 'GoHighLevel rebuilds', href: '#ghl-rebuilds' },
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
    { label: 'Agency email & SMS platform', note: 'An agency’s own platform, which replaced GoHighLevel', href: '#work-agency' },
    { label: 'GoHighLevel lead follow-up', note: 'Funnel page, form, pipeline and follow-up workflow, rebuilt from my client work', href: '#ghl-rebuilds' },
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
  { value: '~$1–2.50', label: 'estimated AI cost of a full job-hunt day, under a hard daily dollar budget', href: '/work/ai-job-hunt/' },
  { value: '3,200+', label: 'automated tests on the agency platform', href: '#work-agency' },
  { value: '700+', label: 'automated tests on the AI job hunt platform, run with no network', href: '/work/ai-job-hunt/' },
];
export const agencyMarketingResult = 'From agency email work: a nonprofit’s average click rate went from 4.5% (April 2026) to 9.5% (May 2026). Two months compared, not an A/B test.';

export const bio = 'I ship production systems by directing AI coding agents (Claude Code), and I put AI inside them: Claude and OpenAI do the reading, writing and generating; the code around them keeps every step checked, capped and approved by a person. At a US marketing agency I am the technical lead for client onboarding and built its in-house email and SMS platform. Before that, about 6 months as a marketing VA with US founders.';

export const setup = [
  'Olongapo City, Philippines · Remote, US hours (Eastern or Central, 10 PM to 7 AM Manila time)',
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
      'Built and launched the agency’s in-house email/SMS platform with AI-assisted development in Claude Code: 6 client accounts live on it about 5 weeks after the first commit (Aug–Sep 2026). It replaced the agency’s GoHighLevel plan, cancelled in Sep 2026, and now runs 9 client accounts and 11,600+ contacts.',
      'Added Claude features: drafting helpers for subject lines and preview text, plus Claude Haiku 4.5 subject lines, revision suggestions, a help chat and task-image analysis in the team’s daily content-operations app.',
      'Wrote the business case (projected ~89% lower monthly platform cost, no external build spend) and moved 11,600+ client contacts across before GoHighLevel was cancelled.',
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
