// Style picker — the same approved antibiotics beat in four looks drawn from
// the community prompt library (yihui-dev/awesome-opus5-5-videos, MIT):
//   B Kinetic type      (After Effects-style kinetic text prompts)
//   C Whiteboard        (hand-drawn whiteboard / one-line drawing prompts)
//   D Paper cut-out     (paper cut-out 9:16 prompts)
//   E Microscope glow   (scientific canvas explainer prompts)
// Style A is the existing R2 teal look (AB-Microbiology).
//
// On-screen wording is only the approved R2 text:
//   "Flu is caused by a virus" · "Antibiotics treat bacteria" ·
//   "Antibiotics do not treat flu itself". Illustrations, not to scale.

import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, H, W, clamp} from '../theme';

export const STYLE_FRAMES = 150;
const S = {virus: 0, bacteria: 60, close: 115}; // beat starts (frames)

const useSpring = (from: number, damping = 12) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - from, fps, config: {damping, stiffness: 170, mass: 0.7}});
};
const fade = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
const spikes = (n: number) => Array.from({length: n}, (_, i) => (i / n) * Math.PI * 2);

// ===================== B · Kinetic type =====================

const Slam: React.FC<{text: string; y: number; size: number; from: number; out: number; color?: string; weight?: number}> = ({
  text, y, size, from, out, color = '#ffffff', weight = 800,
}) => {
  const f = useCurrentFrame();
  const p = useSpring(from, 10);
  const leave = interpolate(f, [out, out + 8], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  if (f < from) return null;
  return (
    <div
      style={{
        position: 'absolute', left: 60, right: 60, top: y, textAlign: 'center', fontSize: size, fontWeight: weight,
        color, letterSpacing: -2, lineHeight: 1,
        transform: `translateY(${-leave * 260}px) scale(${0.6 + 0.4 * p})`,
        opacity: Math.min(1, p * 1.5) * (1 - leave),
      }}
    >
      {text}
    </div>
  );
};

export const StyleKinetic: React.FC = () => {
  const f = useCurrentFrame();
  const flash = interpolate(f % 60, [0, 3, 8], [0.18, 0.06, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#050506', fontFamily: 'AGLatin'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: 0.09}}>
        <defs>
          <pattern id="g" width={60} height={60} patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="#fff" strokeWidth={1} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#g)" />
      </svg>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
      <Slam text="FLU" y={560} size={300} from={0} out={S.bacteria - 6} />
      <Slam text="IS CAUSED BY A" y={890} size={66} from={12} out={S.bacteria - 6} color="#9aa5a8" weight={600} />
      <Slam text="VIRUS" y={980} size={230} from={22} out={S.bacteria - 6} color={C.teal} />
      <Slam text="ANTIBIOTICS" y={620} size={150} from={S.bacteria} out={S.close - 6} color={C.gold} />
      <Slam text="TREAT" y={800} size={70} from={S.bacteria + 12} out={S.close - 6} color="#9aa5a8" weight={600} />
      <Slam text="BACTERIA" y={890} size={200} from={S.bacteria + 22} out={S.close - 6} />
      <Slam text="ANTIBIOTICS" y={560} size={130} from={S.close} out={999} color={C.gold} />
      <Slam text="DO NOT TREAT" y={720} size={110} from={S.close + 10} out={999} color={C.coral} />
      <Slam text="FLU ITSELF" y={860} size={170} from={S.close + 20} out={999} />
    </AbsoluteFill>
  );
};

// ===================== C · Whiteboard =====================

const INK = '#1d1d1f';
const Draw: React.FC<{d: string; from: number; dur: number; color?: string; w?: number; len?: number}> = ({d, from, dur, color = INK, w = 9, len = 2000}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + dur], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />;
};

const Handwrite: React.FC<{text: string; y: number; size: number; from: number; dur: number; out?: number; color?: string}> = ({text, y, size, from, dur, out, color = INK}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + dur], [0, 100], clamp);
  const o = out ? interpolate(f, [out, out + 6], [1, 0], clamp) : 1;
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: y, textAlign: 'center', fontFamily: 'AGHand', fontWeight: 700, fontSize: size, color, opacity: o, clipPath: `inset(0 ${100 - p}% 0 0)`}}>
      {text}
    </div>
  );
};

