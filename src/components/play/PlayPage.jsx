import { ArrowLeft, ArrowRight, CircleDashed, Download, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import SiteHeader from '../SiteHeader.jsx';
import Footer from '../Footer.jsx';
import PlayArt from './PlayArt.jsx';
import Pipeline from './Pipeline.jsx';
import BusyworkPlan from './BusyworkPlan.jsx';
import LeadTriage from './LeadTriage.jsx';
import AskPortfolio from './AskPortfolio.jsx';
import MissedCall from './MissedCall.jsx';
import { CALL_HREF, CALL_LABEL, OFFERS, playBySlug, playDemos } from '../../data/play.js';
import { profile } from '../../data/content.js';
import './play.css';

const DEMO_BY_SLUG = {
  'busywork-plan': BusyworkPlan,
  'lead-triage': LeadTriage,
  'ask-my-portfolio': AskPortfolio,
  'missed-call-text-back': MissedCall,
};

function Honesty({ demo }) {
  return (
    <div className="play-honesty">
      <div className="tile">
        <p className="label flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" className="text-action" /> What’s real</p>
        <ul className="mt-3 space-y-2">
          {demo.real.map((line) => <li key={line} className="play-li">{line}</li>)}
        </ul>
      </div>
      <div className="tile play-dashed">
        <p className="label flex items-center gap-2"><CircleDashed size={16} aria-hidden="true" /> What’s simulated or estimated</p>
        <ul className="mt-3 space-y-2">
          {demo.simulated.map((line) => <li key={line} className="play-li">{line}</li>)}
        </ul>
      </div>
    </div>
  );
}

/** The CTA fits who the demo is for: owners get the call, recruiters get the CV. */
function Cta({ demo }) {
  const isRecruiter = demo.slug === 'ask-my-portfolio';
  return (
    <nav aria-label="Next step" className="tile tile--lime flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <p className="t-h3">{isRecruiter ? 'Want the full picture?' : 'Want this for your business?'}</p>
        <p className="mt-1 text-ink">
          {isRecruiter
            ? 'Download the CV or email me. I reply within 24 hours.'
            : `Tell me the busywork on a free 15-minute call. ${OFFERS.starter.label} ${OFFERS.starter.price}; ${OFFERS.care.label.toLowerCase()} ${OFFERS.care.price}.`}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {isRecruiter ? (
          <>
            <a href={profile.resumeUrl} download className="btn btn-secondary"><Download size={18} aria-hidden="true" /> Download CV</a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary"><Mail size={18} aria-hidden="true" /> Email me</a>
          </>
        ) : (
          <>
            <a href={CALL_HREF} className="btn btn-secondary">{CALL_LABEL} <ArrowRight size={18} aria-hidden="true" /></a>
            <a href={profile.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

/** /play/<slug>/: one demo, framed for its audience, prerendered with real text. */
export default function PlayPage({ slug }) {
  const demo = playBySlug[slug];
  const Demo = DEMO_BY_SLUG[slug];
  const others = playDemos.filter((d) => d.slug !== slug);

  return (
    <>
      <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-5">Skip to content</a>
      <SiteHeader />
      <div className="page">
        <main id="main" tabIndex={-1} className="flex flex-col gap-[var(--section)]">
          <header className="play-hero">
            <div className="min-w-0">
              <a href="/#play" className="text-link inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm">
                <ArrowLeft size={16} aria-hidden="true" /> All demos
              </a>
              <p className="label mt-3"><span className="label-num">Try it · {demo.num}</span> · For {demo.audience.toLowerCase()}</p>
              <h1 className="t-h1 mt-3">{demo.name}</h1>
              <p className="t-outcome t-outcome--sm mt-4">{demo.value}</p>
              <p className="t-lead mt-4 max-w-[62ch]">{demo.framing}</p>
            </div>
            <div className="play-hero-art tile"><PlayArt slug={slug} /></div>
          </header>

          <Demo />

          <section aria-labelledby="how-title">
            <p className="label"><span className="label-num">How it works</span></p>
            <h2 id="how-title" className="t-h2 mt-2">What happens behind the screen.</h2>
            <div className="tile mt-5"><Pipeline steps={demo.how} states={demo.how.map(() => 'done')} label="How it works" /></div>
            <div className="mt-[var(--gap)]"><Honesty demo={demo} /></div>
          </section>

          <Cta demo={demo} />

          <nav aria-labelledby="more-title">
            <h2 id="more-title" className="label">More demos</h2>
            <ul className="play-more mt-4">
              {others.map((d) => (
                <li key={d.slug}>
                  <a href={d.path} className="tile play-more-card">
                    <PlayArt slug={d.slug} className="play-art--sm" />
                    <span className="min-w-0">
                      <span className="label block">{d.audience}</span>
                      <span className="mt-1 block font-bold leading-snug text-ink">{d.name}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" className="nudge flex-none text-action" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </main>
        <Footer />
      </div>
    </>
  );
}
