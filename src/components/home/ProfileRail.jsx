import { ArrowRight, Download, Facebook, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import WireNav from './WireNav.jsx';
import { profile } from '../../data/content.js';

const initials = profile.name.split(' ').map((word) => word[0]).join('');

const SOCIAL_LINKS = [
  { label: 'Email Joshua', href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'WhatsApp', href: profile.whatsappLink, Icon: MessageCircle },
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.github, Icon: Github },
  { label: 'Facebook', href: profile.facebook, Icon: Facebook },
];

/** Monogram disc, or the photo if profile.photo is ever set. */
function Avatar() {
  return (
    <div className="avatar">
      {profile.photo ? (
        <img
          src={profile.photo}
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
 */
export default function ProfileRail() {
  return (
    <aside
      aria-label="Profile"
      className="tile md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 lg:sticky lg:top-6 lg:block lg:max-h-[calc(100dvh-3rem)] lg:self-start lg:overflow-y-auto lg:p-5 lg:shadow-lift"
    >
      <div className="flex min-w-0 items-center gap-4 lg:block">
        <Avatar />
        <div className="min-w-0 lg:mt-4">
          <p className="text-xl font-bold leading-tight text-ink">{profile.name}</p>
          <p className="mt-1 text-sm font-medium leading-snug text-body">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-mono text-xs text-action hover:underline"
            >
              {profile.handle}
              <span className="sr-only"> on GitHub (opens in a new tab)</span>
            </a>
            <span aria-hidden="true"> · </span>
            {profile.shortRole}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted lg:[@media(max-height:700px)]:hidden">
            <MapPin size={14} aria-hidden="true" className="flex-none" />
            {profile.shortLocation}
          </p>
        </div>
      </div>

      <div className="mt-4 min-w-0 md:mt-0 lg:mt-5">
        <div className="grid grid-cols-2 gap-2 max-[359px]:grid-cols-1 lg:grid-cols-1">
          <a href="#contact" className="btn btn-primary px-3">
            Get in touch <ArrowRight size={18} aria-hidden="true" className="flex-none" />
          </a>
          <a href={profile.resumeUrl} download className="btn btn-secondary px-3">
            <Download size={18} aria-hidden="true" className="flex-none max-[420px]:hidden" />
            Download resume
          </a>
        </div>

        <WireNav className="mt-5 hidden lg:block" />

        <ul className="mt-3 flex justify-between gap-1 md:justify-end lg:mt-4 lg:justify-between">
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
