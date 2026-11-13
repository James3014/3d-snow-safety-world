import {primitive,material,matrix,makePart,clamp} from './geometry.js';

// Deterministic articulated procedural rig. The same descriptors and pose functions
// drive both the full-size rider and the inset; no 2D card sprite or pose substitute.
const MAT={boot:material(.13,.20,.28),pants:material(.25,.33,.43),skin:material(.98,.81,.66),helmet:material(.14,.25,.35),goggles:material(.07,.24,.37),binding:material(.18,.27,.35),snow:material(.82,.94,.96)};
const palettes={
 blue:{jacket:material(.12,.46,.75),accent:material(.20,.75,.82),board:material(.21,.65,.85)},
 orange:{jacket:material(.90,.40,.22),accent:material(.98,.72,.39),board:material(.93,.58,.31)},
 purple:{jacket:material(.54,.32,.72),accent:material(.82,.68,.90),board:material(.68,.47,.87)}
};
const fixed=[
 ['board','box','board',[0,.14,0,.57,.11,2.38], 'deck'],
 ['board-nose','sphere','board',[0,.14,1.18,.285,.055,.24],'deck'],
 ['board-tail','sphere','board',[0,.14,-1.18,.285,.055,.24],'deck'],
 ['deck-stripe-left','box','binding',[-.267,.20,0,.034,.026,2.07],'deck'],
 ['deck-stripe-right','box','binding',[.267,.20,0,.034,.026,2.07],'deck'],
 ['binding-front','box','binding',[0,.245,.52,.48,.10,.27],'boots'],
 ['binding-rear','box','binding',[0,.245,-.50,.48,.10,.27],'boots'],
 ['boot-front','sphere','boot',[.10,.37,.52,.31,.18,.20],'boots'],
 ['boot-rear','sphere','boot',[.10,.37,-.50,.31,.18,.20],'boots'],
 ['strap-front','box','accent',[.22,.45,.52,.16,.045,.30],'boots'],
 ['strap-rear','box','accent',[.22,.45,-.50,.16,.045,.30],'boots']
];
const parts=[
 ['pelvis','sphere','pants'],['torso','sphere','jacket'],['vest-zip','box','accent'],
 ['neck','sphere','skin'],['head','sphere','skin'],['helmet','sphere','helmet'],['visor','sphere','goggles'],['glasses','box','accent'],
 ['knee-front','sphere','pants'],['knee-rear','sphere','pants'],['ankle-front','sphere','pants'],['ankle-rear','sphere','pants'],
 ['thigh-front','sphere','pants'],['thigh-rear','sphere','pants'],['shin-front','sphere','pants'],['shin-rear','sphere','pants'],
 ['shoulder-front','sphere','jacket'],['shoulder-rear','sphere','jacket'],['elbow-front','sphere','jacket'],['elbow-rear','sphere','jacket'],
 ['arm-upper-front','sphere','jacket'],['arm-upper-rear','sphere','jacket'],['arm-lower-front','sphere','jacket'],['arm-lower-rear','sphere','jacket'],
 ['hand-front','sphere','boot'],['hand-rear','sphere','boot'],['scarf','sphere','accent']
];
function linkMatrix(a,b,r=.13){const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],len=Math.hypot(...d)||.0001,uy=d.map(x=>x/len);
 const axis=Math.abs(uy[1])>.93?[1,0,0]:[0,1,0];
 const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 let ux=cross(axis,uy),n=Math.hypot(...ux)||1;ux=ux.map(x=>x/n);const uz=cross(ux,uy);
 const t=[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2];
 return new Float32Array([ux[0]*r,ux[1]*r,ux[2]*r,0,uy[0]*len/2,uy[1]*len/2,uy[2]*len/2,0,uz[0]*r,uz[1]*r,uz[2]*r,0,...t,1]);
}
export function createRider(id,paletteKey='blue'){
 const palette=palettes[paletteKey];const m=k=>palette[k]||MAT[k];
 const descriptors=[...fixed.map(([n,geo,col,shape,role])=>({name:n,geo,col,shape,role})),...parts.map(([n,geo,col])=>({name:n,geo,col,role:'body'}))];
 const list=descriptors.map(d=>makePart(`${id}-${d.name}`,primitive[d.geo],m(d.col)));
 const index=Object.fromEntries(descriptors.map((d,i)=>[d.name,list[i]]));
 const role=Object.fromEntries(descriptors.map(d=>[d.name,d.role]));
 return {id,descriptors,list,index,role,palette};
}
export function setRiderPose(rider,pose,{mini=false,eye=false,renderDeck=true,visible=true}={}){
 if(!visible){for(const part of rider.list)part.matrix=matrix(0,-110,0);return;}
 const p=mini?{...pose,x:0,y:0,z:0}:{...pose};const q=pose.phaseProgress??0;
 const yaw=pose.yaw||0,lean=pose.lean||0,edge=clamp(lean*.16,-.22,.22);
 const kneeFlex=.16+.045*Math.sin(q*Math.PI*2)+Math.abs(lean)*.13;
 const c=Math.cos(yaw),s=Math.sin(yaw);
 function root(loc,{tilt=false}={}){
  let [x,y,z]=loc;
  if(tilt){const roll=lean*.48,cos=Math.cos(roll),sin=Math.sin(roll),pivot=1.02;const dy=y-pivot;x=x*cos-dy*sin;y=pivot+x*sin+dy*cos;}
  return [p.x+x*c+z*s,p.y+y,p.z-x*s+z*c];
 }
 const hide=()=>matrix(0,-110,0);
 function point(n,pos,scale,tilt=false,role='body'){
  const [x,y,z]=root(pos,{tilt});rider.index[n].matrix=(eye&&role==='body')||(!renderDeck&&role!=='body')?hide():matrix(x,y,z,...scale,yaw,tilt?lean*.48:0);
 }
 function segment(n,a,b,radius=.16,role='body'){
  rider.index[n].matrix=(eye&&role==='body')||(!renderDeck&&role!=='body')?hide():linkMatrix(root(a,{tilt:true}),root(b,{tilt:true}),radius);
 }
 for(const d of rider.descriptors){if(d.shape){const [x,y,z,sx,sy,sz]=d.shape;point(d.name,[x,y,z],[sx,sy,sz],false,d.role);}}
 const hip=[-.03,1.08,0],chest=[.012,1.44,0],neck=[0,1.85,.06],head=[0,2.16,.08];
 const sway=.065*Math.sin(q*2*Math.PI)+lean*.15;
 point('pelvis',hip,[.33,.24,.49],true);
 point('torso',[.015,1.45,.02],[.35,.48,.50],true);
 point('vest-zip',[.346,1.48,.02],[.025,.25,.10],true);
 point('neck',neck,[.20,.16,.20],true);
 point('head',head,[.365,.35,.35],true);
 point('helmet',[0,2.38,.075],[.407,.27,.394],true);
 point('visor',[.035,2.20,.42],[.27,.14,.10],true);
 point('glasses',[.03,2.21,.503],[.19,.039,.028],true);
 point('scarf',[.015,1.87,.10],[.21,.055,.24],true);
 for(const [key,sign] of [['front',1],['rear',-1]]){
  const z=.51*sign,ankle=[.10,.48,z],knee=[.21+kneeFlex*.35,.80-kneeFlex*.30,z*.92],thigh=[-.02,1.07,z*.67],shoulder=[0,1.65,z*.90],elbow=[.09+sway,1.32,z*1.23],hand=[.13+sway*1.5,1.04,z*1.52];
  point('ankle-'+key,ankle,[.17,.17,.17],true);
  point('knee-'+key,knee,[.23,.22,.22],true);
  segment('shin-'+key,ankle,knee,.18);
  segment('thigh-'+key,knee,thigh,.21);
  point('shoulder-'+key,shoulder,[.235,.245,.225],true);
  point('elbow-'+key,elbow,[.17,.17,.17],true);
  segment('arm-upper-'+key,shoulder,elbow,.17);
  segment('arm-lower-'+key,elbow,hand,.145);
  point('hand-'+key,hand,[.15,.16,.15],true);
 }
}
export const riderGroups={all:fixed.map(x=>x[0]).concat(parts.map(x=>x[0])),deck:fixed.filter(x=>x[4]==='deck').map(x=>x[0]),boots:fixed.filter(x=>x[4]==='boots').map(x=>x[0]),body:parts.map(x=>x[0])};
