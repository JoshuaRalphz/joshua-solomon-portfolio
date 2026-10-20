import ProfileRail from '../components/home/ProfileRail.jsx';
import HeroBento from '../components/home/HeroBento.jsx';
import ExploreCards from '../components/home/ExploreCards.jsx';
import Projects from '../components/home/Projects.jsx';
import FitAgent from '../components/fit/FitAgent.jsx';
import Results from '../components/home/Results.jsx';
import Services from '../components/home/Services.jsx';
import About from '../components/home/About.jsx';
import Contact from '../components/home/Contact.jsx';
import Footer from '../components/Footer.jsx';

/**
 * The "workflow canvas": a profile rail beside a bento of unequal tiles.
 * Thin composer only. The DOM order is the same at every width; nothing is
 * reordered with CSS, so tab order always matches what is on screen.
 */
export default function Home() {
  return (
    <div className="shell">
      <ProfileRail />
      <div className="min-w-0">
        <main id="main" tabIndex={-1} className="flex flex-col gap-[var(--section)]">
          {/* #top spans the hero and the Explore cards, so the section menu
              reads "Overview" for the whole first screen. */}
          <div id="top" className="flex flex-col gap-8">
            <HeroBento />
            <ExploreCards />
          </div>
          <Projects />
          <FitAgent />
          <Results />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
