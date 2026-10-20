// Service-binding only (no route, no workers.dev). Passes the request through unchanged,
// but only ever to the Anthropic API, so it can't be used to reach anything else.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.protocol !== 'https:' || url.hostname !== 'api.anthropic.com') {
      return new Response('Not allowed', { status: 403 });
    }
    return fetch(request);
  },
};
