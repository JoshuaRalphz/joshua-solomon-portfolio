import { profile, sections } from '../data/content.js';

// Every section except the overview the visitor is already past.
const footerLinks = sections.filter((section) => section.id !== 'top');

/** Slim footer inside the main column, so the rail stays beside it. */
export default function Footer() {
  return (
    <footer className="mt-[var(--section)] border-t border-line pb-4 pt-6 text-sm font-medium text-muted">
      <div className="flex flex-col gap-x-8 gap-y-3 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 space-y-1">
          <p>© 2026 {profile.name} · {profile.shortRole} · Olongapo, PH</p>
          <p>Built from scratch · React · Hosted on Cloudflare Pages</p>
        </div>
        <nav aria-label="Footer">
          <ul className="-mx-2 flex flex-wrap">
            {footerLinks.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-[2.75rem] items-center rounded-inner px-2 text-body hover:text-ink hover:underline"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
