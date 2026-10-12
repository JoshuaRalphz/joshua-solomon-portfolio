import { m } from 'framer-motion';

const REVEAL_EASE = [0.16, 1, 0.3, 1];

/**
 * Reveal-on-scroll wrapper: once per element, 12px up + fade in.
 * Under prefers-reduced-motion, MotionConfig (App.jsx) drops the transform.
 * `m` (not `motion`) because App.jsx loads only the domAnimation features.
 */
export function Reveal({ children, delay = 0, className }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: REVEAL_EASE, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
