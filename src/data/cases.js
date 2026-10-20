// The two full case studies. Every fact comes from the project's own README / CLAUDE.md /
// GOTCHAS.md (yt-engine, Behind Works Pipeline) or the v8 CV. Nothing is estimated here
// unless the source calls it an estimate.
//
// Diagram nodes: kind = 'input' | 'ai' | 'code' | 'gate' | 'human'. `tag` is the small
// mono label in each box. Two rows max; row 2 runs right-to-left under row 1 (a "snake").

export const jobHunt = {
  slug: 'ai-job-hunt',
  path: '/work/ai-job-hunt/',
  num: '01',
  name: 'AI Job Hunt engine',
  kicker: 'Own product · platform live since Oct 2026 · hunt built to run unattended',
  outcome: 'A job search built to run itself, that only asks me about what matters.',
  summary: 'Claude Opus 5.5 finds remote AI roles, scores the fit, writes an honest application and drafts answers to employers, on Cloudflare’s cron with my PC off. A rule in the database decides what may send by itself; everything else waits for me. It runs on my own outreach platform (Behind Works), deployed on Cloudflare; the hunt stays switched off until my Claude API key is set.',
  seo: 'Case study: an unattended AI job-hunt engine on Claude Opus and Cloudflare Workers, with fit scoring, an honesty check, an auto-send gate enforced in the database and a Gmail bridge.',
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
        { kind: 'input', tag: 'CRON · 5 MIN', title: '5 public job APIs', sub: 'Up to 30 new AI roles a day' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Vet each post', sub: 'Fit 1–10, scam risk, pay' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Write the best 10', sub: 'JSON in a fixed schema' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Honesty check', sub: 'Removes anything not in my CV' },
        { kind: 'gate', tag: 'D1 CHECK', title: 'Auto-send gate', sub: 'Fit 8+, apply, nothing to ask' },
      ],
      [
        { kind: 'human', tag: 'ME', title: '3-hour hold', sub: 'Or I approve by hand' },
        { kind: 'code', tag: 'APPS SCRIPT', title: 'Gmail bridge', sub: 'Sends from my Gmail with CV' },
        { kind: 'input', tag: 'GMAIL THREAD', title: 'Employer replies', sub: 'Stored in the same thread' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Drafts the answer', sub: 'Interview, pay, tests wait for me' },
      ],
    ],
    note: 'Budget: at most 3 Claude calls per cron run and a hard daily spend cap. Job posts and emails reach Claude as untrusted data.',
  },
  built: [
    { title: 'Find and vet', body: 'Once a Manila day the Worker reads five public job APIs (Himalayas, Jobicy, RemoteOK, Remotive, Arbeitnow) and keeps up to 30 new AI roles. Claude Opus 5.5 vets each one: fit 1–10, apply / maybe / skip, scam risk, pay and how to apply.' },
    { title: 'Write, then check for honesty', body: 'Claude writes the best 10 by fit as JSON in a fixed schema. A second, adversarial Claude pass removes anything not in my CV, and a check in code blocks claims I must not make (tools I don’t use, more than about a year of experience, the agency’s name).' },
    { title: 'The gate', body: 'A strong fit (8+, “apply”, an address, nothing to ask me) sends by itself 3 hours later unless I hold it. The database refuses any other auto-send row with a CHECK constraint, and the queue checks again right before sending.' },
    { title: 'Send from my own Gmail', body: 'A Google Apps Script “Gmail bridge” claims approved applications every 5 minutes through secret-authenticated routes and sends them from my Gmail with my CV attached, at most 10 a day. If a send is never reported, the script looks in Sent instead of sending twice.' },
    { title: 'Answer employers in the thread', body: 'The bridge brings employer emails back into the application’s thread. Claude drafts an answer: simple facts (CV, availability, timezone) may go by themselves; interview times, tests, offers, pay or anything not in my CV waits for me.' },
    { title: 'Treat outside text as untrusted', body: 'Job posts and employer emails reach Claude as data inside <untrusted_…> tags. A post that tries to instruct Claude, or asks for applications to a free email address, turns into a “maybe” for me.' },
  ],
  decisions: [
    { chose: 'Enforce auto-send in the database', rejected: 'Trusting the prompt and the app code alone', why: 'A prompt can be talked around and code can regress. With a CHECK constraint a bad auto-send row cannot even be stored, and the queue re-checks before every send.' },
    { chose: 'Send through my own Gmail (Apps Script)', rejected: 'A transactional email service', why: 'Applications come from a real inbox, employers reply in the same thread, and the bridge reads those replies back into the app.' },
    { chose: 'Run inside the Worker’s 5-minute cron', rejected: 'A scheduled task on my PC', why: 'It runs with my PC off. At most 3 Claude calls per run, and none started after 20 seconds, keep each run inside the Worker’s limits. The PC task stays as a backup.' },
  ],
  broke: [
    { title: 'Day one: approved emails did not send', body: 'On launch day (Oct 13) my first 20 approved outreach emails sat for hours, and the Worker log showed no cron runs at all. It cleared overnight and the cause was never confirmed, so I don’t claim a fix. What I do now: if an approval has not sent within a day, the cron log is the first place I look, and “Send due emails now” names the reason (outside the window, cap reached, no app URL). All 20 went out 10 a day on Oct 14–15, with no bounces.' },
    { title: 'A database limit local tests would miss', body: 'Cloudflare D1 refuses a LIKE pattern longer than 50 bytes, while plain SQLite accepts it. Search uses instr() instead, and the D1 stand-in the 700+ tests run against enforces the same 50-byte rule, so it cannot creep back in.' },
    { title: 'One login, more than one Cloudflare account', body: 'My Cloudflare login can see more than one account, and wrangler stops at an account picker in scripts. The project pins its account_id in wrangler.toml and the key script pins it too, so a deploy or a secret cannot land in the wrong account.' },
  ],
  results: [
    { value: '700+', label: 'automated tests, run with no server and no network' },
    { value: '~$1–2.50', label: 'estimated AI cost of a full day (30 posts read, 10 written and checked), under a hard daily budget' },
    { value: '5 min', label: 'cron cycle on Cloudflare: built to run unattended, PC off' },
    { value: '10/day', label: 'application cap; at most 15 drafted answers a day' },
    { value: '0', label: 'bounces on the first 20 approved outreach emails, sent 10 a day on schedule' },
  ],
  stack: ['Claude API (Opus 5.5, adaptive thinking, JSON schema)', 'Cloudflare Workers', 'Hono', 'D1', 'Cron Triggers', 'Email Routing', 'Google Apps Script', 'Gmail API', 'Built with Claude Code'],
  shots: [
    { src: '/media/jobhunt-approve.webp', w: 800, h: 500, label: 'To approve: Claude’s applications with fit scores. The strong fit sends by itself in 3 hours unless I hold it.' },
    { src: '/media/jobhunt-replies.webp', w: 800, h: 500, label: 'Replies: an employer wrote back and Claude drafted the answer. Pay and start date are left for me.' },
  ],
  phoneShots: [
    { src: '/media/jobhunt-phone-list.webp', w: 375, h: 812, label: 'The same queue on a phone' },
    { src: '/media/jobhunt-phone-detail.webp', w: 375, h: 812, label: 'One application: why it fits, the gaps, and Claude’s question for me' },
  ],
  shotsNote: 'Screenshots use the app’s demo data (example.com addresses), not real applications.',
};

