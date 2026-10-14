// Animated line-art graphics that act out what the presenter says, cued to the
// measured word times. Outline only (no filled panels), drawn in a 200x200 box
// centred on 0,0. Each takes the current time in seconds.

import React from 'react';
import {Easing, interpolate, interpolateColors, spring} from 'remotion';
import {C, FPS} from '../theme';
import {IconId, T} from './kineticData';

export const ICE = '#9fd8ff';
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const at = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], {...cl, easing: Easing.out(Easing.cubic)});
const pop = (t: number, a: number, damping = 10) => (t < a ? 0 : spring({frame: (t - a) * FPS, fps: FPS, config: {damping, stiffness: 180, mass: 0.6}}));
const bump = (t: number, a: number, dur = 0.25) => (t < a || t > a + dur ? 0 : Math.sin(((t - a) / dur) * Math.PI));
const ln = (color: string = C.pale, w = 6) => ({stroke: color, strokeWidth: w, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const});
const draw = (p: number) => ({pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p, opacity: p > 0 ? 1 : 0});

const Cross: React.FC<{x: number; y: number; r: number; p: number; w?: number}> = ({x, y, r, p, w = 10}) => (
  <g {...ln(C.coral, w)}>
    <path {...draw(Math.min(1, p * 2))} d={`M${x - r} ${y - r} L${x + r} ${y + r}`} />
    <path {...draw(Math.max(0, p * 2 - 1))} d={`M${x + r} ${y - r} L${x - r} ${y + r}`} />
  </g>
);
const Check: React.FC<{x: number; y: number; s: number; p: number}> = ({x, y, s, p}) => (
  <path {...ln(C.teal, 9)} {...draw(p)} d={`M${x - s} ${y} L${x - s * 0.3} ${y + s * 0.7} L${x + s} ${y - s * 0.8}`} />
);
const Label: React.FC<{x: number; y: number; p: number; color?: string; size?: number; children: string}> = ({x, y, p, color = C.gold, size = 30, children}) => (
  <text x={x} y={y} textAnchor="middle" fontFamily="AGPunch" fontWeight={900} fontSize={size} fill={color}
    stroke="#041417" strokeWidth={5} paintOrder="stroke" transform={`translate(${x} ${y}) scale(${p}) translate(${-x} ${-y})`}>
    {children}
  </text>
);

// ---- "First, act fast" ----
const Fast: React.FC<{t: number}> = ({t}) => {
  const b = at(t, T(11), T(11) + 0.35);
  const jit = bump(t, T(12), 0.3) * 6;
  return (
    <g transform={`translate(${jit} 0)`}>
      <path {...ln(C.gold, 8)} {...draw(b)} d="M25 -85 L-30 5 H8 L-12 85 L48 -12 H10 Z" />
      {[-30, 0, 30].map((y, i) => (
        <path key={y} {...ln(C.pale, 6)} {...draw(at(t, T(12) + i * 0.05, T(12) + 0.25 + i * 0.05))} d={`M${-95 + i * 8} ${y} H${-55 + i * 8}`} />
      ))}
    </g>
  );
};

// ---- "Open the tap" ----
const Tap: React.FC<{t: number}> = ({t}) => {
  const d = at(t, T(13), T(13) + 0.4);
  const turn = at(t, T(15), T(15) + 0.25) * -35;
  return (
    <g>
      <g {...ln()}>
        <path {...draw(d)} d="M-80 -30 H10 Q45 -30 45 5 V15" />
        <path {...draw(d)} d="M-80 -50 V-10" />
        <g transform={`rotate(${turn} -25 -30)`}><path {...draw(d)} d="M-25 -30 V-60 M-45 -60 H-5" /></g>
      </g>
      {t > T(15) && [0, 1, 2].map((i) => {
        const ph = (((t - T(15)) * 2.2 + i / 3) % 1 + 1) % 1;
        return <path key={i} d="M0 -10 q-9 14 0 20 q9 -6 0 -20" {...ln(ICE, 5)} transform={`translate(45 ${30 + ph * 70})`} opacity={1 - ph} />;
      })}
    </g>
  );
};

