'use strict';
const {chromium}=require('playwright-core');const {PNG}=require('pngjs');const fs=require('fs');const path=require('path');const assert=require('node:assert/strict');
const ROOT=process.env.V2_URL||'http://127.0.0.1:8398/';const OUT=path.resolve(__dirname,'../test-results/v2');fs.mkdirSync(OUT,{recursive:true});
const status=page=>page.evaluate(()=>window.__pilot?.status());
const waitPhase=(page,phase)=>page.waitForFunction(x=>window.__pilot?.status()?.phase===x,phase,{timeout:9500});
function pixel(png){const data=PNG.sync.read(png);let colors=new Set();let nonGrey=0;for(let i=0;i<data.data.length;i+=17*4){const r=data.data[i],g=data.data[i+1],b=data.data[i+2];colors.add((r>>4)*256+(g>>4)*16+(b>>4));if(Math.max(r,g,b)-Math.min(r,g,b)>14)nonGrey++;}return {colors:colors.size,nonGrey,pixels:data.width*data.height};}
async function main(){const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});let all=[],errors=[];
 try{
  for(const [w,h] of [[320,740],[390,844],[1280,820],[844,390]]){
   const p=await browser.newPage({viewport:{width:w,height:h},isMobile:w<700,hasTouch:w<700,deviceScaleFactor:1});
   p.on('pageerror',x=>errors.push(`${w}: ${x.message}`));p.on('console',x=>{if(x.type()==='error')errors.push(`${w}:console ${x.text()}`)});
   await p.goto(ROOT,{waitUntil:'domcontentloaded',timeout:15000});await p.waitForFunction(()=>window.__pilot?.status()?.frameCount>0,{timeout:16000});
   const s=await status(p);assert.equal(s.edition,'V2');assert.equal(s.engine,'67.js');assert.equal(s.version,'0.19.0');assert.equal(s.rendererError,null);assert.ok(s.partCount>200);assert.ok(s.rendererBatches<25);
   const dim=await p.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewportWidth:document.documentElement.clientWidth,stageH:document.getElementById('stage').getBoundingClientRect().height,cssW:document.getElementById('scene').getBoundingClientRect().width,cssH:document.getElementById('scene').getBoundingClientRect().height}));
   assert.ok(dim.scrollWidth<=w+2,`horizontal scroll ${w}: ${dim.scrollWidth}`);assert.ok(s.canvas[0]<=dim.cssW*1.15,`pixel ratio overdraw ${w}`);
   const shot=await p.locator('#stage').screenshot({path:path.join(OUT,`v2-intro-${w}.png`)}),px=pixel(shot);assert.ok(px.colors>30,`flat screenshot ${w}: ${JSON.stringify(px)}`);
   await p.evaluate(()=>window.__pilot.debug.seek('DECISION',null,1));
   for(const mode of ['top','eye','side']){
    await p.locator(`[data-view="${mode}"]`).click();const m=await status(p);assert.equal(m.mode,mode);
    const bb=await p.locator('#stage').screenshot({path:path.join(OUT,`v2-decision-${mode}-${w}.png`)});assert.ok(pixel(bb).colors>25);
   }
   await p.locator('[data-view="eye"]').click();
   await p.waitForTimeout(150);const eye=await status(p);
   assert.equal(eye.selfCardVisible,true);assert.equal(eye.selfMeshHidden,true);
   await p.locator('#selfExpand').click();assert.equal((await status(p)).selfCardExpanded,true);
   const rect=await p.locator('#selfCard').boundingBox();assert.ok(rect.width>180,'full body pose must expand');
   const mini=await p.locator('#selfCanvas').screenshot({path:path.join(OUT,`v2-mini-${w}.png`)});assert.ok(pixel(mini).colors>12,'mini pose canvas empty');
   await p.locator('#selfExpand').click();
   await p.locator('#lookDown').click();const look=await status(p);assert.ok(look.lookDownActive);assert.ok(look.viewCamera.target[1]<eye.viewCamera.target[1]-3,'lookDown not pitched');
   await p.locator('#stage').screenshot({path:path.join(OUT,`v2-lookdown-${w}.png`)});
   await p.locator('#lookDown').click();
   await p.locator('#langBtn').click();const english=await status(p);assert.equal(english.lang,'en');assert.match(await p.locator('#headline').innerText(),/blind crest/);assert.equal(await p.locator('#start').innerText(),'Start the challenge');
   await p.locator('#langBtn').click();assert.equal((await status(p)).lang,'zh');
   all.push({viewport:`${w}x${h}`,stage:dim,backing:s.canvas,batches:s.rendererBatches,parts:s.partCount,pixels:px,miniPixels:pixel(mini),eyeZoomInitial:eye.eyeFov});await p.close();
  }
  const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});p.on('pageerror',e=>errors.push('main '+e.message));
  await p.goto(ROOT,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__pilot?.status()?.frameCount>0);
  await p.locator('#viewEye').click();
  const eye=await status(p);const canvas=await p.locator('#scene').boundingBox();let x=canvas.x+canvas.width*.5,y=canvas.y+canvas.height*.5;
  const cdp=await p.context().newCDPSession(p);const pts=d=>[{x:x-d,y,id:0},{x:x+d,y,id:1}];
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(25)});
  for(let d of [30,40,60,80]){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(d)});await p.waitForTimeout(36)}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  const pinch=await status(p);assert.ok(pinch.eyeFov<eye.eyeFov-10,`pinch failed ${eye.eyeFov}->${pinch.eyeFov}`);assert.equal(pinch.mode,'eye');
  await p.locator('#resetCamera').click();assert.equal((await status(p)).eyeFov,65);
  await p.locator('#start').click();assert.equal((await status(p)).mode,'eye');
  await waitPhase(p,'DECISION');const checkpoint=await status(p);assert.ok(checkpoint.lineOfSightBlocked);
  const ends={A:{x:-1.3,z:8.45},B:{x:-2.65,z:4.99},C:{x:-.05,z:3.30}};
  for(const br of 'ABC'){
   assert.equal((await status(p)).mode,'eye');await p.locator(`[data-branch="${br}"]`).click();assert.equal((await status(p)).branch,br);
   if(br==='B'){
    await p.locator('#speed').selectOption('0.5'); // below fallback if browser normalises value
    await p.waitForTimeout(300);await p.locator('#pause').click();const paused=await status(p);await p.waitForTimeout(400);assert.ok(Math.abs((await status(p)).progress-paused.progress)<.001);
    await p.locator('#speed').selectOption('1');await p.locator('#resume').click();
   }
   await waitPhase(p,'RESULT');const s=await status(p);
   assert.ok(Math.abs(s.actors.blue.x-ends[br].x)<.05);assert.ok(Math.abs(s.actors.blue.z-ends[br].z)<.08);assert.equal(s.mode,'eye');assert.equal(s.rendererError,null);
   await p.locator('[data-view="top"]').click();await p.locator('#stage').screenshot({path:path.join(OUT,`v2-result-${br}-top-390.png`)});
   await p.locator('[data-view="side"]').click();await p.locator('#stage').screenshot({path:path.join(OUT,`v2-result-${br}-side-390.png`)});
   await p.locator('[data-view="eye"]').click();await p.locator('#stage').screenshot({path:path.join(OUT,`v2-result-${br}-eye-390.png`)});
   all.push({branch:br,end:s.actors.blue,purple:s.actors.purple,shadowRefreshes:s.shadowRefreshes});
   if(br!=='C'){await p.locator('#retry').click();await waitPhase(p,'DECISION');}
  }
  await p.locator('#replay').click();assert.equal((await status(p)).mode,'eye');await p.locator('#speed').selectOption('0.25');const before=(await status(p)).progress;await p.waitForTimeout(250);const after=(await status(p)).progress;assert.ok(after>before&&after-before<.04,'slow motion progression incorrect');await p.locator('#pause').click();await p.locator('#resume').click();await p.locator('#stage').screenshot({path:path.join(OUT,'v2-replay-eye-390.png')});
  await p.close();await browser.close();assert.equal(errors.length,0,JSON.stringify(errors));fs.writeFileSync(path.join(OUT,'v2-e2e-results.json'),JSON.stringify({pass:true,root:ROOT,all,errors},null,2));console.log(JSON.stringify({pass:true,count:all.length,all,errors},null,2));
 }catch(e){await browser.close();throw e;}}
main().catch(e=>{console.error('V2 E2E FAIL:',e);process.exitCode=1});
