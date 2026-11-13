/** Issue #7: a standalone, authored-pose-compatible appearance exploration.
 * A single implicit surface, not disconnected sphere joints or tube sticks.
 * This is a static geometry lab, NOT a replacement for the ten-lesson runtime.
 */
const clone=p=>p.map(Number);
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export function poseDefinitions(mode='stand'){
 if(!['stand','snowboard','carve'].includes(mode))throw new RangeError('Unknown silhouette study: '+mode);
 if(mode==='stand')return {
  name:mode,head:[0,2.76,.02],headRadius:.335,neckA:[0,2.34,0],neckB:[0,2.49,0],
  torso:[0,1.95,0],pelvis:[0,1.43,0],
  shoulders:[[-.34,2.25,0],[.34,2.25,0]],
  elbows:[[-.48,1.78,.03],[.48,1.78,.03]],hands:[[-.52,1.27,.08],[.52,1.27,.08]],
  hips:[[-.145,1.43,0],[.145,1.43,0]],
  knees:[[-.20,.91,.13],[.20,.91,.13]],feet:[[-.20,.22,.17],[.20,.22,.17]],
  toes:[[-.20,.16,.41],[.20,.16,.41]],board:false,
 };
 const lean=mode==='carve'?.27:0;
 const hip=[.07+lean*.3,1.22-(mode==='carve'?.05:0),0];
 const shoulder=[.08+lean,1.90-(mode==='carve'?.10:0),.04];
 return {
  name:mode,head:[shoulder[0]+lean*.40,shoulder[1]+.69,.06],headRadius:.335,
  neckA:[shoulder[0],shoulder[1]+.20,.03],neckB:[shoulder[0]+lean*.15,shoulder[1]+.46,.04],
  torso:[(shoulder[0]+hip[0])*.5,(shoulder[1]+hip[1])*.5+.07,.03],pelvis:clone(hip),
  shoulders:[[-.23+shoulder[0],shoulder[1],-.13],[.23+shoulder[0],shoulder[1],.13]],
  elbows:[[-.40+shoulder[0],shoulder[1]-.37,-.37],[.46+shoulder[0],shoulder[1]-.37,.38]],
  hands:[[-.48+shoulder[0],shoulder[1]-.78,-.45],[.54+shoulder[0],shoulder[1]-.80,.43]],
  hips:[[hip[0]-.14,hip[1],-.12],[hip[0]+.14,hip[1],.12]],
  knees:[[.12+lean*.45,.76,-.43],[.13+lean*.45,.76,.43]],
  feet:[[.08,.21,-.48],[.08,.21,.48]],
  toes:[[.30,.17,-.48],[.30,.17,.48]],board:true,
 };
}
const d3=(x,y,z)=>Math.hypot(x,y,z);
const tube=(p,a,b,r0,r1)=>{
 const vx=b[0]-a[0],vy=b[1]-a[1],vz=b[2]-a[2];
 const t=Math.min(1,Math.max(0,((p[0]-a[0])*vx+(p[1]-a[1])*vy+(p[2]-a[2])*vz)/(vx*vx+vy*vy+vz*vz)));
 return d3(p[0]-a[0]-t*vx,p[1]-a[1]-t*vy,p[2]-a[2]-t*vz)-(r0+(r1-r0)*t);
};
const ellipsoid=(p,c,r)=>{
 const x=p[0]-c[0],y=p[1]-c[1],z=p[2]-c[2];
 const k0=d3(x/r[0],y/r[1],z/r[2]),k1=d3(x/(r[0]*r[0]),y/(r[1]*r[1]),z/(r[2]*r[2]));
 return k1<1e-6?-Math.min(...r):k0*(k0-1)/k1;
};
const blend=(a,b,k)=>{if(k<=0)return Math.min(a,b);const h=Math.max(k-Math.abs(a-b),0)/k;return Math.min(a,b)-h*h*k*.25;};

export function skinField(skeleton){
 const s=skeleton;
 return p=>{
  let d=ellipsoid(p,s.torso,[.268,.51,.205]);
  d=blend(d,ellipsoid(p,s.pelvis,[.235,.195,.195]),.14);
  // Neck is anatomically narrow, and joins the round head without a helmet lip.
  d=blend(d,tube(p,s.neckA,s.neckB,.109,.115),.085);
  d=blend(d,d3(p[0]-s.head[0],p[1]-s.head[1],p[2]-s.head[2])-s.headRadius,.045);
  for(let i=0;i<2;i++){
   // Each arm/leg is one swept, tapered volume. No elbow or knee sphere.
   const upperArm=tube(p,s.shoulders[i],s.elbows[i],.112,.09);
   const lowerArm=tube(p,s.elbows[i],s.hands[i],.09,.076);
   d=blend(d,blend(upperArm,lowerArm,.07),.105);
   const thigh=tube(p,s.hips[i],s.knees[i],.158,.13);
   const calf=tube(p,s.knees[i],s.feet[i],.13,.100);
   const foot=tube(p,s.feet[i],s.toes[i],.100,.097);
   d=blend(d,blend(blend(thigh,calf,.075),foot,.065),.105);
  }
  return d;
 };
}
/** Marching tetrahedra; vertex normals are interpolated from a shared scalar
 * gradient lattice for continuously shaded skin across cell boundaries. */
