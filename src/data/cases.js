// The full case study. Every fact comes from the project's own README / CLAUDE.md /
// GOTCHAS.md (Behind Works Pipeline) or the v8 CV. Nothing is estimated here
// unless the source calls it an estimate.
//
// Diagram nodes: kind = 'input' | 'ai' | 'code' | 'gate' | 'human'. `tag` is the small
// mono label in each box. Two rows max; row 2 runs right-to-left under row 1 (a "snake").

export const jobHunt = {
  slug: 'ai-job-hunt',
  path: '/work/ai-job-hunt/',
  num: '01',
  name: 'AI Job Hunt engine',
  kicker: 'Own product · live since 20 Oct 2026 · runs every day',
  outcome: 'An AI system that checks job fit, catches scams and drafts honest applications, with my approval.',
  summary: 'Every day from 7 AM Manila time, Claude Opus 5.5 vets new remote AI roles from five public job boards: fit, scam risk and pay. It drafts an application for the best ones, and a second Claude pass strips any claim that is not in my CV. Job posts are treated as untrusted text, the send rules live in the database, and a hard daily budget caps the AI spend. Anything unclear waits for me. It runs on my own outreach platform (Behind Works) on Cloudflare, with my PC off.',
  seo: 'Case study: an AI job-fit system on Claude Opus and Cloudflare Workers that vets remote roles, screens for scams and prompt injection, drafts honest applications for my approval, enforces its rules in the database and caps its daily AI cost.',
  problem: 'Applying well is a part-time job: finding real remote roles, judging fit, writing an honest tailored application, sending it, then answering replies fast. By hand it ate my evenings, and rushing it means weak, generic applications.',
  businessAngle: 'The same shape fits any team that qualifies leads, triages inbound email or screens applications: AI does the reading and drafting, code enforces the rules, and a person approves the exceptions.',
  constraints: [
    'Run with my PC off.',
    'Never claim anything that is not in my CV.',
    'Spend no more than a fixed amount on AI per day.',
    'Send from my real Gmail, so replies land in the same thread.',
    'Read only job boards that publish an API for programs. No scraping.',
    'Interview times, pay talk, tests and offers always wait for me.',
  ],
  diagram: {
    title: 'How the AI job hunt works',
    rows: [
      [
        { kind: 'input', tag: 'DAILY · 7 AM', title: '5 public job APIs', sub: 'Up to 30 new AI roles a day' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Vet each post', sub: 'Fit 1–10, scam risk, pay' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Write the best 10', sub: 'JSON in a fixed schema' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Honesty check', sub: 'Removes anything not in my CV' },
        { kind: 'gate', tag: 'D1 CHECK', title: 'Rules gate', sub: 'Strong fit, low scam risk, nothing to ask' },
      ],
      [
        { kind: 'human', tag: 'ME', title: 'My approval', sub: 'Anything unclear waits for me' },
        { kind: 'code', tag: 'APPS SCRIPT', title: 'Gmail bridge', sub: 'Sends from my Gmail with CV' },
        { kind: 'input', tag: 'GMAIL THREAD', title: 'Employer replies', sub: 'Stored in the same thread' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Drafts the answer', sub: 'Interview, pay, tests wait for me' },
      ],
    ],
    note: 'Budget: a hard daily spend cap, and at most 3 Claude calls each time the engine checks in (every 5 minutes). Job posts and emails reach Claude as untrusted data.',
  },
  built: [
    { title: 'Find and vet', body: 'Every day from 7 AM Manila time the Worker reads five public job APIs (Himalayas, Jobicy, RemoteOK, Remotive, Arbeitnow) and keeps up to 30 new AI roles. Claude Opus 5.5 vets each one: fit 1–10, apply / maybe / skip, scam risk, pay and how to apply.' },
    { title: 'Screen for scams and prompt injection', body: 'Job posts and employer emails reach Claude as data inside <untrusted_…> tags. A post that tries to instruct Claude, or asks for applications to a free email address, turns into a “maybe” for me, and a scam risk that is not low never goes anywhere by itself.' },
    { title: 'Write, then check for honesty', body: 'Claude writes the best 10 by fit as JSON in a fixed schema. A second, adversarial Claude pass removes anything not in my CV, and a check in code blocks claims I must not make (tools I don’t use, more than about a year of experience, the agency’s name).' },
    { title: 'Rules in the database, not the prompt', body: 'Anything unclear (a question for me, a gap in my CV, a scam risk that is not low) waits in my approval queue. The one exception is narrow and can be switched off: a clean, strong fit with nothing to ask me may send itself after a 3-hour hold that I can stop. A database CHECK constraint refuses any other self-sending row, and the queue checks again right before sending.' },
    { title: 'A hard daily cost cap', body: 'Every Claude call is priced from its token usage and stored. Once the day’s spend reaches the budget, no more calls are made until the next Manila day. A full day (30 posts read, 10 written and checked) is usually about $1–2.50, estimated.' },
    { title: 'Send from my own Gmail', body: 'A Google Apps Script “Gmail bridge” claims approved applications every 5 minutes through secret-authenticated routes and sends them from my Gmail with my CV attached, at most 10 a day. If a send is never reported, the script looks in Sent instead of sending twice.' },
    { title: 'Answer employers in the thread', body: 'The bridge brings employer emails back into the application’s thread. Claude drafts an answer: simple facts (CV, availability, timezone) may go by themselves; interview times, tests, offers, pay or anything not in my CV waits for me.' },
  ],
  decisions: [
    { chose: 'Enforce the send rules in the database', rejected: 'Trusting the prompt and the app code alone', why: 'A prompt can be talked around and code can regress. With a CHECK constraint a row that breaks the rules cannot even be stored, and the queue re-checks before every send.' },
    { chose: 'Send through my own Gmail (Apps Script)', rejected: 'A transactional email service', why: 'Applications come from a real inbox, employers reply in the same thread, and the bridge reads those replies back into the app.' },
    { chose: 'Run inside the Worker’s 5-minute cron', rejected: 'A scheduled task on my PC', why: 'It runs with my PC off. At most 3 Claude calls per run, and none started after 20 seconds, keep each run inside the Worker’s limits. The PC task stays as a backup.' },
  ],
  broke: [
    { title: 'Day one: approved emails did not send', body: 'On launch day (Oct 13) my first 20 approved outreach emails sat for hours, and the Worker log showed no cron runs at all. It cleared overnight and the cause was never confirmed, so I don’t claim a fix. What I do now: if an approval has not sent within a day, the cron log is the first place I look, and “Send due emails now” names the reason (outside the window, cap reached, no app URL). All 20 went out 10 a day on Oct 14–15, with no bounces.' },
    { title: 'A database limit local tests would miss', body: 'Cloudflare D1 refuses a LIKE pattern longer than 50 bytes, while plain SQLite accepts it. Search uses instr() instead, and the D1 stand-in the 700+ tests run against enforces the same 50-byte rule, so it cannot creep back in.' },
    { title: 'One login, more than one Cloudflare account', body: 'My Cloudflare login can see more than one account, and wrangler stops at an account picker in scripts. The project pins its account_id in wrangler.toml and the key script pins it too, so a deploy or a secret cannot land in the wrong account.' },
  ],
  results: [
    { value: '30/day', label: 'new remote roles vetted by Claude for fit, scam risk and pay' },
    { value: '~$1–2.50', label: 'estimated AI cost of a full day (30 posts read, 10 written and checked), under a hard daily budget' },
    { value: 'Every day', label: 'live since 20 Oct 2026: the search starts at 7 AM Manila and the engine checks in every 5 minutes, PC off' },
    { value: '700+', label: 'automated tests, run with no server and no network' },
    { value: '10/day', label: 'application cap; at most 15 drafted answers a day' },
    { value: '0', label: 'bounces on the first 20 approved outreach emails, sent 10 a day on schedule' },
  ],
  stack: ['Claude API (Opus 5.5, adaptive thinking, JSON schema)', 'Cloudflare Workers', 'Hono', 'D1', 'Cron Triggers', 'Email Routing', 'Google Apps Script', 'Gmail API', 'Built with Claude Code'],
  shots: [
    { src: '/media/jobhunt-approve.webp', w: 800, h: 500, label: 'To approve: Claude’s drafted applications with their fit scores, waiting in my queue.' },
    { src: '/media/jobhunt-replies.webp', w: 800, h: 500, label: 'Replies: an employer wrote back and Claude drafted the answer. Pay and start date are left for me.' },
  ],
  phoneShots: [
    { src: '/media/jobhunt-phone-list.webp', w: 375, h: 812, label: 'The same queue on a phone' },
    { src: '/media/jobhunt-phone-detail.webp', w: 375, h: 812, label: 'One application: why it fits, the gaps, and Claude’s question for me' },
  ],
  shotsNote: 'Screenshots use the app’s demo data (example.com addresses), not real applications.',
};

export const cases = [jobHunt];
