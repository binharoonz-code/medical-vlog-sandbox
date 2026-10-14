// Kinetic house style engine (AG, 14 Oct 2026): word-by-word kinetic type plus
// animated illustrations, motion styles M, N and O, for any film.
//
// Every spoken word appears on its measured start time with its own motion.
// No colour panels sit behind the text: legibility comes from a dark outline
// and shadow. Words move to each shot's free area (Film.shots) so the
// presenter's face and the B-roll action stay clear. Illustrations act out what
// is said and only appear on presenter shots, in Film.iconBox.

import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {C, FPS} from '../theme';
import {Film, Group, Token, Zone, shotIn, takeoverAt, zoneAt} from './core';
import {MotionIcon} from './stickers';
import {WordFx} from './WordFx';

export type KStyle = 'M' | 'N' | 'O';

const FAMILY = 'AGPunch';
const WEIGHT = '900';
const LH = 1.04; // line height in em
const GAP = 0.26; // word gap in em
const ACCENT = {teal: C.teal, coral: C.coral, gold: C.gold} as const;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const sp = (frame: number, damping: number, stiffness: number, mass = 0.6) =>
  frame < 0 ? 0 : spring({frame, fps: FPS, config: {damping, stiffness, mass}});
const bumpF = (lf: number, dur: number) => (lf < 0 || lf > dur ? 0 : Math.sin((lf / dur) * Math.PI));

const tokensOf = (film: Film) => film.groups.flatMap((g) => g.lines.flat());

// ---------- layout ----------
type Line = {tokens: Token[]; size: number};
const layout = (g: Group, z: Zone): Line[] => {
  let lines = g.lines.map((tokens) => {
    const text = tokens.map((t) => t.text.toUpperCase()).join(' ');
    const w100 = measureText({text, fontFamily: FAMILY, fontWeight: WEIGHT, fontSize: 100, letterSpacing: '-1px'}).width;
    return {tokens, size: Math.min(z.max, ((z.w * 0.92) / w100) * 100)};
  });
  const total = lines.reduce((n, l) => n + l.size * LH, 0);
  if (total > z.h) lines = lines.map((l) => ({...l, size: (l.size * z.h) / total}));
  return lines;
};

const flexAlign = {left: 'flex-start', center: 'center', right: 'flex-end', top: 'flex-start', bottom: 'flex-end'} as const;

// ---------- one word ----------
const Word: React.FC<{tok: Token; size: number; style: KStyle; frame: number; k: number; exit: number}> = ({tok, size, style, frame, k, exit}) => {
  const sf = Math.round(tok.start * FPS);
  const lf = frame - sf;
  const speaking = lf >= 0 && frame <= Math.round(tok.end * FPS) + 1;
  const accent = tok.accent ? ACCENT[tok.accent] : null;
  const color = accent ?? (speaking ? C.teal : '#ffffff');
  const dir = k % 2 ? 1 : -1;
  let transform = '';
  let opacity = lf < 0 ? 0 : 1;
  let blur = 0;
  let underline = 0;

  if (style === 'M') {
    // Depth: each word flies in from behind the camera and settles into place.
    const p = sp(lf, 14, 170, 0.7);
    opacity *= interpolate(lf, [0, 3], [0, 1], clamp) * (1 - exit);
    const s = (1.8 - 0.8 * p) * (1 + exit * 0.6) * (1 + 0.07 * bumpF(lf, 8));
    blur = (1 - p) * 12 + exit * 10;
    transform = `translateY(${(1 - p) * -40 - 6 * bumpF(lf, 8)}px) rotateX(${(1 - p) * -55}deg) scale(${s})`;
  } else if (style === 'N') {
    // Showdown: words slam in from alternating sides; key words get a drawn underline.
    const p = sp(lf, 9, 230, 0.55);
    const tx = (1 - p) * dir * 480 + exit * -dir * 700;
    transform = `translateX(${tx}px) skewX(${(1 - p) * dir * -28}deg) scale(${1 + 0.08 * bumpF(lf, 7)})`;
    opacity *= 1 - exit;
    underline = accent ? sp(lf - 3, 14, 200) : 0;
  } else {
    // Punch: words hit hard, overshoot and shake.
    const p = sp(lf, 7, 300, 0.45);
    const shake = lf >= 0 && lf < 6 ? 1 - lf / 6 : 0;
    const dx = Math.sin(lf * 12.9 + k) * 14 * shake;
    const dy = Math.cos(lf * 9.7 + k) * 10 * shake;
    const s = (1.9 - 0.9 * p) * (1 - exit * 0.7) * (1 + 0.08 * bumpF(lf, 6));
    transform = `translate(${dx}px, ${dy}px) rotate(${(1 - p) * dir * 9}deg) scale(${s})`;
    opacity *= 1 - exit;
  }

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        whiteSpace: 'pre',
        fontFamily: FAMILY,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: -1,
        lineHeight: 1,
        color,
        WebkitTextStroke: `${Math.max(4, size * 0.075)}px #041417`,
        paintOrder: 'stroke fill',
        textShadow: '0 8px 26px rgba(0,0,0,0.6)',
        transform,
        opacity,
        filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        transformOrigin: '50% 60%',
      }}
    >
      {tok.text.toUpperCase()}
      {tok.fx && exit < 1 && <WordFx fx={tok.fx} lf={lf} size={size} color={color} />}
      {underline > 0 && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -size * 0.1,
            height: Math.max(6, size * 0.06),
            borderRadius: 99,
            background: accent ?? C.teal,
            boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
            transform: `scaleX(${underline})`,
            transformOrigin: dir > 0 ? 'right' : 'left',
          }}
        />
      )}
    </span>
  );
};

