import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from '../home/SectionHead.jsx';
import PlayArt from './PlayArt.jsx';
import { playDemos } from '../../data/play.js';
import './play.css';

/** #play on the home page: four small, working demos, each on its own linkable page. */
export default function PlaySection() {
  return (
    <section id="play" aria-labelledby="play-title">
      <SectionHead
        id="play"
        label="Try it"
        title="Play with my systems."
        intro="Four small, working versions of what I build. Three run a real AI call; one runs entirely in your browser. Each one tells you what’s real and what’s simulated."
      />
      <Reveal as="ul" className="play-grid">
        {playDemos.map((demo, i) => (
          <li key={demo.slug}>
            <a href={demo.path} className={`tile play-card ${i === 0 ? 'tile--ink on-ink' : ''}`}>
              <div className="play-card-art"><PlayArt slug={demo.slug} /></div>
              <p className="label mt-4"><span className="label-num">{demo.num}</span> · {demo.audience}</p>
              <h3 className="t-h3 mt-2">{demo.name}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-mist-dim' : 'text-body'}`}>{demo.value}</p>
              <span className={`proof-link mt-auto ${i === 0 ? 'text-lime' : 'text-action'}`}>
                Try it <ArrowRight size={16} aria-hidden="true" className="nudge flex-none" />
              </span>
            </a>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
