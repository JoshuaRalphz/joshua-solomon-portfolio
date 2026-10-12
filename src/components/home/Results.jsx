import { Reveal } from '../PageTransition.jsx';
import SectionHead from './SectionHead.jsx';
import { results } from '../../data/content.js';

const leadResult = results.find((result) => result.lead);
const otherResults = results.filter((result) => !result.lead);

// The before/after bars sit on a 0-10% scale, so 4.5% draws at 45% width.
const BAR_SCALE = 10;

function BeforeAfterRow({ label, value, isAfter }) {
  return (
    <div>
      <p className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        <span>{label}</span>
        <span>{value}%</span>
      </p>
      <div
        aria-hidden="true"
        className={`mt-1.5 h-3 rounded-full border-[1.5px] border-ink ${isAfter ? 'bg-ink' : 'bg-transparent'}`}
        style={{ width: `${value * BAR_SCALE}%` }}
      />
    </div>
  );
}

function LeadResult() {
  return (
    <div className="tile tile--lime flex flex-col">
      <p className="t-num-lead">{leadResult.value}</p>
      <h3 className="t-h3 mt-4">{leadResult.title}</h3>
      <p className="mt-1 text-sm font-medium text-ink">{leadResult.note}</p>
      <div className="mt-auto space-y-3 pt-8">
        <BeforeAfterRow label="Before" value={leadResult.before} />
        <BeforeAfterRow label="After" value={leadResult.after} isAfter />
      </div>
    </div>
  );
}

function ResultTile({ result }) {
  return (
    <li className="tile cq flex flex-col">
      <p className="t-num flex flex-wrap items-baseline gap-x-1.5 text-ink">
        {result.value}
        {result.unit && <span className="text-sm font-semibold tracking-normal text-body">{result.unit}</span>}
      </p>
      <h3 className="mt-3 font-bold leading-snug text-ink">{result.title}</h3>
      <p className="wrap-anywhere mt-1 text-sm font-medium leading-snug text-muted">{result.note}</p>
      <a href={`#work-${result.workId}`} className="text-link mt-auto inline-flex min-h-[2.75rem] items-end self-start pt-2 text-sm">
        See the project
      </a>
    </li>
  );
}

/** No testimonials exist, so: numbers only, each with its source. */
export default function Results() {
  return (
    <section id="results" aria-labelledby="results-title">
      <SectionHead
        num="02"
        id="results"
        label="Results"
        title="Numbers, with where they came from."
        intro="Each figure comes from my work at Arrow Group Consulting. Ask and I'll walk you through any of them."
      />

      <Reveal className="split">
        <LeadResult />
        <ul className="results-sub">
          {otherResults.map((result) => <ResultTile key={result.title} result={result} />)}
        </ul>
      </Reveal>

      <p className="mt-5 text-sm font-medium text-muted">References available on request.</p>
    </section>
  );
}
