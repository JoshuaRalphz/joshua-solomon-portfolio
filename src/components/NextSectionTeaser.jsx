import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * "What's next" teaser at the bottom of a long page.
 * Keeps people scrolling instead of bouncing.
 *
 * Renders:
 *   - Small "NEXT" label
 *   - Headline + supporting copy
 *   - A scaled-down mock preview of the destination page (children)
 *   - Primary CTA linking to the destination
 *   - Bouncing chevron under the CTA hinting more is below
 *
 * Props:
 *   label    — small uppercase tag above headline (default "What's next")
 *   title    — big headline
 *   subtitle — supporting copy under headline
 *   to       — react-router path for the CTA
 *   ctaText  — button label (e.g. "Take the planner")
 *   children — the mock preview element
 */
export default function NextSectionTeaser({
  label = "What's next",
  title,
  subtitle,
  to,
  ctaText,
  children,
}) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-navy-tint/40 to-navy-tint/70 border-t border-line overflow-hidden">
      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #0F4C81 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-x relative">
        {/* Label */}
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

        {/* Mock preview — scaled / tilted for a "peek" feel */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ scale: 1.015, y: -4 }}
          className="mt-12 max-w-2xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          <Link
            to={to}
            className="block group relative bg-white rounded-2xl shadow-lift border border-line p-6 md:p-8 hover:border-navy hover:shadow-2xl transition-all"
          >
            {children}

            {/* Subtle scrim hinting clickability */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-navy/0 via-transparent to-gold/0 group-hover:from-navy/[0.02] group-hover:to-gold/[0.04] transition-colors pointer-events-none" />
          </Link>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-12 text-center"
        >
          <Link
            to={to}
            className="group inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white font-bold px-7 py-4 rounded-xl shadow-lift hover:shadow-2xl transition-all"
          >
            {ctaText}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
