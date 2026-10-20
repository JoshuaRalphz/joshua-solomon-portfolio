import { useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import WireNav from './WireNav.jsx';
import { initials, profile } from '../../data/content.js';
import { useRailFit } from '../../hooks/useRailFit.js';

const SOCIAL_LINKS = [
  { label: 'Email Joshua', href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'WhatsApp', href: profile.whatsappLink, Icon: MessageCircle },
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.github, Icon: Github },
];

/** The square face crop, or the monogram disc when profile.avatar is not set. */
function Avatar() {
  return (
    <div className="avatar">
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt={profile.name}
          width={144}
          height={144}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="grid h-full w-full place-items-center rounded-full bg-ink font-extrabold tracking-tight text-mist">
          {initials}
        </div>
      )}
      {/* Availability, never colour-only: the dot carries a text alternative. */}
      <span className="avatar-dot">
        <span className="sr-only">{profile.status}</span>
      </span>
    </div>
  );
}

/**
 * Profile card below 1024px; a sticky rail with the wired section menu from 1024px.
 * The rail-* classes are the hooks for the three rail densities in styles.css,
 * which useRailFit picks by measuring what fits the viewport height.
 */
export default function ProfileRail() {
  const railRef = useRef(null);
  useRailFit(railRef);

  return (
    <aside
      ref={railRef}
      aria-label="Profile"
      className="tile rail md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 lg:block lg:p-5 lg:shadow-lift"
    >
      <div className="rail-head flex min-w-0 items-center gap-4 lg:block">
        <Avatar />
        <div className="rail-id min-w-0 lg:mt-4">
          <p className="text-xl font-bold leading-tight text-ink">{profile.name}</p>
          {/* The handle is plain text: the GitHub icon link is in this same card. */}
          <p className="mt-1 text-sm font-medium leading-snug text-body">
            <span className="font-mono text-xs text-ink">{profile.handle}</span>
            <span aria-hidden="true"> · </span>
            {profile.title}
          </p>
          <p className="rail-location mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted">
            <MapPin size={14} aria-hidden="true" className="flex-none" />
            {profile.shortLocation}
          </p>
        </div>
      </div>

      <div className="rail-body mt-4 min-w-0 md:mt-0 lg:mt-5">
        <div className="rail-cta grid grid-cols-2 gap-2 max-[359px]:grid-cols-1 lg:grid-cols-1">
          <a href="#contact" className="btn btn-primary px-3">
            Get in touch <ArrowRight size={18} aria-hidden="true" className="flex-none" />
          </a>
          <a href={profile.resumeUrl} download className="btn btn-secondary rail-resume px-3">
            <Download size={18} aria-hidden="true" className="flex-none max-[420px]:hidden" />
            <span className="rail-resume-text">Download CV</span>
          </a>
        </div>

        <WireNav className="rail-nav mt-5 hidden lg:block" />

        {/* Four 44px targets; the narrowest rail has 222px. */}
        <ul className="rail-social mt-3 flex justify-between gap-1 md:justify-end lg:mt-4 lg:justify-between lg:gap-0">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => {
            const isExternal = href.startsWith('http');
            return (
              <li key={label}>
                <a
                  href={href}
                  className="icon-link"
                  aria-label={isExternal ? `${label} (opens in a new tab)` : label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
