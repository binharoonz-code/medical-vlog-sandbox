import React from 'react';
import {Composition, Folder, Series} from 'remotion';
import './fonts';
import {FPS, H, W} from './theme';
import {ANTIBIOTICS_CUES, AfterBecause, Closing, Microbiology, Qualification, Risks} from './antibiotics/Scenes';
import {SUGAR_FRAMES, SUGAR_OVERLAY_FRAMES, SugarEndOverlay, SugarMolasses} from './sugar/Molasses';
import {FRUIT_FRAMES, FruitFiber} from './fruit/Fiber';
import {ARABIC_FRAMES, ArabicShapingTest} from './arabic/ShapingTest';

const scenes = {AfterBecause, Microbiology, Risks, Qualification, Closing};

// All five antibiotics scenes back to back, in R2 order (graphics only).
const AntibioticsGraphicsReel: React.FC = () => (
  <Series>
    {ANTIBIOTICS_CUES.map((c) => {
      const Scene = scenes[c.id];
      return (
        <Series.Sequence key={c.id} durationInFrames={c.frames}>
          <Scene />
        </Series.Sequence>
      );
    })}
  </Series>
);

const total = ANTIBIOTICS_CUES.reduce((n, c) => n + c.frames, 0);
const common = {fps: FPS, width: W, height: H};

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Antibiotics-T24">
      <Composition id="AB-GraphicsReel" component={AntibioticsGraphicsReel} durationInFrames={total} {...common} />
      {ANTIBIOTICS_CUES.map((c) => (
        <Composition key={c.id} id={`AB-${c.id}`} component={scenes[c.id]} durationInFrames={c.frames} {...common} />
      ))}
    </Folder>
    <Folder name="Batch-2026-10-08">
      <Composition id="SUGAR-Molasses" component={SugarMolasses} durationInFrames={SUGAR_FRAMES} {...common} />
      <Composition id="SUGAR-EndOverlay" component={SugarEndOverlay} durationInFrames={SUGAR_OVERLAY_FRAMES} {...common} />
      <Composition id="FRUIT-Fiber" component={FruitFiber} durationInFrames={FRUIT_FRAMES} {...common} />
    </Folder>
    <Folder name="Tests">
      <Composition id="TEST-ArabicShaping" component={ArabicShapingTest} durationInFrames={ARABIC_FRAMES} {...common} />
    </Folder>
  </>
);
