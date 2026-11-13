'use strict';
// Curated actual M4 Chrome WebGL2 screenshots; not synthetic or generative art.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const QA=process.env.SCENE04_SKIN_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-scene04-skinned-qa-20261113');
const OUT=path.resolve('docs/rig-issue7-evidence');fs.mkdirSync(OUT,{recursive:true});
const pic=file=>'data:image/png;base64,'+fs.readFileSync(path.join(QA,file)).toString('base64');
const css=`*{box-sizing:border-box}body{margin:0;padding:22px;background:#eaf3f7;font:15px -apple-system,BlinkMacSystemFont,'Noto Sans TC',sans-serif;color:#265168}h1{font-size:26px;margin:4px 0 7px}p{font-size:13px;color:#597890;line-height:1.55}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.triple{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0;padding:9px;background:white;border:1px solid #c9dce7;border-radius:13px;overflow:hidden}figcaption{padding:6px 5px;font-weight:700}img{width:100%;display:block;height:auto}.rowtitle{font-weight:800;font-size:17px;margin:15px 0 8px}.footer{font-size:12px;color:#667e8b;margin:18px 0 0}`;
const frame=(title,data)=>(`<figure><figcaption>${title}</figcaption><img src="${pic(data)}" /></figure>`);
const html=(title,subtitle,body)=>`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><style>${css}</style><h1>${title}</h1><p>${subtitle}</p>${body}<div class="footer">2026-11-13 · M4 Chrome WebGL2 真實 Canvas · 第 04 題隔離試驗 · 未替換正式版。</div></html>`;
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});try{
 const sheets=[
  {file:'scene04-skinned-ab-mobile.png',width:1030,html:html('第 04 題｜經典角色 / V3 動態人形','390px 手機視口模擬，B 分支中段，同時間點與同相機。不是實體 iPhone 截圖。',
   ['top','side','eye'].map(view=>`<div class="rowtitle">${{top:'俯視',side:'側視',eye:'第一人稱'}[view]}</div><div class="grid">${frame('A｜原角色',`scene04-390-${view}-B-mid-classic.png`)}${frame('B｜V3 GPU 連續曲面',`scene04-390-${view}-B-mid-skin-v3.png`)}</div>`).join(''))},
  {file:'scene04-skinned-ab-desktop.png',width:1430,html:html('第 04 題｜桌面 A/B 畫面','1280×820px 視口，B 分支中段；同一情境的原始角色與 V3，與正式發布不同。',
   `<div class="grid">${frame('A｜原角色',`scene04-1280-side-B-mid-classic.png`)}${frame('B｜V3 動態連續曲面',`scene04-1280-side-B-mid-skin-v3.png`)}</div>`)},
  {file:'scene04-skinned-branch-timeline.png',width:1330,html:html('第 04 題｜三分支動作時間線','V3 真實場景側視、390px 模擬手機畫面：A/B/C 分支各三個時間點，角色源路徑沒有修改。',
   ['A','B','C'].map(br=>`<div class="rowtitle">分支 ${br}</div><div class="triple">${frame('結果起點',`scene04-motion-${br}-0-390.png`)}${frame('結果 50%',`scene04-motion-${br}-0p5-390.png`)}${frame('結果終點',`scene04-motion-${br}-1-390.png`)}</div>`).join(''))},
  {file:'scene04-skinned-gpu-proof.png',width:1300,html:html('V3 真正 GPU 關節變形｜固定根位置與相機','只測同一連續人形的形變：根位置固定。進度／傾斜改變 skin palette 而非整體位移；再次採樣相同姿態像素差 0。此為 QA 探針而非教學場景。',
   `<div class="triple">${frame('靜止姿勢','same-root-rest.png')}${frame('膝肩隨播放進度變形','same-root-bend.png')}${frame('重心傾斜與手臂補償','same-root-lean.png')}</div>`)},
  {file:'scene04-skinned-zoom.png',width:1360,html:html('第 04 題｜放大比較更容易看清人物輪廓','相同 B 分支中段與側視攝影機，使用原有滾輪縮放。V3 採白色球頭與珠灰身體，板具身份色保留。',
   `<div class="grid">${frame('原角色｜現有教學動畫',`scene04-zoom-B-legacy.png`)}${frame('V3｜GPU 蒙皮可變形連續曲面',`zoom-contrast-final.png`)}</div>`)}
 ];
 for(const sh of sheets){const page=await browser.newPage({viewport:{width:sh.width,height:900},deviceScaleFactor:1});await page.setContent(sh.html,{waitUntil:'load'});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:15000});const dest=path.join(OUT,sh.file);await page.screenshot({path:dest,fullPage:true});console.log('SHEET',sh.file,fs.statSync(dest).size);await page.close();}
}finally{await browser.close()}})().catch(e=>{console.error('CURATE_FAIL',e.stack||e);process.exitCode=1});
