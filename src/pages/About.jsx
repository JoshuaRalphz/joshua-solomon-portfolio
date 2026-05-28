import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import PlannerTeaser from '../components/PlannerTeaser.jsx';
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
              I'm one person. That's the feature, not the bug.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              Most agencies sell you a team. I sell you direct access. You message me; I respond.
              You don't get routed to a project manager who routes to a junior who routes to me.
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
              technical builder at a Philippines-based marketing services agency, then as the
              go-to systems person for a Michigan consulting firm. Both still trust me with
              their day-to-day client work.
            </p>
            <p>
              Every business I work with has the same problem. They have the marketing strategy
              figured out, but they can't get the technical pieces to actually work. Their CRM
              is half-set-up. Their follow-up emails stopped firing. Their domain and email
              setup was done by someone who disappeared six months ago.
            </p>
            <p>
              What I do is unsexy: I show up, look at what's broken, fix it, build what's
              missing, and keep it running. No drama. No buzzwords. No three-week sales process.
              Just getting it done.
            </p>
            <p>
              I work US business hours from Olongapo, Philippines. That means you can send me
              a request at 5pm Eastern and have it done by 9am the next day. That's not magic —
              that's just the time zone working in your favor.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-navy-tint rounded-2xl p-6 sticky top-24">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Quick facts</div>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted text-xs">Years doing this</dt><dd className="font-semibold text-ink">3+</dd></div>
                <div><dt className="text-muted text-xs">Based in</dt><dd className="font-semibold text-ink">Olongapo City, PH</dd></div>
                <div><dt className="text-muted text-xs">Working hours</dt><dd className="font-semibold text-ink">US Eastern · 8am–6pm</dd></div>
                <div><dt className="text-muted text-xs">Reply time</dt><dd className="font-semibold text-ink">Hours, not days</dd></div>
                <div><dt className="text-muted text-xs">Style</dt><dd className="font-semibold text-ink">Direct messaging, no PMs</dd></div>
                <div><dt className="text-muted text-xs">Open to</dt><dd className="font-semibold text-ink">New retainer clients</dd></div>
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
              I work in the tools you already use — CRMs, email platforms, automation, design, payments, hosting. No forced migrations.
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

      {/* Sitewide planner teaser */}
      <PlannerTeaser
        title="Want to work together?"
        subtitle="Five quick questions, no email gate. You'll get back a scoped recommendation tailored to where you're at right now."
      />
    </PageTransition>
  );
}
