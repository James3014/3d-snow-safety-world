'use strict';
const {chromium}=require('playwright-core');
const fs=require('node:fs'); const path=require('node:path'); const assert=require('node:assert/strict');
const {PNG}=require('pngjs');
const ROOT=process.env.V2_URL||'http://100.104.233.2:8398/';
const out=path.resolve(__dirname,'../test-results'); fs.mkdirSync(out,{recursive:true});
const status=p=>p.evaluate(()=>window.__pilot?.status?.());
const wait=async(p,phase,timeout=11000)=>p.waitForFunction(x=>window.__pilot?.status?.().phase===x,phase,{timeout});
function pixels(b){const x=PNG.sync.read(b),s=new Set();let chroma=0;for(let i=0;i<x.data.length;i+=4*31){const r=x.data[i],g=x.data[i+1],bl=x.data[i+2];s.add(((r>>3)<<10)+((g>>3)<<5)+(bl>>3));if(Math.max(r,g,bl)-Math.min(r,g,bl)>35)chroma++;}return {width:x.width,height:x.height,colors:s.size,chroma};}
async function main(){const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});const errors=[],rows=[];try{
 for(const [w,h] of [[320,740],[390,844],[844,390],[1280,820]]){
  const page=await b.newPage({viewport:{width:w,height:h},isMobile:w<850,hasTouch:true,deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(`${w}: JS ${e.message}`));page.on('console',e=>{if(e.type()==='error')errors.push(`${w}: Console ${e.text()}`)});
  await page.goto(ROOT,{waitUntil:'domcontentloaded',timeout:16000});await page.waitForFunction(()=>window.__pilot?.status?.().frameCount>0,{timeout:12000});let s=await status(page);
  assert.equal(s.edition,'V2');assert.equal(s.engine,'67.js');assert.equal(s.rendererError,null);
  assert.ok(s.rendererBatches>=2);assert.ok(s.partCount>100);
  const bounds=await page.evaluate(()=>({documentW:document.documentElement.scrollWidth,viewportW:document.documentElement.clientWidth,height:document.getElementById('stage').getBoundingClientRect().height}));
  assert.ok(bounds.documentW<=bounds.viewportW+1,`overflow ${w} ${JSON.stringify(bounds)}`);
  await page.evaluate(()=>window.__pilot.setPhase('DECISION'));
  for(const mode of ['top','eye','side']){
   await page.locator(`[data-view="${mode}"]`).click();let st=await status(page);assert.equal(st.mode,mode);
   const shot=await page.locator('#stage').screenshot({path:path.join(out,`v2-${w}-${mode}.png`)});const pix=pixels(shot);assert.ok(pix.colors>30,`few colors at ${w}/${mode}`);
   if(mode==='eye'){
    assert.equal(st.selfCardVisible,true);
    assert.equal(await page.locator('#selfCard').isVisible(),true);
    assert.ok((await page.locator('#selfCanvas').evaluate(x=>x.width))>0,'mini canvas has pixels');
    await page.locator('#selfExpand').click();st=await status(page);assert.equal(st.selfCardExpanded,true);
    await page.locator('#stage').screenshot({path:path.join(out,`v2-${w}-eye-expanded.png`)});
    await page.locator('#lookDown').click();st=await status(page);assert.equal(st.lookDownActive,true);
    await page.locator('#stage').screenshot({path:path.join(out,`v2-${w}-look-down.png`)});
    await page.locator('#lookDown').click();
   }
   rows.push({w,mode,pixels:pix,status:{phase:st.phase,canvas:st.canvas,self:st.selfCardVisible}});
  }
  await page.locator('#langBtn').click();s=await status(page);assert.equal(s.lang,'en');
  assert.match(await page.locator('#headline').innerText(),/blind crest/);assert.match(await page.locator('[data-i18n="optionC"]').innerText(),/Cross slowly/);
  await page.locator('#stage').screenshot({path:path.join(out,`v2-${w}-english.png`)});
  await page.locator('#langBtn').click();assert.equal((await status(page)).lang,'zh');
  await page.close();
 }
 // Full workflow: eye before intro, keep mode through pause, 3 branches, slow, zoom, retry & replay.
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});p.on('pageerror',e=>errors.push('workflow: '+e.message));
 await p.goto(ROOT,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__pilot?.status?.().frameCount>0);
 await p.locator('#viewEye').click();assert.equal((await status(p)).mode,'eye');
 const bounds=await p.locator('#scene').boundingBox(),x=bounds.x+bounds.width*.5,y=bounds.y+bounds.height*.45;
 const before=(await status(p)).eyeFov;
 const cdp=await p.context().newCDPSession(p);
 const points=d=>[{x:x-d,y,id:0},{x:x+d,y,id:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points(23)});for(const d of [33,43,58,74])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:points(d)});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const after=(await status(p)).eyeFov;assert.ok(after<before-10,`pinch FOV didn't change: ${before} to ${after}`);rows.push({pinchFov:[before,after]});
 await p.locator('#start').click();await wait(p,'INTRO_PLAY');await p.locator('#pause').click();const paused=await status(p);assert.equal(paused.phase,'INTRO_PAUSED');assert.equal(paused.mode,'eye');
 await p.locator('#speed').selectOption('0.5');await p.waitForTimeout(320);assert.equal((await status(p)).progress,paused.progress);
 await p.locator('#resume').click();await wait(p,'DECISION',9000);
 for(const [br,X,Z,Yaw] of [['A',-1.30,8.45,-.58],['B',-2.65,4.99,-.46],['C',-.05,3.3,Math.PI/2]]){
  await p.locator(`[data-branch="${br}"]`).click();await p.locator('#speed').selectOption('1');await wait(p,'RESULT',8500);const end=await status(p);
  assert.equal(end.branch,br);assert.equal(end.mode,'eye');assert.equal(end.rendererError,null);
  assert.ok(Math.abs(end.actors.blue.x-X)<.05&&Math.abs(end.actors.blue.z-Z)<.06&&Math.abs(end.actors.blue.yaw-Yaw)<.003,`${br}: invalid pose`);
  assert.equal(end.selfCardVisible,true);
  await p.locator('#stage').screenshot({path:path.join(out,`v2-result-${br}-eye.png`)});
  await p.locator('#viewTop').click();await p.locator('#stage').screenshot({path:path.join(out,`v2-result-${br}-top.png`)});
  await p.locator('#viewEye').click();rows.push({branch:br,result:[end.actors.blue.x,end.actors.blue.z,end.actors.blue.yaw]});
  if(br!=='C'){await p.locator('#retry').click();await wait(p,'DECISION');}
 }
 await p.locator('#replay').click();await wait(p,'OUTCOME_PLAY');assert.equal((await status(p)).mode,'eye');await p.locator('#pause').click();assert.equal((await status(p)).phase,'OUTCOME_PAUSED');await p.locator('#resume').click();assert.equal((await status(p)).mode,'eye');
 await p.close();
 assert.deepEqual(errors,[],'browser JavaScript errors');
 const report={pass:true,time:new Date().toISOString(),root:ROOT,rows,errors};fs.writeFileSync(path.join(out,'v2-acceptance.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({pass:true,rows:rows.length,pinchFov:[before,after],branches:rows.filter(x=>x.branch),errors},null,2));
 }finally{await b.close();}
}
main().catch(e=>{console.error('V2 ACCEPTANCE FAILED',e.stack||e);process.exitCode=1});
