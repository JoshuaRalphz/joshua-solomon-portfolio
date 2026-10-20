import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Click-to-load video: only the poster loads with the page. The MP4 (about 4 MB) is
 * requested when the visitor presses play, then plays with sound and controls, and
 * keyboard focus moves onto the player. If the file fails, the poster comes back with
 * a direct link to the video.
 */
export default function VideoFacade({ video }) {
  const [state, setState] = useState('idle'); // idle | playing | failed
  const videoRef = useRef(null);

  useEffect(() => {
    if (state === 'playing') videoRef.current?.focus();
  }, [state]);

  const poster = (
    <img
      src={video.poster}
      alt=""
      width={video.w}
      height={video.h}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );

  return (
    <figure className="video">
      <div className="video-frame" style={{ aspectRatio: `${video.w} / ${video.h}` }}>
        {state === 'playing' && (
          // No <track>: the captions are burned into the picture.
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            width={video.w}
            height={video.h}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={`Sample video: ${video.title}`}
            onError={() => setState('failed')}
            className="h-full w-full object-cover"
          />
        )}
        {state === 'idle' && (
          <button type="button" className="video-play" onClick={() => setState('playing')}>
            {poster}
            <span className="video-play-btn" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
            <span className="video-play-label">
              <span className="sr-only">Play the sample video: </span>
              {video.title} · {video.duration}
            </span>
          </button>
        )}
        {state === 'failed' && (
          <div className="absolute inset-0">
            {poster}
            <p role="status" className="video-play-label">
              The video didn’t load here.{' '}
              <a href={video.src} className="font-bold text-lime underline">Open the MP4</a>
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-sm font-medium leading-snug text-muted">{video.label}</figcaption>
    </figure>
  );
}
