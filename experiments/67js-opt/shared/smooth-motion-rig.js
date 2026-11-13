/**
 * Issue #7 / scene 04 only: a visual *shape* adapter for the single connected
 * mannequin surface. Not yet a continuously deforming skeletal animation.
 *
 * Both appearances receive the exact authored pose; only the old rig is
 * movement-accepted. The new surface follows x/y/z/yaw/lean as one shape,
 * while the board and both bindings follow the original gear placement.
 * No engine, RAF, camera, scenario or background lifecycle is replaced.
 */
import {buildSmoothHuman} from '../rig-lab/smooth-skin.js';
import {createGeometricRider,poseGeometricRider} from './geometric-rig.js';

// A single immutable topology and normal set shared across all actors.
// 0.10 is the bounded visual-test resolution, not a phone FPS signoff.
let cachedMesh;
function bodyMesh(){
 if(!cachedMesh)cachedMesh=buildSmoothHuman('snowboard',{resolution:.10}).skin;
 return cachedMesh;
}

export function createSmoothMotionRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline='snowboard'}){
 if(discipline!=='snowboard')throw new TypeError('Scene 04 visual-only prototype requires snowboard');
 let style='legacy';
 const createRider=(id,palette='blue')=>{
  const legacy=legacyCreateRider(id,palette);
  // Reuse existing gear-only definitions, not the segmented body parts.
  const gear=createGeometricRider(id,palette,geometry,'snowboard');
  const gearParts=gear.definitions.filter(d=>d.role==='gear').map(d=>gear.index[d.name]);
  const material=geometry.material(.86,.89,.93);
  material.emission=.15;material.doubleSided=true;
  const smooth=geometry.makePart(id+'-smooth-body',bodyMesh(),material);
  smooth.matrix=geometry.matrix(0,-110,0);
  return {id,legacy,gear,smooth,list:[...legacy.list,...gearParts,smooth]};
 };
 const setRiderPose=(actor,pose,opts={})=>{
  const showing=opts.visible!==false;
  legacySetRiderPose(actor.legacy,pose,{...opts,visible:showing&&style==='legacy'});
  poseGeometricRider(actor.gear,pose,{...opts,visible:showing&&style==='geometric'});
  if(!showing||!pose||style!=='geometric'||opts.eye){actor.smooth.matrix=geometry.matrix(0,-110,0);return;}
  const p=opts.mini?{...pose,x:0,y:0,z:0}:pose;
  actor.smooth.matrix=geometry.matrix(p.x,p.y,p.z,1,1,1,p.yaw||0,(p.lean||0)*.48);
 };
 return {
  createRider,setRiderPose,
  getRigStyle:()=>style,
  setRigStyle:(value)=>{if(!['legacy','geometric'].includes(value))throw new TypeError('Unknown rig style');style=value;},
  toggleRig:()=>{style=style==='legacy'?'geometric':'legacy';return style;}
 };
}
