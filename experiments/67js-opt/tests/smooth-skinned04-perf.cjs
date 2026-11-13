'use strict';
// M4 Chrome CDP main-thread TaskDuration; NOT GPU/phone FPS benchmark.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const HOST=process.env.SCENE04_SKIN_URL||'http://127.0.0.1:8647/lesson04/';
const BASE=process.env.SCENE04_CLASSIC_URL||'http://127.0.0.1:8597/67js-ten/lesson04/';
const OUT=process.env.SCENE04_SKIN_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-scene04-skinned-qa-20261113');
const arms=[{key:'published_classic',url:BASE,style:null},{key:'pilot_classic',url:HOST,style:'legacy'},{key:'pilot_skin_v3',url:HOST,style:'geometric'}];
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});const samples=[];try{
 for(let round=0;round<3;round++)for(const arm of arms){
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
  await page.goto(arm.url,{waitUntil:'load',timeout:18000});await page.waitForFunction(()=>window.__pilot&&__pilot.status().frameCount>0,null,{timeout:18000});
  await page.evaluate(style=>{if(style)__pilot.setRigStyle(style);__pilot.setView('side');__pilot.debug.seek('OUTCOME_PLAY','B',0);},arm.style);
  const m1=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));const start=performance.now();
  await page.waitForTimeout(2300);
  const m2=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));const elapsed=(performance.now()-start)/1000;
  const s=await page.evaluate(()=>__pilot.status());if(s.rendererError)throw Error(s.rendererError);
  const v={round,arm:arm.key,mainThreadTaskPct:+((m2.TaskDuration-m1.TaskDuration)/elapsed*100).toFixed(2),rendererBatches:s.rendererBatches,parts:s.partCount,rigStyle:s.rigStyle,progress:s.progress};samples.push(v);console.log('SAMPLE',JSON.stringify(v));
  await page.close();
 }
 const median=(v)=>v.slice().sort((a,b)=>a-b)[Math.floor(v.length/2)];
 const summary=Object.fromEntries(arms.map(a=>[a.key,{medianMainThreadTaskPct:median(samples.filter(v=>v.arm===a.key).map(x=>x.mainThreadTaskPct)),partCount:samples.find(v=>v.arm===a.key).parts,rendererBatches:samples.find(v=>v.arm===a.key).rendererBatches}]));
 const report={date:new Date().toISOString(),device:'M4 Chrome desktop, browser viewport 390x844, NOT actual phone',description:'3 interleaved runs of 2.3 seconds CDP main-thread TaskDuration; no GPU time/memory/heat or statistically reliable conclusion',samples,summary};
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'scene04-skinned-perf.json'),JSON.stringify(report,null,2));console.log('PERF_SUMMARY',JSON.stringify(summary));
}finally{await browser.close()}})().catch(e=>{console.error('PERF_FAIL',e.stack||e);process.exitCode=1});
