// Round 2 of the style picker: variations on AG's two favourites,
// A (R2 teal 3D) and B (kinetic type). Same approved antibiotics wording only.
//   F  3D + kinetic hybrid     — big words slam over the 3D models
//   G  Versus split            — virus vs bacterium halves, ✓ / ✗ verdict
//   H  Cinematic 3D push-in    — camera moves through the scene, quiet captions
//   I  Kinetic captions        — word-by-word captions over the presenter area
//   J  Colour-block wipes      — kinetic words on sliding brand-colour panels
// Timings are illustrative (no narration recorded for these samples).

import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {C, H, W, clamp} from '../theme';
import {Bacterium, Virus} from '../antibiotics/Scenes';

const S = {virus: 0, bacteria: 60, close: 115};
const bg = `radial-gradient(circle at 50% 40%, ${C.panel} 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`;

const useSpr = (from: number, damping = 11) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - from, fps, config: {damping, stiffness: 170, mass: 0.7}});
};

const Word: React.FC<{text: string; y: number; size: number; from: number; out?: number; color?: string; weight?: number}> = ({
  text, y, size, from, out = 9999, color = C.pale, weight = 800,
}) => {
  const f = useCurrentFrame();
  const p = useSpr(from, 10);
  const leave = interpolate(f, [out, out + 8], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  if (f < from) return null;
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: y, textAlign: 'center', fontFamily: 'AGLatin', fontSize: size, fontWeight: weight, color, letterSpacing: -2, lineHeight: 1,
      textShadow: '0 6px 30px rgba(0,0,0,0.55)', transform: `translateY(${-leave * 240}px) scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 1.5) * (1 - leave)}}>
      {text}
    </div>
  );
};

const Lights: React.FC = () => (
  <>
    <ambientLight intensity={1.05} />
    <directionalLight position={[-3, 5, 6]} intensity={2.5} color="#dfefec" />
    <pointLight position={[4, 1, 3]} intensity={40} color="#e7c686" />
  </>
);

// ===================== F · 3D + kinetic hybrid =====================

export const StyleHybrid: React.FC = () => {
  const f = useCurrentFrame();
  const vIn = useSpr(0, 13);
  const toCorner = interpolate(f, [S.bacteria - 4, S.bacteria + 12], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const bIn = useSpr(S.bacteria + 4, 13);
  const shrink = interpolate(f, [S.close - 4, S.close + 10], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const vx = interpolate(toCorner, [0, 1], [0, -1.35]);
  const vy = interpolate(toCorner, [0, 1], [1.55, 3.05]);
  const vs = vIn * interpolate(toCorner, [0, 1], [1.55, 0.62]);
  return (
    <AbsoluteFill style={{background: bg}}>
      <ThreeCanvas width={W} height={H} camera={{position: [0, 0, 13], fov: 40}} style={{position: 'absolute', inset: 0}}>
        <Lights />
        <group position={[vx, vy, 0]} scale={vs}><Virus /></group>
        <group position={[interpolate(shrink, [0, 1], [0.2, 1.25]), interpolate(shrink, [0, 1], [1.5, 3.05]), 0]} scale={bIn * (f >= S.bacteria ? 1.35 : 0.001) * (1 - shrink * 0.5)}>
          <Bacterium wallFrom={S.bacteria + 30} />
        </group>
      </ThreeCanvas>
      <Word text="FLU" y={1090} size={240} from={6} out={S.bacteria - 6} />
      <Word text="IS CAUSED BY A" y={1340} size={64} from={16} out={S.bacteria - 6} color={C.muted} weight={600} />
      <Word text="VIRUS" y={1420} size={200} from={24} out={S.bacteria - 6} color={C.teal} />
      <Word text="ANTIBIOTICS" y={1180} size={140} from={S.bacteria + 8} out={S.close - 6} color={C.gold} />
      <Word text="TREAT" y={1340} size={64} from={S.bacteria + 18} out={S.close - 6} color={C.muted} weight={600} />
      <Word text="BACTERIA" y={1420} size={180} from={S.bacteria + 26} out={S.close - 6} />
      <Word text="ANTIBIOTICS" y={980} size={130} from={S.close + 2} color={C.gold} />
      <Word text="DO NOT TREAT" y={1130} size={110} from={S.close + 10} color={C.coral} />
      <Word text="FLU ITSELF" y={1270} size={170} from={S.close + 18} />
    </AbsoluteFill>
  );
};

// ===================== G · Versus split =====================

const Verdict: React.FC<{ok: boolean; x: number; y: number; from: number}> = ({ok, x, y, from}) => {
  const p = useSpr(from, 9);
  const col = ok ? C.teal : C.coral;
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${x} ${y}) scale(${p}) rotate(${(1 - p) * -40})`} opacity={Math.min(1, p * 1.5)}>
        <circle r={78} fill={C.bgDeep} stroke={col} strokeWidth={10} />
        {ok ? <path d="M-34 2 L-8 28 L38 -26" stroke={col} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            : <path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke={col} strokeWidth={14} strokeLinecap="round" />}
      </g>
    </svg>
  );
};

