/**
 * Visual snowboard/ground contact for the isolated scene04 V3 pilot.
 * No authored x/z/yaw/safety timeline is mutated. The 67.js existing H(x,z)
 * remains the only snow-surface authority; we sample it under a single rigid
 * deck and align the board's longitudinal pitch and transverse edge direction.
 * It is a terrain-fitted graphic approximation, NOT a dynamics/pressure solver.
 */
const clamp=(v,low,high)=>Math.max(low,Math.min(high,v));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const scale=(a,k)=>a.map(v=>v*k);
const norm=a=>{const m=Math.hypot(...a)||1;return scale(a,1/m);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const add=(a,b)=>a.map((v,i)=>v+b[i]);

export function terrainBoardPoint(frame,local){
 const {origin,basis}=frame;
 return [0,1,2].map(i=>origin[i]+basis.x[i]*local[0]+basis.y[i]*local[1]+basis.z[i]*local[2]);
}

export function fitSnowboardToTerrain(pose,groundHeight,opts={}){
 if(typeof groundHeight!=='function')throw new TypeError('Scene04 requires the canonical H(x,z) function');
 if(!pose||![pose.x,pose.y,pose.z,pose.yaw||0].every(Number.isFinite))throw new TypeError('Finite authored pose required');
 const yaw=pose.yaw||0,cy=Math.cos(yaw),sy=Math.sin(yaw);
 const longStep=1.22,wideStep=.45;
 const H=(x,z)=>{const h=groundHeight(x,z);if(!Number.isFinite(h))throw new TypeError('Nonfinite snow geometry');return h;};
 const along=(distance)=>H(pose.x+sy*distance,pose.z+cy*distance);
 const across=(distance)=>H(pose.x+cy*distance,pose.z-sy*distance);
 const longSlope=(along(longStep)-along(-longStep))/(longStep*2);
 const wideSlope=(across(wideStep)-across(-wideStep))/(wideStep*2);
 const z=norm([sy,longSlope,cy]);
 const x0=[cy,wideSlope,-sy],x=norm(sub(x0,scale(z,dot(z,x0))));
 const up=norm(cross(z,x));
 // The board may tip very slightly onto one edge as authored lean changes,
 // but no guessed longitudinal speed or snow-friction equation is introduced.
 const edgeAngle=clamp((pose.lean||0)*.30,-.14,.14);
 const ca=Math.cos(edgeAngle),sa=Math.sin(edgeAngle);
 const basis={x:add(scale(x,ca),scale(up,sa)),y:sub(scale(up,ca),scale(x,sa)),z};
 const clearance=opts.clearance??.016;
 // Board and nose/tail parts have a ~.07-unit lower surface relative to
 // deck-local origin. Test full contact width and both shaped board tips.
 const deckBottom=opts.deckBottom??.073;
 const base={origin:[pose.x,pose.y,pose.z],basis};
 const points=[];
 for(const zz of [-1.40,-1.19,-.68,0,.68,1.19,1.40])for(const xx of [-.275,0,.275]){
  const local=[xx,deckBottom,zz],world=terrainBoardPoint(base,local);
  const snow=H(world[0],world[2]);
  points.push({x:xx,z:zz,snow,requiredLift:snow+clearance-world[1]});
 }
 const lift=Math.max(...points.map(v=>v.requiredLift));
 const origin=[pose.x,pose.y+lift,pose.z];
 const result={origin,basis,clearance,lift,edgeAngle,longSlope,wideSlope};
 result.contactSamples=points.map(p=>{
  const world=terrainBoardPoint(result,[p.x,deckBottom,p.z]);
  return {x:p.x,z:p.z,gap:world[1]-p.snow,snow:p.snow};
 });
 return result;
}

/** A physically oriented rigid visual transform. Local source actor path stays
 * unchanged; this only places the board/boots/skinned mesh near the snow. */
export function snowboardSurfaceMatrix(frame,local=[0,0,0],size=[1,1,1],bodyRoll=0){
 const c=Math.cos(bodyRoll),s=Math.sin(bodyRoll),b=frame.basis;
 const ax=add(scale(b.x,c),scale(b.y,s));
 const ay=sub(scale(b.y,c),scale(b.x,s));
 const center=terrainBoardPoint(frame,local);
 return new Float32Array([
  ax[0]*size[0],ax[1]*size[0],ax[2]*size[0],0,
  ay[0]*size[1],ay[1]*size[1],ay[2]*size[1],0,
  b.z[0]*size[2],b.z[1]*size[2],b.z[2]*size[2],0,
  ...center,1
 ]);
}
