import { useEffect, useRef, useState } from 'react';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;

function loadScript() {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => { scriptPromise = null; reject(new Error('turnstile')); };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Optional Cloudflare Turnstile. Does nothing unless VITE_TURNSTILE_SITE_KEY was
 * set at build time (the server only checks tokens when TURNSTILE_SECRET is set).
 */
export function useTurnstile(siteKey) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined;
    let isCancelled = false;
    loadScript()
      .then((turnstile) => {
        if (isCancelled || !containerRef.current) return;
        widgetRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: 'fit-check',
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => {});
    return () => {
      isCancelled = true;
      if (widgetRef.current !== null) window.turnstile?.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [siteKey]);

  // Tokens are single-use: get a fresh one after every run.
  const reset = () => {
    setToken('');
    if (widgetRef.current !== null) window.turnstile?.reset(widgetRef.current);
  };

  return { containerRef, token, reset, isEnabled: Boolean(siteKey) };
}