export const StyleWhiteboard: React.FC = () => {
  const f = useCurrentFrame();
  const vx = 540, vy = 600, br = 1090;
  return (
    <AbsoluteFill style={{background: '#f7f4ee'}}>
      <Handwrite text="Flu is caused by a virus" y={190} size={100} from={0} dur={22} out={S.bacteria - 4} />
      <Handwrite text="Antibiotics treat bacteria" y={190} size={100} from={S.bacteria} dur={22} out={S.close - 4} />
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        {/* virus */}
        <Draw d={`M${vx + 140} ${vy} A140 140 0 1 1 ${vx + 139.9} ${vy - 4}`} from={4} dur={20} len={900} />
        {spikes(16).map((a, i) => (
          <Draw key={i} d={`M${vx + Math.cos(a) * 140} ${vy + Math.sin(a) * 140} L${vx + Math.cos(a) * 185} ${vy + Math.sin(a) * 185}`} from={22 + i} dur={6} len={60} w={8} />
        ))}
        {spikes(16).map((a, i) => (
          <circle key={i} cx={vx + Math.cos(a) * 192} cy={vy + Math.sin(a) * 192} r={9} fill={INK} opacity={fade(f, 26 + i, 30 + i)} />
        ))}
        {/* bacterium */}
        <Draw d={`M380 ${br - 70} H700 A70 70 0 0 1 700 ${br + 70} H380 A70 70 0 0 1 380 ${br - 70} Z`} from={S.bacteria + 2} dur={22} len={1200} color="#b5651d" />
        <Draw d={`M392 ${br - 52} H688 A52 52 0 0 1 688 ${br + 52} H392 A52 52 0 0 1 392 ${br - 52} Z`} from={S.bacteria + 14} dur={18} len={1000} color="#b5651d" w={4} />
        {/* pill + arrows */}
        <g transform="translate(150 860) rotate(-25)">
          <Draw d="M-60 -28 H60 A28 28 0 0 1 60 28 H-60 A28 28 0 0 1 -60 -28 Z" from={S.bacteria + 20} dur={12} len={400} color="#1f7a6c" />
          <Draw d="M0 -28 V28" from={S.bacteria + 28} dur={4} len={60} color="#1f7a6c" />
        </g>
        <Draw d="M220 920 Q300 1060 360 1070" from={S.bacteria + 32} dur={12} len={300} color="#1f7a6c" />
        <Draw d="M720 1180 L760 1220 L840 1130" from={S.bacteria + 44} dur={8} len={200} color="#1f7a6c" w={12} />
        <Draw d="M210 810 Q260 690 360 640" from={S.close} dur={12} len={300} color="#c0392b" />
        <Draw d="M330 560 L410 640 M410 560 L330 640" from={S.close + 12} dur={8} len={240} color="#c0392b" w={12} />
      </svg>
      <Handwrite text="virus" y={vy + 210} size={56} from={30} dur={10} />
      <Handwrite text="bacteria" y={br + 90} size={56} from={S.bacteria + 26} dur={10} color="#b5651d" />
      <Handwrite text="Antibiotics do not treat flu itself" y={1330} size={76} from={S.close + 4} dur={14} color="#c0392b" />
    </AbsoluteFill>
  );
};

// ===================== D · Paper cut-out =====================

const paper = 'drop-shadow(0 10px 0 rgba(60,40,20,0.18)) drop-shadow(0 18px 22px rgba(60,40,20,0.25))';

const Tag: React.FC<{y: number; from: number; out?: number; children: React.ReactNode; bg?: string; size?: number}> = ({y, from, out, children, bg = '#fffaf0', size = 58}) => {
  const f = useCurrentFrame();
  const p = useSpring(from, 11);
  const o = out ? interpolate(f, [out, out + 6], [1, 0], clamp) : 1;
  return (
    <div style={{position: 'absolute', top: y, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: Math.min(1, p * 1.4) * o}}>
      <div style={{background: bg, padding: '18px 36px', borderRadius: 6, fontFamily: 'AGLatin', fontWeight: 700, fontSize: size, color: '#3a2a1a', filter: paper, transform: `rotate(${(1 - p) * -8 - 1.5}deg) translateY(${(1 - p) * -60}px)`}}>
        {children}
      </div>
    </div>
  );
};

