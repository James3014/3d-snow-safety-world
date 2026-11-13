'use strict';
// GPU deformation positive/negative control with EXACT SAME root + camera.
// Requires the fixture to be served by the scene04 Vite *dev* server.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('../scene04/node_modules/playwright-core');
const {PNG}=require('../scene04/node_modules/pngjs');
const URL=process.env.SKIN_GPU_PROBE_URL||'http://127.0.0.1:8633/fixtures/skin-probe.html';
const OUT=process.env.SCENE04_SKIN_QA||path.join(process.env.HOME,'workspace/3d-snow-safety-scene04-skinned-qa-20261113');
fs.mkdirSync(OUT,{recursive:true});
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const differences=(a,b)=>{const x=PNG.sync.read(a),y=PNG.sync.read(b);assert.equal(x.width,y.width);assert.equal(x.height,y.height);let n=0;for(let i=0;i<x.data.length;i+=4){const d=Math.abs(x.data[i]-y.data[i])+Math.abs(x.data[i+1]-y.data[i+1])+Math.abs(x.data[i+2]-y.data[i+2]);if(d>15)n++;}return n;};
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
  const page=await browser.newPage({viewport:{width:640,height:640},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(URL,{waitUntil:'load',timeout:18000});
  await page.waitForFunction(()=>window.__skinProbe?.status().ready,null,{timeout:18000});
  const status=await page.evaluate(()=>__skinProbe.status());
  assert.equal(status.skinned,true);
  assert.equal(status.error,null);
  const sample=async(name,q,lean)=>{
   const state=await page.evaluate(({q,lean})=>__skinProbe.render(q,lean),{q,lean});
   assert.equal(state.error,null);
   const b=await page.locator('canvas').screenshot({path:path.join(OUT,'same-root-'+name+'.png')});
   return {state,b,sha256:hash(b)};
  };
  const rest=await sample('rest',0,0);
  const bend=await sample('bend',.5,0);
  const lean=await sample('lean',.5,.22);
  const same=await sample('lean-repeat',.5,.22);
  assert.deepEqual(rest.state.root,bend.state.root);
  assert.notDeepEqual(rest.state.palette,bend.state.palette,'GPU skin palette must change at fixed source root');
  assert.deepEqual(bend.state.root,lean.state.root,'authored root position/orientation must not be altered by GPU-only lean');
  assert(differences(rest.b,bend.b)>500,'GPU skin bending must be visible, not only a JS flag');
  assert(differences(bend.b,lean.b)>1000,'lean must move non-root pixels');
  assert.equal(differences(lean.b,same.b),0,'identical pose must draw bit-identical pixels');
  assert.equal(errors.length,0,errors.join('\n'));
  const report={date:new Date().toISOString(),source:URL,subject:'GPU-shaded connected-body deformation with fixed authored root and camera',vertexCount:status.vertexCount,changes:{restToBend:differences(rest.b,bend.b),bendToLean:differences(bend.b,lean.b),samePoseRepeat:differences(lean.b,same.b)},errors,sha256:{rest:rest.sha256,bend:bend.sha256,lean:lean.sha256}};
  fs.writeFileSync(path.join(OUT,'scene04-skinned-fixed-root-gpu.json'),JSON.stringify(report,null,2));
  console.log('GPU_SKIN_PASS',JSON.stringify(report.changes));
  await page.close();
 }finally{await browser.close()}
})().catch(e=>{console.error('GPU_SKIN_FAIL',e.stack||e);process.exitCode=1});
