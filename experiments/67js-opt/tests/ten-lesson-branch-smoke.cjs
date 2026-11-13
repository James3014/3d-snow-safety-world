'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('../scene04/node_modules/playwright-core');
const OUT=path.join(process.env.HOME,'workspace/3d-snow-safety-rig-preview-20261113/qa');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 const results=[];
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  for(let i=1;i<=10;i++){
   const lesson=String(i).padStart(2,'0');
   await page.goto('http://127.0.0.1:8597/67js-ten/lesson'+lesson+'/',{waitUntil:'load'});
   await page.waitForFunction(()=>window.__pilot?.status().frameCount>0,null,{timeout:16000});
   const initial=await page.evaluate(()=>__pilot.status());
   for(const b of ['A','B','C']){
    await page.evaluate(()=>__pilot.debug.seek('DECISION',null,1));
    await page.locator('[data-branch="'+b+'"]').click();
    const chosen=await page.evaluate(()=>__pilot.status());
    assert.equal(chosen.branch,b);
    assert.equal(chosen.phase,'OUTCOME_PLAY');
    await page.evaluate(branch=>__pilot.debug.seek('RESULT',branch,1),b);
    const result=await page.evaluate(()=>__pilot.status());
    assert.equal(result.branch,b);assert.equal(result.phase,'RESULT');
    assert.equal(result.rendererError,null);
    results.push({lesson,scenarioId:result.scenarioId,branch:b,status:'PASS'});
   }
   console.log('PASS',lesson,initial.scenarioId,'A/B/C');
  }
  fs.writeFileSync(path.join(OUT,'ten-branch-smoke.json'),JSON.stringify({
   date:new Date().toISOString(),source:'Unchanged origin/main GitHub Pages preview, M4 Chrome 390px, not actual phone',count:results.length,results
  },null,2));
  console.log('PASS ten baseline lessons',results.length,'branch choices and results');
 }finally{await browser.close();}
})().catch(e=>{console.error('TEN_SMOKE_FAIL',e.stack||e);process.exit(1)});
