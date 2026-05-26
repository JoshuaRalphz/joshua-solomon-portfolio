import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Circle } from 'lucide-react';

/**
 * Sitewide "next step" teaser pointing to /plan.
 * Renders Q1 of the planner as a visual hook. Clicking ANY option (or anywhere
 * inside the card) simply navigates to /plan — answers are captured there,
 * not here. The card itself pulses to draw the eye.
 *
 * Drop one at the bottom of any page:
 *   <PlannerTeaser title="..." subtitle="..." />
 */

// Q1 mirrors what's in src/pages/Quiz.jsx — keep these in sync.
// Duplicated here so the teaser renders the same options visually without
// importing the full Quiz state machine.
const Q1_OPTIONS = [
  { value: 'agency',  label: 'Marketing agency (2-15 people)', hint: 'I need a subcontractor for client builds.' },
  { value: 'service', label: 'Service business owner',          hint: 'Real estate, coach, med spa, contractor, etc.' },
  { value: 'saas',    label: 'SaaS or tech founder',            hint: 'I need lead-gen infrastructure.' },
  { value: 'other',   label: 'Something else',                  hint: 'Mention it in your message.' },
];

export default function PlannerTeaser({
  label = 'Next · 90 seconds',
  title = 'Not sure where to start? Try the planner.',
  subtitle = "Five quick questions. No email gate. You'll get a scoped plan — what to build, in what order, what it costs, and a week-by-week timeline.",
}) {
  const navigate = useNavigate();
  const goToPlanner = () => navigate('/plan');

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-navy-tint/40 to-navy-tint/70 border-t border-line overflow-hidden">
      {/* Decorative dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F4C81 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-x relative">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-navy bg-white border border-navy/15 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-slow-pulse" />
            {label}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight text-center max-w-3xl mx-auto leading-tight"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 text-lg text-body text-center max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* PULSING CARD — visual hook that signals "click here". Clicking
            anywhere inside (the card or any option) routes to /plan. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-12 max-w-2xl mx-auto"
        >
          {/* Pulsing glow rings behind the card — high contrast so the
              animation is obvious. Two layers with offset timing for depth. */}
          <motion.span
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-navy/25 blur-2xl pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.97, 1.02, 0.97] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute -inset-2 rounded-2xl bg-gold/25 blur-xl pointer-events-none"
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.99, 1.015, 0.99] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />

          {/* The card itself — gently scales up/down so the FORM is visibly
              pulsing, not just the halo around it. */}
          <motion.button
            type="button"
            onClick={goToPlanner}
            aria-label="Open the planner"
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full text-left bg-white rounded-2xl shadow-lift border-2 border-navy/20 p-6 md:p-8 hover:border-navy hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-navy/15 transition-colors"
          >
            {/* Progress + step indicator */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-muted mb-4">
              <span className="text-navy">Question 1 of 5</span>
              <span className="flex-1 h-1 bg-line rounded-full overflow-hidden">
                <span className="block h-full w-1/5 bg-navy rounded-full" />
              </span>
            </div>

            {/* The actual question */}
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-5 leading-snug">
              What kind of business are you?
            </h3>

            {/* Options — visual previews; clicking any one navigates to /plan */}
            <ul className="space-y-2.5">
              {Q1_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <div
                    role="presentation"
                    className="flex items-start gap-3 p-3.5 border border-line rounded-xl bg-white hover:border-navy hover:bg-navy-tint/40 transition-all group/opt"
                  >
                    <Circle
                      size={18}
                      className="text-muted flex-shrink-0 mt-0.5 group-hover/opt:text-navy transition-colors"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink group-hover/opt:text-navy transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{opt.hint}</div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted opacity-0 -translate-x-1 group-hover/opt:opacity-100 group-hover/opt:translate-x-0 group-hover/opt:text-navy transition-all flex-shrink-0 mt-1"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
