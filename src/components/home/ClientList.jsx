import { ShieldCheck } from 'lucide-react';
import ContributionCard from './ContributionCard.jsx';
import { clientWork } from '../../data/content.js';
import { webpSrcSet } from '../../lib/images.js';

// 1 / 2 / 3 cards across (.sites); from 1024px the profile rail takes about a quarter of the width.
export const THUMB_SIZES = '(min-width: 1280px) 24vw, (min-width: 1024px) 34vw, (min-width: 768px) 46vw, 92vw';

/** "Ada’s Closet’s", but "Alliance Service Brands’". */
const possessive = (name) => (name.endsWith('s') ? `${name}’` : `${name}’s`);

/** Client work as "my contribution" cards: one card per live site. */
export default function ClientList() {
  return (
    <>
      <ul className="sites">
        {clientWork.map((client) => {
          const src = `/work-thumbs/${client.thumb}.png`;
          return (
            <ContributionCard
              key={client.name}
              id={`work-${client.thumb}`}
              name={client.name}
              role={client.role}
              line={client.line}
              href={client.url}
              linkLabel="Go to website"
              overview={client.overview}
              image={{ src, srcSet: webpSrcSet(src), sizes: THUMB_SIZES, alt: `Homepage of ${possessive(client.name)} website`, w: 1440, h: 900 }}
            />
          );
        })}
      </ul>
      <p className="mt-5 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        Delivered under Arrow Group Consulting (Michigan, USA), shown with permission · references on request
      </p>
    </>
  );
}
