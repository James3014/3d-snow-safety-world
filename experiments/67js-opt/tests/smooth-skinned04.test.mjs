import test from 'node:test';
import assert from 'node:assert/strict';
import {createSmoothMotionRigChoice} from '../shared/smooth-motion-rig.js';
const geometry={
 primitive:{sphere:{kind:'sphere'},box:{kind:'box'}},
 material:(r,g,b)=>({color:[r,g,b]}),
 matrix:(x=0,y=0,z=0,sx=1,sy=1,sz=1,yaw=0,roll=0)=>new Float32Array([x,y,z,sx,sy,sz,yaw,roll]),
 makePart:(name,geometry,material)=>({name,geometry,material,matrix:new Float32Array([0,-110,0])})
};
const legacyCreateRider=(id)=>({id,list:[{name:id+'-old',matrix:new Float32Array([0,-110,0])}]});
const legacySetRiderPose=(r,p,{visible=true}={})=>{r.list[0].matrix=geometry.matrix(visible?p.x:0,visible?p.y:-110,visible?p.z:0);};
const choice=()=>createSmoothMotionRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
const frame={x:3,y:9,z:1,yaw:.6,lean:.16,phaseProgress:.4};
const approx=(actual,expected,tol=1e-4)=>assert(Math.abs(actual-expected)<tol,`${actual} !== ${expected}`);
function matrixChanges(a,b){let count=0;for(let i=0;i<a.length;i++)if(Math.abs(a[i]-b[i])>1e-5)count++;return count;}

test('continuous V3 surface is really GPU skinned with a fixed shared mesh and 4 normalized influences per vertex',()=>{
 const c=choice(),a=c.createRider('blue','blue'),b=c.createRider('orange','orange');
 const {skin,geometry:mesh}=a.smooth;
 assert(skin?.jointMatrices instanceof Float32Array,'must have GPU palette, not a rigid object');
 assert.equal(mesh,a.smooth.geometry);
 assert.equal(mesh,b.smooth.geometry,'reuse immutable surface geometry');
 assert.notEqual(skin,b.smooth.skin,'independent per-actor pose');
 assert.equal(mesh.skinIndices.length,mesh.positions.length/3*4);
 assert.equal(mesh.skinWeights.length,mesh.positions.length/3*4);
 for(let j=0;j<mesh.skinWeights.length;j+=4){
  approx(mesh.skinWeights[j]+mesh.skinWeights[j+1]+mesh.skinWeights[j+2]+mesh.skinWeights[j+3],1,1e-3);
 }
});

test('same authored root with different progress changes the internal knee/shoulder palette',()=>{
 const c=choice(),a=c.createRider('blue');c.setRigStyle('geometric');
 c.setRiderPose(a,{...frame,lean:0,phaseProgress:0});
 const rootA=Array.from(a.smooth.matrix),jointA=Array.from(a.smooth.skin.jointMatrices);
 c.setRiderPose(a,{...frame,lean:0,phaseProgress:.5});
 const rootB=Array.from(a.smooth.matrix),jointB=Array.from(a.smooth.skin.jointMatrices);
 assert.deepEqual(rootB,rootA,'the same authored root must stay unchanged');
 assert(matrixChanges(jointA,jointB)>12,'false-green: rigid root is not knee deformation');
});

test('lean changes internal posture without changing authored pose or board and both bindings',()=>{
 const c=choice(),a=c.createRider('orange','orange');c.setRigStyle('geometric');
 const before=JSON.stringify(frame);c.setRiderPose(a,{...frame,lean:0});
 const palette=Array.from(a.smooth.skin.jointMatrices);
 c.setRiderPose(a,frame);
 assert(matrixChanges(palette,a.smooth.skin.jointMatrices)>12);
 assert.equal(JSON.stringify(frame),before);
 assert.equal(a.gear.definitions.filter(d=>d.name.includes('binding-')).length,2);
 assert(a.gear.index.board.matrix[1]!==-110);
 const ankleBase=Array.from(a.smooth.skin.jointMatrices.slice(0,16));
 const expectedIdentity=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
 assert.deepEqual(ankleBase,expectedIdentity,'ankle must remain board-locked');
});

test('A/B rollback, eye invisibility and mini full-body skinning remain isolated',()=>{
 const c=choice(),a=c.createRider('blue');
 c.setRiderPose(a,frame);assert.equal(a.smooth.matrix[1],-110);
 c.setRigStyle('geometric');c.setRiderPose(a,frame);
 const active=Array.from(a.smooth.skin.jointMatrices);
 assert(active.some((x,i)=>i%16===12&&Math.abs(x)>.0001),'joint translations should be non-zero');
 c.setRiderPose(a,frame,{eye:true});assert.equal(a.smooth.matrix[1],-110);
 c.setRiderPose(a,frame,{mini:true,eye:false});assert.equal(a.smooth.matrix[0],0);assert.equal(a.smooth.matrix[1],0);
 c.setRigStyle('legacy');c.setRiderPose(a,frame);assert.equal(a.smooth.matrix[1],-110);
});

test('high snow contrast: light spherical head stays brighter than pearl-grey moving limbs without an extra helmet shell',()=>{
 const a=choice().createRider('blue');const geo=a.smooth.geometry;
 assert(geo.colors instanceof Float32Array,'single skinned mesh carries smooth per-vertex head/body contrast');
 assert.equal(geo.colors.length,geo.positions.length);
 let head=0,headCount=0,body=0,bodyCount=0;
 for(let i=0;i<geo.positions.length;i+=3){
  const y=geo.positions[i+1];
  if(y>2.67){head+=geo.colors[i];headCount++;}
  if(y>1.35&&y<1.80){body+=geo.colors[i];bodyCount++;}
 }
 assert(headCount>30&&bodyCount>30);
 assert(head/headCount-body/bodyCount>.15);
 assert(body/bodyCount<.84,'silhouette must stand out against high-albedo snow');
});
