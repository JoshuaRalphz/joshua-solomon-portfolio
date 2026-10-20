// Cloudflare Pages Function: POST /api/play/busywork. Logic: ../../_lib/play/busywork.js + guard.js.
import { handlePlay } from '../../_lib/play/guard.js';
import { demo } from '../../_lib/play/busywork.js';

export const onRequest = (context) => handlePlay(context.request, context.env, context, {}, demo);
