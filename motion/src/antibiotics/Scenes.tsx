// Antibiotics for flu — native 9:16 versions of the R2 explanatory graphics.
//
// Source: Codex motion-assets/src/Root.tsx (8 Oct 2026, SHA-256 386a23ff…041c),
// authored at 1920x1080 and cropped into the 1080x1920 review. These are
// re-laid-out for portrait so nothing is cropped and type is phone-sized.
// Wording on screen is unchanged from R2; frame counts match the R2 visual
// timeline (REVIEW_R2_VISUAL_TIMELINE.json) so each scene drops into the same
// cue window. Proposal only — not AG-accepted footage.

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Quaternion, Vector3} from 'three';
import {C, H, W, clamp} from '../theme';
import {Note, Stage, Text, usePop} from '../ui';

// ---------- 3D models (geometry kept from the R2 source) ----------

const Virus: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <group rotation={[0.14, frame / 180, 0.08]}>
      <mesh>
        <sphereGeometry args={[1.03, 80, 64]} />
        <meshStandardMaterial color="#317f91" metalness={0.12} roughness={0.55} />
      </mesh>
      {Array.from({length: 78}, (_, i) => {
        const y = 1 - (2 * (i + 0.5)) / 78;
        const r = Math.sqrt(1 - y * y);
        const a = i * Math.PI * (3 - Math.sqrt(5));
        const n = new Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
        const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), n);
        return (
          <group key={i} position={n.clone().multiplyScalar(1.11).toArray()} quaternion={q}>
            <mesh>
              <cylinderGeometry args={[0.033, 0.045, 0.2, 8]} />
              <meshStandardMaterial color="#66b9b6" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.125, 0]} scale={[1.3, 0.9, 1.3]}>
              <sphereGeometry args={[0.085, 12, 10]} />
              <meshStandardMaterial color={i % 6 === 0 ? '#dbb374' : '#8fcfc8'} roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const Bacterium: React.FC<{wallFrom: number}> = ({wallFrom}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [wallFrom, wallFrom + 16, wallFrom + 73, wallFrom + 113], [0, 0.8, 0.8, 0.15], clamp);
  return (
    <group rotation={[0.18, frame / 330, Math.PI / 2 - 0.16]}>
      <mesh>
        <capsuleGeometry args={[0.56, 1.55, 18, 48]} />
        <meshStandardMaterial color="#76b29a" metalness={0.06} roughness={0.55} />
      </mesh>
      <mesh scale={[1.03, 1.015, 1.03]}>
        <capsuleGeometry args={[0.56, 1.55, 18, 48]} />
        <meshStandardMaterial
          color="#d9b865"
          emissive="#b78a2a"
          emissiveIntensity={glow}
          wireframe
          transparent
          opacity={interpolate(frame, [wallFrom, wallFrom + 16], [0, 0.62], clamp)}
        />
      </mesh>
      {Array.from({length: 18}, (_, i) => {
        const angle = i * Math.PI * (3 - Math.sqrt(5));
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.57, ((i % 6) - 2.5) * 0.3, Math.sin(angle) * 0.57]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.018, 0.018, 0.22, 6]} />
            <meshStandardMaterial color="#7dbaa4" roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

// ---------- Scene 1: "You felt better after… doesn't prove… because" (111 f) ----------

export const AfterBecause: React.FC = () => {
  const f = useCurrentFrame();
  const top = 640;
  const bottom = 1300;
  const x = 300;
  const head = interpolate(f, [0, 95], [top, bottom], clamp);
  const hand = (f / 14) % (Math.PI * 2);
  return (
    <Stage>
      <Text y={210} size={132} from={0} weight={700}>
        AFTER
      </Text>
      <Text y={360} size={112} from={81} color={C.gold} weight={700}>
        ≠ BECAUSE
      </Text>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <path d={`M${x} ${top} V${bottom}`} stroke={C.line} strokeWidth={12} />
        <path d={`M${x} ${top} V${head}`} stroke={C.teal} strokeWidth={12} />
        <circle cx={x} cy={head} r={22} fill={C.teal} />
        {/* ill person */}
        <g stroke={C.teal} strokeWidth={10} fill="none" transform={`translate(${x} ${top - 80})`}>
          <circle cx={0} cy={-10} r={40} />
          <path d="M-52 92 Q-48 46 0 42 Q48 46 52 92" />
        </g>
        {/* clock: time passes */}
        <g stroke={C.gold} strokeWidth={10} fill="none" transform={`translate(${x} ${(top + bottom) / 2})`}>
          <circle r={78} fill={C.bg} />
          <path d="M0 0 V-52" />
          <path d={`M0 0 L${Math.sin(hand) * 58} ${-Math.cos(hand) * 58}`} />
        </g>
        {/* recovered person */}
        <g stroke={C.teal} strokeWidth={10} fill="none" transform={`translate(${x} ${bottom + 20})`}>
          <circle cx={0} cy={-10} r={40} fill={C.bg} />
          <path d="M-52 92 Q-48 46 0 42 Q48 46 52 92" />
          <path d="M-22 -12 L-6 2 L26 -28" stroke={C.teal} />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 420, top: top - 70, fontSize: 64, fontWeight: 600}}>Illness</div>
      <div style={{position: 'absolute', left: 420, top: (top + bottom) / 2 - 40, fontSize: 64, fontWeight: 600}}>Time passes</div>
      <div style={{position: 'absolute', left: 420, top: bottom - 30, fontSize: 64, fontWeight: 600}}>Feeling better</div>
      <Text y={1440} size={52} from={81} weight={500}>
        The sequence alone does not prove the cause.
      </Text>
    </Stage>
  );
};

