import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ArrowRight, Download, Zap, UserCheck, Wrench, Layers, Shield, TrendingUp,
  Database, Globe, Mail, Workflow, Box, Check, ExternalLink, MapPin,
  Briefcase, Clock, GraduationCap, ShieldCheck, MousePointerClick, Sparkles,
  MessageCircle, Linkedin, Facebook, CheckCircle2, AlertCircle, FileText,
} from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import LogoMarquee from '../components/LogoMarquee.jsx';
import {
  profile, benefits, services, works, experience, tools, PORTFOLIO_GHL_WEBHOOK,
} from '../data/content.js';

const BENEFIT_ICONS = { Zap, UserCheck, Wrench, Layers, Shield, TrendingUp, Mail };
const SERVICE_ICONS = {
  'email-lifecycle': Mail,
  crm: Database,
  deliverability: ShieldCheck,
  automation: Workflow,
  'web-tools': Globe,
};

const education = [
  {
    degree: 'BS Computer Science',
    school: 'Gordon College · Olongapo City, Philippines',
    dates: '2021 — 2025',
    note: 'Thesis: "DevPath: Bridging Students to Learning Opportunities through On-Demand Webinars and Certifications." Published at IRCITE 2025 — Bulacan State University.',
  },
  {
    degree: 'Senior High School — TVL ICT Track',
    school: 'Columban College Inc. · Olongapo City, Philippines',
    dates: '2019 — 2021',
    note: 'Graduated With High Honors.',
  },
];

