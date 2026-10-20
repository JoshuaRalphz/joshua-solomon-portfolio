import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import NotFound from './pages/NotFound.jsx';
import ClinicDemoPage from './pages/ClinicDemoPage.jsx';
import { cases } from './data/cases.js';
import { CLINIC_DEMO_PATH, normalizePath } from './routes.js';

/**
 * No router: each page is prerendered to its own HTML file (scripts/prerender.mjs)
 * and hydrated by main.jsx with the same path, so server and client render the same tree.
 */
export default function App({ path }) {
  const route = normalizePath(path);
  if (route === '/') return <Home />;
  if (route === CLINIC_DEMO_PATH) return <ClinicDemoPage />;
  const study = cases.find((c) => c.path === route);
  if (study) return <CaseStudy slug={study.slug} />;
  return <NotFound />;
}
