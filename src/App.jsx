import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollHint from './components/ScrollHint.jsx';
import FloatingPlannerCTA from './components/FloatingPlannerCTA.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Works from './pages/Works.jsx';
import Resume from './pages/Resume.jsx';
import Quiz from './pages/Quiz.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/plan" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollHint />
      <FloatingPlannerCTA />
    </>
  );
}
