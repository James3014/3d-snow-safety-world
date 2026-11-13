/**
 * Issue #7 / scene 04 ONLY: a real deformable, continuously connected surface.
 * The authored safety tracks and RAF/Renderer67/camera/phase machine are owned
 * by shared/runtime.js; this module ONLY supplies per-actor visual mesh poses.
 *
 * The single V3 surface has one fixed topology and four skin influences per
 * vertex. A separate GPU skin palette per actor deforms knees, torso, arms and
 * head. Existing board/boots/bindings follow the original authored root.
 * Identity joint 0 locks the lower ankles to the original board attachments.
 * The pose is an illustrative procedural motion, not a verified biomechanics
 * solver: no independent speed, collisions, falling or knee physics inferred.
 */
import {buildSmoothHuman,poseDefinitions} from '../rig-lab/smooth-skin.js';
import {createGeometricRider,poseGeometricRider} from './geometric-rig.js';

const N_JOINTS=7;
const J={ankles:0,torso:1,frontKnee:2,rearKnee:3,frontArm:4,rearArm:5,head:6};
const IDENTITY=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
const LIMIT=(a,lo,hi)=>Math.max(lo,Math.min(hi,a));
const smooth=(a,b,x)=>{const t=LIMIT((x-a)/(b-a),0,1);return t*t*(3-2*t);};

// Squat and body lean are derived ONLY from the canonical pose (phaseProgress
// and lean); never from independent runtime timers or a guessed km/h value.
export function postureParameters(pose){
 const q=LIMIT(Number.isFinite(pose?.phaseProgress)?pose.phaseProgress:0,0,1);
 const lean=LIMIT(Number.isFinite(pose?.lean)?pose.lean:0,-.6,.6);
 const wave=Math.sin(q*Math.PI);
 return {q,lean,crouch:.028+.085*wave+.44*Math.abs(lean),sway:Math.sin(q*Math.PI*2)*.14};
}

// A matrix that moves mesh-local vertices around a resting anatomical pivot,
// then applies a small translation. All rotations remain proper (det = +1).
function pivotMatrix(pivot,angleX=0,angleZ=0,translation=[0,0,0]){
 const cx=Math.cos(angleX),sx=Math.sin(angleX),cz=Math.cos(angleZ),sz=Math.sin(angleZ);
 const c0=[cz,sz,0],c1=[-sz*cx,cz*cx,sx],c2=[sz*sx,-cz*sx,cx];
 const t=[pivot[0]+translation[0]-(c0[0]*pivot[0]+c1[0]*pivot[1]+c2[0]*pivot[2]),
          pivot[1]+translation[1]-(c0[1]*pivot[0]+c1[1]*pivot[1]+c2[1]*pivot[2]),
          pivot[2]+translation[2]-(c0[2]*pivot[0]+c1[2]*pivot[1]+c2[2]*pivot[2])];
 return new Float32Array([...c0,0,...c1,0,...c2,0,...t,1]);
}

export function poseJointMatrices(pose){
 const {crouch,sway,lean}=postureParameters(pose);
 const matrices=[
  IDENTITY,
  pivotMatrix([.07,1.18,0],-crouch*.12,lean*.29,[lean*.048,-crouch*.36,0]),
  pivotMatrix([.12,.76,-.43],-crouch*.77,lean*.12),
  pivotMatrix([.13,.76,.43],crouch*.68,-lean*.10),
  pivotMatrix([-.15,1.9,-.13],.06+sway+lean*.13,-lean*.07),
  pivotMatrix([.31,1.9,.13],-.07-sway-lean*.12,lean*.07),
  pivotMatrix([.10,2.3,.04],crouch*.17,-lean*.18),
 ];
 const output=new Float32Array(N_JOINTS*16);
 for(let i=0;i<N_JOINTS;i++)output.set(matrices[i],i*16);
 return output;
}

function distSeg(p,a,b){
 const u=b.map((v,i)=>v-a[i]),v=p.map((x,i)=>x-a[i]);
 const len=u.reduce((r,x)=>r+x*x,0)||1;
 const t=LIMIT(v.reduce((r,x,i)=>r+x*u[i],0)/len,0,1);
 return Math.hypot(...p.map((x,i)=>x-(a[i]+u[i]*t)));
}

