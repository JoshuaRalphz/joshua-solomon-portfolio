import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';

const QUESTIONS = [
  {
    id: 'business',
    label: 'What kind of business are you?',
    options: [
      { value: 'agency',       label: 'Marketing agency (2-15 people)', hint: 'I need a subcontractor for client builds.' },
      { value: 'service',      label: 'Service business owner',         hint: 'Real estate, coach, med spa, contractor, etc.' },
      { value: 'saas',         label: 'SaaS or tech founder',           hint: 'I need lead-gen infrastructure.' },
      { value: 'other',        label: 'Something else',                 hint: 'Tell me on the call.' },
    ],
  },
  {
    id: 'painpoint',
    label: 'What\'s broken right now?',
    options: [
      { value: 'no-system',    label: 'No system. Leads are in my inbox.',     hint: 'Start from scratch.' },
      { value: 'half-built',   label: 'Started a CRM but never finished it.', hint: 'Audit + finish.' },
      { value: 'no-followup',  label: 'Leads come in, follow-up doesn\'t.',    hint: 'Automation focus.' },
      { value: 'no-site',      label: 'Website is slow or breaking.',         hint: 'Custom rebuild.' },
    ],
  },
  {
    id: 'stack',
    label: 'What CRM do you have today (if any)?',
    options: [
      { value: 'ghl',          label: 'GoHighLevel — already in it',          hint: 'I\'ll configure/fix yours.' },
      { value: 'hubspot',      label: 'HubSpot or Mailchimp',                  hint: 'I work in both.' },
      { value: 'sheets',       label: 'Spreadsheets, Notion, or nothing',      hint: 'GHL on my Pro plan, included.' },
      { value: 'other',        label: 'Something else / not sure',             hint: 'I\'ll audit and recommend.' },
    ],
  },
  {
    id: 'timeline',
    label: 'When do you need this live?',
    options: [
      { value: 'this-month',   label: 'This month — there\'s a deadline',     hint: 'Fast turnaround possible.' },
      { value: 'next-month',   label: 'Within 6 weeks',                         hint: 'Standard timeline.' },
      { value: 'this-quarter', label: 'This quarter',                           hint: 'Plenty of runway.' },
      { value: 'exploring',    label: 'Just exploring options',                 hint: 'Build a plan, no commitment.' },
    ],
  },
  {
    id: 'creative',
    label: 'Beyond the core system, what else do you need?',
    options: [
      { value: 'content-full', label: 'Content + social media handled (30-day calendar, reels, graphics)', hint: 'Recommends Full Marketing tier ($2k/mo).' },
      { value: 'paid-ads',     label: 'Paid ad campaigns running on top',                                   hint: 'Recommends Core + Paid Ads add-on.' },
      { value: 'both',         label: 'Both — full content + paid ads',                                     hint: 'Full Marketing + Paid Ads add-on.' },
      { value: 'none',         label: 'Just the core system — no extras',                                   hint: 'Core retainer only ($1k/mo).' },
    ],
  },
];

