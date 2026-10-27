// POST: {"grain":0.02,"vignette":0.1}
// POP: flat bright colour per scene, halftone dots, ONE giant word at a time (TikTok punch captions); keywords flip to a black box.
const THEME = { ink: '#101014', card: 'rgba(255,255,255,0.6)', cardStroke: '#101014', faint: 'rgba(16,16,20,0.13)', tag: 'rgba(16,16,20,0.45)', moonCut: '#FFD23F',
  col: { gold: '#101014', teal: '#1749FF', red: '#E5132B', green: '#078A3A', white: '#101014' } };
const POP_BG = ['#FFD23F', '#7DF9FF', '#C7F464', '#FFB4C8', '#FFFFFF', '#FFD23F', '#7DF9FF', '#C7F464', '#FFB4C8'];
function themeBg(ctx, t) {
  const X = ctx.X, i = CUR ? parseInt(CUR.id.slice(1)) - 1 : 0, c = POP_BG[i % POP_BG.length]; T().moonCut = c;
  X.fillStyle = c; X.fillRect(0, 0, 1080, 1920);
  X.save(); X.fillStyle = 'rgba(16,16,20,0.07)';
  for (let r = 0, y = 0; y < 1960; y += 46, r++) for (let x = r % 2 ? 23 : 0; x < 1100; x += 46) { X.beginPath(); X.arc(x, y, 5, 0, 6.2832); X.fill(); }
  X.restore();
  ctx.text(X, 'مسودة للمراجعة', 1030, 200, { family: 'body', weight: 400, size: 30, color: T().tag, align: 'right' });
}
function themeLine(ctx, t, id, y, o = {}) {
  const X = ctx.X, ws = ctx.wordsOf(id), span = ctx.lineSpan(id), end = o.out != null ? o.out + 0.22 : span.e + 0.6;
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i], nx = i + 1 < ws.length ? ws[i + 1].s : end;
    if (t < w.s - 0.06 || t >= nx - 0.02) continue;
    const k = ctx.at(t, w.s - 0.06, w.s + 0.16, 'backOut'), hot = (o.hot || []).some(h => w.w.includes(h)), sz = 168;
    X.save(); X.translate(540, y - 40); X.rotate(hot ? -0.035 : 0); const s = 0.55 + 0.45 * k; X.scale(s, s);
    if (hot) {
      X.font = `${sz}px "Lalezar"`; const tw = Math.min(980, X.measureText(ctx.text.westernDigits(w.w)).width);
      X.fillStyle = '#101014'; rrect(X, -tw / 2 - 36, -sz * 0.78, tw + 72, sz * 1.18, 26); X.fill();
      ctx.text(X, w.w, 0, sz * 0.24, { family: 'display', size: sz, color: T().moonCut, maxWidth: 960 });
    } else ctx.text(X, w.w, 0, sz * 0.24, { family: 'display', size: sz, color: '#101014', maxWidth: 960 });
    X.restore(); return;
  }
}
