// Burn R5 — word timings, shot map and word groups for the kinetic styles.
//
// WORDS: every spoken word of the approved 100-word speech with its measured
// start/end in seconds. Measured 14 Oct 2026 by force-aligning the locked speech
// to the Burn R5 film audio (PocketSphinx), cross-checked against ffmpeg
// silencedetect pauses. "ice-cold" and "non-stick" are two aligned words each,
// hence 102 entries.
//
// SHOTS: the film's cuts (ffmpeg scene detection, threshold 0.12) and, for each shot, the free
// area where words may sit without covering the presenter's face or the
// action in the B-roll. Icons only appear on presenter shots, in the dark
// background beside the head.
//
// GROUPS: the speech split into on-screen groups. Words are consumed in order
// and checked against WORDS, so on-screen text cannot drift from the speech.

import {Fx, Shot, Zone, parseGroups} from '../kinetic/core';
export type {Fx};

export const WORDS: [string, number, number][] = [
  ['what’s', 0.32, 0.56], ['the', 0.56, 0.64], ['best', 0.64, 0.85], ['thing', 0.85, 1.04], ['to', 1.04, 1.12],
  ['do', 1.12, 1.3], ['in', 1.3, 1.36], ['this', 1.36, 1.49], ['situation', 1.49, 2.16], ['first', 2.55, 3.09],
  ['act', 3.34, 3.58], ['fast', 3.58, 4.03], ['open', 4.35, 4.58], ['the', 4.58, 4.69], ['tap', 4.69, 5.06],
  ['cool', 5.43, 5.65], ['running', 5.65, 5.92], ['water', 5.92, 6.18], ['for', 6.18, 6.32], ['twenty', 6.32, 6.59],
  ['minutes', 6.59, 6.98], ['not', 6.98, 7.18], ['hot', 7.18, 7.64], ['not', 7.64, 7.88], ['ice', 7.88, 8.09],
  ['cold', 8.09, 8.57], ['start', 8.72, 9.01], ['immediately', 9.01, 9.64], ['a', 10.01, 10.07], ['minute', 10.07, 10.32],
  ['has', 10.32, 10.49], ['passed', 10.49, 10.93], ['still', 11.02, 11.28], ['start', 11.28, 11.72], ['cooling', 12.12, 12.4],
  ['can', 12.4, 12.56], ['help', 12.56, 12.87], ['even', 12.87, 13.11], ['within', 13.11, 13.39], ['three', 13.39, 13.63],
  ['hours', 13.63, 14.13], ['no', 14.49, 14.78], ['ice', 14.78, 15.15], ['even', 15.15, 15.44], ['wrapped', 15.44, 15.72],
  ['in', 15.72, 15.81], ['a', 15.81, 15.86], ['cloth', 15.86, 16.38], ['it', 16.69, 16.79], ['can', 16.79, 17.0],
  ['damage', 17.0, 17.41], ['the', 17.41, 17.49], ['skin', 17.49, 17.8], ['further', 17.8, 18.25], ['remove', 19.1, 19.43],
  ['nearby', 19.43, 19.81], ['rings', 19.81, 20.24], ['and', 20.24, 20.37], ['jewellery', 20.37, 20.82], ['before', 20.82, 21.11],
  ['swelling', 21.11, 21.52], ['makes', 21.52, 21.77], ['them', 21.77, 21.91], ['tight', 21.91, 22.35], ['don’t', 22.83, 23.02],
  ['force', 23.02, 23.35], ['anything', 23.35, 23.7], ['off', 23.7, 24.09], ['and', 24.22, 24.35], ['leave', 24.35, 24.61],
  ['stuck', 24.61, 24.92], ['clothing', 24.92, 25.3], ['alone', 25.3, 25.74], ['keep', 26.1, 26.32], ['the', 26.32, 26.4],
  ['rest', 26.4, 26.65], ['of', 26.65, 26.74], ['the', 26.74, 26.81], ['body', 26.81, 27.09], ['warm', 27.09, 27.41],
  ['after', 27.92, 28.18], ['cooling', 28.18, 28.66], ['cover', 28.66, 29.24], ['the', 29.24, 29.34], ['burn', 29.34, 29.62],
  ['loosely', 29.62, 30.05], ['with', 30.05, 30.21], ['a', 30.21, 30.25], ['clean', 30.25, 30.84], ['non', 30.97, 31.19],
  ['stick', 31.19, 31.47], ['dressing', 31.47, 32.01], ['deep', 32.4, 32.8], ['large', 32.97, 33.44], ['or', 33.44, 33.81],
  ['hand', 33.81, 34.14], ['and', 34.14, 34.28], ['face', 34.28, 34.58], ['burns', 34.58, 34.97], ['need', 34.97, 35.16],
  ['urgent', 35.16, 35.49], ['assessment', 35.49, 36.12],
];

export const FILM_SECONDS = 36.36;
export const FILM_FRAMES = 909;

// Presenter: face spans about x 435-780, y 255-780; black T-shirt below.
const PRESENTER: Zone = {x: 70, y: 1010, w: 940, h: 460, align: 'center', valign: 'center', max: 170};

