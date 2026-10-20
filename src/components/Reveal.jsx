/**
 * Reveal-on-scroll with no JavaScript: `.reveal` uses a CSS scroll-driven animation
 * (styles.css) where the browser supports it, and is simply visible everywhere else,
 * under reduced motion, and in the prerendered HTML.
 */
export function Reveal({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}
