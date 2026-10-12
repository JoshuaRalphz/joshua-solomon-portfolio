import { createContext, useContext, useEffect, useState } from 'react';
import { sections } from '../data/content.js';

const ActiveSectionContext = createContext(0);

// A thin band 40% down the viewport decides which section is "current".
const SPY_ROOT_MARGIN = '-40% 0px -55% 0px';

/**
 * Holds the index (into `sections`) of the section on screen.
 * One IntersectionObserver, no scroll listeners.
 */
export function ActiveSectionProvider({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const ids = sections.map((s) => s.id);
    const observer = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).pop();
      // Between sections nothing intersects: keep the previous index.
      if (hit) setIndex(ids.indexOf(hit.target.id));
    }, { rootMargin: SPY_ROOT_MARGIN });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return <ActiveSectionContext.Provider value={index}>{children}</ActiveSectionContext.Provider>;
}

/** @returns {number} index of the active entry in `sections` */
export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
