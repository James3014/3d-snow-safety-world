'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('../scene04/node_modules/playwright-core');
const {PNG}=require('../scene04/node_modules/pngjs');
const URL=process.env.SCENE04_SKIN_URL||'http://127.0.0.1:8647/lesson04/';
const BASE=process.env.SCENE04_CLASSIC_URL||'http://127.0.0.1:8597/67js-ten/lesson04/';
const COMPARE=process.env.SCENE04_SKIN_COMPARE||'http://127.0.0.1:8647/';
const OUT=process.env.SCENE04_SKIN_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-scene04-skinned-qa-20261113');
fs.mkdirSync(OUT,{recursive:true});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const images=[],records=[],errors=[];
function diff(a,b,ignoreToolbar=false){const p=PNG.sync.read(a),q=PNG.sync.read(b);assert.equal(p.width,q.width);assert.equal(p.height,q.height);let changed=0;for(let i=0;i<p.data.length;i+=4){const row=Math.floor(i/4/p.width),col=(i/4)%p.width;if(ignoreToolbar&&row<55&&col<130)continue;const distance=Math.abs(p.data[i]-q.data[i])+Math.abs(p.data[i+1]-q.data[i+1])+Math.abs(p.data[i+2]-q.data[i+2]);if(distance>20)changed++;}return {changed,percent:+(100*changed/(p.width*p.height)).toFixed(3)};}
async function screenshot(page,file){const b=await page.locator('#scene').screenshot({path:path.join(OUT,file)});images.push({file,sha256:hash(b)});return b;}
const get=page=>page.evaluate(()=>__pilot.status());
const seek=(page,style,view,branch,q,phase='OUTCOME_PAUSED')=>page.evaluate(({style,view,branch,q,phase})=>{__pilot.setRigStyle(style);__pilot.setView(view);__pilot.debug.seek(phase,branch,q);},{style,view,branch,q,phase});
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  for(const viewport of [{width:320,height:740},{width:390,height:844},{width:1280,height:820}]){
   const page=await browser.newPage({viewport,deviceScaleFactor:1});
   page.on('pageerror',e=>errors.push({viewport,js:e.message}));
   page.on('console',m=>{if(m.type()==='error')errors.push({viewport,console:m.text()})});
   const response=await page.goto(URL,{waitUntil:'load',timeout:16000});assert.equal(response.status(),200);
   await page.waitForFunction(()=>__pilot?.status().frameCount>0,null,{timeout:20000});
   const initial=await get(page);assert.equal(initial.scenarioId,'crowd-control');assert.equal(initial.rendererError,null);assert.equal(initial.rigStyle,'legacy');
   for(const branch of ['A','B','C'])for(const q of [0,.25,.5,.8,1]){
    await seek(page,'legacy','top',branch,q);const original=await get(page);
    await seek(page,'geometric','top',branch,q);const smooth=await get(page);
    assert.deepEqual(smooth.actors,original.actors,`authored world actor tracks parity ${viewport.width}/${branch}/${q}`);
    assert.equal(smooth.phase,original.phase);assert.equal(smooth.progress,q);assert.equal(smooth.branch,branch);
    assert.equal(smooth.rendererError,null);
    records.push({width:viewport.width,branch,q,sameAuthoredActors:true});
   }
   for(const view of ['top','side','eye']){
    await seek(page,'legacy',view,'B',.5);await page.waitForTimeout(60);await page.mouse.move(0,350);
    const before=await screenshot(page,`scene04-${viewport.width}-${view}-B-mid-classic.png`);const old=await get(page);
    await seek(page,'geometric',view,'B',.5);await page.waitForTimeout(60);await page.mouse.move(0,350);
    const after=await screenshot(page,`scene04-${viewport.width}-${view}-B-mid-skin-v3.png`);const newer=await get(page);
    const variation=diff(before,after,true);
    if(view!=='eye')assert(variation.changed>25,'new rider must visibly render');
    assert.equal(newer.rendererError,null);assert.equal(newer.mode,view);assert.deepEqual(newer.actors,old.actors);
    assert.equal(newer.selfMeshHidden,view==='eye');
    if(view==='eye')assert.equal(newer.selfCardVisible,true);
    records.push({width:viewport.width,view,pixelsChanged:variation.changed,percent:variation.percent});
   }
   if(viewport.width===390){
    for(const branch of ['A','B','C'])for(const q of [0,.5,1]){
     await seek(page,'geometric','side',branch,q);await page.waitForTimeout(60);await screenshot(page,`scene04-motion-${branch}-${String(q).replace('.','p')}-390.png`);
    }
    await seek(page,'legacy','side','B',.68);const old=await get(page);
    await page.locator('#rigToggle').click();const after=await get(page);
    assert.equal(after.rigStyle,'geometric');assert.deepEqual(after.actors,old.actors);assert.equal(after.progress,.68);
    assert.equal(await page.locator('#rigToggle').getAttribute('aria-pressed'),'true');
    await page.locator('#learningModeToggle').click();assert.equal((await get(page)).learningMode,'demo');
    await page.locator('#speed').selectOption('0.25');assert.equal((await get(page)).speed,.25);
    await page.locator('#rigToggle').click();assert.equal((await get(page)).rigStyle,'legacy');
    await page.evaluate(()=>__pilot.debug.seek('RESULT','B',1));
    await page.locator('#retry').click();assert.equal((await get(page)).phase,'DECISION');
    await page.locator('[data-branch="C"]').click();assert.equal((await get(page)).branch,'C');
    assert.equal((await get(page)).phase,'OUTCOME_PLAY');
    await page.locator('#pause').click();assert.equal((await get(page)).phase,'OUTCOME_PAUSED');
    await seek(page,'geometric','eye','B',.5);await page.waitForTimeout(80);
    await page.locator('#selfCanvas').screenshot({path:path.join(OUT,'scene04-skin-v3-mini-eye-390.png')});
    await page.screenshot({path:path.join(OUT,'scene04-skin-v3-full-page-390.png'),fullPage:true});
   }
   await page.close();console.log('PASS',viewport.width,'all original/smooth tracked actors, branches, viewpoints and captures');
  }
  // A/B page itself must be usable and synchronize the exact authored scene.
  const compare=await browser.newPage({viewport:{width:1280,height:820}});
  compare.on('pageerror',e=>errors.push({compare:e.message}));
  await compare.goto(COMPARE,{waitUntil:'load',timeout:16000});
  await compare.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('兩側已同步'),null,{timeout:18000});
  const same=await compare.evaluate(()=>[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.__pilot.status()));
  assert.deepEqual(same[0].actors,same[1].actors);assert.equal(same[0].rigStyle,'legacy');assert.equal(same[1].rigStyle,'geometric');
  await compare.locator('#branch').selectOption('C');await compare.locator('#view').selectOption('side');await compare.locator('#moment').selectOption('late');
  const states=await compare.evaluate(()=>[...document.querySelectorAll('iframe')].map(f=>f.contentWindow.__pilot.status()));
  assert.deepEqual(states[0].actors,states[1].actors);assert.equal(states[0].branch,'C');assert.equal(states[1].mode,'side');assert.equal(states[1].progress,.8);
  await compare.screenshot({path:path.join(OUT,'scene04-compare-desktop.png'),fullPage:true});
  await compare.close();
  // Baseline public rider must remain visibly unchanged, excluding hover-dependent toolbar chrome.
  const baseline=await browser.newPage({viewport:{width:390,height:844}});
  await baseline.goto(BASE,{waitUntil:'load',timeout:16000});
  await baseline.waitForFunction(()=>__pilot?.status().frameCount>0,null,{timeout:16000});
  await baseline.evaluate(()=>{__pilot.setView('side');__pilot.debug.seek('OUTCOME_PAUSED','B',.5)});
  await baseline.waitForTimeout(65);await baseline.mouse.move(0,350);
  const baseBuf=await baseline.locator('#scene').screenshot({path:path.join(OUT,'published-main-scene04-390-side-B.png')});await baseline.close();
  const old=fs.readFileSync(path.join(OUT,'scene04-390-side-B-mid-classic.png'));
  const baselinePixels=diff(baseBuf,old,true);
  assert.equal(baselinePixels.changed,0,'classic after V3 still matches published existing scene pixels');
  // Negative real WebGL fallback from disabled hardware context.
  const bad=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-webgl','--disable-3d-apis','--disable-gpu']});
  try{const page=await bad.newPage();await page.goto(URL);await page.waitForFunction(()=>window.__pilot?.status().rendererError!==null,null,{timeout:18000});assert.equal(await page.locator('[data-fallback="original"]').count(),1);await page.close();}finally{await bad.close();}
  assert.equal(errors.length,0,JSON.stringify(errors));
  const report={date:new Date().toISOString(),source:URL,device:'M4 Chrome desktop at mobile browser viewports; not a physical phone',posePairs:records.filter(r=>r.sameAuthoredActors).length,viewPairs:records.filter(r=>r.view).length,baselinePixels,records,images,errors};
  fs.writeFileSync(path.join(OUT,'scene04-skinned-browser.json'),JSON.stringify(report,null,2));
  console.log('COMPLETE',report.posePairs,'equal source pose pairs',report.viewPairs,'view pairs',images.length,'screenshots','baseline',JSON.stringify(baselinePixels));
 }finally{await browser.close()}
})().catch(e=>{console.error('SKIN_E2E_FAIL',e.stack||e);process.exitCode=1});
