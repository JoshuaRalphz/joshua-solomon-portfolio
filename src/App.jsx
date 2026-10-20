import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import NotFound from './pages/NotFound.jsx';
import { cases } from './data/cases.js';
import { normalizePath } from './routes.js';

/**
 * No router: each page is prerendered to its own HTML file (scripts/prerender.mjs)
 * and hydrated by main.jsx with the same path, so server and client render the same tree.
 */
export default function App({ path }) {
  const route = normalizePath(path);
  if (route === '/') return <Home />;
  const study = cases.find((c) => c.path === route);
  if (study) return <CaseStudy slug={study.slug} />;
  return <NotFound />;
}
