// "Energy" looks for the kinetic house style. Each look picks a word style, a
// camera behaviour, a takeover transition, a colour grade and a sound set.
import type {KStyle} from './Engine';

export type Look = {
  id: string;
  name: string;
  style: KStyle;
  camera: 'punch' | 'jump' | 'dolly' | 'tilt';
  transition: 'zoom' | 'glitch' | 'pop' | 'flip';
  grade?: 'neon' | 'comic';
  sfx: 'base' | 'tech' | 'cartoon' | 'jump';
  three?: boolean; // use a film's 3D takeover scenes when it has them
};

export const LOOKS: Record<string, Look> = {
  punchN: {id: 'punchN', name: 'Punch (N)', style: 'N', camera: 'punch', transition: 'zoom', sfx: 'base'},
  punchM: {id: 'punchM', name: 'Punch (M)', style: 'M', camera: 'punch', transition: 'zoom', sfx: 'base'},
  jump: {id: 'jump', name: 'Jump-cut', style: 'J', camera: 'jump', transition: 'zoom', sfx: 'jump'},
  neon: {id: 'neon', name: 'Neon glitch', style: 'G', camera: 'punch', transition: 'glitch', grade: 'neon', sfx: 'tech'},
  cinema3d: {id: 'cinema3d', name: '3D cinematic', style: 'M', camera: 'dolly', transition: 'flip', sfx: 'base', three: true},
  comic: {id: 'comic', name: 'Comic pop', style: 'C', camera: 'tilt', transition: 'pop', grade: 'comic', sfx: 'cartoon'},
};
