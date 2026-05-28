import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Globe, Database, Mail, Workflow, Bot, Image as ImageIcon, Film, ExternalLink, Sparkles, Play } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { services, pricingTiers, contentSamples, leadGenDemo } from '../data/content.js';
import LazyYouTube from '../components/LazyYouTube.jsx';
import PlannerTeaser from '../components/PlannerTeaser.jsx';

// Icon per service id — keeps the visual consistent with the rest of the site
const SERVICE_ICONS = {
  crm: Database,
  website: Globe,
  'email-automation': Mail,
  'lead-gen': Bot,
  'workflow-automation': Workflow,
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
              Five capabilities.
              <br />
              <span className="whitespace-nowrap">One technical operator.</span>
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl leading-relaxed">
              Marketing systems that actually run on themselves. No agency layers, no project managers, no theme-based shortcuts. Pick the tier that matches what you actually need.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICE CARDS — horizontal stacked layout (matches Works visual rhythm) */}
      <section className="pb-20">
        <div className="container-x space-y-6">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Globe;
            const cardBorder = s.featured
              ? 'border-gold/40 bg-gradient-to-br from-gold/5 to-white hover:border-gold hover:shadow-lift'
              : 'border-line hover:border-navy hover:shadow-soft';
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <article className={`bg-white border-2 rounded-2xl p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10 transition-all ${cardBorder}`}>
                  {/* Left side: Service number + icon */}
                  <div className="md:w-1/4 flex md:flex-col items-center md:items-start gap-5 md:gap-4 flex-shrink-0">
                    <div className={`text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none ${s.featured ? 'text-gold/30' : 'text-navy/15'}`}>0{i + 1}</div>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.featured ? 'bg-gold/15 text-gold' : 'bg-navy-tint text-navy'}`}>
                      <Icon size={26} />
                    </div>
                  </div>

                  {/* Right side: All the content */}
                  <div className="md:w-3/4 flex-1">
                    <div className={`flex items-center gap-2 mb-2 text-xs uppercase tracking-widest font-bold ${s.featured ? 'text-gold' : 'text-navy'}`}>
                      <span>Service · 0{i + 1}</span>
                      {s.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-[10px] tracking-wider">
                          <Sparkles size={10} /> Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3 leading-tight">{s.title}</h3>
                    <p className="text-body mb-6 leading-relaxed">{s.summary}</p>

                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                          <Check size={16} className={`flex-shrink-0 mt-0.5 ${s.featured ? 'text-gold' : 'text-emerald'}`} />
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

      {/* PRICING TIERS — 3-tier */}
      <section className="py-20 bg-gradient-to-br from-ink to-navy-dark text-white">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-widest font-bold text-gold mb-3">Pricing — flat monthly</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">No setup fees. No tool charges.</h2>
              <p className="mt-4 text-white/75 text-lg">Pick the tier that matches what you actually need. All software, all infrastructure, all tools — covered.</p>
            </div>
          </Reveal>

          {/* Tier cards — 3 columns */}
          <Reveal delay={0.1}>
            <div className="max-w-6xl mx-auto mt-14 grid gap-5 lg:grid-cols-3 items-stretch">
              {pricingTiers.map((t) => {
                let cardClass = 'bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-7';
                if (t.recommended) cardClass = 'bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur rounded-2xl border-2 border-gold/50 p-7 relative shadow-2xl lg:-mt-4 lg:mb-0';
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
                    <div className="text-sm text-white/85 mb-2 leading-snug font-semibold">{t.tagline}</div>
                    {t.bestFor && (
                      <div className="text-xs text-white/65 mb-5 leading-relaxed">
                        <span className="font-bold text-white/85">Best for:</span> {t.bestFor}
                      </div>
                    )}

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
                  <strong className="text-white">The system needs time to work.</strong> A CRM with 0 days of email data doesn't convert. A lead-gen pipeline needs ~30 days of warmup before reply rates stabilize. The minimum commitment is what makes my "no setup fee" math sustainable — Core (6 months), Automation Pro (4 months — the pipeline needs warmup time), Full Marketing (3 months — fastest because the team is already producing).
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

      {/* LEAD-GEN SYSTEM DEMO — proof for the Automation Pro tier */}
      <section className="py-20 bg-gradient-to-b from-white via-navy-tint/30 to-white border-t border-line">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="text-xs uppercase tracking-widest font-bold text-navy mb-3">How my lead-gen system works</div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
                {leadGenDemo.title}
              </h2>
              <p className="mt-4 text-body leading-relaxed">
                {leadGenDemo.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              {leadGenDemo.videoId ? (
                <LazyYouTube id={leadGenDemo.videoId} label="Lead-gen system demo" vertical={false} />
              ) : (
                /* Stand-in thumbnail — branded, looks like a paused player */
                <Link
                  to="/plan"
                  aria-label="See Automation Pro pricing"
                  className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-lift hover:shadow-2xl transition-shadow"
                >
                  {/* Background — navy gradient with subtle workflow texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-ink" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 30%, rgba(251,191,36,0.4) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.35) 0%, transparent 35%)',
                    }}
                  />
                  {/* Abstract pipeline visual — 3 dots connected by lines */}
                  <div className="absolute inset-0 flex items-center justify-around px-12 opacity-30">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                        {i < 2 && <div className="absolute h-px w-1/4 bg-white/40" style={{ left: `${22 + i * 28}%`, top: '50%' }} />}
                      </div>
                    ))}
                  </div>

                  {/* Top-left label */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-slow-pulse" />
                    Live demo · 90 seconds
                  </div>

                  {/* Centered play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={36} className="text-navy ml-2" fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/85 to-transparent">
                    <div className="text-white font-bold text-lg md:text-xl leading-tight">
                      The n8n lead-gen pipeline I run on myself
                    </div>
                    <div className="text-white/75 text-sm mt-1.5">
                      Scrape → enrich → personalize with AI → queue drafts in your inbox
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="max-w-2xl mx-auto mt-10 text-center">
              <p className="text-body leading-relaxed mb-5">
                I'll build this for you in 14 days. AI-personalized outreach, multi-source lead scraping, and CRM integration — all running on your stack.
              </p>
              <Link
                to="/plan"
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white font-bold px-6 py-3 rounded-lg shadow-soft hover:shadow-lift transition-all"
              >
                See Automation Pro pricing <ArrowRight size={16} />
              </Link>
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
