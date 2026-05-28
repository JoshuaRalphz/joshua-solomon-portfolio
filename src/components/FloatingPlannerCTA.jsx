import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * Floating "Get my plan" CTA — bottom-right of every page.
 *
 * RESPONSIVE behavior:
 *   - Mobile (< md / < 768px): full pill — sparkles icon + "Get my plan" +
 *     "90-sec planner" sublabel + arrow. Same as before.
 *   - Desktop (≥ md): collapses to a 56px square icon button (chat-widget
 *     style). Just the sparkles icon. Hover scales it up + reveals a tooltip
 *     "Get my plan" sliding in from the left.
 *
 * Both variants link to /plan.
 *
 * Mounted globally in App.jsx. Auto-hides on /plan and /contact.
 */

const HIDDEN_ROUTES = ['/plan', '/contact'];

export default function FloatingPlannerCTA() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const shouldHide = HIDDEN_ROUTES.includes(pathname);

  return (
    <AnimatePresence>
      {mounted && !shouldHide && (
        <motion.div
          key="floating-planner-cta"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30"
        >
          {/* ─── MOBILE: full pill (visible < md) ─── */}
          <Link
            to="/plan"
            aria-label="Get my plan — 5-question planner, about 90 seconds"
            className="md:hidden group relative inline-flex items-center gap-3 pl-4 pr-5 py-3 bg-gradient-to-br from-navy to-navy-dark text-white rounded-full shadow-lift hover:shadow-2xl hover:scale-105 transition-all border border-navy-dark/40"
          >
            {/* Pulsing glow rings */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-navy/40 blur-xl animate-slow-pulse -z-10"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gold/20 blur-xl animate-slow-pulse -z-10"
              style={{ animationDelay: '0.7s' }}
            />

            <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-ink flex-shrink-0">
              <Sparkles size={16} strokeWidth={2.5} />
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold tracking-tight">
                Get my plan
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/65">
                90-sec planner
              </span>
            </span>

            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* ─── DESKTOP: 56px square icon button (visible ≥ md) ─── */}
          <div className="hidden md:block relative group">
            {/* Tooltip — slides in from right on hover */}
            <div
              aria-hidden="true"
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            >
              <div className="flex items-center gap-2 bg-ink text-white text-sm font-bold px-3.5 py-2 rounded-lg shadow-lift whitespace-nowrap">
                Get my plan
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold">
                  90s
                </span>
                {/* Arrow pointing to the icon */}
                <span
                  aria-hidden="true"
                  className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-ink border-y-[6px] border-y-transparent"
                />
              </div>
            </div>

            {/* Subtle pulsing glow */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-navy/35 blur-xl animate-slow-pulse -z-10"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl bg-gold/20 blur-xl animate-slow-pulse -z-10"
              style={{ animationDelay: '0.8s' }}
            />

            {/* The button itself */}
            <Link
              to="/plan"
              aria-label="Get my plan — 5-question planner, about 90 seconds"
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy to-navy-dark text-white rounded-2xl shadow-lift hover:shadow-2xl hover:scale-110 hover:from-navy-dark hover:to-ink transition-all border border-navy-dark/40 focus:outline-none focus:ring-4 focus:ring-gold/30"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold text-ink">
                <Sparkles size={20} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
