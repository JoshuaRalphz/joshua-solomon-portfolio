import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollHint from './components/ScrollHint.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const location = useLocation();

  // Scroll to top only on a true fresh load (no hash anchor target).
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key="single-page">
          {/* Single-page portfolio — every path renders the one-pager.
              Old multi-page routes (/about, /services, /works, /resume,
              /contact, /plan) resolve here so existing links don't 404. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollHint />
    </>
  );
}
