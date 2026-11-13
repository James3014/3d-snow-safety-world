import {Renderer67,VERSION} from '67js';
import {startLessonRuntime} from '../../shared/runtime.js';
import {createRider as legacyCreateRider,setRiderPose as legacySetRiderPose} from './rider.js';
import * as geometry from './geometry.js';
import {createSmoothMotionRigChoice} from '../../shared/smooth-motion-rig.js';
import {translations} from './translations.js';
import {worldParts} from './terrain-parts.js';
import {SCENARIO,H,frameFor,causalChecks} from './scenario.js';
import {clamp} from './geometry.js';
const rigChoice=createSmoothMotionRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
startLessonRuntime({
 Renderer67,VERSION,worldParts,H,clamp,frameFor,causalChecks,createRider:rigChoice.createRider,setRiderPose:rigChoice.setRiderPose,rigChoice,rigDiscipline:'snowboard',translations,
 scenarioId:SCENARIO.id,edition:'Scene04-shared-gate',titleSuffix:' | 67.js Scene 04',
 introDuration:3.4,outcomeDuration:4.8,
 defaultOrbit:{az:-.67,el:.85,dist:35},topAnchor:[-1,-1],sideAnchor:[0,-1],
 topHeightRef:[0,0],sideHeightRef:[0,0],maxEyeYaw:Math.PI,rememberLookDown:true,demoAim:false,dynamicResetLabel:true,
 ambientRiders:[{id:'trafficWest',palette:'purple'},{id:'trafficEast',palette:'orange'}],
trafficCheck:'crowd-adjust-speed',fallbackUrl:'https://james3014.github.io/3d-snow-safety-world/lesson-play-speed.html?lesson=crowd-control'
});
