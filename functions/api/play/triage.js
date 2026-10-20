// Cloudflare Pages Function: POST /api/play/triage. Logic: ../../_lib/play/triage.js + guard.js.
import { handlePlay } from '../../_lib/play/guard.js';
import { demo } from '../../_lib/play/triage.js';

export const onRequest = (context) => handlePlay(context.request, context.env, context, {}, demo);
