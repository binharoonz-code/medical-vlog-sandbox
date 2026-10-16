// Shared tokens for every AG Medical Vlog motion graphic.
// Palette continues the antibiotics R2 graphics (Codex, 8 Oct 2026) so new
// scenes sit next to the accepted look without a style jump.

export const W = 1080;
export const H = 1920;
export const FPS = 25; // matches the antibiotics R2 and solar R5 receipts

// LOCKED BRAND PALETTE (AG, 16 Oct 2026). Every film uses these with the same meaning:
//   teal  #6fe3cf  the action to take / the word being spoken / "do"
//   coral #ff8a7a  don't, danger, myth
//   gold  #ffd18b  time, warmth, numbers, key facts
//   ice   #6cc6ff  water, cold, cooling
//   alert #ff4d4d  no-signs and urgent warnings only
//   ink   #041417  outlines and text stroke
//   pale  #f3f7f5  default text and light shapes
//   bg / bgDeep / panel  dark teal backgrounds for full-screen moments
// Topic colours (sugar browns, fruit oranges…) are allowed inside illustrations only.
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
  ice: '#6cc6ff',
  alert: '#ff4d4d',
  ink: '#041417',
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
