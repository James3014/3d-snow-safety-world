'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const OLD=process.env.SMOOTH_PREVIOUS_URL,NEW=process.env.SMOOTH_LIVE04_URL||'http://127.0.0.1:8625/lesson04/';
if(!OLD)throw new Error('Set SMOOTH_PREVIOUS_URL to an authorized baseline 04 lesson URL');
const QA=process.env.SMOOTH_LIVE04_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-smooth-live04-qa-20261113');
const OUT=path.resolve('docs/rig-issue7-evidence/smooth-live04-v2-v3-zoom.png');
const MOBILE=path.resolve('docs/rig-issue7-evidence/smooth-live04-v2-v3-mobile.png');
fs.mkdirSync(path.dirname(OUT),{recursive:true});
const data=filepath=>'data:image/png;base64,'+fs.readFileSync(filepath).toString('base64');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 const files={};
 try{
  for(const mode of ['v2','smooth']){
   const url=mode==='v2'?OLD:NEW;
   for(const width of [1280,390]){
    const page=await browser.newPage({viewport:{width,height:width===1280?820:844},deviceScaleFactor:1});
    await page.goto(url,{waitUntil:'load',timeout:16000});
    await page.waitForFunction(()=>__pilot?.status().frameCount>0,null,{timeout:16000});
    await page.evaluate(()=>{__pilot.setRigStyle('geometric');__pilot.setView('side');__pilot.debug.seek('OUTCOME_PAUSED','B',.5)});
    if(width===1280){
     const rect=await page.locator('#scene').boundingBox();
     await page.mouse.move(rect.x+rect.width*.5,rect.y+rect.height*.5);
     for(let i=0;i<12;i++)await page.mouse.wheel(0,-250);
    }
    await page.waitForTimeout(170);
    const status=await page.evaluate(()=>__pilot.status());
    if(status.rendererError)throw new Error(mode+' renderer failed '+status.rendererError);
    const name=mode+'-04-'+width+'.png',file=path.join(QA,name);
    await page.locator('#scene').screenshot({path:file});
    files[mode+'-'+width]=file;
    await page.close();
   }
  }
  async function sheet(width,out){
   const page=await browser.newPage({viewport:{width:width===1280?1530:835,height:1300},deviceScaleFactor:1});
   const labels=width===1280?['V2｜分件幾何角色（舊候選）','V3｜單一連續曲面（造型動作接線試驗）']:['V2｜舊分件','V3｜新連續曲面'];
   const html='<html lang="zh-Hant"><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#edf5f9;padding:18px;color:#1e465c;font-family:-apple-system,system-ui,sans-serif}h1{font-size:25px;margin:0 0 8px}p{font-size:13px;margin:0 0 14px;color:#52738a;line-height:1.5}.grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}figure{margin:0;border:1px solid #c7dce6;background:white;border-radius:14px;overflow:hidden;padding:8px}figcaption{font-size:16px;font-weight:800;padding:10px 8px}img{width:100%;height:auto;display:block}.foot{margin-top:12px;font-size:12px;color:#52697a}</style></head><body><h1>Issue #7｜第 04 題 V2 → V3 實際 WebGL2 比較</h1><p>相同情境、B 分支中段、同一側視相機與觀看倍率，實際在 M4 Chrome 取自原版與新版獨立測試頁；'+width+'px 視口。新版身體是一個連續曲面，但仍未建立關節即時變形，不可視為專業滑雪動作已驗收。</p><div class="grid">'+['v2','smooth'].map((mode,i)=>'<figure><figcaption>'+labels[i]+'</figcaption><img src="'+data(files[mode+'-'+width])+'"></figure>').join('')+'</div><p class="foot">兩張角色的原始 x/y/z/yaw/lean 一致；角色細節姿勢不同，不能由截圖認定因果表達等效。正式十題和舊版均未修改。</p></body></html>';
   await page.setContent(html,{waitUntil:'load'});
   await page.screenshot({path:out,fullPage:true});
   console.log('SHEET',out,fs.statSync(out).size);
   await page.close();
  }
  await sheet(1280,OUT);await sheet(390,MOBILE);
 }finally{await browser.close();}
})().catch(err=>{console.error(err.stack||err);process.exit(1)});
