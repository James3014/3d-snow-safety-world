import {matrix,material,makePart,clamp,primitive,cone} from './geometry.js';
import {SCENARIO,H} from './scenario.js';
const lift=SCENARIO.id==='lift-exit';
function normal(x,z){const dx=(H(x+.07,z)-H(x-.07,z))/.14,dz=(H(x,z+.07)-H(x,z-.07))/.14,v=1/Math.hypot(dx,1,dz);return [-dx*v,v,-dz*v];}
function terrain(){const nx=76,nz=111,positions=[],normals=[],colors=[],indices=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
  const x=-12+24*i/nx,z=-20+40*j/nz,ice=.008*Math.sin(x*.63+z*.42);positions.push(x,H(x,z),z);normals.push(...normal(x,z));colors.push(clamp(.88+ice),clamp(.925+ice),clamp(.969+ice));
 }for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+nx+1;indices.push(a,b,a+1,a+1,b,b+1);}
 return {positions:new Float32Array(positions),normals:new Float32Array(normals),colors:new Float32Array(colors),indices:new Uint32Array(indices)};
}
function ribbon(points,width,offset=.075){const positions=[],normals=[],indices=[],cross=Math.max(2,Math.ceil(width/.46)),stride=cross+1;let rows=0;
 for(let seg=0;seg<points.length-1;seg++){
  const a=points[seg],b=points[seg+1],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz)||1,steps=Math.max(1,Math.ceil(len/.34)),nx=-dz/len,nz=dx/len;
  for(let j=seg===0?0:1;j<=steps;j++){
   const q=j/steps,x=a[0]+dx*q,z=a[1]+dz*q;
   for(let k=0;k<=cross;k++){const u=(k/cross-.5)*width,px=x+nx*u,pz=z+nz*u;positions.push(px,H(px,pz)+offset,pz);normals.push(...normal(px,pz));}
   if(rows){const old=(rows-1)*stride,cur=rows*stride;for(let k=0;k<cross;k++){const a=old+k,b=a+1,c=cur+k,d=c+1;indices.push(a,b,c,b,d,c);}}rows++;
  }
 }return {positions:new Float32Array(positions),normals:new Float32Array(normals),indices:new Uint32Array(indices)};
}
function stripes(){const positions=[],normals=[],indices=[];let id=0;for(let z=-17;z<=17;z+=2.8){for(const x of [-7.1,7.1]){const top=H(x,z)+.1;positions.push(x-.05,top,z-.4,x+.05,top,z-.4,x-.05,top,z+.4,x+.05,top,z+.4);for(let i=0;i<4;i++)normals.push(0,1,0);indices.push(id,id+2,id+1,id+2,id+3,id+1);id+=4;}}return {positions:new Float32Array(positions),normals:new Float32Array(normals),indices:new Uint32Array(indices)};}
export function worldParts(){const parts=[],add=(name,geo,mat,m=matrix(0,0,0))=>parts.push(makePart(name,geo,mat,m));const snow=rgb=>({...material(...rgb),doubleSided:true,castShadow:false,receiveShadow:false});
 add('snow-hill',terrain(),{...material(.96,.98,1),doubleSided:true});
 add('piste-snow',ribbon(SCENARIO.lanes[0].points,SCENARIO.lanes[0].width),snow(lift?[.80,.89,.95]:[.79,.88,.95]));
 for(let i=1;i<SCENARIO.lanes.length;i++){const lane=SCENARIO.lanes[i];if(lane.width<.3)add(`route-guide-${i}`,ribbon(lane.points,Math.max(.075,lane.width),.094),snow([.47,.70,.79]));}
 if(!lift){add('subtle-boundary-dashes',stripes(),snow([.56,.73,.80]));const positions=[[-10,-14],[-10,-6],[-9,5],[9,-14],[9,-7],[10,4],[9,12]];
  for(let i=0;i<positions.length;i++){const [x,z]=positions[i],y=H(x,z);add(`tree-${i}-trunk`,primitive.cylinder,material(.42,.35,.28),matrix(x,y+.5,z,.14,1,.14));add(`tree-${i}-pine`,cone,material(.19,.44,.46),matrix(x,y+1.45,z,.75,2.0,.75));}
 }else{
  // Facility is physical geometry, not a text label: visibly bounded unload ramp,
  // overhead roof, support pylons, pass-through clearance and exit corridor.
  const x=-1.2,z=-6.6,y=H(x,z);
  add('lift-station-unloading-ramp',primitive.box,material(.64,.78,.86),matrix(x,y+.20,z,7,.35,4.5));
  for(const side of [-1,1]){const px=x+side*3.35;
   add(`lift-station-pylon-${side}`,primitive.cylinder,material(.34,.47,.53),matrix(px,y+2.5,z-1.0,.25,5,.25));
  }
  add('lift-station-overhead-canopy',primitive.box,material(.25,.53,.64),matrix(x,y+5,z-.9,8.3,.37,3.0));
  add('lift-station-visible-tram',primitive.box,material(.20,.38,.48),matrix(x,y+3.45,z-2.1,1.5,.4,1.25));
  add('unloading-ramp-clear-zone',primitive.box,material(.80,.90,.92),matrix(x,y+.42,z+1.35,6.6,.035,1.75));
  // A lightly marked edge of the exit zone. No imaginary automatic safety barrier.
  for(const sx of [-4.0,1.6])add(`exit-clearance-side-${sx}`,primitive.box,material(.30,.67,.80),matrix(sx,H(sx,-2.4)+.15,-2.4,.13,.13,3.4));
  add('exit-clearance-front-line',primitive.box,material(.21,.66,.76),matrix(x,H(x,-.4)+.13,-.4,7.1,.12,.12));
  add('lift-station-advisory-sign',primitive.box,material(.91,.66,.26),matrix(-5.8,H(-5.8,-3)+1.8,-3,1.25,1.2,.12));
  add('lift-station-advisory-pole',primitive.cylinder,material(.39,.49,.55),matrix(-5.8,H(-5.8,-3)+.72,-3,.1,1.45,.1));
 }
 return parts;
}
