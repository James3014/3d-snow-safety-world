import test from 'node:test';
import assert from 'node:assert/strict';
import {buildSmoothHuman,poseDefinitions,assertSingleSurface} from './smooth-skin.js';

const finite=a=>Array.from(a).every(Number.isFinite);
for(const mode of ['stand','snowboard','carve']){
 test(`${mode} produces one organic body with no detachable joint balls`,()=>{
  const rig=buildSmoothHuman(mode,{resolution:.055});
  assert.deepEqual(rig.parts.map(x=>x.name),mode==='stand'?['skin']:['skin','board','binding-front','binding-rear']);
  assert(rig.skin.positions.length>1000 && rig.skin.indices.length>1500);
  assert(finite(rig.skin.positions)&&finite(rig.skin.normals));
  assert(Array.from(rig.skin.normals).every(x=>x<=1.001&&x>=-1.001));
  assert.equal(assertSingleSurface(rig.skin),1,'a single connected body, not spheres linked by sticks');
  assert.equal(rig.skin.positions.length/3,rig.skin.normals.length/3);
  assert(rig.skin.positions.length/3<180000,'bounded geometry for future optimization');
 });
}
test('head and limb proportions, stance and snowboarding bindings are real geometry',()=>{
 const neutral=poseDefinitions('stand');
 const bent=poseDefinitions('snowboard');
 const carving=poseDefinitions('carve');
 assert(neutral.head[1]>neutral.shoulders[0][1]+.40);
 assert(neutral.headRadius>=.29&&neutral.headRadius<=.37);
 assert(neutral.hips[0][1]-neutral.feet[0][1]>.9,'longer legs');
 assert(neutral.shoulders[0][0]<neutral.hips[0][0]);
 assert(bent.head[1]<neutral.head[1]-.15,'visible squat');
 assert.equal(bent.feet.length,2);
 assert(bent.feet[0][2]*bent.feet[1][2]<0,'two feet separated along the board');
 assert(carving.head[0]>bent.head[0],'carving has lateral lean');
 assert.equal(buildSmoothHuman('snowboard').parts.filter(x=>x.name.startsWith('binding-')).length,2);
});
