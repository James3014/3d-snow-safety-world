/** QA-only fixture: fixed root/camera isolates GPU joint deformation.
 * Not imported by the 67.js lesson or included in any production build. */
import {Renderer67,createSkinPose} from '67js';
import * as geometry from '../src/geometry.js';
import {createSmoothMotionRigChoice,poseJointMatrices} from '../../shared/smooth-motion-rig.js';
const mockCreate=()=>({list:[]});
const rig=createSmoothMotionRigChoice({geometry,legacyCreateRider:mockCreate,legacySetRiderPose:()=>{},discipline:'snowboard',createSkinPose});
rig.setRigStyle('geometric');
const actor=rig.createRider('probe','orange');
const canvas=document.getElementById('scene');
let renderer,frames=0,lastPose=null,error=null;
try{renderer=new Renderer67(canvas,[actor.smooth],{ground:false,world:true,pixelRatio:1,samples:1,memoryBudgetMiB:65,
 environment:{lightDirection:[-.6,.8,.4],keyIntensity:1.5,fillIntensity:.65,ambientIntensity:.72,skyTop:[.08,.13,.21],skyBottom:[.14,.19,.29],fogDensity:0},shadows:false});}
catch(e){error=e.message;}
const camera={eye:[6.1,3.0,-7.4],target:[0,1.48,0],fov:29,near:.05,far:120};
function render(q,lean){
 if(!renderer)throw Error('Probe renderer '+error);
 const p={x:0,y:0,z:0,yaw:0,lean,phaseProgress:q};
 rig.setRiderPose(actor,p);
 // QA-only negative control: freeze global authored root orientation so that
 // any changed pixels are from the GPU skin joint palette, not a rigid turn.
 actor.smooth.matrix=geometry.matrix(0,0,0);
 renderer.resize();renderer.updateParts([actor.smooth],{checks:true,shadows:false});renderer.render(camera);
 frames++;lastPose=p;
 return {q,lean,frames,palette:Array.from(actor.smooth.skin.jointMatrices),root:Array.from(actor.smooth.matrix),error};
}
window.__skinProbe={render,status:()=>({ready:!!renderer,error,frames,lastPose,parts:renderer?.partCount,skinned:actor.smooth.skin?.jointMatrices.length===112,vertexCount:actor.smooth.geometry.positions.length/3})};
if(renderer)render(0,0);
