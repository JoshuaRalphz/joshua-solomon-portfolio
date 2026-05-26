# Joshua Solomon — Portfolio (v5 · React)

Multi-page React portfolio for **Joshua Solomon**, freelance CRM & Automation Specialist.

🌐 **Live:** _(deploy below)_

## Stack

- **Framework:** Vite + React 18 (JSX, no TypeScript)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Formspree
- **Icons:** lucide-react
- **Hosting:** Cloudflare Pages

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, stats, benefits, tech stack preview, quiz CTA |
| `/services` | Four service offerings + flat retainer pricing |
| `/works` | Featured Bishop case study + other builds |
| `/about` | Story + full tools grid by category |
| `/resume` | Inline resume — no download needed (but downloadable) |
| `/quiz` | 4-question lead-qualification quiz → tailored recommendation |
| `/contact` | Form (Formspree) + direct contact links |

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Outputs to `dist/`. Preview with `npm run preview`.

## Deploy to Cloudflare Pages

1. Push this folder to a new GitHub repo (`portfolio-v5` or `joshua-solomon-portfolio`)
2. Cloudflare → Workers & Pages → Create application → Pages → Connect to Git
3. Pick the repo
4. Build settings:
   - **Framework preset:** Vite (or "None" with manual settings)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 (set under environment variables: `NODE_VERSION=20`)
5. Save & Deploy
6. (Optional) Custom domain → attach `solomonjoshua.com` (already targeted in index.html og:url)

The `public/_redirects` file handles client-side React Router routes on Cloudflare Pages.

## TODOs before going fully live

Search and replace:

1. ~~`REPLACE-FORMSPREE-ID`~~ → done. Contact form now POSTs JSON to the GHL `WF-PORTFOLIO` inbound webhook (`PORTFOLIO_GHL_WEBHOOK` in `src/data/content.js`).
2. **`REPLACE-LINKEDIN-HANDLE`** in `src/components/Footer.jsx` and `src/data/content.js` → real LinkedIn URL
3. **`Joshua_Solomon_Resume_v4.docx`** — drop the actual file in `public/` for the resume download to work

## Content edits

All editable text lives in **`src/data/content.js`** — change profile, stats, benefits, services, tools, works, experience in one place. No JSX edits needed for normal updates.

## Project structure

```
portfolio_v5/
├── public/
│   ├── favicon.svg
│   ├── _redirects                  Cloudflare Pages SPA routing
│   └── Joshua_Solomon_Resume_v4.docx  (you add this)
├── src/
│   ├── components/
│   │   ├── Logo.jsx                Logo + Wordmark
│   │   ├── Nav.jsx                 Sticky responsive nav
│   │   ├── Footer.jsx
│   │   └── PageTransition.jsx      AnimatePresence wrapper + Reveal
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Works.jsx               Bishop featured w/ video embeds
│   │   ├── Resume.jsx
│   │   ├── Quiz.jsx                4-step questionnaire flow
│   │   └── Contact.jsx
│   ├── data/
│   │   └── content.js              All copy lives here
│   ├── App.jsx                     Router
│   ├── main.jsx                    React entry
│   └── styles.css                  Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Contact

- Email: solomonjoshua101602@gmail.com
- WhatsApp: +63 961 556 2117
- GitHub: [JoshuaRalphz](https://github.com/JoshuaRalphz)
