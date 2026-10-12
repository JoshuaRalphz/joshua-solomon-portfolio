import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { profile, sections } from '../data/content.js';
import { useActiveSection } from '../hooks/useActiveSection.jsx';

/**
 * Slim sticky bar shown below 1024px, where the profile rail is a card at the
 * top of the page. The wire lies flat here: a 2px progress line on the bottom edge.
 */
export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const index = useActiveSection();

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // Below 1024px the profile card sits above #top, so "back to top" means the real top.
  const handleBackToTop = (event) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0 });
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-mist/[.88] backdrop-blur lg:hidden"
      style={{ '--i': index }}
    >
      <div className="mx-auto flex h-14 max-w-[96rem] items-center justify-between gap-2 px-[var(--shell-pad)]">
        <a
          href="#top"
          aria-label={`${profile.name}, back to top`}
          onClick={handleBackToTop}
          className="flex min-h-[2.75rem] min-w-0 items-center gap-2.5 rounded-inner font-semibold text-ink"
        >
          <Logo size={28} />
          <span className="truncate">{profile.name}</span>
        </a>

        <div className="flex flex-none items-center gap-1">
          <a href={profile.resumeUrl} download aria-label="Download resume (PDF)" className="icon-link">
            <Download size={20} aria-hidden="true" />
          </a>
          <a href="#contact" onClick={closeMenu} className="btn btn-primary hidden min-h-[2.75rem] min-[480px]:inline-flex">
            Contact
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-link"
            aria-expanded={isOpen}
            aria-controls="section-menu"
            aria-label={isOpen ? 'Close section menu' : 'Open section menu'}
            onClick={() => setIsOpen((wasOpen) => !wasOpen)}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* The wire, lying flat: fills as you move down the six sections. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-ink transition-transform duration-300"
        style={{ transform: 'scaleX(calc(var(--i) / 5))' }}
      />

      {isOpen && (
        <div
          id="section-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-line bg-card p-4 shadow-lift"
        >
          <nav aria-label="Sections" className="mx-auto max-w-[40rem]">
            <ul>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={closeMenu}
                    aria-current={i === index ? 'location' : undefined}
                    className={`flex min-h-[2.75rem] items-center gap-3 rounded-inner px-2 text-ink hover:bg-sunk ${i === index ? 'font-bold' : 'font-medium'}`}
                  >
                    <span className="font-mono text-xs text-action">{section.num}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 max-[359px]:grid-cols-1">
              <a href="#contact" onClick={closeMenu} className="btn btn-primary">
                Get in touch <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href={profile.resumeUrl} download onClick={closeMenu} className="btn btn-secondary">
                <Download size={18} aria-hidden="true" /> Download resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
