import { Link } from 'react-router-dom';
import { ArrowRight, Check, Globe, Database, Workflow, Mail, Box } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services } from '../data/content.js';

// Icon per service id — keeps the visual consistent with the rest of the site
const SERVICE_ICONS = {
  crm: Database,
  website: Globe,
  'email-infra': Mail,
  'workflow-automation': Workflow,
  'internal-tools': Box,
};

export default function Services() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="pt-20 pb-16">
        <div className="container-x">
          <Reveal>
            <div className="label">Capabilities</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-4xl leading-tight">
              Five capabilities.
              <br />
              <span className="whitespace-nowrap">One technical operator.</span>
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              Hands-on implementation work I've shipped across agency, contract, and full-stack roles. Marketing technology, custom code, email infrastructure, automation, and internal tooling.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICE CARDS — horizontal stacked layout */}
      <section className="pb-20">
        <div className="container-x space-y-6">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Globe;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <article className="bg-white border-2 border-line hover:border-navy hover:shadow-soft rounded-2xl p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10 transition-all">
                  {/* Left side: capability number + icon */}
                  <div className="md:w-1/4 flex md:flex-col items-center md:items-start gap-5 md:gap-4 flex-shrink-0">
                    <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none text-navy/15">0{i + 1}</div>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-navy-tint text-navy">
                      <Icon size={26} />
                    </div>
                  </div>

                  {/* Right side: content */}
                  <div className="md:w-3/4 flex-1">
                    <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest font-bold text-navy">
                      <span>Capability · 0{i + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3 leading-tight">{s.title}</h3>
                    <p className="text-body mb-5 leading-relaxed">{s.summary}</p>

                    <div className="text-xs uppercase tracking-widest text-navy font-bold mb-3">What's included</div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                          <Check size={16} className="flex-shrink-0 mt-0.5 text-emerald" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-line pt-4">
                      <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Outcome</div>
                      <p className="text-sm font-semibold text-ink">{s.outcome}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-ink to-navy-dark text-white">
        <div className="container-x text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="text-xs uppercase tracking-widest font-bold text-gold mb-4">Hiring or scoping a role?</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Tell me about the role. I'll reply within hours.
            </h2>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              Open to full-time remote, contract, or fractional engagements. Happy to do a paid trial week, technical screen, or async take-home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn-gold">
                Send me a message <ArrowRight size={18} />
              </Link>
              <Link to="/resume" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 transition text-white font-semibold rounded-lg">
                See the full resume
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </PageTransition>
  );
}
