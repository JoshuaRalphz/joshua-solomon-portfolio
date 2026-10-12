// Every screenshot in public/work-thumbs has WebP copies at these widths next to
// the full-size PNG: name.png -> name-640.webp and name-1280.webp.
const WEBP_WIDTHS = [640, 1280];

/**
 * srcset for a /work-thumbs/*.png path. The PNG stays as `src` (fallback) and as
 * the target of any "open full-size" link.
 *
 * @param {string} pngPath
 * @returns {string}
 */
export function webpSrcSet(pngPath) {
  return WEBP_WIDTHS
    .map((width) => `${pngPath.replace(/\.png$/, `-${width}.webp`)} ${width}w`)
    .join(', ');
}
