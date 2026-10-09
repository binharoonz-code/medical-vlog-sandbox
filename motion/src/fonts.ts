import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// loadFont() holds the render (delayRender) until each face is ready, so no
// frame is captured with a fallback font.
for (const weight of ['400', '600', '700']) {
  loadFont({family: 'AGLatin', url: staticFile(`fonts/plex-latin-${weight}.woff2`), weight});
  loadFont({family: 'AGArabic', url: staticFile(`fonts/plex-arabic-${weight}.woff2`), weight});
}
