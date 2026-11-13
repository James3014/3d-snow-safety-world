/** Static inspection camera for real V3.1 materials, not a public lesson. */
import {Renderer67,createSkinPose} from '67js';
import * as geometry from '../src/geometry.js';
import {createSmoothMotionRigChoice} from '../../shared/smooth-motion-rig.js';
const primitive=geometry.primitive;
const choice=createSmoothMotionRigChoice({geometry,legacyCreateRider:()=>({list:[]}),legacySetRiderPose:()=>{},discipline:'snowboard',createSkinPose,groundHeight:()=>0});
choice.setRigStyle('geometric');
let role='blue',rider=choice.createRider('blue','blue'),view='front';
const floor=geometry.makePart('snow-surface',primitive.box,geometry.material(.86,.90,.95),geometry.matrix(0,-.05,0,5,.1,5));
const parts=[floor,...rider.list];
const canvas=document.querySelector('#scene');
const renderer=new Renderer67(canvas,parts,{ground:false,world:true,pixelRatio:1.2,samples:1,memoryBudgetMiB:90,
 environment:{lightDirection:[-.5,.85,.4],keyIntensity:1.3,fillIntensity:1.15,ambientIntensity:.82,skyTop:[.64,.78,.89],skyBottom:[.83,.89,.95],fogDensity:0},shadows:false});
const cameras={front:[6.2,2.65,0],back:[-6.2,2.65,0],side:[0,2.65,6.2],three:[3.7,2.65,4.9]};
const pose={x:0,y:0,z:0,yaw:0,lean:.12,phaseProgress:.5};
function render(){choice.setRiderPose(rider,pose);renderer.resize();renderer.updateParts([floor,...rider.list],{checks:false,shadows:false});renderer.render({eye:cameras[view],target:[0,1.5,0],fov:34,near:.05,far:100});}
window.__facingProbe={setView(v){if(!(v in cameras))throw Error('view');view=v;render();},status(){return {view,role,parts:parts.length,frontCount:rider.markers[0].geometry.positions.length/3,backCount:rider.markers[1].geometry.positions.length/3,frontColor:rider.markers[0].material.color,backColor:rider.markers[1].material.color};}};
render();
