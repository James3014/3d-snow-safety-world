'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const OUT=process.env.RIG_QA_DIR||path.join(process.env.HOME,'workspace/3d-snow-safety-rig-preview-20261113/qa');
const report={host:'M4 Chrome 157 headless, 390x844 viewport emulation',date:new Date().toISOString(),results:[],errors:[],unverified:['actual macOS Chrome background tab (headless browser did not emit blur or visibilitychange)','physical iPhone Safari','physical Android Chrome','30-minute thermal/GPU/power','learner comprehension','special sit/fall technique']};
const add=(name,detail)=>{report.results.push({name,status:'PASS',detail});console.log('PASS',name,typeof detail==='object'?JSON.stringify(detail).slice(0,350):detail)};
const url='http://127.0.0.1:8596',base='http://127.0.0.1:8597/67js-ten';
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,hasTouch:true,isMobile:true});
  const p=await ctx.newPage();
  p.on('pageerror',e=>report.errors.push(e.message.slice(0,300)));
  await p.goto(url+'/lesson04/',{waitUntil:'load'});
  await p.waitForFunction(()=>window.__pilot?.status().frameCount>0,null,{timeout:12000});
  await p.locator('#start').click();
  await p.waitForTimeout(140);
  assert(['INTRO_PLAY','INTRO_PAUSED'].includes((await p.evaluate(()=>__pilot.status())).phase));
  await p.locator('#pause').click();
  let paused=await p.evaluate(()=>__pilot.status());
  assert.equal(paused.phase,'INTRO_PAUSED');
  await p.locator('#resume').click();
  assert.equal((await p.evaluate(()=>__pilot.status())).phase,'INTRO_PLAY');
  add('actual start-pause-resume');
  await p.evaluate(()=>{__pilot.setRigStyle('geometric');__pilot.debug.seek('OUTCOME_PLAY','B',.35)});
  const before=await p.evaluate(()=>__pilot.status());
  // Headless Chrome's tab activation never changes document.hasFocus(), so
  // this checks the blur handler, NOT real OS tab lifecycle acceptance.
  await p.evaluate(()=>window.dispatchEvent(new Event('blur')));
  await p.waitForTimeout(110);
  const background=await p.evaluate(()=>__pilot.status());
  assert.equal(background.phase,'OUTCOME_PAUSED','blur handler pauses the lesson');
  assert(background.progress<=before.progress+.03,'no background time jump');
  await p.evaluate(()=>window.dispatchEvent(new Event('focus')));
  const returnState=await p.evaluate(()=>__pilot.status());
  assert.equal(returnState.phase,'OUTCOME_PAUSED','no automatic resume');
  await p.locator('#resume').click();
  assert.equal((await p.evaluate(()=>__pilot.status())).phase,'OUTCOME_PLAY');
  add('synthetic focus-loss blur pauses without auto-resume (not native background QA)',{progress:before.progress,paused:background.progress});
  await p.evaluate(()=>__pilot.debug.seek('OUTCOME_PAUSED','C',.7));
  const measure=()=>({stage:document.querySelector('#stage').getBoundingClientRect().height,
   shell:document.querySelector('.shell').getBoundingClientRect().height,
   pageHeight:document.documentElement.scrollHeight,
   canvas:document.querySelector('#scene').getBoundingClientRect().height,
   viewport:window.innerWidth});
  const size0=await p.evaluate(measure);
  await p.waitForTimeout(60300);
  const size1=await p.evaluate(measure);
  assert.deepEqual(size1,size0);
  add('60-second idle viewport/shell/canvas stability',{before:size0,after:size1});
  await p.close();
  await ctx.close();
  // Published ten-lesson baseline has not been modified by this local branch.
  const published=await browser.newPage({viewport:{width:390,height:844}});
  for(let n=1;n<=10;n++){
   const tag=String(n).padStart(2,'0');
   await published.goto(base+'/lesson'+tag+'/',{waitUntil:'load',timeout:18000});
   await published.waitForFunction(()=>window.__pilot&&window.__pilot.status().frameCount>0,null,{timeout:15000});
   const s=await published.evaluate(()=>__pilot.status());
   assert.equal(s.rendererError,null);
   assert(s.scenarioId&&s.canvas.every(x=>x>0));
   report.results.push({name:'baseline ten lesson '+tag,status:'PASS',scenarioId:s.scenarioId});
   console.log('PASS','baseline ten lesson',tag,s.scenarioId);
  }
  await published.goto(base+'/',{waitUntil:'load'});
  assert.equal(await published.locator('iframe').count(),1);
  add('ten-lesson Session container loads');
  await published.close();
  // WebGL2 fail closed, with an actual link to the unchanged published original.
  const failBrowser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-webgl','--disable-3d-apis','--disable-gpu']});
  try{
   const failPage=await failBrowser.newPage({viewport:{width:390,height:844}});
   await failPage.goto(url+'/lesson04/',{waitUntil:'load'});
   await failPage.waitForFunction(()=>window.__pilot&&window.__pilot.status().rendererError!==null,null,{timeout:15000});
   assert.equal(await failPage.locator('[data-fallback="original"]').count(),1);
   assert.equal(await failPage.locator('[data-fallback="original"]').getAttribute('href'),'https://james3014.github.io/3d-snow-safety-world/lesson-play-speed.html?lesson=crowd-control');
   add('WebGL2 unavailable fallback link');
   await failPage.close();
  }finally{await failBrowser.close();}
  assert.equal(report.errors.length,0);
  report.final='PASS';
 }finally{
  await browser.close();
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'rig-regression-report.json'),JSON.stringify(report,null,2));
 }
})().catch(e=>{console.error('RIG_REGRESSION_FAIL',e.stack||e);process.exitCode=1});
