// Storyboard renderer: every visual is data (DATA, injected by build_note.py). Times are absolute seconds.
const COL = { red: '#FF4D5A', gold: '#FFD23F', green: '#3DDC84', teal: '#2EC4B6', white: '#F7F9FC', mute: '#8DA2BC' };
const col = c => (T().col || {})[c] || COL[c] || c || T().ink;

// ── icons: drawn around (0,0), roughly 200px tall at s=1
const ICON = {
  ice(X, t) { X.save(); X.rotate(-0.12); rrect(X, -80, -80, 160, 160, 26); X.fillStyle = 'rgba(160,230,255,0.25)'; X.fill(); X.stroke();
    X.beginPath(); X.moveTo(-50, -40); X.lineTo(-10, -60); X.stroke(); X.restore();
    X.save(); X.translate(90, 70); X.rotate(0.2); rrect(X, -45, -45, 90, 90, 18); X.fillStyle = 'rgba(160,230,255,0.2)'; X.fill(); X.stroke(); X.restore(); },
  dumbbell(X) { rrect(X, -90, -14, 180, 28, 10); X.stroke(); [-1, 1].forEach(d => { rrect(X, d * 90 - (d > 0 ? 0 : 36), -60, 36, 120, 10); X.stroke(); rrect(X, d * 130 - (d > 0 ? 0 : 28), -42, 28, 84, 8); X.stroke(); }); },
  phone(X, t) { rrect(X, -70, -120, 140, 240, 24); X.stroke(); X.beginPath(); X.moveTo(-20, -100); X.lineTo(20, -100); X.stroke();
    X.save(); X.globalAlpha *= 0.7; for (let i = 0; i < 4; i++) { const y = -70 + (((i * 45 - t * 120) % 180) + 180) % 180; rrect(X, -45, y, 90, 30, 6); X.fillStyle = COL.teal; X.fill(); } X.restore(); },
  toilet(X) { X.beginPath(); X.ellipse(0, 20, 95, 40, 0, 0, 6.2832); X.stroke(); rrect(X, -70, -120, 140, 90, 16); X.stroke();
    X.beginPath(); X.moveTo(-60, 55); X.quadraticCurveTo(0, 140, 60, 55); X.stroke(); X.beginPath(); X.moveTo(-40, 110); X.lineTo(40, 110); X.stroke(); },
  clock(X, t, o = {}) { X.beginPath(); X.arc(0, 0, 100, 0, 6.2832); X.stroke();
    for (let i = 0; i < 12; i++) { const a = i * 0.5236; X.beginPath(); X.moveTo(Math.sin(a) * 82, -Math.cos(a) * 82); X.lineTo(Math.sin(a) * 92, -Math.cos(a) * 92); X.stroke(); }
    const h = o.hour ?? ((t * (o.speed || 0)) % 12), m = o.minute ?? ((h % 1) * 60);
    const ha = (h % 12) / 12 * 6.2832, ma = m / 60 * 6.2832;
    X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(ha) * 50, -Math.cos(ha) * 50); X.stroke();
    X.save(); X.strokeStyle = COL.teal; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(ma) * 75, -Math.cos(ma) * 75); X.stroke(); X.restore(); },
  moon(X) { X.save(); X.fillStyle = COL.gold; X.beginPath(); X.arc(0, 0, 90, 0, 6.2832); X.fill(); X.fillStyle = T().moonCut; X.beginPath(); X.arc(40, -30, 82, 0, 6.2832); X.fill(); X.restore(); },
  sun(X, t) { X.save(); X.fillStyle = COL.gold; X.strokeStyle = COL.gold; X.beginPath(); X.arc(0, 0, 55, 0, 6.2832); X.fill();
    for (let i = 0; i < 8; i++) { const a = i * 0.785 + t * 0.4; X.beginPath(); X.moveTo(Math.cos(a) * 75, Math.sin(a) * 75); X.lineTo(Math.cos(a) * 100, Math.sin(a) * 100); X.stroke(); } X.restore(); },
  plane(X) { X.beginPath(); X.moveTo(-120, 0); X.lineTo(110, 0); X.quadraticCurveTo(135, 0, 110, 12); X.lineTo(-120, 12); X.closePath(); X.stroke();
    X.beginPath(); X.moveTo(10, 6); X.lineTo(-40, 90); X.lineTo(-10, 90); X.lineTo(50, 6); X.stroke(); X.beginPath(); X.moveTo(10, 6); X.lineTo(-40, -80); X.lineTo(-10, -80); X.lineTo(50, 6); X.stroke();
    X.beginPath(); X.moveTo(-100, 4); X.lineTo(-125, -40); X.lineTo(-105, -40); X.lineTo(-80, 4); X.stroke(); },
  bus(X) { rrect(X, -130, -80, 260, 150, 24); X.stroke(); [-80, -20, 40].forEach(x => { rrect(X, x - 10, -60, 50, 50, 8); X.stroke(); });
    [-70, 70].forEach(x => { X.beginPath(); X.arc(x, 78, 24, 0, 6.2832); X.stroke(); }); },
  coffee(X, t) { X.beginPath(); X.moveTo(-80, -40); X.lineTo(-62, 90); X.quadraticCurveTo(0, 110, 62, 90); X.lineTo(80, -40); X.closePath(); X.stroke();
    X.beginPath(); X.arc(98, 20, 30, -1.4, 1.4); X.stroke();
    X.save(); X.strokeStyle = COL.teal; [-30, 0, 30].forEach((x, i) => { X.beginPath(); for (let k = 0; k <= 10; k++) { const yy = -60 - k * 8; const xx = x + Math.sin(k * 0.7 + t * 4 + i) * 10; k ? X.lineTo(xx, yy) : X.moveTo(xx, yy); } X.stroke(); }); X.restore(); },
  bulb(X) { X.beginPath(); X.arc(0, -30, 80, 2.4, 0.74, false); X.lineTo(30, 70); X.lineTo(-30, 70); X.closePath(); X.stroke(); [90, 112].forEach(y => { X.beginPath(); X.moveTo(-28, y); X.lineTo(28, y); X.stroke(); }); },
  face(X, t, o = {}) { X.beginPath(); X.arc(0, 0, 110, 0, 6.2832); X.stroke(); X.save(); X.fillStyle = T().ink; [[-40, -25], [40, -25]].forEach(([x, y]) => { X.beginPath(); X.arc(x, y, 11, 0, 6.2832); X.fill(); }); X.restore();
    X.beginPath(); X.arc(0, 20, 45, 0.3, Math.PI - 0.3); X.stroke();
    if (o.pimple) { X.save(); X.fillStyle = COL.red; X.shadowColor = COL.red; X.shadowBlur = 18 + 8 * Math.sin(t * 5); X.beginPath(); X.arc(55, 25, 14, 0, 6.2832); X.fill(); X.restore(); } },
  toothpaste(X) { X.beginPath(); X.moveTo(-110, -40); X.lineTo(70, -45); X.lineTo(70, 45); X.lineTo(-110, 40); X.closePath(); X.stroke(); rrect(X, 70, -22, 40, 44, 8); X.stroke();
    X.save(); X.fillStyle = T().ink; X.beginPath(); X.arc(140, 0, 16, 0, 6.2832); X.fill(); X.restore(); },
  patch(X) { X.save(); X.rotate(-0.5); rrect(X, -110, -45, 220, 90, 45); X.fillStyle = 'rgba(255,220,180,0.25)'; X.fill(); X.stroke(); rrect(X, -40, -30, 80, 60, 18); X.stroke(); X.restore(); },
  concealer(X) { rrect(X, -40, -50, 80, 150, 16); X.stroke(); rrect(X, -30, -120, 60, 70, 20); X.save(); X.fillStyle = 'rgba(232,190,150,0.8)'; X.fill(); X.restore(); X.stroke(); },
  study(X) { rrect(X, -80, -105, 160, 210, 14); X.stroke(); [-60, -25, 10, 45].forEach((y, i) => { X.beginPath(); X.moveTo(-50, y); X.lineTo(i === 3 ? 10 : 50, y); X.stroke(); }); },
  alarm(X, t) { X.save(); X.rotate(Math.sin(t * 30) * 0.08); X.beginPath(); X.arc(0, 10, 90, 0, 6.2832); X.stroke(); [-1, 1].forEach(d => { X.beginPath(); X.arc(d * 70, -70, 30, 0, 6.2832); X.stroke(); });
    X.beginPath(); X.moveTo(0, 10); X.lineTo(0, -40); X.moveTo(0, 10); X.lineTo(35, 30); X.stroke(); X.restore(); },
  suitcase(X) { rrect(X, -110, -70, 220, 160, 20); X.stroke(); rrect(X, -40, -110, 80, 40, 12); X.stroke(); X.beginPath(); X.moveTo(-50, -70); X.lineTo(-50, 90); X.moveTo(50, -70); X.lineTo(50, 90); X.stroke(); },
  bed(X) { X.beginPath(); X.moveTo(-130, 60); X.lineTo(-130, -60); X.moveTo(-130, 20); X.lineTo(130, 20); X.lineTo(130, 60); X.stroke(); rrect(X, -110, -20, 60, 40, 14); X.stroke(); rrect(X, -40, -30, 160, 50, 16); X.stroke(); },
  ivbag(X, t) { ivBag({ text: (...a) => {} }, X, 0, -170, 0.9, t); },
  mri(X) { X.beginPath(); X.arc(0, -20, 115, 0, 6.2832); X.stroke(); X.beginPath(); X.arc(0, -20, 60, 0, 6.2832); X.stroke();
    rrect(X, -170, 70, 340, 26, 10); X.stroke(); X.beginPath(); X.moveTo(-120, 96); X.lineTo(-120, 140); X.moveTo(120, 96); X.lineTo(120, 140); X.stroke(); },
  vial(X) { rrect(X, -55, -125, 110, 36, 8); X.stroke(); rrect(X, -42, -88, 84, 190, 20); X.stroke();
    X.save(); X.fillStyle = 'rgba(46,196,182,0.45)'; rrect(X, -34, 0, 68, 94, 14); X.fill(); X.restore();
    [-40, -10].forEach(y => { X.beginPath(); X.moveTo(-42, y); X.lineTo(-18, y); X.stroke(); }); },
  syringe(X) { rrect(X, -110, -30, 170, 60, 10); X.stroke(); X.beginPath(); X.moveTo(-110, 0); X.lineTo(-165, 0); X.moveTo(-165, -32); X.lineTo(-165, 32);
    X.moveTo(60, -14); X.lineTo(85, -14); X.lineTo(85, 14); X.lineTo(60, 14); X.moveTo(85, 0); X.lineTo(165, 0); X.stroke();
    [-70, -40, -10, 20].forEach(x => { X.beginPath(); X.moveTo(x, -30); X.lineTo(x, -12); X.stroke(); }); },
  muscle(X) { X.beginPath(); X.moveTo(-110, 60); X.quadraticCurveTo(-120, -10, -60, -30); X.quadraticCurveTo(-40, -110, 10, -90); X.quadraticCurveTo(40, -80, 20, -50);
    X.quadraticCurveTo(80, -60, 110, 0); X.quadraticCurveTo(120, 60, 60, 70); X.closePath(); X.stroke(); },
  heart(X, t) { const b = 1 + 0.06 * Math.max(0, Math.sin(t * 7)); X.save(); X.scale(b, b); X.beginPath(); X.moveTo(0, 90);
    X.bezierCurveTo(-150, -10, -90, -130, 0, -55); X.bezierCurveTo(90, -130, 150, -10, 0, 90); X.closePath(); X.stroke(); X.restore();
    X.save(); X.strokeStyle = COL.red; X.beginPath(); X.moveTo(-70, -5); X.lineTo(-30, -5); X.lineTo(-12, -40); X.lineTo(10, 30); X.lineTo(28, -5); X.lineTo(70, -5); X.stroke(); X.restore(); },
  idcard(X) { rrect(X, -150, -95, 300, 190, 20); X.stroke(); X.beginPath(); X.arc(80, -15, 38, 0, 6.2832); X.stroke();
    X.beginPath(); X.moveTo(30, 60); X.quadraticCurveTo(80, 10, 130, 60); X.stroke(); [-40, -5, 30].forEach(y => { X.beginPath(); X.moveTo(-120, y); X.lineTo(-10, y); X.stroke(); }); },
};
// presenter slot: placeholder for AG's still photo (HeyGen talking head replaces it later)
function presenter(ctx, X, t, f) { const k = appear(ctx, t, f.at, 0.5) * (f.until ? 1 - ctx.at(t, f.until - 0.25, f.until + 0.1) : 1); if (k <= 0) return;
  const w = f.w || 620, h = f.h || 760, x = 540 - w / 2, y = f.y ?? 230;
  X.save(); X.globalAlpha *= Math.min(1, k); X.translate(540, y + h / 2); X.scale(0.9 + 0.1 * Math.min(1, k), 0.9 + 0.1 * Math.min(1, k)); X.translate(-540, -(y + h / 2));
  card(X, x, y, w, h, 1, T().faint);
  X.save(); X.beginPath(); rrect(X, x, y, w, h, 28); X.clip(); X.fillStyle = 'rgba(141,162,188,0.28)';
  X.beginPath(); X.arc(540, y + h * 0.40, h * 0.17, 0, 6.2832); X.fill();
  X.beginPath(); X.ellipse(540, y + h * 0.98, w * 0.42, h * 0.34, 0, 0, 6.2832); X.fill(); X.restore();
  ctx.text(X, f.label || 'صورة د. AG', 540, y + h - 40, { family: 'body', weight: 700, size: 40, color: COL.mute });
  X.restore(); }
