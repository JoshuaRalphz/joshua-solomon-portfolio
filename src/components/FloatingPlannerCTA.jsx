import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Circle } from 'lucide-react';
import { PLANNER_SS_KEY } from '../pages/Quiz.jsx';

/**
 * Floating planner widget.
 *
 * DESKTOP (≥ md):
 *   - The expanded form is ALWAYS visible. No X button, no dismissal, no
 *     click-outside-to-close. It stays open the whole session.
 *   - Scroll-hide: while the user is actively scrolling, the form briefly
 *     hides (mirrors ScrollHint). Reappears ~1.5s after scrolling stops.
 *   - Clicking any of the 4 options saves the answer to sessionStorage and
 *     navigates to /plan at Q2.
 *
 * MOBILE (< md):
 *   - Just a small icon + "Take the planner 90s →" hint chip pinned at
 *     bottom-right. Tap it → navigate straight to /plan (no inline form,
 *     no modal — avoids cropping at narrow widths).
 *
 * Auto-hides entirely on /plan and /contact.
 */

const HIDDEN_ROUTES = ['/plan', '/contact'];
const SCROLL_IDLE_MS = 1500;

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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  // Delay-mount so it doesn't flash on first paint
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-hide (desktop only — mobile widget is small enough to stay put)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), SCROLL_IDLE_MS);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const shouldHide = HIDDEN_ROUTES.includes(pathname);

  const handleChoose = (value) => {
    try {
      window.sessionStorage.setItem(
        PLANNER_SS_KEY,
        JSON.stringify({ step: 1, answers: { business: value } })
      );
    } catch { /* noop */ }
    navigate('/plan');
  };

  if (!mounted || shouldHide) return null;
  if (isScrolling) return null;

  return (
    <>
      {/* ──────── MOBILE (< md): icon + hint chip → tap navigates to /plan ──────── */}
      <motion.div
        key="cta-mobile"
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
      >
        {/* Hint chip */}
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

        {/* Icon — links straight to /plan */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-navy/40 blur-xl animate-slow-pulse -z-10"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-2xl bg-gold/20 blur-xl animate-slow-pulse -z-10"
            style={{ animationDelay: '0.8s' }}
          />

          <Link
            to="/plan"
            aria-label="Take the planner — 5 questions, about 90 seconds"
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-navy to-navy-dark text-white rounded-2xl shadow-lift hover:shadow-2xl hover:scale-110 hover:from-navy-dark hover:to-ink transition-all border border-navy-dark/40 focus:outline-none focus:ring-4 focus:ring-gold/30"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold text-ink">
              <Sparkles size={20} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ──────── DESKTOP (≥ md): always-open expanded form, no close ──────── */}
      <motion.div
        key="cta-desktop"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="hidden md:block fixed z-50 bg-white rounded-2xl shadow-2xl border border-line overflow-hidden md:bottom-8 md:right-8 md:w-[380px]"
        role="complementary"
        aria-label="5-question project planner"
      >
        {/* Header (no X button — form stays open) */}
        <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-navy to-navy-dark text-white">
          <span className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-ink flex-shrink-0">
            <Sparkles size={16} strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-extrabold">Find your fit</div>
            <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">5 questions · 90 seconds</div>
          </div>
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

        {/* The question */}
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-lg font-bold text-ink leading-snug">
            What kind of business are you?
          </h3>
        </div>

        {/* Options */}
        <ul className="px-5 pb-4 space-y-2">
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
  );
}
