import {baseTranslations} from './base-translations.js';
export function sourceLanguage(source,{lessonNumber,ambient=false}={}){
 const out={};
 for(const lng of ['zh','en']){
  const zh=lng==='zh',base=baseTranslations[lng],copy=source.copy[lng],trans=source.translations[lng];
  const demoPrefix=zh?'\u793a\u7bc4\uff1a':'Demonstration: ';
  out[lng]={...base,
   versionTag:zh?`67.js 0.19.0 \u00b7 \u7b2c ${lessonNumber} \u984c\u6bd4\u8f03\u8a66\u4f5c`:`67.js 0.19.0 \u00b7 Lesson ${lessonNumber} Pilot`,
   eyebrow:trans.eyebrow,headline:trans.headline,subtitle:trans.subtitle,
   optionA:copy.choice[0],optionB:copy.choice[1],optionC:copy.choice[2],
   readyTitle:copy.introTitle,readyDetail:copy.introCopy,
   playTitle:copy.intro,playDetail:copy.introCopy,pauseTitle:copy.paused,
   pauseDetail:zh?'\u89d2\u8272\u5df2\u66ab\u505c\uff0c\u8acb\u63db\u8996\u89d2\u89c0\u5bdf\u5b8c\u6574\u8def\u7dda\u3002':'Paused: inspect every actual rider and route.',
   choiceTitle:copy.decision,choiceDetail:zh?'\u5728\u540c\u4e00\u500b\u8d77\u9ede\u9078\u64c7 A\uff0fB\uff0fC\uff0c\u89c0\u5bdf\u4e0d\u540c\u52d5\u4f5c\u5f8c\u679c\u3002':'Choose A, B or C at the same decision checkpoint.',
   outcomeTitle:copy.outcome,outcomeDetail:copy.hint,resultTitle:zh?'\u9078\u64c7 {branch}\uff1a\u767c\u751f\u4e86\u4ec0\u9ebc\uff1f':'Choice {branch}: What happened?',resultDetail:copy.result,
   resultA:copy.lesson.A,resultB:copy.lesson.B,resultC:copy.lesson.C,
   blue:trans.one,orange:trans.two,purple:'',
   selfTitle:zh?'\u4f60\u7684\u55ae\u677f\u7ad9\u59ff':'Your snowboard stance',
   trafficNote:trans.trafficDetail,sceneLabel:zh?`${trans.headline}\uff1b\u7acb\u9ad4\u96ea\u9053\u8207${ambient?'\u56db':'\u5169'}\u4f4d\u55ae\u677f\u6ed1\u624b`:`${trans.headline}; illustrated 3D snowboard riders`,
   footer:copy.hint,openOriginal:zh?'\u958b\u555f\u539f\u7248':'Open original',compare:zh?'\u6bd4\u8f03\u539f\u7248\u8207 67.js':'Original vs 67.js',
   lookUphill:zh?'\u89c0\u5bdf\u5468\u570d':'Look around',
   practiceLabel:zh?'\u7df4\u7fd2\u6a21\u5f0f\uff1a\u81ea\u5df1\u89c0\u5bdf':'Practice: observe for yourself',
   demoLabel:zh?'\u793a\u7bc4\u6a21\u5f0f\uff1a\u986f\u793a\u5b89\u5168\u7dda\u7d22':'Demonstration: show safety guidance',
   showDemo:zh?'\u958b\u555f\u793a\u7bc4':'Show demonstration',hideDemo:zh?'\u8fd4\u56de\u7df4\u7fd2':'Return to practice',
   tipIntro:demoPrefix+copy.introCopy,tipDecision:demoPrefix+(zh?copy.lesson.B:copy.lesson.B),
   tipA:demoPrefix+copy.lesson.A,tipB:demoPrefix+copy.lesson.B,tipC:demoPrefix+copy.lesson.C,
   engineUnavailable:base.engineUnavailable,
   frameUpdate:base.frameUpdate,
  };
 }
 return out;
}