function buildRecommendation(answers) {
  // Wider recommendation engine — surfaces 3–5 services + the infrastructure story
  // based on the 4 answers. Setup is flat $1,000; retainer is flat $1,000/mo.
  const recs = [];

  // ───── PRIORITY 1 — based on painpoint ─────
  if (answers.painpoint === 'no-site') {
    recs.push({
      tag: 'Priority 1',
      service: 'Custom-coded site rebuild on Cloudflare Pages',
      why: 'Your site is the slowest thing in your funnel — fix this first. Sub-1-second loads, full SEO health, hosted free on my Cloudflare.',
    });
  }
  if (answers.painpoint === 'no-followup' || answers.stack === 'sheets') {
    recs.push({
      tag: 'Priority 1',
      service: 'GoHighLevel CRM + email & SMS automation',
      why: 'Leads slipping through is the #1 cause of stalled revenue. Includes A2P 10DLC-compliant SMS so you can text leads legally.',
    });
  }
  if (answers.painpoint === 'no-system') {
    recs.push({
      tag: 'Priority 1',
      service: 'Full stack build: site + CRM + automation + DNS + SEO',
      why: 'Starting from zero is actually easier — one clean install, no migration mess. Everything wired together day one.',
    });
  }
  if (answers.painpoint === 'half-built') {
    recs.push({
      tag: 'Priority 1',
      service: 'Audit + finish your existing CRM',
      why: 'Most half-built CRMs need a 2-week sprint to ship, not a full rebuild. I\'ll find what\'s broken and close the gaps.',
    });
  }

  // ───── INFRASTRUCTURE — bundled story, varies by their current stack ─────
  if (answers.stack === 'ghl') {
    recs.push({
      tag: 'Infrastructure',
      service: 'Work inside your existing GoHighLevel — no migration',
      why: 'You already pay GHL $297/mo. I\'ll configure, automate, and maintain it. Your account stays yours, your data stays yours.',
    });
  } else if (answers.stack === 'hubspot') {
    recs.push({
      tag: 'Infrastructure',
      service: 'Stay on HubSpot/Mailchimp — or migrate to my GHL Pro sub-account',
      why: 'Your call. I work in both. If we migrate, your sub-account is bundled into the retainer — you don\'t pay GHL\'s $297/mo separately.',
    });
  } else {
    recs.push({
      tag: 'Infrastructure',
      service: 'GHL Pro sub-account + Cloudflare hosting — bundled',
      why: 'You don\'t pay GHL\'s $297/mo or Cloudflare hosting separately. Both are included in your retainer. ~$300/mo value you don\'t see on a bill.',
    });
  }

  // ───── ALSO — wider scope coverage based on what they picked ─────
  if (answers.painpoint === 'no-site' || answers.painpoint === 'no-system') {
    recs.push({
      tag: 'Also',
      service: 'On-page + technical SEO + Google Search Console',
      why: 'Your site needs to be findable, not just fast. SEO setup is baked into every build I ship.',
    });
  }
  if (answers.business === 'agency') {
    recs.push({
      tag: 'Also',
      service: 'White-label support for your client builds',
      why: 'I can ship client-facing work under your brand. You stay account-owner; I handle the technical implementation.',
    });
  }
  if (answers.business === 'saas') {
    recs.push({
      tag: 'Also',
      service: 'Lead-routing + product-led trial sequences',
      why: 'Trial signups → segmented email sequences → sales-qualified handoff. Built once, runs forever.',
    });
  }

  // ───── TIER SELECTION based on Q5 — picks one of three tiers ─────
  const wantsContent = answers.creative === 'content-full' || answers.creative === 'both';
  const wantsAds = answers.creative === 'paid-ads' || answers.creative === 'both';
  let tier;
  if (wantsContent) {
    tier = { id: 'full', name: 'Full Marketing', price: 2000, label: '$2,000/mo' };
  } else if (wantsAds) {
    tier = { id: 'growth', name: 'Growth', price: 1500, label: '$1,500/mo' };
  } else {
    tier = { id: 'core', name: 'Core', price: 1000, label: '$1,000/mo' };
  }

  // (Tier recommendation surfaces in its own dedicated callout in the result UI —
  //  not re-listed in the recs array to avoid duplication.)

  // No standalone add-ons — paid ads + content are bundled into Growth/Full Marketing tiers.
  const addOnSuggestions = [];

  // ───── PHASED TIMELINE — show them exactly what happens, week by week ─────
  const isAccelerated = answers.timeline === 'this-month';
  const phasedTimeline = [
    {
      phase: isAccelerated ? 'Days 1–3' : 'Week 1',
      title: 'Kickoff + discovery',
      do: 'I audit your existing accounts, brand, and pipelines. You hand me access; I take it from there. No long onboarding deck — just a 30-min call and a shared checklist.',
    },
    {
      phase: isAccelerated ? 'Days 4–10' : 'Week 2',
      title: 'Core build',
      do: 'Site, CRM, automation, DNS — built and tested in parallel. You see daily progress in a shared ClickUp board. I message you when I hit a decision point; otherwise you don\'t need to babysit.',
    },
    {
      phase: isAccelerated ? 'Days 11–14' : 'Week 3',
      title: 'Launch + walkthrough',
      do: 'Site goes live. CRM goes live. First lead routes end-to-end without your intervention. 30-min walkthrough call so your team knows where everything is.',
    },
    {
      phase: 'Ongoing',
      title: 'Retainer kicks in',
      do: 'New automations, monthly newsletter, optimizations, infrastructure managed. Direct messaging — no PM layer. New offer next quarter? Built and shipped without a new quote.',
    },
  ];

  // ───── Pricing math, tier-aware ─────
  const setupFee = 1000;
  const adsAdd = 0; // No standalone add-ons; paid ads is bundled into Growth + Full Marketing tiers
  const monthlyTotal = tier.price + adsAdd;
  const firstInvoice = setupFee + monthlyTotal;
  const year1Total = setupFee + monthlyTotal * 12;

  const fmt = (n) => `$${n.toLocaleString()}`;

  const liveBy = answers.timeline === 'this-month' ? '2 weeks' :
                 answers.timeline === 'next-month' ? '3–4 weeks' :
                 answers.timeline === 'this-quarter' ? '4–6 weeks' :
                 '4–6 weeks';

  return {
    recs,
    tier,
    setupFee: fmt(setupFee),
    monthlyRetainer: fmt(tier.price),
    monthlyTotal: fmt(monthlyTotal),
    adsAdd: adsAdd ? fmt(adsAdd) : null,
    firstInvoice: fmt(firstInvoice),
    year1Total: fmt(year1Total),
    liveBy,
    addOnSuggestions,
    phasedTimeline,
  };
}

