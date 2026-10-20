// Cloudflare Pages Function: POST /api/fit. All logic lives in ../_lib/fitAgent.js.
import { handleFit } from '../_lib/fitAgent.js';

export const onRequest = (context) => handleFit(context.request, context.env, context);
