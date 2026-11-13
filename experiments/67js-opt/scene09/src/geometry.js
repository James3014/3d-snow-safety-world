import {box, sphere, cylinder} from '67js';

// Units are deliberately illustrative and preserve scene-01 original authored coordinates.
export const H=(x,z)=>9.8-0.43*z+2.10*Math.exp(-((z/2.95)**2))-.016*x*x+.17*Math.sin(x*.33)*Math.exp(-((z/14)**2));
export const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
export const smooth=q=>q*q*(3-2*q);
export const primitive={box:box(),sphere:sphere(12,8),cylinder:cylinder(12,0,1)};
export const material=(r,g,b,roughness=.82)=>({color:[r,g,b],metallic:0,roughness,emission:0});
export function matrix(x,y,z,sx=1,sy=1,sz=1,yaw=0,roll=0){const c=Math.cos(yaw),s=Math.sin(yaw),r=Math.cos(roll),q=Math.sin(roll);return new Float32Array([c*r*sx,q*sx,-s*r*sx,0,-c*q*sy,r*sy,s*q*sy,0,s*sz,0,c*sz,0,x,y,z,1]);}
export function makePart(name,geometry,mat,matrixValue=matrix(0,-90,0)){return {name,geometry,material:mat,matrix:matrixValue};}
export function slopeGeometry(){
 const nx=76,nz=110,positions=[],normals=[],colors=[],indices=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
  const x=-12+i*24/nx,z=-22+j*44/nz,y=H(x,z);
  const dx=(H(x+.05,z)-H(x-.05,z))/.1,dz=(H(x,z+.05)-H(x,z-.05))/.1;
  const norm=1/Math.hypot(-dx,1,-dz);
  positions.push(x,y,z);normals.push(-dx*norm,norm,-dz*norm);
  const isCrest=Math.exp(-((z/4.0)**2)),ice=0.02*Math.sin(x*.6+z*.32);
  const pale=.895+ice+.04*isCrest;
  colors.push(clamp(pale),clamp(pale+.027),clamp(pale+.065));
 }
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){
  const a=j*(nx+1)+i,b=a+nx+1;indices.push(a,b,a+1,a+1,b,b+1);
 }
 return {positions:new Float32Array(positions),normals:new Float32Array(normals),colors:new Float32Array(colors),indices:new Uint32Array(indices)};
}
// Marching squares contour lines are genuine constant-elevation guides on this surface.
// They are not hiding the rider or replacing the triangle depth-test.
export function contourGeometry(){
 const positions=[],normals=[],indices=[];let v=0;
 const nx=92,nz=116,X0=-11,X1=11,Z0=-19,Z1=19;
 function strip(a,b,width=.012){const dx=b[0]-a[0],dz=b[2]-a[2],len=Math.hypot(dx,dz)||1,px=dz/len*width,pz=-dx/len*width;
  const yoff=.042;
  positions.push(a[0]+px,a[1]+yoff,a[2]+pz,a[0]-px,a[1]+yoff,a[2]-pz,b[0]+px,b[1]+yoff,b[2]+pz,b[0]-px,b[1]+yoff,b[2]-pz);
  for(let i=0;i<4;i++)normals.push(0,1,0);
  indices.push(v,v+1,v+2,v+2,v+1,v+3);v+=4;
 }
 for(let level=4.8;level<=16;level+=.9){
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){
   const x=X0+i*(X1-X0)/nx,z=Z0+j*(Z1-Z0)/nz,dx=(X1-X0)/nx,dz=(Z1-Z0)/nz;
   const c=[[x,z,H(x,z)],[x+dx,z,H(x+dx,z)],[x+dx,z+dz,H(x+dx,z+dz)],[x,z+dz,H(x,z+dz)]];
   const hits=[];for(const [a,b] of [[0,1],[1,2],[2,3],[3,0]]){
    if((c[a][2]<level)===(c[b][2]<level))continue;
    const t=(level-c[a][2])/(c[b][2]-c[a][2]);hits.push([c[a][0]+t*(c[b][0]-c[a][0]),level,c[a][1]+t*(c[b][1]-c[a][1])]);
   }
   if(hits.length>=2)strip(hits[0],hits[1]);if(hits.length===4)strip(hits[2],hits[3]);
  }
 }
 return {positions:new Float32Array(positions),normals:new Float32Array(normals),indices:new Uint32Array(indices)};
}
// Compact custom cone mesh: two tapered pine layers have far fewer triangles than 67.js sphere primitives.
function coneGeometry(){const positions=[],normals=[],indices=[];const n=12;
 for(let j=0;j<=1;j++)for(let i=0;i<=n;i++){
  const phi=i/n*2*Math.PI,r=j===0?1:.08,xx=Math.cos(phi)*r,zz=Math.sin(phi)*r;
  positions.push(xx,j===0?0:1,zz);
  let norm=1/Math.hypot(xx,.6,zz);normals.push(xx*norm,.6*norm,zz*norm);
 }
 for(let i=0;i<n;i++){const a=i,b=i+n+1;indices.push(a,b,a+1,b,b+1,a+1)}
 return {positions:new Float32Array(positions),normals:new Float32Array(normals),indices:new Uint16Array(indices)};
}
export const cone=coneGeometry();
export function worldParts(){
 const parts=[];let add=(name,geo,color,m)=>parts.push(makePart(name,geo,color,m));
 add('snow-slope',slopeGeometry(),{...material(.97,.98,1),doubleSided:true},matrix(0,0,0));
 add('contours',contourGeometry(),{...material(.53,.72,.81),doubleSided:true,castShadow:false,receiveShadow:false},matrix(0,0,0));
 for(let k=0;k<11;k++)for(const side of [-1,1]){
  const z=-19+k*3.75,x=side*(9.4+1.15*Math.sin(k*.67)),ground=H(x,z),id=`pine-${side}-${k}`;
  add(id+'-trunk',primitive.cylinder,material(.41,.38,.32),matrix(x,ground+.40,z,.14,.8,.14));
  add(id+'-lower',cone,material(.14,.40,.43),matrix(x,ground+.85,z,.9,1.8,.9));
  add(id+'-upper',cone,material(.20,.49,.50),matrix(x,ground+1.7,z,.68,1.45,.68));
  add(id+'-snow',cone,material(.75,.90,.92),matrix(x,ground+2.44,z,.25,.33,.25));
 }
 for(let j=0;j<14;j++){const z=-19+j*2.9,x=-5.6;
  add(`track-mark-${j}`,primitive.box,material(.30,.65,.77),matrix(x,H(x,z)+.035,z,.105,.05,.74));
 }
 return parts;
}
export function occludedByHill(a,b){let max=-Infinity,blocked=false;for(let i=1;i<320;i++){
 const q=i/320,x=a[0]*(1-q)+b[0]*q,y=a[1]*(1-q)+b[1]*q,z=a[2]*(1-q)+b[2]*q,d=H(x,z)-y;
 if(d>max)max=d;if(d>.01)blocked=true;
 }return {blocked,maxIntrusion:max};}
