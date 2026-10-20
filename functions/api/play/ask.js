// Cloudflare Pages Function: POST /api/play/ask. Logic: ../../_lib/play/ask.js + guard.js.
import { handlePlay } from '../../_lib/play/guard.js';
import { demo } from '../../_lib/play/ask.js';

export const onRequest = (context) => handlePlay(context.request, context.env, context, {}, demo);
