import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Self-hosted web fonts wiring.
 *
 * We self-host subsetted woff2 for Fraunces (display) + Inter (body) to remove
 * the Google Fonts CDN from the render path and to pin metric-matched fallbacks
 * (see src/styles/fonts.css) so the LCP heading does not reflow on font swap.
 *
 * IMPORTANT: the real woff2 files are NOT committed to the repo. They must be
 * dropped into public/fonts/ with the exact filenames listed in FONT_FILES.
 * Until they are present we MUST NOT emit `@font-face { src: ... }` or
 * `<link rel="preload">` for them, otherwise the browser fetches a 404 and the
 * site falls back anyway — wasted requests. Instead we gate on file existence
 * at build time: when the files are absent the site renders entirely from the
 * metric-matched fallback faces (Georgia for Fraunces, system-ui/Segoe for
 * Inter), which is correct and shift-free.
 *
 * To activate self-hosted fonts: add the four files below to public/fonts/ and
 * rebuild. No code change required.
 */

// Above-the-fold faces that get a <link rel="preload"> when present.
export const PRELOAD_FONTS = [
  { href: '/fonts/Fraunces.var.woff2', type: 'font/woff2' },
  { href: '/fonts/Inter-roman.var.woff2', type: 'font/woff2' }
] as const;

// Every self-hosted face referenced by src/styles/fonts.css.
export const FONT_FILES = [
  'Fraunces.var.woff2',
  'Fraunces-Italic.var.woff2',
  'Inter-roman.var.woff2'
] as const;

const publicFontUrl = (name: string) => new URL(`../../public/fonts/${name}`, import.meta.url);

/**
 * True when the self-hosted woff2 files are present on disk at build time.
 * Computed once at module load (build runs in Node).
 */
export const selfHostedFontsAvailable: boolean = (() => {
  try {
    return FONT_FILES.every((f) => existsSync(fileURLToPath(publicFontUrl(f))));
  } catch {
    return false;
  }
})();
