// The full case study. Every fact comes from Behind Works' own notes (the CRM, "Pipeline",
// and the quote follow-up offer), the v9 CV and the live demo at behindworks.com/how-it-works.
// No clients, results or testimonials are claimed: Behind Works has none yet.
//
// Diagram nodes: kind = 'input' | 'ai' | 'code' | 'gate' | 'human'. `tag` is the small
// mono label in each box. Two rows max; row 2 runs right-to-left under row 1 (a "snake").

export const behindWorks = {
  slug: 'behind-works',
  path: '/work/behind-works/',
  num: '01',
  name: 'Behind Works: quote follow-up',
  kicker: 'Co-founded studio · 2026',
  outcome: 'Follow-ups after every quote that stop the moment the customer replies, on a CRM I built.',
  summary: 'Behind Works is a small automation studio for home-service businesses that I co-founded. I built its quote follow-up system: after a quote goes out, a short series of follow-up emails is scheduled, and it stops when the customer replies, unsubscribes, bounces or the deal closes. The owner gets a Monday report of quotes won. It runs on the CRM I built underneath it, on Cloudflare, and nothing sends without approval.',
  seo: 'Case study: a quote follow-up system for home-service businesses and the CRM under it (contacts, a 7-stage pipeline board, forms, email templates, campaigns), built on Cloudflare Workers, Hono and D1, with follow-ups that stop on a reply and an approval queue before anything sends.',
  problem: 'A home-service owner sends a quote, then gets busy. A quote with no second message is easy to lose to whoever followed up. Doing it by hand means remembering every quote, every day, and remembering to stop the moment the customer answers.',
  businessAngle: 'The same shape fits any business that loses deals to silence: the system remembers every follow-up, code decides when to stop, and a person approves what goes out.',
  constraints: [
    'Stop the moment the customer replies. Never email someone who already answered.',
    'Respect every opt-out, remembered per address.',
    'Nothing sends without approval.',
  ],
  diagram: {
    title: 'How the quote follow-up works',
    rows: [
      [
        { kind: 'input', tag: 'QUOTE SENT', title: 'A quote goes out', sub: 'The customer lands on the pipeline board' },
        { kind: 'code', tag: 'CRON', title: 'Follow-ups scheduled', sub: 'Short emails, spaced out' },
        { kind: 'human', tag: 'OWNER', title: 'Approval queue', sub: 'Nothing sends without approval' },
        { kind: 'code', tag: 'WORKER', title: 'Sends on schedule', sub: 'Only after approval' },
      ],
      [
        { kind: 'gate', tag: 'STOP RULES', title: 'Stops by itself', sub: 'Reply, unsubscribe, bounce or closed deal' },
        { kind: 'input', tag: 'MONDAY', title: 'Weekly report', sub: 'Quotes won, for the owner' },
      ],
    ],
    note: 'Opt-outs are remembered per address, so a customer who unsubscribed stays opted out.',
  },
  built: [
    { title: 'Quote follow-up', body: 'When a quote goes out, the system schedules a short series of follow-up emails. The owner gets a Monday report of the quotes won. A demo of the whole flow is live at behindworks.com/how-it-works.' },
    { title: 'Stop rules', body: 'Follow-ups end on a reply, an unsubscribe, a bounce or a closed deal. Opt-outs are remembered per address, so that person stays opted out.' },
    { title: 'The CRM underneath', body: 'Contacts, a 7-stage pipeline board, hosted forms, designed email templates and campaigns. The quote follow-up is one campaign running on it.' },
    { title: 'An approval queue', body: 'Every email waits in an approval queue before it sends, so a person sees what goes out in the business’s name.' },
    { title: 'Covered by tests', body: '700+ automated tests run against a stand-in for the database, with no server and no network.' },
  ],
  decisions: [
    { chose: 'Stop the follow-ups in code, on every reply', rejected: 'Leaving the owner to cancel them by hand', why: 'A follow-up after the customer already answered looks careless. The stop rules (reply, unsubscribe, bounce, closed deal) end the sequence by themselves.' },
    { chose: 'An approval queue before anything sends', rejected: 'Sending automatically from day one', why: 'Every email carries the business’s name. A person approves what goes out.' },
    { chose: 'Run on Cloudflare Workers with Cron Triggers', rejected: 'A scheduled task on my PC', why: 'Follow-ups are due on their day, whether or not any computer of mine is on.' },
  ],
  broke: [
    { title: 'A database limit local tests would miss', body: 'Cloudflare D1 refuses a LIKE pattern longer than 50 bytes, while plain SQLite accepts it. Search uses instr() instead, and the D1 stand-in the 700+ tests run against enforces the same 50-byte rule, so it cannot creep back in.' },
    { title: 'One login, more than one Cloudflare account', body: 'My Cloudflare login can see more than one account, and wrangler stops at an account picker in scripts. The project pins its account_id in wrangler.toml and the key script pins it too, so a deploy or a secret cannot land in the wrong account.' },
  ],
  results: [
    // `short` is the caption in the home page's three-up proof row; the case study shows `label`.
    { value: '4', label: 'ways a follow-up ends without anyone touching it: a reply, an unsubscribe, a bounce or a closed deal', short: 'ways follow-ups stop: reply, unsubscribe, bounce, closed deal' },
    { value: '700+', label: 'automated tests on the CRM, run with no server and no network', short: 'automated tests, run with no network' },
    { value: '7', label: 'stages on the pipeline board every contact moves through', short: 'stage pipeline board under it' },
    { value: 'Mondays', label: 'the owner gets a report of the quotes won' },
  ],
  stack: ['JavaScript', 'Cloudflare Workers', 'Hono', 'D1', 'Cron Triggers', 'Email Routing', 'Google Apps Script', 'Gmail API', 'Built with Claude Code'],
  shots: [
    { src: '/media/bw-followups-stop.webp', w: 1280, h: 720, label: 'From the demo: the customer replies, and the follow-ups still due are stopped.' },
    { src: '/media/bw-monday-report.webp', w: 1280, h: 720, label: 'From the demo: the owner’s Monday report.' },
  ],
  phoneShots: [
    { src: '/media/bw-phone-home.webp', w: 375, h: 812, label: 'behindworks.com on a phone (live site)' },
    { src: '/media/bw-phone-how.webp', w: 375, h: 812, label: 'behindworks.com/how-it-works on a phone, where the demo video plays' },
  ],
  overlayPhone: false,
  shotsNote: 'Demo stills use a made-up company and sample data, as labeled in the demo. Phone shots: the live behindworks.com home page and its how-it-works page.',
};

export const cases = [behindWorks];
