import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { tools } from '../data/content.js';

export default function About() {
  // Group tools by category
  const byCategory = tools.reduce((acc, t) => {
    (acc[t.category] = acc[t.category] || []).push(t);
    return acc;
  }, {});

  return (
    <PageTransition>
      {/* HERO */}
      <section className="pt-20 pb-16">
        <div className="container-x">
          <Reveal>
            <div className="label">About</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-3xl leading-tight">
              Technical operator. Direct communication. End-to-end accountability.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              I configure CRMs, build sites, ship integrations, and stand up internal tools. The work ships from the same person who scoped it — no handoffs, no middle layer between strategy and implementation.
            </p>
            <p className="mt-3 text-base text-muted max-w-2xl leading-relaxed">
              I write strong async messages, comfortable speaking directly with founders and senior stakeholders, and prefer shipping work over scheduling meetings to talk about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="pb-16">
        <div className="container-x grid md:grid-cols-3 gap-12">
          <Reveal className="md:col-span-2 space-y-5 text-body leading-relaxed">
            <p>
              I've been building marketing systems for US businesses since 2023 — first as the
              primary technical implementer at a Philippines-based VMA agency (Doneverse),
              then as Implementation Specialist at a Michigan consulting firm (Arrow Group).
            </p>
            <p>
              My background is computer science (BS, Gordon College, 2025) but my day-to-day
              is implementation — configuring GoHighLevel sub-accounts, hand-coding React + Vite
              sites on Cloudflare Pages, setting up dedicated email-sending domains with proper
              SPF/DKIM/DMARC alignment, and wiring n8n/Make/Zapier workflows across founder stacks.
              I work in whatever the team uses: HubSpot, Mailchimp, Kajabi, Wix Studio, WordPress —
              the platform is rarely the interesting part.
            </p>
            <p>
              Recently built <strong className="text-ink">AGC HUB</strong> — a custom internal PWA
              (React + Vite + Firebase + multi-API orchestration across GHL, Canva, and Google Sheets)
              replacing a scattered tool stack of Drive, ClickUp, Trello, GHL, and Canva. It runs
              the agency's content production workflow end-to-end and is in daily production.
            </p>
            <p>
              I work US business hours from Olongapo, Philippines — full overlap with EST/CST/MST/PST
              every workday. Async-first communication, strong written work, and comfortable speaking
              directly with founders and senior stakeholders.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-navy-tint rounded-2xl p-6 sticky top-24">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Quick facts</div>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted text-xs">Experience</dt><dd className="font-semibold text-ink">3+ years</dd></div>
                <div><dt className="text-muted text-xs">Based in</dt><dd className="font-semibold text-ink">Olongapo City, PH</dd></div>
                <div><dt className="text-muted text-xs">Working hours</dt><dd className="font-semibold text-ink">US business hours</dd></div>
                <div><dt className="text-muted text-xs">Reply time</dt><dd className="font-semibold text-ink">Within hours</dd></div>
                <div><dt className="text-muted text-xs">Communication</dt><dd className="font-semibold text-ink">Async-first</dd></div>
                <div><dt className="text-muted text-xs">Open to</dt><dd className="font-semibold text-ink">Full-time, contract, fractional</dd></div>
                <div><dt className="text-muted text-xs">Education</dt><dd className="font-semibold text-ink">BS Computer Science (2025)</dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOOLS — full grid grouped by category */}
      <section id="tools" className="py-20 bg-slate-50 border-y border-line">
        <div className="container-x">
          <Reveal>
            <div className="label">Tools I work in</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              The tools I use, grouped by what they do.
            </h2>
            <p className="mt-4 text-body max-w-2xl">
              Daily-weekly working knowledge across CRMs, email platforms, automation, design, payments, and hosting.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(byCategory).map(([cat, list], i) => (
              <Reveal key={cat} delay={i * 0.05}>
                <div className="bg-white border border-line rounded-2xl p-6 h-full">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4">{cat}</h3>
                  <ul className="space-y-2">
                    {list.map(t => (
                      <li key={t.name} className="flex items-center gap-2 text-sm font-medium text-ink">
                        <span className="w-1 h-1 rounded-full bg-navy/40" />
                        {t.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
