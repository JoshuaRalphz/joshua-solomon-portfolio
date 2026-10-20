import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect in the browser (measure before paint); useEffect while prerendering.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Roomiest first. The CSS for each one is in styles.css (.rail[data-density]).
const DENSITIES = ['full', 'compact', 'tight'];
const DESKTOP_QUERY = '(min-width: 1024px)';
// The rail sticks 1.5rem from the top and keeps the same gap at the bottom.
const RAIL_MARGIN_REM = 3;

/**
 * Keeps the sticky profile rail inside the viewport with no inner scrollbar.
 * It tries each density, roomiest first, and keeps the first one whose real
 * height fits. If none fits, the rail stops being sticky and scrolls with the
 * page. The height is measured, not guessed from breakpoints, so this holds at
 * every root font size, zoom level and line wrap.
 *
 * @param {{ current: HTMLElement | null }} railRef
 */
export function useRailFit(railRef) {
  useIsoLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    let isActive = true;

    const fit = () => {
      if (!isActive) return;
      // Below 1024px the rail is an ordinary card at the top of the page.
      if (!desktop.matches) {
        delete rail.dataset.density;
        delete rail.dataset.sticky;
        return;
      }
      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const room = window.innerHeight - RAIL_MARGIN_REM * remPx;

      let fitting = null;
      for (const density of DENSITIES) {
        rail.dataset.density = density;
        if (rail.offsetHeight <= room) {
          fitting = density;
          break;
        }
      }
      // Nothing fits: show the roomy layout and let it scroll with the page.
      if (!fitting) rail.dataset.density = DENSITIES[0];
      rail.dataset.sticky = String(Boolean(fitting));
    };

    const scheduleFit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    window.addEventListener('resize', scheduleFit);
    // Web fonts change where lines wrap, so measure again once they are in.
    document.fonts?.ready.then(scheduleFit);

    return () => {
      isActive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', scheduleFit);
    };
  }, [railRef]);
}
