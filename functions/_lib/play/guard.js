// Shared request pipeline for the /api/play/* AI demos. Same protections as the fit
// agent (functions/_lib/fitAgent.js), and the SAME counters (functions/_lib/store.js):
// - one spend pool: every demo reserves from the fit agent's daily + monthly rows
//   (FIT_DAILY_BUDGET_USD / FIT_MONTHLY_BUDGET_USD, default $1 / $30), priced per model;
// - a per-visitor counter of their own: the same table and salted hash as the fit agent,
//   but a 'play:'-prefixed row, so demo runs never use up a visitor's fit checks
//   (PLAY_RUNS_PER_VISITOR, default 8 a day across all demos; the fit agent keeps 5);
// - plus a play-only sub-cap inside that pool (PLAY_DAILY_BUDGET_USD / PLAY_MONTHLY_BUDGET_USD,
//   default $0.50 / $15), so the demos can never spend the fit agent's whole day.
//   Its counters are separate rows in the same table ('pd:YYYY-MM-DD', 'pm:YYYY-MM').
// Nothing typed by the visitor is stored or logged.
import Anthropic from '@anthropic-ai/sdk';
import { LOCAL_HOSTS, hashVisitor, isAllowedOrigin, readCapped, readLimits, relayFetch, reply, visitorKey } from '../fitAgent.js';
import { d1Store, sharedMemoryStore } from '../store.js';

export const PLAY_MODEL = 'claude-opus-5-5';
// USD per million tokens = micro-dollars per token.
// Opus 5.5 rates, the same the fit agent uses (Haiku 5.5 is refused for this key: 403).
export const PLAY_PRICE = { input: 4, output: 20 };
export const MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_RUNS_PER_VISITOR = 8;
const DEFAULT_PLAY_BUDGET = { dailyUsd: 0.5, monthlyUsd: 15 };
const API_TIMEOUT_MS = 30_000;
const MOCK_DELAY_MS = 1200;
// Fixed request overhead (roles, schema wrapper) on top of the bytes we send.
const OVERHEAD_TOKENS = 600;

const COMMON_MESSAGES = {
  disabled: 'This demo is paused right now.',
  origin: 'This demo only runs on solomonjoshua.com.',
  method: 'Send it with POST.',
  type: 'Send it as JSON.',
  size: 'That request is too large.',
  json: "That request didn't come through as valid JSON.",
  visitor: "You've used today's AI demo runs from this connection. Email me and I'll answer myself.",
  budget: "The AI demos have reached today's spending cap. Email me and I'll answer myself.",
  unavailable: "This demo isn't available right now.",
  busy: 'Claude is busy right now. Try again in a minute.',
  timeout: 'That took too long. Try again in a moment.',
  refused: "Claude couldn't work with that text. Try different wording.",
  incomplete: 'The answer ran out of room. Try a shorter text.',
  error: 'Something went wrong on my side.',
};

/** Worst case: every byte we send is a token (true for any tokenizer), plus every output token. */
export function playMaxCostMicro(promptBytes, maxTokens) {
  return Math.ceil((promptBytes + OVERHEAD_TOKENS) * PLAY_PRICE.input + maxTokens * PLAY_PRICE.output);
}

/** Real cost from usage. Thinking tokens are already inside output_tokens. */
export function playActualCostMicro(usage) {
  if (!usage) return null;
  const input = (usage.input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0);
  return Math.ceil(input * PLAY_PRICE.input + (usage.output_tokens ?? 0) * PLAY_PRICE.output);
}

function readUsd(value, fallback) {
  const number = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(number) && number >= 0 ? number : fallback;
}

/** The play-only sub-cap, in micro-dollars. */
export function readPlayCaps(env) {
  return {
    day: Math.round(readUsd(env.PLAY_DAILY_BUDGET_USD, DEFAULT_PLAY_BUDGET.dailyUsd) * 1e6),
    month: Math.round(readUsd(env.PLAY_MONTHLY_BUDGET_USD, DEFAULT_PLAY_BUDGET.monthlyUsd) * 1e6),
  };
}

function runsPerVisitor(env) {
  const value = Number(env.PLAY_RUNS_PER_VISITOR);
  return env.PLAY_RUNS_PER_VISITOR !== undefined && env.PLAY_RUNS_PER_VISITOR !== '' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : DEFAULT_RUNS_PER_VISITOR;
}

function apiErrorCode(error) {
  console.error('play: Claude call failed', error?.constructor?.name, error?.status ?? '', String(error?.error?.error?.message ?? '').slice(0, 300));
  if (error instanceof Anthropic.APIConnectionTimeoutError) return [504, 'timeout'];
  if (error instanceof Anthropic.APIConnectionError) return [502, 'error'];
  if (error instanceof Anthropic.RateLimitError) return [503, 'busy'];
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) return [503, 'unavailable'];
  if (error instanceof Anthropic.InternalServerError) return [503, 'busy'];
  if (error instanceof Anthropic.APIError) return [502, 'error'];
  return [500, 'error'];
}