export function triangulateField(field,{resolution=.06}={}){
 if(!(resolution>=.036 && resolution<=.13))throw new RangeError('Resolution outside bounded preview range');
 const min=[-1.1,-.075,-1.12],max=[1.1,3.42,1.12];
 const nc=min.map((v,j)=>Math.ceil((max[j]-v)/resolution));
 const step=nc.map((v,j)=>(max[j]-min[j])/v);
 const nx=nc[0],ny=nc[1],nz=nc[2],sx=nx+1,sy=ny+1,sz=nz+1;
 const scalar=new Float32Array(sx*sy*sz);
 const idx=(i,j,k)=>i+sx*(j+sy*k);
 for(let k=0;k<sz;k++)for(let j=0;j<sy;j++)for(let i=0;i<sx;i++)scalar[idx(i,j,k)]=field([min[0]+i*step[0],min[1]+j*step[1],min[2]+k*step[2]]);
 const gradCache=new Map();
 const grad=(i,j,k)=>{
  const index=idx(i,j,k);let g=gradCache.get(index);if(g)return g;
  const sample=(a,b,c)=>scalar[idx(Math.max(0,Math.min(nx,a)),Math.max(0,Math.min(ny,b)),Math.max(0,Math.min(nz,c)))];
  const dx=(sample(i+1,j,k)-sample(i-1,j,k))/((i===0||i===nx)?step[0]:2*step[0]);
  const dy=(sample(i,j+1,k)-sample(i,j-1,k))/((j===0||j===ny)?step[1]:2*step[1]);
  const dz=(sample(i,j,k+1)-sample(i,j,k-1))/((k===0||k===nz)?step[2]:2*step[2]);
  const m=Math.hypot(dx,dy,dz)||1;g=[dx/m,dy/m,dz/m];gradCache.set(index,g);return g;
 };
 const positions=[],normals=[],indices=[];
 const tet=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
 for(let k=0;k<nz;k++)for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
  const ijk=[[i,j,k],[i+1,j,k],[i+1,j+1,k],[i,j+1,k],[i,j,k+1],[i+1,j,k+1],[i+1,j+1,k+1],[i,j+1,k+1]];
  const vs=ijk.map(v=>scalar[idx(...v)]);
  if(!vs.some(v=>v<0)||!vs.some(v=>v>=0))continue;
  const vert=(a,b)=>{
   const aa=ijk[a],bb=ijk[b],fa=vs[a],fb=vs[b],t=fa/(fa-fb);
   const p=aa.map((v,d)=>min[d]+(v+(bb[d]-v)*t)*step[d]);
   const ga=grad(...aa),gb=grad(...bb);
   let g=ga.map((v,d)=>v*(1-t)+gb[d]*t);
   const m=Math.hypot(...g)||1;g=g.map(v=>v/m);
   return {p,g};
  };
  const triangle=(a,b,c)=>{
   const u=b.p.map((v,d)=>v-a.p[d]),v=c.p.map((x,d)=>x-a.p[d]);
   const f=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
   const outward=f.reduce((x,d,m)=>x+d*(a.g[m]+b.g[m]+c.g[m]),0)>=0;
   const tri=outward?[a,b,c]:[a,c,b];
   for(const q of tri){positions.push(...q.p);normals.push(...q.g);indices.push(indices.length);}
  };
  for(const t of tet){const inside=t.filter(a=>vs[a]<0),outside=t.filter(a=>vs[a]>=0);
   if(inside.length===0||outside.length===0)continue;
   if(inside.length===1){const x=inside[0];triangle(...outside.map(o=>vert(x,o)));}
   else if(outside.length===1){const x=outside[0];triangle(...inside.map(o=>vert(x,o)));}
   else {
    const a=vert(inside[0],outside[0]),b=vert(inside[0],outside[1]),c=vert(inside[1],outside[0]),d=vert(inside[1],outside[1]);
    triangle(a,b,c);triangle(b,d,c);
   }
  }
 }
 return {positions:new Float32Array(positions),normals:new Float32Array(normals),indices:new Uint32Array(indices)};
}

// Manifold-connectivity check from exact-ish shared edges, despite rendering
// triangles owning independent vertices. This is a geometry test, not approval.
export function assertSingleSurface(geom){
 const pts=geom.positions,ind=geom.indices,parents=new Int32Array(ind.length/3);
 for(let i=0;i<parents.length;i++)parents[i]=i;
 const find=i=>{while(parents[i]!==i){parents[i]=parents[parents[i]];i=parents[i];}return i;};
 const union=(a,b)=>{a=find(a);b=find(b);if(a!==b)parents[b]=a;};
 const owner=new Map();
 for(let t=0;t<ind.length;t+=3)for(let k=0;k<3;k++){
  const at=ind[t+k]*3,key=`${Math.round(pts[at]*10000)},${Math.round(pts[at+1]*10000)},${Math.round(pts[at+2]*10000)}`;
  const existing=owner.get(key);if(existing!==undefined)union(t/3,existing);else owner.set(key,t/3);
 }
 const roots=new Set();for(let i=0;i<parents.length;i++)roots.add(find(i));return roots.size;
}

export function buildSmoothHuman(mode='stand',opts={}){
 const skeleton=poseDefinitions(mode),skin=triangulateField(skinField(skeleton),opts);
 const parts=[{name:'skin',geometry:skin}];
 if(skeleton.board){
  parts.push({name:'board',role:'equipment',center:[.08,.055,0],scale:[.55,.075,2.4]});
  for(const [i,name] of ['front','rear'].entries()){
   parts.push({name:'binding-'+name,role:'equipment',center:[.08,.139,i?-.48:.48],scale:[.47,.075,.29]});
  }
 }
 return {skin,skeleton,parts};
}
