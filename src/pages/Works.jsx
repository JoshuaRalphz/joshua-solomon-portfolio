import { ArrowRight, ExternalLink, MapPin, ShieldCheck, FileText, MousePointerClick, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { works, profile } from '../data/content.js';

// Opens Gmail compose in a new tab — pre-filled with case study request.
const breakdownMailto = (workTitle) => {
  const subject = `Case study request — ${workTitle}`;
  const body = `Hi Joshua,\n\nI'd like the full case study for "${workTitle}" — including backend screenshots and your specific role.\n\nA bit about me / my hiring need:\n\nThanks!`;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function Works() {
  const featured = works.find(w => w.featured);
  const rest = works.filter(w => !w.featured);

  return (
    <PageTransition>
      <section className="pt-20 pb-12">
        <div className="container-x">
          <Reveal>
            <div className="label">Selected Work</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-3xl leading-tight">
              Real builds. Shown with permission.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl">
              Each project below was shipped end-to-end by me. Want backend proof — A2P approvals, GHL workflows, DNS panels, codebases? Email me from any card for the full breakdown.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED — AGC HUB (internal PWA, the strongest portfolio piece) */}
      {featured && (
        <section className="pb-12">
          <div className="container-x">
            <Reveal>
              <article className="bg-white border-2 border-navy rounded-3xl overflow-hidden shadow-soft">
                <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-3 border-b border-line">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    <Sparkles size={12} /> {featured.tag}
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-dark text-white font-bold rounded-lg shadow-lift hover:-translate-y-0.5 transition-all text-sm whitespace-nowrap"
                  >
                    Request a walkthrough <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-ink leading-tight mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-body leading-relaxed mb-5">{featured.summary}</p>

                  {/* Wins grid */}
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

                  {/* Preview-line callout — internal tool note */}
                  {featured.previewLine && (
                    <div className="mb-6 p-4 bg-gold/10 border-l-4 border-gold rounded-r-lg">
                      <div className="text-[10px] uppercase tracking-widest text-amber-700 font-extrabold mb-1">👇 Why no live URL</div>
                      <p className="text-sm text-ink font-medium leading-relaxed">{featured.previewLine}</p>
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-line text-xs text-muted font-mono">
                    Stack: {featured.stack.join(' · ')}
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* OTHER WORK */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6 mt-8">
              <div className="text-xs uppercase tracking-widest text-muted font-bold">Other recent builds</div>
              <div className="inline-flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck size={13} className="text-emerald" />
                Shown with permission · delivered under Arrow Group Consulting (Michigan, USA) · references on request
              </div>
            </div>
          </Reveal>

          {/* Horizontal cards */}
          <div className="space-y-6">
            {rest.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.07}>
                <article className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:border-navy hover:shadow-soft transition-all">
                  {/* Thumb — clickable if there's a live URL */}
                  {w.liveUrl ? (
                    <a
                      href={w.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="block lg:w-1/3 aspect-[16/10] lg:aspect-auto lg:min-h-[260px] bg-gradient-to-br from-navy-tint to-blue-100 relative overflow-hidden flex-shrink-0"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-navy text-6xl font-extrabold">
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
                    </a>
                  ) : (
                    <div className="lg:w-1/3 aspect-[16/10] lg:aspect-auto lg:min-h-[260px] bg-gradient-to-br from-navy-tint to-blue-100 relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center text-navy text-6xl font-extrabold">
                        {w.initials}
                      </div>
                    </div>
                  )}

                  {/* Card body */}
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block text-[11px] font-extrabold px-3 py-1.5 bg-navy text-white rounded-full uppercase tracking-wider shadow-soft">{w.tag}</span>
                      {w.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted font-medium">
                          <MapPin size={12} /> {w.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-ink mb-3 leading-snug">{w.title}</h3>
                    <p className="text-sm lg:text-base text-body leading-relaxed flex-1">{w.summary}</p>

                    {/* Bishop-specific: highlight the interactive backend demo */}
                    {w.id === 'bishop' && (
                      <div className="mt-4 p-4 bg-gold/10 border-l-4 border-gold rounded-r-lg">
                        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-700 mb-1">
                          <MousePointerClick size={13} /> Interactive demo
                        </div>
                        <p className="text-sm text-ink leading-relaxed">
                          Submit a form on the live demo site → watch the GHL workflow fire in real-time in the embedded backend view. Built specifically to show how the full stack ties together.
                        </p>
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-line text-xs text-muted font-mono">
                      {w.stack.join(' · ')}
                    </div>

                    {/* Action area */}
                    <div className="mt-4 pt-3 border-t border-line flex flex-wrap items-center gap-x-4 gap-y-2">
                      {w.liveUrl && (
                        <a
                          href={w.liveUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-navy-dark hover:underline"
                        >
                          <ExternalLink size={14} /> {w.liveUrl.replace('https://', '').replace('www.', '')}
                        </a>
                      )}
                      <a
                        href={breakdownMailto(w.title)}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-navy transition-colors ml-auto"
                      >
                        <FileText size={12} /> Request a full case study →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

    </PageTransition>
  );
}
