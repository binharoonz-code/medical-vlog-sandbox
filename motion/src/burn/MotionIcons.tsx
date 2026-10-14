// Full-colour animated illustrations that act out what the presenter says,
// cued to the measured word times. Sticker style: filled shapes with a dark
// outline so they read over any background, no panel behind them. Drawn in a
// 220x220 box centred on 0,0; each takes the current time in seconds.

import React from 'react';
import {Easing, interpolate, interpolateColors, spring} from 'remotion';
import {C, FPS} from '../theme';
import {IconId, T} from './kineticData';

export const ICE = '#9fd8ff';
const OUT = '#041417';
const SKIN = '#e9b48f';
const SKIN_D = '#c98d68';
const RED = '#ff4d4d';
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const at = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], {...cl, easing: Easing.out(Easing.cubic)});
const pop = (t: number, a: number, damping = 9) => (t < a ? 0 : spring({frame: (t - a) * FPS, fps: FPS, config: {damping, stiffness: 200, mass: 0.6}}));
const bump = (t: number, a: number, dur = 0.25) => (t < a || t > a + dur ? 0 : Math.sin(((t - a) / dur) * Math.PI));
const o = (w = 5) => ({stroke: OUT, strokeWidth: w, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const});
const sc = (x: number, y: number, s: number) => `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

// Red "no" sign that slams on.
const NoSign: React.FC<{x: number; y: number; r: number; p: number}> = ({x, y, r, p}) =>
  p <= 0 ? null : (
    <g transform={sc(x, y, 0.4 + 0.6 * p)} opacity={Math.min(1, p * 2)}>
      <circle cx={x} cy={y} r={r} fill="none" stroke={OUT} strokeWidth={r * 0.36} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={RED} strokeWidth={r * 0.24} />
      <line x1={x - r * 0.7} y1={y + r * 0.7} x2={x + r * 0.7} y2={y - r * 0.7} stroke={OUT} strokeWidth={r * 0.36} />
      <line x1={x - r * 0.7} y1={y + r * 0.7} x2={x + r * 0.7} y2={y - r * 0.7} stroke={RED} strokeWidth={r * 0.24} />
    </g>
  );
// Teal tick badge.
const OkBadge: React.FC<{x: number; y: number; r: number; p: number}> = ({x, y, r, p}) =>
  p <= 0 ? null : (
    <g transform={sc(x, y, p)}>
      <circle cx={x} cy={y} r={r} fill={C.teal} {...o(5)} />
      <path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} fill="none" stroke={OUT} strokeWidth={r * 0.22} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
const Badge: React.FC<{x: number; y: number; p: number; fill?: string; size?: number; children: string}> = ({x, y, p, fill = C.gold, size = 34, children}) => {
  if (p <= 0) return null;
  const w = children.length * size * 0.78 + size; // Montserrat Black caps are ~0.78em wide
  return (
    <g transform={sc(x, y, p)}>
      <rect x={x - w / 2} y={y - size * 0.75} width={w} height={size * 1.5} rx={size * 0.75} fill={fill} {...o(5)} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontFamily="AGPunch" fontWeight={900} fontSize={size} fill={OUT}>{children}</text>
    </g>
  );
};
const Burst: React.FC<{x: number; y: number; t: number; a: number; color: string; r?: number}> = ({x, y, t, a, color, r = 60}) => {
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

// ---- "First, act fast" ----
const Fast: React.FC<{t: number}> = ({t}) => {
  const p = pop(t, T(11));
  const jit = bump(t, T(12), 0.35) * 10 * Math.sin(t * 90);
  return (
    <g transform={`translate(${jit} 0)`}>
      <defs><linearGradient id="bolt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff6b8" /><stop offset="1" stopColor="#ffae2e" /></linearGradient></defs>
      {[-40, 0, 40].map((y, i) => {
        const q = at(t, T(12) + i * 0.04, T(12) + 0.3 + i * 0.04);
        return q > 0 ? <rect key={y} x={-105 + (1 - q) * 40} y={y - 6} width={60} height={12} rx={6} fill="#ffffff" opacity={0.9 * q} /> : null;
      })}
      <g transform={sc(10, 0, p)}>
        <path d="M35 -95 L-40 10 H5 L-20 95 L65 -15 H18 Z" fill="url(#bolt)" {...o(7)} />
      </g>
      <Burst x={10} y={0} t={t} a={T(12)} color={C.gold} r={80} />
    </g>
  );
};

// ---- "Open the tap" ----
const Tap: React.FC<{t: number}> = ({t}) => {
  const p = pop(t, T(13));
  const turn = at(t, T(15), T(15) + 0.25) * -40;
  const flow = at(t, T(15), T(15) + 0.35);
  return (
    <g transform={sc(0, 0, p)}>
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f8f9" /><stop offset="1" stopColor="#8fa3a8" /></linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4fb3ff" /><stop offset="0.5" stopColor="#bfe9ff" /><stop offset="1" stopColor="#4fb3ff" /></linearGradient>
      </defs>
      {flow > 0 && (
        <g>
          <rect x={30} y={10} width={30} height={90 * flow} rx={12} fill="url(#water)" opacity={0.95} />
          {[0, 1, 2].map((i) => {
            const ph = (((t - T(15)) * 2.5 + i / 3) % 1 + 1) % 1;
            return <rect key={i} x={36} y={10 + ph * 85 * flow} width={18} height={10} rx={5} fill="#ffffff" opacity={0.8 * (1 - ph)} />;
          })}
          {flow >= 1 && [0, 1, 2, 3].map((i) => {
            const ph = (((t - T(15)) * 2 + i / 4) % 1 + 1) % 1;
            const dx = (i % 2 ? 1 : -1) * (14 + ph * 40);
            return <circle key={`s${i}`} cx={45 + dx} cy={100 - Math.sin(ph * Math.PI) * 26} r={7} fill="#6cc6ff" {...o(2)} opacity={1 - ph} />;
          })}
        </g>
      )}
      <path d="M-95 -40 H15 Q60 -40 60 0 V14 H30 V2 Q30 -12 15 -12 H-95 Z" fill="url(#chrome)" {...o(6)} />
      <rect x={-100} y={-60} width={26} height={70} rx={8} fill="url(#chrome)" {...o(6)} />
      <g transform={`rotate(${turn} -30 -40)`}>
        <rect x={-38} y={-78} width={16} height={40} rx={6} fill="url(#chrome)" {...o(5)} />
        <rect x={-70} y={-92} width={80} height={20} rx={10} fill={C.teal} {...o(5)} />
      </g>
    </g>
  );
};

// ---- "not hot, not ice-cold" ----
const Thermo: React.FC<{t: number}> = ({t}) => {
  const lv = interpolate(t, [6.96, T(23), T(23) + 0.3, T(25), T(25) + 0.35, T(26) + 0.3, T(26) + 0.5], [-10, -10, -78, -78, 40, 40, -18], cl);
  const col = interpolateColors(t, [T(23), T(23) + 0.2, T(25), T(25) + 0.2, T(26) + 0.3, T(26) + 0.5], [C.teal, RED, RED, '#4fb3ff', '#4fb3ff', C.teal]);
  const flame = pop(t, T(23));
  const fl = 1 + 0.12 * Math.sin(t * 24);
  const snow = pop(t, T(25));
  return (
    <g transform="translate(-30 0)">
      <rect x={-20} y={-95} width={40} height={145} rx={20} fill="#f3f7f5" {...o(6)} />
      <rect x={-8} y={lv} width={16} height={60 - lv} rx={8} fill={col} />
      <circle cy={66} r={32} fill={col} {...o(6)} />
      {[-70, -45, -20, 5, 30].map((y) => <line key={y} x1={8} y1={y} x2={18} y2={y} stroke={OUT} strokeWidth={3} />)}
      {flame > 0 && (
        <g transform={`${sc(95, -55, flame)} translate(95 -55) scale(1 ${fl}) translate(-95 55)`}>
          <path d="M95 -110 C130 -75 125 -30 95 -18 C65 -30 60 -75 95 -110 Z" fill="#ff7a3d" {...o(5)} />
          <path d="M95 -72 C110 -55 108 -36 95 -30 C82 -36 80 -55 95 -72 Z" fill="#ffd23f" />
        </g>
      )}
      <NoSign x={95} y={-58} r={44} p={at(t, T(23) + 0.2, T(23) + 0.4)} />
      {snow > 0 && (
        <g transform={`${sc(95, 50, snow)} rotate(${t * 40} 95 50)`}>
          {[0, 60, 120].map((a) => <rect key={a} x={91} y={14} width={8} height={72} rx={4} fill="#d6f2ff" {...o(3)} transform={`rotate(${a} 95 50)`} />)}
          <circle cx={95} cy={50} r={10} fill="#ffffff" {...o(3)} />
        </g>
      )}
      <NoSign x={95} y={50} r={44} p={at(t, T(26), T(26) + 0.25)} />
      <OkBadge x={-70} y={-20} r={30} p={pop(t, T(26) + 0.35)} />
    </g>
  );
};

// ---- "Start immediately. A minute has passed? Still start." ----
const Stopwatch: React.FC<{t: number}> = ({t}) => {
  const press = (bump(t, T(27), 0.2) + bump(t, T(34), 0.2)) * 9;
  const ang = Math.max(0, t - T(27)) * 140;
  const a = ((ang % 360) * Math.PI) / 180;
  const wedge = ang % 360 > 0.5 ? `M0 12 L0 -60 A72 72 0 ${ang % 360 > 180 ? 1 : 0} 1 ${Math.sin(a) * 72} ${12 - Math.cos(a) * 72} Z` : '';
  const hit = 1 + 0.08 * (bump(t, T(27), 0.3) + bump(t, T(34), 0.3));
  return (
    <g transform={sc(0, 12, hit)}>
      <rect x={-16} y={-100 + press} width={32} height={22} rx={6} fill={C.teal} {...o(5)} />
      <rect x={-7} y={-80} width={14} height={14} fill="#c9d6d8" {...o(4)} />
      <circle cy={12} r={86} fill={C.teal} {...o(6)} />
      <circle cy={12} r={72} fill="#ffffff" {...o(4)} />
      {wedge && <path d={wedge} fill={C.teal} opacity={0.35} />}
      {Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={-56} x2={0} y2={-46} stroke={OUT} strokeWidth={4} transform={`rotate(${i * 30} 0 12)`} />)}
      <line x1={0} y1={12} x2={0} y2={-50} stroke={RED} strokeWidth={7} strokeLinecap="round" transform={`rotate(${ang} 0 12)`} />
      <circle cy={12} r={9} fill={OUT} />
      <Burst x={0} y={12} t={t} a={T(34)} color={C.teal} r={100} />
      {t >= T(30) && t < T(33) + 0.2 && <Badge x={0} y={128} p={pop(t, T(30))} size={30}>1 MIN?</Badge>}
    </g>
  );
};

// ---- "even within three hours" ----
const Clock3: React.FC<{t: number}> = ({t}) => {
  const sweep = at(t, T(39), T(41) + 0.4);
  const a = (sweep * 90 * Math.PI) / 180;
  return (
    <g transform={sc(0, 0, pop(t, 12.12))}>
      <circle r={92} fill={C.gold} {...o(6)} />
      <circle r={78} fill="#ffffff" {...o(4)} />
      {sweep > 0 && <path d={`M0 0 L0 -78 A78 78 0 0 1 ${Math.sin(a) * 78} ${-Math.cos(a) * 78} Z`} fill={C.gold} opacity={0.75} />}
      {Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={-78} x2={0} y2={i % 3 ? -68 : -60} stroke={OUT} strokeWidth={i % 3 ? 3 : 6} transform={`rotate(${i * 30})`} />)}
      <line x1={0} y1={0} x2={0} y2={-62} stroke={OUT} strokeWidth={5} strokeLinecap="round" transform={`rotate(${sweep * 360 * 3})`} />
      <line x1={0} y1={0} x2={0} y2={-44} stroke={OUT} strokeWidth={9} strokeLinecap="round" transform={`rotate(${sweep * 90})`} />
      <circle r={8} fill={OUT} />
      <Badge x={0} y={118} p={pop(t, T(40))} size={36}>3 H</Badge>
    </g>
  );
};

// ---- "No ice, even wrapped in a cloth. It can damage the skin further." ----
const NoIce: React.FC<{t: number}> = ({t}) => {
  const drop = pop(t, T(43), 8);
  const y = interpolate(drop, [0, 1], [-200, -40]);
  const wrap = at(t, T(45), T(48) + 0.1);
  const crack = at(t, T(51), T(51) + 0.4);
  const shake = bump(t, T(53), 0.3) * 8 * Math.sin(t * 80);
  return (
    <g>
      <defs>
        <linearGradient id="ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2fbff" /><stop offset="1" stopColor="#7cc8f2" /></linearGradient>
      </defs>
      {t >= T(43) && (
        <g transform={`translate(0 ${y})`}>
          <path d="M-52 -20 L0 -46 L52 -20 V32 L0 58 L-52 32 Z" fill="url(#ice)" {...o(6)} opacity={0.95} />
          <path d="M-52 -20 L0 6 L52 -20 M0 6 V58" fill="none" stroke="#5fb7e8" strokeWidth={4} />
          <path d="M-38 -14 L-14 -26 L-14 -8 Z" fill="#ffffff" opacity={0.9} />
          {wrap > 0 && (
            <path d={`M-66 -30 Q-80 ${10 * wrap} -60 ${44 * wrap} Q0 ${76 * wrap} 60 ${44 * wrap} Q80 ${10 * wrap} 66 -30 Q0 ${-4 + 20 * (1 - wrap)} -66 -30 Z`}
              fill="#f1e2c6" {...o(5)} opacity={0.97} />
          )}
          {wrap > 0.3 && <path d="M-40 20 Q0 34 40 20 M-30 38 Q0 50 30 38" fill="none" stroke="#c9b48c" strokeWidth={4} />}
        </g>
      )}
      <NoSign x={0} y={-36} r={74} p={at(t, T(48), T(48) + 0.25)} />
      {t >= T(49) && (
        <g transform={`translate(${shake} 0)`} opacity={at(t, T(49), T(49) + 0.2)}>
          <rect x={-100} y={62} width={200} height={16} rx={6} fill="#f6c7a8" {...o(4)} />
          <rect x={-100} y={78} width={200} height={18} fill="#e79a7d" {...o(4)} />
          <rect x={-100} y={96} width={200} height={16} rx={6} fill="#f6e2a1" {...o(4)} />
          {crack > 0 && (
            <g>
              <ellipse cx={0} cy={72} rx={60 * crack} ry={12 * crack} fill={RED} opacity={0.45} />
              <path d="M-10 62 L6 74 L-6 84 L10 96 L0 108" fill="none" stroke={RED} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - crack} />
            </g>
          )}
        </g>
      )}
    </g>
  );
};

// ---- "Remove nearby rings… before swelling makes them tight" ----
const Ring: React.FC<{t: number}> = ({t}) => {
  const off = at(t, 20.9, 21.35);
  const swell = at(t, T(61), T(64));
  const finger = interpolateColors(swell, [0, 1], [SKIN, '#f08a74']);
  const sparkle = 0.5 + 0.5 * Math.sin(t * 16);
  return (
    <g>
      <defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b8862b" /><stop offset="0.5" stopColor="#ffe08a" /><stop offset="1" stopColor="#b8862b" /></linearGradient></defs>
      <g transform={`translate(0 0) scale(${1 + swell * 0.32} 1)`}>
        <path d="M-30 110 V-50 a30 30 0 0 1 60 0 V110 Z" fill={finger} {...o(6)} />
        <path d="M-15 -58 a15 13 0 0 1 30 0 V-36 H-15 Z" fill="#f7d9c4" {...o(4)} />
        <line x1={-18} y1={30} x2={18} y2={30} stroke={SKIN_D} strokeWidth={4} />
      </g>
      <g transform={`translate(${off * 40} ${18 - off * 170}) rotate(${off * -25})`} opacity={1 - at(t, 21.25, 21.45)}>
        <ellipse rx={44} ry={14} fill="none" stroke={OUT} strokeWidth={20} />
        <ellipse rx={44} ry={14} fill="none" stroke="url(#gold)" strokeWidth={12} />
        <path d="M0 -36 L14 -20 L0 -4 L-14 -20 Z" fill="#e8fbff" {...o(4)} />
        <path d={`M24 -44 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z`} fill="#ffffff" opacity={sparkle} />
      </g>
      <OkBadge x={88} y={-70} r={30} p={pop(t, 21.3)} />
      {[-1, 1].map((s) => {
        const q = bump(t, T(64), 0.5);
        return q > 0 ? (
          <path key={s} d={`M${s * 110} 20 h${-s * 36} m${s * 16} -16 l${-s * 16} 16 l${s * 16} 16`} fill="none" stroke={RED} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={q} />
        ) : null;
      })}
    </g>
  );
};

// ---- "Don't force anything off, and leave stuck clothing alone" ----
const NoForce: React.FC<{t: number}> = ({t}) => {
  const pull = at(t, T(66), T(66) + 0.3);
  const tug = t > T(66) && t < T(68) + 0.2 ? Math.sin((t - T(66)) * 40) * 6 : 0;
  return (
    <g transform={sc(0, 0, pop(t, 22.83))}>
      <path d="M-105 -2 H70 Q105 -2 105 28 Q105 58 70 58 H-105 Z" fill={SKIN} {...o(6)} />
      <ellipse cx={30} cy={30} rx={16} ry={11} fill={RED} opacity={0.7} />
      <g transform={`translate(${tug} 0)`}>
        <path d="M-105 -20 H12 Q28 0 14 22 Q30 44 16 76 H-105 Z" fill="#2f8f8a" {...o(6)} />
        <path d="M-80 -20 V76 M-50 -20 V76" stroke="#257470" strokeWidth={4} />
      </g>
      {pull > 0 && (
        <g transform={`translate(${-pull * 20} 0)`} opacity={pull}>
          <path d="M-10 -62 H-80 V-80 L-112 -50 L-80 -20 V-38 H-10 Z" fill={C.gold} {...o(5)} />
        </g>
      )}
      <NoSign x={-60} y={-50} r={46} p={at(t, T(67), T(67) + 0.25)} />
    </g>
  );
};

// ---- "Keep the rest of the body warm" ----
const Warm: React.FC<{t: number}> = ({t}) => {
  const on = at(t, T(74), T(74) + 0.4);
  const boost = 1 + bump(t, T(80), 0.5) * 0.7;
  return (
    <g transform={sc(0, 0, pop(t, 26.1))}>
      <defs><radialGradient id="glow"><stop offset="0" stopColor="#ffb347" stopOpacity="0.85" /><stop offset="1" stopColor="#ffb347" stopOpacity="0" /></radialGradient></defs>
      <circle r={115 * (0.9 + 0.1 * Math.sin(t * 6)) * boost} fill="url(#glow)" opacity={on} />
      {[0, 1, 2].map((i) => {
        const ph = (((t - T(74)) * 1.3 + i / 3) % 1 + 1) % 1;
        const r = 70 + ph * 40;
        return (
          <g key={i} opacity={on * (1 - ph)} stroke={C.gold} strokeWidth={8} fill="none" strokeLinecap="round">
            <path d={`M${-r} -40 A${r + 20} ${r + 20} 0 0 0 ${-r} 70`} />
            <path d={`M${r} -40 A${r + 20} ${r + 20} 0 0 1 ${r} 70`} />
          </g>
        );
      })}
      <circle cy={-60} r={28} fill={SKIN} {...o(6)} />
      <path d="M-48 95 V5 a48 48 0 0 1 96 0 V95 Z" fill="#c0563d" {...o(6)} />
      <path d="M-40 20 H-70 V80 M40 20 H70 V80" fill="none" stroke={OUT} strokeWidth={6} strokeLinecap="round" />
      <circle cx={70} cy={60} r={14} fill={C.teal} {...o(4)} />
    </g>
  );
};

// ---- "cover the burn loosely with a clean, non-stick dressing" ----
const Dressing: React.FC<{t: number}> = ({t}) => {
  const land = pop(t, T(83), 8);
  const hover = t > T(90) ? Math.sin((t - T(90)) * 7) * 4 - 4 : 0;
  const y = interpolate(land, [0, 1], [-170, -22]) + hover;
  const rot = interpolate(land, [0, 1], [-16, 0]);
  const glint = at(t, T(89), T(89) + 0.5);
  return (
    <g transform={sc(0, 0, pop(t, 27.92))}>
      <path d="M-105 10 H65 Q105 10 105 42 Q105 74 65 74 H-105 Z" fill={SKIN} {...o(6)} />
      <ellipse cx={0} cy={36} rx={22} ry={14} fill={RED} opacity={0.75} />
      {t >= T(83) && <ellipse cx={0} cy={8} rx={60 * land} ry={6} fill={OUT} opacity={0.25} />}
      {t >= T(83) && (
        <g transform={`translate(0 ${y}) rotate(${rot})`}>
          <rect x={-66} y={-18} width={132} height={36} rx={14} fill="#ffffff" {...o(6)} />
          <rect x={-30} y={-10} width={60} height={20} rx={6} fill="#d8f6ef" {...o(3)} />
          {glint > 0 && glint < 1 && <line x1={-66 + glint * 132} y1={-18} x2={-80 + glint * 132} y2={18} stroke="#ffffff" strokeWidth={6} />}
        </g>
      )}
      {t > T(90) && [-40, 0, 40].map((x, i) => (
        <path key={x} d={`M${x} -2 v-14 m-7 7 l7 -7 l7 7`} fill="none" stroke={C.teal} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={at(t, T(90) + i * 0.06, T(91))} />
      ))}
      <Burst x={0} y={y} t={t} a={T(89)} color="#ffffff" r={90} />
    </g>
  );
};

// ---- "Deep, large, or hand and face burns" ----
const Urgent: React.FC<{t: number}> = ({t}) => {
  const r = interpolate(t, [T(93), T(93) + 0.3, T(94), T(94) + 0.3], [0, 14, 14, 34], cl);
  const ring = (a: number, base: number) => {
    if (t < a) return null;
    const ph = ((t - a) * 1.6) % 1;
    return {r: base + ph * 34, o: 1 - ph};
  };
  const hand = ring(T(96), 20);
  const face = ring(T(98), 36);
  return (
    <g transform={sc(0, 0, pop(t, 32.4))}>
      <path d="M-90 105 Q-90 18 0 18 Q70 18 82 48 L62 105 Z" fill="#2f8f8a" {...o(6)} />
      <path d="M70 52 L96 -14" stroke={OUT} strokeWidth={26} strokeLinecap="round" />
      <path d="M70 52 L96 -14" stroke={SKIN} strokeWidth={16} strokeLinecap="round" />
      <circle cx={98} cy={-30} r={20} fill={SKIN} {...o(5)} />
      <circle cy={-50} r={36} fill={SKIN} {...o(6)} />
      {r > 0 && <ellipse cx={-34} cy={60} rx={r} ry={r * 0.7} fill={RED} opacity={0.85} {...o(4)} />}
      {hand && <circle cx={98} cy={-30} r={hand.r} fill="none" stroke={RED} strokeWidth={8} opacity={hand.o} />}
      {face && <circle cy={-50} r={face.r} fill="none" stroke={RED} strokeWidth={8} opacity={face.o} />}
    </g>
  );
};

const MAP: Record<IconId, React.FC<{t: number}>> = {
  fast: Fast, tap: Tap, thermo: Thermo, stopwatch: Stopwatch, clock3: Clock3, noice: NoIce,
  ring: Ring, noforce: NoForce, warm: Warm, dressing: Dressing, urgent: Urgent,
};

export const MotionIcon: React.FC<{id: IconId; t: number; size: number}> = ({id, t, size}) => {
  const Comp = MAP[id];
  return (
    <svg width={size} height={size} viewBox="-125 -125 250 250" style={{overflow: 'visible', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.6))'}}>
      <Comp t={t} />
    </svg>
  );
};
