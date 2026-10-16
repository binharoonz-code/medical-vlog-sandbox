// Hook toolkit: 3-4 second openers cut from existing films (AG, 16 Oct 2026).
// Footage segments (optionally frozen or slowed), audio snippets kept in sync
// with the picture, one-giant-word kinetic text driven by measured word times,
// and punchy overlays. Colours follow the locked palette in theme.ts.

import React from 'react';
import {AbsoluteFill, Audio, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {C, FPS} from '../theme';
import type {Words} from '../kinetic/core';

export const f = (s: number) => Math.round(s * FPS);
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const springAt = (frame: number, damping = 10, stiffness = 200, mass = 0.6) =>
  frame < 0 ? 0 : spring({frame, fps: FPS, config: {damping, stiffness, mass}});

export type Hook = {id: string; title: string; frames: number; component: React.FC};

// One stretch of film footage placed at hook time `at` (seconds).
export const Clip: React.FC<{src: string; at: number; from: number; dur: number; freeze?: boolean; rate?: number; style?: React.CSSProperties}> = ({src, at, from, dur, freeze, rate = 1, style}) => (
  <Sequence from={f(at)} durationInFrames={Math.max(1, f(dur))}>
    <AbsoluteFill style={style}>
      {freeze ? (
        <Freeze frame={0}>
          <OffthreadVideo src={staticFile(src)} startFrom={f(from)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </Freeze>
      ) : (
        <OffthreadVideo src={staticFile(src)} startFrom={f(from)} playbackRate={rate} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      )}
    </AbsoluteFill>
  </Sequence>
);

// Audio from a film, film time [from, from+dur), placed at hook time `at`.
export const Voice: React.FC<{src: string; at: number; from: number; dur: number; volume?: number}> = ({src, at, from, dur, volume = 1}) => (
  <Sequence from={f(at)} durationInFrames={f(dur)} layout="none">
    <Audio src={staticFile(src)} startFrom={f(from)} endAt={f(from + dur)} volume={volume} />
  </Sequence>
);
export const Sfx: React.FC<{name: 'whoosh' | 'hit' | 'whoosh_out' | 'riser'; at: number; volume?: number}> = ({name, at, volume = 0.22}) => (
  <Sequence from={Math.max(0, f(at))} durationInFrames={f(1.2)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

const FAMILY = 'AGPunch';
const textStyle = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FAMILY, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: -1, color,
  WebkitTextStroke: `${Math.max(4, size * 0.08)}px ${C.ink}`, paintOrder: 'stroke fill', textShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'pre',
});
const fit = (text: string, w: number, max: number) => {
  const w100 = measureText({text, fontFamily: FAMILY, fontWeight: '900', fontSize: 100, letterSpacing: '-1px'}).width;
  return Math.min(max, (w * 100) / w100);
};

// A caption block that slams in (hook time from..to), lines stacked, each its own colour.
export const Slam: React.FC<{from: number; to: number; lines: {text: string; color?: string}[]; y: number; max?: number; w?: number; tilt?: number}> = ({from, to, lines, y, max = 170, w = 940, tilt = -2}) => {
  const frame = useCurrentFrame();
  if (frame < f(from) || frame >= f(to)) return null;
  const lf = frame - f(from);
  const out = interpolate(frame, [f(to) - 4, f(to)], [1, 0], cl);
  return (
    <div style={{position: 'absolute', left: (1080 - w) / 2, width: w, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${tilt}deg)`}}>
      {lines.map((l, i) => {
        const p = springAt(lf - i * 3, 9, 240, 0.5);
        const size = fit(l.text, w, max);
        return (
          <div key={i} style={{...textStyle(size, l.color ?? C.pale), opacity: Math.min(1, p * 2) * out, transform: `scale(${(1.6 - 0.6 * p) * (0.8 + 0.2 * out)})`}}>
            {l.text}
          </div>
        );
      })}
    </div>
  );
};

// One giant spoken word at a time, from a film's measured word times.
// Film time [a, b) plays at hook time `at`. accents: word -> colour.
export const Spoken: React.FC<{words: Words; a: number; b: number; at: number; y: number; h?: number; accents?: Record<string, string>; max?: number}> = ({words, a, b, at, y, h = 300, accents = {}, max = 230}) => {
  const frame = useCurrentFrame();
  const ft = a + (frame / FPS - at);
  const toks = words.filter((w) => w[1] >= a - 0.05 && w[1] < b);
  const i = toks.findIndex((w, j) => ft >= w[1] && ft < (toks[j + 1]?.[1] ?? b + 0.4));
  if (i < 0) return null;
  const [word, start] = toks[i];
  const text = word.replace(/'/g, '’').toUpperCase();
  const lf = Math.round((ft - start) * FPS);
  const p = interpolate(lf, [0, 3], [0, 1], cl);
  const color = accents[word.toLowerCase()] ?? [C.pale, C.teal, C.gold][i % 3];
  const size = Math.min(fit(text, 900, max), h * 0.9);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{...textStyle(size, color), transform: `scale(${1.25 - 0.25 * p})`}}>{text}</div>
    </div>
  );
};

// Red no-sign that slams onto a point.
export const NoStamp: React.FC<{at: number; x: number; y: number; r: number; hold?: number}> = ({at, x, y, r, hold = 0.7}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [f(at + hold), f(at + hold) + 5], [1, 0], cl);
  const p = springAt(frame - f(at), 8, 260, 0.5) * out;
  if (p <= 0.01) return null;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${x} ${y}) scale(${0.3 + 0.7 * Math.min(p, 1.15)}) rotate(${(1 - Math.min(p, 1)) * -30})`}>
        <circle r={r} fill="none" stroke={C.ink} strokeWidth={r * 0.36} />
        <circle r={r} fill="none" stroke={C.alert} strokeWidth={r * 0.24} />
        <line x1={-r * 0.7} y1={r * 0.7} x2={r * 0.7} y2={-r * 0.7} stroke={C.ink} strokeWidth={r * 0.36} />
        <line x1={-r * 0.7} y1={r * 0.7} x2={r * 0.7} y2={-r * 0.7} stroke={C.alert} strokeWidth={r * 0.24} />
      </g>
    </svg>
  );
};

export const Flash: React.FC<{at: number; strength?: number}> = ({at, strength = 0.7}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [f(at), f(at) + 1, f(at) + 5], [0, strength, 0], cl);
  return o > 0 ? <AbsoluteFill style={{background: '#ffffff', opacity: o}} /> : null;
};

// Glitch bars + colour shift for a few frames around `at`.
export const Glitch: React.FC<{at: number; frames?: number}> = ({at, frames = 6}) => {
  const frame = useCurrentFrame();
  const lf = frame - f(at);
  if (lf < 0 || lf >= frames) return null;
  const g = 1 - lf / frames;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: 8}, (_, i) => {
        const r = Math.abs(Math.sin(frame * 12.9898 + i * 78.233) * 43758.5453) % 1;
        return <div key={i} style={{position: 'absolute', left: 0, right: 0, top: r * 1900, height: 10 + r * 60, background: i % 2 ? C.teal : C.coral, opacity: 0.6 * g, transform: `translateX(${(r - 0.5) * 360}px)`, mixBlendMode: 'screen'}} />;
      })}
    </AbsoluteFill>
  );
};

