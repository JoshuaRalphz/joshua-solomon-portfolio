import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './Logo.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/works', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all backdrop-blur ${scrolled
        ? 'bg-white/90 border-b border-line shadow-sm'
        : 'bg-white/70 border-b border-transparent'}`}
    >
      <div className="container-x flex items-center justify-between py-3">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Wordmark size={32} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-navy' : 'text-body hover:text-ink'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary !py-2.5 !px-5 !text-sm">
            Get in touch
          </Link>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium ${isActive ? 'text-navy' : 'text-body'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary text-center justify-center">
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
