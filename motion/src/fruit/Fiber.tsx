// Whole fruit vs juice — fiber explainer (proposal, 8 Oct 2026 batch).
//
// Covers three cues of the ORIGINAL 91-word speech (unchanged):
//   "Because juicing removes much of the fiber, one of the most valuable parts."
//   "Blending is different. If you keep the whole fruit, you keep the fiber,
//    although the fruit’s structure changes."
//   "Now picture the fruit that went into your glass. One glass can contain
//    several fruits. Easy to drink quickly."
//
// Cue frames are ESTIMATES at 165 WPM (no recorded audio yet). Pulp is a
// visible stand-in for fiber, not a measurement; the fruit count is
// illustrative, not a yield. No prohibition symbol on blending.

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, H, W, clamp} from '../theme';
import {Note, Stage, Text, usePop} from '../ui';

export const FRUIT_FRAMES = 464;
const B = {juicing: 0, blending: 118, glass: 291}; // estimated cue starts

// Short wavy strand used for pulp/fiber.
const Strand: React.FC<{x: number; y: number; len?: number; rot?: number; o?: number; w?: number}> = ({x, y, len = 46, rot = 0, o = 1, w = 7}) => (
  <path
    d={`M${-len / 2} 0 q ${len / 6} -12 ${len / 3} 0 t ${len / 3} 0 t ${len / 3} 0`}
    transform={`translate(${x} ${y}) rotate(${rot})`}
    stroke={C.pith}
    strokeWidth={w}
    strokeLinecap="round"
    fill="none"
    opacity={o}
  />
);

const Orange: React.FC<{x: number; y: number; r?: number; o?: number}> = ({x, y, r = 70, o = 1}) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={C.orange} />
    <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.22} fill="#ffc06a" opacity={0.7} />
    <path d={`M${x} ${y - r} q 8 -22 26 -26`} stroke="#4f8a3c" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

// ---- Beat 1: juice strained, pulp stays in the sieve ----
const Juicing: React.FC = () => {
  const f = useCurrentFrame();
  const pour = interpolate(f, [10, 100], [0, 1], clamp);
  const fill = interpolate(f, [24, 110], [0, 1], clamp);
  const out = interpolate(f, [B.blending - 8, B.blending + 4], [1, 0], clamp);
  const strandsKept = Math.floor(interpolate(f, [16, 100], [0, 14], clamp));
  return (
    <g opacity={out}>
      {/* jug */}
      <g transform={`translate(330 560) rotate(${interpolate(f, [0, 12], [0, -32], clamp)})`}>
        <path d="M-90 -110 H70 L95 -80 L70 110 H-70 Z" fill={C.panel} stroke={C.pale} strokeWidth={8} strokeLinejoin="round" />
        <path d="M-80 -20 H66 L60 100 H-62 Z" fill={C.orange} opacity={0.85 - pour * 0.6} />
      </g>
      {/* stream */}
      {f > 12 && f < 106 ? <path d="M420 520 C 470 560, 520 600, 540 700" stroke={C.orange} strokeWidth={18} fill="none" strokeLinecap="round" /> : null}
      {/* sieve */}
      <path d="M380 720 Q540 880 700 720" fill="none" stroke={C.pale} strokeWidth={8} />
      <path d="M380 720 H700" stroke={C.pale} strokeWidth={8} />
      {Array.from({length: 9}, (_, i) => (
        <path key={i} d={`M${398 + i * 32} 722 V${760 + Math.sin((i / 8) * Math.PI) * 60}`} stroke={C.line} strokeWidth={3} />
      ))}
      <path d="M700 720 H800" stroke={C.pale} strokeWidth={14} strokeLinecap="round" />
      {Array.from({length: strandsKept}, (_, i) => (
        <Strand key={i} x={430 + ((i * 53) % 220)} y={740 + ((i * 29) % 50)} rot={(i * 47) % 180} />
      ))}
      {/* drip into glass */}
      {f > 24 && f < 110 ? <path d="M540 800 V880" stroke={C.orange} strokeWidth={10} strokeLinecap="round" opacity={0.85} /> : null}
      {/* glass */}
      <path d="M440 880 L460 1180 H620 L640 880" fill="none" stroke={C.pale} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M${458 - 2 * (1 - fill)} ${1176 - 280 * fill} L460 1176 H620 L${622 + 2 * (1 - fill)} ${1176 - 280 * fill} Z`} fill={C.orange} opacity={0.8} />
    </g>
  );
};

// ---- Beat 2: blended whole fruit keeps fiber; structure changes ----
const Blending: React.FC = () => {
  const f = useCurrentFrame();
  const t = f - B.blending;
  const vis = interpolate(f, [B.blending, B.blending + 10, B.glass - 8, B.glass + 4], [0, 1, 1, 0], clamp);
  const drop = interpolate(t, [8, 40], [0, 1], clamp);
  const spin = t > 45 ? (t - 45) * 22 : 0;
  const mix = interpolate(t, [45, 90], [0, 1], clamp);
  const breakUp = interpolate(t, [120, 160], [0, 1], clamp); // "structure changes"
  return (
    <g opacity={vis}>
      {/* segments falling in */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d="M0 0 A60 60 0 0 1 60 0 Z"
          transform={`translate(${470 + i * 34} ${interpolate(drop, [0, 1], [430 + i * 20, 840])}) rotate(${i * 40 + t * 3})`}
          fill={C.orange}
          stroke={C.pith}
          strokeWidth={5}
          opacity={1 - mix}
        />
      ))}
      {/* blender jug */}
      <path d="M380 620 H700 L660 1080 H420 Z" fill="rgba(13,50,56,0.55)" stroke={C.pale} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M${425 - 25 * mix} ${1080 - 300 * mix} H${655 + 25 * mix} L660 1076 H420 Z`} fill={C.orange} opacity={0.85 * mix} />
      {/* fiber pieces stay inside the jug; they get shorter as structure changes */}
      {Array.from({length: 16}, (_, i) => {
        const swirl = (spin / 60 + i) % 16;
        const x = 450 + ((i * 47 + swirl * 9) % 180);
        const y = 830 + ((i * 31) % 220);
        const len = 46 - 26 * breakUp;
        return <Strand key={i} x={x} y={y} len={len} w={6} rot={(i * 61 + spin) % 180} o={mix} />;
      })}
      {/* base + blade */}
      <rect x={400} y={1080} width={280} height={110} rx={18} fill={C.panel} stroke={C.pale} strokeWidth={8} />
      <g transform={`translate(540 1060) rotate(${spin})`}>
        <path d="M-60 0 H60 M0 -14 V14" stroke={C.muted} strokeWidth={10} strokeLinecap="round" />
      </g>
    </g>
  );
};

