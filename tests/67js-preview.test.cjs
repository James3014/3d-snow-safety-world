'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const preview=path.resolve(__dirname,'../site/67js');
const files=()=>fs.readdirSync(preview).sort();
const read=name=>fs.readFileSync(path.join(preview,name),'utf8');
const shots=['67-branch-A','67-branch-B','67-branch-C','67-eye-decision','original-branch-A','original-branch-B','original-branch-C','original-eye-decision'];

test('pilot publish is isolated and only contains static assets',()=>{
  assert.deepEqual(files(),['LICENSE-67js.txt','THIRD-PARTY-NOTICES-67js.md','assets','compare.html','index.html','test-results']);
  assert.deepEqual(fs.readdirSync(path.join(preview,'test-results')).sort(),shots.map(name=>name+'.png').sort());
  assert.ok(fs.readdirSync(path.join(preview,'assets')).some(name=>/^index-[\w-]+\.js$/.test(name)));
  assert.match(read('LICENSE-67js.txt'),/MIT License/);
});

test('build uses correct GitHub Pages repo subpath and includes 67js',()=>{
  const index=read('index.html');
  const script=index.match(/src="(\/3d-snow-safety-world\/67js\/assets\/index-[\w-]+\.js)"/);
  assert.ok(script,'missing Pages-prefixed JS script URL');
  const local=script[1].replace(/^\/3d-snow-safety-world\/67js\//,'');
  const code=read(local);
  assert.match(code,/WebGL2 is unavailable|webgl2/);
  assert.match(index,/name="robots" content="noindex,nofollow"/);
  assert.match(index,/href="\.\/compare\.html"/);
  assert.doesNotMatch(index,/100\.104\.233\.2|\/Users\/james/);
});

test('comparison refers to existing, correctly scoped static screenshots',()=>{
  const compare=read('compare.html');
  assert.match(compare,/href="\.\/"/);
  assert.match(compare,/原版 vs 67\.js/);
  assert.doesNotMatch(compare,/src="\/test-results|['"]\/test-results/);
  for(const name of shots){
    assert.match(compare,/\.\/test-results\//);
    const png=fs.readFileSync(path.join(preview,'test-results',name+'.png'));
    assert.ok(png.byteLength>5000,name+' screenshot too small');
    assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a',name+' invalid PNG');
  }
});

test('public pilot bundle does not contain developer private paths or addresses',()=>{
  const targets=['index.html','compare.html',...fs.readdirSync(path.join(preview,'assets')).map(x=>'assets/'+x)];
  for(const name of targets){const text=read(name);
    assert.doesNotMatch(text,/100\.104\.233\.2|192\.168\.\d+\.\d+|\/Users\/james|ghp_[A-Za-z0-9]+|github_pat_[A-Za-z0-9]+/);
  }
});
