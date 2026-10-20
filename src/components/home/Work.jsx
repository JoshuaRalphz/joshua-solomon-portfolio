import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import CaseCard from './CaseCard.jsx';
import AgencyCase from './AgencyCase.jsx';
import ClientList from './ClientList.jsx';
import { cases } from '../../data/cases.js';

/** Work shipped: the client-site gallery first (fast proof), then the AI systems. */
export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <SectionHead
        id="work"
        label="Work"
        title="Work I’ve shipped."
        intro="Client websites first, then my AI systems. Each system is told the same way: the business problem, what I built and the AI’s role inside it, then what changed."
      />
      <div className="flex flex-col gap-[calc(var(--gap)*3)]">
        <div id="clients">
          <h3 className="label sub-head mb-4 text-ink">Websites I built for clients</h3>
          <Reveal><ClientList /></Reveal>
        </div>
        <div id="ai-systems">
          <h3 className="label sub-head mb-4 text-ink">AI systems I built</h3>
          <div className="flex flex-col gap-[var(--gap)]">
            {cases.map((study, i) => (
              <Reveal key={study.slug}><CaseCard study={study} showDiagram={i === 0} /></Reveal>
            ))}
            <Reveal><AgencyCase /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
