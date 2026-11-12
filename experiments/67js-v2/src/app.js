import {Renderer67, VERSION} from '67js';
import {worldParts,H,clamp,smooth,occludedByHill} from './geometry.js';
import {createRider,setRiderPose} from './rider.js';
import {translations} from './translations.js';

const $=id=>document.getElementById(id);
const stage=$('stage'),canvas=$('scene');
const blue=createRider('blue','blue'),orange=createRider('orange','orange'),purple=createRider('purple','purple');
const world=worldParts(),animated=[...blue.list,...orange.list,...purple.list],parts=[...world,...animated];
const miniRider=createRider('self','blue');let miniRenderer=null,renderer=null;
const introDuration=3.4,outcomeDuration=4.8;
let phase='INTRO_PAGE',branch=null,progress=0,mode='top',lang='zh',speed=1;
let raf=0,lastT=performance.now(),renderFrames=0,frameIndex=0,frameTimes=[];
let eyeYaw=0,eyePitch=0,eyeFov=65,lookDownActive=false;
let orbit={az:-.70,el:.88,dist:28};
const pointers=new Map();let pinchLast=null;
let rendererError=null,lastShadowRefresh=0,lastMainWidth=0,lastMainHeight=0,lastMiniWidth=0,lastMiniHeight=0;
const ui=()=>translations[lang];