// VHS-style rewind overlay.
export const Rewind: React.FC<{from: number; to: number}> = ({from, to}) => {
  const frame = useCurrentFrame();
  if (frame < f(from) || frame >= f(to)) return null;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 3px, transparent 3px 7px)'}} />
      {Array.from({length: 5}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: ((frame * 97 + i * 397) % 1920), height: 18, background: 'rgba(255,255,255,0.35)', filter: 'blur(3px)'}} />
      ))}
      <div style={{position: 'absolute', top: 130, left: 80, ...textStyle(110, C.pale)}}>◀◀</div>
    </AbsoluteFill>
  );
};

// Wraps children in a zoom punch at `at` and a gentle push over the hook.
export const Punch: React.FC<{at: number[]; children: React.ReactNode; origin?: string}> = ({at, children, origin = '50% 35%'}) => {
  const frame = useCurrentFrame();
  const env = at.reduce((m, a) => {
    const lf = frame - f(a);
    return Math.max(m, lf < 0 || lf > 16 ? 0 : lf < 2 ? lf / 2 : Math.exp(-(lf - 2) / 4));
  }, 0);
  return (
    <AbsoluteFill style={{transform: `translate(${Math.sin(frame * 12.7) * 8 * env}px, ${Math.cos(frame * 10.3) * 6 * env}px) scale(${(1 + frame * 0.0006) * (1 + 0.14 * env)})`, transformOrigin: origin}}>
      {children}
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 42%, transparent 50%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none'}} />;
