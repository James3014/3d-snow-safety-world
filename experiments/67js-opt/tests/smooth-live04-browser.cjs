'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('../scene04/node_modules/playwright-core');
const {PNG}=require('../scene04/node_modules/pngjs');
const URL=process.env.SMOOTH_LIVE04_URL||'http://127.0.0.1:8625/lesson04/';
const BASE='http://127.0.0.1:8597/67js-ten/lesson04/';
const OUT=process.env.SMOOTH_LIVE04_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-smooth-live04-qa-20261113');
fs.mkdirSync(OUT,{recursive:true});
const hashes=[],observations=[],errors=[];
const get=page=>page.evaluate(()=>__pilot.status());
const seek=(page,rig,view,branch,progress)=>page.evaluate(({rig,view,branch,progress})=>{
 __pilot.setRigStyle(rig);
 __pilot.setView(view);
 __pilot.debug.seek('OUTCOME_PAUSED',branch,progress);
},{rig,view,branch,progress});
function countVisibleBody(file){
 const p=PNG.sync.read(fs.readFileSync(file));
 let n=0;
 for(let y=205;y<265;y++)for(let x=210;x<248;x++){
  const k=(y*p.width+x)*4;
  if(p.data[k]<195&&p.data[k+1]<205&&p.data[k+2]<215)n++;
 }
 return n;
}
async function capture(page,name){
 const file=path.join(OUT,name);
 await page.locator('#scene').screenshot({path:file});
 hashes.push({file:name,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});
 return file;
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  for(const width of [320,390,1280]){
   const page=await browser.newPage({viewport:{width,height:width===1280?820:844},deviceScaleFactor:1});
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
   const response=await page.goto(URL,{waitUntil:'load',timeout:18000});
   assert.equal(response.status(),200);
   await page.waitForFunction(()=>window.__pilot&&__pilot.status().frameCount>0,null,{timeout:18000});
   const start=await get(page);
   assert.equal(start.scenarioId,'crowd-control');
   assert.equal(start.rigStyle,'legacy');
   assert.equal(start.rendererError,null);
   for(const branch of ['A','B','C'])for(const q of [0,.35,.5,.8,1]){
    await seek(page,'legacy','top',branch,q);
    const a=await get(page);
    await seek(page,'geometric','top',branch,q);
    const b=await get(page);
    assert.deepEqual(b.actors,a.actors,'authored pose parity '+branch+' '+q+' '+width);
    assert.equal(b.phase,a.phase);
    assert.equal(b.progress,q);
    assert.equal(b.rendererError,null);
    observations.push({width,branch,progress:q,actorsEqual:true});
   }
   for(const view of ['top','side','eye']){
    await seek(page,'legacy',view,'B',.5);await page.waitForTimeout(80);
    await capture(page,'scene04-'+width+'-'+view+'-legacy.png');
    await seek(page,'geometric',view,'B',.5);await page.waitForTimeout(80);
    const file=await capture(page,'scene04-'+width+'-'+view+'-smooth.png');
    assert.equal((await get(page)).rendererError,null);
    if(width===390&&view==='side'){
     const count=countVisibleBody(file);
     assert(count>400,'single connected rider body must be rasterized (not only bindings): '+count);
     observations.push({width,view,visibleBodyPixels:count});
    }
    observations.push({width,view,oldAndNewCanvasCaptured:true});
   }
   if(width===390){
    await seek(page,'legacy','side','B',.7);
    const before=await get(page);
    await page.locator('#rigToggle').click();
    const after=await get(page);
    assert.deepEqual(after.actors,before.actors);
    assert.equal(after.progress,.7);
    assert.equal(after.rigStyle,'geometric');
    await page.locator('#learningModeToggle').click();
    assert.equal((await get(page)).learningMode,'demo');
    await page.locator('#speed').selectOption('0.25');
    assert.equal((await get(page)).speed,.25);
    await page.locator('#rigToggle').click();
    assert.equal((await get(page)).rigStyle,'legacy');
   }
   await page.close();
   console.log('PASS',width,'authored-pose and live original/smooth switching');
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(BASE,{waitUntil:'load'});
  await page.waitForFunction(()=>__pilot?.status().frameCount>0,null,{timeout:15000});
  await page.evaluate(()=>{__pilot.setView('side');__pilot.debug.seek('OUTCOME_PAUSED','B',.5)});
  await page.waitForTimeout(110);
  await capture(page,'baseline-scene04-390-side.png');
  await page.close();
  assert.equal(errors.length,0,errors.join('\n'));
  const report={date:new Date().toISOString(),source:'M4 Chrome 157 headless; viewport simulations, not phone hardware',
    note:'Single-surface mannequin follows authored root and lean, but internal joints are STATIC. Cannot certify snow-safety motion.',
    comparisons:observations.length,observations,images:hashes,errors};
  fs.writeFileSync(path.join(OUT,'smooth-live04-browser.json'),JSON.stringify(report,null,2));
  console.log('PASS',observations.length,'checks',hashes.length,'screenshots');
 }finally{await browser.close();}
})().catch(e=>{console.error('FAIL',e.stack||e);process.exitCode=1});
