import test from 'node:test';
import assert from 'node:assert/strict';
import {frameFor,H} from '../scene04/src/scenario.js';
import {fitSnowboardToTerrain,terrainBoardPoint} from '../shared/snowboard-ground.js';
import {createSmoothMotionRigChoice} from '../shared/smooth-motion-rig.js';

const testGeometry={
 primitive:{sphere:{kind:'sphere'},box:{kind:'box'}},
 material:(r,g,b)=>({color:[r,g,b]}),
 matrix:(x=0,y=0,z=0,sx=1,sy=1,sz=1,yaw=0,roll=0)=>new Float32Array([sx,0,0,0,0,sy,0,0,0,0,sz,0,x,y,z,1]),
 makePart:(name,geo,material)=>({name,geometry:geo,material,matrix:new Float32Array(16)})
};
const oldCreate=(id)=>({list:[{name:id+'-old',matrix:testGeometry.matrix()}]});
const oldPose=(r,p,{visible=true}={})=>r.list[0].matrix=testGeometry.matrix(visible?(p?.x||0):0,visible?(p?.y||0):-110,visible?(p?.z||0):0);
const create=(height=H)=>createSmoothMotionRigChoice({geometry:testGeometry,legacyCreateRider:oldCreate,legacySetRiderPose:oldPose,discipline:'snowboard',groundHeight:height});
const approx=(a,b,delta=1e-3)=>assert(Math.abs(a-b)<=delta,`${a} vs ${b}`);

test('snowboard sits on the curved snow in all authored scene04 A/B/C frames without tunneling or floating',()=>{
 for(const branch of ['A','B','C'])for(const q of [0,.1,.25,.5,.8,1])for(const who of ['blue','orange']){
  const f=frameFor('OUTCOME_PAUSED',branch,q),pose=f[who];
  const fit=fitSnowboardToTerrain(pose,H);
  assert(fit.contactSamples.length>=12);
  assert(fit.clearance>=.008&&fit.clearance<=.035);
  for(const sample of fit.contactSamples){
   assert(sample.gap>=.007,`${branch} ${who} ${q} board tunneling ${JSON.stringify(sample)}`);
   assert(sample.gap<=.20,`${branch} ${who} ${q} board floats ${JSON.stringify(sample)}`);
  }
  assert(Math.abs(fit.basis.z[1])>.001,'must tilt along slope, not flat board');
  const originalHeight=H(pose.x,pose.z);
  assert(Math.abs(fit.origin[1]-originalHeight)<.25,'visual-only contact adjustment must be bounded');
 }
});

test('board normal, lean-edge contact, boot/binding transforms and original authored path are preserved',()=>{
 const pose={...frameFor('OUTCOME_PAUSED','B',.5).blue,lean:.22};
 const source=JSON.stringify(pose),c=create(),a=c.createRider('blue','blue');
 c.setRigStyle('geometric');c.setRiderPose(a,pose);
 const fit=fitSnowboardToTerrain(pose,H);
 assert.equal(JSON.stringify(pose),source);
 const matrix=a.gear.index.board.matrix;
 const expected=terrainBoardPoint(fit,[0,.14,0]);
 approx(matrix[12],expected[0]);approx(matrix[13],expected[1]);approx(matrix[14],expected[2]);
 assert(Math.abs(matrix[9])>.01,'longitudinal board orientation must vary with terrain');
 for(const name of ['binding-front','binding-rear','boot-front','boot-rear']){
  const part=a.gear.index[name];assert(part.matrix[13]>0);
  assert.equal(Math.sign(part.matrix[9]),Math.sign(matrix[9]),name+' must follow same snowboard pitch');
 }
 approx(a.smooth.matrix[12],fit.origin[0]);approx(a.smooth.matrix[14],fit.origin[2]);
 assert.deepEqual(c.getRigStyle(),'geometric');
 c.setRigStyle('legacy');c.setRiderPose(a,pose);
 assert.equal(a.smooth.matrix[13],-110,'rollback hides skinned surface');
});

test('subtle front badge and back stripe follow the V3 skin, signal rider role, not eyes or a second helmet',()=>{
 const c=create(),blue=c.createRider('blue','blue'),orange=c.createRider('orange','orange');
 assert.equal(blue.markers.length,2);
 assert.deepEqual(blue.markers.map(p=>p.name),['blue-front-badge','blue-back-stripe']);
 for(const marker of blue.markers){
  assert.equal(marker.skin,blue.smooth.skin,'badge must deform with original V3 continuous surface');
  assert(marker.geometry.positions.length>0&&marker.geometry.positions.length<blue.smooth.geometry.positions.length*.13);
  assert(marker.material.color.every(x=>Number.isFinite(x)));
 }
 assert.notDeepEqual(blue.markers[0].material.color,orange.markers[0].material.color,'blue/orange role contrast');
 assert(blue.markers[0].geometry.positions.some((x,i)=>i%3===0&&x>.2),'front mark must be on torso forward surface');
 assert(blue.markers[1].geometry.positions.some((x,i)=>i%3===0&&x<-.13),'back mark must be behind torso');
 c.setRigStyle('geometric');const p=frameFor('OUTCOME_PAUSED','B',.5).blue;c.setRiderPose(blue,p);
 assert(blue.markers.every(m=>m.matrix[13]>0));
 c.setRiderPose(blue,p,{eye:true});assert(blue.markers.every(m=>m.matrix[13]===-110),'eye main view must not be obscured');
 c.setRiderPose(blue,p,{mini:true,eye:false});assert(blue.markers.every(m=>m.matrix[13]===blue.smooth.matrix[13]),'mini shows same markers');
});

test('scene04 surrounding traffic riders and intro/decision frames have the same snowboard-to-snow support',()=>{
 for(const phase of ['DECISION','OUTCOME_PAUSED'])for(const q of [0,.25,.5,.8,1]){
  const f=frameFor(phase,phase==='DECISION'?null:'B',q);
  for(const pose of [f.blue,f.orange,...Object.values(f.extras)]){
   const fit=fitSnowboardToTerrain(pose,H);
   assert(fit.contactSamples.every(s=>s.gap>=.007&&s.gap<.20));
  }
 }
});

test('front emblem is compact and back stripe is clearly taller than wide, with outward normals',()=>{
 const c=create(),actor=c.createRider('blue');
 const box=part=>{const p=part.geometry.positions,n=part.geometry.normals;
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(let i=0;i<p.length;i+=3)for(let d=0;d<3;d++){min[d]=Math.min(min[d],p[i+d]);max[d]=Math.max(max[d],p[i+d]);}
  const normalX=Array.from(n).filter((_,i)=>i%3===0);
  return {span:min.map((x,i)=>max[i]-x),normalX};};
 const front=box(actor.markers[0]),back=box(actor.markers[1]);
 assert(front.span[1]<.20&&front.span[2]<.20,'front badge must stay a small patch');
 assert(back.span[1]>back.span[2]*2.5,'back uses one distinctive short vertical stripe');
 assert(front.normalX.every(x=>x>.25));assert(back.normalX.every(x=>x<-.35));
 assert(actor.markers[0].geometry.positions.length<500);
 assert(actor.markers[1].geometry.positions.length<500);
});
