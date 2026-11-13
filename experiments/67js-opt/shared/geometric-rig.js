/**
 * Issue #7: reversible geometry-only rider trial. Authored poses and the
 * Renderer67, RAF, camera and lesson state machine are never altered.
 * Inactive meshes are moved out of the view frustum for atomic A/B changes.
 */
const COLORS={blue:[.16,.44,.80],orange:[.95,.42,.19],purple:[.60,.36,.77]};
function rodMatrix(a,b,radius){
 const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],len=Math.hypot(...d)||.0001;
 const up=d.map(v=>v/len),axis=Math.abs(up[1])>.93?[1,0,0]:[0,1,0];
 const cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];
 let right=cross(axis,up),n=Math.hypot(...right)||1;right=right.map(v=>v/n);
 const forward=cross(right,up),center=a.map((v,i)=>(v+b[i])*.5);
 return new Float32Array([
  right[0]*radius,right[1]*radius,right[2]*radius,0,
  up[0]*len*.5,up[1]*len*.5,up[2]*len*.5,0,
  forward[0]*radius,forward[1]*radius,forward[2]*radius,0,...center,1
 ]);
}
export function createGeometricRider(id,paletteKey,geometry,discipline='snowboard'){
 if(!['snowboard','ski'].includes(discipline))throw new TypeError('Explicit discipline required');
 const {primitive,material,makePart}=geometry,accent=COLORS[paletteKey]||COLORS.blue;
 const mats={white:material(.82,.86,.90),head:material(1,1,1),rim:material(.39,.49,.55),
  joint:material(.92,.94,.97),lightJoint:material(.92,.94,.97),
  boot:material(.26,.34,.42),binding:material(.29,.36,.43),
  accent:material(...accent),board:material(...accent)};
 mats.white.emission=.12;
 // Identical limb/joint surface removes the robotic segmented-armor look.
 mats.joint=mats.white;
 mats.lightJoint=mats.white;
 mats.head.emission=.32;
 const defs=[],add=(name,geo,col,position=null,role='body')=>defs.push({name,geo,col,position,role});
 if(discipline==='snowboard'){
  add('board','box','board',[0,.14,0,.58,.11,2.38],'gear');
  add('board-nose','sphere','board',[0,.14,1.17,.29,.064,.25],'gear');
  add('board-tail','sphere','board',[0,.14,-1.17,.29,.064,.25],'gear');
  add('rail-left','box','binding',[-.278,.205,0,.024,.02,2.14],'gear');
  add('rail-right','box','binding',[.278,.205,0,.024,.02,2.14],'gear');
  for(const [name,z] of [['front',.52],['rear',-.50]]){
   add('binding-'+name,'box','binding',[0,.25,z,.48,.10,.28],'gear');
   add('boot-'+name,'sphere','boot',[.10,.38,z,.28,.17,.21],'gear');
  }
 }else{
  for(const [name,x] of [['left',-.29],['right',.29]]){
   add('ski-'+name,'box','board',[x,.14,0,.19,.075,2.47],'gear');
   add('ski-tip-'+name,'sphere','board',[x,.15,1.23,.103,.065,.18],'gear');
   add('binding-'+name,'box','binding',[x,.23,0,.17,.10,.37],'gear');
   add('boot-'+name,'sphere','boot',[x,.38,.04,.17,.17,.30],'gear');
  }
 }
 for(const [name,geo,col] of [
  ['pelvis','sphere','white'],
  ['torso','sphere','white'],['role-chest','box','accent'],
  ['neck','sphere','white'],['head','sphere','head'],
  ['knee-a','sphere','joint'],['knee-b','sphere','joint'],
  ['thigh-a','sphere','white'],['thigh-b','sphere','white'],
  ['shin-a','sphere','white'],['shin-b','sphere','white'],
  ['shoulder-a','sphere','white'],['shoulder-b','sphere','white'],
  ['elbow-a','sphere','joint'],['elbow-b','sphere','joint'],
  ['upper-arm-a','sphere','white'],['upper-arm-b','sphere','white'],
  ['lower-arm-a','sphere','white'],['lower-arm-b','sphere','white'],
  ['hand-a','sphere','joint'],['hand-b','sphere','joint'],
  ['hip-a','sphere','lightJoint'],['hip-b','sphere','lightJoint']
 ])add(name,geo,col);
 const list=defs.map(d=>makePart(id+'-'+d.name,primitive[d.geo],mats[d.col]));
 const index=Object.fromEntries(defs.map((d,i)=>[d.name,list[i]]));
 const stanceFeet=discipline==='ski'?[[-.29,.45,.04],[.29,.45,.04]]:[[.10,.45,.52],[.10,.45,-.50]];
 return {id,list,index,definitions:defs,discipline,stanceFeet,geometry};
}
export function poseGeometricRider(rider,pose,{mini=false,eye=false,visible=true,renderDeck=true}={}){
 const {matrix}=rider.geometry,hidden=()=>matrix(0,-110,0);
 if(!visible||!pose){for(const part of rider.list)part.matrix=hidden();return;}
 const p=mini?{...pose,x:0,y:0,z:0}:pose;
 const yaw=p.yaw||0,lean=p.lean||0,q=p.phaseProgress??0;
 const c=Math.cos(yaw),s=Math.sin(yaw),flex=.17+.045*Math.sin(q*Math.PI*2)+Math.abs(lean)*.13;
 const sway=.07*Math.sin(q*2*Math.PI)+lean*.14;
 const root=(loc,tilt=false)=>{
  let [x,y,z]=loc;
  if(tilt){const a=lean*.48,co=Math.cos(a),si=Math.sin(a),dy=y-1.02;x=x*co-dy*si;y=1.02+x*si+dy*co;}
  return [p.x+x*c+z*s,p.y+y,p.z-x*s+z*c];
 };
 function point(name,at,size,tilt=true){
  const loc=root(at,tilt);
  rider.index[name].matrix=eye?hidden():matrix(...loc,...size,yaw,tilt?lean*.48:0);
 }
 function bone(name,a,b,r){rider.index[name].matrix=eye?hidden():rodMatrix(root(a,true),root(b,true),r);}
 for(const d of rider.definitions)if(d.position){
  const [x,y,z,sx,sy,sz]=d.position,loc=root([x,y,z]);
  rider.index[d.name].matrix=renderDeck?matrix(...loc,sx,sy,sz,yaw):hidden();
 }
 // Tall graphic silhouette: distinct round head, clean torso, slim limbs.
 // All board/contact points stay at their original authored position.
 point('pelvis',[0,1.31,0],[.20,.16,.26]);
 point('torso',[0,1.97,.015],[.255,.455,.30]);
 point('role-chest',[.26,2.08,.015],[.025,.065,.12]);
 point('neck',[0,2.48,.015],[.105,.12,.105]);
 point('head',[0,2.84,.045],[.325,.325,.325]);
 for(const [key,sign] of [['a',-1],['b',1]]){
  const ski=rider.discipline==='ski';
  const boot=ski?[sign*.29,.46,.04]:[.10,.46,sign*.51];
  const knee=ski?[sign*.30,1.12-flex*.20,.19+flex*.25]:[.13+flex*.22,1.12-flex*.20,sign*.47];
  const thigh=ski?[sign*.14,1.39,.02]:[-.015,1.39,sign*.32];
  const shoulder=ski?[sign*.32,2.29,0]:[0,2.29,sign*.345];
  const elbow=ski?[sign*(.42+Math.abs(sway)),1.83,.11]:[.07+sway,1.84,sign*.48];
  const hand=ski?[sign*(.51+Math.abs(sway)),1.51,.13]:[.10+sway*1.3,1.50,sign*.51];
  point('hip-'+key,thigh,[.09,.095,.095]);
  point('knee-'+key,knee,[.096,.096,.096]);
  bone('thigh-'+key,knee,thigh,.14);
  bone('shin-'+key,boot,knee,.12);
  point('shoulder-'+key,shoulder,[.135,.135,.135]);
  point('elbow-'+key,elbow,[.087,.087,.087]);
  bone('upper-arm-'+key,shoulder,elbow,.12);
  bone('lower-arm-'+key,elbow,hand,.11);
  point('hand-'+key,hand,[.092,.092,.092]);
 }
}
/** Composite factory: originals and candidates receive identical authored poses. */
export function createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline='snowboard'}){
 let current='legacy';
 const createRider=(id,palette='blue')=>{
  const legacy=legacyCreateRider(id,palette),geometric=createGeometricRider(id,palette,geometry,discipline);
  return {id,legacy,geometric,list:[...legacy.list,...geometric.list]};
 };
 const setRiderPose=(rider,pose,options={})=>{
  const visible=options.visible!==false;
  legacySetRiderPose(rider.legacy,pose,{...options,visible:visible&&current==='legacy'});
  poseGeometricRider(rider.geometric,pose,{...options,visible:visible&&current==='geometric'});
 };
 return {createRider,setRiderPose,getRigStyle:()=>current,setRigStyle:next=>{
  if(!['legacy','geometric'].includes(next))throw new TypeError('Invalid rig');
  current=next;
 },toggleRig:()=>{current=current==='legacy'?'geometric':'legacy';return current;}};
}
