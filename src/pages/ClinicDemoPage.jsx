import SiteHeader from '../components/SiteHeader.jsx';
import ClinicDemo from '../components/clinic/ClinicDemo.jsx';

const FLOW = [
  { n: '01', title: 'Website form', text: 'A patient sends an enquiry.' },
  { n: '02', title: 'Claude triage', text: 'Treatment, intent, urgency, score, nurse flag.' },
  { n: '03', title: 'Person approves', text: 'SMS and email drafts. Nothing sends itself.' },
  { n: '04', title: 'GoHighLevel', text: 'Tags, stage, tasks, webhook payload.' },
];

/** Unlisted interview demo (noindex, not linked from the site). */
export default function ClinicDemoPage() {
  return (
    <>
      <SiteHeader />
      <div className="page">
        <main id="main">
          <header className="tile">
            <p className="label"><span className="label-num">Interview demo</span> · Glow Marketing · October 2026</p>
            <h1 className="t-h2 mt-3">Clinic enquiry assistant</h1>
            <p className="t-lead mt-3 max-w-[70ch]">
              I built this demo this week for my interview with Glow Marketing, for clinics like the ones Glow works with.
              An enquiry comes in, Claude sorts it and drafts the replies, code decides what happens in GoHighLevel, and a person approves before anything goes out.
            </p>
            <p className="cl-honest mt-4">
              The clinic and every sample enquiry are fictional. No GoHighLevel account is called and no message is sent. What you type goes to Claude to be sorted and is not kept by this site.
            </p>
            <ol className="cl-flow mt-5">
              {FLOW.map((f) => (
                <li key={f.n}>
                  <span className="cl-flow-n" aria-hidden="true">{f.n}</span>
                  <span className="min-w-0"><strong>{f.title}</strong><span>{f.text}</span></span>
                </li>
              ))}
            </ol>
          </header>
          <section aria-label="Try the demo" className="mt-[var(--gap)]">
            <ClinicDemo />
          </section>
          <footer className="mt-[var(--section)] border-t border-line pb-4 pt-6 text-sm font-medium text-muted">
            <p>Built by Joshua Solomon with Claude Code · Claude Opus 5.5 on Cloudflare Pages Functions · capped at $0.50 a day.</p>
          </footer>
        </main>
      </div>
    </>
  );
}
