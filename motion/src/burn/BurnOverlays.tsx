// Burn first aid — K/L/M/N/O motion-graphic overlays for the approved R7 film.
//
// The film (AG presenter + accepted B-roll) stays untouched underneath; these
// layers add graphics at the speech cues. On-screen text uses only phrases from
// the approved 100-word burn speech (locked speech, R5 receipt: 100 words,
// 36.36 s, 165 WPM).
//
// Cue times below are ESTIMATES from word position at 165 WPM. When the film is
// available, scripts/burn-cues.mjs retimes them from the measured audio.

import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';

export type Cue = {id: string; start: number; end: number; title: string; sub?: string; ok?: boolean; icon: IconName};
type IconName = 'tap' | 'clock' | 'ice' | 'ring' | 'warm' | 'dressing' | 'alert';

const WPS = 165 / 60; // words per second
const at = (word: number) => +(word / WPS).toFixed(2); // start time of the nth word (0-based)

// Word indices (0-based) from the locked speech.
export const BURN_CUES: Cue[] = [
  {id: 'cool', start: at(15), end: at(25), title: 'Cool running water', sub: 'Twenty minutes — not hot, not ice-cold', ok: true, icon: 'tap'},
  {id: 'start', start: at(25), end: at(40), title: 'Start immediately', sub: 'Cooling can help even within three hours', ok: true, icon: 'clock'},
  {id: 'ice', start: at(40), end: at(53), title: 'No ice', sub: 'Even wrapped in a cloth', ok: false, icon: 'ice'},
  {id: 'rings', start: at(53), end: at(63), title: 'Remove nearby rings and jewellery', sub: 'Before swelling makes them tight', ok: true, icon: 'ring'},
  {id: 'fabric', start: at(63), end: at(72), title: 'Don’t force anything off', sub: 'Leave stuck clothing alone', ok: false, icon: 'ring'},
  {id: 'warm', start: at(72), end: at(79), title: 'Keep the rest of the body warm', ok: true, icon: 'warm'},
  {id: 'dressing', start: at(79), end: at(90), title: 'Cover the burn loosely', sub: 'Clean, non-stick dressing', ok: true, icon: 'dressing'},
  {id: 'assess', start: at(90), end: at(100) + 0.3, title: 'Urgent assessment', sub: 'Deep, large, or hand and face burns', icon: 'alert'},
];

export const BURN_SECONDS = 36.4;
export const BURN_FRAMES = Math.round(BURN_SECONDS * FPS);

const useCue = (cues: Cue[]) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  return {f, t, cue, local: cue ? f - Math.round(cue.start * FPS) : 0, left: cue ? Math.round(cue.end * FPS) - f : 0};
};

// Plain (non-hook) spring so it is safe after early returns.
const sp = (frame: number, damping = 11) => spring({frame, fps: FPS, config: {damping, stiffness: 170, mass: 0.7}});

