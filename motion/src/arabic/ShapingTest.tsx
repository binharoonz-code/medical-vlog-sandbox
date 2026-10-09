// Arabic rendering test — NOT approved wording.
//
// Checks that the render pipeline joins Arabic letters correctly, runs
// right-to-left, keeps embedded English medical terms in the right order, and
// can highlight words one at a time for a captioned version. Arabic narration
// must come from AG's own recording; the lines below are draft labels made for
// this test only and are not for publication.

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, SAFE, clamp} from '../theme';
import {Note, Stage, Text} from '../ui';

export const ARABIC_FRAMES = 150;

// One caption line, revealed word by word in reading order (right to left).
const KaraokeLine: React.FC<{words: string[]; y: number; from: number; step: number}> = ({words, y, from, step}) => {
  const f = useCurrentFrame();
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute',
        top: y,
        left: SAFE.left,
        right: SAFE.left,
        textAlign: 'center',
        fontSize: 72,
        fontWeight: 700,
        lineHeight: 1.35,
      }}
    >
      {words.map((w, i) => {
        const on = interpolate(f, [from + i * step, from + i * step + 4], [0, 1], clamp);
        const latin = /[A-Za-z]/.test(w);
        return (
          <span key={i} style={{color: on > 0.5 ? C.gold : C.pale, opacity: 0.35 + 0.65 * on}}>
            {latin ? <bdi>{w}</bdi> : w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </div>
  );
};

export const ArabicShapingTest: React.FC = () => (
  <Stage>
    <Text y={200} size={40} from={0} color={C.coral} weight={600}>
      Arabic rendering test • draft wording, not approved
    </Text>
    <Text y={330} size={96} from={4} dir="rtl" weight={700}>
      السكر البني والأبيض
    </Text>
    <Text y={490} size={64} from={14} dir="rtl" weight={600} color={C.teal}>
      الفرق الأساسي هو الـ <bdi>molasses</bdi>
    </Text>
    <KaraokeLine y={760} from={34} step={9} words={['الإنفلونزا', 'سببها', 'فيروس،', 'والـ', 'antibiotics', 'حق', 'البكتيريا']} />
    <KaraokeLine y={1000} from={100} step={7} words={['يعني', 'بصراحة،', 'لا', 'تاخذ', 'antibiotics', 'بدون', 'سبب']} />
    <Note y={1300} from={20}>
      Checks: joined letters • right-to-left order • English terms inside Arabic • word-by-word highlight
    </Note>
  </Stage>
);