/** Finite, nonnegative normalized influences; max four joints per vertex. */
export function buildSkinInfluences(mesh){
 const n=mesh.positions.length/3;
 const indices=new Uint16Array(n*4),weights=new Float32Array(n*4);
 const s=poseDefinitions('snowboard');
 for(let v=0;v<n;v++){
  const p=Array.from(mesh.positions.subarray(v*3,v*3+3)),[x,y,z]=p;
  const scores=new Array(N_JOINTS).fill(0);
  scores[J.ankles]=1.5*(1-smooth(.36,.93,y));
  scores[J.torso]=smooth(.67,1.25,y)*(1-.84*smooth(2.22,2.70,y));
  scores[J.head]=1.75*smooth(2.20,2.59,y);
  const kneeWave=smooth(.37,.82,y)*(1-smooth(1.04,1.37,y));
  const signed=LIMIT((z+.48)/.96,0,1);
  scores[J.frontKnee]=1.34*kneeWave*(1-signed);
  scores[J.rearKnee]=1.34*kneeWave*signed;
  for(const [i,slot] of [[0,J.frontArm],[1,J.rearArm]]){
   const d=Math.min(distSeg(p,s.shoulders[i],s.elbows[i]),distSeg(p,s.elbows[i],s.hands[i]));
   // Shoulder influence wins only along the actual arm silhouette; blending
   // back to torso near its insertion prevents a seam while rotating.
   scores[slot]=2.4*(1-smooth(.065,.245,d))*smooth(1.07,1.30,y);
  }
  const ranking=scores.map((score,joint)=>({joint,score})).sort((a,b)=>b.score-a.score).slice(0,4);
  let sum=ranking.reduce((a,x)=>a+x.score,0);
  if(sum<1e-8){ranking[0]={joint:J.torso,score:1};sum=1;}
  for(let k=0;k<4;k++){indices[v*4+k]=ranking[k].joint;weights[v*4+k]=ranking[k].score/sum;}
 }
 return {skinIndices:indices,skinWeights:weights};
}

let sharedGeometry;
function skinnedMesh(){
 if(!sharedGeometry){
  const body=buildSmoothHuman('snowboard',{resolution:.10}).skin;
  // One continuous mesh with smoothly graded vertex colors: a nearly-white
  // featureless spherical head and restrained pearl-grey body. No silhouette
  // outline part or separate head sphere, which would reintroduce seams.
  // Cool-grey limbs remain distinguishable on light snow, while gear remains
  // actor-color coded from the established blue/orange/purple board palette.
  const colors=new Float32Array(body.positions.length);
  for(let i=0;i<body.positions.length;i+=3){
   const light=smooth(2.28,2.62,body.positions[i+1]);
   colors[i]=.73+.26*light;
   colors[i+1]=.77+.22*light;
   colors[i+2]=.81+.19*light;
  }
  sharedGeometry={...body,colors,...buildSkinInfluences(body)};
 }
 return sharedGeometry;
}

function fallbackSkinPose(){
 const matrices=new Float32Array(N_JOINTS*16);
 for(let i=0;i<N_JOINTS;i++)matrices.set(IDENTITY,i*16);
 return {jointMatrices:matrices};
}

export function createSmoothMotionRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline='snowboard',createSkinPose}){
 if(discipline!=='snowboard')throw new TypeError('Scene 04 prototype requires snowboard');
 let style='legacy';
 const createRider=(id,palette='blue')=>{
  const legacy=legacyCreateRider(id,palette);
  // Reuse exactly the former gear placement, not the segmented limb parts.
  const gear=createGeometricRider(id,palette,geometry,'snowboard');
  const gearParts=gear.definitions.filter(d=>d.role==='gear').map(d=>gear.index[d.name]);
  const material=geometry.material(.97,.98,.99);
  material.emission=.05;material.doubleSided=true;
  const smooth=geometry.makePart(id+'-smooth-body',skinnedMesh(),material);
  smooth.skin=createSkinPose?createSkinPose(N_JOINTS):fallbackSkinPose();
  smooth.matrix=geometry.matrix(0,-110,0);
  return {id,legacy,gear,smooth,list:[...legacy.list,...gearParts,smooth]};
 };
 const setRiderPose=(actor,pose,opts={})=>{
  const showing=opts.visible!==false;
  legacySetRiderPose(actor.legacy,pose,{...opts,visible:showing&&style==='legacy'});
  poseGeometricRider(actor.gear,pose,{...opts,visible:showing&&style==='geometric'});
  if(!showing||!pose||style!=='geometric'||opts.eye){actor.smooth.matrix=geometry.matrix(0,-110,0);return;}
  const p=opts.mini?{...pose,x:0,y:0,z:0}:pose;
  // Only rotate/translate the source root, never recompute its authored path.
  actor.smooth.matrix=geometry.matrix(p.x,p.y,p.z,1,1,1,p.yaw||0,(p.lean||0)*.48);
  actor.smooth.skin.jointMatrices.set(poseJointMatrices(p));
 };
 return {
  createRider,setRiderPose,
  getRigStyle:()=>style,
  setRigStyle:(value)=>{if(!['legacy','geometric'].includes(value))throw new TypeError('Unknown rig style');style=value;},
  toggleRig:()=>{style=style==='legacy'?'geometric':'legacy';return style;}
 };
}
