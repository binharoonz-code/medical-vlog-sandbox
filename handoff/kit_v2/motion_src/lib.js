// Shared helpers, prepended to every scene file by build_motion.py
// Theme hook: a theme file may define `const THEME = {...}` and override bg()/line().
const TDEF = { ink: '#F7F9FC', card: 'rgba(255,255,255,0.07)', cardStroke: 'rgba(255,255,255,0.14)', faint: 'rgba(255,255,255,0.12)', tag: 'rgba(255,255,255,0.4)', moonCut: '#123150', col: {} };
let _T; function T() { return _T || (_T = Object.assign({}, TDEF, typeof THEME !== 'undefined' ? THEME : {})); }
var CUR = null;
const C = { navy: '#0B1626', navy2: '#143552', white: '#F7F9FC', teal: '#2EC4B6', gold: '#FFD23F', red: '#FF4D5A', mute: '#8DA2BC', card: 'rgba(255,255,255,0.07)', green: '#3DDC84' };

function bg(ctx, t) {
  if (typeof themeBg === 'function') return themeBg(ctx, t);
  const X = ctx.X;
  const g = X.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, C.navy); g.addColorStop(1, C.navy2);
  X.fillStyle = g; X.fillRect(0, 0, 1080, 1920);
  X.save();
  for (let i = 0; i < 46; i++) {
    const x = ctx.hash01(i, 1) * 1080, sp = 12 + 30 * ctx.hash01(i, 3);
    const y = (((ctx.hash01(i, 2) * 1920 - t * sp) % 1920) + 1920) % 1920;
    X.globalAlpha = 0.05 + 0.1 * ctx.hash01(i, 4); X.fillStyle = C.teal;
    X.beginPath(); X.arc(x, y, 2 + 4 * ctx.hash01(i, 5), 0, 6.2832); X.fill();
  }
  X.restore();
  ctx.text(X, 'مسودة للمراجعة', 1030, 200, { family: 'body', weight: 400, size: 30, color: T().tag, align: 'right' });
}

// Kinetic line: each word rises from its baseline at the moment it is spoken; hot words pop in colour.
function line(ctx, t, id, y, o = {}) {
  if (typeof themeLine === 'function') return themeLine(ctx, t, id, y, o);
  const { X } = ctx; const ws = ctx.wordsOf(id); const span = ctx.lineSpan(id);
  const out = o.out != null ? ctx.at(t, o.out, o.out + 0.25, 'cubicIn') : 0;
  if (out >= 1 || t < ws[0].s - 0.12) return null;
  const L = ctx.text.layout(X, span.text, { family: o.family || 'body', weight: o.weight || 900, size: o.size || 88, maxWidth: o.maxWidth || 900, lineHeight: 1.45 });
  return ctx.text.drawLayout(X, L, 540, y, {
    align: 'center', color: o.color || T().ink, perWord: (i, word) => {
      const w = ws[i] || ws[ws.length - 1];
      const k = ctx.at(t, w.s - 0.1, w.s + 0.22, 'expoOut');
      if (k <= 0) return { alpha: 0 };
      const hot = (o.hot || []).some(h => word.includes(h));
      const pop = hot ? ctx.E.backOut(ctx.prog(t, w.s, w.s + 0.4)) : 1;
      return { clipUp: hot ? undefined : 1, dy: (1 - k) * 90 - out * 70, alpha: 1 - out, color: hot ? (o.hotColor || C.gold) : undefined,
        scale: hot ? 0.5 + 0.5 * pop : 1, shadow: { blur: 22, y: 6, color: 'rgba(0,0,0,0.45)' } };
    }
  });
}