export const SHOTS: Shot[] = [
  // woman in kitchen on the right, burned-in label at the top
  {from: 0, to: 2.12, name: 'accident', presenter: false, text: {x: 60, y: 360, w: 560, h: 560, align: 'left', valign: 'top', max: 130}},
  {from: 2.12, to: 5.48, name: 'presenter', presenter: true, text: PRESENTER},
  // tap and water centre-left, hands low: free wall on the right
  {from: 5.48, to: 6.96, name: 'tap', presenter: false, text: {x: 600, y: 380, w: 400, h: 700, align: 'right', valign: 'top', max: 130}},
  {from: 6.96, to: 14.56, name: 'presenter', presenter: true, text: PRESENTER},
  // ice tray fills the lower half, hand from the right: words on the blurred jars above
  {from: 14.56, to: 15.12, name: 'icetray', presenter: false, text: {x: 60, y: 340, w: 900, h: 360, align: 'center', valign: 'center', max: 160}},
  {from: 15.12, to: 19.48, name: 'presenter', presenter: true, text: PRESENTER},
  // fingers and ring fill the middle: words go low, on the shirt
  {from: 19.48, to: 20.88, name: 'ring', presenter: false, text: {x: 70, y: 1440, w: 940, h: 260, align: 'center', valign: 'center', max: 140}},
  {from: 20.88, to: 24.44, name: 'presenter', presenter: true, text: PRESENTER},
  // arm on the right: free blurred kitchen on the upper left
  {from: 24.44, to: 25.72, name: 'sleeve', presenter: false, text: {x: 50, y: 380, w: 400, h: 560, align: 'left', valign: 'top', max: 120}},
  {from: 25.72, to: 26.88, name: 'presenter', presenter: true, text: PRESENTER},
  // hands under the tap low, towel and woman on the right: words on the wall upper left
  {from: 26.88, to: 27.48, name: 'warm', presenter: false, text: {x: 110, y: 350, w: 460, h: 620, align: 'left', valign: 'top', max: 130}},
  {from: 27.48, to: 29.0, name: 'presenter', presenter: true, text: PRESENTER},
  // hands and dressing low-centre: words on the upper-left wall
  {from: 29.0, to: 30.08, name: 'dressing', presenter: false, text: {x: 50, y: 370, w: 560, h: 480, align: 'left', valign: 'top', max: 130}},
  {from: 30.08, to: 34.96, name: 'presenter', presenter: true, text: PRESENTER},
  // nurse and patient faces high, hands mid: words low on their clothes
  {from: 34.96, to: FILM_SECONDS + 1, name: 'assessment', presenter: false, text: {x: 70, y: 1400, w: 940, h: 300, align: 'center', valign: 'center', max: 140}},
];


// Accent markers: *word* teal, !word! coral (don't / danger), ^word^ gold (warm, time).
// A {fx} suffix makes a visual burst out of that word as it is spoken.
const GROUP_SRC = [
  'What’s|the *best*{stars}|thing to do',
  'in this|*situation?*',
  '*First,*{stars}',
  'act !fast.!{streaks}',
  'Open the|*tap.*{drops}',
  '*Cool*{drops}|running|*water*{drops}',
  'for|^twenty^|^minutes^{ticks}',
  'not !hot,!{flames}|not *ice-cold.*{shards}',
  '*Start*{stars}|immediately.{streaks}',
  'A minute{ticks}|has passed?',
  'Still|*start.*{stars}',
  '*Cooling*{drops}|can help',
  'even within|^three^ ^hours.^{ticks}',
  '!No!{stop} !ice!{shards}',
  'even wrapped|in a cloth.',
  'It can !damage!{cracks}|the skin further.',
  '*Remove*{streaks}|nearby ^rings^{stars}',
  'and|^jewellery^{stars}',
  'before swelling|makes them !tight.!{squeeze}',
  '!Don’t!{stop} force|anything off,',
  'and leave|stuck|clothing|alone.',
  'Keep the rest|of the body|^warm.^{heat}',
  'After|cooling,',
  '*Cover* the burn|loosely',
  'with a clean,{stars}|*non-stick*|dressing.',
  '!Deep,!{rings} !large,!{rings}',
  'or hand and face|burns',
  'need !urgent!{rings}|assessment.',
];

export const GROUPS = parseGroups(WORDS, GROUP_SRC, FILM_SECONDS);


// Motion-graphic beats: what each animated icon illustrates, and when.
export type IconId = 'fast' | 'tap' | 'thermo' | 'stopwatch' | 'clock3' | 'noice' | 'ring' | 'noforce' | 'warm' | 'dressing' | 'urgent';
export const ICON_BEATS: {id: IconId; from: number; to: number}[] = [
  {id: 'fast', from: 2.55, to: 4.35}, // "First, act fast"
  {id: 'tap', from: 4.35, to: 5.48}, // "Open the tap"
  {id: 'thermo', from: 6.96, to: 8.72}, // "not hot, not ice-cold"
  {id: 'stopwatch', from: 8.72, to: 12.12}, // "Start immediately… still start"
  {id: 'clock3', from: 12.12, to: 14.49}, // "even within three hours"
  {id: 'noice', from: 14.49, to: 19.1}, // "No ice… damage the skin"
  {id: 'ring', from: 19.1, to: 22.83}, // "Remove nearby rings… swelling"
  {id: 'noforce', from: 22.83, to: 26.1}, // "Don't force anything off"
  {id: 'warm', from: 26.1, to: 27.92}, // "Keep the rest of the body warm"
  {id: 'dressing', from: 27.92, to: 32.4}, // "cover the burn loosely… non-stick"
  {id: 'urgent', from: 32.4, to: FILM_SECONDS}, // "Deep, large, or hand and face burns"
];

// Times of particular spoken words, for icon animation cues.
export const T = (wordNumber: number) => WORDS[wordNumber - 1][1];
