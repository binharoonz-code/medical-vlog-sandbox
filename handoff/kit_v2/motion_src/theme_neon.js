// POST: {"grain":0.04,"vignette":0.45}
// NEON LAB: black HUD, moving perspective grid, glowing line-art; words glitch in with an RGB split; keywords glow pink/cyan.
const THEME = { ink: '#E8FBFF', card: 'rgba(0,245,255,0.06)', cardStroke: 'rgba(0,245,255,0.55)', faint: 'rgba(0,245,255,0.12)', tag: 'rgba(232,251,255,0.35)', moonCut: '#05060A',
  col: { gold: '#F9F871', teal: '#00F5FF', red: '#FF2E88', green: '#39FF14', white: '#E8FBFF' } };
function themeBg(ctx, t) {
  const X = ctx.X; X.fillStyle = '#05060A'; X.fillRect(0, 0, 1080, 1920);
  X.save(); X.lineWidth = 2;
  const hz = 1180;                                   // horizon of the floor grid
  for (let i = 0; i < 14; i++) { const z = ((i + (t * 0.6) % 1) / 14); const yy = hz + Math.pow(z, 2.2) * 760;
    X.strokeStyle = `rgba(255,46,136,${0.05 + 0.25 * z})`; X.beginPath(); X.moveTo(0, yy); X.lineTo(1080, yy); X.stroke(); }
  for (let i = -10; i <= 10; i++) { X.strokeStyle = 'rgba(0,245,255,0.16)'; X.beginPath(); X.moveTo(540 + i * 22, hz); X.lineTo(540 + i * 190, 1920); X.stroke(); }
  X.strokeStyle = 'rgba(0,245,255,0.05)'; for (let x = 0; x < 1080; x += 60) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, hz); X.stroke(); }
  for (let y = 0; y < hz; y += 60) { X.beginPath(); X.moveTo(0, y); X.lineTo(1080, y); X.stroke(); }
  X.fillStyle = 'rgba(255,255,255,0.025)'; for (let y = (t * 120) % 6; y < 1920; y += 6) X.fillRect(0, y, 1080, 1);   // scanlines
  X.restore();
  ctx.text(X, 'مسودة للمراجعة', 1030, 200, { family: 'body', weight: 400, size: 30, color: T().tag, align: 'right' });
}
function themeLine(ctx, t, id, y, o = {}) {
  const { X } = ctx; const ws = ctx.wordsOf(id); const span = ctx.lineSpan(id);
  const out = o.out != null ? ctx.at(t, o.out, o.out + 0.2, 'cubicIn') : 0;
  if (out >= 1 || t < ws[0].s - 0.12) return null;
  const L = ctx.text.layout(X, span.text, { family: 'body', weight: 900, size: o.size || 86, maxWidth: 900, lineHeight: 1.28 });
  const isHot = word => (o.hot || []).some(h => word.includes(h));
  const g = i => { const w = ws[i] || ws[ws.length - 1]; return t < w.s - 0.06 ? -1 : 1 - ctx.prog(t, w.s - 0.06, w.s + 0.2); };
  const jit = i => (ctx.hash01(i, Math.floor(t * 30)) - 0.5) * 26;
  [['rgba(0,245,255,0.75)', -1], ['rgba(255,46,136,0.75)', 1]].forEach(([c, d]) => ctx.text.drawLayout(X, L, 540, y, { align: 'center', perWord: i => {
    const k = g(i); if (k <= 0) return { skip: true }; return { color: c, dx: d * 10 * k + jit(i) * k, alpha: k * (1 - out) }; } }));
  return ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: T().ink, perWord: (i, word) => {
    const k = g(i); if (k === -1) return { alpha: 0 };
    const hot = isHot(word), c = hot ? o.hotColor : undefined;
    return { alpha: (1 - out) * (k > 0.5 ? 0.6 + 0.4 * Math.round(ctx.hash01(i, Math.floor(t * 40))) : 1), dx: jit(i) * k * 0.4, dy: -out * 40, color: c,
      shadow: { blur: hot ? 34 : 18, y: 0, color: hot ? o.hotColor : 'rgba(0,245,255,0.55)' } };
  } });
}
