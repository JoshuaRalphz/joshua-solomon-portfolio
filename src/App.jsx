import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import TopBar from './components/TopBar.jsx';
import Home from './pages/Home.jsx';
import { ActiveSectionProvider } from './hooks/useActiveSection.jsx';

export default function App() {
  const location = useLocation();

  // Scroll to top only on a true fresh load (no hash anchor target).
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <MotionConfig reducedMotion="user">
      <ActiveSectionProvider>
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-5"
        >
          Skip to content
        </a>
        <TopBar />
        <Routes>
          {/* Single-page portfolio: every path renders the one-pager, so old
              multi-page links (/about, /services, /works, /resume, /contact,
              /plan) still resolve. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </ActiveSectionProvider>
    </MotionConfig>
  );
}
