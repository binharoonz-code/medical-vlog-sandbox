// POST: {"grain":0.05,"vignette":0.12}
// PAPER: doctor's notebook. Cream ruled page, navy ink, words are "written" in with a right-to-left wipe, keywords get a marker highlight.
const THEME = { ink: '#1B2A41', card: '#FFFFFF', cardStroke: 'rgba(27,42,65,0.28)', faint: 'rgba(27,42,65,0.10)', tag: 'rgba(27,42,65,0.4)', moonCut: '#F5F0E6',
  col: { gold: '#D98E04', teal: '#0F7C80', red: '#D62828', green: '#2B9348', white: '#1B2A41' } };
function themeBg(ctx, t) {
  const X = ctx.X; X.fillStyle = '#F5F0E6'; X.fillRect(0, 0, 1080, 1920);
  X.save(); X.strokeStyle = 'rgba(70,120,200,0.17)'; X.lineWidth = 2;
  for (let y = 250; y < 1920; y += 64) { X.beginPath(); X.moveTo(0, y); X.lineTo(1080, y); X.stroke(); }
  X.strokeStyle = 'rgba(214,40,40,0.33)'; X.lineWidth = 3; X.beginPath(); X.moveTo(990, 0); X.lineTo(990, 1920); X.stroke(); X.restore();
  ctx.text(X, 'مسودة للمراجعة', 960, 200, { family: 'body', weight: 400, size: 30, color: T().tag, align: 'right' });
}
const MARK = { red: 'rgba(255,107,107,0.45)', green: 'rgba(87,204,153,0.45)', teal: 'rgba(72,202,228,0.42)', gold: 'rgba(255,214,10,0.55)' };
function themeLine(ctx, t, id, y, o = {}) {
  const { X } = ctx; const ws = ctx.wordsOf(id); const span = ctx.lineSpan(id);
  const out = o.out != null ? ctx.at(t, o.out, o.out + 0.25, 'cubicIn') : 0;
  if (out >= 1 || t < ws[0].s - 0.12) return null;
  const L = ctx.text.layout(X, span.text, { family: 'body', weight: 800, size: o.size || 86, maxWidth: 900, lineHeight: 1.3 });
  const isHot = word => (o.hot || []).some(h => word.includes(h));
  const hc = Object.keys(COL).find(k => col(k) === o.hotColor) || 'gold';
  const boxes = ctx.text.drawLayout(X, L, 540, y, { align: 'center', perWord: () => ({ skip: true }) });
  X.save(); X.globalAlpha = 1 - out;
  boxes.forEach(b => { if (!isHot(b.text)) return; const w = ws[b.i] || ws[ws.length - 1], k = ctx.at(t, w.s + 0.1, w.s + 0.45, 'cubicOut'); if (k <= 0) return;
    X.fillStyle = MARK[hc] || MARK.gold; const ww = (b.w + 24) * k; X.save(); X.translate(0, 0); X.beginPath(); X.moveTo(b.x + b.w + 12, b.base - L.size * 0.62);
    X.lineTo(b.x + b.w + 12 - ww, b.base - L.size * 0.58); X.lineTo(b.x + b.w + 12 - ww, b.base + L.size * 0.14); X.lineTo(b.x + b.w + 12, b.base + L.size * 0.1); X.closePath(); X.fill(); X.restore(); });
  X.restore();
  return ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: T().ink, perWord: (i, word) => {
    const w = ws[i] || ws[ws.length - 1]; const k = ctx.at(t, w.s - 0.08, w.s + 0.22, 'cubicOut');
    if (k <= 0) return { alpha: 0 };
    return { reveal: k, alpha: 1 - out, dy: -out * 40, color: isHot(word) ? o.hotColor : undefined };
  } });
}
