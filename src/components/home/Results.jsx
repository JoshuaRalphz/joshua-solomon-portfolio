import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { agencyMarketingResult, leadResult, results } from '../../data/content.js';

const maxBar = Math.max(...leadResult.bars.map((bar) => bar.value));

function CostBar({ bar, isMine }) {
  return (
    <div>
      <p className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        <span>{bar.label}</span>
        <span>{bar.display}</span>
      </p>
      {/* At least 4% wide so the smaller bar is still visible. */}
      <div
        aria-hidden="true"
        className={`mt-1.5 h-3 rounded-full border-[1.5px] border-ink ${isMine ? 'bg-ink' : 'bg-transparent'}`}
        style={{ width: `${Math.max(4, (bar.value / maxBar) * 100)}%` }}
      />
    </div>
  );
}

function LeadResult() {
  const [theirs, mine] = leadResult.bars;
  return (
    <a href={leadResult.href} className="tile tile--lime flex flex-col">
      <p className="t-num-lead">{leadResult.value}</p>
      <h3 className="t-h3 mt-4">{leadResult.title}</h3>
      <p className="mt-1 text-sm font-medium text-ink">{leadResult.note}</p>
      <div className="mt-auto space-y-3 pt-8">
        <CostBar bar={theirs} />
        <CostBar bar={mine} isMine />
      </div>
      <span className="mt-4 text-sm font-semibold text-ink underline underline-offset-[3px]">See the case study</span>
    </a>
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
      {/* `relative` keeps the screen-reader-only text inside the link's box. */}
      <a href={result.href} className="text-link relative mt-auto inline-flex min-h-[2.75rem] items-end self-start pt-2 text-sm">
        See the source<span className="sr-only">: {result.title}</span>
      </a>
    </li>
  );
}

/** No testimonials exist, so: numbers only, each with its source. */
export default function Results() {
  return (
    <section id="results" aria-labelledby="results-title">
      <SectionHead
        num="03"
        id="results"
        label="Results"
        title="Numbers, with where they came from."
        intro="Each figure comes from my own AI systems or my work at Arrow Group Consulting. Ask and I’ll walk you through any of them."
      />

      <Reveal className="split">
        <LeadResult />
        <ul className="results-sub">
          {results.map((result) => <ResultTile key={result.title} result={result} />)}
        </ul>
      </Reveal>

      <p className="mt-5 max-w-[80ch] text-sm font-medium leading-relaxed text-muted">{agencyMarketingResult} References available on request.</p>
    </section>
  );
}
