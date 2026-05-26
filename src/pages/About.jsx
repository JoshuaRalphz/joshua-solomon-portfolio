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
              I started building marketing systems for US businesses in 2023 — first as
              the technical implementer at a Philippines-based marketing-VA agency, then as the embedded
              systems person for a Michigan consultancy. Both still trust me with their
              client-facing infrastructure.
            </p>
            <p>
              The common thread: every business I work with had the same problem. They had
              the marketing strategy figured out, but they couldn't ship the technical pieces.
              CRMs were half-configured. Email automations were broken. Domains and DNS
              were rented from contractors who'd gone missing.
            </p>
            <p>
              What I do is unsexy: I show up, audit the broken pieces, fix what's wrong, build
              what's missing, and then I keep it running. No drama. No "leveraging synergies."
              No three-week sales process. Just shipping.
            </p>
            <p>
              I work US business hours from Olongapo, Philippines. That means you can hand off
              a project at 5pm Eastern and have it built by 9am the next day. That's not magic;
              that's just timezone math working in your favor.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-navy-tint rounded-2xl p-6 sticky top-24">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Quick facts</div>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted text-xs">Years in this work</dt><dd className="font-semibold text-ink">3+</dd></div>
                <div><dt className="text-muted text-xs">Based in</dt><dd className="font-semibold text-ink">Olongapo City, PH</dd></div>
                <div><dt className="text-muted text-xs">Working hours</dt><dd className="font-semibold text-ink">US Eastern · 8am–6pm</dd></div>
                <div><dt className="text-muted text-xs">Response time</dt><dd className="font-semibold text-ink">Hours, not days</dd></div>
                <div><dt className="text-muted text-xs">Current clients</dt><dd className="font-semibold text-ink">Arrow Group (Michigan)</dd></div>
                <div><dt className="text-muted text-xs">Open to</dt><dd className="font-semibold text-ink">New retainers</dd></div>
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
              The full stack, grouped by what it does.
            </h2>
            <p className="mt-4 text-body max-w-2xl">
              The full stack — everything I work in across CRM, automation, code, hosting, design, and ops.
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

      {/* CTA */}
      <section className="py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink mb-4">Want to work together?</h2>
            <p className="text-body mb-8 max-w-xl mx-auto">Use the project planner — 5 questions, ~90 seconds, no email gate — and I'll send back a scoped recommendation.</p>
            <Link to="/plan" className="btn-primary">
              Get my plan <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