// ---- "not hot, not ice-cold" ----
const Thermo: React.FC<{t: number}> = ({t}) => {
  const lv = interpolate(t, [6.96, T(23), T(23) + 0.3, T(25), T(25) + 0.35, T(26) + 0.3, T(26) + 0.5], [-10, -10, -72, -72, 40, 40, -15], cl);
  const col = interpolateColors(t, [T(23), T(23) + 0.2, T(25), T(25) + 0.2, T(26) + 0.3, T(26) + 0.5], [C.pale, C.coral, C.coral, ICE, ICE, C.teal]);
  return (
    <g>
      <rect x={-16} y={-90} width={32} height={135} rx={16} {...ln()} />
      <circle cy={62} r={26} {...ln()} />
      <line x1={0} y1={58} x2={0} y2={lv} {...ln(col, 12)} />
      <circle cy={62} r={14} fill={col} />
      <g transform="translate(62 -62)">
        <path {...ln(C.coral, 5)} d="M0 -26 q20 22 0 44 q-20 -20 0 -44 M0 4 q8 8 0 14 q-8 -6 0 -14" />
      </g>
      <Cross x={62} y={-60} r={24} p={at(t, T(23) + 0.2, T(23) + 0.45)} w={8} />
      <g transform="translate(62 32)" {...ln(ICE, 5)}>
        <path d="M0 -24 V24 M-21 -12 L21 12 M-21 12 L21 -12" />
      </g>
      <Cross x={62} y={32} r={24} p={at(t, T(26), T(26) + 0.3)} w={8} />
      <Check x={-62} y={-15} s={22} p={at(t, T(26) + 0.35, T(26) + 0.6)} />
    </g>
  );
};

// ---- "Start immediately. A minute has passed? Still start." ----
const Stopwatch: React.FC<{t: number}> = ({t}) => {
  const press = (bump(t, T(27), 0.2) + bump(t, T(34), 0.2)) * 7;
  const ang = Math.max(0, t - T(27)) * 140;
  const frac = (ang % 360) / 360;
  const pulse = t > T(34) ? at(t, T(34), T(34) + 0.6) : 0;
  return (
    <g>
      <rect x={-13} y={-86 + press} width={26} height={14} rx={4} {...ln()} />
      <line x1={0} y1={-72 + press} x2={0} y2={-58} {...ln()} />
      <circle cy={10} r={68} {...ln()} />
      <circle cy={10} r={68} {...ln(C.teal, 10)} {...draw(frac)} transform="rotate(-90 0 10)" />
      {Array.from({length: 12}, (_, i) => (
        <line key={i} x1={0} y1={-46} x2={0} y2={-38} {...ln(C.muted, 4)} transform={`rotate(${i * 30} 0 10)`} />
      ))}
      <line x1={0} y1={10} x2={0} y2={-40} {...ln(C.gold, 7)} transform={`rotate(${ang} 0 10)`} />
      <circle cy={10} r={6} fill={C.gold} />
      {t > T(34) && <circle cy={10} r={68 + pulse * 45} {...ln(C.teal, 6)} opacity={1 - pulse} />}
      {t >= T(30) && t < T(33) + 0.2 && <Label x={0} y={118} p={pop(t, T(30))} size={34}>1 MIN?</Label>}
    </g>
  );
};

// ---- "even within three hours" ----
const Clock3: React.FC<{t: number}> = ({t}) => {
  const sweep = at(t, T(39), T(41) + 0.4);
  return (
    <g>
      <circle r={76} {...ln()} />
      {Array.from({length: 12}, (_, i) => (
        <line key={i} x1={0} y1={-76} x2={0} y2={i % 3 ? -66 : -58} {...ln(i % 3 ? C.muted : C.pale, 5)} transform={`rotate(${i * 30})`} />
      ))}
      <circle r={88} {...ln(C.gold, 10)} {...draw(sweep * 0.25)} transform="rotate(-90)" />
      <line x1={0} y1={0} x2={0} y2={-58} {...ln(C.pale, 5)} transform={`rotate(${sweep * 360 * 3})`} />
      <line x1={0} y1={0} x2={0} y2={-40} {...ln(C.gold, 8)} transform={`rotate(${sweep * 90})`} />
      <circle r={6} fill={C.gold} />
      <Label x={0} y={44} p={pop(t, T(40))} size={36}>3 H</Label>
    </g>
  );
};

