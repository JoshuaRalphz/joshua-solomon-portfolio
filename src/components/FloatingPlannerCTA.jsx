import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Circle } from 'lucide-react';
import { PLANNER_SS_KEY } from '../pages/Quiz.jsx';

/**
 * Floating planner widget — chat-bubble pattern.
 *
 * COLLAPSED:
 *   - Small navy square icon at bottom-right (56px)
 *   - Persistent text chip floats to the left of the icon ("Take the planner →")
 *     so users immediately know what it is, even on mobile (no hover available)
 *
 * EXPANDED:
 *   - Mobile: centered modal that floats in the middle of the screen with backdrop
 *   - Desktop: floating card anchored bottom-right next to the icon
 *
 * Auto-hides on /plan and /contact.
 * Click outside / Esc to close.
 */

const HIDDEN_ROUTES = ['/plan', '/contact'];

const Q1_OPTIONS = [
  { value: 'agency',  label: 'Marketing agency (2-15 people)', hint: 'I need a subcontractor for client builds.' },
  { value: 'service', label: 'Service business owner',          hint: 'Real estate, coach, med spa, contractor, etc.' },
  { value: 'saas',    label: 'SaaS or tech founder',            hint: 'I need lead-gen infrastructure.' },
  { value: 'other',   label: 'Something else',                  hint: 'Mention it in your message.' },
];

export default function FloatingPlannerCTA() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const shouldHide = HIDDEN_ROUTES.includes(pathname);

  const handleChoose = (value) => {
    try {
      window.sessionStorage.setItem(
        PLANNER_SS_KEY,
        JSON.stringify({ step: 1, answers: { business: value } })
      );
    } catch { /* noop */ }
    setIsOpen(false);
    navigate('/plan');
  };

  if (!mounted || shouldHide) return null;

  return (
    <>
      {/* ────── COLLAPSED: icon + persistent text hint chip ────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cta-collapsed"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-2.5"
          >
            {/* Persistent hint chip — always visible so users know what the icon is */}
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center gap-1.5 bg-white border border-navy/20 text-navy text-xs font-bold px-3 py-2 rounded-lg shadow-soft whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-1">
                Take the planner
                <span className="text-[10px] uppercase tracking-widest text-gold font-extrabold">90s</span>
              </span>
              <ArrowRight size={12} strokeWidth={3} className="text-navy" />
              {/* Arrow notch pointing to the icon */}
              <span
                aria-hidden="true"
                className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-white border-y-[6px] border-y-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-[7px] border-l-navy/20 border-y-[7px] border-y-transparent -z-10"
                style={{ marginLeft: '-1px' }}
              />
            </motion.div>

            {/* The icon button */}
            <div className="relative">
              {/* Pulsing glow rings */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-navy/40 blur-xl animate-slow-pulse -z-10"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-2xl bg-gold/20 blur-xl animate-slow-pulse -z-10"
                style={{ animationDelay: '0.8s' }}
              />

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open the planner — 5 questions, about 90 seconds"
                aria-expanded={isOpen}
                className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy to-navy-dark text-white rounded-2xl shadow-lift hover:shadow-2xl hover:scale-110 hover:from-navy-dark hover:to-ink transition-all border border-navy-dark/40 focus:outline-none focus:ring-4 focus:ring-gold/30"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold text-ink">
                  <Sparkles size={20} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────── EXPANDED PANEL ────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile-only — desktop card floats freely) */}
            <motion.div
              key="cta-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              className="md:hidden fixed inset-0 bg-ink/50 backdrop-blur-sm z-40"
            />

            {/* The form panel — CENTERED on mobile (modal), bottom-right on desktop */}
            <motion.div
              key="cta-panel"
              ref={panelRef}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-line overflow-hidden
                         /* Mobile: centered modal in the middle of the screen */
                         left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[380px]
                         /* Desktop: floating card anchored bottom-right */
                         md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:bottom-8 md:right-8 md:w-[380px]"
              role="dialog"
              aria-label="5-question project planner"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 bg-gradient-to-br from-navy to-navy-dark text-white">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-ink flex-shrink-0">
                    <Sparkles size={16} strokeWidth={2.5} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-extrabold">Find your fit</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">5 questions · 90 seconds</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close planner"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-muted mb-2">
                  <span className="text-navy">Question 1 of 5</span>
                  <span>20%</span>
                </div>
                <div className="h-1 bg-line rounded-full overflow-hidden">
                  <div className="h-full w-1/5 bg-navy rounded-full" />
                </div>
              </div>

              {/* The actual question */}
              <div className="px-5 pt-4 pb-2">
                <h3 className="text-lg font-bold text-ink leading-snug">
                  What kind of business are you?
                </h3>
              </div>

              {/* Options */}
              <ul className="px-5 pb-4 space-y-2 max-h-[60vh] md:max-h-none overflow-y-auto">
                {Q1_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => handleChoose(opt.value)}
                      className="w-full text-left flex items-start gap-3 p-3 border border-line rounded-xl bg-white hover:border-navy hover:bg-navy-tint/40 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/15 transition-all group"
                    >
                      <Circle
                        size={16}
                        className="text-muted flex-shrink-0 mt-0.5 group-hover:text-navy transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-ink group-hover:text-navy transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-muted mt-0.5 leading-relaxed">{opt.hint}</div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-navy transition-all flex-shrink-0 mt-1.5"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-line">
                <p className="text-[11px] text-muted text-center leading-relaxed">
                  Pick one to start. Your answer saves automatically.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