// ---------- icons ----------
export const Icon: React.FC<{name: IconName; size?: number; color?: string}> = ({name, size = 120, color = C.pale}) => {
  const s = {stroke: color, strokeWidth: 7, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return (
    <svg width={size} height={size} viewBox="-60 -60 120 120">
      {name === 'tap' && (<g {...s}><path d="M-40 -20 H10 Q30 -20 30 0 V10" /><path d="M-40 -32 V-8" /><path d="M-15 -20 V-34 H5" /><path d="M30 22 q-6 10 0 16 q6 -6 0 -16" fill={C.teal} stroke={C.teal} /></g>)}
      {name === 'clock' && (<g {...s}><circle r={40} /><path d="M0 -24 V0 L18 12" /></g>)}
      {name === 'ice' && (<g {...s}><path d="M-30 -14 L0 -30 L30 -14 L30 20 L0 36 L-30 20 Z" /><path d="M-30 -14 L0 2 L30 -14 M0 2 V36" /></g>)}
      {name === 'ring' && (<g {...s}><circle cy={14} r={30} /><path d="M0 -46 L13 -31 L0 -16 L-13 -31 Z" fill={C.gold} stroke={C.gold} strokeWidth={4} /></g>)}
      {name === 'warm' && (<g {...s}><path d="M-10 -36 V14 a18 18 0 1 0 20 0 V-36 a10 10 0 0 0 -20 0 Z" /><path d="M0 -10 V20" stroke={C.coral} /></g>)}
      {name === 'dressing' && (<g {...s}><rect x={-44} y={-22} width={88} height={44} rx={14} /><rect x={-18} y={-14} width={36} height={28} rx={6} /></g>)}
      {name === 'alert' && (<g {...s}><path d="M0 -40 L44 36 H-44 Z" /><path d="M0 -12 V12" /><circle cy={24} r={3} fill={color} /></g>)}
    </svg>
  );
};

const Mark: React.FC<{ok?: boolean; size?: number; p: number}> = ({ok, size = 110, p}) => {
  if (ok === undefined) return null;
  const col = ok ? C.teal : C.coral;
  return (
    <svg width={size} height={size} viewBox="-60 -60 120 120" style={{transform: `scale(${p}) rotate(${(1 - p) * -40}deg)`}}>
      <circle r={52} fill={C.bgDeep} stroke={col} strokeWidth={8} />
      {ok ? <path d="M-24 2 L-6 20 L28 -18" stroke={col} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke={col} strokeWidth={11} strokeLinecap="round" />}
    </svg>
  );
};

const font = {fontFamily: 'AGLatin', letterSpacing: -1} as const;

// ===================== K · Split + kinetic =====================
// Lower-third kinetic band on most cues; the ice cue becomes a full DO / DON'T split.
export const BurnK: React.FC = () => {
  const {cue, local, left} = useCue(BURN_CUES);
  const p = sp(local, 10);
  const out = interpolate(left, [0, 6], [0, 1], {extrapolateRight: 'clamp'});
  if (!cue) return null;
  if (cue.id === 'ice') {
    const split = interpolate(local, [0, 10], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) * out;
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', inset: 0, bottom: '50%', background: 'linear-gradient(180deg,#0c3a3fee,#08242aee)', transform: `translateY(${(split - 1) * 100}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
          <Icon name="tap" size={220} color={C.teal} /><div style={{...font, fontSize: 92, fontWeight: 800, color: C.teal}}>COOL WATER<br /><span style={{fontSize: 56, color: C.pale}}>twenty minutes</span></div>
          <div style={{position: 'absolute', right: 70, top: 70}}><Mark ok p={sp(local - 8)} /></div>
        </div>
        <div style={{position: 'absolute', inset: 0, top: '50%', background: 'linear-gradient(0deg,#3a1414ee,#1a2224ee)', transform: `translateY(${(1 - split) * 100}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
          <Icon name="ice" size={220} color={C.coral} /><div style={{...font, fontSize: 110, fontWeight: 800, color: C.coral}}>NO ICE<br /><span style={{fontSize: 52, color: C.pale}}>even wrapped in a cloth</span></div>
          <div style={{position: 'absolute', right: 70, bottom: 70}}><Mark ok={false} p={sp(local - 14)} /></div>
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1260, padding: '34px 70px', background: 'linear-gradient(180deg,#05161acc,#05161af2)', borderTop: `6px solid ${cue.ok === false ? C.coral : cue.ok ? C.teal : C.gold}`,
        transform: `translateY(${(1 - p) * 120 + (1 - out) * 60}px)`, opacity: Math.min(1, p * 1.5) * out}}>
        <div style={{...font, fontSize: cue.title.length > 22 ? 70 : 96, fontWeight: 800, color: cue.ok === false ? C.coral : C.pale, transform: `scale(${0.7 + 0.3 * p})`, transformOrigin: 'left center'}}>{cue.title.toUpperCase()}</div>
        {cue.sub ? <div style={{...font, fontSize: 46, fontWeight: 600, color: C.gold, marginTop: 10, opacity: sp(local - 8)}}>{cue.sub}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// ===================== L · Diagonal swipe =====================
export const BurnL: React.FC = () => {
  const {cue, local, left} = useCue(BURN_CUES);
  const inP = interpolate(local, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const outP = interpolate(left, [0, 7], [0, 1], {extrapolateRight: 'clamp'});
  if (!cue) return null;
  const k = inP * outP; // 0 → hidden, 1 → panel covers lower-right triangle
  const col = cue.ok === false ? '#5a1c1c' : cue.ok ? '#0c3a3f' : '#4a3410';
  return (
    <AbsoluteFill style={{clipPath: `polygon(100% ${100 - k * 62}%, 100% 100%, ${100 - k * 120}% 100%)`}}>
      <AbsoluteFill style={{background: `linear-gradient(135deg, transparent 0%, ${col}f2 30%)`}} />
      <div style={{position: 'absolute', right: 60, bottom: 300, width: 700, textAlign: 'right'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 20, alignItems: 'center'}}>
          <Mark ok={cue.ok} p={sp(local - 6)} size={96} /><Icon name={cue.icon} size={130} />
        </div>
        <div style={{...font, fontSize: cue.title.length > 22 ? 64 : 88, fontWeight: 800, color: C.pale, lineHeight: 1.02, marginTop: 10}}>{cue.title}</div>
        {cue.sub ? <div style={{...font, fontSize: 44, fontWeight: 600, color: C.gold, marginTop: 12}}>{cue.sub}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// ===================== M · Orbit parallax (floating 3D-tilted card) =====================
export const BurnM: React.FC = () => {
  const {f, cue, local, left} = useCue(BURN_CUES);
  const p = sp(local, 13);
  const out = interpolate(left, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  if (!cue) return null;
  const tilt = Math.sin(f / 22) * 12;
  return (
    <AbsoluteFill style={{perspective: 1400}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1150, padding: '36px 44px', borderRadius: 36, background: 'rgba(8,36,42,0.82)', border: `3px solid ${C.teal}66`,
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)', transform: `rotateY(${tilt}deg) rotateX(${8 - p * 8}deg) translateZ(${(1 - p) * -300}px) translateX(${-tilt * 3}px)`, opacity: Math.min(1, p * 1.4) * out,
        display: 'flex', gap: 30, alignItems: 'center'}}>
        <div style={{transform: `translateX(${tilt * 2}px) translateZ(60px)`}}><Icon name={cue.icon} size={150} color={cue.ok === false ? C.coral : C.teal} /></div>
        <div>
          <div style={{...font, fontSize: cue.title.length > 22 ? 58 : 78, fontWeight: 800, color: C.pale, lineHeight: 1.04}}>{cue.title}</div>
          {cue.sub ? <div style={{...font, fontSize: 40, fontWeight: 600, color: C.gold, marginTop: 10}}>{cue.sub}</div> : null}
        </div>
        <div style={{position: 'absolute', right: -30, top: -40}}><Mark ok={cue.ok} p={sp(local - 10)} size={100} /></div>
      </div>
    </AbsoluteFill>
  );
};

// ===================== N · Showdown cards =====================
// Running checklist: each cue lands as a card stacked in the lower half.
export const BurnN: React.FC = () => {
  const {t, f} = useCue(BURN_CUES);
  const visible = BURN_CUES.filter((c) => t >= c.start).slice(-3);
  const allOut = interpolate(f, [BURN_FRAMES - 10, BURN_FRAMES - 2], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: allOut}}>
      {visible.map((c, i) => {
        const local = f - Math.round(c.start * FPS);
        const p = sp(local, 12);
        const slot = visible.length - 1 - i; // 0 = newest (bottom)
        const shake = local > 6 && local < 14 && c.ok === false ? Math.sin(local * 3) * 10 : 0;
        const col = c.ok === false ? C.coral : c.ok ? C.teal : C.gold;
        return (
          <div key={c.id} style={{position: 'absolute', left: 60, right: 60, top: 1500 - slot * 175, height: 155, borderRadius: 26, border: `5px solid ${col}`, background: 'rgba(5,22,26,0.88)',
            display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', transform: `translateX(${(1 - p) * 900 + shake}px) scale(${slot ? 0.92 : 1})`, opacity: slot === 2 ? 0.55 : 1}}>
            <Icon name={c.icon} size={100} color={col} />
            <div style={{flex: 1}}>
              <div style={{...font, fontSize: c.title.length > 24 ? 40 : 50, fontWeight: 800, color: C.pale}}>{c.title}</div>
              {c.sub ? <div style={{...font, fontSize: 30, fontWeight: 600, color: C.gold}}>{c.sub}</div> : null}
            </div>
            <Mark ok={c.ok} size={90} p={sp(local - 8, 9)} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ===================== O · Punch edit =====================
const PUNCH: Record<string, string> = {cool: 'COOL WATER', start: 'START NOW', ice: 'NO ICE', rings: 'RINGS OFF', fabric: 'DON’T FORCE', warm: 'KEEP WARM', dressing: 'COVER LOOSELY', assess: 'GET ASSESSED'};
export const BurnO: React.FC = () => {
  const {cue, local} = useCue(BURN_CUES);
  if (!cue || local > 45) return null; // punch for ~1.8 s at each cue, then back to the film
  const punch = interpolate(local, [0, 5], [1.35, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const flash = interpolate(local, [0, 3], [0.6, 0], {extrapolateRight: 'clamp'});
  const fade = interpolate(local, [36, 45], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const col = cue.ok === false ? C.coral : cue.ok ? C.teal : C.gold;
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, rgba(0,0,0,0.15), rgba(0,0,0,0.65))'}} />
      <div style={{position: 'absolute', left: 30, right: 30, top: 1180, textAlign: 'center', transform: `scale(${punch})`}}>
        <div style={{...font, fontSize: PUNCH[cue.id].length > 9 ? 128 : 170, fontWeight: 900, color: col, textShadow: '0 10px 40px rgba(0,0,0,0.7)'}}>{PUNCH[cue.id]}</div>
      </div>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
};

// ===================== film + overlay wrapper =====================
export const BurnFilm: React.FC<{overlay: React.FC; src?: string}> = ({overlay: Overlay, src}) => (
  <AbsoluteFill style={{background: '#0b1416'}}>
    {src ? (
      <OffthreadVideo src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    ) : (
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,#26393d,#121c1e)'}}>
        <div style={{...font, fontSize: 40, color: '#7f9a97', letterSpacing: 4}}>BURN R7 FILM PLAYS HERE</div>
      </AbsoluteFill>
    )}
    <Overlay />
  </AbsoluteFill>
);
