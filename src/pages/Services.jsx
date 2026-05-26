import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services, pricingTiers } from '../data/content.js';

export default function Services() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="pt-20 pb-16">
        <div className="container-x">
          <Reveal>
            <div className="label">Services</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-3xl leading-tight">
              Four services. Three tiers. End-to-end.
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

      {/* RECENT TECHNICAL WINS — proof of capability, anchored to real clients */}
      <section className="py-20 bg-slate-50 border-y border-line">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-xs uppercase tracking-widest font-bold text-emerald mb-3">✓ Recent technical wins</div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">The stuff most agencies fail at.</h2>
              <p className="mt-4 text-body max-w-2xl mx-auto leading-relaxed">
                Real shipped work across the retainer book. The kind of capability that's hard to verify until you've actually worked with someone — so here are the receipts.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal delay={0}>
              <div className="bg-white border border-line rounded-2xl p-6 h-full hover:border-emerald hover:shadow-soft transition-all">
                <div className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold bg-emerald/10 text-emerald border border-emerald/30 px-2 py-0.5 rounded mb-4">
                  A2P 10DLC
                </div>
                <h3 className="font-bold text-ink mb-2 leading-snug">Brand-approved SMS at scale</h3>
                <p className="text-sm text-body leading-relaxed">
                  The single hardest GHL approval — most agencies fail it. Got it for <strong className="text-ink">Alpha Omega Utility</strong>: verified business number, legal SMS to leads, carrier-compliant on day one.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="bg-white border border-line rounded-2xl p-6 h-full hover:border-emerald hover:shadow-soft transition-all">
                <div className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold bg-emerald/10 text-emerald border border-emerald/30 px-2 py-0.5 rounded mb-4">
                  Email Infra
                </div>
                <h3 className="font-bold text-ink mb-2 leading-snug">Dedicated sending infrastructure</h3>
                <p className="text-sm text-body leading-relaxed">
                  Built <strong className="text-ink">HOME.FM</strong>'s email infrastructure from scratch: dedicated subdomain, SPF/DKIM/DMARC aligned, SSL issued, warmup completed to <strong className="text-ink">6,500 emails/day</strong> capacity. Inbox, not spam folder.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white border border-line rounded-2xl p-6 h-full hover:border-emerald hover:shadow-soft transition-all">
                <div className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold bg-emerald/10 text-emerald border border-emerald/30 px-2 py-0.5 rounded mb-4">
                  Custom Code
                </div>
                <h3 className="font-bold text-ink mb-2 leading-snug">Multi-brand site architecture</h3>
                <p className="text-sm text-body leading-relaxed">
                  Custom-coded <strong className="text-ink">Alliance Service Brands</strong>' site unifying <strong className="text-ink">6 specialized brands</strong> under one visual system — construction, handyman, windows, real estate, lake property, financing.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-white border border-line rounded-2xl p-6 h-full hover:border-emerald hover:shadow-soft transition-all">
                <div className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold bg-emerald/10 text-emerald border border-emerald/30 px-2 py-0.5 rounded mb-4">
                  Apps Script
                </div>
                <h3 className="font-bold text-ink mb-2 leading-snug">Custom back-office databases</h3>
                <p className="text-sm text-body leading-relaxed">
                  Built <strong className="text-ink">Ada's Closet</strong>'s entire back-office: Google Apps Script database the client views live, multi-platform listing flow across Poshmark / eBay / Depop, notification triggers on every sale.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link to="/works" className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-navy-dark hover:underline">
                See the full work portfolio <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING TIERS — 3-tier with anchored middle */}
      <section className="py-20 bg-gradient-to-br from-ink to-navy-dark text-white">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Pricing — three tiers</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Pick how hands-off you want to be.</h2>
              <p className="mt-4 text-white/75 text-lg">No setup fee on any tier — your first invoice is just your first month. Same speed. Same direct line. Just different ongoing scope.</p>
            </div>
          </Reveal>

          {/* Tier cards — 3 columns */}
          <Reveal delay={0.1}>
            <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-5 items-stretch">
              {pricingTiers.map((t) => {
                let cardClass = 'bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-7';
                if (t.recommended) cardClass = 'bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur rounded-2xl border-2 border-gold/50 p-7 relative shadow-2xl md:-mt-4 md:mb-0';
                if (t.alternative) cardClass = 'bg-white/3 backdrop-blur rounded-2xl border-2 border-dashed border-white/25 p-7 relative';
                const accentColor = t.recommended ? 'text-gold' : t.alternative ? 'text-white/70' : 'text-white/55';
                const checkColor = t.recommended ? 'text-gold' : t.alternative ? 'text-white/60' : 'text-emerald';
                return (
                  <div key={t.id} className={cardClass}>
                    {t.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold text-ink text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                        <Star size={11} fill="currentColor" /> Most popular
                      </div>
                    )}
                    {t.alternative && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-ink text-white/85 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap border border-white/25">
                        Alternative · No retainer
                      </div>
                    )}
                    <div className={`text-xs uppercase tracking-widest font-bold mb-3 ${accentColor}`}>{t.name}</div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <div className="text-4xl font-extrabold text-white">{t.price}</div>
                      <div className="text-sm text-white/65 font-medium">{t.period}</div>
                    </div>
                    <div className="text-sm text-white/70 mb-5 leading-snug">{t.tagline}</div>

                    <ul className="space-y-2 text-sm">
                      {t.bullets.map(li => (
                        <li key={li} className="flex items-start gap-2 text-white/90">
                          <Check size={13} className={`flex-shrink-0 mt-0.5 ${checkColor}`} />
                          <span className="leading-snug">{li}</span>
                        </li>
                      ))}
                    </ul>

                    {t.badge && (
                      <div className="mt-5 pt-4 border-t border-white/10 text-xs text-gold font-bold">
                        💡 {t.badge}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* The "leaving" honest paragraph */}
          <Reveal delay={0.25}>
            <div className="max-w-4xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
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
