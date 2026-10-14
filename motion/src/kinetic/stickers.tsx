// Sticker-style building blocks for kinetic illustrations: filled shapes with a
// dark outline that read over any background, no panel behind them. Drawn in a
// 250x250 viewBox centred on 0,0; every illustration takes the time in seconds.

import React from 'react';
import {Easing, interpolate, spring} from 'remotion';
import {C, FPS} from '../theme';

export const ICE = '#9fd8ff';
export const OUT = '#041417';
export const SKIN = '#e9b48f';
export const SKIN_D = '#c98d68';
export const RED = '#ff4d4d';
export const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const at = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], {...cl, easing: Easing.out(Easing.cubic)});
export const pop = (t: number, a: number, damping = 9) => (t < a ? 0 : spring({frame: (t - a) * FPS, fps: FPS, config: {damping, stiffness: 200, mass: 0.6}}));
export const bump = (t: number, a: number, dur = 0.25) => (t < a || t > a + dur ? 0 : Math.sin(((t - a) / dur) * Math.PI));
export const o = (w = 5) => ({stroke: OUT, strokeWidth: w, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const});
export const sc = (x: number, y: number, s: number) => `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

// Red "no" sign that slams on.
export const NoSign: React.FC<{x: number; y: number; r: number; p: number}> = ({x, y, r, p}) =>
  p <= 0 ? null : (
    <g transform={sc(x, y, 0.4 + 0.6 * p)} opacity={Math.min(1, p * 2)}>
      <circle cx={x} cy={y} r={r} fill="none" stroke={OUT} strokeWidth={r * 0.36} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={RED} strokeWidth={r * 0.24} />
      <line x1={x - r * 0.7} y1={y + r * 0.7} x2={x + r * 0.7} y2={y - r * 0.7} stroke={OUT} strokeWidth={r * 0.36} />
      <line x1={x - r * 0.7} y1={y + r * 0.7} x2={x + r * 0.7} y2={y - r * 0.7} stroke={RED} strokeWidth={r * 0.24} />
    </g>
  );
// Teal tick badge.
export const OkBadge: React.FC<{x: number; y: number; r: number; p: number}> = ({x, y, r, p}) =>
  p <= 0 ? null : (
    <g transform={sc(x, y, p)}>
      <circle cx={x} cy={y} r={r} fill={C.teal} {...o(5)} />
      <path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} fill="none" stroke={OUT} strokeWidth={r * 0.22} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
export const Badge: React.FC<{x: number; y: number; p: number; fill?: string; size?: number; children: string}> = ({x, y, p, fill = C.gold, size = 34, children}) => {
  if (p <= 0) return null;
  const w = children.length * size * 0.78 + size; // Montserrat Black caps are ~0.78em wide
  return (
    <g transform={sc(x, y, p)}>
      <rect x={x - w / 2} y={y - size * 0.75} width={w} height={size * 1.5} rx={size * 0.75} fill={fill} {...o(5)} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontFamily="AGPunch" fontWeight={900} fontSize={size} fill={OUT}>{children}</text>
    </g>
  );
};
export const Burst: React.FC<{x: number; y: number; t: number; a: number; color: string; r?: number}> = ({x, y, t, a, color, r = 60}) => {
  const q = at(t, a, a + 0.35);
  if (t < a || q >= 1) return null;
  return (
    <g opacity={1 - q}>
      {Array.from({length: 10}, (_, i) => {
        const ang = (i / 10) * Math.PI * 2;
        const r1 = r * (0.6 + q * 0.6);
        const r2 = r * (0.9 + q * 0.9);
        return <line key={i} x1={x + Math.cos(ang) * r1} y1={y + Math.sin(ang) * r1} x2={x + Math.cos(ang) * r2} y2={y + Math.sin(ang) * r2} stroke={color} strokeWidth={8} strokeLinecap="round" />;
      })}
    </g>
  );
};

export const MotionIcon: React.FC<{Comp: React.FC<{t: number}>; t: number; size: number; zoom?: number}> = ({Comp, t, size, zoom = 1}) => (
  <svg width={size} height={size} viewBox={`${-125 / zoom} ${-125 / zoom} ${250 / zoom} ${250 / zoom}`} style={{overflow: 'visible', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.6))'}}>
    <Comp t={t} />
  </svg>
);
