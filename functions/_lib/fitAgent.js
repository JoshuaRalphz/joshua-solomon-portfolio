import Anthropic from '@anthropic-ai/sdk';
import { FIT_SCHEMA, SYSTEM_PROMPT, buildUserMessage } from './fitPrompt.js';
import { normalizeResult } from './fitResult.js';
import { d1Store, sharedMemoryStore } from './store.js';
import { MOCK_RESULT, MOCK_USAGE } from './mockResult.js';

export const MODEL = 'claude-opus-5-5';
export const MAX_TOKENS = 2000;
export const MAX_BODY_BYTES = 16 * 1024;
export const MIN_CHARS = 200;
export const MAX_CHARS = 8000;
const MAX_COMPANY_CHARS = 120;
const API_TIMEOUT_MS = 60_000;
const MOCK_DELAY_MS = 2500;

const DEFAULTS = { runsPerVisitor: 5, dailyUsd: 1, monthlyUsd: 30 };

// USD per million tokens, so tokens x price = micro-dollars. A refused request
// can re-run on a fallback model (Opus 4.8 at $5/$25), priced at that rate.
const PRICE = { input: 4, output: 20 };
const FALLBACK_PRICE = { input: 5, output: 25 };
// Generous token bound for the fixed prompt (English runs about 4 chars a token).
const PROMPT_TOKENS_UPPER = Math.ceil((SYSTEM_PROMPT.length + JSON.stringify(FIT_SCHEMA).length) / 3) + 300;

const ORIGINS = ['https://solomonjoshua.com', 'https://www.solomonjoshua.com'];
export const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
const PREVIEW_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?joshua-solomon-portfolio\.pages\.dev$/;

const MESSAGES = {
  disabled: 'The fit check is paused right now.',
  origin: 'This check only runs on solomonjoshua.com.',
  method: 'Send the job post with POST.',
  type: 'Send the job post as JSON.',
  size: 'That request is too large. Paste up to 8,000 characters.',
  json: "That request didn't come through as valid JSON.",
  short: `Paste a bit more of the job post (at least ${MIN_CHARS} characters) so there is enough to compare.`,
  long: `That post is longer than ${MAX_CHARS.toLocaleString('en-US')} characters. Paste the role summary and requirements.`,
  captcha: "Please complete the quick human check and try again.",
  visitor: "You've used today's fit checks from this connection. Email me the post and I'll answer myself.",
  budget: "The fit check has reached its spending cap for now. Email me the post and I'll answer myself.",
  unavailable: "The fit check isn't available right now.",
  busy: 'Claude is busy right now. Try again in a minute.',
  timeout: 'That took too long. Try again with a shorter post.',
  refused: "Claude couldn't assess that text. Try pasting just the role and its requirements.",
  incomplete: 'The answer ran out of room. Try a shorter post.',
  error: 'Something went wrong on my side.',
};

/** JSON reply with no CORS headers: other origins cannot read it. */
export function reply(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

const fail = (status, code) => reply(status, { ok: false, code, message: MESSAGES[code] });

export function isAllowedOrigin(origin, env) {
  if (!origin) return false;
  if (ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin)) return true;
  const extra = String(env.FIT_ALLOWED_ORIGINS ?? '').split(',').map((item) => item.trim());
  return extra.includes(origin);
}

function readNumber(value, fallback) {
  const number = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(number) && number >= 0 ? number : fallback;
}

export function readLimits(env) {
  return {
    runsPerVisitor: Math.floor(readNumber(env.FIT_RUNS_PER_VISITOR, DEFAULTS.runsPerVisitor)),
    dayMicro: Math.round(readNumber(env.FIT_DAILY_BUDGET_USD, DEFAULTS.dailyUsd) * 1e6),
    monthMicro: Math.round(readNumber(env.FIT_MONTHLY_BUDGET_USD, DEFAULTS.monthlyUsd) * 1e6),
  };
}

/** Worst case for one call: the largest prompt plus every output token, on both hops. */
export function maxCostMicro(jobBytes) {
  const input = PROMPT_TOKENS_UPPER + jobBytes;
  return input * (PRICE.input + FALLBACK_PRICE.input) + MAX_TOKENS * (PRICE.output + FALLBACK_PRICE.output);
}

/** Actual cost from the response usage (top-level counts are cumulative over hops). */
export function actualCostMicro(usage) {
  if (!usage) return null;
  const fellBack = (usage?.iterations ?? []).some((entry) => entry?.type === 'fallback_message');
  const rate = fellBack ? FALLBACK_PRICE : PRICE;
  const input = (usage?.input_tokens ?? 0) + (usage?.cache_creation_input_tokens ?? 0) + (usage?.cache_read_input_tokens ?? 0);
  return Math.ceil(input * rate.input + (usage?.output_tokens ?? 0) * rate.output);
}

