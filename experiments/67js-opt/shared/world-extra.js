/** Geometry adapters for authored ten-lesson scenarios. Props are *physical meshes*, not labels. */
export function createExtraWorld({SCENARIO,H,matrix,material,makePart,clamp,primitive,cone}){
 const theme=SCENARIO.id;
 const snow=rgb=>({...material(...rgb),doubleSided:true,castShadow:false,receiveShadow:false});
 function normal(x,z){const dx=(H(x+.08,z)-H(x-.08,z))/.16,dz=(H(x,z+.08)-H(x,z-.08))/.16,n=1/Math.hypot(dx,1,dz);return [-dx*n,n,-dz*n];}
 function terrain(){const pos=[],norm=[],colors=[],idx=[],nx=78,nz=118;
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
   const x=-12+24*i/nx,z=-21+42*j/nz,ice=.009*Math.sin(x*.68+z*.39);
   pos.push(x,H(x,z),z);norm.push(...normal(x,z));colors.push(clamp(.893+ice),clamp(.932+ice),clamp(.974+ice));
  }for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+nx+1;idx.push(a,b,a+1,a+1,b,b+1);}
  return {positions:new Float32Array(pos),normals:new Float32Array(norm),colors:new Float32Array(colors),indices:new Uint32Array(idx)};
 }
 function ribbon(points,width,offset=.08){const pos=[],norm=[],idx=[],stepCount=Math.max(2,Math.ceil(width/.40)),stride=stepCount+1;let rows=0;
  for(let seg=0;seg<points.length-1;seg++){
   const a=points[seg],b=points[seg+1],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz)||1,nx=-dz/len,nz=dx/len;
   const sections=Math.max(1,Math.ceil(len/.27));for(let j=seg===0?0:1;j<=sections;j++){
    const t=j/sections,x=a[0]+dx*t,z=a[1]+dz*t;
    for(let k=0;k<=stepCount;k++){const u=(k/stepCount-.5)*width,px=x+nx*u,pz=z+nz*u;pos.push(px,H(px,pz)+offset,pz);norm.push(...normal(px,pz));}
    if(rows){const prev=(rows-1)*stride,cur=rows*stride;for(let k=0;k<stepCount;k++){const a=prev+k,b=a+1,c=cur+k,d=c+1;idx.push(a,b,c,b,d,c);}}rows++;
   }
  }return {positions:new Float32Array(pos),normals:new Float32Array(norm),indices:new Uint32Array(idx)};
 }
 function worldParts(){const parts=[],add=(name,geo,mat,m=matrix(0,0,0))=>parts.push(makePart(name,geo,mat,m));
  add('snow-terrain',terrain(),snow([.97,.99,1]));
  // Source lanes 0+ are individually rendered. In particular, Lesson 07's 2.1-wide
  // segment is physically narrower than the 7/7.3-wide parts; Lesson 08 forks.
  for(let i=0;i<SCENARIO.lanes.length;i++){const lane=SCENARIO.lanes[i];const isGuide=lane.width<.3;
   add('authored-piste-'+i,ribbon(lane.points,lane.width,isGuide?.098:.068),snow(isGuide?[.48,.70,.80]:i===0?[.78,.88,.94]:[.75,.865,.935]));
  }
  const prop=SCENARIO.props?.[0]||null;
  const anchor=(x,z)=>H(x,z),post=(name,x,z,{height=1.25,shade=[.38,.48,.54]}={})=>add(name,primitive.cylinder,material(...shade),matrix(x,anchor(x,z)+height/2,z,.11,height,.11));
  if(theme==='object-ahead'){
   const x=prop.x,z=prop.z,y=anchor(x,z);
   add('hazard-obstacle-base',primitive.box,material(.92,.45,.20),matrix(x,y+.13,z,1.2,.22,1.2));
   add('hazard-obstacle-cone',cone,material(.99,.42,.13),matrix(x,y+.31,z,.58,1.38,.58));
   add('hazard-obstacle-stripe',primitive.box,material(.99,.94,.78),matrix(x,y+.93,z,.7,.12,.7));
  }
  if(theme==='restart-uphill'){
   const x=prop.x,z=prop.z,y=anchor(x,z);
   post('restart-side-safety-post',x,z,{height:1.5});
   add('restart-side-guidance-marker',primitive.box,material(.28,.62,.73),matrix(x,y+1.7,z,.80,.46,.16));
   add('restart-side-outer-snowline',ribbon([[-7,-8],[-7,1],[-5,5]],.10,.115),snow([.52,.72,.80]));
  }
  if(theme==='narrow-stopping'){
   // Actual authored lane narrows from width 7 to 2.1 then opens to 7.3.
   const narrow=SCENARIO.lanes[1];if(narrow){for(const side of [-1,1]){
    const x=side*(narrow.width/2+.12);
    add('narrow-pass-edge-'+side,ribbon(narrow.points.map(p=>[p[0]+x,p[1]]),.12,.125),snow([.38,.66,.76]));
    const z=1.8,y=anchor(x,z);post('narrow-pass-snowpost-'+side,x,z,{height:1.12,shade:[.27,.56,.68]});
   }}
  }
  if(theme==='closed-trail'){
   // Stopper physically crosses LEFT branch only. The right remains visibly open.
   const x=prop.x,z=prop.z,y=anchor(x,z);post('closure-barrier-post-left',x-2,z,{height:2,shade:[.71,.22,.18]});post('closure-barrier-post-right',x+2,z,{height:2,shade:[.71,.22,.18]});
   add('closure-barrier-horizontal',primitive.box,material(.80,.13,.13),matrix(x,y+1.15,z,4.15,.28,.20));
   add('closure-barrier-red-sign',primitive.box,material(.91,.19,.15),matrix(x,y+2.4,z,1.7,.98,.16));
   add('closure-barrier-sign-stripe',primitive.box,material(.97,.98,.98),matrix(x,y+2.40,z+.11,1.25,.11,.05));
   // Right route has no obstruction or false STOP indication.
  }
  if(theme==='help-another-rider'){
   const person=SCENARIO.tracks.intro.other[0],x=person[1],z=person[2],y=anchor(x,z),yaw=person[3];
   // Explicitly seated 3D snowboarder, not a hidden standing collider or a flat icon.
   add('seated-person-board',primitive.box,material(.93,.48,.30),matrix(x,y+.12,z,.46,.11,2.3,yaw));
   add('seated-person-hips',primitive.sphere,material(.31,.34,.41),matrix(x,y+.45,z,.44,.32,.48,yaw));
   add('seated-person-bent-knees',primitive.sphere,material(.28,.36,.44),matrix(x+.12,y+.32,z+.52,.30,.22,.28,yaw));
   add('seated-person-extended-legs',primitive.box,material(.24,.36,.45),matrix(x+.13,y+.26,z+.83,.28,.19,1.20,yaw));
   add('seated-person-torso',primitive.sphere,material(.91,.46,.22),matrix(x,y+1.04,z-.29,.41,.57,.37,yaw));
   add('seated-person-helmet',primitive.sphere,material(.18,.28,.37),matrix(x,y+1.72,z-.42,.33,.32,.35,yaw));
   add('seated-person-gloves',primitive.sphere,material(.18,.28,.37),matrix(x-.42,y+.68,z+.10,.19,.15,.19));
  }
  // Keep natural snow rather than an unnatural opaque road. Trees are well outside
  // the authored routes and not simulated obstacles.
  if(theme!=='closed-trail')for(const [i,[x,z]] of [[-10,-16],[10,-13],[-10,9],[10,11]].entries()){
   const y=anchor(x,z);add('side-tree-'+i,primitive.cylinder,material(.47,.37,.28),matrix(x,y+.43,z,.14,.86,.14));add('side-tree-top-'+i,cone,material(.23,.49,.49),matrix(x,y+1.3,z,.65,1.6,.65));
  }
  return parts;
 }
 return worldParts;
}
