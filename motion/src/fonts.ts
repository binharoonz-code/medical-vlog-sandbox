import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// loadFont() holds the render (delayRender) until each face is ready, so no
// frame is captured with a fallback font.
for (const weight of ['400', '600', '700']) {
  loadFont({family: 'AGLatin', url: staticFile(`fonts/plex-latin-${weight}.woff2`), weight});
  loadFont({family: 'AGArabic', url: staticFile(`fonts/plex-arabic-${weight}.woff2`), weight});
}

// Handwriting face for the whiteboard style (Caveat, SIL OFL).
loadFont({family: 'AGHand', url: staticFile('fonts/caveat-700.woff2'), weight: '700'});

// Heavy display face for word-by-word kinetic type (Montserrat, SIL OFL).
for (const weight of ['800', '900']) {
  loadFont({family: 'AGPunch', url: staticFile(`fonts/montserrat-latin-${weight}.woff2`), weight});
}