// ---- Beat 3: several fruits → one glass, easy to drink quickly ----
const OneGlass: React.FC = () => {
  const f = useCurrentFrame();
  const t = f - B.glass;
  const vis = interpolate(t, [0, 10], [0, 1], clamp);
  const gather = interpolate(t, [30, 95], [0, 1], clamp);
  const fill = interpolate(t, [40, 100], [0, 1], clamp);
  const drink = interpolate(t, [134, 168], [0, 1], clamp); // "Easy to drink quickly"
  const level = fill * (1 - drink * 0.92);
  const spots = [
    [300, 560],
    [540, 500],
    [780, 560],
    [400, 700],
    [680, 700],
  ];
  return (
    <g opacity={vis}>
      {spots.map(([x, y], i) => (
        <Orange
          key={i}
          x={interpolate(gather, [0, 1], [x, 540])}
          y={interpolate(gather, [0, 1], [y, 960])}
          r={interpolate(gather, [0, 1], [70, 10])}
          o={1 - gather}
        />
      ))}
      <g transform={`rotate(${-18 * Math.sin(drink * Math.PI)} 540 1150)`}>
        <path d="M440 880 L460 1180 H620 L640 880" fill="none" stroke={C.pale} strokeWidth={8} strokeLinejoin="round" />
        <path d={`M458 ${1176 - 280 * level} L460 1176 H620 L622 ${1176 - 280 * level} Z`} fill={C.orange} opacity={0.85} />
      </g>
    </g>
  );
};

export const FruitFiber: React.FC = () => (
  <Stage>
    {/* headers */}
    <Text y={200} size={92} from={0} out={[B.blending - 8, B.blending + 2]} weight={700}>
      JUICING
    </Text>
    <Text y={200} size={92} from={B.blending + 4} out={[B.glass - 8, B.glass + 2]} weight={700} color={C.teal}>
      BLENDING
    </Text>
    <Text y={200} size={74} from={B.glass + 4} lineHeight={1.05}>
      Several fruits.
      <br />
      <span style={{color: C.gold}}>One glass.</span>
    </Text>

    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <Juicing />
      <Blending />
      <OneGlass />
    </svg>

    {/* beat 1 labels */}
    <Callout x={760} y={600} from={44} out={B.blending - 8}>
      Much of the fiber
      <br />
      stays behind
    </Callout>
    <Text y={1220} size={52} from={70} out={[B.blending - 8, B.blending + 2]} weight={600}>
      Juice
    </Text>
    {/* beat 2 labels */}
    <Text y={1230} size={56} from={B.blending + 88} out={[B.glass - 8, B.glass + 2]} weight={600}>
      Whole fruit in → <span style={{color: C.teal}}>fiber kept</span>
    </Text>
    <Text y={1310} size={44} from={B.blending + 140} out={[B.glass - 8, B.glass + 2]} color={C.muted} weight={500}>
      The fruit’s structure changes
    </Text>
    {/* beat 3 label */}
    <Text y={1230} size={60} from={B.glass + 130} weight={600}>
      Easy to drink quickly
    </Text>

    <Note y={1490} from={10}>
      Illustration • pulp shown, not a fiber measurement
    </Note>
  </Stage>
);

const Callout: React.FC<{x: number; y: number; from: number; out: number; children: React.ReactNode}> = ({x, y, from, out, children}) => {
  const f = useCurrentFrame();
  const p = usePop(from);
  const o = interpolate(f, [out, out + 10], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${p})`,
        opacity: Math.min(1, p) * o,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 650,
        lineHeight: 1.15,
        color: C.pith,
        background: C.panel,
        border: `4px solid ${C.pith}`,
        borderRadius: 20,
        padding: '14px 20px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  );
};
