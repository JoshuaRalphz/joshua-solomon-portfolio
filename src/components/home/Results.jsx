import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { results } from '../../data/content.js';

/** System numbers only, each linked to where it comes from. No testimonials exist. */
export default function Results() {
  return (
    <section id="results" aria-labelledby="results-title">
      <SectionHead
        id="results"
        label="Results"
        title="Numbers, with where they came from."
      />
      <Reveal className="tile tile--ink on-ink">
        <ul className="results-grid">
          {results.map((r) => (
            <li key={r.label}>
              <a href={r.href} className="result">
                <span className="t-num block text-lime">{r.value}</span>{' '}
                <span className="mt-2 block text-sm font-medium leading-snug text-mist">{r.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
