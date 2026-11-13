'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const OUT=process.env.RIG_QA_DIR||path.join(process.env.HOME,'workspace/3d-snow-safety-rig-preview-20261113/qa');
const arms=[
 {name:'published_legacy',url:'http://127.0.0.1:8597/67js-ten/lesson04/'},
 {name:'candidate_legacy',url:'http://127.0.0.1:8596/lesson04/',rig:'legacy'},
 {name:'candidate_geometric',url:'http://127.0.0.1:8596/lesson04/',rig:'geometric'}
];
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 const samples=[];
 try{
  // Interleave arms; same browser/build/hardware, same authored branch and viewport.
  for(let round=0;round<3;round++)for(const arm of arms){
   const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
   const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
   await page.goto(arm.url,{waitUntil:'load'});
   await page.waitForFunction(()=>window.__pilot&&window.__pilot.status().frameCount>0,null,{timeout:15000});
   await page.evaluate(rig=>{if(rig)__pilot.setRigStyle(rig);__pilot.setView('side');__pilot.debug.seek('OUTCOME_PLAY','B',0)},arm.rig||null);
   const before=await cdp.send('Performance.getMetrics');
   const first=Object.fromEntries(before.metrics.map(m=>[m.name,m.value]));
   const t0=performance.now();
   await page.waitForTimeout(2300);
   const second=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
   const seconds=(performance.now()-t0)/1000;
   const status=await page.evaluate(()=>__pilot.status());
   const busy=(second.TaskDuration-first.TaskDuration)/seconds*100;
   const rec={round,arm:arm.name,busyPct:+busy.toFixed(2),partCount:status.partCount,
    rendererBatches:status.rendererBatches,frameCount:status.frameCount,rigStyle:status.rigStyle,
    rendererError:status.rendererError};
   samples.push(rec);console.log(JSON.stringify(rec));
   await page.close();
  }
  function median(a){const b=a.slice().sort((x,y)=>x-y);return b[Math.floor(b.length/2)]}
  const grouped=Object.fromEntries(arms.map(arm=>[arm.name,{
   medianMainThreadBusyPct:median(samples.filter(x=>x.arm===arm.name).map(x=>x.busyPct)),
   samples:samples.filter(x=>x.arm===arm.name).map(x=>x.busyPct)
  }]));
  const report={method:'M4 Chrome 157 headless, 390x844, CDP TaskDuration delta / wall duration, same authored B outcome, 3 interleaved trials; not GPU/FPS/physical device',samples,grouped,date:new Date().toISOString()};
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'rig-performance-report.json'),JSON.stringify(report,null,2));
  console.log('SUMMARY',JSON.stringify(grouped));
 }finally{await browser.close();}
})().catch(e=>{console.error('PERF_FAIL',e.stack||e);process.exit(1)});
