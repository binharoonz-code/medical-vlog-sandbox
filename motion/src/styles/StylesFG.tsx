// Round 3 of the style picker: variations on AG's two favourites,
// F (3D + kinetic) and G (versus split). Same approved antibiotics wording only.
//   K  Split + kinetic     — G's halves with F's slamming words in each half
//   L  Diagonal swipe      — full-frame virus, diagonal wipe to bacteria, split verdict
//   M  Orbit parallax      — camera orbits the 3D models behind kinetic words
//   N  Showdown cards      — two framed cards, the antibiotic hits one, bounces off the other
//   O  Punch edit          — F with hard cuts, zoom punches and flash frames

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {C, H, W, clamp} from '../theme';
import {Bacterium, Virus} from '../antibiotics/Scenes';
import {Lights, Verdict, Word, useSpr} from './StylesAB';

const S = {virus: 0, bacteria: 60, close: 115};
const bg = `radial-gradient(circle at 50% 40%, ${C.panel} 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`;
const cam = {position: [0, 0, 13] as [number, number, number], fov: 40};

// ===================== K · Split + kinetic =====================

export const StyleSplitKinetic: React.FC = () => {
  const f = useCurrentFrame();
  const split = interpolate(f, [0, 12], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const vIn = useSpr(2, 12);
  const bIn = useSpr(S.bacteria, 12);
  const band = useSpr(S.close + 10, 12);
  return (
    <AbsoluteFill style={{background: C.bgDeep}}>
      <div style={{position: 'absolute', inset: 0, bottom: H / 2, background: 'linear-gradient(180deg,#0c3a3f,#08242a)', transform: `translateY(${(split - 1) * 300}px)`}} />
      <div style={{position: 'absolute', inset: 0, top: H / 2, background: 'linear-gradient(0deg,#3a2a10,#1a2224)', transform: `translateY(${(1 - split) * 300}px)`}} />
      <ThreeCanvas width={W} height={H} camera={cam} style={{position: 'absolute', inset: 0}}>
        <Lights />
        <group position={[0, 2.75, 0]} scale={vIn * 0.85}><Virus /></group>
        <group position={[0, -1.95, 0]} scale={bIn * (f >= S.bacteria ? 1.05 : 0.001)}><Bacterium wallFrom={S.bacteria + 24} /></group>
      </ThreeCanvas>
      <div style={{position: 'absolute', left: 0, right: 0, top: H / 2 - 4, height: 8, background: C.pale, opacity: 0.85, transform: `scaleX(${split})`}} />
      {/* top half words */}
      <Word text="FLU IS CAUSED BY A" y={700} size={58} from={10} out={S.close + 2} color={C.muted} weight={700} />
      <Word text="VIRUS" y={770} size={150} from={18} out={S.close + 2} color={C.teal} />
      {/* bottom half words */}
      <Word text="ANTIBIOTICS TREAT" y={1640} size={58} from={S.bacteria + 8} out={S.close + 2} color={C.muted} weight={700} />
      <Word text="BACTERIA" y={1710} size={150} from={S.bacteria + 16} out={S.close + 2} color={C.gold} />
      <Verdict ok x={900} y={1330} from={S.bacteria + 30} />
      <Verdict ok={false} x={900} y={420} from={S.close} />
      {f >= S.close + 10 ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: H / 2 - 90, height: 180, background: C.bgDeep, transform: `scaleY(${band})`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: `6px solid ${C.coral}`, borderBottom: `6px solid ${C.coral}`}}>
          <div style={{fontFamily: 'AGLatin', fontWeight: 800, fontSize: 60, color: C.pale, textAlign: 'center', lineHeight: 1.05}}>
            ANTIBIOTICS <span style={{color: C.coral}}>DO NOT TREAT</span>
            <br />
            FLU ITSELF
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ===================== L · Diagonal swipe =====================

export const StyleDiagonal: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = interpolate(f, [S.bacteria - 4, S.bacteria + 8], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const settle = interpolate(f, [S.close - 4, S.close + 10], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  // Bacteria panel = region x + y >= 2 - c (normalised). c: 0 → 2 covers the frame,
  // then settles back to 1, the diagonal half.
  const c = wipe * 2 - settle;
  const pc = (v: number) => `${(v * 100).toFixed(2)}%`;
  const clip = c <= 1
    ? `polygon(100% ${pc(1 - c)}, 100% 100%, ${pc(1 - c)} 100%)`
    : `polygon(${pc(2 - c)} 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${pc(2 - c)})`;
  const vIn = useSpr(0, 12);
  const bIn = useSpr(S.bacteria, 12);
  return (
    <AbsoluteFill>
      {/* virus world */}
      <AbsoluteFill style={{background: bg}}>
        <ThreeCanvas width={W} height={H} camera={cam} style={{position: 'absolute', inset: 0}}>
          <Lights />
          <group position={[-settle * 1.3, 1.6 + settle * 1.0, 0]} scale={vIn * (1.5 - settle * 0.75)}><Virus /></group>
        </ThreeCanvas>
        <Word text="FLU" y={1090} size={240} from={6} out={S.bacteria - 8} />
        <Word text="IS CAUSED BY A" y={1340} size={64} from={14} out={S.bacteria - 8} color={C.muted} weight={600} />
        <Word text="VIRUS" y={1420} size={200} from={22} out={S.bacteria - 8} color={C.teal} />
        <Verdict ok={false} x={300} y={250} from={S.close + 8} />
      </AbsoluteFill>
      {/* bacteria world */}
      <AbsoluteFill style={{background: 'linear-gradient(160deg,#4a3410,#1a2224)', clipPath: clip}}>
        <ThreeCanvas width={W} height={H} camera={cam} style={{position: 'absolute', inset: 0}}>
          <Lights />
          <group position={[settle * 1.3, 0.8 - settle * 3.3, 0]} scale={bIn * (f >= S.bacteria ? 1.5 - settle * 0.55 : 0.001)}><Bacterium wallFrom={S.bacteria + 28} /></group>
        </ThreeCanvas>
        <Word text="ANTIBIOTICS" y={1180} size={140} from={S.bacteria + 8} out={S.close - 6} color={C.gold} />
        <Word text="TREAT" y={1340} size={64} from={S.bacteria + 16} out={S.close - 6} color={C.muted} weight={600} />
        <Word text="BACTERIA" y={1420} size={180} from={S.bacteria + 24} out={S.close - 6} />
        <Verdict ok x={800} y={1720} from={S.close + 8} />
      </AbsoluteFill>
      <Word text="ANTIBIOTICS" y={820} size={110} from={S.close + 10} color={C.gold} />
      <Word text="DO NOT TREAT" y={950} size={92} from={S.close + 16} color={C.coral} />
      <Word text="FLU ITSELF" y={1060} size={140} from={S.close + 22} />
    </AbsoluteFill>
  );
};

// ===================== M · Orbit parallax =====================

export const StyleOrbit: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 150], [-0.55, 0.55]);
  const r = 13;
  const bIn = useSpr(S.bacteria, 12);
  const vIn = useSpr(0, 12);
  const drift = Math.sin(a) * 40; // words drift opposite the camera for depth
  return (
    <AbsoluteFill style={{background: bg}}>
      <ThreeCanvas width={W} height={H} camera={{position: [Math.sin(a) * r, 0.6, Math.cos(a) * r], fov: 40}} style={{position: 'absolute', inset: 0}}
        onCreated={({camera}) => camera.lookAt(0, 0.4, 0)}>
        <Lights />
        <group position={[-1.1, 3.0, -1.5]} scale={vIn * 1.15}><Virus /></group>
        <group position={[1.2, 0.9, 1.0]} scale={bIn * (f >= S.bacteria ? 0.95 : 0.001)}><Bacterium wallFrom={S.bacteria + 26} /></group>
      </ThreeCanvas>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${-drift}px)`}}>
        <Word text="FLU" y={1150} size={230} from={6} out={S.bacteria - 6} />
        <Word text="IS CAUSED BY A" y={1390} size={62} from={14} out={S.bacteria - 6} color={C.muted} weight={600} />
        <Word text="VIRUS" y={1460} size={190} from={22} out={S.bacteria - 6} color={C.teal} />
        <Word text="ANTIBIOTICS" y={1250} size={140} from={S.bacteria + 8} out={S.close - 6} color={C.gold} />
        <Word text="TREAT" y={1410} size={62} from={S.bacteria + 16} out={S.close - 6} color={C.muted} weight={600} />
        <Word text="BACTERIA" y={1480} size={170} from={S.bacteria + 24} out={S.close - 6} />
        <Word text="ANTIBIOTICS" y={1200} size={120} from={S.close + 2} color={C.gold} />
        <Word text="DO NOT TREAT" y={1340} size={96} from={S.close + 10} color={C.coral} />
        <Word text="FLU ITSELF" y={1460} size={150} from={S.close + 18} />
      </div>
    </AbsoluteFill>
  );
};

// ===================== N · Showdown cards =====================

export const StyleShowdown: React.FC = () => {
  const f = useCurrentFrame();
  const c1 = useSpr(2, 11);
  const c2 = useSpr(S.bacteria - 6, 11);
  // pill: centre → bacteria card (hit) → virus card (bounce off)
  const hit = interpolate(f, [S.bacteria + 14, S.bacteria + 30], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const pillY = f < S.close - 4 ? interpolate(hit, [0, 1], [960, 1320]) : interpolate(f, [S.close - 4, S.close + 6, S.close + 20], [1320, 640, 900], clamp);
  const pillX = f < S.close - 4 ? 540 : 540 + interpolate(f, [S.close + 6, S.close + 20], [0, 330], clamp);
  const shake = f >= S.bacteria + 30 && f < S.bacteria + 40 ? Math.sin(f * 3) * 10 : 0;
  const card = (top: number, color: string, p: number): React.CSSProperties => ({
    position: 'absolute', left: 70, right: 70, top, height: 720, borderRadius: 40, border: `6px solid ${color}`,
    background: 'rgba(255,255,255,0.03)', transform: `scale(${p})`, opacity: Math.min(1, p * 1.4),
  });
  return (
    <AbsoluteFill style={{background: bg}}>
      <div style={card(140, C.teal, c1)} />
      <div style={{...card(1040, C.gold, c2), transform: `scale(${c2}) translateX(${shake}px)`}} />
      <ThreeCanvas width={W} height={H} camera={cam} style={{position: 'absolute', inset: 0}}>
        <Lights />
        <group position={[0, 2.25, 0]} scale={c1 * 0.95}><Virus /></group>
        <group position={[-0.1 + shake / 200, -2.25, 0]} scale={c2 * (f >= S.bacteria - 6 ? 1.1 : 0.001)}><Bacterium wallFrom={S.bacteria + 30} /></group>
      </ThreeCanvas>
      <div style={{position: 'absolute', left: 110, top: 175, fontFamily: 'AGLatin', fontWeight: 800, fontSize: 52, color: C.teal, opacity: c1}}>FLU VIRUS</div>
      <div style={{position: 'absolute', left: 110, top: 1075, fontFamily: 'AGLatin', fontWeight: 800, fontSize: 52, color: C.gold, opacity: c2}}>BACTERIA</div>
      {f >= S.bacteria + 10 ? (
        <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
          <g transform={`translate(${pillX} ${pillY}) rotate(${f * 6})`}>
            <rect x={-70} y={-28} width={70} height={56} rx={28} fill={C.coral} />
            <rect x={-4} y={-28} width={74} height={56} rx={28} fill={C.pale} />
          </g>
        </svg>
      ) : null}
      <Word text="Flu is caused by a virus" y={770} size={50} from={14} weight={700} />
      <Word text="Antibiotics treat bacteria" y={1670} size={50} from={S.bacteria + 30} weight={700} color={C.gold} />
      <Verdict ok x={880} y={1220} from={S.bacteria + 32} />
      <Verdict ok={false} x={880} y={320} from={S.close + 6} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 900, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: useSpr(S.close + 16, 12)}}>
        <div style={{background: C.bgDeep, border: `4px solid ${C.coral}`, borderRadius: 999, padding: '14px 34px', fontFamily: 'AGLatin', fontWeight: 800, fontSize: 44, color: C.pale}}>
          Antibiotics <span style={{color: C.coral}}>do not treat</span> flu itself
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===================== O · Punch edit =====================

const CUTS = [0, 18, 36, 60, 78, 96, 115, 128, 140];

export const StylePunch: React.FC = () => {
  const f = useCurrentFrame();
  const last = CUTS.filter((c) => c <= f).pop() ?? 0;
  const since = f - last;
  const punch = interpolate(since, [0, 5], [1.18, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const flash = interpolate(since, [0, 2], [0.55, 0], clamp);
  const phase = f < S.bacteria ? 0 : f < S.close ? 1 : 2;
  const scene = [
    {bg: 'radial-gradient(circle at 50% 45%,#0f4a50,#04161a)', obj: 'virus'},
    {bg: 'radial-gradient(circle at 50% 45%,#4a3410,#140e05)', obj: 'bacteria'},
    {bg: '#04161a', obj: 'both'},
  ][phase];
  const words = [
    [['FLU', 0, C.pale], ['IS CAUSED BY A', 18, C.muted], ['VIRUS', 36, C.teal]],
    [['ANTIBIOTICS', 60, C.gold], ['TREAT', 78, C.muted], ['BACTERIA', 96, C.pale]],
    [['ANTIBIOTICS', 115, C.gold], ['DO NOT TREAT', 128, C.coral], ['FLU ITSELF', 140, C.pale]],
  ][phase] as [string, number, string][];
  const current = words.filter(([, at]) => at <= f).pop();
  return (
    <AbsoluteFill style={{background: scene.bg, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${punch})`}}>
        <ThreeCanvas width={W} height={H} camera={cam} style={{position: 'absolute', inset: 0}}>
          <Lights />
          {scene.obj !== 'bacteria' ? <group position={scene.obj === 'both' ? [-1.3, 3.2, 0] : [0, 1.4, 0]} scale={scene.obj === 'both' ? 0.65 : 1.6}><Virus /></group> : null}
          {scene.obj !== 'virus' ? <group position={scene.obj === 'both' ? [1.3, 3.2, 0] : [0, 1.4, 0]} scale={scene.obj === 'both' ? 0.6 : 1.6}><Bacterium wallFrom={S.bacteria + 20} /></group> : null}
        </ThreeCanvas>
        {current ? (
          <div style={{position: 'absolute', left: 40, right: 40, top: 1250, textAlign: 'center', fontFamily: 'AGLatin', fontWeight: 900, letterSpacing: -2,
            fontSize: current[0].length > 7 ? 140 : 220, color: current[2], textShadow: '0 8px 30px rgba(0,0,0,0.6)'}}>
            {current[0]}
          </div>
        ) : null}
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
};
