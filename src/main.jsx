import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import './styles.css';
import './styles/signature.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Prerendered pages hydrate; under `vite dev` #root holds only a comment, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
