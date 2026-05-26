import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import PageTransition, { Reveal } from '../components/PageTransition.jsx';
import { works } from '../data/content.js';

// thum.io — fast auto-screenshot, no API key, no ugly placeholder. Lifetime cached on their CDN.
const shotUrl = (url) => {
  const clean = url.replace(/^https?:\/\//, '');
  return `https://image.thum.io/get/width/800/crop/500/noanimate/https://${clean}`;
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
              Each project below was shipped end-to-end by me. Want to see something specific live? Ask on a call.
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
                  <p className="text-body leading-relaxed mb-6">{featured.summary}</p>

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

                  {/* BIG primary CTA — visible right under the videos */}
                  <div className="mt-8 p-6 md:p-7 bg-gradient-to-br from-navy to-navy-dark rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-gold mb-1.5">Don't take my word for it</div>
                      <div className="text-white font-bold text-lg leading-snug">
                        Try the live demo yourself — submit a form and watch the GHL backend fire in real-time.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((w, i) => {
              const CardInner = (
                <article className="bg-white border border-line rounded-2xl overflow-hidden h-full flex flex-col hover:border-navy hover:shadow-soft hover:-translate-y-0.5 transition-all">
                  <div className="aspect-[16/10] bg-gradient-to-br from-navy-tint to-blue-100 relative overflow-hidden">
                    {/* Initials behind — visible if no image/thumb yet; image will cover when loaded */}
                    <div className="absolute inset-0 flex items-center justify-center text-navy text-5xl font-extrabold">
                      {w.initials}
                    </div>
                    {w.thumb && (
                      <img
                        src={w.thumb}
                        alt={`${w.title} — screenshot`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block text-xs font-semibold px-2 py-1 bg-navy-tint text-navy rounded">{w.tag}</span>
                      {w.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <MapPin size={11} /> {w.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2 leading-snug">{w.title}</h3>
                    <p className="text-sm text-body leading-relaxed flex-1">{w.summary}</p>
                    {w.wins && w.wins.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-line">
                        <div className="text-[10px] uppercase tracking-widest text-emerald font-bold mb-2">✓ Technical wins</div>
                        <div className="flex flex-wrap gap-1.5">
                          {w.wins.map(win => (
                            <span key={win} className="inline-flex items-center text-[10px] font-semibold bg-emerald/10 text-emerald border border-emerald/30 px-2 py-0.5 rounded">
                              {win}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={`${w.wins ? 'mt-3' : 'mt-4'} pt-3 border-t border-line text-xs text-muted font-mono`}>
                      {w.stack.join(' · ')}
                    </div>
                    {w.liveUrl && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-navy">
                        <ExternalLink size={13} /> {w.liveUrl.replace('https://', '').replace('www.', '')}
                      </div>
                    )}
                  </div>
                </article>
              );
              return (
                <Reveal key={w.id} delay={i * 0.07}>
                  {w.liveUrl ? (
                    <a href={w.liveUrl} target="_blank" rel="noopener" className="block h-full">
                      {CardInner}
                    </a>
                  ) : (
                    CardInner
                  )}
                </Reveal>
              );
            })}
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
