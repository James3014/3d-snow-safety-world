'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const site=path.resolve(__dirname,'../site/67js-v2');const source=path.resolve(__dirname,'../experiments/67js-v2');
test('V2 320px layout at 200 percent zoom keeps header buttons within viewport',()=>{
 const original=fs.readFileSync(path.join(source,'style.css'),'utf8');
 const head=fs.readFileSync(path.join(site,'index.html'),'utf8');
 const match=head.match(/href="\/3d-snow-safety-world\/67js-v2\/assets\/(index-[\w-]+\.css)"/);
 assert.ok(match,'page must use a versioned Pages CSS URL');
 const deployed=fs.readFileSync(path.join(site,'assets',match[1]),'utf8');
 for(const text of [original,deployed]){
  assert.match(text,/\.sitehead\s*\{\s*flex-wrap:\s*wrap\s*;\s*gap:\s*8px\s*\}/,'narrow viewport header must wrap');
  assert.match(text,/max-width:\s*360px|width\s*<=\s*360px/,'narrow breakpoint must exist');
 }
});
