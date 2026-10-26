import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import CaseCard from './CaseCard.jsx';
import AgencyCase from './AgencyCase.jsx';
import ClientList from './ClientList.jsx';
import GhlRebuilds from './GhlRebuilds.jsx';
import EmailCampaigns from './EmailCampaigns.jsx';
import SocialGraphics from './SocialGraphics.jsx';
import { cases } from '../../data/cases.js';
import { GHL_REBUILD_LABEL, GHL_SAMPLE_NOTE } from '../../data/content.js';

/** Work shipped: client work with my part in each, the GoHighLevel rebuilds, then systems, emails and social graphics. */
export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <SectionHead
        id="work"
        label="Work"
        title="Work I’ve shipped."
        intro="Client work first, each with my part in it, then my GoHighLevel builds, my AI systems, the emails I launched and my social graphics."
      />
      <div className="flex flex-col gap-[calc(var(--gap)*3)]">
        <div id="clients">
          <h3 className="label sub-head mb-4 text-ink">Client work: my contribution</h3>
          <Reveal><ClientList /></Reveal>
        </div>
        <div id="ghl-rebuilds">
          <h3 className="label sub-head text-ink">Rebuilt in GoHighLevel</h3>
          <p className="mb-4 mt-2 max-w-[68ch] text-sm font-medium leading-snug text-muted">{GHL_REBUILD_LABEL} {GHL_SAMPLE_NOTE}</p>
          <Reveal><GhlRebuilds /></Reveal>
        </div>
        <div id="ai-systems">
          <h3 className="label sub-head mb-4 text-ink">AI systems, email and social</h3>
          <div className="flex flex-col gap-[var(--gap)]">
            {cases.map((study, i) => (
              <Reveal key={study.slug}><CaseCard study={study} showDiagram={i === 0} /></Reveal>
            ))}
            <Reveal><AgencyCase /></Reveal>
            <Reveal><EmailCampaigns /></Reveal>
            <Reveal><SocialGraphics /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