export const videoEngine = {
  slug: 'ai-video-engine',
  path: '/work/ai-video-engine/',
  num: '02',
  name: 'AI Video Engine',
  kicker: 'Own product · runs on my own PC · makes shorts for my own channel',
  outcome: 'A finished, captioned short from a one-line topic, for about $1 instead of about $12.',
  summary: 'Claude writes the script, OpenAI makes the images and the voice, and my FFmpeg engine renders a 1080×1920 video with burned captions and covers. A cost estimate comes first; nothing is spent or posted without a yes.',
  seo: 'Case study: an AI short-video pipeline on the Claude and OpenAI APIs with an FFmpeg render engine, a cost gate before paid steps and about $1 per finished video.',
  problem: 'Short videos need a script, visuals, a voice, captions and an edit for every post. Paid generative video costs about $12 a video and drifts between shots; doing it by hand takes hours each time.',
  businessAngle: 'Any team that needs a steady stream of content (product explainers, training clips, social posts) gets the same thing: AI drafts, code renders, a person approves before anything is published, at a cost known in advance.',
  constraints: [
    'About $1 per video, with a cost estimate before any paid step.',
    'Never post by itself: I approve and post every video.',
    'Render on my own PC: no hosted render bills.',
    'One file that works on TikTok, YouTube Shorts and Facebook Reels.',
    'A failed run must retry without paying twice.',
  ],
  diagram: {
    title: 'How the AI video engine works',
    rows: [
      [
        { kind: 'human', tag: 'ME · CHAT', title: 'A one-line topic', sub: 'Asked in Claude Code' },
        { kind: 'gate', tag: 'COST GATE', title: 'Estimate, then yes', sub: 'Paid steps blocked until I agree' },
        { kind: 'ai', tag: 'CLAUDE OPUS', title: 'Script and titles', sub: 'Checked against hook rules' },
        { kind: 'ai', tag: 'OPENAI', title: 'Images', sub: 'One style anchor per video' },
        { kind: 'ai', tag: 'OPENAI', title: 'Voiceover', sub: 'Text to speech' },
      ],
      [
        { kind: 'code', tag: 'FFMPEG', title: 'Render 1080×1920', sub: 'Motion, captions, ducked music' },
        { kind: 'code', tag: 'PYTHON', title: 'Covers and captions', sub: 'Per platform, ready to paste' },
        { kind: 'input', tag: 'LIBRARY', title: 'Watch on my phone', sub: 'Download, copy captions' },
        { kind: 'human', tag: 'ME', title: 'I post it', sub: 'Never auto-uploads' },
      ],
    ],
    note: 'Restart-safe job queue: a retry picks up where it stopped and never pays twice for a step it already has. Every video records its real cost.',
  },
  built: [
    { title: 'Run from chat', body: 'I ask Claude Code for a video. It drives the service through a small CLI and a Claude Code skill: estimate, make, status, retry. Paid commands are blocked until an explicit yes.' },
    { title: 'Script', body: 'Claude Opus 5.5 writes the script plus title, description and tags, checked against hook rules. It can also suggest topics from real YouTube search suggestions.' },
    { title: 'Images and voice', body: 'OpenAI makes the images and the voiceover. Claude sets one style-anchor sentence per video and the code adds it to every image prompt, so a video looks consistent. Providers are switchable (fal.ai, ElevenLabs).' },
    { title: 'Render', body: 'A custom FFmpeg engine adds Ken Burns motion, crossfades, burned captions and music ducked under the voice, then makes covers and ready-to-paste captions for TikTok, Shorts and Reels.' },
    { title: 'Queue and cost', body: 'A restart-safe job queue renders one video at a time. A retry never pays twice for a script, image or voiceover it already has, and every video records what it actually cost.' },
  ],
  decisions: [
    { chose: 'Motion on AI stills (Ken Burns)', rejected: 'Paid generative video', why: 'About $1 a video instead of about $12, and stills don’t morph or drift between cuts the way generated video does in explainers.' },
    { chose: 'One control path: Claude in chat', rejected: 'A web dashboard with make and retry buttons', why: 'Every paid action goes through one tool that shows the estimate and waits for a yes. The phone Library only watches, downloads and copies captions, so nothing there can spend money.' },
    { chose: 'Render on my own PC', rejected: 'A hosted render service', why: 'No per-minute render billing. A 24-second vertical video renders in about 37 seconds here (measured on the test run).' },
  ],
  broke: [
    { title: 'Every caption showed twice', body: 'Captions are burned into the video, but a caption file published next to the MP4 made VLC and mpv load it as a second track: every line twice, in another font. The caption script is now published under a name players don’t auto-load.' },
    { title: 'An 8-pixel black strip', body: 'One effect needs RGB frames, and at width 1080 FFmpeg 8.1.1’s conversion left an 8 px black strip down the right edge of the whole shot. Converting to rgb24 first fixed it, and a test now renders the effect and checks the last 8 columns of every frame.' },
    { title: 'The last word got clipped', body: 'Loudness normalization stamps its final audio a few dozen milliseconds late, so the length cut clipped the tail of the last word. Renumbering the audio timestamps fixed it on every audio path.' },
  ],
  results: [
    { value: '~$1', label: 'per finished video, vs ~$12 for paid generative video' },
    { value: '$0.72', label: 'real API cost of a 2-part story ($0.49 + $0.23)' },
    { value: '406', label: 'unit tests, plus 300 acceptance checks on a fake paid-API stand-in' },
    { value: '~37 s', label: 'to render a 24-second vertical video (test run)' },
    { value: '1 file', label: '1080×1920 MP4 for TikTok, YouTube Shorts and Facebook Reels' },
  ],
  stack: ['Python', 'FastAPI', 'Claude API (Opus 5.5)', 'OpenAI API (images, text-to-speech)', 'FFmpeg', 'Cloudflare Tunnel', 'Built with Claude Code'],
  video: {
    src: '/media/video-engine-sample.mp4',
    poster: '/media/video-engine-sample-poster.webp',
    w: 432,
    h: 768,
    duration: '0:57',
    title: 'Vikings in America: how a sun storm revealed the exact year',
    label: 'One finished short from my channel, made end to end by the engine: Claude script, OpenAI images and voice, FFmpeg render. Captions are burned in.',
  },
};

export const cases = [jobHunt, videoEngine];
