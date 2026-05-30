import { Link } from 'react-router-dom';
import { ArrowRight, Check, Globe, Database, Workflow, Bot, Image as ImageIcon, Film, ExternalLink, Mail, Box } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services, contentSamples } from '../data/content.js';
import LazyYouTube from '../components/LazyYouTube.jsx';

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

      {/* CONTENT SAMPLES — agency deliverables I scoped + QC'd */}
      <section className="py-20 bg-white border-t border-line">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Campaign deliverables · Arrow Group</div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
                Marketing work I've planned and shipped.
              </h2>
              <p className="mt-4 text-body leading-relaxed">
                {contentSamples.disclosure}
              </p>
            </div>
          </Reveal>

          {/* Graphics grid */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-2 mb-5">
              <ImageIcon size={16} className="text-navy" />
              <div className="text-xs uppercase tracking-widest font-bold text-muted">Graphics</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {contentSamples.graphics.map((g, i) => (
                <a
                  key={g.src}
                  href={g.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden border border-line hover:border-navy hover:shadow-soft transition-all"
                  aria-label={`Open ${g.alt} full size`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-navy" />
                  </div>
                  <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Long-form video (16:9) */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-5 mt-14">
              <Film size={16} className="text-navy" />
              <div className="text-xs uppercase tracking-widest font-bold text-muted">Brand films &amp; promo video</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {contentSamples.videos
                .filter((v) => !v.vertical)
                .map((v) => (
                  <LazyYouTube key={v.id} id={v.id} label={v.label} vertical={false} />
                ))}
            </div>
          </Reveal>

          {/* Short-form reels (9:16) */}
          <Reveal delay={0.15}>
            <div className="flex items-center gap-2 mb-5 mt-14">
              <Film size={16} className="text-navy" />
              <div className="text-xs uppercase tracking-widest font-bold text-muted">Short-form reels</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {contentSamples.videos
                .filter((v) => v.vertical)
                .map((v) => (
                  <LazyYouTube key={v.id} id={v.id} label={v.label} vertical={true} />
                ))}
            </div>
          </Reveal>
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
