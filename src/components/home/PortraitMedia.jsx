import { useState } from 'react';
import { Play } from 'lucide-react';
import { initials, profile } from '../../data/content.js';

function Photo({ isDecorative = false }) {
  if (!profile.photo) return <span className="portrait-mark" aria-hidden="true">{initials}</span>;
  return (
    <img
      src={profile.photo}
      alt={isDecorative ? '' : `Portrait of ${profile.name}`}
      width={960}
      height={1399}
      fetchpriority="high"
      className="absolute inset-0 h-full w-full object-cover object-[50%_8%]"
    />
  );
}

/**
 * The hero portrait: the photo, or (when profile.introVideo is set) a click-to-play
 * intro video whose poster is the photo. No autoplay and no sound until the visitor
 * presses play; captions via <track>; any load error falls back to the photo.
 */
export default function PortraitMedia() {
  const video = profile.introVideo;
  const [state, setState] = useState('idle'); // idle | playing | failed

  if (!video || state === 'failed') return <Photo />;

  const fail = () => setState('failed');

  if (state === 'playing') {
    return (
      <video
        controls
        autoPlay
        playsInline
        poster={video.poster ?? profile.photo}
        onError={fail}
        className="absolute inset-0 h-full w-full bg-ink object-cover"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" onError={fail} />
        {video.captionsVtt && <track kind="captions" src={video.captionsVtt} srcLang="en" label="English" default />}
      </video>
    );
  }

  return (
    <button type="button" className="video-play" onClick={() => setState('playing')}>
      <Photo isDecorative />
      <span className="video-play-btn" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
      <span className="video-play-label">
        <span className="sr-only">Play my intro video. </span>Made with my AI twin
      </span>
    </button>
  );
}
