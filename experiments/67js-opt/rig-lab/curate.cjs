'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright-core');
const QA=process.env.RIG_LAB_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-smooth-lab-preview-20261113/qa');
const URL=process.env.RIG_LAB_URL||'http://127.0.0.1:8600/';
const OUT=path.resolve(__dirname,'../../../docs/rig-issue7-evidence');
fs.mkdirSync(OUT,{recursive:true});
const src=file=>'data:image/png;base64,'+fs.readFileSync(path.join(QA,file)).toString('base64');
const modes=[['stand','front','自然站姿／正面'],['stand','side','自然站姿／側面'],['snowboard','front','單板彎膝／正面'],['snowboard','side','單板彎膝／側面'],['carve','front','轉彎重心／正面'],['carve','side','轉彎重心／側面']];
(async()=>{
 const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  const page=await b.newPage({viewport:{width:1360,height:900},deviceScaleFactor:1});
  await page.goto(URL,{waitUntil:'load',timeout:16000});
  await page.waitForFunction(()=>window.__rigLab?.status().ready,{timeout:20000});
  await page.screenshot({path:path.join(OUT,'rig-smooth-v3-before-after.png'),fullPage:true});
  await page.close();
  const gallery=await b.newPage({viewport:{width:1380,height:900},deviceScaleFactor:1});
  const cards=modes.map(([pose,view,title])=>`<figure><figcaption>${title}</figcaption><img src="${src(`smooth-v3-${pose}-${view}-dark-1280.png`)}"></figure>`).join('');
  await gallery.setContent(`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><style>*{box-sizing:border-box}body{background:#0f1827;color:#f0f4f7;font-family:-apple-system,system-ui;margin:0;padding:22px}h1{font-size:28px;margin:3px 0 10px}.meta{font-size:13px;color:#b4c4d3;margin:0 0 21px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}figure{border:1px solid #506176;background:#202d3e;margin:0;padding:10px;border-radius:13px}figcaption{padding:7px 4px;font-weight:700;font-size:15px}figure img{width:100%;display:block;border-radius:9px}.disclaimer{font-size:12px;color:#a5b5c5;margin:18px 0 0}</style><h1>V3｜單一平滑人形網格・三姿勢 × 雙視角</h1><p class="meta">M4 Chrome 67.js WebGL2 直接截圖，非生成概念圖；選擇姿勢、轉角與渲染輸出均可在獨立互動試驗室重現。</p><div class="grid">${cards}</div><p class="disclaimer">造型測試；尚未驗證教學動作、連續動畫、iPhone 真機或投入第 04 題。非第三方角色模型。</p></html>`,{waitUntil:'load'});
  const out=path.join(OUT,'rig-smooth-v3-six-views.png');
  await gallery.screenshot({path:out,fullPage:true});
  await gallery.close();
  for(const f of ['rig-smooth-v3-before-after.png','rig-smooth-v3-six-views.png'])console.log('CURATED',f,fs.statSync(path.join(OUT,f)).size);
 }finally{await b.close();}
})().catch(err=>{console.error('CURATE_FAILED',err.stack||err);process.exitCode=1});
