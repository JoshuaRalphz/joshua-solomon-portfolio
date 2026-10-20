import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Click-to-load video: only the poster loads with the page. The MP4 (about 4 MB) is
 * requested when the visitor presses play, and then plays with sound and controls.
 */
export default function VideoFacade({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <figure className="video">
      <div className="video-frame" style={{ aspectRatio: `${video.w} / ${video.h}` }}>
        {isPlaying ? (
          // No <track>: the captions are burned into the picture.
          <video
            src={video.src}
            poster={video.poster}
            width={video.w}
            height={video.h}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <button type="button" className="video-play" onClick={() => setIsPlaying(true)}>
            <img
              src={video.poster}
              alt=""
              width={video.w}
              height={video.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="video-play-btn" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
            <span className="video-play-label">
              <span className="sr-only">Play the sample video: </span>
              {video.title} · {video.duration}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm font-medium leading-snug text-muted">{video.label}</figcaption>
    </figure>
  );
}
