import {H,clamp,smooth} from './geometry.js';

// Original crest narrative A/B/C keyframes; physically uncalibrated storyboard.
export function frameFor(ph,b,q){
 q=clamp(q);
 const n1={x:-.35,z:-7.15,yaw:0,lean:0},n2={x:.35,z:6.38,yaw:0,lean:0},n3={x:1.15,z:-15.4,yaw:0,lean:0};
 if(ph==='INTRO_PAGE'){n1.z=-15.6;n2.z=6;n3.z=-16.5;}
 if(ph==='INTRO_PLAY'||ph==='INTRO_PAUSED'){n1.z=-15.6+8.45*q;n2.z=6+.38*q;n3.z=-16.5+1.1*q;n1.yaw=.04*Math.sin(q*2);}
 if(ph==='OUTCOME_PLAY'||ph==='OUTCOME_PAUSED'||ph==='RESULT'){
  n2.z=6.38+.62*q;
  n3.z=-15.4+16.9*q;n3.x=1.15+1.15*smooth(clamp((q-.73)/.27));n3.yaw=.56*smooth(clamp((q-.76)/.24));n3.lean=-.20*Math.sin(Math.PI*clamp((q-.72)/.28));
  if(b==='A'){n1.z=-7.15+15.6*q;n1.x=-.35-.95*smooth(q);n1.yaw=-.58*smooth(q);n1.lean=-.18*Math.sin(Math.PI*q);}
  if(b==='B'){n1.z=-7.15+13.2*(q-.08*q*q);n1.x=-.35-2.3*smooth(q);n1.yaw=-.46*smooth(q);n1.lean=.12*Math.sin(Math.PI*q)*Math.cos(2*Math.PI*q);}
  if(b==='C'){const settled=smooth(clamp(q/.62));n1.z=-7.15+10.45*settled;n1.x=-.35+.3*settled;n1.yaw=Math.PI*.5*settled;n1.lean=.08*Math.sin(Math.PI*settled);}
 }
 for(const n of [n1,n2,n3]){n.y=H(n.x,n.z);n.phaseProgress=q;}
 return {blue:n1,orange:n2,purple:n3};
}
