import { ArrowRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import { cases } from '../data/cases.js';

/** Served by Cloudflare Pages with a real 404 status (dist/404.html). */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div className="page">
        <main id="main" className="tile mx-auto max-w-[48rem]">
          <p className="label"><span className="label-num">404</span> · Not found</p>
          <h1 className="t-h2 mt-3">This page doesn’t exist.</h1>
          <p className="t-lead mt-3 text-body">The link may be old. Here is where the work lives now:</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {[{ path: '/', name: 'Home' }, ...cases].map((c) => (
              <li key={c.path}>
                <a href={c.path} className="btn btn-secondary w-full justify-between">
                  {c.name} <ArrowRight size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
