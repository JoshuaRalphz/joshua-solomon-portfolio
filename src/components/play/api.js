const REQUEST_TIMEOUT_MS = 45_000;
const FALLBACK_ERROR = "This demo isn't available right now.";

/**
 * POST JSON to one of the /api/play/* endpoints.
 * @returns {Promise<{ data?: { result: any, mock?: boolean }, error?: string }>}
 */
export async function postPlay(path, body) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) return { data };
    return { error: typeof data?.message === 'string' ? data.message : FALLBACK_ERROR };
  } catch {
    return { error: 'That took too long or the connection dropped. Try again in a moment.' };
  } finally {
    window.clearTimeout(timer);
  }
}

/** Only same-site paths (from the server's fixed passage list) are ever rendered as links. */
export const safePath = (url) => (typeof url === 'string' && /^\/(?!\/)[a-z0-9/#._-]*$/i.test(url) ? url : null);
