/** Single runtime owner for 67.js lessons 01, 02 and 03.
 * Scenario-specific meshes, keyframes and texts are injected by each small adapter.
 * Do not introduce a second RAF loop, replay clock or camera state in a scene adapter.
 */
export function startLessonRuntime(config){
 const {Renderer67,VERSION,worldParts,H,clamp,frameFor,createRider,setRiderPose,translations}=config;
 const causalChecks=config.causalChecks;
 const hasPurple=Boolean(config.hasPurple);
 const ambientRiders=(config.ambientRiders||[]).map(cfg=>({...cfg,model:createRider(cfg.id,cfg.palette)}));
 const occludedByHill=config.occludedByHill;
const $=id=>document.getElementById(id);
const stage=$('stage'),canvas=$('scene');
const blue=createRider('blue','blue'),orange=createRider('orange','orange'),purple=hasPurple?createRider('purple','purple'):null;
const world=worldParts(),animated=[...blue.list,...orange.list,...(purple?purple.list:[]),...ambientRiders.flatMap(r=>r.model.list)],parts=[...world,...animated];
const miniRider=createRider('self','blue');let miniRenderer=null,renderer=null;
const introDuration=config.introDuration,outcomeDuration=config.outcomeDuration;
let phase='INTRO_PAGE',branch=null,progress=0,mode='top',lang='zh',speed=1,learningMode='practice';
let raf=0,lastT=performance.now(),renderFrames=0,frameIndex=0,frameTimes=[];
let eyeYaw=0,eyePitch=0,eyeFov=65,lookDownActive=false,eyeBeforeLookDown=null;
let orbit={...config.defaultOrbit};
const pointers=new Map();let pinchLast=null;
let rendererError=null,lastShadowRefresh=0,lastMainWidth=0,lastMainHeight=0,lastMiniWidth=0,lastMiniHeight=0;
const ui=()=>translations[lang];
function refreshRigControl(){
 const control=$('rigToggle'),caption=$('rigCaption'),rig=config.rigChoice;
 if(!control||!rig)return;
 const geometric=rig.getRigStyle()==='geometric';
 control.textContent=lang==='zh'?(geometric?'切換原有角色':'切換簡化人形'):(geometric?'Show original riders':'Show simple riders');
 control.setAttribute('aria-pressed',String(geometric));
 if(caption)caption.textContent=lang==='zh'?(geometric?'角色 A/B 比較 · 簡化人形':'角色 A/B 比較 · 原有模型'):(geometric?'Rider A/B · simplified geometry':'Rider A/B · original model');
}



function camera(p){
 if(mode==='eye'){
  const rear=lookDownActive?0.9:0,eye=[p.blue.x-Math.sin(p.blue.yaw)*rear,p.blue.y+(lookDownActive?2.48:2.05),p.blue.z-Math.cos(p.blue.yaw)*rear];
  const yaw=p.blue.yaw+eyeYaw,pitch=clamp(-.30+eyePitch,-1.40,.45),h=Math.cos(pitch);
  return {eye,target:[eye[0]+Math.sin(yaw)*h*12,eye[1]+Math.sin(pitch)*12,eye[2]+Math.cos(yaw)*h*12],fov:eyeFov,near:.075,far:260};
 }
 const [x,z]=mode==='side'?config.sideAnchor:config.topAnchor;
 const [hx,hz]=mode==='side'?(config.sideHeightRef||config.sideAnchor):(config.topHeightRef||config.topAnchor);
 const target=[x,H(hx,hz)+(mode==='side'?1.1:1),z];
 const az=mode==='side'?Math.PI/2+orbit.az*.06:orbit.az;
 const el=mode==='side'?.27+orbit.el*.05:orbit.el;
 const d=mode==='side'?Math.min(orbit.dist,30)*.8:orbit.dist;
 return {eye:[target[0]+Math.sin(az)*Math.cos(el)*d,target[1]+Math.sin(el)*d,target[2]+Math.cos(az)*Math.cos(el)*d],target,fov:48,near:.05,far:260};
}
function miniCamera(){return {eye:[3.25,3.06,-4.15],target:[0,1.15,0],fov:48,near:.06,far:45};}
function scheduleFrame(){if(!raf&&renderer&&!document.hidden)raf=requestAnimationFrame(tick);}
function resetCameraState(){
 orbit={...config.defaultOrbit};eyeYaw=0;eyePitch=0;eyeFov=65;lookDownActive=false;eyeBeforeLookDown=null;
 if(config.demoAim&&mode==='eye'&&learningMode==='demo'){
  const pose=frameFor(phase,branch,progress),a=pose.blue,c=pose.orange;
  eyeYaw=Math.atan2(c.x-a.x,c.z-a.z)-a.yaw;
  const horizontal=Math.hypot(c.x-a.x,c.z-a.z);
  eyePitch=Math.atan2(c.y+1.65-(a.y+2.05),horizontal)+.30;
 }
}
function setView(v){if(!['top','side','eye'].includes(v))return;mode=v;resetCameraState();renderUI();scheduleFrame();}
function setPhase(ph){phase=ph;lastT=performance.now();renderUI();scheduleFrame();}
function start(){branch=null;progress=0;setPhase('INTRO_PLAY');}
function choose(b){if(!['A','B','C'].includes(b))return;branch=b;progress=0;setPhase('OUTCOME_PLAY');}
function pause(){if(phase==='INTRO_PLAY')setPhase('INTRO_PAUSED');else if(phase==='OUTCOME_PLAY')setPhase('OUTCOME_PAUSED');}
function resume(){if(phase==='INTRO_PAUSED')setPhase('INTRO_PLAY');else if(phase==='OUTCOME_PAUSED')setPhase('OUTCOME_PLAY');}
function reset(){phase='INTRO_PAGE';branch=null;progress=0;speed=1;$('speed').value='1';resetCameraState();mode='top';renderUI();scheduleFrame();}
function applyLang(){const t=ui();document.documentElement.lang=lang==='zh'?'zh-Hant':'en';document.title=t.headline+config.titleSuffix;
 for(const el of document.querySelectorAll('[data-i18n]'))el.textContent=t[el.dataset.i18n]||'';
 $('langBtn').textContent=lang==='zh'?'EN':'繁中';$('langBtn').setAttribute('aria-label',lang==='zh'?'Switch to English':'切換繁體中文');
 $('scene').setAttribute('aria-label',t.sceneLabel);$('speed').setAttribute('aria-label',t.speedAria);$('selfExpand').setAttribute('aria-label',t.expand);
 document.querySelector('.viewbar').setAttribute('aria-label',t.cameraLabel);
 if(rendererError&&$('error').hidden===false)showFallback(new Error(rendererError));
 refreshRigControl();renderUI();
}
function showCoachTip(){
 const t=ui(),button=$('learningModeToggle'),active=learningMode==='demo';
 button.textContent=active?t.hideDemo:t.showDemo;
 button.setAttribute('aria-pressed',String(active));
 $('modeLabel').textContent=active?t.demoLabel:t.practiceLabel;
 const hint=$('coachTip');
 hint.hidden=!active;
 if(active){let key=phase==='RESULT'&&branch?'tip'+branch:phase==='DECISION'?'tipDecision':'tipIntro';hint.textContent=t[key];}
}
function renderUI(){const t=ui(),playing=phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY',paused=phase.endsWith('PAUSED'),decision=phase==='DECISION',result=phase==='RESULT';
 const titles={INTRO_PAGE:t.readyTitle,INTRO_PLAY:t.playTitle,INTRO_PAUSED:t.pauseTitle,DECISION:t.choiceTitle,OUTCOME_PLAY:t.outcomeTitle,OUTCOME_PAUSED:t.pauseTitle,RESULT:t.resultTitle.replace('{branch}',branch||'?')};
 const descriptions={INTRO_PAGE:t.readyDetail,INTRO_PLAY:t.playDetail,INTRO_PAUSED:t.pauseDetail,DECISION:t.choiceDetail,OUTCOME_PLAY:t.outcomeDetail,OUTCOME_PAUSED:t.pauseDetail,RESULT:t.resultDetail};
 const phases={INTRO_PAGE:t.ready,INTRO_PLAY:t.playing,INTRO_PAUSED:t.paused,DECISION:t.decision,OUTCOME_PLAY:t.outcome,OUTCOME_PAUSED:t.paused,RESULT:t.resultPhase};
 $('phaseName').textContent=phases[phase]||t.ready;$('phaseTitle').textContent=titles[phase]||t.readyTitle;$('detail').textContent=descriptions[phase]||t.readyDetail;
 $('choices').hidden=!decision;$('result').hidden=!result;$('result').textContent=branch?t['result'+branch]:'';
 $('start').hidden=phase!=='INTRO_PAGE';$('pause').hidden=!playing;$('resume').hidden=!paused;$('retry').hidden=!result;$('replay').hidden=!result;
 $('purpleLegend').hidden=!hasPurple||branch!=='C'||!['OUTCOME_PLAY','OUTCOME_PAUSED','RESULT'].includes(phase);
 $('lookDown').hidden=mode!=='eye';$('lookDown').setAttribute('aria-pressed',String(mode==='eye'&&lookDownActive));
 $('selfCard').hidden=mode!=='eye';stage.classList.toggle('eye-mode',mode==='eye');
 $('selfExpand').textContent=$('selfCard').classList.contains('expanded')?t.collapse:t.expand;
 for(const button of document.querySelectorAll('[data-view]')){button.classList.toggle('active',button.dataset.view===mode);button.setAttribute('aria-pressed',String(button.dataset.view===mode));}
 for(const button of document.querySelectorAll('[data-branch]'))button.classList.toggle('active',button.dataset.branch===branch);
 $('progressFill').style.width=(phase==='INTRO_PAGE'?0:Math.round(progress*100))+'%';document.querySelector('.progress-track').setAttribute('aria-valuenow',Math.round(progress*100));
 $('viewInfo').textContent=t.viewInfo;showCoachTip();$('occlusion').hidden=learningMode==='practice'&&phase!=='RESULT';if(config.dynamicResetLabel)$('resetCamera').textContent=mode==='eye'?t.lookUphill:t.resetCamera;
}
function initMini(){if(miniRenderer||!renderer)return;
 try{miniRenderer=new Renderer67($('selfCanvas'),miniRider.list,{ground:false,world:true,samples:1,pixelRatio:1,memoryBudgetMiB:42,environment:{lightDirection:[-.5,.9,.6],keyIntensity:1.1,fillIntensity:.7,ambientIntensity:.9},shadows:false});}
 catch(e){rendererError='Mini-3D: '+e.message;miniRenderer=null;$('selfCard').hidden=true;}
}
function paintMini(pose){if(mode!=='eye')return;initMini();if(!miniRenderer)return;
 setRiderPose(miniRider,pose.blue,{mini:true,eye:false});
 miniRenderer.updateParts(miniRider.list,{shadows:false,checks:false});const mw=$('selfCanvas').clientWidth,mh=$('selfCanvas').clientHeight;if(mw!==lastMiniWidth||mh!==lastMiniHeight){miniRenderer.resize();lastMiniWidth=mw;lastMiniHeight=mh;}miniRenderer.render(miniCamera());
}
function syncActors(p){setRiderPose(blue,p.blue,{eye:mode==='eye'});setRiderPose(orange,p.orange);if(purple)setRiderPose(purple,p.purple,{visible:branch==='C'&&['OUTCOME_PLAY','OUTCOME_PAUSED','RESULT'].includes(phase)});for(const r of ambientRiders){const pose=p.extras?.[r.id];setRiderPose(r.model,pose||{x:0,y:-100,z:0},{visible:!!pose});}}
function tick(now){
 raf=0;
 const rawDelta=Math.max(0,(now-lastT)/1000);
 lastT=now;
 const playing=phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY';
 // Safari can continue RAF in an inactive tab without promptly sending visibilitychange.
 // The actual loop must guard loss of focus AND a long throttling gap before advancing time.
 // Never auto-resume a paused lesson when it returns to the foreground.
 if(playing&&(document.hidden||!document.hasFocus()||rawDelta>.5)){
  pauseForBackground();
  return;
 }
 const dt=clamp(rawDelta,0,.085);
 if(playing){const duration=phase==='INTRO_PLAY'?introDuration:outcomeDuration;progress=clamp(progress+dt*speed/duration);if(progress>=1){phase=phase==='INTRO_PLAY'?'DECISION':'RESULT';renderUI();}}
 const pose=frameFor(phase,branch,progress);
 const occlusion=config.occludedByHill?config.occludedByHill([pose.blue.x,pose.blue.y+2.05,pose.blue.z],[pose.orange.x,pose.orange.y+1.4,pose.orange.z]):null;
 $('occlusion').textContent=occlusion?(occlusion.blocked?ui().occluded:ui().visible):ui().trafficNote;$('occlusion').hidden=learningMode==='practice'&&phase!=='RESULT';
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
function showFallback(err){
 rendererError=String(err?.message||err);
 const error=$('error');error.hidden=false;
 const fallbackUrl=config.fallbackUrl;
 const link=document.createElement('a');link.href=fallbackUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent=ui().openOriginal;
 link.setAttribute('data-fallback','original');
 error.replaceChildren(document.createTextNode(ui().engineUnavailable+' '),link);
 $('renderStatus').textContent='WebGL2 UNAVAILABLE';
}
try{renderer=new Renderer67(canvas,parts,{ground:false,world:true,pixelRatio:1,samples:2,memoryBudgetMiB:160,environment:{lightDirection:[-.6,.85,.55],keyIntensity:1.12,fillIntensity:.66,ambientIntensity:.80,skyTop:[.46,.69,.87],skyBottom:[.81,.90,.97],fogDensity:.001},shadows:true});}
catch(err){showFallback(err);}
for(const button of document.querySelectorAll('[data-view]'))button.addEventListener('click',()=>setView(button.dataset.view));
$('rigToggle')?.addEventListener('click',()=>{
 if(!config.rigChoice)return;
 config.rigChoice.toggleRig();
 refreshRigControl();
 scheduleFrame();
});

for(const button of document.querySelectorAll('[data-branch]'))button.addEventListener('click',()=>{if(phase==='DECISION')choose(button.dataset.branch);});
$('resetCamera').onclick=()=>setView(mode);
$('lookDown').onclick=()=>{if(mode!=='eye')return;lookDownActive=!lookDownActive;
 if(lookDownActive){if(config.rememberLookDown)eyeBeforeLookDown={yaw:eyeYaw,pitch:eyePitch,fov:eyeFov};$('selfCard').classList.remove('expanded');eyePitch=-.60;eyeYaw=.08;eyeFov=83;}
 else if(config.rememberLookDown&&eyeBeforeLookDown){eyeYaw=eyeBeforeLookDown.yaw;eyePitch=eyeBeforeLookDown.pitch;eyeFov=eyeBeforeLookDown.fov;eyeBeforeLookDown=null;}
 else{eyePitch=0;eyeYaw=0;eyeFov=65;}
 renderUI();scheduleFrame();};
$('selfExpand').onclick=()=>{$('selfCard').classList.toggle('expanded');renderUI();scheduleFrame();};
$('langBtn').onclick=()=>{lang=lang==='zh'?'en':'zh';applyLang();scheduleFrame();};
$('learningModeToggle').onclick=()=>{learningMode=learningMode==='practice'?'demo':'practice';
 if(mode==='eye')setView('eye');else{renderUI();scheduleFrame();}
};
$('start').onclick=start;$('pause').onclick=pause;$('resume').onclick=resume;
$('retry').onclick=()=>{branch=null;progress=1;setPhase('DECISION');};
$('replay').onclick=()=>{progress=0;setPhase('OUTCOME_PLAY');};
$('speed').onchange=e=>{speed=Number(e.target.value)||1;scheduleFrame();};
function pointerDistance(){const a=[...pointers.values()];return a.length<2?null:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}
canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2)pinchLast=pointerDistance();});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;e.preventDefault();const prev=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pointers.size===1){const dx=e.clientX-prev.x,dy=e.clientY-prev.y;
  if(mode==='eye'){eyeYaw=clamp(eyeYaw+dx*.007,-config.maxEyeYaw,config.maxEyeYaw);eyePitch=clamp(eyePitch+dy*.006,-1.12,.76);lookDownActive=false;$('lookDown').setAttribute('aria-pressed','false');}
  else{orbit.az+=dx*.008;orbit.el=clamp(orbit.el+dy*.007,.16,1.38);}
 }else if(pointers.size===2){const current=pointerDistance();if(pinchLast&&current>10){const ratio=pinchLast/current;if(mode==='eye')eyeFov=clamp(eyeFov*ratio,38,88);else orbit.dist=clamp(orbit.dist*ratio,12,72);}pinchLast=current;}
 scheduleFrame();});
