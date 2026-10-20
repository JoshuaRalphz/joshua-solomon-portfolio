// Build-time prerender: renders every route in src/routes.js to static HTML in dist/.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx` (server).
// No extra dependency: this is Vite's documented SSR + prerender pattern.
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const { render, routes, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');

// Preload only the latin variable display font (the one every page paints first).
const assets = await readdir(join(dist, 'assets'));
const font = assets.find((f) => /^bricolage-grotesque-latin-opsz-normal-.*\.woff2$/.test(f));
const preload = font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />` : '';

for (const route of routes) {
  const url = route.path === '/404' ? null : `${SITE}${route.path}`;
  const head = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    route.noindex
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    url && `<link rel="canonical" href="${url}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    preload,
  ].filter(Boolean).join('\n    ');

  const html = template
    // Function replacers: a `$&` or `$'` in the content must stay literal text.
    .replace('<!--head-->', () => head)
    .replace('<!--app-html-->', () => render(route.path));
  if (html.includes('<!--head-->') || html.includes('<!--app-html-->')) throw new Error(`Placeholder left in ${route.file}`);

  const out = join(dist, route.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerendered ${route.path} -> dist/${route.file} (${html.length} bytes)`);
}

await rm(ssrDir, { recursive: true, force: true });
