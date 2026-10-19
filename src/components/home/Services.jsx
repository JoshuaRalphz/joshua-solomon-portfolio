import { Check, ChevronDown } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { services } from '../../data/content.js';

const [leadService, ...otherServices] = services;

function BulletList({ bullets, className = '' }) {
  return (
    <ul className={className}>
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 text-sm font-medium leading-snug text-body">
          <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
          {bullet}
        </li>
      ))}
    </ul>
  );
}

/** The lead capability is shown open; the other four fold their detail away. */
export default function Services() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <SectionHead
        num="03"
        id="capabilities"
        label="Services"
        title="Five things I can own."
        intro="AI engineering first, from my own builds; then the implementation work I've shipped at an agency."
      />

      <Reveal className="split">
        <article className="tile">
          <h3 className="t-h3">{leadService.title}</h3>
          <p className="t-lead mt-3 font-semibold text-ink">{leadService.outcome}</p>
          <p className="mt-3 max-w-[68ch] text-body">{leadService.summary}</p>
          <BulletList
            bullets={leadService.bullets}
            className="mt-5 grid gap-x-5 gap-y-2.5 border-t border-line pt-5 md:grid-cols-2 xl:grid-cols-1"
          />
        </article>

        <div className="duo">
          {otherServices.map((service) => (
            <article key={service.id} className="tile flex flex-col">
              <h3 className="t-h3">{service.title}</h3>
              <p className="mt-2 font-semibold leading-snug text-ink">{service.outcome}</p>
              <details className="mt-auto pt-3">
                <summary>
                  What's included
                  <span className="sr-only"> in {service.title}</span>
                  <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
                </summary>
                <p className="mt-1 text-sm leading-relaxed text-body">{service.summary}</p>
                <BulletList bullets={service.bullets} className="mt-3 space-y-2" />
              </details>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