function endPointer(e){pointers.delete(e.pointerId);pinchLast=pointers.size===2?pointerDistance():null;try{canvas.releasePointerCapture(e.pointerId);}catch{}}
for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,endPointer);
canvas.addEventListener('wheel',e=>{e.preventDefault();const scale=e.deltaY>0?1.085:.925;if(mode==='eye')eyeFov=clamp(eyeFov*scale,38,88);else orbit.dist=clamp(orbit.dist*scale,12,72);scheduleFrame();},{passive:false});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key))return;e.preventDefault();let dx=e.key==='ArrowLeft'?-.12:e.key==='ArrowRight'?.12:0;let dy=e.key==='ArrowUp'?-.10:e.key==='ArrowDown'?.10:0;if(mode==='eye'){eyeYaw+=dx;eyePitch=clamp(eyePitch+dy,-1.12,.76);if(['+','-'].includes(e.key))eyeFov=clamp(eyeFov*(e.key==='+'?.91:1.09),38,88);}else{orbit.az+=dx;orbit.el=clamp(orbit.el+dy,.15,1.38);if(['+','-'].includes(e.key))orbit.dist=clamp(orbit.dist*(e.key==='+'?.9:1.1),12,72);}scheduleFrame();});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);raf=0;rendererError='WebGL context lost';showFallback(new Error(rendererError));});
new ResizeObserver(()=>{scheduleFrame();}).observe(stage);
// A Safari tab may lose window focus before document.hidden becomes true.
// Fail safe: pause on both blur and visibility/page lifecycle, never auto-resume.
function pauseForBackground(){
 lastT=performance.now();
 if(phase==='INTRO_PLAY'||phase==='OUTCOME_PLAY')pause();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseForBackground();else{lastT=performance.now();scheduleFrame();}});
