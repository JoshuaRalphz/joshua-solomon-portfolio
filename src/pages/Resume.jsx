import { Link } from 'react-router-dom';
import { ArrowRight, Download, Briefcase, MapPin, Mail, MessageCircle, Sparkles, Package } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { profile, experience, coreExpertise, serviceOffer, tools } from '../data/content.js';

export default function Resume() {
  return (
    <PageTransition>
      {/* ============ HEADER ============ */}
      <section className="pt-20 pb-12">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="label">Resume</div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                  Joshua Ralph Adrian Solomon
                </h1>
                <div className="mt-2 text-lg text-body font-medium">{profile.role} | {profile.subtitle}</div>
                <div className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald" />
                  Open to Freelance Retainers &amp; Full-Time Remote Roles
                </div>
              </div>
              <a href="/Joshua_Solomon_Resume_v4.pdf" download className="btn-ghost">
                <Download size={16} /> Download .pdf
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-body">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-navy" /> {profile.location}</span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-navy"><Mail size={14} className="text-navy" /> {profile.email}</a>
              <a href={profile.whatsappLink} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-navy"><MessageCircle size={14} className="text-navy" /> {profile.whatsapp}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SUMMARY ============ */}
      <section className="pb-10">
        <div className="container-x">
          <Reveal>
            <div className="bg-navy-tint border border-navy/15 rounded-2xl p-7 md:p-8">
              <h2 className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Summary</h2>
              <p className="text-body leading-relaxed text-base">
                Marketing systems and automation specialist who builds the technical backbone agencies
                and service businesses actually run on. Custom-coded websites on Cloudflare, GoHighLevel CRM
                builds, Zapier, ClickUp — turning sales pipelines, lead-routing logic, and email workflows
                into automations that survive a busy week. Currently embedded with a US marketing agency;
                open to senior freelance retainers and remote employment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CORE EXPERTISE ============ */}
      <section className="pb-12">
        <div className="container-x">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-navy" /> Core Expertise
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {coreExpertise.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.05}>
                <div className="bg-white border border-line rounded-2xl p-6 h-full hover:border-navy hover:shadow-soft transition-all">
                  <div className="text-xs uppercase tracking-widest font-bold text-navy mb-2">{cat.label}</div>
                  <p className="text-sm text-body leading-relaxed">{cat.items}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="py-12">
        <div className="container-x">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink mb-7 flex items-center gap-2">
              <Briefcase size={20} className="text-navy" /> Experience
            </h2>
          </Reveal>

          <div className="space-y-7">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.07}>
                <article className="bg-white border border-line rounded-2xl p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-ink">{e.role}</h3>
                      <div className="text-sm text-body mt-0.5">
                        <span className="font-semibold text-navy">{e.company}</span>
                        <span className="text-muted"> — {e.location} · {e.type}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted bg-slate-50 border border-line rounded px-2.5 py-1">
                      {e.dates}
                    </span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {e.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICE OFFER ============ */}
      <section className="py-12 bg-slate-50 border-y border-line">
        <div className="container-x">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink mb-3 flex items-center gap-2">
              <Package size={20} className="text-navy" /> Service Offer for Freelance Clients
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="bg-white border-2 border-navy rounded-2xl p-7 md:p-9 mt-6 shadow-soft">
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <h3 className="text-2xl font-bold text-ink">{serviceOffer.title}</h3>
                <span className="text-base font-bold text-navy">— {serviceOffer.price}</span>
              </div>
              <p className="text-body leading-relaxed">
                {serviceOffer.bullets.join(' · ')}
              </p>
              <Link to="/plan" className="btn-primary mt-6">
                Get my plan (90 sec) <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SKILLS & TOOLS ============ */}
      <section className="py-12">
        <div className="container-x">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink mb-3">Skills &amp; Tools</h2>
            <p className="text-body mb-7 max-w-2xl">
              Fluent in {tools.length}+ tools. Daily-use is bold; weekly is regular; occasional is "shipped production work in it, but it's not my first reach."
            </p>
          </Reveal>

          <div className="flex flex-wrap gap-2">
            {tools.map(t => (
              <span
                key={t.name}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${
                  t.tier === 'Daily'
                    ? 'bg-navy text-white border-navy font-semibold'
                    : t.tier === 'Weekly'
                    ? 'bg-white text-ink border-line font-medium'
                    : 'bg-slate-100 text-muted border-line'
                }`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink mb-4">Ready to talk?</h2>
            <Link to="/plan" className="btn-primary">
              Get my plan (90 sec) <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
