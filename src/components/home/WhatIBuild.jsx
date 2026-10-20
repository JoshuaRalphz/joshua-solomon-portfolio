import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { offers } from '../../data/content.js';

/** Three offers, each framed as what the business gets, each with its proof. */
export default function WhatIBuild() {
  return (
    <section id="build" aria-labelledby="build-title">
      <SectionHead
        id="build"
        label="What I build"
        title="What I build for a team."
        intro="Three kinds of system. Each one has a person approving what matters and a cost you know before it runs."
      />
      <Reveal as="ul" className="offers">
        {offers.map((offer, i) => (
          <li key={offer.id} className={`tile flex flex-col ${i === 0 ? 'tile--ink on-ink' : ''}`}>
            <p className="label"><span className="label-num">0{i + 1}</span></p>
            <h3 className="t-h3 mt-3">{offer.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-mist-dim' : 'text-body'}`}>{offer.body}</p>
            <a href={offer.proof.href} className={`proof-link mt-auto ${i === 0 ? 'text-lime' : 'text-action'}`}>
              Proof: {offer.proof.label} <ArrowRight size={16} aria-hidden="true" className="flex-none" />
            </a>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
