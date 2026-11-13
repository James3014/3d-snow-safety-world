'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const qa=process.env.RIG_QA_DIR||path.join(process.env.HOME,'workspace/3d-snow-safety-rig-preview-20261113/qa');
const out=path.resolve('docs/rig-issue7-evidence');
fs.mkdirSync(out,{recursive:true});
const asData=file=>'data:image/png;base64,'+fs.readFileSync(path.join(qa,file)).toString('base64');
const rows=[['04 人多時控速','04','side'],['01 坡頂盲區','01','top'],['09 纜車出口','09','side']];
function html(width,scenes=rows){
 const cards=scenes.map(([label,n,view])=>'<h2>'+label+'｜'+(width===390?'390px':width+'px')+'｜'+view+'</h2><div class="pair">'+
  ['legacy','geometric'].map((rig,i)=>'<figure><figcaption>'+(i?'新：白色幾何人形':'舊：原角色')+'</figcaption><img src="'+asData('rig-'+n+'-'+width+'-'+view+'-B-mid-'+rig+'.png')+'"></figure>').join('')+
  '</div>').join('');
 return '<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><style>'+
 '*{box-sizing:border-box}body{margin:0;padding:18px;background:#f0f6fa;color:#214b63;font:15px -apple-system,sans-serif}h1{margin:0 0 12px;font-size:25px}h2{font-size:17px;margin:17px 0 9px}p{font-size:13px;color:#56758a}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}figure{background:white;border:1px solid #cadee8;border-radius:14px;overflow:hidden;margin:0;padding:7px}figcaption{font-weight:700;padding:6px 4px}img{width:100%;height:auto;display:block}.footer{margin-top:12px;font-size:12px;color:#668397}'+
 '</style></head><body><h1>3D Snow Safety World｜Issue #7 角色 A/B 實際截圖</h1>'+
 '<p>擷取自 M4 Chrome 157 WebGL2 真實 Canvas；'+width+'px 瀏覽器視口模擬。三題畫面取分支 B 中段相同時間點，非 iPhone / Android 真機截圖。</p>'+
 cards+'<div class="footer">原始十題與公開網站維持不變；此圖為 M4 隔離試驗證據。</div></body></html>';
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  for(const width of [390,320,1280]){
   const page=await browser.newPage({viewport:{width:width===1280?1440:980,height:900},deviceScaleFactor:1});
   await page.setContent(html(width,width===390?rows:[rows[0]]),{waitUntil:'load'});
   const file=path.join(out,'rig-ab-contact-'+width+'.png');
   await page.screenshot({path:file,fullPage:true});
   console.log('SHEET',file,fs.statSync(file).size);
   await page.close();
  }
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exit(1)});
