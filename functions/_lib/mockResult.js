// Canned model output for FIT_AGENT_MOCK=1 (local UI checks, no API key).
// Shaped like a real model reply, including one id that is NOT on the
// allowlist, so the mock run also exercises the server-side filter.
export const MOCK_RESULT = {
  fit_score: 78,
  verdict: 'Strong match for shipping AI features into real business systems; lighter on RAG, evals and enterprise-scale experience.',
  strengths: [
    {
      requirement: 'Ship LLM features to production',
      evidence: "Added Claude API drafting helpers to a US agency's email platform and Claude Haiku features to its daily content app.",
      outcome: 'The team drafts subject lines and gets revision suggestions inside the tools they already use, instead of switching apps.',
      project_id: 'arrowplatform',
    },
    {
      requirement: 'Build integrations and automations',
      evidence: "Built the agency's in-house email/SMS platform on Cloudflare Workers; 6 accounts went live about 5 weeks after the first commit.",
      outcome: "A whole client roster's email and SMS runs from one system the agency owns.",
      project_id: 'arrowplatform',
    },
    {
      requirement: 'Keep AI output safe for customers',
      evidence: 'Every AI-drafted email and job application in his own platform waits in an approval queue; real sending is off by default.',
      outcome: "A person signs off on anything customer-facing, so AI mistakes don't reach customers.",
      project_id: 'behindworks',
    },
    {
      requirement: 'Control AI costs',
      evidence: 'His video pipeline shows a cost estimate before any paid call and holds cost to about $1 per video.',
      outcome: 'Costs are known before money is spent.',
      project_id: 'ytengine',
    },
    {
      requirement: 'Explain technical work to non-technical clients',
      evidence: 'Runs client onboarding end to end and explains each build in plain language on calls.',
      outcome: 'Clients understand what is being built and sign off faster.',
      project_id: 'fake-project-should-be-dropped',
    },
  ],
  gaps: [
    { requirement: 'RAG and vector databases', note: 'No retrieval system or vector database built yet.' },
    { requirement: 'LLM evaluation', note: 'No formal eval suite for model output; checks so far are rule checks and human approval.' },
    { requirement: '3+ years of experience', note: 'About one year of professional work, on a part-time contract.' },
  ],
  how_i_would_help: [
    'Map where your team still drafts or copies data by hand, then ship the first AI helper inside the tool they already use, with a human approval step.',
    'Put a cost estimate and a spend log around every model call, so finance sees the bill before it arrives.',
    'Write tests against fake provider credentials, so no test run can email a real customer.',
  ],
  matching_projects: ['arrowplatform', 'behindworks', 'ytengine', 'fake-project-should-be-dropped'],
  interview_questions_to_ask_him: [
    'Walk us through how you would add retrieval over our help-center docs, given you have not built RAG yet.',
    'How did you decide what the approval queue lets through automatically?',
    'What would you measure in the first month to show an AI feature is working?',
  ],
  short_note:
    "Your team is drafting customer messages by hand and wants AI to take that load without risking a bad email going out. That is the problem I solved at a US agency: I built its email platform and added Claude drafting, with a person approving anything customer-facing. I haven't built RAG yet, so I'd learn that on your stack. You can reach me at solomonjoshua101602@gmail.com or see my work at solomonjoshua.com.",
};

// Roughly what a real run uses, so the mock still moves the spend counters.
export const MOCK_USAGE = { input_tokens: 6500, output_tokens: 1100, iterations: null };
