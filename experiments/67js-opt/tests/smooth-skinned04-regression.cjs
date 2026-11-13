'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const URL=process.env.SCENE04_SKIN_URL||'http://127.0.0.1:8647/lesson04/';
const OUT=process.env.SCENE04_SKIN_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-scene04-skinned-qa-20261113');
const report={date:new Date().toISOString(),browser:'M4 Chrome headless mobile viewport simulation, not physical phone',checks:[],notRun:['physical iPhone Safari / Android','native macOS background lifecycle','30-minute GPU/thermal/battery','professional teaching certification']};
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
 await page.goto(URL,{waitUntil:'load'});await page.waitForFunction(()=>window.__pilot?.status().frameCount>0,{timeout:18000});
 await page.evaluate(()=>{__pilot.setRigStyle('geometric');__pilot.setView('side');__pilot.debug.seek('OUTCOME_PAUSED','B',.5)});
 const get=()=>page.evaluate(()=>{const s=__pilot.status();const a=document.querySelector('#stage').getBoundingClientRect(),shell=document.querySelector('.shell').getBoundingClientRect(),canvas=document.querySelector('#scene').getBoundingClientRect();return {phase:s.phase,branch:s.branch,rig:s.rigStyle,rendererError:s.rendererError,stage:a.height,shell:shell.height,canvas:canvas.height,pageHeight:document.documentElement.scrollHeight,pageWidth:document.documentElement.scrollWidth};});
 const before=await get();await page.waitForTimeout(60600);const after=await get();assert.deepEqual(after,before);report.checks.push({name:'60s idle frame shell/stage/mobile viewport stability',status:'PASS',before,after});console.log('PASS 60s idle',JSON.stringify(after));
 await page.evaluate(()=>__pilot.debug.seek('OUTCOME_PLAY','B',.25));
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.waitForTimeout(160);
 const blur=await page.evaluate(()=>__pilot.status());assert.equal(blur.phase,'OUTCOME_PAUSED');await page.evaluate(()=>window.dispatchEvent(new Event('focus')));assert.equal((await page.evaluate(()=>__pilot.status())).phase,'OUTCOME_PAUSED');report.checks.push({name:'blur handler synthetic loss of focus pauses without auto-resume',status:'PASS'});
 await page.locator('#resume').click();assert.equal((await page.evaluate(()=>__pilot.status())).phase,'OUTCOME_PLAY');report.checks.push({name:'explicit resume works at selected V3 rig',status:'PASS'});
 console.log('PASS synthetic blur and explicit resume');await page.close();
}finally{await browser.close();fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'scene04-skinned-regression.json'),JSON.stringify(report,null,2));}})().catch(e=>{console.error('REGRESSION_FAIL',e.stack||e);process.exitCode=1});
