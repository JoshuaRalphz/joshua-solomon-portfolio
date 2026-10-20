import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import CaseCard from './CaseCard.jsx';
import AgencyCase from './AgencyCase.jsx';
import ClientList from './ClientList.jsx';
import { cases } from '../../data/cases.js';

/** Systems shipped: two full case studies, the agency platform, then client work. */
export default function Systems() {
  return (
    <section id="work" aria-labelledby="work-title">
      <SectionHead
        num="01"
        id="work"
        label="Systems"
        title="Systems I’ve shipped."
        intro="Each one told the same way: the business problem, what I built and the AI’s role inside it, then what changed. The tech comes second."
      />
      <div className="flex flex-col gap-[var(--gap)]">
        {cases.map((study, i) => (
          <Reveal key={study.slug}><CaseCard study={study} isFirst={i === 0} showDiagram={i === 0} /></Reveal>
        ))}
        <Reveal><AgencyCase /></Reveal>
        <Reveal><ClientList /></Reveal>
      </div>
    </section>
  );
}