window.addEventListener('blur',pauseForBackground);
window.addEventListener('pagehide',pauseForBackground);
window.addEventListener('pageshow',()=>{lastT=performance.now();scheduleFrame();});
window.__pilot={
 status:()=>{const pose=frameFor(phase,branch,progress);
  const occlusion=config.occludedByHill?config.occludedByHill([pose.blue.x,pose.blue.y+2.05,pose.blue.z],[pose.orange.x,pose.orange.y+1.4,pose.orange.z]):null;
  return {engine:'67.js',runtimeRevision:'67js-shared-20261113-v1',edition:config.edition,scenarioId:config.scenarioId,learningMode,coachTipVisible:!$('coachTip').hidden,
   ...(causalChecks?{checks:causalChecks(),trafficCheck:config.trafficCheck}:{}),
   ...(occlusion?{lineOfSightBlocked:occlusion.blocked}:{}),ambientRiders:ambientRiders.map(x=>x.id),
   version:VERSION,rigStyle:config.rigChoice?.getRigStyle()||'legacy',rigDiscipline:config.rigDiscipline||'snowboard',phase,branch,progress,mode,lang,speed,canvas:[canvas.width,canvas.height],frameCount:renderFrames,actors:pose,viewCamera:camera(pose),selfMeshHidden:mode==='eye',selfCardVisible:mode==='eye'&&!$('selfCard').hidden,selfCardExpanded:$('selfCard').classList.contains('expanded'),eyeFov,lookDownActive,rendererError,shadowRefreshes:lastShadowRefresh,rendererBatches:renderer?.batches?.length,partCount:parts.length,frameMs:frameTimes.length?frameTimes.reduce((a,b)=>a+b,0)/frameTimes.length:null};},
 setRigStyle:(style)=>{if(!config.rigChoice)throw new Error('No rig trial');config.rigChoice.setRigStyle(style);refreshRigControl();scheduleFrame();},
 setPhase,choose,setView,reset,debug:{seek:(ph,b,q)=>{phase=ph;branch=b;progress=clamp(q);renderUI();scheduleFrame();},render:scheduleFrame},terrainHeight:H
};
applyLang();renderUI();scheduleFrame();

}
