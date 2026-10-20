// The four interactive demos ("Try my systems"). Copy for the home cards and the
// /play/<slug>/ pages. Truthful by rule: every page says what is real and what is
// simulated, and no number here is a result (prices are Josh's real offers).

// Josh's only two offers. The busywork planner may show nothing else.
export const OFFERS = {
  starter: { label: 'Starter automation', price: 'from $500 one-time' },
  care: { label: 'Ongoing systems care', price: 'from $500/month' },
};

// Free call CTA. ?topic=project preselects the contact form topic where supported.
export const CALL_HREF = '/?topic=project#contact';
export const CALL_LABEL = 'Ask for a free 15-minute call';

export const playDemos = [
  {
    slug: 'busywork-plan',
    path: '/play/busywork-plan/',
    num: '01',
    audience: 'Business owners',
    name: 'Busywork → plan & price',
    value: 'Tell it what eats your week. Get the first automations I’d build, the hours they could save, and where the price starts.',
    framing: 'Every business has a job nobody wants: copying leads, chasing invoices, answering the same email. Describe it and get a starting plan you can take into a real conversation.',
    real: [
      'A real AI call (Claude Haiku 5.5) reads what you type and picks from tools I actually use.',
      'Prices come from my two real offers only. The AI cannot invent a price.',
    ],
    simulated: [
      'Hours saved are estimates from what you wrote, with the assumption shown. Not a quote.',
      'Nothing is built or booked. Your text is not stored on this site.',
    ],
    how: [
      { label: 'You describe it', caption: 'What eats the week, plus team size and industry if you like' },
      { label: 'Claude plans', caption: 'Haiku 5.5 picks 1 to 3 builds from tools I really use, as strict JSON' },
      { label: 'Code checks it', caption: 'Hours are clamped, unknown tools dropped, any price the AI writes is removed' },
      { label: 'Real prices only', caption: 'The plan maps to one of my two offers; the call turns it into a quote' },
    ],
    seo: 'Describe the busywork that eats your week and get a starting automation plan: what Joshua Solomon would build first, estimated hours saved, and his real starting prices.',
  },
  {
    slug: 'lead-triage',
    path: '/play/lead-triage/',
    num: '02',
    audience: 'Business owners · teams',
    name: 'Lead triage playground',
    value: 'Paste a customer enquiry. Watch it get sorted, flagged and answered, then approve the reply yourself.',
    framing: 'Enquiries pile up in an inbox and the urgent one gets answered last. This sorts each one in seconds and drafts a reply, but a person still presses send.',
    real: [
      'A real AI call (Claude Haiku 5.5) classifies the enquiry: job type, urgency, spam or scam risk, missing details.',
      'The draft reply is written live for the enquiry you pasted.',
    ],
    simulated: [
      '“Approve & send” is simulated: nothing is sent anywhere.',
      'The business is a demo plumbing company, not a real client. Your text is not stored on this site.',
    ],
    how: [
      { label: 'Received', caption: 'An enquiry arrives by email, form or text' },
      { label: 'Classified', caption: 'Claude Haiku 5.5 labels job type, urgency, spam risk and what is missing' },
      { label: 'Drafted', caption: 'A short reply in the business’s voice; code blocks replies to spam and pitches' },
      { label: 'You approve', caption: 'Nothing goes out until a person presses send (simulated here)' },
    ],
    seo: 'Paste a customer enquiry and watch an AI triage it: job type, urgency, spam and scam check, missing details and a draft reply that waits for human approval. A demo by Joshua Solomon.',
  },
  {
    slug: 'ask-my-portfolio',
    path: '/play/ask-my-portfolio/',
    num: '03',
    audience: 'Recruiters · hiring managers',
    name: 'Ask my portfolio',
    value: 'Ask anything about my work. Every answer cites the exact part of my CV or case studies it came from.',
    framing: 'Skimming a CV takes time and still leaves questions. Ask in plain words; if the answer is not in my documents, it says so instead of guessing.',
    real: [
      'Answers come only from my CV, my case studies and this site’s summary, split into passages you can click.',
      'Search runs on the server (keyword ranking, BM25); Claude Haiku 5.5 writes the answer from the top passages only.',
    ],
    simulated: [
      'Nothing is simulated, but it only knows what is written down. Anything else: email me.',
      'Your question is not stored on this site.',
    ],
    how: [
      { label: 'Search', caption: 'Your question is matched against about 70 passages from my documents (BM25)' },
      { label: 'Nothing found?', caption: 'Then it says so, with no AI call at all' },
      { label: 'Answer', caption: 'Claude Haiku 5.5 answers from the top 5 passages only, citing each one' },
      { label: 'Code checks it', caption: 'A sentence survives only if it cites a passage it was given, with matching numbers' },
    ],
    seo: 'Ask questions about Joshua Solomon, AI Solutions Engineer, and get answers drawn only from his CV and case studies, each with clickable source citations.',
  },
  {
    slug: 'missed-call-text-back',
    path: '/play/missed-call-text-back/',
    num: '04',
    audience: 'Service businesses',
    name: 'Missed-call text-back simulator',
    value: 'Call a demo plumber, miss the call, and see the text-back, booking, reminder and review request play out.',
    framing: 'A missed call is often a lost job: the caller rings the next business on the list. A text that goes out in seconds keeps the conversation going.',
    real: [
      'The flow is the standard missed-call text-back pattern that SMS tools like Twilio or GoHighLevel can run.',
      'The calculator uses only your numbers, with the formula shown.',
    ],
    simulated: [
      'Everything happens in your browser: no call, no text, no AI, no cost.',
      'The business, messages and timings are a demo.',
    ],
    how: [
      { label: 'Missed call', caption: 'The phone system sees a call nobody picked up' },
      { label: 'Text in seconds', caption: 'An SMS goes out automatically: sorry we missed you, how can we help?' },
      { label: 'Book', caption: 'The reply gets a booking link or a call back, depending on urgency' },
      { label: 'Follow up', caption: 'A reminder before the visit, a review request after it' },
    ],
    seo: 'An interactive simulation of a missed-call text-back flow for a service business: instant SMS, booking link, reminder and review request, plus a calculator that uses your own numbers.',
  },
];

export const playBySlug = Object.fromEntries(playDemos.map((demo) => [demo.slug, demo]));
