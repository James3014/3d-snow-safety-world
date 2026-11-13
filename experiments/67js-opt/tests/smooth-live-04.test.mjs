import test from 'node:test';
import assert from 'node:assert/strict';
import {createSmoothMotionRigChoice} from '../shared/smooth-motion-rig.js';
const geometry={
 primitive:{sphere:{kind:'sphere'},box:{kind:'box'}},
 material:(r,g,b)=>({color:[r,g,b]}),
 matrix:(x,y,z,sx=1,sy=1,sz=1,yaw=0,roll=0)=>new Float32Array([x,y,z,sx,sy,sz,yaw,roll]),
 makePart:(name,geometry,material)=>({name,geometry,material,matrix:new Float32Array([0,-110,0])})
};
const legacyCreateRider=(id)=>({id,list:[{name:id+'-old',matrix:new Float32Array([0,-110,0])}]});
const legacySetRiderPose=(r,p,{visible=true}={})=>{r.list[0].matrix=geometry.matrix(visible?p.x:0,visible?p.y:-110,visible?p.z:0);};
const make=()=>createSmoothMotionRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
const pose={x:4.25,y:12,z:-2.2,yaw:.6,lean:.24,phaseProgress:.3};

test('smooth prototype contains one contiguous body mesh, no discrete visible joint parts',()=>{
 const a=make().createRider('blue','blue');
 const smooth=a.list.filter(p=>p.name.endsWith('-smooth-body'));
 assert.equal(smooth.length,1);
 const g=smooth[0].geometry;
 assert(g.indices instanceof Uint32Array);
 assert(g.positions.length>5000 && g.positions.length===g.normals.length);
 assert(!a.list.some(p=>/(knee|elbow|shoulder|thigh|shin|torso)(-|$)/.test(p.name)),'candidate parts must not contain visible capsules');
 assert.equal(a.list.filter(p=>p.name.includes('-binding-')).length,2);
});

test('same authored x/y/z/yaw/lean control the single-surface mannequin and equipment',()=>{
 const choice=make(),a=choice.createRider('orange','orange'),before=JSON.stringify(pose);
 choice.setRiderPose(a,pose);
 assert.equal(a.smooth.matrix[1],-110,'default is legacy');
 choice.setRigStyle('geometric');choice.setRiderPose(a,pose);
 assert.equal(a.smooth.matrix[0],pose.x);
 assert.equal(a.smooth.matrix[1],pose.y);
 assert(Math.abs(a.smooth.matrix[2]-pose.z)<1e-5);
 assert(Math.abs(a.smooth.matrix[6]-pose.yaw)<1e-5);
 assert(Math.abs(a.smooth.matrix[7]-pose.lean*.48)<1e-5);
 assert.equal(a.legacy.list[0].matrix[1],-110);
 assert.equal(JSON.stringify(pose),before,'authored pose source unchanged');
 assert(a.list.some(p=>p.name==='orange-board'&&p.matrix[1]!==-110));
 choice.setRigStyle('legacy');choice.setRiderPose(a,pose);
 assert.equal(a.smooth.matrix[1],-110);
});

test('same mesh reused for actors and first person hides head; no new engine clock',()=>{
 const choice=make(),actors=['blue','orange','purple','self'].map((id)=>choice.createRider(id,id==='self'?'blue':id));
 assert(actors.every(a=>a.smooth.geometry===actors[0].smooth.geometry));
 choice.setRigStyle('geometric');
 const mini=actors[3];choice.setRiderPose(mini,pose,{mini:true});
 assert.equal(mini.smooth.matrix[0],0);assert.equal(mini.smooth.matrix[1],0);
 choice.setRiderPose(mini,pose,{eye:true});
 assert.equal(mini.smooth.matrix[1],-110);
 choice.setRiderPose(actors[0],pose,{visible:false});
 assert.equal(actors[0].smooth.matrix[1],-110);
});
