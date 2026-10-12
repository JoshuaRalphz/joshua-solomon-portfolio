import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { initials, profile } from '../../data/content.js';

/**
 * Click-to-load video facade. No iframe, no request to Loom and no Loom
 * thumbnail exist until the button is pressed; the poster is drawn in CSS.
 * If a CSP header is ever added to this site it must allow
 * `frame-src https://www.loom.com`.
 *
 * No video length is stated anywhere: add one only as profile.loom.length in
 * content.js, once Joshua confirms it.
 */
export default function LoomFacade() {
  const [isPlaying, setIsPlaying] = useState(false);
  const frameRef = useRef(null);

  // The button that had focus is gone after the swap: hand focus to the player.
  useEffect(() => {
    if (isPlaying) frameRef.current?.focus();
  }, [isPlaying]);

  return (
    <div className="loom">
      {isPlaying ? (
        <div className="loom-frame">
          <iframe
            ref={frameRef}
            src={`${profile.loom.embedUrl}?autoplay=1`}
            title={`${profile.name}: intro video`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        <button type="button" className="loom-poster" onClick={() => setIsPlaying(true)}>
          <span className="loom-mark" aria-hidden="true">{initials}</span>
          <span className="loom-disc">
            <Play size={22} fill="currentColor" aria-hidden="true" className="translate-x-px" />
          </span>
          {/* The accessible name contains the visible words (WCAG 2.5.3). */}
          <span className="relative text-base font-bold leading-tight">
            <span className="sr-only">Play the intro video: </span>
            Meet me on video.
            <span className="sr-only"> (loads from Loom)</span>
          </span>
        </button>
      )}
    </div>
  );
}
