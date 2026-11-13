import test from 'node:test';
import assert from 'node:assert/strict';
import {createRigChoice} from '../shared/geometric-rig.js';

const geometry = {
  primitive: {box:{type:'box'},sphere:{type:'sphere'}},
  material:(r,g,b)=>({color:[r,g,b]}),
  matrix:(x,y,z,...other)=>new Float32Array([x,y,z,...other]),
  makePart:(name,mesh,mat)=>({name,geometry:mesh,material:mat,matrix:new Float32Array([0,-90,0])}),
  clamp:(n,min,max)=>Math.max(min,Math.min(max,n))
};
function legacyCreateRider(id){return {id,list:[{name:id+'-old',matrix:new Float32Array([0])}]};}
function legacySetRiderPose(r,pose,{visible=true}={}){r.list[0].matrix=new Float32Array([visible?pose.x:-110]);}
const frame={x:4.25,y:12,z:-2.2,yaw:.6,lean:.24,phaseProgress:.3};

test('original rig is the default and identical pose when geometric rig exists',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
 const a=choice.createRider('blue','blue');
 assert.equal(choice.getRigStyle(),'legacy');
 choice.setRiderPose(a,frame);
 assert.deepEqual([...a.legacy.list[0].matrix],[frame.x]);
 assert(a.geometric.list.every(p=>p.matrix[1]===-110),'new geometry starts hidden');
 choice.setRigStyle('geometric');
 choice.setRiderPose(a,frame);
 assert.equal(a.legacy.list[0].matrix[0],-110);
 assert.equal(a.geometric.list.some(p=>p.matrix[1]!==-110),true);
 choice.setRigStyle('legacy');
 choice.setRiderPose(a,frame);
 assert.equal(a.legacy.list[0].matrix[0],frame.x);
});

test('white featureless head, visible role accents, one snowboard and two bindings',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
 const a=choice.createRider('orange','orange').geometric;
 const names=a.list.map(p=>p.name);
 assert(names.includes('orange-head'));
 assert(!names.some(n=>/visor|glasses|goggles|eyes|mouth/.test(n)));
 assert.equal(names.filter(n=>n.endsWith('-board')).length,1);
 assert.equal(names.filter(n=>n.includes('-binding-')).length,2);
 const color=a.list.find(p=>p.name==='orange-role-chest').material.color;
 const white=a.list.find(p=>p.name==='orange-head').material.color;
 assert(color[0]>color[2],'orange accent is warm');
 assert(white.every(v=>v>.84),'head is light');
});

test('ski variant is materially different: two separate skis and lateral stance',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'ski'});
 const a=choice.createRider('blue','blue').geometric;
 assert.equal(a.list.filter(p=>/-ski-(left|right)$/.test(p.name)).length,2);
 assert.equal(a.list.filter(p=>p.name.endsWith('-board')).length,0);
 const footPositions=a.stanceFeet;
 assert(footPositions[0][0]<0 && footPositions[1][0]>0);
});

test('all actor identities share one rig implementation and switching does not mutate authored pose',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
 const actors=['blue','orange','purple','trafficWest'].map((id,i)=>choice.createRider(id,['blue','orange','purple','purple'][i]));
 const before=JSON.stringify(frame);
 choice.setRigStyle('geometric');
 actors.forEach(a=>choice.setRiderPose(a,frame));
 assert.equal(JSON.stringify(frame),before);
 assert(actors.every(a=>a.geometric.list.some(p=>p.matrix[1]!==-110)));
});

test('stick-reference: no helmet shell or torso armor; compact torso and slim limb joints',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
 const a=choice.createRider('orange','orange').geometric;
 const names=a.list.map(p=>p.name);
 assert(!names.includes('orange-head-rim'),'head must read as one white sphere, not a helmet');
 assert(!names.includes('orange-torso-rim'),'torso must not read as padded armor');
 choice.setRigStyle('geometric');
 choice.setRiderPose({legacy:legacyCreateRider('orange'),geometric:a},frame);
 assert(a.index.torso.matrix[3]<=.30,'torso should be narrow');
 assert(a.index['knee-a'].matrix[3]<=.15,'knee should not look like a ball joint');
 assert(a.index['shoulder-a'].matrix[3]<=.16,'shoulder accent is a small patch, not a ball');
 assert(a.index['hand-a'].matrix[3]<=.12,'hands should be simple');
});

test('stick-reference: longer leg silhouette and smaller head relative to height',()=>{
 const choice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
 const a=choice.createRider('blue','blue');
 choice.setRigStyle('geometric');
 choice.setRiderPose(a,{...frame,y:0,yaw:0,lean:0});
 const head=a.geometric.index.head.matrix;
 const foot=a.geometric.index['knee-a'].matrix;
 assert(head[1]>2.65,'head center must sit above the short, squat original body');
 assert(head[3]<.38,'head radius should be below old 0.39');
 assert(foot[1]>.91,'higher knee is required for a visibly elongated shin');
 assert(head[1]-.45>2.1,'head-to-board vertical proportion should be elongated');
});
