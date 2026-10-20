import ProfileRail from '../components/home/ProfileRail.jsx';
import HeroBento from '../components/home/HeroBento.jsx';
import Systems from '../components/home/Systems.jsx';
import FitAgentSection from '../components/home/FitAgentSection.jsx';
import PlaySection from '../components/play/PlaySection.jsx';
import WhatIBuild from '../components/home/WhatIBuild.jsx';
import WorkWithMe from '../components/home/WorkWithMe.jsx';
import Results from '../components/home/Results.jsx';
import About from '../components/home/About.jsx';
import Contact from '../components/home/Contact.jsx';
import Footer from '../components/Footer.jsx';
import TopBar from '../components/TopBar.jsx';
import { ActiveSectionProvider } from '../hooks/useActiveSection.jsx';

/**
 * The home page: a profile rail beside a bento column. The DOM order is the same at
 * every width, so tab order always matches what is on screen.
 */
export default function Home() {
  return (
    <ActiveSectionProvider>
      <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-5">
        Skip to content
      </a>
      <TopBar />
      <div className="shell">
        <ProfileRail />
        <div className="min-w-0">
          <main id="main" tabIndex={-1} className="flex flex-col gap-[var(--section)]">
            <div id="top"><HeroBento /></div>
            <Systems />
            <FitAgentSection />
            <PlaySection />
            <WhatIBuild />
            <WorkWithMe />
            <Results />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ActiveSectionProvider>
  );
}
