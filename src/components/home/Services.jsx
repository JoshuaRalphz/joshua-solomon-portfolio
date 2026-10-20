import { ArrowRight, Check, ChevronDown, Clapperboard, Inbox, Mail, Server, Workflow } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { services, workSteps } from '../../data/content.js';

const ICONS = { Clapperboard, Inbox, Mail, Server, Workflow };
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

/** The small illustrated badge in front of each service: a lime disc with an ink line icon. */
function ServiceIcon({ name }) {
  const Icon = ICONS[name];
  return (
    <span aria-hidden="true" className="svc-icon">
      <Icon size={22} strokeWidth={1.75} />
    </span>
  );
}

function ProofLink({ proof }) {
  return (
    <a href={proof.href} className="proof-link text-action">
      Proof: {proof.label} <ArrowRight size={16} aria-hidden="true" className="flex-none" />
    </a>
  );
}

/** The lead service is shown open; the other four fold their detail away. */
export default function Services() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <SectionHead
        num="04"
        id="capabilities"
        label="Services"
        title="Five things I can own."
        intro="Each one has a person approving what matters and a cost you know before it runs. AI systems first; email and CRM are supporting experience from agency work."
      />

      <Reveal className="split">
        <article className="tile flex flex-col">
          <ServiceIcon name={leadService.Icon} />
          <h3 className="t-h3 mt-4">{leadService.title}</h3>
          <p className="t-lead mt-3 font-semibold text-ink">{leadService.outcome}</p>
          <p className="mt-3 max-w-[68ch] text-body">{leadService.summary}</p>
          <BulletList
            bullets={leadService.bullets}
            className="mt-5 grid gap-x-5 gap-y-2.5 border-t border-line pt-5 md:grid-cols-2 xl:grid-cols-1"
          />
          <ProofLink proof={leadService.proof} />
        </article>

        <div className="duo">
          {otherServices.map((service) => (
            <article key={service.id} className="tile flex flex-col">
              <ServiceIcon name={service.Icon} />
              <h3 className="t-h3 mt-4">{service.title}</h3>
              <p className="mt-2 font-semibold leading-snug text-ink">{service.outcome}</p>
              <details className="mt-auto pt-3">
                <summary>
                  What’s included
                  <span className="sr-only"> in {service.title}</span>
                  <ChevronDown size={18} aria-hidden="true" className="chev flex-none" />
                </summary>
                <p className="mt-1 text-sm leading-relaxed text-body">{service.summary}</p>
                <BulletList bullets={service.bullets} className="mt-3 space-y-2" />
              </details>
              <ProofLink proof={service.proof} />
            </article>
          ))}
        </div>
      </Reveal>

      <h3 id="working-with-me" className="t-h3 mb-4 mt-10">How working with me goes.</h3>
      <Reveal as="ol" className="steps">
        {workSteps.map((step, i) => (
          <li key={step.title}>
            <span className="built-num" aria-hidden="true">{i + 1}</span>
            <div className="min-w-0">
              <p className="font-bold leading-snug text-ink">
                <span className="sr-only">Step {i + 1}: </span>{step.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-body">{step.body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
