'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

function makeHarness(){
  const html=fs.readFileSync(path.join(__dirname,'../site/index.html'),'utf8');
  const source=html.match(/function setSize\(\)\{[\s\S]*?\}\nfunction visit\(/)?.[0].replace(/\nfunction visit\($/,'');
  assert.ok(source,'expected setSize function in the parent session');
  let shellHeight=580,css='',styleAdded=false;
  const frame={style:{height:''},contentDocument:null};
  const doc={
    getElementById(id){return id==='sessionEmbedCss'&&styleAdded?{}:null},
    createElement(){return {id:'',textContent:''}},
    head:{append(style){styleAdded=true;css=style.textContent}},
    querySelector(sel){return sel==='.shell'?{getBoundingClientRect(){return {height:shellHeight}}}:null},
    documentElement:{get scrollHeight(){return Math.max(shellHeight,parseInt(frame.style.height)||530)}},
    body:{classList:{contains(){return false}},get scrollHeight(){return Math.max(shellHeight,parseInt(frame.style.height)||530)}}
  };
  frame.contentDocument=doc;
  const context={$:id=>{assert.equal(id,'frame');return frame}};
  vm.runInNewContext(source+'\nthis.resizeFrame=setSize;',context,{timeout:1000});
  return {frame,resize:()=>context.resizeFrame(),css:()=>css,setHeight:v=>{shellHeight=v}};
}

test('an idle embedded 3D session does not grow on repeated size polling',()=>{
  const h=makeHarness(),sizes=[];
  for(let i=0;i<30;i++){h.resize();sizes.push(parseInt(h.frame.style.height)||530)}
  assert.ok(Math.max(...sizes)-Math.min(...sizes)<=2,`size kept growing: ${sizes.join(', ')}`);
  assert.match(h.css(),/body:not\(\.cinema\) \.viewport\{height:clamp\(/);
});

test('session grows and shrinks with real content, not iframe scrollHeight',()=>{
  const h=makeHarness();h.resize();
  h.setHeight(805);h.resize();assert.equal(parseInt(h.frame.style.height),807);
  h.setHeight(560);h.resize();assert.equal(parseInt(h.frame.style.height),562);
  for(let i=0;i<8;i++)h.resize();
  assert.equal(parseInt(h.frame.style.height),562);
});
