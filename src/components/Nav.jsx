import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Wordmark } from './Logo.jsx';

// One-pager anchor nav — links scroll to sections on the single page.
const links = [
  { to: '#about', label: 'About' },
  { to: '#capabilities', label: 'Capabilities' },
  { to: '#work', label: 'Work' },
  { to: '#experience', label: 'Experience' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all backdrop-blur ${scrolled
        ? 'bg-white/90 border-b border-line shadow-sm'
        : 'bg-white/70 border-b border-transparent'}`}
    >
      <div className="container-x flex items-center justify-between py-3">
        <a href="#top" className="hover:opacity-90 transition-opacity">
          <Wordmark size={32} />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <a
              key={to}
              href={to}
              className="text-sm font-medium text-body hover:text-ink transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/Joshua_Solomon_Resume_v6.pdf"
            download
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-navy-dark"
          >
            <Download size={15} /> Resume
          </a>
          <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-sm">
            Get in touch
          </a>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map(({ to, label }) => (
              <a
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-body"
              >
                {label}
              </a>
            ))}
            <a
              href="/Joshua_Solomon_Resume_v6.pdf"
              download
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 py-2 text-base font-semibold text-navy"
            >
              <Download size={16} /> Download resume
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary text-center justify-center"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