export default function Quiz() {
  const [step, setStep] = useState(0); // 0..n-1 = questions, n = result
  const [answers, setAnswers] = useState({});

  const isDone = step >= QUESTIONS.length;
  const currentQ = QUESTIONS[step];

  const choose = (val) => {
    const next = { ...answers, [currentQ.id]: val };
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 250);
  };

  const back = () => step > 0 && setStep(step - 1);
  const restart = () => { setAnswers({}); setStep(0); };

  const result = useMemo(() => isDone ? buildRecommendation(answers) : null, [isDone, answers]);

  const progressPct = (step / QUESTIONS.length) * 100;

  return (
    <PageTransition>
      <section className="pt-16 pb-24">
        <div className="container-x max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="label">Project planner</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {isDone ? 'Here\'s what I\'d build for you.' : 'Tell me about your business.'}
            </h1>
            {!isDone && (
              <p className="mt-3 text-body">Five quick questions, about 90 seconds, no email gate. At the end you'll get a scoped project plan — what to build, in what order, what it costs, and a week-by-week timeline.</p>
            )}
          </div>

          {/* Progress bar */}
          {!isDone && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span className="font-semibold">Question {step + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(progressPct)}% complete</span>
              </div>
              <div className="h-1.5 bg-line rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-navy rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">{currentQ.label}</h2>

                <div className="space-y-3">
                  {currentQ.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className="w-full text-left bg-white border-2 border-line hover:border-navy hover:bg-navy-tint/30 rounded-xl p-5 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold text-ink mb-1">{opt.label}</div>
                          <div className="text-sm text-muted">{opt.hint}</div>
                        </div>
                        <ArrowRight size={18} className="text-muted group-hover:text-navy group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={back} className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-navy transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Result block */}
                <div className="bg-gradient-to-br from-ink to-navy-dark text-white rounded-3xl p-8 md:p-10 mb-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Your custom recommendation</div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
                    Based on your answers, here's what I'd build.
                  </h2>

                  <div className="space-y-4 mb-8">
                    {result.recs.map((r, i) => (
                      <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                        <CheckCircle2 size={22} className="text-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs uppercase tracking-widest font-bold text-gold mb-1">{r.tag}</div>
                          <div className="text-lg font-bold mb-1">{r.service}</div>
                          <div className="text-sm text-white/70 leading-relaxed">{r.why}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* TIER CALLOUT */}
                  <div className="bg-gold/15 border-2 border-gold/50 rounded-xl p-5 mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-gold mb-0.5">Your recommended tier</div>
                      <div className="text-white font-extrabold text-xl">{result.tier.name}</div>
                    </div>
                    <div className="text-white font-extrabold text-2xl">{result.tier.label}</div>
                  </div>

                  {/* FIRST INVOICE — payment timeline, tier-aware */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
                    <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-2">Your first invoice — day you sign</div>
                    <div className="text-4xl font-extrabold text-white mb-4">{result.firstInvoice}</div>
                    <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-white/85">One-time setup fee (the build)</span>
                        <span className="text-white font-bold">{result.setupFee}</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-white/85">First month — {result.tier.name} retainer</span>
                        <span className="text-white font-bold">+ {result.monthlyRetainer}</span>
                      </div>
                      {result.adsAdd && (
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-white/85">First month — Paid Ads add-on</span>
                          <span className="text-white font-bold">+ {result.adsAdd}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ONGOING */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
                    <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-2">Every month after that</div>
                    <div className="mb-3">
                      <span className="text-4xl font-extrabold text-white">{result.monthlyTotal}</span>
                      <span className="text-base font-bold text-white/55 ml-2">/ month{result.adsAdd ? ' + ad spend' : ''}</span>
                    </div>
                    <div className="text-sm text-white/70 leading-relaxed">
                      {result.tier.id === 'full'
                        ? 'Full Marketing retainer — covers core system maintenance, new builds, new automations, the 30-day content engine, plus bundled infrastructure (GHL Pro + Cloudflare). Cancel anytime; on cancel, you migrate to your own accounts and keep everything.'
                        : 'Core System retainer — covers all maintenance, new builds, new automations, plus bundled infrastructure (GHL Pro sub-account + Cloudflare hosting — ~$300/mo of platform costs you don\'t see). Cancel anytime; on cancel, you migrate to your own accounts and keep everything.'
                      }
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-white/55 mb-1">Live by</div>
                      <div className="text-xl font-extrabold text-white">{result.liveBy}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-white/55 mb-1">Year-1 total</div>
                      <div className="text-xl font-extrabold text-white">{result.year1Total}</div>
                    </div>
                  </div>

                  {result.addOnSuggestions && result.addOnSuggestions.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                      <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-1">Add-ons recommended for you</div>
                      <div className="text-sm text-white/65 mb-5">Based on what you picked, these would bolt onto your retainer.</div>
                      <div className="space-y-3">
                        {result.addOnSuggestions.map(a => (
                          <div
                            key={a.name}
                            className={a.free
                              ? 'bg-emerald/10 border border-emerald/40 rounded-lg p-4'
                              : 'bg-white/5 border border-white/10 rounded-lg p-4'}
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                              <div className="font-bold text-white">{a.name}</div>
                              <div className={`font-bold whitespace-nowrap text-xs uppercase tracking-wider px-2 py-0.5 rounded ${a.free ? 'bg-emerald text-ink' : 'text-gold'}`}>
                                {a.price}
                              </div>
                            </div>
                            <div className="text-xs text-white/70 leading-relaxed">{a.why}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Phased timeline */}
                  {result.phasedTimeline && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                      <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-1">Your phased timeline</div>
                      <div className="text-sm text-white/65 mb-5">What happens, when. No mystery, no padding.</div>
                      <div className="space-y-4">
                        {result.phasedTimeline.map((p, i) => (
                          <div key={p.phase} className="flex gap-4">
                            <div className="flex-shrink-0 w-20 md:w-24">
                              <div className="inline-flex items-center justify-center px-2.5 py-1 bg-gold/15 border border-gold/30 rounded text-gold text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap">
                                {p.phase}
                              </div>
                            </div>
                            <div className="flex-1 pb-1 border-l border-white/10 pl-4 -ml-1 relative">
                              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-gold" />
                              <div className="font-bold text-white mb-1">{p.title}</div>
                              <div className="text-sm text-white/70 leading-relaxed">{p.do}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Link to="/contact" state={{ recommendation: result }} className="btn-gold">
                      Book a call to discuss <ArrowRight size={18} />
                    </Link>
                    <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg font-semibold transition-colors">
                      <RotateCcw size={16} /> Start over
                    </button>
                  </div>
                </div>

                <div className="text-sm text-muted text-center">
                  Not ready to book? Email me directly: <a href="mailto:solomonjoshua101602@gmail.com" className="text-navy font-semibold hover:underline">solomonjoshua101602@gmail.com</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
