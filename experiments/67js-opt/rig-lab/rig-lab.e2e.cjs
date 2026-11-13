'use strict';
const {chromium}=require('playwright-core');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const BASE=process.env.RIG_LAB_URL||'http://127.0.0.1:8600/';
const OUT=process.env.RIG_LAB_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-smooth-lab-preview-20261113/qa');
fs.mkdirSync(OUT,{recursive:true});
const observations=[],errors=[],shots=[];
const fingerprint=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  for(const size of [{width:320,height:740},{width:390,height:844},{width:1280,height:820}]){
   const page=await browser.newPage({viewport:size,deviceScaleFactor:1});
   page.on('pageerror',e=>errors.push({size,js:e.message}));
   page.on('console',m=>{if(m.type()==='error')errors.push({size,console:m.text()});});
   const response=await page.goto(BASE,{waitUntil:'load',timeout:20000});assert.equal(response.status(),200);
   await page.waitForFunction(()=>window.__rigLab?.status().ready,{timeout:25000});
   for(const pose of ['stand','snowboard','carve'])for(const view of ['front','three','side']){
    await page.locator(`[data-pose="${pose}"]`).click();await page.locator(`[data-view="${view}"]`).click();
    const st=await page.evaluate(()=>window.__rigLab.status());
    assert.equal(st.pose,pose);assert.equal(st.view,view);assert.equal(st.error,null);
    assert(st.vertexCounts[pose]>12000);
    assert.equal(await page.locator(`[data-pose="${pose}"]`).getAttribute('aria-pressed'),'true');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    assert(overflow<=2,`mobile horizontal overflow ${overflow} on ${size.width}px`);
    observations.push({width:size.width,pose,view,theme:st.theme,vertices:st.vertexCounts[pose],status:'PASS'});
    if(['stand','snowboard','carve'].includes(pose)&&['front','side'].includes(view)&&size.width===1280){
     const file=`smooth-v3-${pose}-${view}-dark-1280.png`;
     const bytes=await page.locator('#new').screenshot({path:path.join(OUT,file)});
     shots.push({file,sha256:fingerprint(bytes)});
    }
   }
   // Snow must be a real light-sky renderer, not CSS-only background decoration.
   await page.locator('[data-pose="snowboard"]').click();await page.locator('[data-view="three"]').click();
   const dark=await page.locator('#new').screenshot();
   await page.locator('[data-theme="snow"]').click();
   const snow=await page.locator('#new').screenshot();
   assert.notEqual(fingerprint(snow),fingerprint(dark),`Snow theme must affect WebGL pixels at ${size.width}px`);
   assert.equal((await page.evaluate(()=>__rigLab.status())).theme,'snow');
   const file=`smooth-v3-snow-contrast-${size.width}.png`;
   shots.push({file,sha256:fingerprint(await page.screenshot({path:path.join(OUT,file),fullPage:true}))});
   await page.locator('[data-theme="studio"]').click();
   assert.equal((await page.evaluate(()=>__rigLab.status())).error,null);
   await page.locator('[data-view="front"]').click();
   const old=await page.evaluate(()=>__rigLab.status());
   const rect=await page.locator('#new').boundingBox();
   await page.mouse.move(rect.x+rect.width*.46,rect.y+rect.height*.45);
   await page.mouse.down();await page.mouse.move(rect.x+rect.width*.70,rect.y+rect.height*.48,{steps:8});await page.mouse.up();
   const now=await page.evaluate(()=>__rigLab.status());
   assert.equal(now.view,'custom');assert.notEqual(now.azimuth,old.azimuth);
   await page.mouse.wheel(0,-180);
   assert((await page.evaluate(()=>__rigLab.status())).zoom<old.zoom);
   const fullfile=`smooth-v3-interactive-${size.width}.png`;
   shots.push({file:fullfile,sha256:fingerprint(await page.screenshot({path:path.join(OUT,fullfile),fullPage:true}))});
   console.log('PASS',size.width,'9 poses/views, dark/snow, drag/zoom, no overflow');
   await page.close();
  }
  // Real WebGL unavailability must never claim visual success.
  const disabled=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-webgl','--disable-3d-apis','--disable-gpu']});
  try{const p=await disabled.newPage({viewport:{width:390,height:844}});await p.goto(BASE);await p.waitForFunction(()=>Boolean(window.__rigLabError),null,{timeout:15000});const status=await p.locator('#status').innerText();assert(status.includes('WebGL2'));observations.push({name:'disabled WebGL2 reports error instead of fake model',status:'PASS'});await p.close();}finally{await disabled.close();}
  assert.equal(errors.length,0,JSON.stringify(errors));
  fs.writeFileSync(path.join(OUT,'rig-lab-e2e.json'),JSON.stringify({source:BASE,date:new Date().toISOString(),browser:'M4 Chrome headless, mobile viewport emulation (not physical devices)',checks:observations.length,observations,shots,errors},null,2));
  console.log('E2E_PASS',observations.length,'checks',shots.length,'screenshots');
 }finally{await browser.close();}
})().catch(e=>{console.error('E2E_FAIL',e.stack||e);process.exit(1)});
