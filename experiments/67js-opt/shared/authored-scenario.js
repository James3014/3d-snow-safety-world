/** Reuses the exact ten-lesson source track interpolation, not authored replacements.
 * Source coordinates are illustrative; they do not represent metres or actual speeds.
 */
export function createAuthoredScenario(source,{ambient=false}={}){
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const smooth=t=>t*t*(3-2*t);
 const t=source.terrain;
 const H=(x,z)=>t.base-t.slope*z-t.camber*x*x+t.ridge*Math.exp(-Math.pow((x-t.ridgeX)/3.4,2))*Math.exp(-Math.pow((z-t.ridgeZ)/9,2))+t.wave*Math.sin(.19*z);
 function sampleTrack(keys,q){
  q=clamp(q);if(q<=keys[0][0])return {x:keys[0][1],z:keys[0][2],yaw:keys[0][3],lean:keys[0][4]};
  for(let i=1;i<keys.length;i++)if(q<=keys[i][0]){
   const a=keys[i-1],b=keys[i],u=clamp((q-a[0])/(b[0]-a[0]||1)),s=smooth(u);
   return {x:a[1]+(b[1]-a[1])*s,z:a[2]+(b[2]-a[2])*u,yaw:a[3]+(b[3]-a[3])*s,lean:a[4]+(b[4]-a[4])*s};
  }
  const a=keys[keys.length-1];return {x:a[1],z:a[2],yaw:a[3],lean:a[4]};
 }
 function ambientPoses(phase,q){
  if(!ambient)return {};
  // Two extra independent riders test multi-character runtime. They do not alter
  // the source blue/orange choreography, trigger contacts, or determine outcomes.
  const intro=['INTRO_PAGE','INTRO_PLAY','INTRO_PAUSED','DECISION'].includes(phase);
  const zWest=intro?-14+8*q:-6+12*q,zEast=intro?-16+7*q:-9+13*q;
  const result={trafficWest:{x:-6.5+.35*Math.sin(q*Math.PI),z:zWest,yaw:.04+.12*q,lean:.03},trafficEast:{x:5.7-.26*Math.sin(q*Math.PI),z:zEast,yaw:-.08,lean:.04}};
  for(const rider of Object.values(result)){rider.y=H(rider.x,rider.z);rider.phaseProgress=q;}
  return result;
 }
 function frameFor(phase,branch,q){
  const intro=['INTRO_PAGE','INTRO_PLAY','INTRO_PAUSED','DECISION'].includes(phase);
  const tracks=intro?source.tracks.intro:(source.tracks.outcomes[branch]||source.tracks.outcomes.A);
  const t=phase==='INTRO_PAGE'?0:phase==='DECISION'?1:clamp(q);
  const blue=sampleTrack(tracks.you,t),orange=sampleTrack(tracks.other,t);
  for(const rider of [blue,orange]){rider.y=H(rider.x,rider.z);rider.phaseProgress=t;}
  return {blue,orange,extras:ambientPoses(phase,t)};
 }
 function causalChecks(){
  const starts='ABC'.split('').map(b=>frameFor('OUTCOME_PLAY',b,0));
  const sameStart=starts.every(f=>['blue','orange'].every(who=>['x','y','z','yaw','lean'].every(k=>Math.abs(f[who][k]-starts[0][who][k])<1e-10)));
  return {shared:sameStart,unitsAreIllustrative:true,ambientRidersAreNonCausal:ambient,fromSource:source.id};
 }
 return {H,frameFor,sampleTrack,causalChecks};
}
