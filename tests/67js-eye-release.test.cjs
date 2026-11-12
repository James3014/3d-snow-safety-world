'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const site=path.resolve(__dirname,'../site/67js');
const read=name=>fs.readFileSync(path.join(site,name));
const sha=name=>crypto.createHash('sha256').update(read(name)).digest('hex');

test('67.js first-person release includes fixed perspective bundle and cache-safe comparison',()=>{
 const html=read('index.html').toString();
 const script=html.match(/src="(\/3d-snow-safety-world\/67js\/assets\/index-[\w-]+\.js)"/);
 assert.ok(script,'missing GitHub Pages subpath-prefixed JS bundle');
 const filename=script[1].replace('/3d-snow-safety-world/67js/','');
 const bundle=read(filename).toString();
 assert.match(html,/第一人稱修正版/);
 assert.match(bundle,/selfMeshHidden/,'new runtime must distinguish first-person self visibility');
 assert.match(bundle,/viewCamera/,'new runtime must expose the rider-attached eye pose');
 assert.match(bundle,/lineOfSightBlocked/,'terrain occlusion state must remain available');
 assert.equal(sha(filename),'fb2ee1d476c03a7ec3fff2761cf6ee4b9428a1eec539901f24ca760323e79f83');
 const compare=read('compare.html').toString();
 assert.match(compare,/\.png\?v=20261112-eye-fix/,'comparison must not reuse a cached broken eye screenshot');
 assert.match(compare,/href="\.\/"/,'comparison navigation must stay within /67js/');
 assert.equal(sha('test-results/67-eye-decision.png'),'34a9cb712044c7e9e55b5371e95fa432182ac267aefce6f7b16aa1d1eebb6348');
});
