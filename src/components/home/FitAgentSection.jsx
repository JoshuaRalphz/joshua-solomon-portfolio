import SectionHead from './SectionHead.jsx';
import FitAgentSlot from '../FitAgentSlot.jsx';

/** #fit-agent: the hero's main call to action lands here. */
export default function FitAgentSection() {
  return (
    <section id="fit-agent" aria-labelledby="fit-agent-title">
      <SectionHead num="02" id="fit-agent" label="How I’d help" title="See how I’d help your team" />
      {/* Mount point: replace <FitAgentSlot /> with the demo component (e.g. <FitAgent />). */}
      <FitAgentSlot />
    </section>
  );
}
