import {Config} from '@remotion/cli/config';

// Cloud/Linux render defaults. On AG's Windows PC, delete the browser line and
// Remotion will use its own downloaded Chrome Headless Shell.
const headless = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (process.platform === 'linux') {
  Config.setBrowserExecutable(headless);
}

// Software WebGL so the Three.js scenes render without a GPU.
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(4);