function frameFor(ph,b,q){
 q=clamp(q);
 const n1={x:-.35,z:-7.15,yaw:0,lean:0},n2={x:.35,z:6.38,yaw:0,lean:0},n3={x:1.15,z:-15.4,yaw:0,lean:0};
 if(ph==='INTRO_PAGE'){n1.z=-15.6;n2.z=6;n3.z=-16.5;}
 if(ph==='INTRO_PLAY'||ph==='INTRO_PAUSED'){n1.z=-15.6+8.45*q;n2.z=6+.38*q;n3.z=-16.5+1.1*q;n1.yaw=.04*Math.sin(q*2);}
 if(ph==='OUTCOME_PLAY'||ph==='OUTCOME_PAUSED'||ph==='RESULT'){
  n2.z=6.38+.62*q;
  n3.z=-15.4+16.9*q;n3.x=1.15+1.15*smooth(clamp((q-.73)/.27));n3.yaw=.56*smooth(clamp((q-.76)/.24));n3.lean=-.20*Math.sin(Math.PI*clamp((q-.72)/.28));
  if(b==='A'){n1.z=-7.15+15.6*q;n1.x=-.35-.95*smooth(q);n1.yaw=-.58*smooth(q);n1.lean=-.18*Math.sin(Math.PI*q);}
  if(b==='B'){n1.z=-7.15+13.2*(q-.08*q*q);n1.x=-.35-2.3*smooth(q);n1.yaw=-.46*smooth(q);n1.lean=.12*Math.sin(Math.PI*q)*Math.cos(2*Math.PI*q);}
  if(b==='C'){const settled=smooth(clamp(q/.62));n1.z=-7.15+10.45*settled;n1.x=-.35+.3*settled;n1.yaw=Math.PI*.5*settled;n1.lean=.08*Math.sin(Math.PI*settled);}
 }
 for(const n of [n1,n2,n3]){n.y=H(n.x,n.z);n.phaseProgress=q;}
 return {blue:n1,orange:n2,purple:n3};
}
function camera(p){
 if(mode==='eye'){
  const rear=lookDownActive?0.9:0,eye=[p.blue.x-Math.sin(p.blue.yaw)*rear,p.blue.y+(lookDownActive?2.48:2.05),p.blue.z-Math.cos(p.blue.yaw)*rear];
  const yaw=p.blue.yaw+eyeYaw,pitch=clamp(-.30+eyePitch,-1.40,.45),h=Math.cos(pitch);
  return {eye,target:[eye[0]+Math.sin(yaw)*h*12,eye[1]+Math.sin(pitch)*12,eye[2]+Math.cos(yaw)*h*12],fov:eyeFov,near:.075,far:260};
 }
 const target=mode==='side'?[0,H(0,0)+1.1,0]:[0,H(0,0)+1,-.6];
 const az=mode==='side'?Math.PI/2+orbit.az*.06:orbit.az;
 const el=mode==='side'?.27+orbit.el*.05:orbit.el;
 const d=mode==='side'?Math.min(orbit.dist,30)*.8:orbit.dist;
 return {eye:[target[0]+Math.sin(az)*Math.cos(el)*d,target[1]+Math.sin(el)*d,target[2]+Math.cos(az)*Math.cos(el)*d],target,fov:48,near:.05,far:260};
}
function miniCamera(){return {eye:[3.25,3.06,-4.15],target:[0,1.15,0],fov:48,near:.06,far:45};}
function scheduleFrame(){if(!raf&&renderer&&!document.hidden)raf=requestAnimationFrame(tick);}
function resetCameraState(){orbit={az:-.70,el:.88,dist:28};eyeYaw=0;eyePitch=0;eyeFov=65;lookDownActive=false;}
function setView(v){if(!['top','side','eye'].includes(v))return;mode=v;resetCameraState();renderUI();scheduleFrame();}
function setPhase(ph){phase=ph;lastT=performance.now();renderUI();scheduleFrame();}
function start(){branch=null;progress=0;setPhase('INTRO_PLAY');}
function choose(b){if(!['A','B','C'].includes(b))return;branch=b;progress=0;setPhase('OUTCOME_PLAY');}
function pause(){if(phase==='INTRO_PLAY')setPhase('INTRO_PAUSED');else if(phase==='OUTCOME_PLAY')setPhase('OUTCOME_PAUSED');}
function resume(){if(phase==='INTRO_PAUSED')setPhase('INTRO_PLAY');else if(phase==='OUTCOME_PAUSED')setPhase('OUTCOME_PLAY');}
function reset(){phase='INTRO_PAGE';branch=null;progress=0;speed=1;$('speed').value='1';resetCameraState();mode='top';renderUI();scheduleFrame();}
function applyLang(){const t=ui();document.documentElement.lang=lang==='zh'?'zh-Hant':'en';document.title=t.headline+'｜67.js V2';
 for(const el of document.querySelectorAll('[data-i18n]'))el.textContent=t[el.dataset.i18n]||'';
 $('langBtn').textContent=lang==='zh'?'EN':'繁中';$('langBtn').setAttribute('aria-label',lang==='zh'?'Switch to English':'切換繁體中文');
 $('scene').setAttribute('aria-label',t.sceneLabel);$('speed').setAttribute('aria-label',t.speedAria);$('selfExpand').setAttribute('aria-label',t.expand);
 document.querySelector('.viewbar').setAttribute('aria-label',t.cameraLabel);
 renderUI();
}
function renderUI(){const t=ui(),playing=phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY',paused=phase.endsWith('PAUSED'),decision=phase==='DECISION',result=phase==='RESULT';
 const titles={INTRO_PAGE:t.readyTitle,INTRO_PLAY:t.playTitle,INTRO_PAUSED:t.pauseTitle,DECISION:t.choiceTitle,OUTCOME_PLAY:t.outcomeTitle,OUTCOME_PAUSED:t.pauseTitle,RESULT:t.resultTitle.replace('{branch}',branch||'?')};
 const descriptions={INTRO_PAGE:t.readyDetail,INTRO_PLAY:t.playDetail,INTRO_PAUSED:t.pauseDetail,DECISION:t.choiceDetail,OUTCOME_PLAY:t.outcomeDetail,OUTCOME_PAUSED:t.pauseDetail,RESULT:t.resultDetail};
 const phases={INTRO_PAGE:t.ready,INTRO_PLAY:t.playing,INTRO_PAUSED:t.paused,DECISION:t.decision,OUTCOME_PLAY:t.outcome,OUTCOME_PAUSED:t.paused,RESULT:t.resultPhase};
 $('phaseName').textContent=phases[phase]||t.ready;$('phaseTitle').textContent=titles[phase]||t.readyTitle;$('detail').textContent=descriptions[phase]||t.readyDetail;
 $('choices').hidden=!decision;$('result').hidden=!result;$('result').textContent=branch?t['result'+branch]:'';
 $('start').hidden=phase!=='INTRO_PAGE';$('pause').hidden=!playing;$('resume').hidden=!paused;$('retry').hidden=!result;$('replay').hidden=!result;
 $('purpleLegend').hidden=branch!=='C'||!['OUTCOME_PLAY','OUTCOME_PAUSED','RESULT'].includes(phase);
 $('lookDown').hidden=mode!=='eye';$('lookDown').setAttribute('aria-pressed',String(mode==='eye'&&lookDownActive));
 $('selfCard').hidden=mode!=='eye';stage.classList.toggle('eye-mode',mode==='eye');
 $('selfExpand').textContent=$('selfCard').classList.contains('expanded')?t.collapse:t.expand;
 for(const button of document.querySelectorAll('[data-view]')){button.classList.toggle('active',button.dataset.view===mode);button.setAttribute('aria-pressed',String(button.dataset.view===mode));}
 for(const button of document.querySelectorAll('[data-branch]'))button.classList.toggle('active',button.dataset.branch===branch);
 $('progressFill').style.width=(phase==='INTRO_PAGE'?0:Math.round(progress*100))+'%';document.querySelector('.progress-track').setAttribute('aria-valuenow',Math.round(progress*100));
 $('viewInfo').textContent=t.viewInfo;
}
function initMini(){if(miniRenderer||!renderer)return;
 try{miniRenderer=new Renderer67($('selfCanvas'),miniRider.list,{ground:false,world:true,samples:1,pixelRatio:1,memoryBudgetMiB:42,environment:{lightDirection:[-.5,.9,.6],keyIntensity:1.1,fillIntensity:.7,ambientIntensity:.9},shadows:false});}
 catch(e){rendererError='Mini-3D: '+e.message;miniRenderer=null;$('selfCard').hidden=true;}
}
function paintMini(pose){if(mode!=='eye')return;initMini();if(!miniRenderer)return;
 setRiderPose(miniRider,pose.blue,{mini:true,eye:false});
 miniRenderer.updateParts(miniRider.list,{shadows:false,checks:false});const mw=$('selfCanvas').clientWidth,mh=$('selfCanvas').clientHeight;if(mw!==lastMiniWidth||mh!==lastMiniHeight){miniRenderer.resize();lastMiniWidth=mw;lastMiniHeight=mh;}miniRenderer.render(miniCamera());
}
function syncActors(p){setRiderPose(blue,p.blue,{eye:mode==='eye'});setRiderPose(orange,p.orange);setRiderPose(purple,p.purple,{visible:branch==='C'&&['OUTCOME_PLAY','OUTCOME_PAUSED','RESULT'].includes(phase)});}
function tick(now){raf=0;const dt=clamp((now-lastT)/1000,0,.085);lastT=now;
 const playing=phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY';
 if(playing){const duration=phase==='INTRO_PLAY'?introDuration:outcomeDuration;progress=clamp(progress+dt*speed/duration);if(progress>=1){phase=phase==='INTRO_PLAY'?'DECISION':'RESULT';renderUI();}}
 const pose=frameFor(phase,branch,progress),vis=occludedByHill([pose.blue.x,pose.blue.y+2.05,pose.blue.z],[pose.orange.x,pose.orange.y+1.4,pose.orange.z]);
 $('occlusion').textContent=vis.blocked?ui().occluded:ui().visible;
 syncActors(pose);
 try{
  // The engine owns its backing size. Explicit pixelRatio prevents accidental 1.5x oversampling.
  const cw=canvas.clientWidth,ch=canvas.clientHeight;if(cw!==lastMainWidth||ch!==lastMainHeight){renderer.resize();lastMainWidth=cw;lastMainHeight=ch;}frameIndex++;
  const updateShadows=playing&&frameIndex%5===0;
  if(updateShadows)lastShadowRefresh++;
  renderer.updateParts(animated,{checks:false,shadows:updateShadows});
  renderer.render(camera(pose));
  paintMini(pose);
  $('renderStatus').textContent=`67.js ${VERSION} · WebGL2 · ${canvas.width}×${canvas.height}`;
 }catch(e){rendererError=e.message;$('error').hidden=false;$('error').textContent=e.message;return;}
 renderFrames++;
 frameTimes.push(dt*1000);if(frameTimes.length>60)frameTimes.shift();
 if(renderFrames%25===0){const avg=frameTimes.reduce((a,b)=>a+b,0)/frameTimes.length;$('fps').textContent=`${ui().frameUpdate}: ${Math.round(1000/Math.max(1,avg))} fps (RAF)`;}
 $('progressFill').style.width=(phase==='INTRO_PAGE'?0:Math.round(progress*100))+'%';document.querySelector('.progress-track').setAttribute('aria-valuenow',Math.round(progress*100));
 if(phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY')scheduleFrame();
}
function showFallback(err){rendererError=String(err?.message||err);$('error').hidden=false;$('error').textContent=ui().engineUnavailable;$('renderStatus').textContent='WebGL2 UNAVAILABLE';}
try{renderer=new Renderer67(canvas,parts,{ground:false,world:true,pixelRatio:1,samples:2,memoryBudgetMiB:160,environment:{lightDirection:[-.6,.85,.55],keyIntensity:1.12,fillIntensity:.66,ambientIntensity:.80,skyTop:[.46,.69,.87],skyBottom:[.81,.90,.97],fogDensity:.001},shadows:true});}
catch(err){showFallback(err);}
for(const button of document.querySelectorAll('[data-view]'))button.addEventListener('click',()=>setView(button.dataset.view));
for(const button of document.querySelectorAll('[data-branch]'))button.addEventListener('click',()=>{if(phase==='DECISION')choose(button.dataset.branch);});
$('resetCamera').onclick=()=>setView(mode);
$('lookDown').onclick=()=>{if(mode!=='eye')return;lookDownActive=!lookDownActive;if(lookDownActive)$('selfCard').classList.remove('expanded');if(lookDownActive){eyePitch=-.60;eyeYaw=.08;eyeFov=83;}else{eyePitch=0;eyeYaw=0;eyeFov=65;}renderUI();scheduleFrame();};
$('selfExpand').onclick=()=>{$('selfCard').classList.toggle('expanded');renderUI();scheduleFrame();};
$('langBtn').onclick=()=>{lang=lang==='zh'?'en':'zh';applyLang();scheduleFrame();};
$('start').onclick=start;$('pause').onclick=pause;$('resume').onclick=resume;
$('retry').onclick=()=>{branch=null;progress=1;setPhase('DECISION');};
$('replay').onclick=()=>{progress=0;setPhase('OUTCOME_PLAY');};
$('speed').onchange=e=>{speed=Number(e.target.value)||1;scheduleFrame();};
function pointerDistance(){const a=[...pointers.values()];return a.length<2?null:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}
canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2)pinchLast=pointerDistance();});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;e.preventDefault();const prev=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pointers.size===1){const dx=e.clientX-prev.x,dy=e.clientY-prev.y;
  if(mode==='eye'){eyeYaw=clamp(eyeYaw+dx*.007,-1.2,1.2);eyePitch=clamp(eyePitch+dy*.006,-1.12,.76);lookDownActive=false;$('lookDown').setAttribute('aria-pressed','false');}
  else{orbit.az+=dx*.008;orbit.el=clamp(orbit.el+dy*.007,.16,1.38);}
 }else if(pointers.size===2){const current=pointerDistance();if(pinchLast&&current>10){const ratio=pinchLast/current;if(mode==='eye')eyeFov=clamp(eyeFov*ratio,38,88);else orbit.dist=clamp(orbit.dist*ratio,12,72);}pinchLast=current;}
 scheduleFrame();});
