import {Renderer67,box,sphere} from '67js';
import {createGeometricRider,poseGeometricRider} from '../shared/geometric-rig.js';
import {buildSmoothHuman} from './smooth-skin.js';

const $=id=>document.getElementById(id);
const boxGeom=box(),sphereGeom=sphere(24,16);
const M=(x=0,y=0,z=0,sx=1,sy=1,sz=1)=>new Float32Array([sx,0,0,0,0,sy,0,0,0,0,sz,0,x,y,z,1]);
const mat=(r,g,b,roughness=.85)=>({color:[r,g,b],metallic:0,roughness,emission:0});
const hidden=()=>M(0,-90,0);
const g={primitive:{box:boxGeom,sphere:sphereGeom},material:mat,matrix:M,makePart:(name,geometry,material)=>({name,geometry,material,matrix:hidden()})};
const oldRider=createGeometricRider('before','orange',g,'snowboard');
const oldFloor={name:'old-floor',geometry:boxGeom,material:mat(.095,.125,.17),matrix:M(0,-.20,0,3.4,.12,3.5)};
const newFloor={name:'new-floor',geometry:boxGeom,material:mat(.095,.125,.17),matrix:M(0,-.20,0,3.4,.12,3.5)};
const poses=new Map();
for(const mode of ['stand','snowboard','carve']){
 const built=buildSmoothHuman(mode,{resolution:.055});
 const parts=built.parts.map(p=>{
  if(p.name==='skin')return {name:mode+'-skin',geometry:built.skin,material:mat(.94,.945,.96,.73),matrix:hidden()};
  const board=p.name==='board',s=p.scale,pos=p.center;
  return {name:mode+'-'+p.name,geometry:boxGeom,material:board?mat(.18,.63,.81,.54):mat(.18,.34,.43,.82),matrix:M(...pos,...s)};
 });
 for(const part of parts){part._visibleMatrix=part.matrix;part.matrix=hidden();}
 poses.set(mode,{...built,parts});
}
const originals=[oldFloor,...oldRider.list];
const smooth=[newFloor,...[...poses.values()].flatMap(p=>p.parts)];
const optionsForTheme=()=>({ground:false,world:true,pixelRatio:1.5,samples:2,memoryBudgetMiB:190,
 environment:{lightDirection:[-.5,.9,.75],keyIntensity:state.theme==='snow'?1.20:1.6,fillIntensity:.90,ambientIntensity:state.theme==='snow'?.82:.79,
 skyTop:state.theme==='snow'?[.63,.78,.90]:[.055,.08,.12],skyBottom:state.theme==='snow'?[.87,.92,.96]:[.12,.16,.23],fogDensity:0},shadows:true});
let renderers=null;
let state={pose:'snowboard',view:'three',theme:'studio',azimuth:.72,pitch:.14,zoom:6.65};
const viewAzi={front:0,three:.72,side:Math.PI/2};
const setButton=(group,key,value)=>document.querySelectorAll(`#${group} button`).forEach(b=>{
 const current=b.dataset[key]===value;
 b.classList.toggle('active',current);b.setAttribute('aria-pressed',String(current));
});
function camera(){
 const az=state.azimuth,rad=state.zoom,target=[0,1.55,0];
 const elev=state.pitch;
 return {eye:[Math.sin(az)*Math.cos(elev)*rad,target[1]+Math.sin(elev)*rad,Math.cos(az)*Math.cos(elev)*rad],target,fov:33,near:.05,far:120};
}
function applyPose(){
 poseGeometricRider(oldRider,{x:0,y:0,z:0,yaw:0,lean:state.pose==='carve'?.25:0,phaseProgress:.45});
 for(const [mode,entry] of poses){const show=mode===state.pose;
  for(const p of entry.parts){
   if(!show){p.matrix=hidden();continue;}
   if(p.name.endsWith('-skin'))p.matrix=M();
   else p.matrix=p._visibleMatrix;
  }
 }
}
function render(){
 if(!renderers)return;
 const cv=camera();
 for(const [id,r,parts] of [['old',renderers.old,oldRider.list],['new',renderers.new,smooth]]){
  const el=$(id);r.resize();r.updateParts(parts,{checks:false,shadows:false});r.render(cv);
 }
 $('status').textContent=`WebGL2 運作正常 · ${state.pose} · ${state.view} · ${state.theme} · 新版為單一連續表面（沒有關節零件）`;
}
function applyTheme(){
 const snow=state.theme==='snow';
 for(const p of [oldFloor,newFloor])p.material.color=snow?[.82,.89,.94]:[.095,.125,.17];
}
function start(){
 try{
  const options=optionsForTheme();
  renderers={old:new Renderer67($('old'),originals,options),new:new Renderer67($('new'),smooth,options)};
  applyPose();render();
 }catch(e){$('status').textContent='WebGL2 無法啟動：'+e.message;console.error(e);window.__rigLabError=e.message;return;}
}
function setPose(pose){if(!poses.has(pose))return;state.pose=pose;applyPose();setButton('poses','pose',pose);render();}
function setView(view){if(!(view in viewAzi))return;state.view=view;state.azimuth=viewAzi[view];setButton('views','view',view);render();}
function setTheme(theme){
 if(!['studio','snow'].includes(theme)||state.theme===theme)return;
 state.theme=theme;applyTheme();setButton('themes','theme',theme);
 // Renderer67 makes the sky shaders immutable at construction; re-create only
 // this isolated lab's two viewports, never a production lesson renderer.
 try{renderers?.old.dispose();renderers?.new.dispose();renderers=null;
  const options=optionsForTheme();renderers={old:new Renderer67($('old'),originals,options),new:new Renderer67($('new'),smooth,options)};render();}
 catch(e){$('status').textContent='切換背景失敗：'+e.message;window.__rigLabError=e.message;}
}
for(const b of document.querySelectorAll('[data-pose]'))b.onclick=()=>setPose(b.dataset.pose);
for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>setView(b.dataset.view);
for(const b of document.querySelectorAll('[data-theme]'))b.onclick=()=>setTheme(b.dataset.theme);
for(const canvas of [$('old'),$('new')]){
 let last=null;
 canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);last=[e.clientX,e.clientY];});
 canvas.addEventListener('pointermove',e=>{if(!last)return;state.azimuth+=((e.clientX-last[0])*.009);state.pitch=Math.max(-.35,Math.min(.83,state.pitch+(last[1]-e.clientY)*.006));last=[e.clientX,e.clientY];state.view='custom';setButton('views','view','custom');render();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>last=null);
 canvas.addEventListener('wheel',e=>{e.preventDefault();state.zoom=Math.max(4.5,Math.min(11,state.zoom*(e.deltaY>0?1.08:.92)));render();},{passive:false});
 canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){state.azimuth-=.13;render();}else if(e.key==='ArrowRight'){state.azimuth+=.13;render();}});
}
window.addEventListener('resize',()=>render());
window.__rigLab={status:()=>({...state,ready:!!renderers,error:window.__rigLabError||null,vertexCounts:Object.fromEntries([...poses.entries()].map(([name,p])=>[name,p.skin.positions.length/3]))}),setPose,setView,setTheme};
setButton('poses','pose',state.pose);setButton('views','view',state.view);setButton('themes','theme',state.theme);
start();