// ---------- Scene 2: virus vs bacteria, example target (246 f) ----------

export const Microbiology: React.FC = () => {
  const f = useCurrentFrame();
  // 203 px per world unit with this camera (z = 13, fov 40, 1920 px tall)
  return (
    <Stage>
      <ThreeCanvas width={W} height={H} camera={{position: [0, 0, 13], fov: 40}} style={{position: 'absolute', inset: 0}}>
        <ambientLight intensity={1.05} />
        <directionalLight position={[-3, 5, 6]} intensity={2.5} color="#dfefec" />
        <pointLight position={[4, 1, 3]} intensity={40} color="#e7c686" />
        <group position={[0, 1.97, 0]}>
          <Virus />
        </group>
        <group position={[0, -0.62, 0]} scale={interpolate(f, [64, 78], [0.001, 1], clamp)}>
          <Bacterium wallFrom={112} />
        </group>
      </ThreeCanvas>
      <Text y={150} size={78} from={0}>
        Flu is caused by a virus
      </Text>
      <Text y={840} size={58} from={0} color={C.teal}>
        FLU VIRUS
      </Text>
      <Text y={910} size={42} from={112} weight={500}>
        No bacterial cell wall
      </Text>
      <Text y={1250} size={58} from={64} color={C.gold}>
        BACTERIA
      </Text>
      <Text y={1318} size={42} from={65} out={[110, 114]} color={C.gold} weight={500}>
        Antibiotics treat bacteria
      </Text>
      <Text y={1318} size={42} from={112} color={C.gold} weight={500}>
        Example antibiotic target: bacterial cell wall
      </Text>
      <Text y={1400} size={60} from={187}>
        Antibiotics do not treat flu itself
      </Text>
      <Note y={1490}>Educational 3D illustration • not to scale</Note>
    </Stage>
  );
};

// ---------- Scene 3: side effects + resistance (118 f) ----------

