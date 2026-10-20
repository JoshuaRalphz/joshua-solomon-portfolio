import { useEffect, useState } from 'react';

/**
 * True once the element has been at least `amount` visible (then it stays true).
 * Also true at once when the user prefers reduced motion, so nothing waits on scroll.
 *
 * @param {{ current: Element | null }} ref
 * @param {number} amount 0..1 of the element that must be visible
 * @returns {boolean}
 */
export function useInViewOnce(ref, amount = 0.5) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsInView(true);
      observer.disconnect();
    }, { threshold: amount });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount]);

  return isInView;
}