function endPointer(e){pointers.delete(e.pointerId);pinchLast=pointers.size===2?pointerDistance():null;try{canvas.releasePointerCapture(e.pointerId);}catch{}}
for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,endPointer);
canvas.addEventListener('wheel',e=>{e.preventDefault();const scale=e.deltaY>0?1.085:.925;if(mode==='eye')eyeFov=clamp(eyeFov*scale,38,88);else orbit.dist=clamp(orbit.dist*scale,12,72);scheduleFrame();},{passive:false});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key))return;e.preventDefault();let dx=e.key==='ArrowLeft'?-.12:e.key==='ArrowRight'?.12:0;let dy=e.key==='ArrowUp'?-.10:e.key==='ArrowDown'?.10:0;if(mode==='eye'){eyeYaw+=dx;eyePitch=clamp(eyePitch+dy,-1.12,.76);if(['+','-'].includes(e.key))eyeFov=clamp(eyeFov*(e.key==='+'?.91:1.09),38,88);}else{orbit.az+=dx;orbit.el=clamp(orbit.el+dy,.15,1.38);if(['+','-'].includes(e.key))orbit.dist=clamp(orbit.dist*(e.key==='+'?.9:1.1),12,72);}scheduleFrame();});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);raf=0;rendererError='WebGL context lost';showFallback(new Error(rendererError));});
new ResizeObserver(()=>{scheduleFrame();}).observe(stage);
document.addEventListener('visibilitychange',()=>{lastT=performance.now();if(document.hidden){if(phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY')pause();}else scheduleFrame();});
window.__pilot={
 status:()=>{const pose=frameFor(phase,branch,progress),vis=occludedByHill([pose.blue.x,pose.blue.y+2.05,pose.blue.z],[pose.orange.x,pose.orange.y+1.4,pose.orange.z]);return {engine:'67.js',edition:'V2',version:VERSION,phase,branch,progress,mode,lang,speed,canvas:[canvas.width,canvas.height],frameCount:renderFrames,actors:pose,viewCamera:camera(pose),selfMeshHidden:mode==='eye',selfCardVisible:mode==='eye'&&!$('selfCard').hidden,selfCardExpanded:$('selfCard').classList.contains('expanded'),eyeFov,lookDownActive,lineOfSightBlocked:vis.blocked,rendererError,shadowRefreshes:lastShadowRefresh,rendererBatches:renderer?.batches?.length,partCount:parts.length,frameMs:frameTimes.length?frameTimes.reduce((a,b)=>a+b,0)/frameTimes.length:null};},
 setPhase,choose,setView,reset,debug:{seek:(ph,b,q)=>{phase=ph;branch=b;progress=clamp(q);renderUI();scheduleFrame();},render:scheduleFrame},terrainHeight:H
};
applyLang();renderUI();scheduleFrame();