function icon(ctx, X, name, x, y, s, a, t, o = {}) {
  if (a <= 0 || !ICON[name]) return;
  X.save(); X.translate(x, y); X.scale(s * (0.6 + 0.4 * a), s * (0.6 + 0.4 * a)); X.globalAlpha *= Math.min(1, a);
  X.strokeStyle = o.color ? col(o.color) : T().ink; X.lineWidth = 9 / s; X.lineCap = 'round'; X.lineJoin = 'round';
  ICON[name](X, t, o); X.restore();
}
const appear = (ctx, t, at, d = 0.4) => at == null ? 1 : ctx.at(t, at - 0.15, at + d, 'backOut');
function mark(ctx, X, kind, x, y, r, k) {
  if (kind === 'x') cross(X, x, y, r, k, col('red'), Math.max(12, r * 0.28));
  else if (kind === 'v') check(X, x, y, r, k, col('green'), Math.max(12, r * 0.3));
  else if (kind === '!' && k > 0) { X.save(); X.globalAlpha *= Math.min(1, k * 2); ctx.text(X, '!', x, y + r * 0.6, { family: 'num', weight: 900, size: r * 2.2, color: col('gold'), dir: 'ltr' }); X.restore(); }
}

const FX = {
  presenter,
  icon(ctx, X, t, f) { icon(ctx, X, f.name, f.x ?? 540, f.y ?? 640, f.s ?? 1.3, appear(ctx, t, f.at) * (f.until ? 1 - ctx.at(t, f.until - 0.2, f.until + 0.2) : 1), t, f);
    if (f.markAt != null) mark(ctx, X, f.mark || 'x', f.x ?? 540, f.y ?? 640, (f.s ?? 1.3) * 120, ctx.at(t, f.markAt, f.markAt + 0.4)); },
  stamp(ctx, X, t, f) { const fade = f.until ? 1 - ctx.at(t, f.until - 0.3, f.until) : 1; if (fade <= 0) return;
    stamp(ctx, X, f.text, f.x ?? 540, f.y ?? 760, f.at, t, { size: f.size || 140, color: col(f.color || 'red'), alpha: fade, rot: f.rot }); },
  counter(ctx, X, t, f) { const k = appear(ctx, t, f.at, 0.5); if (k <= 0) return;
    X.save(); X.translate(f.x ?? 540, f.y ?? 700); X.scale(k, k);
    ctx.text(X, f.text, 0, 0, { family: f.family || 'num', weight: 900, size: f.size || 200, color: col(f.color || 'gold'), dir: f.dir || 'ltr', shadow: { blur: 30, y: 8, color: 'rgba(0,0,0,.4)' } });
    if (f.sub) ctx.text(X, f.sub, 0, 90, { family: 'body', weight: 700, size: 56, color: T().ink });
    X.restore(); },
  eq(ctx, X, t, f) { const y = f.y ?? 640;
    [['a', 800, f.colA || 'teal'], ['op', 540, f.colOp || 'red'], ['b', 280, f.colB || 'gold']].forEach(([k, x, c]) => {
      const a = appear(ctx, t, f['at' + k[0].toUpperCase() + k.slice(1)] ?? f.at); if (a <= 0 || !f[k]) return;
      X.save(); X.translate(x, y); X.scale(a, a);
      ctx.text(X, f[k], 0, 30, { family: k === 'op' ? 'num' : 'body', weight: 900, size: k === 'op' ? 170 : (f.size || 80), color: col(c), dir: k === 'op' ? 'ltr' : 'rtl', maxWidth: 420 });
      X.restore(); });
    if (f.sub) { const a = appear(ctx, t, f.atSub ?? f.atB); if (a > 0) ctx.text(X, f.sub, 540, y + 170, { family: 'body', weight: 700, size: 52, color: COL.mute, alpha: Math.min(1, a) }); } },
  cards(ctx, X, t, f) { const n = f.items.length, h = f.h || (n > 3 ? 140 : 170), gap = 28, y0 = f.y ?? 420;
    f.items.forEach((it, i) => { const k = ctx.at(t, it.at - 0.2, it.at + 0.3, 'expoOut'); if (k <= 0) return;
      const y = y0 + i * (h + gap), x = 140 + (1 - k) * 260;
      card(X, x, y, 800, h, k, it.mark === 'v' && it.markAt != null && t > it.markAt ? 'rgba(61,220,132,0.10)' : undefined);
      ctx.text(X, it.label, x + 760, y + h / 2 + 22, { family: 'body', weight: 900, size: it.size || 58, color: T().ink, align: 'right', alpha: k, maxWidth: it.icon ? 480 : 600 });
      if (it.icon) icon(ctx, X, it.icon, x + 200, y + h / 2, 0.42, k, t, it);
      if (it.mark) mark(ctx, X, it.mark, x + 80, y + h / 2, h * 0.3, it.markAt == null ? 0 : ctx.at(t, it.markAt, it.markAt + 0.4));
    }); },
  pair(ctx, X, t, f) { const y = f.y ?? 470;
    f.items.forEach((it, i) => { const cx = i === 0 ? 760 : 320, k = appear(ctx, t, it.at); if (k <= 0) return;
      X.save(); X.translate(cx, y + 290); X.scale(Math.min(1, k), Math.min(1, k)); X.translate(-cx, -(y + 290));
      card(X, cx - 190, y, 380, 580, 1, it.tint === 'green' && it.markAt != null && t > it.markAt ? 'rgba(61,220,132,0.10)' : undefined);
      if (it.icon) icon(ctx, X, it.icon, cx, y + 240, 0.9, 1, t, it);
      ctx.text(X, it.label, cx, y + 500, { family: 'body', weight: 900, size: it.size || 60, color: T().ink, maxWidth: 340 });
      X.restore();
      if (it.mark) mark(ctx, X, it.mark, cx, y + 240, 140, it.markAt == null ? 0 : ctx.at(t, it.markAt, it.markAt + 0.4));
    }); },
  gauge(ctx, X, t, f) { const show = appear(ctx, t, f.at, 0.6), x0 = 140, w = 800, y = f.y ?? 560; if (show <= 0) return;
    ctx.text(X, f.label, 540, y - 60, { family: 'body', weight: 700, size: 52, color: COL.mute, alpha: Math.min(1, show) });
    card(X, x0, y, w, 90, Math.min(1, show), T().faint);
    if (f.zone) { X.save(); X.globalAlpha = 0.3 * Math.min(1, show); X.fillStyle = COL.green; rrect(X, x0 + w - w * f.zone[1], y, w * (f.zone[1] - f.zone[0]), 90, 0); X.fill(); X.restore(); }
    const lvl = ctx.kf(t, f.keys.map(([a, v]) => [a, v, 'cubicInOut']));
    X.save(); X.globalAlpha = Math.min(1, show); X.fillStyle = lvl < (f.low ?? 0.4) ? COL.red : col(f.color || 'green');
    rrect(X, x0 + w - 8 - (w - 16) * lvl, y + 8, (w - 16) * lvl, 74, 20); X.fill(); X.restore();
    (f.notes || []).forEach(n => { const a = ctx.at(t, n.at, n.at + 0.3) * (n.until ? 1 - ctx.at(t, n.until, n.until + 0.3) : 1);
      if (a > 0) ctx.text(X, n.text, n.x ?? 540, y + 170, { family: 'body', weight: 900, size: 56, color: col(n.color || 'red'), alpha: a }); }); },
  week(ctx, X, t, f) { const y = f.y ?? 760, show = appear(ctx, t, f.at, 0.5); if (show <= 0) return;
    const names = f.names || ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'], bw = 104, gap = 16, total = 7 * bw + 6 * gap, xr = 540 + total / 2;
    names.forEach((nm, i) => { const x = xr - (i + 1) * bw - i * gap;
      let h = 0.25, c = T().faint;
      (f.phases || []).forEach(p => { if (p.days.includes(i)) { const k = ctx.at(t, p.at + i * 0.06, p.at + i * 0.06 + 0.4, 'backOut'); if (k > 0) { h = 0.25 + (p.h - 0.25) * k; c = col(p.color); } } });
      X.save(); X.globalAlpha = Math.min(1, show); X.fillStyle = c; rrect(X, x, y - 300 * h, bw, 300 * h, 16); X.fill(); X.restore();
      ctx.text(X, nm, x + bw / 2, y + 60, { family: 'body', weight: 700, size: 34, color: COL.mute, alpha: Math.min(1, show) });
      if (f.crossAt != null && (f.crossDays || []).includes(i)) cross(X, x + bw / 2, y - 60, 34, ctx.at(t, f.crossAt + i * 0.08, f.crossAt + i * 0.08 + 0.3), COL.red, 10);
    });
    if (f.caption) ctx.text(X, f.caption, 540, y - 360, { family: 'body', weight: 700, size: 52, color: COL.mute, alpha: Math.min(1, show) }); },
  clock(ctx, X, t, f) { const a = appear(ctx, t, f.at); if (a <= 0) return;
    const h = f.h1 == null ? f.h0 : f.h0 + (f.h1 - f.h0) * ctx.at(t, f.at1, f.at1 + 1.2, 'cubicInOut');
    icon(ctx, X, 'clock', f.x, f.y ?? 640, f.s ?? 1.1, a, t, { hour: h, minute: (h % 1) * 60 });
    if (f.label) ctx.text(X, f.label, f.x, (f.y ?? 640) + 190, { family: 'body', weight: 900, size: 56, color: T().ink, alpha: Math.min(1, a) });
    if (f.time) { const tt = typeof f.time === 'string' ? f.time : f.time[ctx.at(t, f.at1 ?? 1e9, (f.at1 ?? 1e9) + 1.2) > 0.5 ? 1 : 0];
      ctx.text(X, tt, f.x, (f.y ?? 640) - 150, { family: 'body', weight: 900, size: 50, color: COL.gold, alpha: Math.min(1, a) }); } },
  daybar(ctx, X, t, f) { const y = f.y ?? 700, x0 = 230, w = 620, show = appear(ctx, t, f.at, 0.5); if (show <= 0) return;
    X.save(); X.globalAlpha = Math.min(1, show); X.fillStyle = T().faint; rrect(X, x0, y, w, 40, 20); X.fill();
    const z = ctx.at(t, f.zoneAt, f.zoneAt + 0.8, 'cubicOut');
    if (z > 0) { const [a, b] = f.zone; X.fillStyle = COL.green; rrect(X, x0 + w - w * a - w * (b - a) * z, y, w * (b - a) * z, 40, 20); X.fill();
      ctx.text(X, f.zoneLabel, x0 + w - w * (a + b) / 2, y - 40, { family: 'body', weight: 900, size: 52, color: COL.green, alpha: z }); }
    X.restore();
    (f.marks || []).forEach(m => { const xx = x0 + w - w * m.pos, k = appear(ctx, t, m.at ?? f.at);
      if (m.icon) icon(ctx, X, m.icon, xx, y + 150, 0.5, k, t);
      ctx.text(X, m.label, xx, y + 260, { family: 'body', weight: 700, size: 38, color: T().ink, alpha: Math.min(1, k) }); });
    (f.notes || []).forEach(n => { const a = ctx.at(t, n.at, n.at + 0.3); if (a > 0) ctx.text(X, n.text, x0 + w - w * n.pos, y + 100, { family: 'body', weight: 900, size: 44, color: COL.gold, alpha: a }); }); },
  pills(ctx, X, t, f) { const tf = f.fallAt ?? 1e9;
    f.items.forEach((s, i) => { const [x, y] = f.pos[i], ti = f.at + i * (f.stagger ?? 0.35), a = ctx.at(t, ti, ti + 0.35, 'backOut'), d = Math.max(0, t - tf);
      pill(ctx, X, s, x, y + 900 * d * d + 150 * d + Math.sin(t * 2 + i) * 8, a * (1 - ctx.at(t, tf + 0.3, tf + 0.9)), (i % 2 ? 0.05 : -0.05) + d * (i % 2 ? 2 : -2), /^[A-Za-z]/.test(s)); });
    if (f.crossAt != null) cross(X, 540, f.crossY ?? 700, 260, ctx.at(t, f.crossAt, f.crossAt + 0.4), COL.red, 30); },
};

function renderScene(ctx, t, sc) {
  const { X } = ctx; CUR = sc; bg(ctx, t);
  const jolt = (sc.fx || []).filter(f => f.t === 'stamp' && f.shake !== false).map(f => shake(t, f.at, 22)).reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
  X.save(); X.translate(jolt[0], jolt[1]);
  (sc.fx || []).forEach(f => FX[f.t](ctx, X, t, f));
  sc.lines.forEach((id, i) => {
    const next = sc.lines[i + 1];
    line(ctx, t, id, sc.lineY || 1290, { size: sc.lineSize || 84, hot: (sc.hot || {})[id], hotColor: col((sc.hotColor || {})[id] || 'gold'), out: next ? ctx.wordTime(next, 0).s - 0.22 : null });
  });
  X.restore();
}
DATA.scenes.forEach(sc => MOTION.scene({ id: sc.id, draw(t, lt, ctx) { renderScene(ctx, t, sc); } }));
