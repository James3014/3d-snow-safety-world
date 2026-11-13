'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../site/67js-ten'),read=p=>fs.readFileSync(path.join(root,p)),hash=p=>crypto.createHash('sha256').update(read(p)).digest('hex');
const expected={
  "01":"db7e3c281388ba63d6fd49279e6a1f8a643a51a7657a18137501c2230ed6f409",
  "02":"c08829f8a7aa91818e4a3c8b583f6688cd453505ed2f0357d690534f805a92d0",
  "03":"337557377247e56ff9adbb55fa0fee3dbbd906e7a0bb6aaae490528d08aeb56b",
  "04":"7b100ba92caef5b44829ce7835ea8e3e43b8d3d30c76798f5fe4842dc8db4736",
  "05":"7f36fab291d56e91ab133fe001d0d3252d1225ac56e35f0a3e83e62be6d6e214",
  "06":"b8761fd54e81fe7b38f2a023766d711c4b2dc47fd65dc660bdff7af972c8c207",
  "07":"c053d7ea2eb141b46c9702048b62e63cefc115c0429f6753daab0ec37e8dcc21",
  "08":"28b0f89166196a399d4c31d4646d7d942251ed6b4d792b172443154c39140866",
  "09":"be41b429aa8f9e0715e7109abffcb03e87270ce04a888876fa6d84621f19f2d8",
  "10":"8adae52379e3f4be624845e390767dabea213b155483dbab86a46b8a2c438eac"
};
const lessons=['01','02','03','04','05','06','07','08','09','10'];
test('GitHub Pages preview is isolated, public-label-only and keeps local session progress',()=>{
 const html=read('index.html').toString(),script=read('session.js').toString();
 assert.match(html,/PUBLIC TEST PREVIEW/);assert.match(html,/name="robots" content="noindex,nofollow,noarchive"/);
 assert.match(html,/frame-src 'self'/);assert.match(script,/Public test preview/);
 assert.match(script,/localStorage/);assert.match(script,/session_complete/);
 assert.doesNotMatch(html,/PRIVATE SESSION|100\.104\.|\/Users\/james/);
 assert.doesNotMatch(script,/100\.104\.|\/Users\/james|fetch\s*\(|sendBeacon\s*\(|XMLHttpRequest\s*\(/);
 assert.equal(lessons.every(n=>html.includes('lessonFrame')&&fs.existsSync(path.join(root,'lesson'+n,'index.html'))),true);
 assert.match(read('robots.txt').toString(),/Disallow:\s*\//);
});
test('each of the ten deployed bundles exactly matches the completed isolated pilot',()=>{
 for(const n of lessons){
  const dir=path.join(root,'lesson'+n),files=fs.readdirSync(path.join(dir,'assets'));
  const js=files.filter(x=>/\.js$/.test(x)),css=files.filter(x=>/\.css$/.test(x));
  assert.equal(js.length,1,'missing or extra bundle '+n);assert.equal(css.length,1,'missing or extra CSS '+n);
  assert.equal(hash('lesson'+n+'/assets/'+js[0]),expected[n],n+' changed after ten-lesson acceptance');
  const html=read('lesson'+n+'/index.html').toString();
  for(const asset of [js[0],css[0]])assert.ok(html.includes('./assets/'+asset),'asset path must be relative for Pages nested path '+n+' '+asset);
  assert.doesNotMatch(html,/https?:\/\/100\.|\/Users\/james|debug\.json|no such module/i);
 }
});
test('release folder contains only allowlisted front-end files and license notices',()=>{
 const allowed=new Set(['index.html','session.js','session.css','robots.txt','LICENSE-67js.txt','THIRD-PARTY-NOTICES-67js.md']);
 const base=fs.readdirSync(root);for(const f of base){if(/^lesson(0[1-9]|10)$/.test(f))continue;assert.ok(allowed.has(f),'unexpected release asset '+f);}
 const all=[];const walk=(dir)=>{for(const f of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,f.name);if(f.isDirectory())walk(full);else{assert.ok(f.isFile(),'symlink or nonfile '+full);all.push(path.relative(root,full));}}};walk(root);
 for(const p of all){assert.doesNotMatch(p,/\.cjs$|\.map$|(^|\/)\.git|(^|\/)evidence\/|(^|\/)tests\/|\.env|node_modules|device-qa|compare\.html|\.DS_Store/);}
 assert.ok(all.length>=35&&all.length<=55,'release asset count out of bounds '+all.length);
 assert.match(read('LICENSE-67js.txt').toString(),/MIT License/);
 assert.match(read('THIRD-PARTY-NOTICES-67js.md').toString(),/Copyright|License/i);
});
test('public preview does not contain credentials, internal addresses or local machine paths',()=>{
 const skip=new Set(['LICENSE-67js.txt','THIRD-PARTY-NOTICES-67js.md']);
 const walk=(dir)=>{for(const f of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,f.name);if(f.isDirectory())walk(full);else if(/\.(?:js|html|css|json)$/.test(f.name)){const s=fs.readFileSync(full,'utf8');assert.doesNotMatch(s,/100\.104\.233\.2|\/Users\/james|ghp_[A-Za-z0-9]+|github_pat_[A-Za-z0-9]+|-----BEGIN PRIVATE KEY-----|@gmail\.com/,full);}}};walk(root);
});
