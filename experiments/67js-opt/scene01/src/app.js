import {Renderer67,VERSION} from '67js';
import {startLessonRuntime} from '../../shared/runtime.js';
import {createRider as legacyCreateRider,setRiderPose as legacySetRiderPose} from './rider.js';
import * as geometry from './geometry.js';
import {createRigChoice} from '../../shared/geometric-rig.js';
import {translations} from './translations.js';
import {worldParts,H,clamp,occludedByHill} from './geometry.js';
import {frameFor} from './scenario-crest.js';
const rigChoice=createRigChoice({geometry,legacyCreateRider,legacySetRiderPose,discipline:'snowboard'});
startLessonRuntime({
 Renderer67,VERSION,worldParts,H,clamp,frameFor,createRider:rigChoice.createRider,setRiderPose:rigChoice.setRiderPose,rigChoice,rigDiscipline:'snowboard',translations,occludedByHill,
 hasPurple:true,scenarioId:'crest-speed',edition:'Scene01-optimized',titleSuffix:'｜67.js V2',
 introDuration:3.4,outcomeDuration:4.8,
 defaultOrbit:{az:-.70,el:.88,dist:28},topAnchor:[0,-.6],topHeightRef:[0,0],sideAnchor:[0,0],
 maxEyeYaw:1.2,rememberLookDown:false,demoAim:false,dynamicResetLabel:false,
 fallbackUrl:'https://james3014.github.io/3d-snow-safety-world/scene-01-speed.html'
});
