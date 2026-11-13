'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {chromium}=require('../scene04/node_modules/playwright-core');
const {PNG}=require('../scene04/node_modules/pngjs');
const HOST=process.env.RIG_HOST||'http://127.0.0.1:8596';
const BASELINE='http://127.0.0.1:8597/67js-ten';
const OUT=process.env.RIG_QA_DIR||path.join(process.env.HOME,'workspace/3d-snow-safety-rig-preview-20261113/qa');
fs.mkdirSync(OUT,{recursive:true});
const shots=[],failures=[],scenes=[],errors=[];
const hashFile=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const get=page=>page.evaluate(()=>window.__pilot.status());
const state=(page,rig,view,phase,branch,q)=>page.evaluate(({rig,view,phase,branch,q})=>{
 window.__pilot.setRigStyle(rig);
 window.__pilot.setView(view);
 window.__pilot.debug.seek(phase,branch,q);
},{rig,view,phase,branch,q});
const waitFrame=page=>page.waitForTimeout(55);
async function capture(page,filename){
 const output=path.join(OUT,filename);
 await page.mouse.move(0,350); // fix hover-dependent toolbar pixels before capture
 await page.locator('#scene').screenshot({path:output,timeout:8000});
 shots.push({file:filename,sha256:hashFile(output)});
 return output;
}
function pixelDiff(a,b,maskToolbar=false){
 const p=PNG.sync.read(fs.readFileSync(a)),q=PNG.sync.read(fs.readFileSync(b));
 assert.equal(p.width,q.width);assert.equal(p.height,q.height);
 let changed=0;
 for(let i=0;i<p.data.length;i+=4)if(
  !(maskToolbar && Math.floor(i/4/p.width)<55 && (Math.floor(i/4)%p.width)<120) &&

  Math.abs(p.data[i]-q.data[i])+
  Math.abs(p.data[i+1]-q.data[i+1])+
  Math.abs(p.data[i+2]-q.data[i+2])>20)changed++;
 return {changed,percent:+(changed/(p.width*p.height)*100).toFixed(3)};
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  for(const viewport of [{width:390,height:844},{width:320,height:740},{width:1280,height:820}]){
   const page=await browser.newPage({viewport,deviceScaleFactor:1,hasTouch:viewport.width<600,isMobile:viewport.width<600});
   page.on('pageerror',e=>errors.push({viewport,js:e.message.slice(0,250)}));
   page.on('console',m=>{if(m.type()==='error')errors.push({viewport,console:m.text().slice(0,250)});});
   for(const lesson of ['04','01','09']){
    await page.goto(HOST+'/lesson'+lesson+'/',{waitUntil:'load',timeout:15000});
    await page.waitForFunction(()=>window.__pilot&&window.__pilot.status().frameCount>0,null,{timeout:15000});
    const opening=await get(page);
    assert.equal(opening.rendererError,null);
    assert.equal(opening.rigStyle,'legacy');
    assert(opening.canvas.every(v=>v>0));
    const record={lesson,viewport,scenarioId:opening.scenarioId,partCount:opening.partCount,
      checks:opening.checks||null,branches:[],views:[],shots:0};
    // Pose equality across three causal alternatives, at different timeline instants.
    for(const branch of ['A','B','C']){
     for(const q of [0,.35,.5,.8,1]){
      await state(page,'legacy','top','OUTCOME_PAUSED',branch,q);
      const old=await get(page);
      await state(page,'geometric','top','OUTCOME_PAUSED',branch,q);
      const modern=await get(page);
      assert.deepEqual(modern.actors,old.actors,lesson+' '+branch+' @'+q+' pose parity');
      assert.equal(modern.branch,branch);
      assert.equal(modern.phase,old.phase);
      assert.equal(modern.progress,q);
      assert.equal(modern.rendererError,null);
     }
     record.branches.push(branch);
    }
    for(const view of ['top','side','eye']){
     await state(page,'legacy',view,'OUTCOME_PAUSED','B',.5);
     const old=await get(page);
     await waitFrame(page);
     const legacyName='rig-'+lesson+'-'+viewport.width+'-'+view+'-B-mid-legacy.png';
     const legacyPath=await capture(page,legacyName);
     await state(page,'geometric',view,'OUTCOME_PAUSED','B',.5);
     const modern=await get(page);
     await waitFrame(page);
     const geometricName='rig-'+lesson+'-'+viewport.width+'-'+view+'-B-mid-geometric.png';
     const geometricPath=await capture(page,geometricName);
     assert.deepEqual(modern.actors,old.actors);
     assert.equal(modern.mode,view);
     assert.equal(modern.rigStyle,'geometric');
     assert.equal(modern.selfMeshHidden,view==='eye');
     if(view==='eye')assert.equal(modern.selfCardVisible,true);
     const diff=pixelDiff(legacyPath,geometricPath);
     if(view!=='eye')assert(diff.changed>25,lesson+': '+view+' should visibly change');
     record.views.push({view,diff});
     record.shots+=2;
    }
    if(viewport.width===390){
     for(const branch of ['A','C']){
      for(const rig of ['legacy','geometric']){
       await state(page,rig,'side','RESULT',branch,1);
       await waitFrame(page);
       await capture(page,'rig-'+lesson+'-390-side-'+branch+'-result-'+rig+'.png');
      }
     }
     // Real button: no phase / time reset while toggling.
     await state(page,'legacy','side','OUTCOME_PAUSED','B',.7);
     const s0=await get(page);
     await page.locator('#rigToggle').click();
     await waitFrame(page);
     const s1=await get(page);
     assert.equal(s1.rigStyle,'geometric');
     assert.deepEqual(s1.actors,s0.actors);
     assert.equal(s1.progress,.7);
     assert.equal(await page.locator('#rigToggle').getAttribute('aria-pressed'),'true');
     // Same live runtime: practice/demo, speed, retry and replay.
     await page.locator('#learningModeToggle').click();
     assert.equal((await get(page)).learningMode,'demo');
     await page.locator('#speed').selectOption('0.25');
     assert.equal((await get(page)).speed,.25);
     await page.evaluate(()=>__pilot.debug.seek('RESULT','C',1));
     await page.locator('#retry').click();
     assert.equal((await get(page)).phase,'DECISION');
     await page.locator('[data-branch="B"]').click();
     assert.equal((await get(page)).branch,'B');
     await page.locator('#pause').click();
     assert.equal((await get(page)).phase,'OUTCOME_PAUSED');
     // Separate, actual first-person inset image.
     await state(page,'geometric','eye','OUTCOME_PAUSED','B',.6);
     await waitFrame(page);
     await page.locator('#selfCanvas').screenshot({path:path.join(OUT,'mini-'+lesson+'-390-geometric.png')});
     shots.push({file:'mini-'+lesson+'-390-geometric.png',sha256:hashFile(path.join(OUT,'mini-'+lesson+'-390-geometric.png'))});
     await page.screenshot({path:path.join(OUT,'full-'+lesson+'-390-geometric.png'),fullPage:true});
     shots.push({file:'full-'+lesson+'-390-geometric.png',sha256:hashFile(path.join(OUT,'full-'+lesson+'-390-geometric.png'))});
    }
    scenes.push(record);
    console.log('PASS',lesson,viewport.width,opening.scenarioId,record.partCount,'parts','images',record.shots);
   }
   await page.close();
  }
  // A/B page is itself an executable comparison; verify both embedded WebGL2 scenes.
  const cmp=await browser.newPage({viewport:{width:1280,height:820}});
  cmp.on('pageerror',e=>errors.push({compare:e.message.slice(0,200)}));
  await cmp.goto(HOST+'/',{waitUntil:'load'});
  await cmp.waitForFunction(()=>document.getElementById('status').textContent.startsWith('兩側已同步'),null,{timeout:15000});
  const cmpStatuses=await cmp.evaluate(()=>[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.__pilot.status()));
  assert.deepEqual(cmpStatuses[0].actors,cmpStatuses[1].actors);
  assert.equal(cmpStatuses[0].rigStyle,'legacy');assert.equal(cmpStatuses[1].rigStyle,'geometric');
  await cmp.locator('#lesson').selectOption('09');
  await cmp.waitForFunction(()=>[...document.querySelectorAll('iframe')].every(f=>f.contentWindow.__pilot?.status().scenarioId==='lift-exit'),null,{timeout:15000});
  await cmp.locator('#moment').selectOption('mid');
  await cmp.locator('#branch').selectOption('C');
  await cmp.locator('#view').selectOption('side');
  await cmp.waitForTimeout(140);
  const c=await cmp.evaluate(()=>[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.__pilot.status()));
  assert.deepEqual(c[0].actors,c[1].actors);
  assert.equal(c[0].branch,'C');assert.equal(c[1].mode,'side');
  await cmp.screenshot({path:path.join(OUT,'compare-desktop-1280-lesson09.png'),fullPage:true});
  shots.push({file:'compare-desktop-1280-lesson09.png',sha256:hashFile(path.join(OUT,'compare-desktop-1280-lesson09.png'))});
  await cmp.close();
  // Baseline published ten-lesson bundles versus all three untouched legacy rigs.
  const baselinePixels={};
  const base=await browser.newPage({viewport:{width:390,height:844}});
  for(const lesson of ['04','01','09']){
   await base.goto(BASELINE+'/lesson'+lesson+'/',{waitUntil:'load',timeout:15000});
   await base.waitForFunction(()=>window.__pilot&&window.__pilot.status().frameCount>0,null,{timeout:15000});
   await base.evaluate(()=>{__pilot.setView('side');__pilot.debug.seek('OUTCOME_PAUSED','B',.5)});
   await waitFrame(base);
   const baselineFile=path.join(OUT,'baseline-main-lesson'+lesson+'-side-B-390.png');
   await base.mouse.move(0,350);
   await base.locator('#scene').screenshot({path:baselineFile});
   const compareFile=path.join(OUT,'rig-'+lesson+'-390-side-B-mid-legacy.png');
   baselinePixels[lesson]={fullCanvas:pixelDiff(baselineFile,compareFile),sceneExcludingToolbar:pixelDiff(baselineFile,compareFile,true)};
   console.log('LEGACY_BASELINE_DIFF',lesson,JSON.stringify(baselinePixels[lesson]));
   assert.equal(baselinePixels[lesson].sceneExcludingToolbar.changed,0,lesson+' original scene pixels must match main');
  }
  await base.close();
  assert.equal(errors.length,0,JSON.stringify(errors));
  const report={subject:'Issue #7 geometry rig A/B',date:new Date().toISOString(),browser:'M4 Chrome headless emulated viewports, not physical iPhone',
   sourceBase:'1b25a752ade56f6997ebd03c67a36ba6407a5caa',
   url:HOST,sceneCount:scenes.length,scenes,baselinePixels,errors,shots,sha256:shots.map(x=>x.sha256).slice(0,5)};
  fs.writeFileSync(path.join(OUT,'rig-browser-report.json'),JSON.stringify(report,null,2));
  console.log('ALL_PASS',scenes.length,'browser combinations',shots.length,'screenshots');
 }finally{await browser.close();}
})().catch(err=>{console.error('E2E_FAIL',err.stack||String(err));process.exitCode=1});
