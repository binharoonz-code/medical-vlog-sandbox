// POST: {"grain":0.03,"vignette":0.15}
// EDITORIAL: magazine split. Deep teal-green panel on top for the graphics, cream panel below; the whole sentence sits there faded
// and lights up word by word (karaoke) with an orange underline running under the spoken word.
const THEME = { ink: '#F3E9D2', card: 'rgba(243,233,210,0.08)', cardStroke: 'rgba(243,233,210,0.25)', faint: 'rgba(243,233,210,0.14)', tag: 'rgba(243,233,210,0.45)', moonCut: '#0E3B43',
  col: { gold: '#F4A261', teal: '#2A9D8F', red: '#E76F51', green: '#8AC926', white: '#F3E9D2' } };
const ED_INK = '#0E3B43', ED_SPLIT = 1110;
function themeBg(ctx, t) {
  const X = ctx.X; const g = X.createLinearGradient(0, 0, 0, ED_SPLIT); g.addColorStop(0, '#0B2E35'); g.addColorStop(1, '#14505A');
  X.fillStyle = g; X.fillRect(0, 0, 1080, ED_SPLIT); X.fillStyle = '#F3E9D2'; X.fillRect(0, ED_SPLIT, 1080, 1920 - ED_SPLIT);
  X.fillStyle = '#E76F51'; X.fillRect(90, ED_SPLIT - 6, 900, 12);
  X.save(); X.strokeStyle = 'rgba(243,233,210,0.06)'; X.lineWidth = 2; for (let x = 90; x <= 990; x += 150) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, ED_SPLIT - 40); X.stroke(); } X.restore();
  ctx.text(X, 'مسودة للمراجعة', 1030, 200, { family: 'body', weight: 400, size: 30, color: T().tag, align: 'right' });
}
function themeLine(ctx, t, id, y, o = {}) {
  const { X } = ctx; const ws = ctx.wordsOf(id); const span = ctx.lineSpan(id);
  const out = o.out != null ? ctx.at(t, o.out, o.out + 0.2, 'cubicIn') : 0;
  const inn = ctx.at(t, ws[0].s - 0.25, ws[0].s, 'cubicOut');
  if (out >= 1 || inn <= 0) return null;
  const L = ctx.text.layout(X, span.text, { family: 'display', weight: 400, size: 96, maxWidth: 900, lineHeight: 1.3 });
  const isHot = word => (o.hot || []).some(h => word.includes(h));
  const boxes = ctx.text.drawLayout(X, L, 540, y + 30, { align: 'center', color: ED_INK, perWord: (i, word) => {
    const w = ws[i] || ws[ws.length - 1]; const k = ctx.at(t, w.s - 0.04, w.s + 0.12);
    return { alpha: (0.22 + 0.78 * k) * inn * (1 - out), dy: (1 - inn) * 30 - out * 30, color: k > 0 && isHot(word) ? '#E76F51' : undefined };
  } });
  // underline under the word being spoken
  let cur = -1; ws.forEach((w, i) => { if (t >= w.s - 0.04) cur = i; });
  const b = boxes.find(bb => bb.i === cur);
  if (b && cur >= 0) { const w = ws[cur], k = ctx.at(t, w.s - 0.04, w.s + 0.15, 'cubicOut');
    X.save(); X.globalAlpha = 1 - out; X.fillStyle = '#E76F51'; X.fillRect(b.x + b.w - b.w * k, b.base + 18, b.w * k, 9); X.restore(); }
  return boxes;
}