// ---- "No ice, even wrapped in a cloth. It can damage the skin further." ----
const NoIce: React.FC<{t: number}> = ({t}) => {
  const drop = pop(t, T(43), 9);
  const y = interpolate(drop, [0, 1], [-190, -30]);
  const crack = at(t, T(51), T(51) + 0.4);
  const shake = bump(t, T(53), 0.3) * 5;
  return (
    <g>
      <g transform={`translate(0 ${y})`} opacity={t >= T(43) ? 1 : 0}>
        <path {...ln(ICE, 6)} d="M-42 -16 L0 -38 L42 -16 V26 L0 48 L-42 26 Z M-42 -16 L0 6 L42 -16 M0 6 V48" />
      </g>
      <path {...ln(C.pale, 5)} {...draw(at(t, T(45), T(48) + 0.2))} d="M-62 -78 Q-80 -30 -60 22 Q0 52 60 22 Q80 -30 62 -78" />
      <Cross x={0} y={-28} r={58} p={at(t, T(48), T(48) + 0.35)} w={11} />
      <g transform={`translate(${shake} 0)`}>
        {[56, 74, 92].map((yy, i) => (
          <path key={yy} {...ln(i === 0 ? C.coral : C.muted, 5)} {...draw(at(t, T(49) + i * 0.06, T(50) + 0.2 + i * 0.06))} d={`M-85 ${yy} Q-42 ${yy - 8} 0 ${yy} T85 ${yy}`} />
        ))}
        <path {...ln(C.coral, 6)} {...draw(crack)} d="M-12 50 L2 64 L-10 76 L6 90 L-4 100" />
      </g>
    </g>
  );
};

// ---- "Remove nearby rings… before swelling makes them tight" ----
const Ring: React.FC<{t: number}> = ({t}) => {
  const off = at(t, 20.9, 21.35);
  const swell = at(t, T(61), T(64));
  const col = interpolateColors(swell, [0, 1], [C.pale, C.coral]);
  const glow = t < 20.88 ? 0.5 + 0.5 * Math.sin(t * 14) : 0;
  return (
    <g>
      <g transform={`scale(${1 + swell * 0.3} 1)`}>
        <path {...ln(col, 6)} d="M-24 100 V-50 a24 24 0 0 1 48 0 V100" />
        <path {...ln(col, 4)} d="M-12 -56 a12 10 0 0 1 24 0 V-40 H-12 Z" />
      </g>
      <g transform={`translate(0 ${20 - off * 160})`} opacity={1 - at(t, 21.2, 21.4)}>
        <ellipse rx={34} ry={10} {...ln(C.gold, 8)} />
        <path d="M0 -26 L9 -16 L0 -6 L-9 -16 Z" {...ln(C.gold, 4)} />
        {glow > 0 && <ellipse rx={44 + glow * 8} ry={18 + glow * 4} {...ln(C.gold, 3)} opacity={glow} />}
      </g>
      <Check x={70} y={-60} s={24} p={at(t, 21.3, 21.55)} />
      {[-1, 1].map((s) => (
        <path key={s} {...ln(C.coral, 5)} opacity={bump(t, T(64), 0.45)} d={`M${s * 52} -10 q${s * 12} 20 0 40 M${s * 66} -20 q${s * 16} 30 0 60`} />
      ))}
    </g>
  );
};

// ---- "Don't force anything off, and leave stuck clothing alone" ----
const NoForce: React.FC<{t: number}> = ({t}) => {
  const tug = Math.sin(Math.max(0, t - T(66)) * 30) * 6 * (t > T(66) && t < T(68) + 0.3 ? 1 : 0);
  return (
    <g>
      <path {...ln(C.muted, 6)} d="M-95 10 H95 M-95 60 H95" />
      <g transform={`translate(${tug} 0)`}>
        <path {...ln(C.pale, 6)} d="M-95 -8 H10 Q22 10 8 30 Q24 50 12 78 H-95" />
      </g>
      <circle cx={34} cy={35} r={12} {...ln(C.coral, 4)} strokeDasharray="4 6" />
      <path {...ln(C.gold, 7)} {...draw(at(t, T(66), T(66) + 0.3))} d="M-20 -40 H-90 M-70 -56 L-90 -40 L-70 -24" />
      <Cross x={-55} y={-40} r={28} p={at(t, T(67), T(68))} w={9} />
    </g>
  );
};

