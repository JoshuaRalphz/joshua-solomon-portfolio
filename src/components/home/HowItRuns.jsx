import FlowTile from './FlowTile.jsx';
import ToolStrip from './ToolStrip.jsx';

/** How the AI systems run, beside the stack: a small bento row after the Work section. */
export default function HowItRuns() {
  return (
    <div className="bento">
      <FlowTile className="xl:[grid-column:1/8]" />
      <ToolStrip className="xl:[grid-column:8/13]" />
    </div>
  );
}
