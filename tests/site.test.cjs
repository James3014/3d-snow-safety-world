'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const site=path.resolve(__dirname,'../site');
const files=fs.readdirSync(site).sort();
const src=name=>fs.readFileSync(path.join(site,name),'utf8');
const renderers=['scene-01-speed.html','merge-entry-speed.html','safe-overtake-speed.html','lesson-play-speed.html'];
const context={window:{}};
vm.runInNewContext(src('lessons-data.js'),context,{timeout:3000,filename:'lessons-data.js'});
const lessons=context.window.SNOW_LESSONS;

test('allowlisted site has exactly eight standalone static assets',()=>{
  assert.deepEqual(files,['404.html','index.html','lesson-play-speed.html','lessons-data.js','merge-entry-speed.html','robots.txt','safe-overtake-speed.html','scene-01-speed.html']);
});
test('source matches imported M5 release baseline',()=>{
  const sha=crypto.createHash('sha256').update(fs.readFileSync(path.join(site,'index.html'))).digest('hex');
  assert.equal(sha,'ec155fa4e69c2aa120cbd8d696c71e0ac37882d0f92cca30010220f05c1656aa');
});
test('ten lessons and seven reusable scenario IDs are retained',()=>{
  const entry=src('index.html');
  const mapping=entry.match(/const lessons=(\[[\s\S]*?\]);\s*const chapters=/);
  assert.ok(mapping,'ten-scenario session inventory is present');
  const values=JSON.parse(mapping[1]);
  assert.equal(values.length,10);
  for(const x of values){assert.equal(x.length,7);assert.ok(x[4].endsWith('.html')||x[4].includes('.html?lesson='));}
  assert.equal(Object.keys(lessons).length,7);
  assert.deepEqual(values.slice(0,3).map(x=>x[4]),renderers.slice(0,3));
  assert.deepEqual(values.slice(3).map(x=>x[4].split('lesson=')[1]),Object.keys(lessons));
});
test('each reusable lesson has three authored outcomes, bilingual content and source references',()=>{
  for(const [id,lesson] of Object.entries(lessons)){
    assert.equal(lesson.id,id);
    assert.deepEqual(Object.keys(lesson.tracks.outcomes).sort(),['A','B','C']);
    assert.ok(lesson.tracks.intro,'missing intro for '+id);
    assert.deepEqual(Object.keys(lesson.copy).sort(),['en','zh']);
    assert.ok(lesson.sourceRefs.length>0,'missing source refs for '+id);
  }
});
test('inline scripts parse in all five interactive HTML documents',()=>{
  for(const file of ['index.html',...renderers]){
    const html=src(file),scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
    assert.ok(scripts.length>0,'no inline script '+file);
    for(const [,script] of scripts)new vm.Script(script,{filename:file});
  }
});
test('all HTML asset references remain local and present',()=>{
  for(const file of ['index.html',...renderers]){
    const html=src(file);
    for(const [,ref] of html.matchAll(/<(?:script|iframe|link)[^>]+(?:src|href)=["']([^"']+)["']/g)){
      if(ref.startsWith('#'))continue;
      assert.ok(!/^\w+:\/\//.test(ref),'external asset in '+file);
      assert.ok(fs.existsSync(path.join(site,ref.split('?')[0])),'missing '+ref+' from '+file);
    }
  }
});
test('public site has no private network endpoints, secrets or telemetry API calls',()=>{
  for(const file of files){
    const text=src(file);
    assert.doesNotMatch(text,/\b(?:100\.(?:[6-9]\d|1[0-2]\d)\.\d+\.\d+|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)\b/);
    assert.doesNotMatch(text,/(?:ghp_|github_pat_|AIza|sk-[A-Za-z0-9_-]{20,}|-----BEGIN PRIVATE KEY-----|@gmail\.com|\/Users\/james)/i);
    assert.doesNotMatch(text,/(?:https?:\/\/|fetch\s*\(|navigator\.sendBeacon|XMLHttpRequest\s*\(|new\s+WebSocket\s*\(|gtag\s*\()/i);
    assert.doesNotMatch(text,/__snowQAEvents|qa_events|GoogleAnalytics|mixpanel/i);
  }
});
test('player exposes camera and playback controls without external runtime dependency',()=>{
  for(const file of renderers){const html=src(file);assert.match(html,/__snow/);assert.match(html,/setPlaybackRate/);assert.match(html,/getStatus|status\s*:/);assert.match(html,/webglcontextlost/);assert.match(html,/btn-eye/);assert.match(html,/aria-label/);}
});
test('privacy defaults remain local-only and noindex',()=>{
  const entry=src('index.html');
  assert.match(entry,/localStorage/);
  assert.match(entry,/name="robots" content="noindex,nofollow,noarchive"/);
  assert.match(src('robots.txt'),/Disallow:\s*\//);
  assert.doesNotMatch(entry,/rel="canonical"/);
});
test('public package contains a license, a reproducible README and no deployment workflow',()=>{
  const root=path.resolve(site,'..');
  assert.match(fs.readFileSync(path.join(root,'LICENSE'),'utf8'),/MIT License/);
  assert.match(fs.readFileSync(path.join(root,'README.md'),'utf8'),/python3 -m http\.server/);
  const workflows=fs.readdirSync(path.join(root,'.github/workflows'));
  assert.deepEqual(workflows,['ci.yml']);
  assert.doesNotMatch(fs.readFileSync(path.join(root,'.github/workflows/ci.yml'),'utf8'),/(?:deploy-pages|pages\/deploy|upload-pages-artifact|aws|firebase|cloudflare)/i);
});