function rrect(X, x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function card(X, x, y, w, h, a = 1, fill, stroke) {
  if (a <= 0) return; fill = fill || T().card; stroke = stroke || T().cardStroke; X.save(); X.globalAlpha *= a; X.fillStyle = fill; rrect(X, x, y, w, h, 28); X.fill();
  X.strokeStyle = stroke; X.lineWidth = 3; X.stroke(); X.restore();
}
function cross(X, cx, cy, r, k, col = C.red, lw = 22) {
  if (k <= 0) return; const a = Math.min(1, k * 2), b = Math.max(0, k * 2 - 1);
  X.save(); X.strokeStyle = col; X.lineWidth = lw; X.lineCap = 'round'; X.shadowColor = 'rgba(0,0,0,0.4)'; X.shadowBlur = 16;
  X.beginPath(); X.moveTo(cx - r, cy - r); X.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); X.stroke();
  if (b > 0) { X.beginPath(); X.moveTo(cx + r, cy - r); X.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); X.stroke(); }
  X.restore();
}
function check(X, cx, cy, r, k, col = C.green, lw = 20) {
  if (k <= 0) return; const p = [[cx - r, cy], [cx - r * 0.3, cy + r * 0.7], [cx + r, cy - r * 0.7]];
  const a = Math.min(1, k * 2.5), b = Math.max(0, (k - 0.4) / 0.6);
  X.save(); X.strokeStyle = col; X.lineWidth = lw; X.lineCap = 'round'; X.lineJoin = 'round';
  X.beginPath(); X.moveTo(p[0][0], p[0][1]); X.lineTo(p[0][0] + (p[1][0] - p[0][0]) * a, p[0][1] + (p[1][1] - p[0][1]) * a);
  if (b > 0) X.lineTo(p[1][0] + (p[2][0] - p[1][0]) * b, p[1][1] + (p[2][1] - p[1][1]) * b);
  X.stroke(); X.restore();
}
function shake(t, t0, amp = 22) {
  const d = t - t0; if (d < 0 || d > 0.6) return [0, 0];
  const e = Math.exp(-d * 8); return [amp * e * Math.sin(d * 90), amp * e * Math.cos(d * 77)];
}
// Rubber-stamp slam: big → settles with a slight tilt.
function stamp(ctx, X, str, cx, cy, t0, t, o = {}) {
  const k = ctx.prog(t, t0, t0 + 0.22); if (k <= 0) return;
  const s = o.size || 150, sc = 2.2 - 1.2 * ctx.E.expoOut(k), col = o.color || C.red;
  X.save(); X.translate(cx, cy); X.rotate(o.rot ?? -0.07); X.scale(sc, sc); X.globalAlpha *= Math.min(1, k * 3) * (o.alpha ?? 1);
  X.font = `900 ${s}px "Tajawal"`; const tw = X.measureText(str).width;
  X.strokeStyle = col; X.lineWidth = 12; rrect(X, -tw / 2 - 40, -s * 0.95, tw + 80, s * 1.35, 24); X.stroke();
  ctx.text(X, str, 0, s * 0.1, { family: 'body', weight: 900, size: s, color: col });
  X.restore();
}
function ivBag(ctx, X, cx, top, s, t, label = 'IV') {
  const w = 240 * s, h = 320 * s, x = cx - w / 2;
  X.save(); X.lineWidth = 8 * s; X.strokeStyle = 'rgba(255,255,255,0.85)'; X.lineCap = 'round';
  X.beginPath(); X.arc(cx, top - 18 * s, 18 * s, Math.PI, 0); X.stroke();
  rrect(X, x, top, w, h, 40 * s); X.fillStyle = 'rgba(255,255,255,0.06)'; X.fill(); X.stroke();
  X.save(); rrect(X, x + 8 * s, top + 8 * s, w - 16 * s, h - 16 * s, 32 * s); X.clip();
  const lvl = top + h * 0.35 + Math.sin(t * 2.2) * 6 * s;
  X.fillStyle = 'rgba(46,196,182,0.55)'; X.beginPath(); X.moveTo(x, lvl);
  for (let i = 0; i <= 20; i++) X.lineTo(x + w * i / 20, lvl + Math.sin(i * 0.9 + t * 4) * 5 * s);
  X.lineTo(x + w, top + h); X.lineTo(x, top + h); X.closePath(); X.fill(); X.restore();
  ctx.text(X, label, cx, top + h * 0.66, { family: 'num', weight: 900, size: 72 * s, color: '#FFFFFF', dir: 'ltr' });
  X.beginPath(); X.moveTo(cx, top + h); X.lineTo(cx, top + h + 30 * s); X.stroke();
  rrect(X, cx - 22 * s, top + h + 30 * s, 44 * s, 80 * s, 12 * s); X.stroke();
  const ph = (t * 1.4) % 1; X.fillStyle = C.teal; X.globalAlpha = 1 - ph * 0.6;
  X.beginPath(); X.arc(cx, top + h + 46 * s + ph * 50 * s, 7 * s, 0, 6.2832); X.fill(); X.globalAlpha = 1;
  X.beginPath(); X.moveTo(cx, top + h + 110 * s); X.bezierCurveTo(cx, top + h + 200 * s, cx + 90 * s, top + h + 170 * s, cx + 90 * s, top + h + 260 * s); X.stroke();
  X.restore();
}
function pill(ctx, X, str, cx, cy, a, rot = 0, ltr = false) {
  if (a <= 0) return; X.save(); X.translate(cx, cy); X.rotate(rot); X.globalAlpha *= a;
  X.font = `700 50px "${ltr ? 'Inter' : 'Tajawal'}"`; const tw = X.measureText(str).width;
  rrect(X, -tw / 2 - 34, -50, tw + 68, 100, 50); X.fillStyle = 'rgba(46,196,182,0.18)'; X.fill();
  X.strokeStyle = C.teal; X.lineWidth = 4; X.stroke();
  ctx.text(X, str, 0, 17, { family: ltr ? 'num' : 'body', weight: 700, size: 50, color: T().ink, dir: ltr ? 'ltr' : 'rtl' });
  X.restore();
}
