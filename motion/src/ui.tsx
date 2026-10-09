import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, SAFE, clamp} from './theme';

export const Stage: React.FC<{children: React.ReactNode; transparent?: boolean}> = ({children, transparent}) => (
  <AbsoluteFill
    style={{
      backgroundColor: transparent ? 'transparent' : C.bg,
      backgroundImage: transparent
        ? undefined
        : `radial-gradient(circle at 50% 38%, ${C.panel} 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`,
      color: C.pale,
      fontFamily: FONT,
    }}
  >
    {children}
  </AbsoluteFill>
);

// Fade + rise between two frames. Optional fade-out window.
export const useReveal = (from: number, dur = 10, out?: [number, number]) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const outP = out ? interpolate(f, out, [1, 0], clamp) : 1;
  return {opacity: inP * outP, transform: `translateY(${(1 - inP) * 28}px)`};
};

export const usePop = (from: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - from, fps, config: {damping: 13, stiffness: 160, mass: 0.7}});
};

type TextProps = {
  y: number;
  size: number;
  from: number;
  out?: [number, number];
  color?: string;
  weight?: number;
  children: React.ReactNode;
  dir?: 'ltr' | 'rtl';
  lineHeight?: number;
};

// Centred text block positioned by its top edge, kept inside the side safe area.
export const Text: React.FC<TextProps> = ({y, size, from, out, color = C.pale, weight = 650, children, dir, lineHeight = 1.12}) => {
  const style = useReveal(from, 10, out);
  return (
    <div
      dir={dir}
      style={{
        position: 'absolute',
        top: y,
        left: SAFE.left,
        right: SAFE.left,
        textAlign: 'center',
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        color,
        letterSpacing: dir === 'rtl' ? 0 : -0.5,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Small honest disclosure line (e.g. "illustration, not to scale").
export const Note: React.FC<{children: React.ReactNode; y?: number; from?: number}> = ({children, y = 1440, from = 0}) => (
  <Text y={y} size={30} from={from} color={C.muted} weight={400}>
    {children}
  </Text>
);

// Stamp label that springs in (e.g. "ADDED SUGAR").
export const Stamp: React.FC<{x: number; y: number; from: number; color?: string; children: React.ReactNode; size?: number; rotate?: number}> = ({
  x,
  y,
  from,
  color = C.gold,
  children,
  size = 44,
  rotate = -4,
}) => {
  const p = usePop(from);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${p}) rotate(${rotate}deg)`,
        opacity: Math.min(1, p * 1.4),
        border: `5px solid ${color}`,
        color,
        borderRadius: 14,
        padding: '10px 22px',
        fontSize: size,
        fontWeight: 700,
        letterSpacing: 2,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  );
};
