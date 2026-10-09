// Brown vs white sugar — molasses explainer (proposal, 8 Oct 2026 batch).
//
// Covers the speech from "The main difference is molasses." to the ending.
// Exact approved speech (46 words, unchanged):
//   What is the difference between brown sugar and white sugar?
//   The main difference is molasses.
//   It gives brown sugar its color, flavor, and moisture.
//   But both still count as added sugar when you add them to food or drinks.
//   Different color. Different flavor. Still added sugar.
//
// Cue frames are ESTIMATES at 165 WPM (0.364 s per word) because no audio has
// been recorded for this batch. Retime from measured narration before use.
// Evidence: molasses → colour/flavour/moisture (Univ. Illinois Extension);
// brown sugar counts as added sugar (FDA). No glucose or calorie claims shown.

import React from 'react';
import {interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {C, H, W, clamp} from '../theme';
import {Note, Stage, Stamp, Text, usePop} from '../ui';

export const SUGAR_FRAMES = 327;
const B = {molasses: 0, gives: 45, both: 127, ending: 263}; // estimated cue starts

// Deterministic crystal mound: rows narrow towards the top.
const crystals = (() => {
  const out: {x: number; y: number; r: number; d: number}[] = [];
  const rows = [11, 10, 9, 8, 6, 4, 2];
  rows.forEach((n, row) => {
    for (let i = 0; i < n; i++) {
      const x = 540 + (i - (n - 1) / 2) * 44 + ((row % 2) * 10 - 5);
      const y = 1010 - row * 38;
      const r = ((i * 37 + row * 19) % 40) - 20;
      out.push({x, y, r, d: rows.length - row}); // d: depth from the top (1 = top)
    }
  });
  return out;
})();

const Crystal: React.FC<{x: number; y: number; r: number; color: string}> = ({x, y, r, color}) => (
  <rect x={x - 18} y={y - 18} width={36} height={36} rx={7} fill={color} stroke="rgba(0,0,0,0.18)" strokeWidth={2} transform={`rotate(${r} ${x} ${y})`} />
);

const MoundScene: React.FC = () => {
  const f = useCurrentFrame();
  const dropY = interpolate(f, [8, 34], [420, 760], clamp);
  const dropOn = f >= 8 && f < 36 ? 1 : 0;
  const pool = interpolate(f, [34, 60], [0, 1], clamp);
  const clump = interpolate(f, [B.gives + 50, B.gives + 75], [0, 1], clamp);
  const fadeOut = interpolate(f, [B.both, B.both + 12], [1, 0], clamp);
  return (
    <g opacity={fadeOut}>
      {crystals.map((c, i) => {
        // colour spreads from the top of the mound downwards
        const start = B.gives + (c.d - 1) * 6;
        const color = interpolateColors(f, [start, start + 18], [C.whiteSugar, C.brownSugar]);
        // moisture: grains pull together slightly into clumps
        const cx = c.x + (Math.round((c.x - 540) / 90) * 90 + 540 - c.x) * 0.35 * clump;
        return <Crystal key={i} x={cx} y={c.y} r={c.r} color={color} />;
      })}
      <ellipse cx={540} cy={790} rx={150 * pool} ry={34 * pool} fill={C.molasses} opacity={interpolate(f, [B.gives, B.gives + 40], [0.95, 0], clamp)} />
      {dropOn ? <path d={`M540 ${dropY - 70} C 515 ${dropY - 20}, 505 ${dropY + 10}, 540 ${dropY + 26} C 575 ${dropY + 10}, 565 ${dropY - 20}, 540 ${dropY - 70} Z`} fill={C.molasses} /> : null}
    </g>
  );
};

const Cup: React.FC<{x: number; sugar: string; from: number}> = ({x, sugar, from}) => {
  const f = useCurrentFrame();
  const spoonY = interpolate(f, [from, from + 22], [640, 800], clamp);
  const tip = interpolate(f, [from + 22, from + 34], [0, -55], clamp);
  const heap = interpolate(f, [from + 22, from + 34], [1, 0], clamp);
  const appear = usePop(from - 10);
  return (
    <g opacity={Math.min(1, appear)}>
      {/* spoon */}
      <g transform={`translate(${x + 40} ${spoonY}) rotate(${tip})`}>
        <rect x={-150} y={-8} width={150} height={16} rx={8} fill={C.muted} />
        <ellipse cx={20} cy={0} rx={46} ry={24} fill={C.muted} />
        <ellipse cx={20} cy={-10} rx={34 * heap} ry={16 * heap} fill={sugar} />
      </g>
      {/* cup */}
      <path d={`M${x - 110} 900 L${x - 90} 1110 Q${x} 1140 ${x + 90} 1110 L${x + 110} 900 Z`} fill={C.panel} stroke={C.pale} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M${x + 108} 950 Q${x + 175} 965 ${x + 150} 1040 Q${x + 130} 1075 ${x + 98} 1060`} fill="none" stroke={C.pale} strokeWidth={8} />
      <ellipse cx={x} cy={905} rx={104} ry={16} fill="#5a3a20" opacity={0.9} />
    </g>
  );
};

export const SugarMolasses: React.FC = () => {
  const f = useCurrentFrame();
  const endFade = interpolate(f, [B.ending - 6, B.ending + 4], [1, 0], clamp);
  return (
    <Stage>
      {/* Beat 1–2: molasses on white sugar → brown sugar */}
      <Text y={210} size={60} from={0} out={[B.both, B.both + 10]} color={C.muted} weight={500}>
        The main difference is
      </Text>
      <Text y={285} size={140} from={20} out={[B.both, B.both + 10]} color={C.gold} weight={700}>
        MOLASSES
      </Text>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <MoundScene />
      </svg>
      <Text y={1075} size={52} from={B.gives + 14} out={[B.both, B.both + 10]} weight={600}>
        brown sugar
      </Text>
      {[
        ['Color', B.gives + 43, 260],
        ['Flavor', B.gives + 54, 540],
        ['Moisture', B.gives + 71, 820],
      ].map(([label, from, x]) => (
        <Chip key={label as string} x={x as number} from={from as number} out={B.both}>
          {label}
        </Chip>
      ))}

      {/* Beat 3: both count as added sugar */}
      <div style={{opacity: endFade}}>
        <Text y={230} size={80} from={B.both + 6} lineHeight={1.05}>
          Both still count as
          <br />
          <span style={{color: C.gold}}>added sugar</span>
        </Text>
        <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
          {f >= B.both ? (
            <>
              <Cup x={300} sugar={C.whiteSugar} from={B.both + 16} />
              <Cup x={780} sugar={C.brownSugar} from={B.both + 26} />
            </>
          ) : null}
        </svg>
        <div style={{position: 'absolute', top: 1170, left: 0, width: 600, textAlign: 'center', fontSize: 46, opacity: f >= B.both + 10 ? 1 : 0}}>White sugar</div>
        <div style={{position: 'absolute', top: 1170, left: 480, width: 600, textAlign: 'center', fontSize: 46, opacity: f >= B.both + 20 ? 1 : 0}}>Brown sugar</div>
        {f >= B.both ? (
          <>
            <Stamp x={300} y={1290} from={B.both + 48}>ADDED SUGAR</Stamp>
            <Stamp x={780} y={1290} from={B.both + 58} rotate={3}>ADDED SUGAR</Stamp>
          </>
        ) : null}
        <Text y={1380} size={40} from={B.both + 80} color={C.muted} weight={500}>
          when you add them to food or drinks
        </Text>
      </div>

      {/* Beat 4: ending lines */}
      <Text y={640} size={84} from={B.ending}>
        <Swatch color={C.whiteSugar} /> <Swatch color={C.brownSugar} /> Different color.
      </Text>
      <Text y={790} size={84} from={B.ending + 18}>
        Different flavor.
      </Text>
      <Text y={960} size={118} from={B.ending + 36} color={C.gold} weight={700}>
        Still added sugar.
      </Text>
      <Note y={1490} from={B.gives}>
        Illustration • not a measured comparison
      </Note>
    </Stage>
  );
};

const Chip: React.FC<{x: number; from: number; out: number; children: React.ReactNode}> = ({x, from, out, children}) => {
  const f = useCurrentFrame();
  const p = usePop(from);
  const o = interpolate(f, [out, out + 10], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        top: 1190,
        left: x,
        transform: `translate(-50%, 0) scale(${p})`,
        opacity: Math.min(1, p) * o,
        background: C.brownSugar,
        color: C.pale,
        borderRadius: 999,
        padding: '14px 34px',
        fontSize: 48,
        fontWeight: 650,
      }}
    >
      {children}
    </div>
  );
};

const Swatch: React.FC<{color: string}> = ({color}) => (
  <span style={{display: 'inline-block', width: 40, height: 40, borderRadius: 10, background: color, verticalAlign: 'middle', marginBottom: 10}} />
);

// Transparent overlay of the ending, for placing over AG's presenter shot in
// HeyGen (export as ProRes 4444 with alpha). Text only, lower third.
export const SUGAR_OVERLAY_FRAMES = 64;
export const SugarEndOverlay: React.FC = () => (
  <Stage transparent>
    <div style={{position: 'absolute', left: 60, right: 60, top: 1120, height: 380, borderRadius: 36, background: 'rgba(5,26,30,0.78)'}} />
    <Text y={1150} size={70} from={0}>
      Different color.
    </Text>
    <Text y={1250} size={70} from={18}>
      Different flavor.
    </Text>
    <Text y={1355} size={86} from={36} color={C.gold} weight={700}>
      Still added sugar.
    </Text>
  </Stage>
);
