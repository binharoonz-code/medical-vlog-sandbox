// Visual bursts that fire out of a word the moment it is spoken: water drops off
// "tap", flames off "hot", ice shards off "ice", sparkles off "best", heat off
// "warm", alarm rings off "urgent"… Drawn around the word, centred on it, and
// kept within about one word-height above and below so they never reach the
// presenter's face.

import React from 'react';
import {interpolate} from 'remotion';
import {C} from '../theme';
import type {Fx} from './core';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const LIFE: Record<Fx, number> = {drops: 22, shards: 20, flames: 26, stars: 18, heat: 28, rings: 24, cracks: 16, streaks: 12, ticks: 22, squeeze: 16, stop: 18, smoke: 30, syrup: 24};
const OUT = '#041417';
// Deterministic pseudo-random in [0,1).
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const WordFx: React.FC<{fx: Fx; lf: number; size: number; color: string}> = ({fx, lf, size, color}) => {
  const life = LIFE[fx];
  if (lf < 0 || lf > life) return null;
  const p = lf / life; // 0 → 1 over the burst
  const fade = interpolate(p, [0, 0.15, 0.7, 1], [0, 1, 1, 0], clamp);
  const W = size * 5;
  const H = size * 3.2;
  const u = size / 100; // drawing unit
  const items: React.ReactNode[] = [];

  if (fx === 'drops' || fx === 'syrup') {
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI * (0.1 + 0.8 * rnd(i, 1));
      const v = (90 + 90 * rnd(i, 2)) * u;
      const x = Math.cos(a) * v * p * 1.6;
      const y = Math.sin(a) * v * p * 1.6 + 260 * u * p * p;
      const s = (10 + 8 * rnd(i, 3)) * u;
      items.push(
        <path key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`}
          d={`M0 ${-s * 1.6} C${s} ${-s * 0.2} ${s} ${s} 0 ${s} C${-s} ${s} ${-s} ${-s * 0.2} 0 ${-s * 1.6} Z`}
          fill={fx === 'syrup' ? '#8a4a1c' : '#6cc6ff'} stroke={OUT} strokeWidth={2.5 * u} />,
      );
    }
  } else if (fx === 'shards') {
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * 2 * (i / 10) + rnd(i, 1) * 0.5;
      const v = (150 + 80 * rnd(i, 2)) * u;
      const x = Math.cos(a) * v * p;
      const y = Math.sin(a) * v * p * 0.6;
      const s = (14 + 10 * rnd(i, 3)) * u;
      items.push(
        <polygon key={i} transform={`translate(${x} ${y}) rotate(${lf * 18 * (rnd(i, 4) - 0.5)})`}
          points={`0,${-s} ${s * 0.5},0 0,${s * 0.8} ${-s * 0.6},${-s * 0.1}`}
          fill="#d6f2ff" stroke="#5fb7e8" strokeWidth={2.5 * u} />,
      );
    }
  } else if (fx === 'flames') {
    for (let i = 0; i < 7; i++) {
      const x = (-130 + (260 * i) / 6 + (rnd(i, 1) - 0.5) * 20) * u;
      const rise = (40 + 60 * rnd(i, 2)) * u * p;
      const fl = 0.75 + 0.35 * Math.sin(lf * 1.3 + i * 2);
      const s = (26 + 14 * rnd(i, 3)) * u * fl;
      items.push(
        <g key={i} transform={`translate(${x} ${-48 * u - rise})`}>
          <path d={`M0 ${-s * 1.8} C${s * 0.9} ${-s * 0.6} ${s * 0.8} ${s * 0.5} 0 ${s * 0.6} C${-s * 0.8} ${s * 0.5} ${-s * 0.9} ${-s * 0.6} 0 ${-s * 1.8} Z`}
            fill="#ff7a3d" stroke={OUT} strokeWidth={2.5 * u} />
          <path d={`M0 ${-s * 0.9} C${s * 0.45} ${-s * 0.2} ${s * 0.4} ${s * 0.4} 0 ${s * 0.45} C${-s * 0.4} ${s * 0.4} ${-s * 0.45} ${-s * 0.2} 0 ${-s * 0.9} Z`} fill="#ffd23f" />
        </g>,
      );
    }
  } else if (fx === 'stars') {
    for (let i = 0; i < 8; i++) {
      const a = Math.PI * 2 * (i / 8) + 0.3;
      const r = (120 + 40 * rnd(i, 1)) * u;
      const x = Math.cos(a) * r * (0.6 + 0.4 * p);
      const y = Math.sin(a) * r * 0.55 * (0.6 + 0.4 * p);
      const s = (16 + 10 * rnd(i, 2)) * u * Math.sin(Math.min(1, p * 1.4) * Math.PI);
      items.push(
        <path key={i} transform={`translate(${x} ${y}) rotate(${lf * 6})`}
          d={`M0 ${-s} Q${s * 0.18} ${-s * 0.18} ${s} 0 Q${s * 0.18} ${s * 0.18} 0 ${s} Q${-s * 0.18} ${s * 0.18} ${-s} 0 Q${-s * 0.18} ${-s * 0.18} 0 ${-s} Z`}
          fill={color === '#ffffff' ? C.gold : color} stroke={OUT} strokeWidth={2 * u} />,
      );
    }
  } else if (fx === 'smoke') {
    for (let i = 0; i < 7; i++) {
      const x = (-150 + 50 * i + (rnd(i, 1) - 0.5) * 30) * u + Math.sin(lf * 0.25 + i) * 14 * u;
      const y = -50 * u - (60 + 70 * rnd(i, 2)) * u * p;
      const r = (22 + 18 * rnd(i, 3)) * u * (0.6 + 0.8 * p);
      items.push(<circle key={i} cx={x} cy={y} r={r} fill="#c9d2d4" stroke={OUT} strokeWidth={2 * u} opacity={0.85 * (1 - p * 0.6)} />);
    }
  } else if (fx === 'heat') {
    for (let i = 0; i < 5; i++) {
      const x = (-120 + 60 * i) * u;
      const y = -60 * u - 70 * u * p;
      const wv = 10 * u;
      items.push(
        <path key={i} d={`M${x} ${y + 40 * u} q${wv} ${-10 * u} 0 ${-20 * u} q${-wv} ${-10 * u} 0 ${-20 * u} q${wv} ${-10 * u} 0 ${-20 * u}`}
          fill="none" stroke={C.gold} strokeWidth={8 * u} strokeLinecap="round" opacity={0.9} />,
      );
    }
  } else if (fx === 'rings') {
    for (let i = 0; i < 3; i++) {
      const q = Math.max(0, p * 1.5 - i * 0.25);
      if (q <= 0 || q >= 1) continue;
      items.push(<ellipse key={i} rx={(140 + 160 * q) * u} ry={(70 + 70 * q) * u} fill="none" stroke={C.coral} strokeWidth={9 * u} opacity={1 - q} />);
    }
  } else if (fx === 'cracks') {
    for (let i = 0; i < 6; i++) {
      const a = Math.PI * 2 * (i / 6) + 0.4;
      const len = 120 * u * Math.min(1, p * 2.2);
      const pts = [0, 0.33, 0.66, 1].map((k, j) => {
        const off = (j % 2 ? 1 : -1) * 14 * u * (j ? 1 : 0);
        return `${Math.cos(a) * (70 * u + len * k) - Math.sin(a) * off},${Math.sin(a) * 0.6 * (70 * u + len * k) + Math.cos(a) * off}`;
      });
      items.push(<polyline key={i} points={pts.join(' ')} fill="none" stroke={C.coral} strokeWidth={8 * u} strokeLinejoin="round" strokeLinecap="round" />);
    }
  } else if (fx === 'streaks') {
    for (let i = 0; i < 5; i++) {
      const y = (-40 + 20 * i) * u;
      const x0 = -150 * u - 120 * u * p - rnd(i, 1) * 30 * u;
      items.push(<line key={i} x1={x0} y1={y} x2={x0 + (70 + 50 * rnd(i, 2)) * u} y2={y} stroke="#ffffff" strokeWidth={7 * u} strokeLinecap="round" opacity={0.85} />);
    }
  } else if (fx === 'ticks') {
    for (let i = 0; i < 12; i++) {
      const a = Math.PI * 2 * (i / 12) + p * 1.2;
      const on = p * 12 > i ? 1 : 0;
      items.push(
        <line key={i} x1={Math.cos(a) * 150 * u} y1={Math.sin(a) * 85 * u} x2={Math.cos(a) * 180 * u} y2={Math.sin(a) * 102 * u}
          stroke={C.gold} strokeWidth={9 * u} strokeLinecap="round" opacity={on} />,
      );
    }
  } else if (fx === 'squeeze') {
    const d = (220 - 80 * Math.min(1, p * 2)) * u;
    [-1, 1].forEach((s) =>
      items.push(
        <path key={s} d={`M${s * d} 0 h${-s * 60 * u} m${s * 26 * u} ${-24 * u} l${-s * 26 * u} ${24 * u} l${s * 26 * u} ${24 * u}`}
          fill="none" stroke={C.coral} strokeWidth={10 * u} strokeLinecap="round" strokeLinejoin="round" />,
      ),
    );
  } else if (fx === 'stop') {
    const q = Math.min(1, p * 2.5);
    const r = 120 * u * (0.6 + 0.4 * q);
    items.push(
      <g key="stop" opacity={0.95}>
        <ellipse rx={r * 1.25} ry={r * 0.75} fill="none" stroke={C.coral} strokeWidth={10 * u} />
        <line x1={-r * 0.9} y1={r * 0.55} x2={-r * 0.9 + r * 1.8 * q} y2={r * 0.55 - r * 1.1 * q} stroke={C.coral} strokeWidth={10 * u} strokeLinecap="round" />
      </g>,
    );
  }

  return (
    <svg width={W} height={H} viewBox={`${-W / 2} ${-H / 2} ${W} ${H}`}
      style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -W / 2, marginTop: -H / 2, overflow: 'visible', pointerEvents: 'none', opacity: fade, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'}}>
      {items}
    </svg>
  );
};
