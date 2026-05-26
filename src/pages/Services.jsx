import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Globe, Database, Mail, Plug, Bot, Image as ImageIcon, Film, ExternalLink } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services, pricingTiers, contentSamples } from '../data/content.js';
import LazyYouTube from '../components/LazyYouTube.jsx';
import PlannerTeaser from '../components/PlannerTeaser.jsx';

// Icon per service id — keeps the visual consistent with the rest of the site
const SERVICE_ICONS = {
  website: Globe,
  crm: Database,
  automation: Mail,
  integration: Plug,
  'ai-automation': Bot,
};

export default function Services() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="pt-20 pb-16">
        <div className="container-x">
          <Reveal>
            <div className="label">Services</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-4xl leading-tight">
              Five services. Two tiers.
              <br />
              <span className="whitespace-nowrap">End-to-end.</span>
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              I don't sell hours. I sell outcomes. Each service below has a clear shipped-state — the moment you can stop worrying about it. Pick the tier that fits how hands-off you want to be.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICE CARDS — horizontal stacked layout (matches Works visual rhythm) */}
      <section className="pb-20">
        <div className="container-x space-y-6">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Globe;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <article className="bg-white border border-line rounded-2xl p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10 hover:border-navy hover:shadow-soft transition-all">
                  {/* Left side: Service number + icon */}
                  <div className="md:w-1/4 flex md:flex-col items-center md:items-start gap-5 md:gap-4 flex-shrink-0">
                    <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-navy/15 leading-none">0{i + 1}</div>
                    <div className="w-14 h-14 rounded-xl bg-navy-tint flex items-center justify-center text-navy">
                      <Icon size={26} />
                    </div>
                  </div>

                  {/* Right side: All the content */}
                  <div className="md:w-3/4 flex-1">
                    <div className="text-xs uppercase tracking-widest text-navy font-bold mb-2">Service · 0{i + 1}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3 leading-tight">{s.title}</h3>
                    <p className="text-body mb-6 leading-relaxed">{s.summary}</p>

                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                          <Check size={16} className="text-emerald flex-shrink-0 mt-0.5" />
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

      {/* PRICING TIERS — 2-tier */}
      <section className="py-20 bg-gradient-to-br from-ink to-navy-dark text-white">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Pricing — two tiers</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Pick how hands-off you want to be.</h2>
              <p className="mt-4 text-white/75 text-lg">No setup fee on either tier — your first invoice is just your first month. Same speed. Same direct line. Just different ongoing scope.</p>
            </div>
          </Reveal>

          {/* Tier cards — 2 columns */}
          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto mt-14 grid gap-5 md:grid-cols-2 items-stretch">
              {pricingTiers.map((t) => {
                let cardClass = 'bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-7';
                if (t.recommended) cardClass = 'bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur rounded-2xl border-2 border-gold/50 p-7 relative shadow-2xl md:-mt-4 md:mb-0';
                const accentColor = t.recommended ? 'text-gold' : 'text-white/55';
                const checkColor = t.recommended ? 'text-gold' : 'text-emerald';
                return (
                  <div key={t.id} className={cardClass}>
                    {t.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold text-ink text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                        <Star size={11} fill="currentColor" /> Most popular
                      </div>
                    )}
                    <div className={`text-xs uppercase tracking-widest font-bold mb-3 ${accentColor}`}>{t.name}</div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <div className="text-4xl font-extrabold text-white">{t.price}</div>
                      <div className="text-sm text-white/65 font-medium">{t.period}</div>
                    </div>
                    {t.commitment && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold bg-white/10 text-white/75 px-2 py-0.5 rounded mb-3">
                        🔒 {t.commitment}
                      </div>
                    )}
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

          {/* How billing works — credibility signal */}
          <Reveal delay={0.22}>
            <div className="max-w-4xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">💳 How billing works</div>
              <p className="text-sm text-white/80 leading-relaxed">
                <strong className="text-white">Once we agree on scope, you get a Stripe invoice link via email.</strong> First month charged on the day you sign. Card on file auto-renews monthly. No bank transfers, no PDFs to print, no payment gymnastics. Cancel any month after your minimum — invoicing stops the same day.
              </p>
            </div>
          </Reveal>

          {/* Honest commitment + leaving paragraph */}
          <Reveal delay={0.25}>
            <div className="max-w-4xl mx-auto mt-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">🔒 Why the minimum commitment + what happens after</div>
              <div className="space-y-3 text-sm text-white/80 leading-relaxed">
                <p>
                  <strong className="text-white">The system needs time to work.</strong> A CRM with 0 days of email data doesn't convert. One with 90+ days of data, optimization, and a few automation iterations does. The minimum commitment is what makes my "no setup fee" math sustainable — Core (6 months) and Full Marketing (3 months) each amount to the same $6,000 floor, which covers the build + the time the system needs to actually produce results.
                </p>
                <p>
                  <strong className="text-white">After your minimum, you cancel any month.</strong> No exit fees. No surprise charges. Your contacts, your code, your brand assets — all yours, exported on request. You'd set up your own GHL Pro ($297/mo direct to GHL) and your own Cloudflare account (free), and I hand the keys over. The retainer just bundles platform costs so you only see one number while we're working together.
                </p>
              </div>
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

      {/* CONTENT SAMPLES — visual proof of what the Full Marketing tier produces */}
      <section className="py-20 bg-white border-t border-line">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">Content samples · Full Marketing tier</div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
                What the $2k tier actually ships.
              </h2>
              <p className="mt-4 text-body leading-relaxed">
                {contentSamples.disclosure}
              </p>
            </div>
          </Reveal>

          {/* Graphics grid — 3-col desktop, 2-col tablet, 1-col mobile */}
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

          {/* Long-form video (16:9) — 2x2 grid on desktop, stacks on mobile */}
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

          {/* Short-form reels (9:16) — 3-col on tablet+, stacks on mobile */}
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

      {/* Sitewide planner teaser — pulls visitors into the qualification step */}
      <PlannerTeaser
        title="Not sure which tier fits? Try the planner."
        subtitle="Five quick questions. No email gate. You'll get a scoped plan — what to build, in what order, what it costs, and a week-by-week timeline."
      />
    </PageTransition>
  );
}
