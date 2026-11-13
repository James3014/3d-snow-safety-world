import source from './source-lesson.json' with {type:'json'};
import {createAuthoredScenario} from '../../shared/authored-scenario.js';
export const SCENARIO=source;
export const {H,frameFor,sampleTrack,causalChecks}=createAuthoredScenario(SCENARIO,{ambient:true});
