import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import TopBar from './components/TopBar.jsx';
import Home from './pages/Home.jsx';
import { ActiveSectionProvider } from './hooks/useActiveSection.jsx';

/**
 * One page, no router. The old multi-page paths (/about, /services, /works,
 * /resume, /contact, /plan) are redirected to their section in
 * public/_redirects, and the browser's own scroll restoration handles Back
 * and reload, so nothing here touches the scroll position.
 */
export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ActiveSectionProvider>
          <a
            href="#main"
            className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-5"
          >
            Skip to content
          </a>
          <TopBar />
          <Home />
        </ActiveSectionProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
