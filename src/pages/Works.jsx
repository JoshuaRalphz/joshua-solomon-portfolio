import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin, ShieldCheck, FileText, MousePointerClick } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { works, profile } from '../data/content.js';

// Opens Gmail compose in a new tab — pre-filled with case study request.
// Falls back to the user's mailto: handler only if Gmail web isn't accessible.
const breakdownMailto = (workTitle) => {
  const subject = `Full case study request — ${workTitle}`;
  const body = `Hi Joshua,\n\nI'd like the full case study for "${workTitle}" — including backend screenshots and your specific role.\n\nA bit about me / my business:\n\nThanks!`;
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
              Real builds. Anonymized where needed.
            </h1>
            <p className="mt-5 text-lg text-body max-w-2xl">
              Each project below was shipped end-to-end by me. Want backend proof — A2P approvals, GHL workflows, DNS panels? Email me from any card for the full breakdown.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED — Bishop */}
      {featured && (
        <section className="pb-12">
          <div className="container-x">
            <Reveal>
              <article className="bg-white border-2 border-navy rounded-3xl overflow-hidden shadow-soft">
                <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-3 border-b border-line">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {featured.tag}
                  </span>
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-dark text-white font-bold rounded-lg shadow-lift hover:-translate-y-0.5 transition-all text-sm"
                  >
                    <ExternalLink size={15} />
                    Open live demo: {featured.liveUrl.replace('https://', '')}
                  </a>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-ink leading-tight mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-body leading-relaxed mb-4">{featured.summary}</p>

                  {/* "What you'd see in your own build" framing */}
                  {featured.previewLine && (
                    <div className="mb-6 p-4 bg-gold/10 border-l-4 border-gold rounded-r-lg">
                      <div className="text-[10px] uppercase tracking-widest text-amber-700 font-extrabold mb-1">👇 What you'd see in your own build</div>
                      <p className="text-sm text-ink font-medium leading-relaxed">{featured.previewLine}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    {featured.videos.map(v => (
                      <div key={v.id}>
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-soft">
                          <iframe
                            src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&hd=1&vq=hd1080`}
                            title={v.label}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="w-full h-full border-0"
                          />
                        </div>
                        <div className="mt-3">
                          <div className="font-semibold text-ink text-sm">{v.label}</div>
                          <div className="text-xs text-muted mt-0.5">{v.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BIG primary CTA — emphasized: try the backend live */}
                  <div className="mt-8 p-6 md:p-7 bg-gradient-to-br from-navy to-navy-dark rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-gold mb-1.5">
                        <MousePointerClick size={13} /> Try the GHL backend live
                      </div>
                      <div className="text-white font-bold text-lg leading-snug">
                        Submit any form on the demo site, then watch the GHL workflow fire in real-time in the embedded backend view. Most portfolios show screenshots. This one lets you poke it.
                      </div>
                    </div>
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:brightness-95 text-ink font-bold rounded-xl shadow-lift hover:-translate-y-0.5 transition-all text-base whitespace-nowrap"
                    >
                      <ExternalLink size={18} />
                      Try it now →
                    </a>
                  </div>

                  <div className="mt-7 pt-5 border-t border-line text-xs text-muted font-mono">
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
                Shown with client permission · delivered under Arrow Group Consulting (Michigan, USA) · references on request
              </div>
            </div>
          </Reveal>

          {/* Horizontal cards — 1-col stacked, thumb-left/content-right on tablet+ */}
          <div className="space-y-6">
            {rest.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.07}>
                <article className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-navy hover:shadow-soft transition-all">
                  {/* Thumb — clickable if there's a live URL */}
                  {w.liveUrl ? (
                    <a
                      href={w.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="block md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-gradient-to-br from-navy-tint to-blue-100 relative overflow-hidden flex-shrink-0"
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
                    <div className="md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-gradient-to-br from-navy-tint to-blue-100 relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center text-navy text-6xl font-extrabold">
                        {w.initials}
                      </div>
                    </div>
                  )}

                  {/* Card body — wider, more breathing room */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block text-xs font-semibold px-2 py-1 bg-navy-tint text-navy rounded">{w.tag}</span>
                      {w.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <MapPin size={11} /> {w.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-ink mb-3 leading-snug">{w.title}</h3>
                    <p className="text-sm md:text-base text-body leading-relaxed flex-1">{w.summary}</p>

                    <div className="mt-5 pt-4 border-t border-line text-xs text-muted font-mono">
                      {w.stack.join(' · ')}
                    </div>

                    {/* Action area — explicit links */}
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

          <div className="mt-14 text-center">
            <Link to="/plan" className="btn-primary">
              Want this for your business? <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
