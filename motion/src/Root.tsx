import React from 'react';
import {Composition, Folder, Series} from 'remotion';
import './fonts';
import {FPS, H, W} from './theme';
import {ANTIBIOTICS_CUES, AfterBecause, Closing, Microbiology, Qualification, Risks} from './antibiotics/Scenes';
import {SUGAR_FRAMES, SUGAR_OVERLAY_FRAMES, SugarEndOverlay, SugarMolasses} from './sugar/Molasses';
import {FRUIT_FRAMES, FruitFiber} from './fruit/Fiber';
import {ARABIC_FRAMES, ArabicShapingTest} from './arabic/ShapingTest';
import {PICKER_H, PICKER_W, STYLE_FRAMES, StyleKinetic, StyleMicroscope, StylePaper, StylePicker, StyleWhiteboard} from './styles/Styles';
import {StyleDiagonal, StyleOrbit, StylePunch, StyleShowdown, StyleSplitKinetic} from './styles/StylesFG';
import {CAPTION_FRAMES, StyleBlocks, StyleCaptions, StyleCinematic, StyleHybrid, StyleVersus} from './styles/StylesAB';

const PANELS = [
  {label: 'A', name: 'R2 teal 3D', Comp: Microbiology},
  {label: 'B', name: 'Kinetic type', Comp: StyleKinetic},
  {label: 'C', name: 'Whiteboard', Comp: StyleWhiteboard},
  {label: 'D', name: 'Paper cut-out', Comp: StylePaper},
  {label: 'E', name: 'Microscope glow', Comp: StyleMicroscope},
];
const Picker: React.FC = () => <StylePicker panels={PANELS} />;

const PANELS2 = [
  {label: 'F', name: '3D + kinetic', Comp: StyleHybrid},
  {label: 'G', name: 'Versus split', Comp: StyleVersus},
  {label: 'H', name: 'Cinematic 3D', Comp: StyleCinematic},
  {label: 'I', name: 'Kinetic captions', Comp: StyleCaptions},
  {label: 'J', name: 'Colour blocks', Comp: StyleBlocks},
];
const Picker2: React.FC = () => <StylePicker panels={PANELS2} />;

const PANELS3 = [
  {label: 'K', name: 'Split + kinetic', Comp: StyleSplitKinetic},
  {label: 'L', name: 'Diagonal swipe', Comp: StyleDiagonal},
  {label: 'M', name: 'Orbit parallax', Comp: StyleOrbit},
  {label: 'N', name: 'Showdown cards', Comp: StyleShowdown},
  {label: 'O', name: 'Punch edit', Comp: StylePunch},
];
const Picker3: React.FC = () => <StylePicker panels={PANELS3} />;

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
    <Folder name="Style-picker">
      <Composition id="STYLE-Picker" component={Picker} durationInFrames={STYLE_FRAMES} fps={FPS} width={PICKER_W} height={PICKER_H} />
      <Composition id="STYLE-B-Kinetic" component={StyleKinetic} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-C-Whiteboard" component={StyleWhiteboard} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-D-Paper" component={StylePaper} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-E-Microscope" component={StyleMicroscope} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-Picker2" component={Picker2} durationInFrames={STYLE_FRAMES} fps={FPS} width={PICKER_W} height={PICKER_H} />
      <Composition id="STYLE-F-Hybrid" component={StyleHybrid} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-G-Versus" component={StyleVersus} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-H-Cinematic" component={StyleCinematic} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-I-Captions" component={StyleCaptions} durationInFrames={CAPTION_FRAMES} {...common} />
      <Composition id="STYLE-J-Blocks" component={StyleBlocks} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-Picker3" component={Picker3} durationInFrames={STYLE_FRAMES} fps={FPS} width={PICKER_W} height={PICKER_H} />
      <Composition id="STYLE-K-SplitKinetic" component={StyleSplitKinetic} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-L-Diagonal" component={StyleDiagonal} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-M-Orbit" component={StyleOrbit} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-N-Showdown" component={StyleShowdown} durationInFrames={STYLE_FRAMES} {...common} />
      <Composition id="STYLE-O-Punch" component={StylePunch} durationInFrames={STYLE_FRAMES} {...common} />
    </Folder>
    <Folder name="Tests">
      <Composition id="TEST-ArabicShaping" component={ArabicShapingTest} durationInFrames={ARABIC_FRAMES} {...common} />
    </Folder>
  </>
);
