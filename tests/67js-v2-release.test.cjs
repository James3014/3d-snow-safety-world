'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');
const site=path.resolve(__dirname,'../site/67js-v2'),source=path.resolve(__dirname,'../experiments/67js-v2');
const text=p=>fs.readFileSync(path.join(site,p),'utf8');const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(site,p))).digest('hex');
const states=['decision-top','decision-side','decision-eye','result-A-top','result-B-top','result-C-top','result-C-side','result-C-eye','lookdown','stance-expanded'];
const expected=states.flatMap(s=>s==='lookdown'||s==='stance-expanded'?[`original-${s}.png`,`v2-${s}.png`]:['original','v1','v2'].map(e=>`${e}-${s}.png`)).sort();

test('V2 remains in isolated GitHub Pages folder and does not replace original ten lessons',()=>{
 assert.ok(fs.existsSync(path.join(site,'index.html')));
 assert.ok(fs.existsSync(path.join(site,'compare.html')));
 assert.ok(fs.existsSync(path.join(source,'src/app.js')));
 assert.equal(JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8')).dependencies['67js'],'npm:@codepawlhq/67js@0.19.0');
 assert.deepEqual(fs.readdirSync(path.join(site,'comparison-assets')).sort(),expected);
 assert.match(text('LICENSE-67js.txt'),/MIT License/);
});

test('released engine is a real code bundle, uses pinned 67.js, page subpath, and correct basenames',()=>{
 const html=text('index.html'),m=html.match(/src="(\/3d-snow-safety-world\/67js-v2\/assets\/index-[\w-]+\.js)"/);assert.ok(m,'missing GitHub Pages subpath');
 const js=m[1].replace('/3d-snow-safety-world/67js-v2/',''),code=text(js);assert.match(code,/WebGL2 is unavailable|webgl2/);
 assert.match(html,/name="robots" content="noindex,nofollow"/);
 assert.match(code,/selfCardVisible/);assert.match(code,/lineOfSightBlocked/);
 assert.equal(sha(js),'144b0efd12e016a77558feed6d3622f823c87592d4e2f85f47c82bcada97eaf0');
 assert.ok(html.includes('href="./compare.html"'));
});

test('10 compare states resolve to all 28 real browser render PNGs, missing functions labeled honestly',()=>{
 const c=text('compare.html');for(const s of states)assert.ok(c.includes(s),'missing switch '+s);
 assert.match(c,/v1:lookdown/);assert.match(c,/v1:stance-expanded/);
 for(const name of expected){const b=fs.readFileSync(path.join(site,'comparison-assets',name));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');assert.ok(b.length>5000,name+' screenshot too short');}
});

test('deployed assets contain no internal machine addresses, credentials or source filesystem paths',()=>{
 const files=['index.html','compare.html',...fs.readdirSync(path.join(site,'assets')).map(x=>'assets/'+x)];for(const file of files){const data=text(file);
 assert.doesNotMatch(data,/100\.104\.233\.2|\/Users\/james|github_pat_[\w-]+|ghp_[\w-]+/);
 }
});
