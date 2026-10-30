// Render the Arabic screen-hook headlines as transparent 1080x1920 PNGs (same gold stamp as the
// motion videos: Tajawal Black, top third, y=430, slight tilt) for overlay on Omni hook clips.
// usage: node make_headlines.js <fonts dir> <out dir>      (needs playwright + Chromium)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [fontsDir, outDir] = process.argv.slice(2);
const H = {
  Kill_Testosterone: '3 خطوات تدمّر Testosterone', T2_three: 'العادة رقم 1 صادمة', T3_free: 'Testosterone… ببلاش؟',
  T4_quiz: 'النوم ولا الكرش؟', Magnesium_montage: 'تاخذ Magnesium غلط؟', M1_stop: 'Magnesium: تشتريه غلط',
  M2_exam: 'Magnesium رسب هني', M3_pov: 'حبة Magnesium كل ليلة؟', M4_trend: 'الترند كذب عليك',
  MRI5_twist: 'MRI طمّنك… ولا خوّفك؟', MRI6_doctor: 'فحص ما أنصح فيه', PEP4_three: 'Peptide أونلاين؟ 3 أسئلة',
  T6_fitness: '60 أقوى من 20؟',
};
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const font = 'data:font/ttf;base64,' + fs.readFileSync(path.join(fontsDir, 'Tajawal-Black.ttf')).toString('base64');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, text] of Object.entries(H)) {
    await p.setContent(`<html><head><style>@font-face{font-family:T;src:url(${font})}
      html,body{margin:0;background:transparent;width:1080px;height:1920px}
      .s{position:absolute;left:540px;top:430px;transform:translate(-50%,-62%) rotate(-2.3deg);direction:rtl;white-space:nowrap;
         font:900 80px T;color:#FFD23F;padding:14px 40px 6px;border:12px solid #FFD23F;border-radius:24px;
         background:rgba(11,22,38,.55);text-shadow:0 6px 22px rgba(0,0,0,.5);max-width:980px}</style></head>
      <body><div class="s">${text}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready);
    const w = await p.$eval('.s', e => e.getBoundingClientRect().width);
    if (w > 1040) await p.$eval('.s', (e, k) => e.style.fontSize = Math.floor(80 * k) + 'px', 1000 / w);
    await p.screenshot({ path: path.join(outDir, name + '.png'), omitBackground: true });
    console.log('ok', name, Math.round(w));
  }
  await b.close();
})();
