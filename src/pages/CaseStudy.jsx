import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import Footer from '../components/Footer.jsx';
import Diagram from '../components/Diagram.jsx';
import BrowserShot from '../components/media/BrowserShot.jsx';
import VideoFacade from '../components/media/VideoFacade.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { cases } from '../data/cases.js';

// Which phone screenshot sits on the hero browser frame (the gallery skips it).
const HERO_PHONE = 1;

/** Numbered section: mono step label + h2, the same voice as the home page heads. */
function Part({ n, id, title, children, className = '' }) {
  return (
    <section aria-labelledby={id} className={className}>
      <p className="label"><span className="label-num">{n}</span></p>
      <h2 id={id} className="t-h2 mt-2">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Hero({ study }) {
  return (
    <header className="case-hero">
      <div className="min-w-0">
        <a href="/#ai-systems" className="text-link inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm">
          <ArrowLeft size={16} aria-hidden="true" /> All systems
        </a>
        <p className="label mt-3"><span className="label-num">Case study {study.num}</span> · {study.kicker}</p>
        <h1 className="t-h1 mt-3">{study.name}</h1>
        <p className="t-outcome mt-4">{study.outcome}</p>
        <p className="t-lead mt-4 max-w-[62ch]">{study.summary}</p>
        <ul className="proof mt-7">
          {study.results.slice(0, 4).map((r) => (
            <li key={r.label}>
              <span className="t-chip block text-ink">{r.value}</span>{' '}
              <span className="mt-1 block text-sm font-medium leading-snug text-muted">{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0">
        {study.video
          ? <VideoFacade video={study.video} />
          : <BrowserShot shot={study.shots[0]} phone={study.phoneShots?.[HERO_PHONE]} isEager />}
      </div>
    </header>
  );
}

function Decisions({ items }) {
  return (
    <ol className="cards-3">
      {items.map((d, i) => (
        <li key={d.chose} className="tile flex flex-col">
          <p className="label"><span className="label-num">Decision {i + 1}</span></p>
          <p className="mt-3 flex items-start gap-2 font-bold leading-snug text-ink">
            <Check size={18} aria-hidden="true" className="mt-0.5 flex-none text-action" />
            <span><span className="sr-only">Chose: </span>{d.chose}</span>
          </p>
          <p className="mt-2 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
            <X size={18} aria-hidden="true" className="flex-none text-danger" />
            <span><span className="sr-only">Rejected: </span><s className="decoration-1">{d.rejected}</s></span>
          </p>
          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-body">{d.why}</p>
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudy({ slug }) {
  const index = cases.findIndex((c) => c.slug === slug);
  const study = cases[index];
  const next = cases[(index + 1) % cases.length];

  return (
    <>
      <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-5">Skip to content</a>
      <SiteHeader />
      <div className="page">
        <main id="main" tabIndex={-1} className="flex flex-col gap-[var(--section)]">
          <Hero study={study} />

          <div className="split">
            <Part n="01" id="problem" title="The problem">
              <p className="t-lead text-ink">{study.problem}</p>
              <p className="mt-4 rounded-inner bg-lime px-4 py-3 text-sm font-semibold leading-snug text-ink">
                For your team: {study.businessAngle}
              </p>
            </Part>
            <Part n="02" id="constraints" title="Constraints">
              <ul className="tile divide-y divide-line py-2">
                {study.constraints.map((c) => (
                  <li key={c} className="flex items-start gap-3 py-2.5 text-sm font-medium leading-snug text-ink">
                    <span aria-hidden="true" className="mt-[.4rem] h-2 w-2 flex-none rounded-full bg-ink" />
                    {c}
                  </li>
                ))}
              </ul>
            </Part>
          </div>

          <Part n="03" id="architecture" title="Architecture">
            <Reveal className="tile">
              <Diagram id={study.slug} diagram={study.diagram} />
            </Reveal>
          </Part>

          <Part n="04" id="built" title="What I built, and the AI’s role inside it">
            <ol className="built">
              {study.built.map((b, i) => (
                <li key={b.title}>
                  <span className="built-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{b.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            {study.shots && (
              <div className="duo mt-[var(--gap)]">
                {study.shots.slice(1).map((shot) => <BrowserShot key={shot.src} shot={shot} />)}
                {study.phoneShots && (
                  <figure className="flex items-end justify-center gap-[var(--gap)] rounded-inner bg-sunk p-4">
                    {study.phoneShots.filter((_, i) => i !== HERO_PHONE).map((p) => (
                      <img key={p.src} src={p.src} alt={p.label} width={p.w} height={p.h} loading="lazy" decoding="async" className="phone-shot" />
                    ))}
                  </figure>
                )}
              </div>
            )}
            {study.shotsNote && <p className="mt-3 text-sm font-medium text-muted">{study.shotsNote}</p>}
          </Part>

          <Part n="05" id="decisions" title="Three key decisions">
            <Decisions items={study.decisions} />
          </Part>

          <Part n="06" id="broke" title="What broke, and how I fixed it">
            <ol className="cards-3">
              {study.broke.map((b) => (
                <li key={b.title} className="tile tile--ink on-ink">
                  <h3 className="t-h3">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-dim">{b.body}</p>
                </li>
              ))}
            </ol>
          </Part>

          <Part n="07" id="results" title="Results">
            <ul className="results-grid results-grid--light">
              {study.results.map((r) => (
                <li key={r.label} className="tile">
                  <span className="t-num block text-ink">{r.value}</span>{' '}
                  <span className="mt-2 block text-sm font-medium leading-snug text-body">{r.label}</span>
                </li>
              ))}
            </ul>
          </Part>

          <Part n="08" id="stack" title="Stack">
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((s) => <li key={s} className="tool-chip">{s}</li>)}
            </ul>
          </Part>

          <nav aria-label="Next" className="tile tile--lime flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="t-h3">Want a system like this for your team?</p>
              <p className="mt-1 text-ink">Tell me the busywork. I’ll show you what I’d build.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a href="/#fit-agent" className="btn btn-secondary">See how I’d help <ArrowRight size={18} aria-hidden="true" /></a>
              <a href={next.path} className="btn btn-secondary">Next: {next.name} <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </nav>
        </main>
        <Footer />
      </div>
    </>
  );
}