export async function hashVisitor(salt, day, ip) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(salt), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${day}|${ip}`));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(secret, token, ip, fetchImpl) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = await res.json();
    return data?.success === true;
  } catch {
    return false;
  }
}

/** Reads the body but stops at `limit` bytes (a chunked body has no Content-Length). */
export async function readCapped(request, limit) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

/** One counter per IPv4 address, or per /64 for IPv6 (one home or phone gets a whole /64). */
export function visitorKey(ip) {
  if (!ip.includes(':')) return ip;
  const [head, tail = ''] = ip.toLowerCase().split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const groups = ip.includes('::') ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right] : left;
  return `${groups.slice(0, 4).map((group) => group.replace(/^0+(?=.)/, '')).join(':')}::/64`;
}

/** Reads and checks the body. Returns { input } or { error: Response }. */
async function readInput(request) {
  if (!String(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return { error: fail(415, 'type') };
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return { error: fail(413, 'size') };
  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return { error: fail(413, 'size') };

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return { error: fail(400, 'json') };
  }
  if (!body || typeof body !== 'object' || typeof body.jobText !== 'string') return { error: fail(400, 'json') };

  const jobText = body.jobText.trim();
  if (jobText.length < MIN_CHARS) return { error: fail(400, 'short') };
  if (jobText.length > MAX_CHARS) return { error: fail(400, 'long') };
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, MAX_COMPANY_CHARS) : '';
  return { input: { jobText, company, turnstileToken: body.turnstileToken } };
}

function defaultClient(env) {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: API_TIMEOUT_MS });
}

async function askClaude(client, jobText, company) {
  return client.beta.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low', format: { type: 'json_schema', schema: FIT_SCHEMA } },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserMessage(jobText, company) }],
  });
}

/** Maps an SDK error to a reply. Logs the class and status only, never the request. */
function apiErrorReply(error) {
  console.error('fit-agent: Claude call failed', error?.constructor?.name, error?.status ?? '');
  if (error instanceof Anthropic.APIConnectionTimeoutError) return fail(504, 'timeout');
  if (error instanceof Anthropic.APIConnectionError) return fail(502, 'error');
  if (error instanceof Anthropic.RateLimitError) return fail(503, 'busy');
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) return fail(503, 'unavailable');
  if (error instanceof Anthropic.InternalServerError) return fail(503, 'busy');
  if (error instanceof Anthropic.APIError) return fail(502, 'error');
  return fail(500, 'error');
}

/** Turns a model response into the reply, checking stop_reason before content. */
function resultReply(response, isMock) {
  if (response.stop_reason === 'refusal') return fail(422, 'refused');
  if (response.stop_reason === 'max_tokens') return fail(502, 'incomplete');
  try {
    const text = (response.content ?? []).filter((block) => block.type === 'text').pop()?.text;
    return reply(200, { ok: true, mock: isMock, result: normalizeResult(JSON.parse(text)) });
  } catch {
    return fail(502, 'error');
  }
}

/**
 * POST /api/fit. `deps` exists for tests: createClient, store, fetch, sleep, now.
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {{ waitUntil?: (p: Promise<unknown>) => void }} ctx
 */
export async function handleFit(request, env, ctx = {}, deps = {}) {
  if (request.method !== 'POST') return fail(405, 'method');
  if (!isAllowedOrigin(request.headers.get('origin'), env)) return fail(403, 'origin');
  if (env.FIT_AGENT_ENABLED !== '1') return fail(503, 'disabled');

  const { input, error } = await readInput(request);
  if (error) return error;

  // Mock answers only ever come from a local dev server, never from a real host.
  const isMock = env.FIT_AGENT_MOCK === '1' && LOCAL_HOSTS.has(new URL(request.url).hostname);
  const needed = ['ANTHROPIC_API_KEY', 'FIT_DB', 'FIT_IP_SALT'];
  if (env.FIT_REQUIRE_TURNSTILE === '1') needed.push('TURNSTILE_SECRET');
  if (!isMock && needed.some((name) => !env[name])) {
    console.error('fit-agent: missing config', needed.filter((name) => !env[name]).join(','));
    return fail(503, 'unavailable');
  }

  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (env.TURNSTILE_SECRET && !(await verifyTurnstile(env.TURNSTILE_SECRET, input.turnstileToken, ip, deps.fetch ?? fetch))) {
    return fail(403, 'captcha');
  }

  const store = deps.store ?? (env.FIT_DB ? d1Store(env.FIT_DB) : sharedMemoryStore());
  const limits = readLimits(env);
  const iso = new Date(deps.now ?? Date.now()).toISOString();
  const periods = { day: `d:${iso.slice(0, 10)}`, month: `m:${iso.slice(0, 7)}` };

  try {
    const visitor = await hashVisitor(env.FIT_IP_SALT ?? 'mock-salt', iso.slice(0, 10), visitorKey(ip));
    if (limits.runsPerVisitor < 1 || !(await store.takeVisitorRun(iso.slice(0, 10), visitor, limits.runsPerVisitor))) {
      return fail(429, 'visitor');
    }
    ctx.waitUntil?.(store.prune(iso.slice(0, 10)).catch(() => {}));

    const reserved = maxCostMicro(new TextEncoder().encode(input.jobText + input.company).length);
    if (!(await store.reserve(periods, reserved, { day: limits.dayMicro, month: limits.monthMicro }))) {
      return fail(429, 'budget');
    }

    let response = null;
    try {
      if (isMock) {
        await (deps.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms))))(MOCK_DELAY_MS);
        response = { stop_reason: 'end_turn', usage: MOCK_USAGE, content: [{ type: 'text', text: JSON.stringify(MOCK_RESULT) }] };
      } else {
        response = await askClaude((deps.createClient ?? defaultClient)(env), input.jobText, input.company);
      }
    } catch (apiError) {
      return apiErrorReply(apiError);
    } finally {
      // A failed or timed-out call (or one with no usage) stays counted at its maximum possible cost.
      const actual = response ? actualCostMicro(response.usage) : null;
      await store.settle(periods, reserved, actual ?? reserved).catch((settleError) => {
        console.error('fit-agent: settle failed, spend stays at the reserved maximum', settleError?.constructor?.name);
      });
    }
    return resultReply(response, isMock);
  } catch (storeError) {
    console.error('fit-agent: counter store failed', storeError?.constructor?.name);
    return fail(503, 'unavailable');
  }
}
