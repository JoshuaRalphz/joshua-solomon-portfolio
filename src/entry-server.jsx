import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { routes, SITE } from './routes.js';

/** @param {string} path @returns {string} the page body HTML */
export function render(path) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
