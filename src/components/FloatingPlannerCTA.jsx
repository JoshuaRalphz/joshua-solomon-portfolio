import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * Floating "Get my plan" CTA — bottom-right of every page.
 *
 * Replaces the older full-section PlannerTeaser that lived at the bottom
 * of Home/Services/Works/About/Resume. Persistent, lightweight, always one
 * click from /plan.
 *
 * Behavior:
 *   - Mounted globally in App.jsx
 *   - Auto-hides on /plan (already there) and /contact (terminal)
 *   - Slides in from bottom-right ~600ms after mount
 *   - Stays put on scroll
 *   - Hover: expands slightly + arrow nudges
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
          <Link
            to="/plan"
            aria-label="Get my plan — 5-question planner, about 90 seconds"
            className="group relative inline-flex items-center gap-3 pl-4 pr-5 py-3 md:py-3.5 bg-gradient-to-br from-navy to-navy-dark text-white rounded-full shadow-lift hover:shadow-2xl hover:scale-105 hover:from-navy-dark hover:to-ink transition-all border border-navy-dark/40"
          >
            {/* Pulsing glow ring */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-navy/40 blur-xl animate-slow-pulse -z-10"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gold/20 blur-xl animate-slow-pulse -z-10"
              style={{ animationDelay: '0.7s' }}
            />

            {/* Icon */}
            <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-ink flex-shrink-0">
              <Sparkles size={16} strokeWidth={2.5} />
            </span>

            {/* Label */}
            <span className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-extrabold tracking-tight">
                Get my plan
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/65">
                90-sec planner
              </span>
            </span>

            {/* Arrow — nudges right on hover */}
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
