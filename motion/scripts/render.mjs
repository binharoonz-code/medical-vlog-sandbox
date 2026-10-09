// Bundle once, then render stills and/or videos.
//   node scripts/render.mjs stills                -> out/stills/*.png (contact frames)
//   node scripts/render.mjs videos [id ...]       -> out/<id>.mp4 (all if no ids)
//   node scripts/render.mjs overlay               -> out/SUGAR-EndOverlay.mov (ProRes 4444 + alpha)
import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'out');
fs.mkdirSync(path.join(out, 'stills'), {recursive: true});

const browserExecutable =
  process.platform === 'linux' ? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' : null;
const chromiumOptions = {gl: 'swangle'};

const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public')});
const comp = (id) => selectComposition({serveUrl, id, browserExecutable, chromiumOptions});

const STILLS = {
  'AB-AfterBecause': [100],
  'AB-Microbiology': [40, 200],
  'AB-Risks': [100],
  'AB-Qualification': [70],
  'AB-Closing': [45],
  'SUGAR-Molasses': [30, 115, 230, 320],
  'SUGAR-EndOverlay': [60],
  'FRUIT-Fiber': [95, 270, 455],
  'TEST-ArabicShaping': [145],
};
const VIDEOS = ['AB-GraphicsReel', 'SUGAR-Molasses', 'FRUIT-Fiber', 'TEST-ArabicShaping'];

const [mode = 'stills', ...ids] = process.argv.slice(2);

if (mode === 'stills') {
  for (const [id, frames] of Object.entries(STILLS)) {
    const composition = await comp(id);
    for (const frame of frames) {
      const output = path.join(out, 'stills', `${id}-f${frame}.png`);
      await renderStill({serveUrl, composition, frame, output, browserExecutable, chromiumOptions});
      console.log('still', output);
    }
  }
} else if (mode === 'videos') {
  for (const id of ids.length ? ids : VIDEOS) {
    const composition = await comp(id);
    const outputLocation = path.join(out, `${id}.mp4`);
    await renderMedia({
      serveUrl, composition, outputLocation, browserExecutable, chromiumOptions,
      codec: 'h264', crf: 18, pixelFormat: 'yuv420p', imageFormat: 'jpeg', jpegQuality: 92, concurrency: 4,
      onProgress: ({progress}) => { if (Math.round(progress * 100) % 25 === 0) process.stdout.write(`\r${id} ${Math.round(progress * 100)}%`); },
    });
    console.log('\nvideo', outputLocation);
  }
} else if (mode === 'overlay') {
  const composition = await comp('SUGAR-EndOverlay');
  const outputLocation = path.join(out, 'SUGAR-EndOverlay_alpha.mov');
  await renderMedia({
    serveUrl, composition, outputLocation, browserExecutable, chromiumOptions,
    codec: 'prores', proResProfile: '4444', pixelFormat: 'yuva444p10le', imageFormat: 'png', concurrency: 4,
  });
  console.log('overlay', outputLocation);
}