export const Risks: React.FC = () => {
  const f = useCurrentFrame();
  const warn = usePop(20);
  const second = usePop(66);
  return (
    <Stage>
      <Text y={200} size={88} from={0}>
        Unnecessary antibiotics
      </Text>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <g stroke={C.gold} strokeWidth={12} fill="none" strokeLinejoin="round" transform={`translate(540 600) scale(${warn * 1.25})`} opacity={Math.min(1, warn)}>
          <path d="M0 -100 L115 105 H-115 Z" />
          <path d="M0 -40 V38" />
          <circle cx={0} cy={72} r={6} fill={C.gold} />
        </g>
        <g
          stroke={C.teal}
          strokeWidth={11}
          fill="none"
          strokeLinejoin="round"
          opacity={Math.min(1, second)}
          transform={`translate(540 1090) scale(${second * 1.15}) rotate(${Math.sin(f / 22) * 3})`}
        >
          <path d="M-145 -105 Q0 -40 145 -105 V18 Q120 125 0 160 Q-120 125 -145 18 Z" />
          <rect x={-76} y={-38} width={152} height={65} rx={32} />
          <path d="M-40 -54 V-72 M20 -54 V-72 M50 40 V58 M-20 40 V58" />
        </g>
      </svg>
      <Text y={790} size={72} from={23}>
        Side effects
      </Text>
      <Text y={1300} size={72} from={66}>
        Resistance risk
      </Text>
      <Note y={1440}>Possible harms — not a staged patient reaction</Note>
    </Stage>
  );
};

// ---------- Scene 4: bacterial complication qualification (86 f) ----------

export const Qualification: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [8, 45], [0, 1], clamp);
  return (
    <Stage>
      <Text y={220} size={92} from={0}>
        A bacterial complication?
      </Text>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={640} r={140} stroke={C.gold} strokeWidth={10} fill="none" />
        <text x={540} y={700} textAnchor="middle" fontFamily="AGLatin" fontWeight={700} fontSize={170} fill={C.gold}>
          ?
        </text>
        <path d={`M540 810 V${810 + 230 * p}`} stroke={C.teal} strokeWidth={11} />
        <path d="M505 1010 L540 1050 L575 1010" fill="none" stroke={C.teal} strokeWidth={11} opacity={p} />
        <path d="M460 1140 L525 1205 L660 1045" fill="none" stroke={C.teal} strokeWidth={16} strokeLinecap="round" opacity={p} />
      </svg>
      <Text y={1280} size={96} from={8} lineHeight={1.05}>
        A different
        <br />
        clinical decision
      </Text>
    </Stage>
  );
};

// ---------- Scene 5: closing line (57 f) ----------

export const Closing: React.FC = () => {
  const f = useCurrentFrame();
  const bar = interpolate(f, [5, 20], [0, 1], clamp);
  return (
    <Stage>
      <Text y={600} size={140} from={0} weight={700} lineHeight={1.02}>
        FLU
        <br />
        <span style={{color: C.gold}}>≠</span>
        <br />
        AUTOMATIC
        <br />
        ANTIBIOTICS
      </Text>
      <div
        style={{
          position: 'absolute',
          left: 240,
          right: 240,
          top: 1290,
          height: 10,
          borderRadius: 5,
          backgroundColor: C.teal,
          transform: `scaleX(${bar})`,
        }}
      />
    </Stage>
  );
};

// R2 cue windows (seconds) these scenes were timed to, for the cue sheet.
export const ANTIBIOTICS_CUES = [
  {id: 'AfterBecause', frames: 111, r2Start: 5.64, r2End: 10.08, cue: 'You felt better after taking them. That doesn’t prove you felt better because of them.'},
  {id: 'Microbiology', frames: 246, r2Start: 16.16, r2End: 26.0, cue: 'Blunt answer—flu is caused by a virus. Antibiotics treat bacteria. They target parts of bacteria that viruses don’t have. That’s why an antibiotic won’t treat the flu itself.'},
  {id: 'Risks', frames: 118, r2Start: 26.0, r2End: 30.72, cue: 'Unnecessary antibiotics can cause side effects and encourage resistance.'},
  {id: 'Qualification', frames: 86, r2Start: 38.84, r2End: 42.28, cue: 'And if there’s a bacterial complication, that’s a different decision.'},
  {id: 'Closing', frames: 57, r2Start: 42.28, r2End: 44.56, cue: 'Flu doesn’t automatically mean antibiotics.'},
] as const;
