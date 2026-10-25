import ContributionCard from './ContributionCard.jsx';
import { THUMB_SIZES } from './ClientList.jsx';
import { ghlRebuilds } from '../../data/content.js';

/** Three client projects rebuilt in GoHighLevel, as "my contribution" cards with a live preview link. */
export default function GhlRebuilds() {
  return (
    <ul className="sites">
      {ghlRebuilds.map((item) => (
        <ContributionCard
          key={item.id}
          id={item.id}
          name={item.name}
          role={item.role}
          line={item.line}
          href={item.url}
          linkLabel="Open preview"
          overview={item.overview}
          image={{
            src: `${item.img}-1280.webp`,
            srcSet: `${item.img}-640.webp 640w, ${item.img}-1280.webp 1280w`,
            sizes: THUMB_SIZES,
            alt: `${item.name} funnel page, rebuilt in the GoHighLevel builder`,
            w: 1280,
            h: 729,
          }}
        >
          <img
            src={item.pipeline.src}
            alt={item.pipeline.alt}
            width={1040}
            height={290}
            loading="lazy"
            decoding="async"
            className="mt-3 h-auto w-full rounded-inner border border-line"
          />
        </ContributionCard>
      ))}
    </ul>
  );
}
