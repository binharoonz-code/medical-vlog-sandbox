// Burn first aid (R5 review cut) as a kinetic-house-style film.
import type {Film} from '../kinetic/core';
import {FILM_FRAMES, FILM_SECONDS, GROUPS, ICON_BEATS, SHOTS} from './kineticData';
import {BURN_ICONS} from './MotionIcons';

export const BURN: Film = {
  id: 'BURN',
  src: 'burn_r5.mp4',
  seconds: FILM_SECONDS,
  frames: FILM_FRAMES,
  shots: SHOTS,
  groups: GROUPS,
  beats: ICON_BEATS,
  icons: BURN_ICONS,
  iconBox: {x: 8, y: 280, size: 420},
};