export const StyleVersus: React.FC = () => {
  const f = useCurrentFrame();
  const split = interpolate(f, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const vs = useSpr(10, 8);
  const bIn = useSpr(S.bacteria, 12);
  return (
    <AbsoluteFill style={{background: C.bgDeep}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: H / 2, background: `linear-gradient(180deg, #0c3a3f, ${C.bg})`, transform: `translateY(${(split - 1) * 300}px)`}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: H / 2, background: `linear-gradient(0deg, #3a2a10, #1a2224)`, transform: `translateY(${(1 - split) * 300}px)`}} />
      <ThreeCanvas width={W} height={H} camera={{position: [0, 0, 13], fov: 40}} style={{position: 'absolute', inset: 0}}>
        <Lights />
        <group position={[0, 2.35, 0]} scale={split * 0.95}><Virus /></group>
        <group position={[0, -2.35, 0]} scale={bIn * (f >= S.bacteria ? 1.15 : 0.001)}><Bacterium wallFrom={S.bacteria + 25} /></group>
      </ThreeCanvas>
      <div style={{position: 'absolute', left: 0, right: 0, top: H / 2 - 4, height: 8, background: C.pale, opacity: 0.85, transform: `scaleX(${split})`}} />
      <div style={{position: 'absolute', left: W / 2 - 70, top: H / 2 - 70, width: 140, height: 140, borderRadius: 70, background: C.gold, color: C.bgDeep, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'AGLatin', fontWeight: 800, fontSize: 64, transform: `scale(${vs})`}}>VS</div>
      <Word text="FLU VIRUS" y={120} size={78} from={6} color={C.teal} />
      <Word text="BACTERIA" y={1770} size={78} from={S.bacteria + 4} color={C.gold} />
      <Word text="Flu is caused by a virus" y={790} size={50} from={20} out={S.bacteria - 6} weight={600} />
      <Word text="Antibiotics treat bacteria" y={1080} size={50} from={S.bacteria + 14} weight={600} />
      <Verdict ok x={880} y={1450} from={S.bacteria + 34} />
      <Verdict ok={false} x={880} y={470} from={S.close} />
      <Word text="Antibiotics do not treat flu itself" y={790} size={50} from={S.close + 6} weight={700} color={C.coral} />
    </AbsoluteFill>
  );
};

// ===================== H · Cinematic 3D push-in =====================

export const StyleCinematic: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 55, 70, 150], [16, 5.2, 9, 15], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const x = interpolate(f, [55, 75, 150], [0, 1.0, 0.6], clamp);
  const y = interpolate(f, [55, 75, 150], [0, -1.6, -0.6], clamp);
  const bars = 140;
  const cap = (from: number, to: number) => interpolate(f, [from, from + 10, to - 6, to], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#020b0d'}}>
      <ThreeCanvas width={W} height={H} camera={{position: [x, y, z], fov: 38}} style={{position: 'absolute', inset: 0}}>
        <Lights />
        <fog attach="fog" args={['#020b0d', 8, 22]} />
        <group position={[0, 0.9, 0]}><Virus /></group>
        <group position={[0.5, -1.7, -1.2]}><Bacterium wallFrom={S.bacteria + 20} /></group>
      </ThreeCanvas>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: bars, background: '#000'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: bars, background: '#000'}} />
      {[
        ['Flu is caused by a virus', 4, S.bacteria, C.pale],
        ['Antibiotics treat bacteria', S.bacteria + 6, S.close, C.gold],
        ['Antibiotics do not treat flu itself', S.close + 2, 999, C.pale],
      ].map(([t, a, b, col]) => (
        <div key={t as string} style={{position: 'absolute', left: 80, right: 80, top: 190, textAlign: 'center', fontFamily: 'AGLatin', fontWeight: 500, fontSize: 54, letterSpacing: 1,
          color: col as string, opacity: cap(a as number, b as number), textShadow: '0 2px 18px #000'}}>
          {t as string}
        </div>
      ))}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: bars + 30, textAlign: 'center', fontFamily: 'AGLatin', fontSize: 24, color: '#5f7c7a', letterSpacing: 3}}>EDUCATIONAL 3D ILLUSTRATION · NOT TO SCALE</div>
    </AbsoluteFill>
  );
};