function defaultClient(env) {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: API_TIMEOUT_MS, fetch: relayFetch(env) });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readJson(request) {
  if (!String(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) return { code: [415, 'type'] };
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return { code: [413, 'size'] };
  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return { code: [413, 'size'] };
  try {
    const body = JSON.parse(raw);
    return body && typeof body === 'object' && !Array.isArray(body) ? { body } : { code: [400, 'json'] };
  } catch {
    return { code: [400, 'json'] };
  }
}

/**
 * @typedef {object} PlayDemo
 * @property {string} id short name for logs
 * @property {string} enabledVar env var that must be '1' (kill switch, default off)
 * @property {Record<string, string>} messages demo-specific error texts (by code)
 * @property {(body: object) => ({ input: any } | { code: [number, string] })} parse validates the body
 * @property {(input: any) => ({ early?: object, context?: any })} [prepare] runs before any counter; `early` answers without Claude
 * @property {(input: any, context: any) => { system: string, user: string, schema: object, maxTokens: number }} build
 * @property {(raw: unknown, input: any, context: any) => object} normalize throws on unusable output
 * @property {(input: any, context: any) => object} mock canned model JSON for local mock mode
 */

/**
 * POST handler shared by every play demo. `deps` is for tests: createClient, store, now, sleep.
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {{ waitUntil?: (p: Promise<unknown>) => void }} ctx
 * @param {Record<string, any>} deps
 * @param {PlayDemo} demo
 */
export async function handlePlay(request, env, ctx, deps, demo) {
  const messages = { ...COMMON_MESSAGES, ...demo.messages };
  const fail = (status, code) => reply(status, { ok: false, code, message: messages[code] ?? messages.error });

  if (request.method !== 'POST') return fail(405, 'method');
  if (!isAllowedOrigin(request.headers.get('origin'), env)) return fail(403, 'origin');
  if (env[demo.enabledVar] !== '1') return fail(503, 'disabled');

  const read = await readJson(request);
  if (read.code) return fail(...read.code);
  const parsed = demo.parse(read.body);
  if (parsed.code) return fail(...parsed.code);
  const { input } = parsed;

  // Mock answers only ever come from a local dev server, never from a real host.
  const isMock = env.PLAY_MOCK === '1' && LOCAL_HOSTS.has(new URL(request.url).hostname);
  const needed = ['ANTHROPIC_API_KEY', 'FIT_DB', 'FIT_IP_SALT'];
  if (!isMock && needed.some((name) => !env[name])) {
    console.error(`play/${demo.id}: missing config`, needed.filter((name) => !env[name]).join(','));
    return fail(503, 'unavailable');
  }

  const prepared = demo.prepare ? demo.prepare(input) : {};
  if (prepared.early) return reply(200, { ok: true, mock: isMock, result: prepared.early });

  const store = deps.store ?? (env.FIT_DB ? d1Store(env.FIT_DB) : sharedMemoryStore());
  const limits = readLimits(env);
  const limit = runsPerVisitor(env);
  const iso = new Date(deps.now ?? Date.now()).toISOString();
  const day = iso.slice(0, 10);
  const periods = { day: `d:${day}`, month: `m:${iso.slice(0, 7)}` };
  const playPeriods = { day: `pd:${day}`, month: `pm:${iso.slice(0, 7)}` };
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';

  try {
    const visitor = await hashVisitor(env.FIT_IP_SALT ?? 'mock-salt', day, visitorKey(ip));
    if (limit < 1 || !(await store.takeVisitorRun(day, `play:${visitor}`, limit))) return fail(429, 'visitor');
    ctx.waitUntil?.(store.prune(day).catch(() => {}));

    const call = demo.build(input, prepared.context);
    const promptBytes = new TextEncoder().encode(call.system + call.user + JSON.stringify(call.schema)).length;
    const reserved = playMaxCostMicro(promptBytes, call.maxTokens);
    // Play sub-cap first, then the shared pool; a refusal by the pool hands the sub-cap reservation back.
    if (!(await store.reserve(playPeriods, reserved, readPlayCaps(env)))) return fail(429, 'budget');
    if (!(await store.reserve(periods, reserved, { day: limits.dayMicro, month: limits.monthMicro }))) {
      await store.settle(playPeriods, reserved, 0).catch(() => {});
      return fail(429, 'budget');
    }

    let response = null;
    try {
      if (isMock) {
        await (deps.sleep ?? sleep)(MOCK_DELAY_MS);
        const text = JSON.stringify(demo.mock(input, prepared.context));
        response = { stop_reason: 'end_turn', usage: { input_tokens: Math.ceil(promptBytes / 4), output_tokens: 600 }, content: [{ type: 'text', text }] };
      } else {
        const client = (deps.createClient ?? defaultClient)(env);
        // Opus 5.5: adaptive thinking is on by default; low effort keeps it short.
        // No `fallbacks`: Opus 5.5 has no server-side refusal fallback.
        response = await client.messages.create({
          model: PLAY_MODEL,
          max_tokens: call.maxTokens,
          output_config: { effort: 'low', format: { type: 'json_schema', schema: call.schema } },
          system: call.system,
          messages: [{ role: 'user', content: call.user }],
        });
      }
    } catch (apiError) {
      return fail(...apiErrorCode(apiError));
    } finally {
      // A failed call, or one with no usage, stays counted at its maximum possible cost.
      const actual = response ? playActualCostMicro(response.usage) : null;
      for (const p of [periods, playPeriods]) {
        await store.settle(p, reserved, actual ?? reserved).catch((settleError) => {
          console.error(`play/${demo.id}: settle failed, spend stays at the reserved maximum`, settleError?.constructor?.name);
        });
      }
    }

    if (response.stop_reason === 'refusal') return fail(422, 'refused');
    if (response.stop_reason === 'max_tokens') return fail(502, 'incomplete');
    try {
      const text = (response.content ?? []).filter((block) => block.type === 'text').pop()?.text;
      return reply(200, { ok: true, mock: isMock, result: demo.normalize(JSON.parse(text), input, prepared.context) });
    } catch {
      return fail(502, 'error');
    }
  } catch (storeError) {
    console.error(`play/${demo.id}: counter store failed`, storeError?.constructor?.name);
    return fail(503, 'unavailable');
  }
}
