import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Click-to-play YouTube embed.
 * Renders just the thumbnail + play button until clicked, then swaps in
 * the real iframe with autoplay. Keeps Lighthouse score from cratering
 * when multiple videos are on a page (each YouTube iframe ships ~500KB of JS).
 *
 * Props:
 *   id        — YouTube video ID
 *   label     — accessibility label
 *   vertical  — true for Shorts (9:16); false for standard 16:9
 */
export default function LazyYouTube({ id, label, vertical = false }) {
  const [playing, setPlaying] = useState(false);

  // Standard videos use maxresdefault first, fall back to hqdefault if missing.
  // Shorts can't use maxres reliably — go straight to hqdefault.
  const thumbnail = vertical
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  const aspect = vertical ? 'aspect-[9/16]' : 'aspect-video';

  if (playing) {
    return (
      <div className={`relative w-full ${aspect} bg-ink rounded-xl overflow-hidden`}>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${label}`}
      className={`group relative block w-full ${aspect} bg-ink rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-navy/30`}
    >
      <img
        src={thumbnail}
        alt={label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          // maxresdefault doesn't exist for every video; fall back to hqdefault
          if (e.currentTarget.src.includes('maxresdefault')) {
            e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
          }
        }}
      />
      {/* Subtle dark overlay for play button contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent group-hover:from-ink/70 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 group-hover:bg-white shadow-lift flex items-center justify-center transition-all group-hover:scale-110">
          <Play size={28} className="text-navy ml-1" fill="currentColor" />
        </div>
      </div>
      {/* Label overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-xs uppercase tracking-widest text-white/85 font-bold">
          {label}
        </div>
      </div>
    </button>
  );
}