export const StylePaper: React.FC = () => {
  const f = useCurrentFrame();
  const v = useSpring(4, 9);
  const b = useSpring(S.bacteria + 4, 9);
  const pill = interpolate(f, [S.bacteria + 24, S.bacteria + 44], [-260, 330], {...clamp, easing: Easing.out(Easing.back(1.6))});
  const wob = Math.sin(f / 9) * 2;
  return (
    <AbsoluteFill style={{background: '#e8d9bf'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: 0.35}}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} /><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.5 0" /></filter>
        <rect width={W} height={H} filter="url(#grain)" />
      </svg>
      {/* background paper hills */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: paper}}>
        <path d={`M0 1520 Q270 ${1440 + wob * 3} 540 1500 T1080 1470 V1920 H0 Z`} fill="#c9b08a" />
        <path d={`M0 1610 Q300 ${1560 - wob * 3} 620 1620 T1080 1590 V1920 H0 Z`} fill="#b39467" />
      </svg>
      {/* virus */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: paper}}>
        <g transform={`translate(540 640) scale(${v}) rotate(${wob * 3 + (1 - v) * 90})`}>
          {spikes(12).map((a, i) => (
            <g key={i}>
              <rect x={-9} y={-210} width={18} height={70} rx={6} fill="#2a7f7a" transform={`rotate(${(a * 180) / Math.PI})`} />
              <circle cx={0} cy={-212} r={20} fill="#f0b45b" transform={`rotate(${(a * 180) / Math.PI})`} />
            </g>
          ))}
          <circle r={150} fill="#35a39b" />
          <circle r={98} fill="#2e8f88" />
          <circle cx={-40} cy={-30} r={22} fill="#7fd3c9" />
        </g>
      </svg>
      {/* bacterium + pill */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: paper}}>
        <g transform={`translate(560 1150) scale(${b}) rotate(${-wob * 2 - 6})`}>
          <rect x={-200} y={-80} width={400} height={160} rx={80} fill="#d9a441" />
          <rect x={-170} y={-54} width={340} height={108} rx={54} fill="#e8bc63" />
        </g>
        <g transform={`translate(${pill} 1000) rotate(-28)`} opacity={f > S.bacteria + 24 ? 1 : 0}>
          <rect x={-80} y={-34} width={80} height={68} rx={34} fill="#d9534f" />
          <rect x={-10} y={-34} width={90} height={68} rx={34} fill="#fffaf0" />
        </g>
      </svg>
      <Tag y={150} from={0} out={S.bacteria - 6}>Flu is caused by a virus</Tag>
      <Tag y={150} from={S.bacteria} out={S.close - 6}>Antibiotics treat bacteria</Tag>
      <Tag y={880} from={30} bg="#d7f0ec" size={44}>FLU VIRUS</Tag>
      <Tag y={1270} from={S.bacteria + 18} bg="#f6e3b8" size={44}>BACTERIA</Tag>
      <Tag y={1380} from={S.close} bg="#f7d6d3" size={54}>Antibiotics do not treat flu itself</Tag>
    </AbsoluteFill>
  );
};

// ===================== E · Microscope glow =====================

