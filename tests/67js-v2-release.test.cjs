'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'../site/67js-v2');
const source=path.resolve(__dirname,'../experiments/67js-v2');
const get=x=>fs.readFileSync(path.join(root,x));
const html=x=>get(x).toString();

test('V2 built engine, CSS and comparison routes resolve under the GitHub Pages repo base',()=>{
 const index=html('index.html');
 assert.match(index,/67\.js V2/);
 const css=index.match(/href="(\/3d-snow-safety-world\/67js-v2\/assets\/index-[\w-]+\.css)"/);
 const js=index.match(/src="(\/3d-snow-safety-world\/67js-v2\/assets\/index-[\w-]+\.js)"/);
 assert.ok(css&&js,'V2 CSS and JS must be built for the actual Pages subdirectory');
 for(const u of [css[1],js[1]])assert.ok(get(u.replace('/3d-snow-safety-world/67js-v2/','')).length>1000);
 const bundle=get(js[1].replace('/3d-snow-safety-world/67js-v2/','')).toString();
 assert.match(bundle,/WebGL2 is unavailable/);
 assert.match(bundle,/lookDownActive/);
 assert.match(bundle,/shadowRefreshes/);
 assert.match(bundle,/selfCardVisible/);
 assert.match(index,/name="robots" content="noindex,nofollow"/);
 assert.match(get(css[1].replace('/3d-snow-safety-world/67js-v2/','')).toString(),/sitehead\{[^}]*flex-wrap:wrap[^}]*\}/,'zoom-200 mobile header wrap rule missing');
});

test('three-engine comparison has all rendered evidence, correct paths, and an honest missing V1 view',()=>{
 const page=html('compare.html');
 assert.match(page,/原版、67\.js V1、67\.js V2/);
 assert.match(page,/data-state="decision-top"/);
 assert.match(page,/data-state="result-C"/);
 assert.match(page,/V1 未實作「看腳下」/);
 assert.match(page,/href="\.\/"/);
 for(const engine of ['original','v1','v2']){
  for(const view of ['decision-top','decision-side','decision-eye','result-A','result-B','result-C']){
   const image=get('evidence/'+engine+'-'+view+'.png');
   assert.ok(image.length>6000,`${engine}-${view} empty`);
   assert.equal(image.toString('hex',0,8),'89504e470d0a1a0a');
  }
 }
 for(const id of ['original','v2'])assert.ok(get('evidence/'+id+'-lookdown.png').length>6000);
 const evidence=JSON.parse(html('evidence/evidence-index.json'));
 assert.equal(evidence.errors.length,0);
 assert.equal(evidence.info.length,20);
});

test('independent build includes source, its declared 67js dependency and the original remains separate',()=>{
 const pack=JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8'));
 const lock=JSON.parse(fs.readFileSync(path.join(source,'package-lock.json'),'utf8'));
 assert.ok(pack.dependencies['67js'].includes('0.19.0'));
 assert.equal(lock.packages['node_modules/67js'].version,'0.19.0');
 for(const f of ['scene.js','style.css','index.html','compare.html','README.md','src/app.js','src/geometry.js','src/rider.js','src/translations.js'])assert.ok(fs.statSync(path.join(source,f)).size>(f==='scene.js'?10:100));
 assert.match(get('LICENSE-67js.txt').toString(),/MIT License/);
});

test('public V2 assets and source contain no private IP, local user path, GitHub access tokens or private contact',()=>{
 const scan=(dir,rel='')=>{for(const ent of fs.readdirSync(path.join(dir,rel),{withFileTypes:true})){
  const sub=path.join(rel,ent.name);if(ent.isDirectory())scan(dir,sub);else if(/\.(?:html|js|css|json|md|txt|cjs)$/.test(sub)){
   const s=fs.readFileSync(path.join(dir,sub),'utf8');
   assert.doesNotMatch(s,/100\.104\.233\.2|\/Users\/james|ghp_[A-Za-z0-9]+|github_pat_[A-Za-z0-9]+/,sub);
  }
 }};
 scan(root);scan(source);
});
