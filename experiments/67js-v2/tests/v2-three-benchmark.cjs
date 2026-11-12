'use strict';
const {chromium}=require('playwright-core'),fs=require('fs'),path=require('path');
const ROOT=process.env.V2_URL||'http://127.0.0.1:8398/';
const out=path.resolve(__dirname,'../evidence');fs.mkdirSync(out,{recursive:true});
const entries=[
 {id:'original',url:'https://james3014.github.io/3d-snow-safety-world/scene-01-speed.html'},
 {id:'v1',url:'https://james3014.github.io/3d-snow-safety-world/67js/'},
 {id:'v2',url:ROOT}
];
function median(xs){const a=[...xs].sort((a,b)=>a-b),q=a.length>>1;return a.length%2?a[q]:(a[q-1]+a[q])/2;}
function p95(xs){const a=[...xs].sort((a,b)=>a-b);return a[Math.floor((a.length-1)*.95)];}
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});const rows=[];try{
 for(const [w,h,n] of [[390,844,4],[1280,820,2]])for(let k=0;k<n;k++){
  const seq=k%2?entries.slice().reverse():[entries[2],entries[0],entries[1]];
  for(const {id,url} of seq){const p=await browser.newPage({viewport:{width:w,height:h},isMobile:w<700,hasTouch:w<700,deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));const devtools=await p.context().newCDPSession(p);await devtools.send('Performance.enable');await devtools.send('Network.enable');await devtools.send('Network.setCacheDisabled',{cacheDisabled:true});
   const t0=performance.now();await p.goto(url,{waitUntil:'domcontentloaded',timeout:19000});await p.waitForFunction(v=>v==='original'?window.__snow?.status?.()?.renderMode==='webgl':window.__pilot?.status?.()?.frameCount>0,id,{timeout:16000});const readyMs=performance.now()-t0;
   const dims=await p.evaluate(v=>{const el=document.querySelector(v==='original'?'#gl':'#scene'),nav=performance.getEntriesByType('navigation')[0],r=performance.getEntriesByType('resource');return {canvas:[el.width,el.height],css:[el.getBoundingClientRect().width,el.getBoundingClientRect().height],transfer:[nav,...r].reduce((s,x)=>s+x.transferSize,0),bytesCompressed:[nav,...r].reduce((s,x)=>s+x.encodedBodySize,0),requests:1+r.length,visible:document.visibilityState}},id);
   if(id==='original')await p.evaluate(()=>window.__snow.debug.seek('DECISION',null,1));else await p.evaluate(()=>window.__pilot.setPhase('DECISION'));
   const before=Object.fromEntries((await devtools.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
   await p.evaluate(()=>{window.__v2FrameDeltas=[];let prev=null;const fn=t=>{if(prev!==null)window.__v2FrameDeltas.push(t-prev);prev=t;if(window.__v2FrameDeltas.length<210)requestAnimationFrame(fn)};requestAnimationFrame(fn)});
   const running=performance.now();if(id==='original')await p.evaluate(()=>window.__snow.choose('B'));else await p.evaluate(()=>window.__pilot.choose('B'));
   await p.waitForTimeout(2600);
   const elapsed=performance.now()-running,after=Object.fromEntries((await devtools.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
   const frames=(await p.evaluate(()=>window.__v2FrameDeltas)).slice(5),cpu=(after.TaskDuration-before.TaskDuration)*1000/elapsed*100;
   const obj={id,w,h,run:k,readyMs:+readyMs.toFixed(1),transferBytes:dims.transfer,compressedBytes:dims.bytesCompressed,requests:dims.requests,canvas:dims.canvas,cssCanvas:dims.css,visible:dims.visible,cpuBusyPct:+cpu.toFixed(2),jsHeapMiB:+(after.JSHeapUsedSize/1024/1024).toFixed(2),rafP95Ms:+p95(frames).toFixed(2),rafOver25Pct:+(100*frames.filter(x=>x>25).length/frames.length).toFixed(2),errors:errs};
   rows.push(obj);console.log(id,w,k,'ready',obj.readyMs,'bytes',obj.transferBytes,'cpu',obj.cpuBusyPct,'raf95',obj.rafP95Ms,'size',obj.canvas.join('x'),'error',errs.length);
   fs.writeFileSync(path.join(out,'benchmark-raw.json'),JSON.stringify(rows,null,2));await devtools.detach();await p.close();
  }
 }
 const summary=[];for(const w of [390,1280])for(const id of ['original','v1','v2']){const rr=rows.filter(r=>r.w===w&&r.id===id);const m=k=>+median(rr.map(x=>x[k])).toFixed(2);summary.push({w,id,repeats:rr.length,readyMs:m('readyMs'),transferBytes:m('transferBytes'),cpuBusyPct:m('cpuBusyPct'),jsHeapMiB:m('jsHeapMiB'),rafP95Ms:m('rafP95Ms'),rafOver25Pct:m('rafOver25Pct'),canvas:rr[0].canvas,errors:rr.flatMap(x=>x.errors)});}
 fs.writeFileSync(path.join(out,'benchmark-summary.json'),JSON.stringify({created:new Date().toISOString(),host:'M5 Pro Mac; Chrome headless',metric:'Chrome CDP TaskDuration main-thread busy percentage; not GPU utilization',summary},null,2));console.log('SUMMARY',JSON.stringify(summary));
}finally{await browser.close()}})().catch(e=>{console.error('PERF ERROR',e);process.exitCode=1});
