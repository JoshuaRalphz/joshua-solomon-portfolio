// Cloudflare Pages Function: POST /api/demo/clinic. Logic: ../../_lib/demo/clinic.js + guard.js.
import { handleDemo } from '../../_lib/demo/guard.js';
import { demo } from '../../_lib/demo/clinic.js';

export const onRequest = (context) => handleDemo(context.request, context.env, context, {}, demo);
