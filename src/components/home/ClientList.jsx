import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { clientWork } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';

// 1 / 2 / 3 cards across (.sites); from 1024px the profile rail takes about a quarter of the width.
const THUMB_SIZES = '(min-width: 1280px) 24vw, (min-width: 1024px) 34vw, (min-width: 768px) 46vw, 92vw';

/** "Ada’s Closet’s", but "Alliance Service Brands’". */
const possessive = (name) => (name.endsWith('s') ? `${name}’` : `${name}’s`);

function SiteCard({ client }) {
  const src = `/work-thumbs/${client.thumb}.png`;

  return (
    <li id={`work-${client.thumb}`} className="tile site-card flex flex-col p-3">
      <div className="shot-frame">
        <span className="shot-bar" aria-hidden="true"><i /><i /><i /></span>
        <img
          src={src}
          srcSet={webpSrcSet(src)}
          sizes={THUMB_SIZES}
          alt={`Homepage of ${possessive(client.name)} website`}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="site-thumb"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4">
        <h4 className="t-h3">
          <a href={client.url} target="_blank" rel="noopener noreferrer" className="site-title">
            {client.name}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h4>
        <p className="mt-1 font-mono text-xs text-muted">{client.place}</p>
        <p className="mt-2 text-sm leading-snug text-body">{client.line}</p>
        <a href={client.url} target="_blank" rel="noopener noreferrer" className="proof-link mt-auto self-start text-action">
          Visit site<span className="sr-only">: {client.name} (opens in a new tab)</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

/** Client websites as a screenshot gallery: one card per live site. */
export default function ClientList() {
  return (
    <>
      <ul className="sites">
        {clientWork.map((client) => <SiteCard key={client.name} client={client} />)}
      </ul>
      <p className="mt-5 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        Delivered under Arrow Group Consulting (Michigan, USA), shown with permission · references on request
      </p>
    </>
  );
}
