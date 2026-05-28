import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, UserCheck, Wrench, Layers, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import LogoMarquee from '../components/LogoMarquee.jsx';
import PlannerTeaser from '../components/PlannerTeaser.jsx';
import { profile, stats, benefits, tools } from '../data/content.js';

const ICONS = { Zap, UserCheck, Wrench, Layers, Shield, TrendingUp };

export default function Home() {
  return (
    <PageTransition>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Decorative gradient */}
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
            I build the marketing systems{' '}
            <span className="bg-gradient-to-br from-navy to-blue-600 bg-clip-text text-transparent">
              your business actually runs on.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-body max-w-2xl leading-relaxed"
          >
            Your website, your CRM, your follow-up emails, your lead capture —
            all built and connected by one person who actually understands the technical side.
            No agency layers, no juggling vendors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/plan" className="btn-gold">
              Get my plan (90 sec) <ArrowRight size={18} />
            </Link>
            <Link to="/works" className="btn-ghost">
              See what I've built
            </Link>
          </motion.div>

          {/* Hero meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-line grid sm:grid-cols-3 gap-6"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Role</div>
              <div className="text-sm font-medium text-ink">{profile.role}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Based in</div>
              <div className="text-sm font-medium text-ink">{profile.location}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Availability</div>
              <div className="text-sm font-medium text-ink">{profile.available}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="bg-ink text-white py-10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {s.value.split(/(\+|\/mo| human)/).map((p, idx) =>
                  /^\+$|\/mo| human$/.test(p)
                    ? <span key={idx} className="text-gold">{p}</span>
                    : <span key={idx}>{p}</span>
                )}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/65 font-semibold">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="label">Why hire me</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Six reasons agencies pick a solo technical operator over a full-service shop.
            </h2>
            <p className="mt-4 text-body text-lg max-w-2xl">
              Not because cheaper — because faster, sharper, and end-to-end accountable.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = ICONS[b.icon] || Zap;
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

      {/* ============ TECH STACK CAROUSEL ============ */}
      <section className="py-20 bg-slate-50 border-y border-line overflow-hidden">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-widest text-muted font-bold mb-3">My working tech stack</div>
              <h2 className="text-2xl md:text-3xl font-bold text-ink">
                {tools.length}+ tools across CRM, automation, code & infrastructure.
              </h2>
              <p className="mt-3 text-sm text-muted">Hover the strip to pause. See the full categorized stack on the About page.</p>
            </div>
          </Reveal>
        </div>

        {/* Edge-to-edge marquee */}
        <Reveal>
          <LogoMarquee />
        </Reveal>

        <div className="container-x text-center mt-8">
          <Link to="/about#tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-navy-dark">
            See the full stack <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Sitewide planner teaser */}
      <PlannerTeaser
        title="Not sure where to start? Map your project in 90 seconds."
        subtitle="Five quick questions, no email gate. You'll get a custom recommendation — which systems to build, in what order, and how they fit your stack."
      />
    </PageTransition>
  );
}
