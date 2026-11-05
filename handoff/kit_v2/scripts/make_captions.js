// Render the hook's SPOKEN Arabic line as a caption PNG (transparent 1080x1920, lower third) for overlay on the hook clip,
// then it is composited with the headline PNG into overlays/<name>.png. AG, 6 Nov 2026: viewers must be able to read the line.
// usage: node make_captions.js <fonts dir> <out dir> <chrome exe>   (uses puppeteer-core from the engine's node_modules)
const puppeteer = require('C:/Users/LENOVO/vae/video-ad-editor/node_modules/puppeteer-core');
const fs = require('fs'), path = require('path');
const [fontsDir, outDir, chrome] = process.argv.slice(2);
const C = {
  Kill_Testosterone: 'التستوستيرون عندي نازل!', T2_three: 'تستوستيرون منخفض؟! أنا شو مسوي غلط؟!', T3_free: 'تستوستيرون نازل… يعني لازم أشتري هذا كله؟!',
  T4_quiz: 'التستوستيرون نازل… من الرقاد ولا من الكرش؟!', Magnesium_montage: 'المغنيسيوم ما يفيد للنوم؟! وأنا آخذه كل ليلة!', M1_stop: 'مغنيسيوم للقلق… دليل ضعيف؟! دفعت كل هذا؟!',
  M2_exam: 'المغنيسيوم رسب في النوم؟!', M3_pov: 'حبة مغنيسيوم كل ليلة… وما أرقد؟!', M4_trend: 'ترند المغنيسيوم كذب علي؟!',
  MRI5_twist: 'رحت أطمّن بالرنين… وطلع عندي شي؟!', MRI6_doctor: 'الرنين طلّع لي فحوصات زيادة؟! وأنا سليم!', PEP4_three: 'الببتيد اللي اشتريته أونلاين… للأبحاث فقط؟!',
};
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const font = 'data:font/ttf;base64,' + fs.readFileSync(path.join(fontsDir, 'Tajawal-Bold.ttf')).toString('base64');
  const b = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  for (const [name, text] of Object.entries(C)) {
    await p.setContent(`<html><head><style>@font-face{font-family:T;src:url(${font})}
      html,body{margin:0;background:transparent;width:1080px;height:1920px}
      .c{position:absolute;left:540px;top:1430px;transform:translate(-50%,-50%);direction:rtl;text-align:center;
         font:700 58px/1.35 T;color:#FFFFFF;padding:18px 36px;border-radius:22px;max-width:960px;
         background:rgba(11,22,38,.72);text-shadow:0 3px 12px rgba(0,0,0,.6)}</style></head>
      <body><div class="c">${text}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(outDir, name + '.png'), omitBackground: true });
    console.log('ok', name);
  }
  await b.close();
})();
