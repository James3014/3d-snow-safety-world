'use strict';
const {chromium}=require('playwright-core');const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const OUT=path.resolve(__dirname,'../comparison-assets');fs.mkdirSync(OUT,{recursive:true});
const apps={
 original:'https://james3014.github.io/3d-snow-safety-world/scene-01-speed.html',
 v1:'https://james3014.github.io/3d-snow-safety-world/67js/',
 v2:process.env.V2_URL||'http://100.104.233.2:8398/'
};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});const rows=[];const errors=[];
try{
for(const key of ['original','v1','v2']){
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});p.on('pageerror',e=>errors.push(`${key} ${e.message}`));p.on('response',r=>{if(r.status()>=400)errors.push(`${key} ${r.status()} ${r.url()}`)});
 await p.goto(apps[key],{waitUntil:'domcontentloaded',timeout:16000});await p.waitForFunction(k=>k==='original'?window.__snow?.status()?.renderMode==='webgl':window.__pilot?.status()?.frameCount>0,key,{timeout:15000});
 const state=()=>p.evaluate(k=>k==='original'?window.__snow.status():window.__pilot.status(),key);
 const frame=key==='original'?'#viewport':'#stage';
 const mode=async v=>{if(key==='original')await p.evaluate(v=>window.__proof.setView(v),v);else await p.locator(key==='v1'?`[data-view="${v}"]`:`[data-view="${v}"]`).click();await p.waitForTimeout(170)};
 const seekDecision=async()=>{if(key==='original')await p.evaluate(()=>window.__snow.debug.seek('DECISION',null,1));else if(key==='v1')await p.evaluate(()=>window.__pilot.setPhase('DECISION'));else await p.evaluate(()=>window.__pilot.debug.seek('DECISION',null,1));await p.waitForTimeout(190)};
 const seekOutcome=async br=>{if(key==='original')await p.evaluate(br=>window.__snow.debug.seek('RESULT',br,1),br);else if(key==='v1'){await seekDecision();await p.evaluate(br=>window.__pilot.choose(br),br);await p.waitForFunction(br=>window.__pilot.status().phase==='RESULT'&&window.__pilot.status().branch===br,br,{timeout:10000})}else await p.evaluate(br=>window.__pilot.debug.seek('RESULT',br,1),br);await p.waitForTimeout(190)};
 const snap=async (slug)=>{const file=`${key}-${slug}.png`;await p.locator(frame).screenshot({path:path.join(OUT,file)});const st=await state();rows.push({key,slug,file,phase:st.phase,branch:st.branch||null,mode:key==='original'?'browser-controlled':st.mode,canvas:await p.evaluate(k=>{const c=document.querySelector(k==='original'?'#gl':'#scene');return [c.width,c.height]},key)});console.log(key,slug,'snapshot');};
 await seekDecision();for(const v of ['top','eye','side']){await mode(v);await snap('decision-'+v)}
 for(const br of ['A','B','C']){await seekOutcome(br);await mode('top');await snap('result-'+br+'-top');if(br==='C'){await mode('side');await snap('result-C-side');await mode('eye');await snap('result-C-eye')}}
 if(key!=='v1'){
  await seekDecision();await mode('eye');await p.locator('#lookDown').click();await p.waitForTimeout(170);await snap('lookdown');
  await p.locator('#lookDown').click();const expand=key==='original'?'#selfCardButton':'#selfExpand';await p.locator(expand).click();await p.waitForTimeout(180);await snap('stance-expanded');
 }
 const st=await state();console.log('ENGINE',key,JSON.stringify({phase:st.phase,mode:st.mode,edition:st.edition||null}));await p.close();
}
assert.deepEqual(errors,[]);
const report={pass:true,created:new Date().toISOString(),rootUrls:apps,viewport:'390x844 Chrome M5 headless',rows,errors};fs.writeFileSync(path.join(OUT,'capture-receipt.json'),JSON.stringify(report,null,2));console.log('CAPTURE_PASS',rows.length);
}finally{await b.close()}})().catch(e=>{console.error('CAPTURE_FAILED',e);process.exitCode=1});