// ===================== I · Kinetic captions over presenter =====================

// Exact approved wording (V2 speech), estimated at 165 WPM = 9.09 frames/word.
const CAPTION_WORDS = 'Blunt answer—flu is caused by a virus. Antibiotics treat bacteria. They target parts of bacteria that viruses don’t have.'
  .replace('—', '— ').split(' ');
export const CAPTION_FRAMES = Math.ceil(CAPTION_WORDS.length * 9.09) + 10;

export const StyleCaptions: React.FC = () => {
  const f = useCurrentFrame();
  const idx = Math.min(CAPTION_WORDS.length - 1, Math.floor(f / 9.09));
  const group = Math.floor(idx / 3);
  const words = CAPTION_WORDS.slice(group * 3, group * 3 + 3);
  const pop = useSpr(group * 3 * 9.09, 12);
  const keyColor = (w: string) => (/virus/i.test(w) ? C.teal : /bacteria|antibiotic/i.test(w) ? C.gold : C.pale);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1b2f33 0%, #10191b 100%)'}}>
      {/* presenter placeholder: AG's HeyGen shot sits here in the real edit */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: 0.55}}>
        <circle cx={540} cy={720} r={190} fill="#2b4549" />
        <path d="M170 1600 Q190 1060 540 1010 Q890 1060 910 1600 Z" fill="#2b4549" />
      </svg>
      <div style={{position: 'absolute', top: 230, left: 0, right: 0, textAlign: 'center', fontFamily: 'AGLatin', fontSize: 28, letterSpacing: 4, color: '#6f8f8c'}}>AG PRESENTER SHOT GOES HERE</div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1190, textAlign: 'center', fontFamily: 'AGLatin', fontWeight: 800, fontSize: 96, lineHeight: 1.08, letterSpacing: -1,
        transform: `scale(${0.85 + 0.15 * pop})`, textShadow: '0 6px 0 rgba(0,0,0,0.45), 0 0 30px rgba(0,0,0,0.6)'}}>
        {words.map((w, i) => {
          const active = group * 3 + i === idx;
          return (
            <span key={i} style={{color: active ? keyColor(w) === C.pale ? C.gold : keyColor(w) : C.pale, opacity: group * 3 + i <= idx ? 1 : 0.35}}>
              {w.toUpperCase()}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1460, textAlign: 'center', fontFamily: 'AGLatin', fontSize: 24, color: '#6f8f8c'}}>Caption timing estimated at 165 WPM — retimed to measured audio before use</div>
    </AbsoluteFill>
  );
};

// ===================== J · Colour-block wipes =====================

const Panel: React.FC<{from: number; color: string; children: React.ReactNode; textColor?: string}> = ({from, color, children, textColor = C.bgDeep}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + 9], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  if (f < from) return null;
  return (
    <AbsoluteFill style={{background: color, clipPath: `inset(${(1 - p) * 100}% 0 0 0)`, color: textColor}}>
      {children}
    </AbsoluteFill>
  );
};

export const StyleBlocks: React.FC = () => (
  <AbsoluteFill style={{background: C.bgDeep}}>
    <Panel from={0} color={C.teal}>
      <Word text="FLU" y={640} size={300} from={4} color={C.bgDeep} />
      <Word text="IS CAUSED BY A" y={970} size={64} from={12} color="#0d3b37" weight={700} />
      <Word text="VIRUS" y={1050} size={210} from={20} color={C.bgDeep} />
    </Panel>
    <Panel from={S.bacteria} color={C.gold}>
      <Word text="ANTIBIOTICS" y={700} size={150} from={S.bacteria + 4} color={C.bgDeep} />
      <Word text="TREAT" y={880} size={70} from={S.bacteria + 12} color="#5a3e10" weight={700} />
      <Word text="BACTERIA" y={970} size={190} from={S.bacteria + 20} color={C.bgDeep} />
    </Panel>
    <Panel from={S.close} color={C.bg} textColor={C.pale}>
      <Word text="ANTIBIOTICS" y={640} size={130} from={S.close + 4} color={C.gold} />
      <Word text="DO NOT TREAT" y={800} size={110} from={S.close + 12} color={C.coral} />
      <Word text="FLU ITSELF" y={940} size={170} from={S.close + 20} />
    </Panel>
  </AbsoluteFill>
);