const rand = (i: number) => {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

export const StyleMicroscope: React.FC = () => {
  const f = useCurrentFrame();
  const cx = 540, cy = 900, R = 470;
  const focusV = interpolate(f, [0, 22], [14, 0], clamp);
  const focusB = interpolate(f, [S.bacteria, S.bacteria + 22], [14, 0], clamp);
  const pan = interpolate(f, [S.bacteria - 6, S.bacteria + 14], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const vx = cx + pan * -170, vy = cy + pan * -170, vs = 1 - pan * 0.45;
  const wall = interpolate(f, [S.bacteria + 40, S.bacteria + 55], [0, 1], clamp);
  const mono = {fontFamily: 'AGLatin', fontWeight: 400, letterSpacing: 4, textTransform: 'uppercase' as const};
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={10} result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="field"><stop offset="0%" stopColor="#0b2a2e" /><stop offset="80%" stopColor="#04110f" /><stop offset="100%" stopColor="#000" /></radialGradient>
          <clipPath id="lens"><circle cx={cx} cy={cy} r={R} /></clipPath>
        </defs>
        <circle cx={cx} cy={cy} r={R} fill="url(#field)" />
        <g clipPath="url(#lens)">
          <path d={`M${cx - R} ${cy} H${cx + R} M${cx} ${cy - R} V${cy + R}`} stroke="#1d4a4f" strokeWidth={2} />
          {Array.from({length: 60}, (_, i) => (
            <circle key={i} cx={cx - R + rand(i) * 2 * R + Math.sin(f / 30 + i) * 12} cy={cy - R + rand(i + 99) * 2 * R + Math.cos(f / 25 + i) * 12} r={1 + rand(i + 7) * 3} fill="#6fe3cf" opacity={0.15 + rand(i + 3) * 0.3} />
          ))}
          {/* virus */}
          <g style={{filter: `blur(${focusV}px)`}}><g transform={`translate(${vx} ${vy}) scale(${vs}) rotate(${f * 0.8})`} filter="url(#glow)">
            <circle r={120} fill="none" stroke={C.teal} strokeWidth={6} />
            <circle r={90} fill="#0f4a48" opacity={0.6} />
            {spikes(24).map((a, i) => (
              <circle key={i} cx={Math.cos(a) * 140} cy={Math.sin(a) * 140} r={8} fill={i % 5 ? C.teal : C.gold} />
            ))}
          </g></g>
          {/* bacterium */}
          {f >= S.bacteria ? (
            <g style={{filter: `blur(${focusB}px)`}}><g transform={`translate(${cx + 120} ${cy + 170}) rotate(-20)`} filter="url(#glow)">
              <rect x={-170} y={-65} width={340} height={130} rx={65} fill="#3a2a08" stroke={C.gold} strokeWidth={6 + wall * 6} />
              <rect x={-150} y={-46} width={300} height={92} rx={46} fill="none" stroke="#7a5a1a" strokeWidth={3} />
            </g></g>
          ) : null}
          {/* antibiotic molecules drifting to the wall */}
          {f >= S.bacteria + 20
            ? Array.from({length: 7}, (_, i) => {
                const t = interpolate(f, [S.bacteria + 20 + i * 3, S.bacteria + 50 + i * 3], [0, 1], clamp);
                const x = cx + 420 - t * (300 - i * 10);
                const y = cy - 200 + i * 60 + t * (180 - i * 40);
                return <polygon key={i} points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" transform={`translate(${x} ${y})`} fill={C.gold} opacity={0.9} />;
              })
            : null}
        </g>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2b5d61" strokeWidth={10} />
        {/* annotation leaders */}
        <path d={`M${vx - 60} ${vy - 120} L${vx - 140} ${vy - 300} H${vx - 260}`} stroke={C.teal} strokeWidth={2} fill="none" opacity={fade(f, 24, 32)} />
        {f >= S.bacteria + 24 ? <path d={`M${cx + 230} ${cy + 230} L${cx + 300} ${cy + 520} H${cx + 380}`} stroke={C.gold} strokeWidth={2} fill="none" opacity={fade(f, S.bacteria + 24, S.bacteria + 32)} /> : null}
      </svg>
      <div style={{...mono, position: 'absolute', left: 80, top: vy - 345, fontSize: 30, color: C.teal, opacity: fade(f, 26, 34)}}>Flu virus</div>
      <div style={{...mono, position: 'absolute', right: 70, top: cy + 535, fontSize: 30, color: C.gold, opacity: fade(f, S.bacteria + 26, S.bacteria + 34)}}>Bacterium · cell wall</div>
      <div style={{...mono, position: 'absolute', left: 60, right: 60, top: 210, textAlign: 'center', fontSize: 52, color: C.pale, opacity: fade(f, 2, 12) * (1 - fade(f, S.bacteria - 6, S.bacteria))}}>Flu is caused by a virus</div>
      <div style={{...mono, position: 'absolute', left: 60, right: 60, top: 210, textAlign: 'center', fontSize: 52, color: C.gold, opacity: fade(f, S.bacteria, S.bacteria + 10) * (1 - fade(f, S.close - 6, S.close))}}>Antibiotics treat bacteria</div>
      <div style={{...mono, position: 'absolute', left: 40, right: 40, top: 190, textAlign: 'center', fontSize: 50, lineHeight: 1.25, color: C.pale, opacity: fade(f, S.close, S.close + 10)}}>Antibiotics do not<br />treat flu itself</div>
      <div style={{...mono, position: 'absolute', left: 0, right: 0, top: 1590, textAlign: 'center', fontSize: 22, color: '#5f7c7a'}}>Illustration · not to scale</div>
    </AbsoluteFill>
  );
};

// ===================== Side-by-side picker =====================

export const PICKER_W = 2700;
export const PICKER_H = 1060;

export const StylePicker: React.FC<{panels: {label: string; name: string; Comp: React.FC}[]}> = ({panels}) => {
  const scale = 0.48;
  return (
    <AbsoluteFill style={{background: '#111', fontFamily: 'AGLatin', color: '#fff'}}>
      {panels.map(({label, name, Comp}, i) => (
        <div key={label} style={{position: 'absolute', left: 30 + i * 534, top: 20, width: W * scale, height: H * scale + 110}}>
          <div style={{width: W * scale, height: H * scale, overflow: 'hidden', borderRadius: 18, position: 'relative'}}>
            <div style={{width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left'}}>
              <Comp />
            </div>
          </div>
          <div style={{marginTop: 18, fontSize: 40, fontWeight: 700, textAlign: 'center'}}>
            <span style={{color: C.gold}}>{label}</span> · {name}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
