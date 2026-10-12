import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { profile } from '../../data/content.js';

const initials = profile.name.split(' ').map((word) => word[0]).join('');

/**
 * Click-to-load video facade. No iframe, no request to Loom and no Loom
 * thumbnail exist until the button is pressed; the poster is drawn in CSS.
 * If a CSP header is ever added to this site it must allow
 * `frame-src https://www.loom.com`.
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
            title={`${profile.name}: 70-second intro video`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        <button
          type="button"
          className="loom-poster"
          aria-label="Play the 70-second intro video (loads from Loom)"
          onClick={() => setIsPlaying(true)}
        >
          <span className="loom-mark" aria-hidden="true">{initials}</span>
          <span className="loom-disc">
            <Play size={22} fill="currentColor" aria-hidden="true" className="translate-x-px" />
          </span>
          <span className="relative text-base font-bold leading-tight">Meet me in 70 seconds.</span>
        </button>
      )}
    </div>
  );
}
