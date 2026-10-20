import { ArrowRight, MessageCircle } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { PROJECT_HASH, profile, workWithMe } from '../../data/content.js';

/** For business owners: a monthly partnership, real examples, the price line, four steps and two ways to start. */
export default function WorkWithMe() {
  return (
    <section id="work-with-me" aria-labelledby="work-with-me-title">
      <SectionHead id="work-with-me" label="Work with me" title={workWithMe.title} intro={workWithMe.body} />
      <Reveal className="split">
        <div className="tile flex flex-col">
          <h3 className="label">Systems like these, built by me</h3>
          <ul className="mt-2 divide-y divide-line">
            {workWithMe.examples.map((example) => (
              <li key={example.href}>
                <a href={example.href} className="example-link">
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-ink">{example.label}</span>{' '}
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{example.note}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" className="nudge flex-none text-action" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tile tile--lime hire-call flex flex-col">
          <p className="t-lead font-medium text-ink">
            Monthly partnership from <strong className="font-extrabold">{workWithMe.monthly}</strong>.
            Custom builds start at <strong className="font-extrabold">{workWithMe.build}</strong>, with a fixed quote after a free 15-minute call.
          </p>
          <ol className="steps mt-6">
            {workWithMe.steps.map((step, i) => (
              <li key={step.title}>
                <span className="built-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <strong className="block font-bold leading-snug text-ink">{step.title}</strong>{' '}
                  <span className="block text-sm font-medium leading-snug text-ink">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
            <a href={PROJECT_HASH} className="btn btn-ink">
              Book a free call <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={profile.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <MessageCircle size={18} aria-hidden="true" /> Message me on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
