// Shared tokens for every AG Medical Vlog motion graphic.
// Palette continues the antibiotics R2 graphics (Codex, 8 Oct 2026) so new
// scenes sit next to the accepted look without a style jump.

export const W = 1080;
export const H = 1920;
export const FPS = 25; // matches the antibiotics R2 and solar R5 receipts

export const C = {
  bg: '#08242a',
  bgDeep: '#051a1e',
  panel: '#0d3238',
  line: '#335c63',
  pale: '#f3f7f5',
  muted: '#b3ccc9',
  teal: '#6fe3cf',
  gold: '#ffd18b',
  coral: '#ff8a7a',
  // food colours used by the sugar/fruit explainers
  whiteSugar: '#f4f1ea',
  brownSugar: '#9a6534',
  molasses: '#3b200f',
  orange: '#ff9f2e',
  pith: '#ffe2b0',
} as const;

// Latin glyphs come from the Latin subset, Arabic glyphs fall through to the
// Arabic subset of the same typeface (IBM Plex Sans Arabic, SIL OFL).
export const FONT = 'AGLatin, AGArabic, sans-serif';

// Keep text clear of TikTok/Reels/Shorts UI: caption + buttons at the bottom,
// account/search chrome at the top, action rail on the right.
export const SAFE = {top: 200, bottom: 420, left: 80, right: 140} as const;

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const sec = (s: number) => Math.round(s * FPS);