export default function Home() {
  const featured = works.find((w) => w.featured);
  const rest = works.filter((w) => !w.featured);

  return (
    <PageTransition>
      {/* ============================================================= HERO */}
      <section id="top" className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-navy-tint/60 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container-x">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-line rounded-full text-sm font-medium text-navy shadow-soft mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 animate-slow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
            {profile.available}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.05] max-w-4xl"
          >
            I build the lifecycle systems{' '}
            <span className="bg-gradient-to-br from-navy to-blue-600 bg-clip-text text-transparent">
              that nurture, convert, and retain.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-body max-w-2xl leading-relaxed"
          >
            Marketing automation specialist with hands-on agency experience building and running
            lifecycle email and SMS systems on GoHighLevel, Mailchimp, HubSpot, and Kajabi — audience
            segmentation, automated nurture and retention flows, A2P 10DLC SMS, and deliverability —
            plus the custom-coded sites and integrations behind them. Open to full-time remote,
            contract, or fractional roles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-gold">
              Get in touch <ArrowRight size={18} />
            </a>
            <a href="#work" className="btn-ghost">See what I've built</a>
            <a href="/Joshua_Solomon_Resume_v6.pdf" download className="btn-ghost">
              <Download size={16} /> Download resume
            </a>
          </motion.div>

          {/* meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-line grid sm:grid-cols-2 gap-6"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1 flex items-center gap-1.5">
                <MapPin size={12} className="text-navy" /> Based in
              </div>
              <div className="text-sm font-medium text-ink">Olongapo City, Philippines</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1 flex items-center gap-1.5">
                <Clock size={12} className="text-navy" /> Working hours
              </div>
              <div className="text-sm font-medium text-ink">US business hours · EST/CST/MST/PST overlap</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================= ABOUT / STRENGTHS */}
      <section id="about" className="scroll-mt-20 py-24">
        <div className="container-x">
          <Reveal>
            <div className="label">Why hire me</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Six things to know about how I work.
            </h2>
            <p className="mt-4 text-body text-lg max-w-2xl">
              Strong fit for marketing technology implementation, technical client onboarding, or full-stack systems work at early-stage and SMB companies.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[b.icon] || Zap;
              return (
                <Reveal key={b.title} delay={i * 0.05}>
                  <div className="bg-white border border-line rounded-2xl p-7 h-full hover:border-navy hover:shadow-soft transition-all">
                    <div className="w-11 h-11 rounded-xl bg-navy-tint flex items-center justify-center text-navy mb-5">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-2">{b.title}</h3>
                    <p className="text-sm text-body leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= CAPABILITIES */}
      <section id="capabilities" className="scroll-mt-20 py-24 bg-slate-50 border-y border-line">
        <div className="container-x">
          <Reveal>
            <div className="label">Capabilities</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl leading-tight">
              Five capabilities. One technical operator.
            </h2>
            <p className="mt-4 text-body text-lg max-w-2xl">
              Hands-on implementation work I've shipped across agency, contract, and full-stack roles.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.id] || Globe;
              return (
                <Reveal key={s.id} delay={i * 0.05}>
                  <article className="bg-white border border-line rounded-2xl p-7 h-full hover:border-navy hover:shadow-soft transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-navy-tint flex items-center justify-center text-navy flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-ink leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-sm text-body leading-relaxed mb-4">{s.summary}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-body">
                          <Check size={13} className="flex-shrink-0 mt-0.5 text-emerald" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-3 border-t border-line">
                      <span className="text-xs font-semibold text-ink">{s.outcome}</span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= WORK */}
      <section id="work" className="scroll-mt-20 py-24">
        <div className="container-x">
          <Reveal>
            <div className="label">Selected Work</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl leading-tight">
              Real builds. Shown with permission.
            </h2>
            <p className="mt-4 text-body text-lg max-w-2xl">
              Each project below was shipped end-to-end by me. Want backend proof — A2P approvals, GHL workflows, DNS panels, codebases? Just ask.
            </p>
          </Reveal>

          {/* Featured — AGC HUB */}
          {featured && (
            <Reveal delay={0.05}>
              <article className="mt-10 bg-white border-2 border-navy rounded-3xl overflow-hidden shadow-soft">
                <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-3 border-b border-line">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    <Sparkles size={12} /> {featured.tag}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-dark text-white font-bold rounded-lg shadow-lift hover:-translate-y-0.5 transition-all text-sm whitespace-nowrap"
                  >
                    Request a walkthrough <ArrowRight size={15} />
                  </a>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight mb-3">{featured.title}</h3>
                  <p className="text-body leading-relaxed mb-5">{featured.summary}</p>
                  {featured.wins && (
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {featured.wins.map((w) => (
                        <div key={w} className="flex items-start gap-2.5 text-sm text-ink bg-navy-tint/40 border border-navy/15 rounded-lg p-3">
                          <ShieldCheck size={16} className="text-emerald flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{w}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Screenshot gallery — real shots of the live internal app */}
                  {featured.gallery && (
                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                      {featured.gallery.map((g) => (
                        <figure key={g.src} className="group">
                          <div className="aspect-[16/10] rounded-xl overflow-hidden border border-line bg-slate-100">
                            <img
                              src={g.src}
                              alt={g.label}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => { e.currentTarget.closest('figure').style.display = 'none'; }}
                              className="w-full h-full object-cover object-left-top group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          </div>
                          <figcaption className="mt-2 text-[11px] text-muted leading-snug">{g.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                  {featured.previewLine && (
                    <div className="mb-6 p-4 bg-gold/10 border-l-4 border-gold rounded-r-lg">
                      <div className="text-[10px] uppercase tracking-widest text-amber-700 font-extrabold mb-1">ℹ️ About this build</div>
                      <p className="text-sm text-ink font-medium leading-relaxed">{featured.previewLine}</p>
                    </div>
                  )}
                  <div className="mt-6 pt-5 border-t border-line text-xs text-muted font-mono">
                    Stack: {featured.stack.join(' · ')}
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          {/* Rest — cards with screenshot thumbnails */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {rest.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.05}>
                <article className="bg-white border border-line rounded-2xl overflow-hidden h-full flex flex-col hover:border-navy hover:shadow-soft transition-all">
                  {/* Screenshot thumbnail — clickable when there's a live URL.
                      Initials gradient shows as fallback (and for builds with
                      no public screenshot, e.g. the demo). */}
                  {(() => {
                    const Thumb = (
                      <div className="relative aspect-[16/9] bg-gradient-to-br from-navy-tint to-blue-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-navy text-5xl font-extrabold opacity-60">
                          {w.initials}
                        </div>
                        {w.thumb && (
                          <img
                            src={w.thumb}
                            alt={`${w.title} — screenshot`}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className="absolute inset-0 w-full h-full object-cover object-left-top"
                          />
                        )}
                      </div>
                    );
                    return w.liveUrl ? (
                      <a href={w.liveUrl} target="_blank" rel="noopener" className="block group/thumb">
                        {Thumb}
                      </a>
                    ) : Thumb;
                  })()}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block text-[10px] font-extrabold px-2.5 py-1 bg-navy text-white rounded-full uppercase tracking-wider">{w.tag}</span>
                      {w.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted font-medium">
                          <MapPin size={11} /> {w.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-2 leading-snug">{w.title}</h3>
                    <p className="text-sm text-body leading-relaxed flex-1">{w.summary}</p>

                    {w.id === 'bishop' && (
                      <div className="mt-4 p-3 bg-gold/10 border-l-4 border-gold rounded-r-lg">
                        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-amber-700 mb-1">
                          <MousePointerClick size={12} /> Interactive demo
                        </div>
                        <p className="text-xs text-ink leading-relaxed">
                          Submit a form on the live demo → watch the GHL workflow fire in real-time in the embedded backend view.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-line text-[11px] text-muted font-mono leading-relaxed">
                      {w.stack.join(' · ')}
                    </div>
                    {w.liveUrl && (
                      <a
                        href={w.liveUrl}
                        target="_blank"
                        rel="noopener"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-navy-dark hover:underline"
                      >
                        <ExternalLink size={14} /> {w.liveUrl.replace('https://', '').replace('www.', '')}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={13} className="text-emerald" />
              Shown with permission · client work delivered under Arrow Group Consulting (Michigan, USA) · references on request
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================= EXPERIENCE + EDUCATION */}
      <section id="experience" className="scroll-mt-20 py-24 bg-slate-50 border-y border-line">
        <div className="container-x">
          <Reveal>
            <div className="label">Experience</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight flex items-center gap-3">
              <Briefcase size={28} className="text-navy" /> Where I've worked.
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6">
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
                    <span className="text-xs font-mono text-muted bg-slate-50 border border-line rounded px-2.5 py-1">{e.dates}</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {e.bullets.map((b) => (
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

          {/* Education */}
          <Reveal delay={0.1}>
            <h3 className="mt-14 mb-6 text-xl font-bold text-ink flex items-center gap-2">
              <GraduationCap size={22} className="text-navy" /> Education
            </h3>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((ed, i) => (
              <Reveal key={ed.degree} delay={i * 0.05}>
                <article className="bg-white border border-line rounded-2xl p-6 h-full">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h4 className="text-base font-bold text-ink">{ed.degree}</h4>
                    <span className="text-xs font-mono text-muted whitespace-nowrap">{ed.dates}</span>
                  </div>
                  <div className="text-sm font-semibold text-navy mb-3">{ed.school}</div>
                  <p className="text-sm text-body leading-relaxed">{ed.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= TOOLS */}
      <section className="py-20 overflow-hidden">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-widest text-muted font-bold mb-3">My working tech stack</div>
              <h2 className="text-2xl md:text-3xl font-bold text-ink">
                {tools.length}+ tools across CRM, automation, code & infrastructure.
              </h2>
              <p className="mt-3 text-sm text-muted">Hover the strip to pause.</p>
            </div>
          </Reveal>
        </div>
        <Reveal><LogoMarquee /></Reveal>
      </section>

      {/* ============================================================= CONTACT */}
      <ContactSection />
    </PageTransition>
  );
}

/* ───────────────────────────────────────────────────────── Contact section */
function ContactSection() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const onSubmit = async (data) => {
    try {
      // Keep keys stable — renaming breaks the GHL WF-PORTFOLIO custom-field mappings.
      const payload = {
        name: data.name || '',
        email: data.email || '',
        company: data.company || '',
        message: data.message || '',
        source: 'portfolio_contact_form',
        page: '/#contact',
        submitted_at: new Date().toISOString(),
      };

      if (!PORTFOLIO_GHL_WEBHOOK) {
        // eslint-disable-next-line no-console
        console.error('PORTFOLIO_GHL_WEBHOOK is not set in content.js');
        setSubmitStatus('error');
        return;
      }

      const res = await fetch(PORTFOLIO_GHL_WEBHOOK, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) { setSubmitStatus('success'); reset(); }
      else { setSubmitStatus('error'); }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24 bg-gradient-to-br from-ink to-navy-dark text-white">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Get in touch</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ textWrap: 'balance' }}>
              Hiring, contracting, or just want to talk?
            </h2>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              Open to full-time remote, contract, or fractional engagements. I reply within hours during US business time. References available on request.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-7 md:p-9 text-ink">
              {submitStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald/15 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">Thanks — message received.</h3>
                  <p className="text-body">I'll reply personally within a few hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Field label="Your name" error={errors.name?.message}>
                    <input
                      {...register('name', { required: 'Required' })}
                      placeholder="Jane Cooper"
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      {...register('company')}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                    />
                  </Field>
                  <Field label="What's the role / opportunity?" error={errors.message?.message}>
                    <textarea
                      {...register('message', { required: 'Required', minLength: { value: 10, message: 'A few more details please' } })}
                      rows={5}
                      placeholder="Role title, timeline, stack, team size — whatever's helpful. Or just say hi."
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg text-ink placeholder-muted focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10 resize-y"
                    />
                  </Field>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending…' : 'Send message →'}
                  </button>
                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Something broke. Email me directly: <a href={`mailto:${profile.email}`} className="underline font-semibold">{profile.email}</a></span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          {/* Direct contact */}
          <Reveal delay={0.1} className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-4">Or reach me directly</div>
            <ContactCard icon={Mail} label="Email · replies in hours" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactCard icon={MessageCircle} label="WhatsApp · fastest channel" value={profile.whatsapp} href={profile.whatsappLink} />
            <ContactCard icon={Linkedin} label="LinkedIn" value="Joshua Solomon" href={profile.linkedin} />
            <ContactCard icon={Facebook} label="Facebook · Messenger" value="Joshua Solomon" href={profile.facebook} />

            <a href="/Joshua_Solomon_Resume_v6.pdf" download className="flex items-center gap-4 p-4 bg-gold/15 border border-gold/40 rounded-xl hover:bg-gold/25 transition-all">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center text-ink flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">Resume</div>
                <div className="text-sm font-semibold text-white truncate">Download .pdf</div>
              </div>
              <Download size={16} className="text-white/60" />
            </a>

            <div className="pt-5 mt-5 border-t border-white/10 text-xs text-white/55 leading-relaxed">
              <div className="font-bold text-white mb-1.5">Working hours</div>
              US business hours, Mon–Fri. I respond within hours, not days. Weekends I check WhatsApp.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-2">
        {label}{error && <span className="text-red-600 font-normal text-xs ml-2">{error}</span>}
      </span>
      {children}
    </label>
  );
}

function ContactCard({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener"
      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs uppercase tracking-wider text-white/55 font-semibold">{label}</div>
        <div className="text-sm font-semibold text-white truncate">{value}</div>
      </div>
    </a>
  );
}
