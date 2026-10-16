// Shared data model for the kinetic house style (locked by AG, 14 Oct 2026):
// measured word timings, a shot map with free zones, word groups checked against
// the approved speech, and illustration beats.

import type React from 'react';
import {FPS} from '../theme';

export type Zone = {x: number; y: number; w: number; h: number; align: 'left' | 'center' | 'right'; valign: 'top' | 'center' | 'bottom'; max: number};
// presenter: illustrations may show on this shot (free space beside the presenter).
// focus: camera zoom origin in % of the frame (defaults: presenter face, else centre).
export type Shot = {from: number; to: number; name: string; presenter: boolean; text: Zone; focus?: [number, number]};
// A full-screen animated moment that covers the footage while the voice carries on.
// pipOnly: only used by looks with the corner bubble (keeps the presenter on screen otherwise).
export type Takeover = {id: string; from: number; to: number; text: Zone; pipOnly?: boolean};
export type Accent = 'teal' | 'coral' | 'gold' | null;
export type Fx = 'drops' | 'shards' | 'flames' | 'stars' | 'heat' | 'rings' | 'cracks' | 'streaks' | 'ticks' | 'squeeze' | 'stop' | 'smoke' | 'syrup';
export type Token = {text: string; accent: Accent; fx: Fx | null; start: number; end: number; word: number};
export type Group = {lines: Token[][]; start: number; end: number; index: number};
// box: show this illustration at this box on any shot (else presenter shots only, in Film.iconBox).
export type Beat = {id: string; from: number; to: number; box?: {x: number; y: number; size: number; zoom?: number}};
export type Words = [string, number, number][];

export type Film = {
  id: string;
  src: string; // file in public/, never committed
  seconds: number;
  frames: number;
  shots: Shot[];
  groups: Group[];
  beats: Beat[];
  icons: Record<string, React.FC<{t: number}>>;
  iconBox: {x: number; y: number; size: number; zoom?: number}; // zoom > 1 draws illustrations bigger
  takeovers?: Takeover[];
  scenes?: Record<string, React.FC<{t: number}>>; // full-frame 1080x1920 SVG content per takeover
  scenes3d?: Record<string, React.FC<{t: number}>>; // full-frame HTML/3D alternative for the 3D look
  particles3d?: React.FC<{t: number}>; // transparent full-frame 3D layer floating over the footage
  pipBubble?: {x: number; y: number; r: number}; // where the footage bubble sits during bubble-look takeovers
};

export const takeoverAt = (film: Film, t: number) => film.takeovers?.find((k) => t >= k.from && t < k.to);
export const zoneAt = (film: Film, t: number) => takeoverAt(film, t)?.text ?? shotIn(film.shots, t).text;

export const shotIn = (shots: Shot[], t: number) => shots.find((s) => t >= s.from && t < s.to) ?? shots[shots.length - 1];

const norm = (s: string) => s.toLowerCase().replace(/’/g, "'").replace(/[^a-z']/g, '');

// Group syntax: lines split by '|', words by ' '. *word* teal, !word! coral,
// ^word^ gold; a {fx} suffix fires a visual burst. Hyphenated words cover one
// spoken word per part. Every on-screen word must match the spoken word in
// order, and every spoken word must be covered, or the render fails.
export const parseGroups = (words: Words, src: string[], seconds: number): Group[] => {
  let w = 0;
  const groups: Group[] = src.map((line0, index) => {
    const lines = line0.split('|').map((line) =>
      line.split(' ').filter(Boolean).map((rawFx) => {
        const fxm = rawFx.match(/^(.*)\{(\w+)\}$/);
        const raw = fxm ? fxm[1] : rawFx;
        const fx = (fxm ? fxm[2] : null) as Fx | null;
        const m = raw.match(/^([*!^])(.*)\1$/);
        const text = m ? m[2] : raw;
        const accent: Accent = m ? ({'*': 'teal', '!': 'coral', '^': 'gold'} as const)[m[1] as '*' | '!' | '^'] : null;
        const parts = text.split('-').filter((p) => norm(p));
        const spoken = words.slice(w, w + parts.length);
        parts.forEach((p, i) => {
          if (!spoken[i] || norm(p) !== norm(spoken[i][0])) {
            throw new Error(`On-screen word "${p}" does not match spoken word ${w + i + 1} "${spoken[i]?.[0]}"`);
          }
        });
        const tok: Token = {text, accent, fx, start: spoken[0][1], end: spoken[spoken.length - 1][2], word: w};
        w += parts.length;
        return tok;
      }),
    );
    const flat = lines.flat();
    return {lines, start: flat[0].start, end: flat[flat.length - 1].end, index};
  });
  if (w !== words.length) throw new Error(`Groups cover ${w} of ${words.length} spoken words`);
  // Hold each group until the next one starts, but not through a long pause.
  groups.forEach((g, i) => {
    const next = groups[i + 1]?.start ?? seconds;
    g.end = Math.min(next, g.end + 0.55);
  });
  return groups;
};

// Start time of the nth occurrence of a spoken word, for illustration cues.
export const cueFn = (words: Words) => (word: string, nth = 1) => {
  let k = 0;
  for (const [w, s] of words) if (norm(w) === norm(word) && ++k === nth) return s;
  throw new Error(`Cue word "${word}" #${nth} not in the speech`);
};

export const frames = (s: number) => Math.round(s * FPS);
