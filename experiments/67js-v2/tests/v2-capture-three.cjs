'use strict';
const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('fs');const path=require('path');
const out=path.resolve(__dirname,'../evidence');fs.mkdirSync(out,{recursive:true});
const candidates=[
 {id:'original',url:'https://james3014.github.io/3d-snow-safety-world/scene-01-speed.html',selector:'#viewport'},
 {id:'v1',url:'https://james3014.github.io/3d-snow-safety-world/67js/',selector:'#stage'},
 {id:'v2',url:process.env.V2_URL||'http://127.0.0.1:8398/',selector:'#stage'}
];
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});const info=[];const errors=[];
try{for(const c of candidates){const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});p.on('pageerror',e=>errors.push(c.id+': '+e.message));await p.goto(c.url,{waitUntil:'domcontentloaded',timeout:17000});await p.waitForFunction(id=>id==='original'?window.__snow?.status?.()?.renderMode==='webgl':window.__pilot?.status?.()?.frameCount>0,c.id,{timeout:14000});
const changeView=async(v)=>{if(c.id==='original')await p.evaluate(x=>window.__proof.setView(x),v);else await p.locator(`[data-view="${v}"]`).count()?await p.locator(`[data-view="${v}"]`).click():await p.locator('#view'+v[0].toUpperCase()+v.slice(1)).click();};
const decision=async()=>{if(c.id==='original')await p.evaluate(()=>window.__snow.debug.seek('DECISION',null,1));else if(c.id==='v2')await p.evaluate(()=>window.__pilot.debug.seek('DECISION',null,1));else await p.evaluate(()=>window.__pilot.setPhase('DECISION'));};
const status=async()=>p.evaluate(id=>id==='original'?window.__snow.status():window.__pilot.status(),c.id);
const capture=async(name)=>{await p.waitForTimeout(240);const f=`${c.id}-${name}.png`;await p.locator(c.selector).screenshot({path:path.join(out,f)});info.push({id:c.id,state:name,file:f,status:(await status()).phase,mode:c.id==='original'?(await p.evaluate(()=>window.__proof.getStatus().mode)):(await status()).mode,bytes:fs.statSync(path.join(out,f)).size});};
await decision();for(const v of ['top','side','eye']){await changeView(v);await capture('decision-'+v)}
if(c.id==='original'){await p.locator('#lookDown').click();await capture('lookdown');}
if(c.id==='v2'){await p.locator('#lookDown').click();await capture('lookdown');}
for(const br of 'ABC'){
 if(c.id==='original'){await p.evaluate(b=>window.__snow.debug.seek('RESULT',b,1),br);}
 else if(c.id==='v2')await p.evaluate(b=>window.__pilot.debug.seek('RESULT',b,1),br);
 else{await p.evaluate(()=>window.__pilot.setPhase('DECISION'));await p.locator(`[data-branch="${br}"]`).click();await p.waitForFunction(x=>window.__pilot?.status()?.phase==='RESULT'&&window.__pilot?.status()?.branch===x,br,{timeout:8000});}
 await changeView('top');await capture('result-'+br);
}
await p.close();console.log('CAPTURED',c.id,info.filter(x=>x.id===c.id).map(x=>x.state));}
assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'evidence-index.json'),JSON.stringify({created:new Date().toISOString(),info,errors},null,2));console.log('PASS',info.length,errors);
}finally{await browser.close();}})().catch(e=>{console.error('CAPTURE_ERROR',e);process.exitCode=1});
