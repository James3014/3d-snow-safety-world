'use strict';
const {chromium}=require('playwright-core');const fs=require('node:fs');const path=require('node:path');
const BASE='https://james3014.github.io/3d-snow-safety-world/';
const VARIANTS={original:BASE+'scene-01-speed.html',v1:BASE+'67js/',v2:process.env.V2_URL||'http://100.104.233.2:8398/'};
const output=path.resolve(__dirname,'../test-results/v2/three-way-benchmark.json');
const median=x=>{x=[...x].sort((a,b)=>a-b);const n=x.length;return n%2?x[Math.floor(n/2)]:(x[n/2-1]+x[n/2])/2};
const perc=(x,p)=>{x=[...x].sort((a,b)=>a-b);if(!x.length)return null;return x[Math.min(x.length-1,Math.floor((x.length-1)*p))]};
const getMetrics=async cdp=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});const rows=[];try{
 for(const w of [390,1280])for(let rep=0;rep<3;rep++){
  const order=rep%2?['v2','v1','original']:['original','v1','v2'];
  for(const key of order){
   const p=await browser.newPage({viewport:{width:w,height:w===390?844:820},deviceScaleFactor:1,isMobile:w<700,hasTouch:w<700});let errors=[];
   p.on('pageerror',e=>errors.push(e.message));const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
   const t0=performance.now();await p.goto(VARIANTS[key],{waitUntil:'domcontentloaded',timeout:18000});await p.waitForFunction(k=>k==='original'?window.__snow?.status()?.renderMode==='webgl':window.__pilot?.status()?.frameCount>0,key,{timeout:14000});const ready=performance.now()-t0;
   const transfers=await p.evaluate(()=>{const nav=performance.getEntriesByType('navigation')[0],r=performance.getEntriesByType('resource');return {bytes:[nav,...r].reduce((a,x)=>a+(x.transferSize||0),0),decodedBytes:[nav,...r].reduce((a,x)=>a+(x.decodedBodySize||0),0),count:r.length+1}});
   if(key==='original')await p.evaluate(()=>window.__snow.debug.seek('DECISION',null,1));else if(key==='v1')await p.evaluate(()=>window.__pilot.setPhase('DECISION'));else await p.evaluate(()=>window.__pilot.debug.seek('DECISION',null,1));
   await p.evaluate(()=>{window.__qaRaf=[];let prev=0;function tick(t){if(prev)window.__qaRaf.push(t-prev);prev=t;if(window.__qaRaf.length<190)requestAnimationFrame(tick)}requestAnimationFrame(tick)});
   const before=await getMetrics(cdp),start=performance.now();if(key==='original')await p.evaluate(()=>window.__snow.choose('B'));else await p.evaluate(()=>window.__pilot.choose('B'));
   await p.waitForTimeout(2350);const wall=performance.now()-start,after=await getMetrics(cdp);
   const d=await p.evaluate(k=>{const c=document.querySelector(k==='original'?'#gl':'#scene'),stats=k==='original'?window.__snow.status():window.__pilot.status();return {canvas:[c.width,c.height],phase:stats.phase,mode:stats.cameraMode||stats.mode||'top',frameCount:stats.frameCount||null,frames:window.__qaRaf||[],rendererBatches:stats.rendererBatches||null,rendererError:stats.rendererError||null}},key);
   const raf=d.frames.slice(4);const row={key,w,rep,readyMs:+ready.toFixed(1),transferBytes:transfers.bytes,decodedBytes:transfers.decodedBytes,resourceCount:transfers.count,canvas:d.canvas,phase:d.phase,batches:d.rendererBatches,busyPct:+(100000*(after.TaskDuration-before.TaskDuration)/wall).toFixed(2),jsHeapMiB:+(after.JSHeapUsedSize/1048576).toFixed(2),rafP95:+perc(raf,.95).toFixed(2),rafOver25Pct:+(raf.filter(x=>x>25).length/raf.length*100).toFixed(2),frameSamples:raf.length,rendererError:d.rendererError,errors};rows.push(row);console.log(JSON.stringify(row));fs.writeFileSync(output,JSON.stringify({rows},null,2));await cdp.detach();await p.close();
  }
 }
 const summary=[];for(const w of [390,1280])for(const key of ['original','v1','v2']){
 const r=rows.filter(x=>x.w===w&&x.key===key);summary.push({key,w,n:r.length,readyMedian:median(r.map(x=>x.readyMs)),transferMedian:median(r.map(x=>x.transferBytes)),busyMedian:median(r.map(x=>x.busyPct)),busyRange:[Math.min(...r.map(x=>x.busyPct)),Math.max(...r.map(x=>x.busyPct))],heapMedian:median(r.map(x=>x.jsHeapMiB)),rafP95Median:median(r.map(x=>x.rafP95)),jankMedian:median(r.map(x=>x.rafOver25Pct)),canvas:r[0].canvas,errors:r.flatMap(x=>x.errors)});}
 const report={time:new Date().toISOString(),host:'Mac M5 Pro 64 GB Chrome headless',urls:VARIANTS,metric:'Chrome Performance.TaskDuration during 2.35s B animation; not GPU FPS or device CPU',rows,summary};fs.writeFileSync(output,JSON.stringify(report,null,2));console.log('SUMMARY',JSON.stringify(summary,null,2));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
