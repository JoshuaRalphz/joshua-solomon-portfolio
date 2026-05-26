import { Link } from 'react-router-dom';
import { ArrowRight, Check, Megaphone, Plus, Star } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services, addOns, pricingTiers } from '../data/content.js';

const ADDON_ICONS = { Megaphone };

export default function Services() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="pt-20 pb-16">
        <div className="container-x">
          <Reveal>
            <div className="label">Services</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-3xl leading-tight">
              Four services. Two tiers. End-to-end.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              I don't sell hours. I sell outcomes. Each service below has a clear shipped-state — the moment you can stop worrying about it. Pick the tier that fits how hands-off you want to be.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="pb-20">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div className="bg-white border border-line rounded-2xl p-8 h-full hover:border-navy hover:shadow-soft transition-all flex flex-col">
                <div className="text-xs uppercase tracking-widest text-navy font-bold mb-2">Service · 0{i + 1}</div>
                <h3 className="text-2xl font-bold text-ink mb-2 leading-tight">{s.title}</h3>
                <p className="text-body mb-6">{s.summary}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                      <Check size={16} className="text-emerald flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line pt-5 mt-auto">
                  <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Outcome</div>
                  <p className="text-sm font-semibold text-ink">{s.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-20 bg-gradient-to-br from-ink to-navy-dark text-white">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Pricing — two tiers</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Pick how hands-off you want to be.</h2>
              <p className="mt-4 text-white/75 text-lg">Flat $1,000 setup either way. Same setup, same speed, same direct line — just different scope of ongoing work.</p>
            </div>
          </Reveal>

          {/* Tier cards */}
          <Reveal delay={0.1}>
            <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-5">
              {pricingTiers.map((t) => (
                <div
                  key={t.id}
                  className={
                    t.recommended
                      ? 'bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur rounded-2xl border-2 border-gold/50 p-8 relative shadow-2xl'
                      : 'bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8'
                  }
                >
                  {t.recommended && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 bg-gold text-ink text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      <Star size={12} fill="currentColor" /> Recommended
                    </div>
                  )}
                  <div className={`text-xs uppercase tracking-widest font-bold mb-3 ${t.recommended ? 'text-gold' : 'text-white/55'}`}>{t.name}</div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <div className="text-5xl font-extrabold text-white">{t.price}</div>
                    <div className="text-base text-white/65 font-medium">{t.period}</div>
                  </div>
                  <div className="text-sm text-white/70 mb-6">{t.tagline}</div>

                  <ul className="space-y-2.5 text-sm">
                    {t.bullets.map(li => (
                      <li key={li} className="flex items-start gap-2 text-white/90">
                        <Check size={14} className={`flex-shrink-0 mt-0.5 ${t.recommended ? 'text-gold' : 'text-emerald'}`} />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Setup + payment timeline */}
          <Reveal delay={0.15}>
            <div className="max-w-3xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-3">+ One-time setup (both tiers)</div>
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <div className="text-3xl font-extrabold text-white">$1,000</div>
                <div className="text-sm text-white/65">paid once at signing — covers the full build</div>
              </div>
              <div className="text-sm text-white/70 leading-relaxed">
                <strong className="text-white">First invoice = $1,000 setup + your tier's first month.</strong> Core starts at $2,000 day one, then $1,000/mo. Full Marketing starts at $3,000 day one, then $2,000/mo.
              </div>
            </div>
          </Reveal>

          {/* Paid ads add-on — single card under tiers */}
          <Reveal delay={0.2}>
            <div className="max-w-3xl mx-auto mt-8">
              <div className="text-xs uppercase tracking-widest font-bold text-white/55 mb-3 flex items-center gap-2">
                <Plus size={12} /> Optional add-on (bolts onto either tier)
              </div>
              {addOns.map((a) => {
                const Icon = ADDON_ICONS[a.icon] || Megaphone;
                return (
                  <div key={a.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7 flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white leading-tight">{a.title}</h3>
                        <span className="text-sm font-bold text-gold whitespace-nowrap">{a.pricing}</span>
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* The "leaving" honest paragraph */}
          <Reveal delay={0.25}>
            <div className="max-w-3xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">If you ever want to leave</div>
              <p className="text-white/80 text-sm leading-relaxed">
                Your contacts, your code, your brand assets — all yours, exported on request. The only thing that moves is the infrastructure: you'd set up your own GHL Pro ($297/mo direct to GHL) and your own Cloudflare account (free) and I hand the keys over. No hostage situation, no exit fees. The retainer just bundles the platform costs so you only see one number.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="max-w-3xl mx-auto mt-10 flex flex-wrap gap-3 justify-center">
              <Link to="/plan" className="btn-gold">
                Get my plan <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 transition text-white font-semibold rounded-lg">
                Or just email me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
