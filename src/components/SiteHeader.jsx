import { Download } from 'lucide-react';
import Logo from './Logo.jsx';
import { profile } from '../data/content.js';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#fit-agent', label: 'How I’d help' },
  { href: '/#contact', label: 'Contact' },
];

/** Sticky bar for the case-study and 404 pages (the home page has its own rail). */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-mist/[.9] backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-[80rem] flex-wrap items-center justify-between gap-x-4 px-[var(--shell-pad)]">
        <a href="/" className="flex min-h-[2.75rem] min-w-0 items-center gap-2.5 rounded-inner font-semibold text-ink">
          <Logo size={28} />
          <span className="truncate">{profile.name}<span className="font-medium text-muted max-sm:hidden"> · {profile.title}</span></span>
        </a>
        <nav aria-label="Site" className="flex items-center gap-1">
          <ul className="flex items-center max-md:hidden">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-[2.75rem] items-center rounded-inner px-3 text-sm font-semibold text-body hover:text-ink hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.resumeUrl} download className="btn btn-primary min-h-[2.75rem] px-4 text-sm">
            <Download size={16} aria-hidden="true" /> CV
          </a>
        </nav>
      </div>
    </header>
  );
}
