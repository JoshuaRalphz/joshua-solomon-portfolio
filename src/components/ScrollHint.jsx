import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

/**
 * Floating "more below" scroll cue.
 * Appears at viewport bottom when the user pauses scrolling AND
 * there's more real content below (not just the footer). Hides during
 * active scroll. Click to jump down one viewport.
 *
 * Tunables:
 *   IDLE_MS  — how long after scroll stops before showing
 *   EXTRA_PAD — additional buffer beyond footer height (px)
 */
const IDLE_MS = 1500;
const EXTRA_PAD = 40;

export default function ScrollHint() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Cache the footer reference once. Re-measure on resize since layout shifts
    // can change footer height (e.g. mobile breakpoints, font swaps).
    let footerEl = document.querySelector('footer');

    const getFooterHeight = () => {
      if (!footerEl || !document.body.contains(footerEl)) {
        footerEl = document.querySelector('footer');
      }
      return footerEl ? footerEl.offsetHeight : 0;
    };

    const checkAndMaybeShow = () => {
      const scrolled = window.scrollY;
      const viewport = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const footerH = getFooterHeight();
      // "More below" only counts CONTENT below — once the footer is the only
      // thing left to scroll into view, we treat the page as effectively done.
      const moreBelow = scrolled + viewport < total - footerH - EXTRA_PAD;
      setVisible(moreBelow);
    };

    const onScroll = () => {
      // Hide immediately on any scroll movement
      setVisible(false);
      // Restart the idle timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(checkAndMaybeShow, IDLE_MS);
    };

    // First-load: arm the idle timer (so if they don't scroll at all,
    // we still surface a hint after IDLE_MS to invite them down)
    timerRef.current = setTimeout(checkAndMaybeShow, IDLE_MS);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkAndMaybeShow);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkAndMaybeShow);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-hint"
          type="button"
          onClick={handleClick}
          aria-label="Scroll down for more"
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="hidden md:block fixed bottom-7 left-1/2 -translate-x-1/2 z-30 group"
        >
          {/* Pulsing glow ring — draws the eye */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-navy/35 blur-xl animate-slow-pulse"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-gold/25 blur-2xl animate-slow-pulse"
            style={{ animationDelay: '0.7s' }}
          />

          {/* The pill itself */}
          <div className="relative flex items-center gap-3 pl-5 pr-3 py-3 bg-gradient-to-br from-navy to-navy-dark text-white rounded-full shadow-lift border border-navy-dark/50 group-hover:from-navy-dark group-hover:to-ink group-hover:shadow-2xl group-hover:scale-105 transition-all">
            <span className="text-xs uppercase tracking-[0.16em] font-extrabold">
              Scroll for more
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-ink shadow-inner"
            >
              <ChevronsDown size={16} strokeWidth={3} />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