// ---------- word groups ----------
const Words: React.FC<{film: Film; style: KStyle}> = ({film, style}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const g = film.groups.find((x) => t >= x.start && t < x.end);
  if (!g) return null;
  const z = zoneAt(film, t);
  const lines = layout(g, z);
  const endF = Math.round(g.end * FPS);
  const exit = interpolate(frame, [endF - 4, endF], [0, 1], clamp);
  const groupTransform =
    style === 'M'
      ? `rotateY(${Math.sin(frame / 24) * 8}deg) rotateX(${Math.sin(frame / 33) * 5}deg)`
      : style === 'N'
        ? `translateY(${Math.sin(frame / 18) * 6}px) rotate(${g.index % 2 ? 2 : -2}deg)`
        : '';
  let k = 0;
  return (
    <div
      style={{
        position: 'absolute', left: z.x, top: z.y, width: z.w, height: z.h,
        display: 'flex', flexDirection: 'column', justifyContent: flexAlign[z.valign], alignItems: flexAlign[z.align],
        perspective: 1100,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: flexAlign[z.align], transform: groupTransform, transformStyle: 'preserve-3d'}}>
        {lines.map((l, li) => (
          <div key={li} style={{display: 'flex', gap: l.size * GAP, height: l.size * LH, alignItems: 'center'}}>
            {l.tokens.map((tok) => (
              <Word key={tok.word} tok={tok} size={l.size} style={style} frame={frame} k={k++} exit={exit} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- animated graphics ----------
// The illustration jumps each time an accented or bursting word is spoken.
const hitAt = (film: Film, frame: number) =>
  Math.min(1, tokensOf(film).reduce((n, tok) => (tok.fx || tok.accent ? n + bumpF(frame - Math.round(tok.start * FPS), 7) : n), 0));
const Icons: React.FC<{film: Film; style: KStyle}> = ({film, style}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const shot = shotIn(film.shots, t);
  if (!shot.presenter || takeoverAt(film, t)) return null;
  const beat = film.beats.find((b) => t >= b.from && t < b.to);
  if (!beat) return null;
  const ICON = film.iconBox;
  const lf = frame - Math.round(Math.max(beat.from, shot.from) * FPS);
  // Animate out only when the beat ends inside this shot; a cut is a hard cut.
  const endF = Math.round(beat.to * FPS);
  const exit = beat.to <= shot.to ? interpolate(frame, [endF - 4, endF], [0, 1], clamp) : 0;
  let transform = '';
  let filter: string | undefined;
  let frameDraw = 0;
  if (style === 'M') {
    const p = sp(lf, 14, 120, 0.8);
    transform = `perspective(900px) rotateY(${(1 - p) * 70 + Math.sin(frame / 20) * 12}deg) scale(${(0.4 + 0.6 * p) * (1 - exit * 0.5)})`;
    if (p < 0.97) filter = `blur(${(1 - p) * 10}px)`;
  } else if (style === 'N') {
    const p = sp(lf, 12, 160);
    transform = `perspective(900px) rotateY(${(1 - p) * 90 + exit * -90}deg)`;
    frameDraw = interpolate(lf, [2, 12], [0, 1], clamp);
  } else {
    const p = sp(lf, 7, 300, 0.45);
    const shake = lf >= 0 && lf < 6 ? 1 - lf / 6 : 0;
    transform = `translate(${Math.sin(lf * 11) * 12 * shake}px, 0) scale(${(1.6 - 0.6 * p) * (1 - exit * 0.7)})`;
  }
  return (
    <div style={{position: 'absolute', left: ICON.x, top: ICON.y, width: ICON.size, height: ICON.size, transform: `${transform} scale(${1 + 0.1 * hitAt(film, frame)})`, filter, opacity: 1 - exit}}>
      {style === 'N' && (
        <svg width={ICON.size} height={ICON.size} style={{position: 'absolute', inset: 0}}>
          <rect x={6} y={6} width={ICON.size - 12} height={ICON.size - 12} rx={40} fill="none" stroke={C.teal} strokeWidth={4}
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - frameDraw} opacity={0.85} />
        </svg>
      )}
      <MotionIcon Comp={film.icons[beat.id]} t={t} size={ICON.size} zoom={ICON.zoom} />
    </div>
  );
};

// ---------- camera, takeovers, sound (the "energy" layer) ----------
// Punch envelope: up in 2 frames, settles over ~12.
const punchEnv = (lf: number) => (lf < 0 || lf > 16 ? 0 : lf < 2 ? lf / 2 : Math.exp(-(lf - 2) / 4));
const camera = (film: Film, frame: number) => {
  const t = frame / FPS;
  const shot = shotIn(film.shots, t);
  const prog = Math.min(1, Math.max(0, (t - shot.from) / Math.max(0.5, shot.to - shot.from)));
  const env = tokensOf(film).reduce((m, tok) => (tok.accent ? Math.max(m, punchEnv(frame - Math.round(tok.start * FPS))) : m), 0);
  const scale = (1 + 0.05 * prog) * (1 + 0.12 * env);
  const [fx, fy] = shot.focus ?? (shot.presenter ? [50, 28] : [50, 50]);
  return {transform: `translate(${Math.sin(frame * 12.7) * 7 * env}px, ${Math.cos(frame * 10.3) * 5 * env}px) scale(${scale})`, transformOrigin: `${fx}% ${fy}%`};
};

const Takeover: React.FC<{film: Film}> = ({film}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const k = takeoverAt(film, t);
  const Scene = k && film.scenes?.[k.id];
  if (!k || !Scene) return null;
  const a = Math.round(k.from * FPS), b = Math.round(k.to * FPS);
  const inP = interpolate(frame, [a, a + 6], [0, 1], clamp);
  const outP = interpolate(frame, [b - 5, b], [0, 1], clamp);
  const flash = interpolate(frame, [a, a + 1, a + 4], [0, 0.55, 0], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: inP * (1 - outP), transform: `scale(${(1.25 - 0.25 * inP) * (1 - 0.08 * outP)})`, filter: inP < 1 ? `blur(${(1 - inP) * 14}px)` : undefined}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920"><Scene t={t} /></svg>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#ffffff', opacity: flash}} />
    </AbsoluteFill>
  );
};

type Cue = {at: number; src: string; volume: number};
export const sfxCues = (film: Film): Cue[] => {
  const cues: Cue[] = [];
  let n = 0;
  for (const tok of tokensOf(film)) {
    if (tok.fx) cues.push({at: tok.start, src: n++ % 2 ? 'pop2' : 'pop', volume: 0.32});
    else if (tok.accent) cues.push({at: tok.start, src: 'tick', volume: 0.5});
  }
  for (const k of film.takeovers ?? []) {
    cues.push({at: k.from - 0.2, src: 'whoosh', volume: 0.4});
    cues.push({at: k.from, src: 'hit', volume: 0.45});
    cues.push({at: k.to - 0.3, src: 'whoosh_out', volume: 0.3});
  }
  for (const sh of film.shots.slice(1)) {
    if (!(film.takeovers ?? []).some((k) => Math.abs(k.from - sh.from) < 0.4 || Math.abs(k.to - sh.from) < 0.4)) cues.push({at: sh.from - 0.12, src: 'whoosh', volume: 0.18});
  }
  return cues.filter((c) => c.at >= 0 && c.at < film.seconds);
};
const Sfx: React.FC<{film: Film}> = ({film}) => (
  <>
    {sfxCues(film).map((c, i) => (
      <Sequence key={i} from={Math.round(c.at * FPS)} durationInFrames={Math.round(FPS * 1.2)} layout="none">
        <Audio src={staticFile(`sfx/${c.src}.wav`)} volume={c.volume} />
      </Sequence>
    ))}
  </>
);

// ---------- film + layers ----------
const filmPunch = (film: Film, frame: number) =>
  tokensOf(film).reduce((n, tok) => (tok.accent ? n + bumpF(frame - Math.round(tok.start * FPS), 8) : n), 0);
const flash = (film: Film, frame: number) =>
  tokensOf(film).some((tok) => tok.accent && frame - Math.round(tok.start * FPS) >= 0 && frame - Math.round(tok.start * FPS) < 2) ? 0.12 : 0;

// energy: camera punch-ins and slow pushes, full-screen takeovers, sound effects.
export const KineticFilm: React.FC<{film: Film; style: KStyle; src?: string; energy?: boolean}> = ({film, style, src, energy}) => {
  const frame = useCurrentFrame();
  const punch = style === 'O' ? Math.min(1, filmPunch(film, frame)) : 0;
  const cam = energy ? camera(film, frame) : {transform: `scale(${1 + punch * 0.05})`};
  return (
    <AbsoluteFill style={{background: '#0b1416', overflow: 'hidden'}}>
      <AbsoluteFill style={cam}>
        {src ? (
          <OffthreadVideo src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, #2a3a3d, #0b1416 70%)'}} />
        )}
      </AbsoluteFill>
      {energy && <Takeover film={film} />}
      <Icons film={film} style={style} />
      <Words film={film} style={style} />
      {energy && <Sfx film={film} />}
      {style === 'O' && <AbsoluteFill style={{background: '#ffffff', opacity: flash(film, frame), pointerEvents: 'none'}} />}
    </AbsoluteFill>
  );
};
