import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import './styles.css';
import './styles/signature.css';

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>,
);