// ---- "Keep the rest of the body warm" ----
const Warm: React.FC<{t: number}> = ({t}) => {
  const on = at(t, T(74), T(74) + 0.4);
  const boost = 1 + bump(t, T(80), 0.5) * 0.6;
  return (
    <g>
      <circle cy={-58} r={24} {...ln()} />
      <path {...ln()} d="M-42 80 V2 a42 42 0 0 1 84 0 V80" />
      <circle cx={30} cy={40} r={9} {...ln(C.teal, 5)} />
      {[0, 1, 2].map((i) => {
        const ph = (((t - T(74)) * 1.3 + i / 3) % 1 + 1) % 1;
        const r = 62 + ph * 40;
        return (
          <g key={i} opacity={on * (1 - ph) * boost} {...ln(C.gold, 6)}>
            <path d={`M${-r} -40 A${r + 20} ${r + 20} 0 0 0 ${-r} 70`} />
            <path d={`M${r} -40 A${r + 20} ${r + 20} 0 0 1 ${r} 70`} />
          </g>
        );
      })}
    </g>
  );
};

// ---- "cover the burn loosely with a clean, non-stick dressing" ----
const Dressing: React.FC<{t: number}> = ({t}) => {
  const land = pop(t, T(83), 8);
  const hover = t > T(90) ? Math.sin((t - T(90)) * 7) * 4 - 4 : 0;
  const y = interpolate(land, [0, 1], [-150, -12]) + hover;
  const rot = interpolate(land, [0, 1], [-14, 0]);
  const glint = at(t, T(89), T(89) + 0.5);
  return (
    <g>
      <path {...ln()} d="M-95 10 H65 Q95 10 95 35 Q95 60 65 60 H-95" />
      <circle cx={0} cy={30} r={13} {...ln(C.coral, 4)} strokeDasharray="4 5" />
      <g transform={`translate(0 ${y}) rotate(${rot})`} opacity={t >= T(83) ? 1 : 0}>
        <rect x={-50} y={-16} width={100} height={30} rx={12} {...ln(C.pale, 6)} />
        <rect x={-22} y={-9} width={44} height={16} rx={5} {...ln(C.teal, 4)} />
        {glint > 0 && glint < 1 && <line x1={-50 + glint * 100} y1={-16} x2={-62 + glint * 100} y2={14} {...ln('#ffffff', 4)} />}
      </g>
      {t > T(90) && [-30, 0, 30].map((x, i) => (
        <path key={x} {...ln(C.teal, 4)} {...draw(at(t, T(90) + i * 0.06, T(91)))} d={`M${x} 2 v4`} />
      ))}
    </g>
  );
};

// ---- "Deep, large, or hand and face burns" ----
const Urgent: React.FC<{t: number}> = ({t}) => {
  const r = interpolate(t, [T(93), T(93) + 0.3, T(94), T(94) + 0.3], [0, 10, 10, 26], cl);
  const ring = (a: number, base: number) => {
    if (t < a) return null;
    const ph = ((t - a) * 1.6) % 1;
    return {r: base + ph * 30, o: 1 - ph};
  };
  const hand = ring(T(96), 16);
  const face = ring(T(98), 32);
  return (
    <g>
      <circle cy={-52} r={30} {...ln()} />
      <path {...ln()} d="M-78 90 Q-78 12 0 12 Q60 12 70 40" />
      <path {...ln()} d="M70 40 L86 -20" />
      <circle cx={88} cy={-36} r={15} {...ln()} />
      {r > 0 && <ellipse cx={-30} cy={52} rx={r} ry={r * 0.7} {...ln(C.coral, 5)} strokeDasharray="5 5" />}
      {hand && <circle cx={88} cy={-36} r={hand.r} {...ln(C.coral, 5)} opacity={hand.o} />}
      {face && <circle cy={-52} r={face.r} {...ln(C.coral, 5)} opacity={face.o} />}
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
    <svg width={size} height={size} viewBox="-110 -110 220 220" style={{overflow: 'visible', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.7))'}}>
      <Comp t={t} />
    </svg>
  );
};
