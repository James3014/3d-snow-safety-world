(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new Map,t={},n={},r={},i={},a={},o={},s=Object.freeze({splatColor:11,splatNormal:12,splatPacked:13,splatMask:14});function c(){if(!o.validate)throw Error(`Splat layers need their code: add import '@codepawlhq/67js/addons/splat-shader'.`);return o}function l(t,n){e.set(t,n)}var u={splat:`splat-shader`,liquid:`liquid-shader`,worldMaterials:`world-material-shader`,subsurface:`subsurface-shader`,volumeFog:`fog-shader`};function d(t){let n=e.get(t);if(!n){let e=u[t]??`material-layer-shaders`;throw Error(`The ${t} feature needs its shader code: add import '@codepawlhq/67js/addons/${e}' (a recipe: await loadAgentSceneModules(recipe)).`)}return n}var f={armor:1,floor:2,water:3,foliage:4,terrain:5,grass:7,fire:8,smoke:9,unlit:10,liquid:11,foam:12},p=[],m={};function h(e){Object.assign(m,e)}function g(e,t){if(!m[e])throw Error(`Skinned and morphed parts need their code: import ${t}, or a module that makes the pose (createSkinPose, createMorphPose, the glTF loader).`);return m}var _=typeof Float32Array<`u`?Float32Array:Array;function v(){var e=new _(16);return _!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function y(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function b(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(i*O-r*k-a*D)*A,e[2]=(h*C-g*S+_*x)*A,e[3]=(f*S-d*C-p*x)*A,e[4]=(c*E-o*k-l*T)*A,e[5]=(n*k-i*E+a*T)*A,e[6]=(g*b-m*C-_*y)*A,e[7]=(u*C-f*b+p*y)*A,e[8]=(o*O-s*E+l*w)*A,e[9]=(r*E-n*O-a*w)*A,e[10]=(m*S-h*b+_*v)*A,e[11]=(d*b-u*S-p*v)*A,e[12]=(s*T-o*D-c*w)*A,e[13]=(n*D-r*T+i*w)*A,e[14]=(h*y-m*x-g*v)*A,e[15]=(u*x-d*y+f*v)*A,e):null}function x(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=t[9],p=t[10],m=t[11],h=t[12],g=t[13],_=t[14],v=t[15],y=n[0],b=n[1],x=n[2],S=n[3];return e[0]=y*r+b*s+x*d+S*h,e[1]=y*i+b*c+x*f+S*g,e[2]=y*a+b*l+x*p+S*_,e[3]=y*o+b*u+x*m+S*v,y=n[4],b=n[5],x=n[6],S=n[7],e[4]=y*r+b*s+x*d+S*h,e[5]=y*i+b*c+x*f+S*g,e[6]=y*a+b*l+x*p+S*_,e[7]=y*o+b*u+x*m+S*v,y=n[8],b=n[9],x=n[10],S=n[11],e[8]=y*r+b*s+x*d+S*h,e[9]=y*i+b*c+x*f+S*g,e[10]=y*a+b*l+x*p+S*_,e[11]=y*o+b*u+x*m+S*v,y=n[12],b=n[13],x=n[14],S=n[15],e[12]=y*r+b*s+x*d+S*h,e[13]=y*i+b*c+x*f+S*g,e[14]=y*a+b*l+x*p+S*_,e[15]=y*o+b*u+x*m+S*v,e}function S(e,t,n,r,i){var a=1/Math.tan(t/2);if(e[0]=a/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){var o=1/(r-i);e[10]=(i+r)*o,e[14]=2*i*r*o}else e[10]=-1,e[14]=-2*r;return e}var C=S;function w(e,t,n,r,i,a,o){var s=1/(t-n),c=1/(r-i),l=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*c,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+n)*s,e[13]=(i+r)*c,e[14]=(o+a)*l,e[15]=1,e}var T=w;function E(e,t,n,r){var i,a,o,s,c,l,u,d,f,p,m=t[0],h=t[1],g=t[2],_=r[0],v=r[1],b=r[2],x=n[0],S=n[1],C=n[2];return Math.abs(m-x)<1e-6&&Math.abs(h-S)<1e-6&&Math.abs(g-C)<1e-6?y(e):(u=m-x,d=h-S,f=g-C,p=1/Math.sqrt(u*u+d*d+f*f),u*=p,d*=p,f*=p,i=v*f-b*d,a=b*u-_*f,o=_*d-v*u,p=Math.sqrt(i*i+a*a+o*o),p?(p=1/p,i*=p,a*=p,o*=p):(i=0,a=0,o=0),s=d*o-f*a,c=f*i-u*o,l=u*a-d*i,p=Math.sqrt(s*s+c*c+l*l),p?(p=1/p,s*=p,c*=p,l*=p):(s=0,c=0,l=0),e[0]=i,e[1]=s,e[2]=u,e[3]=0,e[4]=a,e[5]=c,e[6]=d,e[7]=0,e[8]=o,e[9]=l,e[10]=f,e[11]=0,e[12]=-(i*m+a*h+o*g),e[13]=-(s*m+c*h+l*g),e[14]=-(u*m+d*h+f*g),e[15]=1,e)}function D(){var e=new _(9);return _!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function O(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(c*E-o*k-l*T)*A,e[2]=(o*O-s*E+l*w)*A,e[3]=(i*O-r*k-a*D)*A,e[4]=(n*k-i*E+a*T)*A,e[5]=(r*E-n*O-a*w)*A,e[6]=(h*C-g*S+_*x)*A,e[7]=(g*b-m*C-_*y)*A,e[8]=(m*S-h*b+_*v)*A,e):null}var k=`uniform float crowdEnabled;
mat4 crowdTransform() { return mat4(1.0); }`,A=k,j=`mat4 skinTransform() { return mat4(1.0); }`,M=`vec3 morphedPosition(vec3 base) { return base; }
vec3 morphedNormal(vec3 base) { return base; }`;function ee(t,n){let r=e.get(t);if(!r)throw Error(`The ${t} feature needs its shader code: import ${n} (any module that makes a ${t} pose, such as the glTF loader, does).`);return r}function te(e){let t=new Set(e);if(!t.has(`skin`)&&!t.has(`crowd`))return`${k}
${j}`;let{vertexHead:n,vertexTail:r}=ee(`skin`,`skinning.js`);return`${n}${A}
${r}`}function ne(e){return new Set(e).has(`morph`)?ee(`morph`,`morph.js`).vertex:M}var re=`
vec3 windOffset(vec3 localPosition, vec3 worldPoint, vec2 leafUv, float surfaceTag, float seconds, float strength) { return vec3(0.0); }
`;function ie(e){let t=new Set(e);return t.has(`foliage`)||t.has(`grass`)?d(`worldMaterials`).worldVertexWind:re}function ae(e,t){return`#version 300 es
${e}
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
layout(location=2) in mat4 instanceMatrix;
layout(location=6) in mat3 instanceNormal;
layout(location=9) in vec3 instanceColor;
layout(location=10) in vec4 instanceSurface;
layout(location=11) in vec3 assemblyOffset;
layout(location=12) in vec3 assemblyDetailOffset;
layout(location=13) in vec4 uvSets;
layout(location=14) in vec4 vertexColor;
layout(location=15) in vec4 instanceEmissive;
uniform mat4 viewProjection;
uniform mat4 lightProjection;
uniform vec3 flushBias;
uniform vec4 clipPerMetre;
uniform float time;
uniform float wind;
uniform float explosionProgress;
uniform vec3 explosionCenter;
uniform float assemblyAmount;
out vec3 worldPosition, worldNormal;
#ifdef INSTANCED
flat out vec3 baseColor;
flat out vec4 surface;
flat out vec4 instanceEmission;
flat out float instanceOpacity;
flat out mat3 boxNormalMatrix;
#endif
#ifdef VERTEX_COLORS
out vec3 vertexTint;
out float vertexSkyVisibility;
#ifdef SURFACE_WEAR
out vec2 vertexWear;
#endif
#endif
out vec4 shadowPosition;
out vec2 textureUV, lightmapUV;
out vec3 boxPosition, boxNormal;
${te(t)}
${ne(t)}
${ie(t)}
void main() {
  vec2 uv = uvSets.xy;
  mat4 deformation = USES_CROWD ? crowdTransform() : (USES_SKIN ? skinTransform() : mat4(1.0));
  vec4 world = instanceMatrix * deformation * vec4(USES_MORPH ? morphedPosition(position) : position, 1.0);
  world.xyz += USES_CROWD ? vec3(0.0) : assemblyOffset * assemblyAmount + assemblyDetailOffset * smoothstep(0.3, 1.0, assemblyAmount);
  if (USES_WIND) world.xyz += windOffset(position, world.xyz, uv, instanceSurface.w, time, wind);
  if (USES_WAVES && instanceSurface.w == 3.0) {
    world.y += sin(world.x * 1.4 + time * 0.8) * 0.025 + sin(world.z * 1.8 - time) * 0.02;
  }
  if (USES_EXPLOSION && (instanceSurface.w == 8.0 || instanceSurface.w == 9.0)) {
    world.xyz = mix(explosionCenter, world.xyz, 0.03 + explosionProgress * 0.97);
  }
  worldPosition = world.xyz;
  vec3 localNormal = USES_MORPH ? morphedNormal(normal) : normal;
  vec3 deformedNormal = (USES_SKIN || USES_CROWD) ? transpose(inverse(mat3(deformation))) * localNormal : localNormal;
  worldNormal = normalize(instanceNormal * deformedNormal);
  if (${new Set(t).has(`boxMapScale`)}) {
  boxPosition = (USES_MORPH ? morphedPosition(position) : position) * vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  boxNormal = deformedNormal;
#ifdef INSTANCED
  boxNormalMatrix = instanceNormal;
#endif
  }
  textureUV = uv;
  lightmapUV = uvSets.zw;
#ifdef INSTANCED
  baseColor = instanceColor;
  instanceEmission = vec4(instanceEmissive.rgb, gl_InstanceID);
  instanceOpacity = instanceEmissive.w;
  surface = instanceSurface;
#endif
#ifdef VERTEX_COLORS
  vertexTint = USES_CROWD ? vec3(1.0) : vertexColor.rgb;
#ifdef SURFACE_WEAR
  bool carriesWear = !USES_CROWD && vertexColor.a >= 2.0;
  float maskBits = carriesWear ? vertexColor.a - 2.0 : 0.0;
  float wearLevel = floor(maskBits / 2048.0);
  vertexWear = vec2(wearLevel, maskBits - wearLevel * 2048.0) / 2047.0;
  vertexSkyVisibility = (USES_CROWD || carriesWear) ? 1.0 : vertexColor.a;
#else
  vertexSkyVisibility = USES_CROWD ? 1.0 : vertexColor.a;
#endif
#endif
  shadowPosition = lightProjection * world;
  gl_Position = viewProjection * world;
  if (flushBias != vec3(0.0)) {
    vec4 lifted = gl_Position - (flushBias.x + flushBias.y * gl_Position.w) * clipPerMetre;
    gl_Position.z = (lifted.z / lifted.w + flushBias.z) * gl_Position.w;
  }
}`}function oe(t,n){return[...n].reduce((t,n)=>e.get(n)?.depth?.(t)??t,t)}function se(e=[]){let t=new Set(e).has(`tintedShadows`);return oe(`#version 300 es
${je(new Set(e))}
precision highp float;
layout(location=0) in vec3 position;
layout(location=2) in mat4 instanceMatrix;
layout(location=10) in vec4 instanceSurface;
layout(location=11) in vec3 assemblyOffset;
layout(location=12) in vec3 assemblyDetailOffset;
layout(location=13) in vec4 uvSets;
layout(location=14) in vec4 vertexColor;
${t?ce:``}uniform mat4 lightProjection;
uniform float assemblyAmount;
uniform float time;
uniform float wind;
out vec2 textureUV;
${te(e)}
${ne(e)}
${ie(e)}
void main() {
  vec2 uv = uvSets.xy;
  vec4 world = instanceMatrix * (USES_CROWD ? crowdTransform() : skinTransform()) * vec4(morphedPosition(position), 1.0);
  world.xyz += USES_CROWD ? vec3(0.0) : assemblyOffset * assemblyAmount + assemblyDetailOffset * smoothstep(0.3, 1.0, assemblyAmount);
  world.xyz += windOffset(position, world.xyz, uv, instanceSurface.w, time, wind);
  textureUV = uv;
${t?le:``}  gl_Position = lightProjection * world;
}`,e)}se();var ce=`layout(location=9) in vec3 instanceColor;
layout(location=15) in vec4 instanceEmissive;
out vec3 tintColor;
out float tintOpacity;
`,le=`  tintColor = instanceColor;
  tintOpacity = instanceEmissive.w;
`,ue=`in vec3 tintColor;
in float tintOpacity;
uniform float tintPass;
uniform float tintTransmission;
uniform float tintMapSize;
uniform float tintBias;
uniform highp sampler2DShadow opaqueShadow;
out vec4 tintOutput;
`,de=`void main() {
  if (tintPass > 0.5) {
    vec4 baseSample = hasBaseMap > 0.5 ? texture(baseMap, textureUV) : vec4(1.0);
    float coverage = tintOpacity * baseSample.a;
    if (coverage < 0.02) discard;
    if (texture(opaqueShadow, vec3(gl_FragCoord.xy / tintMapSize, gl_FragCoord.z - tintBias)) < 0.5) discard;
    vec3 passing = tintTransmission * tintColor * baseSample.rgb;
    tintOutput = vec4(mix(vec3(1.0), passing, coverage), gl_FragCoord.z);
    return;
  }
`,fe=`#version 300 es
precision highp float;
in vec2 textureUV;
uniform float alphaMasked;
uniform float alphaCutoff;
uniform float materialOpacity;
uniform float hasBaseMap;
uniform sampler2D baseMap;
void main() {
  if (alphaMasked < 0.5) return;
  float alpha = materialOpacity;
  if (hasBaseMap > 0.5) alpha *= texture(baseMap, textureUV).a;
  if (alpha < alphaCutoff) discard;
}
`;function pe(e=[]){let t=oe(fe,e);return new Set(e).has(`tintedShadows`)?t.replace(`precision highp float;`,()=>`precision highp float;\n${ue}`).replace(`void main() {
`,()=>de):t}var me=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=2) in mat4 instanceMatrix;
layout(location=9) in vec3 instanceColor;
uniform mat4 viewProjection;
out vec3 color;
${te([])}
${ne([])}
void main() {
  color = instanceColor;
  gl_Position = viewProjection * instanceMatrix * skinTransform() * vec4(morphedPosition(position), 1.0);
}`,he=`#version 300 es
precision highp float;
in vec3 color;
out vec4 outputColor;
void main() { outputColor = vec4(color, 1.0); }
`;function ge(e,t){return`#version 300 es
${e}
precision highp float;
in vec3 worldPosition, worldNormal;
#ifdef INSTANCED
flat in vec3 baseColor;
flat in vec4 surface;
flat in vec4 instanceEmission;
flat in float instanceOpacity;
flat in mat3 boxNormalMatrix;
#else
uniform vec3 baseColor;
uniform vec4 surface;
uniform vec4 instanceEmission;
uniform float instanceOpacity;
uniform mat3 boxNormalMatrix;
#endif
#ifdef VERTEX_COLORS
in vec3 vertexTint;
in float vertexSkyVisibility;
#else
const vec3 vertexTint = vec3(1.0);
const float vertexSkyVisibility = 1.0;
#endif
#if defined(VERTEX_COLORS) && defined(SURFACE_WEAR)
in vec2 vertexWear;
#else
const vec2 vertexWear = vec2(0.0);
#endif
uniform float wearEnabled;
uniform vec4 wearMetal;
uniform vec4 wearDirt;
uniform vec4 wearShape;
uniform vec2 wearDirtShape;

float wearCellHash(vec3 cell) {
  uvec3 lattice = uvec3(ivec3(floor(cell)) + ivec3(32768));
  uint bits = (lattice.x * 1597334673u) ^ (lattice.y * 3812015801u) ^ (lattice.z * 2798796415u);
  bits = (bits ^ (bits >> 16u)) * 2246822519u;
  bits = (bits ^ (bits >> 13u)) * 3266489917u;
  bits ^= bits >> 16u;
  return float(bits >> 8u) / 16777215.0;
}

float wearNoise(vec3 position) {
  vec3 cell = floor(position);
  vec3 blend = fract(position);
  blend = blend * blend * (3.0 - 2.0 * blend);
  float low = mix(mix(wearCellHash(cell), wearCellHash(cell + vec3(1, 0, 0)), blend.x), mix(wearCellHash(cell + vec3(0, 1, 0)), wearCellHash(cell + vec3(1, 1, 0)), blend.x), blend.y);
  float high = mix(mix(wearCellHash(cell + vec3(0, 0, 1)), wearCellHash(cell + vec3(1, 0, 1)), blend.x), mix(wearCellHash(cell + vec3(0, 1, 1)), wearCellHash(cell + vec3(1, 1, 1)), blend.x), blend.y);
  return mix(low, high, blend.z);
}
in vec4 shadowPosition;
in vec2 textureUV, lightmapUV;
uniform sampler2D lightMap;
uniform float lightMapScale;
uniform float hasLightMap;
uniform vec3 eye;
uniform float renderPassMode;
uniform float renderPassDepthRange;
uniform float renderPassObjectBase;
uniform vec3 armorColor;
uniform vec2 armorSurface;
uniform float exposure;
uniform float inspection;
uniform float worldMode;
uniform float time;
uniform float daylight;
uniform vec3 lightDirection;
uniform int pointLightCount;
uniform vec4 pointLightPositions[16];
uniform vec4 pointLightColors[16];
uniform float pointLightRadii[16];
uniform float pointLightShadowTiles[16];
uniform int spotLightCount;
uniform vec4 spotLightPositions[8];
uniform vec4 spotLightColors[8];
uniform vec4 spotLightDirections[8];
uniform vec4 spotLightParameters[8];
uniform int areaLightCount;
uniform vec4 areaLightPositions[7];
uniform vec4 areaLightColors[7];
uniform vec4 areaLightNormals[7];
uniform vec4 areaLightTangents[7];
uniform sampler2D localShadowAtlas;
uniform mat4 localShadowMatrices[24];
uniform float localShadowTexelAngles[24];
uniform vec3 keyColor;
uniform float fillIntensity;
uniform float ambientIntensity;
uniform float specularAntiAliasing;
const float MAXIMUM_SPECULAR_WIDENING = 0.25;
uniform vec3 fogColor;
uniform float fogDensity;
uniform vec3 waterRipple;
uniform float rippleTime;
uniform float explosionProgress;
uniform highp sampler2DShadow shadowMap;
uniform float shadowBiasPerSlope;
uniform sampler2D tintShadowMap;
uniform float tintBlind;
uniform sampler2D baseMap;
uniform float hasBaseMap;
uniform sampler2D normalMap;
uniform sampler2D metallicRoughnessMap;
uniform sampler2D occlusionMap;
uniform sampler2D emissiveMap;
uniform float hasNormalMap;
uniform float hasMetallicRoughnessMap;
uniform float hasOcclusionMap;
uniform float hasEmissiveMap;
uniform vec2 normalScale;
uniform float occlusionStrength;
in vec3 boxPosition, boxNormal;
uniform float boxMapScale;
uniform int boxMapAxis;
uniform vec3 materialDielectric;
uniform vec2 materialCoat;
uniform vec4 materialSheen;
uniform vec4 materialMoss;
uniform float hdrEnabled;
uniform float alphaMode;
uniform float alphaCutoff;
uniform float materialOpacity;
uniform float alphaToCoverage;
uniform float doubleSided;
uniform float shadowBlind;
uniform float compositeMode;
out vec4 outputColor;
const float PI = 3.14159265359;

${t(`worldFunctions`)}
vec3 fresnel(float cosine, vec3 reflectance) {
  float weight = LIGHT_SHADING ? exp2((-5.55473 * cosine - 6.98316) * cosine) : pow(1.0 - cosine, 5.0);
  return reflectance + (1.0 - reflectance) * weight;
}

float shadowVisibility(vec3 normal) {
  vec3 projected = shadowPosition.xyz / shadowPosition.w * 0.5 + 0.5;
  if (projected.z > 1.0 || projected.z < 0.0 || any(lessThan(projected.xy, vec2(0.0))) || any(greaterThan(projected.xy, vec2(1.0)))) return 1.0;
  float cosine = max(dot(normal, normalize(lightDirection)), 0.05);
  float bias = shadowBiasPerSlope * clamp(sqrt(1.0 - cosine * cosine) / cosine, 0.25, 4.0);
  const int radius = LIGHT_SHADING ? 0 : 1;
  float visibility = 0.0;
  vec2 texel = 1.0 / vec2(textureSize(shadowMap, 0));
  for (int row = -radius; row <= radius; row++) {
    for (int column = -radius; column <= radius; column++) {
      visibility += texture(shadowMap, vec3(projected.xy + vec2(column, row) * texel * 2.5, projected.z - bias));
    }
  }
  return visibility / float((2 * radius + 1) * (2 * radius + 1));
}

vec3 tintedShadowTransmittance(vec3 normal) {
  vec3 projected = shadowPosition.xyz / shadowPosition.w * 0.5 + 0.5;
  if (projected.z > 1.0 || projected.z < 0.0 || any(lessThan(projected.xy, vec2(0.0))) || any(greaterThan(projected.xy, vec2(1.0)))) return vec3(1.0);
  float cosine = max(dot(normal, normalize(lightDirection)), 0.05);
  float bias = shadowBiasPerSlope * clamp(sqrt(1.0 - cosine * cosine) / cosine, 0.25, 4.0);
  float nearestCaster = texelFetch(tintShadowMap, ivec2(projected.xy * vec2(textureSize(tintShadowMap, 0))), 0).a;
  return projected.z - bias > nearestCaster ? texture(tintShadowMap, projected.xy).rgb : vec3(1.0);
}

float localShadowVisibility(float tile, vec3 position, vec3 normal, float lightDistance) {
  int tileIndex = int(tile);
  vec3 shifted = position + normal * (lightDistance * localShadowTexelAngles[tileIndex] * 2.0);
  vec4 clip = localShadowMatrices[tileIndex] * vec4(shifted, 1.0);
  if (clip.w <= 0.0) return 1.0;
  vec3 projected = clip.xyz / clip.w * 0.5 + 0.5;
  if (projected.z > 1.0 || any(lessThan(projected.xy, vec2(0.0))) || any(greaterThan(projected.xy, vec2(1.0)))) return 1.0;
  ivec2 tileOrigin = ivec2(tileIndex % 4, tileIndex / 4) * 512;
  vec2 pixel = projected.xy * 512.0 - 0.5;
  ivec2 corner = ivec2(floor(pixel));
  vec2 blend = fract(pixel);
  float receiverDepth = projected.z - 0.00002;
  float lit[4];
  for (int tap = 0; tap < 4; tap++) {
    ivec2 texel = clamp(corner + ivec2(tap & 1, tap >> 1), ivec2(0), ivec2(511));
    lit[tap] = step(receiverDepth, texelFetch(localShadowAtlas, tileOrigin + texel, 0).r);
  }
  return mix(mix(lit[0], lit[1], blend.x), mix(lit[2], lit[3], blend.x), blend.y);
}

float pointShadowFace(vec3 fromLight) {
  vec3 magnitude = abs(fromLight);
  if (magnitude.x >= magnitude.y && magnitude.x >= magnitude.z) return fromLight.x < 0.0 ? 1.0 : 0.0;
  if (magnitude.y >= magnitude.z) return fromLight.y < 0.0 ? 3.0 : 2.0;
  return fromLight.z < 0.0 ? 5.0 : 4.0;
}

float localAttenuation(float distanceSquared, float range, float radius) {
  float cutoff = 1.0;
  if (range > 0.0) {
    float squaredRatio = distanceSquared / (range * range);
    float fade = max(1.0 - squaredRatio * squaredRatio, 0.0);
    cutoff = fade * fade;
  }
  return cutoff / max(distanceSquared, radius * radius);
}

vec3 studio(vec3 direction, float roughness) {
  vec3 color = mix(vec3(0.025, 0.035, 0.045), vec3(0.22, 0.25, 0.27), smoothstep(-0.3, 0.8, direction.y));
  float blur = roughness * 0.35;
  float key = smoothstep(0.80 - blur, 0.87, dot(direction, normalize(vec3(-3.0, 5.0, 4.0))));
  float rim = smoothstep(0.90 - blur, 0.97, dot(direction, normalize(vec3(4.0, 2.0, -3.0))));
  float strip = exp(-pow((direction.x + 0.6) / (0.035 + blur), 2.0)) * smoothstep(-0.1, 0.6, direction.y);
  return color + key * vec3(2.8, 2.2, 1.6) + rim * vec3(0.5, 1.6, 1.5) + strip * vec3(0.7);
}
${t(`environmentShading`)}
vec3 directSpecularGain = vec3(1.0);

${t(`declarations`)}vec3 illuminate(vec3 normal, vec3 viewDirection, vec3 lightDirection, vec3 radiance, vec3 color, float metallic, float roughness) {
  float normalLight = max(dot(normal, lightDirection), 0.0);
  if (normalLight == 0.0) return vec3(0);
  vec3 halfway = normalize(viewDirection + lightDirection);
  float normalView = max(dot(normal, viewDirection), 0.001);
  float normalHalf = max(dot(normal, halfway), 0.0);
  float alpha = roughness * roughness;
  float denominator = normalHalf * normalHalf * (alpha * alpha - 1.0) + 1.0;
  float distribution = alpha * alpha / max(PI * denominator * denominator, 0.00001);
  float geometry;
  float visibilityDenominator;
  if (LIGHT_SHADING) {
    geometry = 1.0;
    float lightHalf = max(dot(lightDirection, halfway), 0.001);
    visibilityDenominator = 4.0 * lightHalf * lightHalf;
  } else {
    float masking = pow(roughness + 1.0, 2.0) / 8.0;
    geometry = normalView / (normalView * (1.0 - masking) + masking);
    geometry *= normalLight / (normalLight * (1.0 - masking) + masking);
    visibilityDenominator = max(4.0 * normalView * normalLight, 0.001);
  }
  vec3 baseReflectance = mix(materialDielectric, color, metallic);
${t(`illuminateReflectance`)}  vec3 reflectance = fresnel(max(dot(halfway, viewDirection), 0.0), baseReflectance);
  vec3 specular = distribution * geometry * reflectance / visibilityDenominator;
  specular *= directSpecularGain;
${t(`illuminateSpecular`)}  vec3 diffuse = (1.0 - reflectance) * (1.0 - metallic) * color / PI;
  return (diffuse + specular) * radiance * normalLight;
}

vec3 toneMap(vec3 color) {
  return clamp((color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14), 0.0, 1.0);
}

vec3 boxAxisSwap(vec3 value) {
  if (boxMapAxis == 0) return value.yxz;
  if (boxMapAxis == 2) return value.xzy;
  return value;
}

vec3 boxWeights(vec3 direction) {
  vec3 weights = pow(abs(direction), vec3(8.0));
  return weights / max(weights.x + weights.y + weights.z, 1e-5);
}

vec4 sampleBox(sampler2D source) {
  vec3 coordinates = boxAxisSwap(boxPosition) * boxMapScale;
  vec3 weights = boxWeights(boxAxisSwap(normalize(boxNormal)));
  return texture(source, coordinates.zy) * weights.x + texture(source, coordinates.xz) * weights.y + texture(source, coordinates.xy) * weights.z;
}

vec3 boxMappedNormal(vec3 normal) {
  vec3 coordinates = boxAxisSwap(boxPosition) * boxMapScale;
  vec3 objectNormal = boxAxisSwap(normalize(boxNormal));
  vec3 weights = boxWeights(objectNormal);
  vec3 sampleX = texture(normalMap, coordinates.zy).xyz * 2.0 - 1.0;
  vec3 sampleY = texture(normalMap, coordinates.xz).xyz * 2.0 - 1.0;
  vec3 sampleZ = texture(normalMap, coordinates.xy).xyz * 2.0 - 1.0;
  vec3 blendX = vec3(sampleX.xy * normalScale + objectNormal.zy, abs(sampleX.z) * objectNormal.x);
  vec3 blendY = vec3(sampleY.xy * normalScale + objectNormal.xz, abs(sampleY.z) * objectNormal.y);
  vec3 blendZ = vec3(sampleZ.xy * normalScale + objectNormal.xy, abs(sampleZ.z) * objectNormal.z);
  vec3 blended = blendX.zyx * weights.x + blendY.xzy * weights.y + blendZ * weights.z;
  vec3 world = normalize(boxNormalMatrix * boxAxisSwap(blended));
  return dot(world, normal) < 0.0 ? -world : world;
}

vec2 mapUV(float flag) {
  return flag > 1.5 ? lightmapUV : textureUV;
}

float normalMapVariance = 0.0;

vec3 mappedNormal(vec3 normal) {
  vec3 positionX = dFdx(worldPosition);
  vec3 positionY = dFdy(worldPosition);
  vec2 uvX = dFdx(textureUV);
  vec2 uvY = dFdy(textureUV);
  float uvScale = max(max(abs(uvX.x), abs(uvX.y)), max(abs(uvY.x), abs(uvY.y)));
  if (uvScale == 0.0) return normal;
  uvX /= uvScale;
  uvY /= uvScale;
  float determinant = uvX.x * uvY.y - uvX.y * uvY.x;
  if (abs(determinant) < 1e-7) return normal;
  vec3 tangent = (positionX * uvY.y - positionY * uvX.y) / determinant;
  vec3 bitangent = (positionY * uvX.x - positionX * uvY.x) / determinant;
  tangent -= normal * dot(normal, tangent);
  float tangentScale = max(max(abs(tangent.x), abs(tangent.y)), abs(tangent.z));
  if (tangentScale == 0.0) return normal;
  tangent /= tangentScale;
  tangent = normalize(tangent);
  float handedness = dot(cross(normal, tangent), bitangent) < 0.0 ? -1.0 : 1.0;
  bitangent = normalize(cross(normal, tangent)) * handedness;
  vec3 sampled = texture(normalMap, textureUV${t(`normalUv`)}).xyz * 2.0 - 1.0;
  float filteredLength = clamp(length(sampled), 0.05, 1.0);
  normalMapVariance = (1.0 - filteredLength) / filteredLength;
  sampled.xy *= normalScale;
  vec3 mapped = mat3(tangent, bitangent, normal) * sampled;
  return dot(mapped, mapped) > 1e-12 ? normalize(mapped) : normal;
}

${t(`libraries`)}

${t(`worldMossFunction`)}// Opaque draws 1, mask resolves to a cutout (smooth coverage with MSAA), blend and add keep the fraction (per instance opacity times the batch one).
float surfaceAlpha(float textureAlpha) {
  if (!USES_ALPHA_MODE) return 1.0;
  float alpha = materialOpacity * instanceOpacity * textureAlpha;
  if (alphaMode > 1.5) return alpha;
  if (alphaToCoverage > 0.5) {
    float softness = max(fwidth(alpha), 0.0001);
    alpha = clamp((alpha - alphaCutoff) / softness + 0.5, 0.0, 1.0);
    if (alpha <= 0.0) discard;
    return alpha;
  }
  if (alpha < alphaCutoff) discard;
  return 1.0;
}

vec3 surroundingsColor(vec3 direction, float roughness) {
  if (ENVIRONMENT_ENABLED) return environmentRadiance(direction, roughness * environmentLevelMax);
  if (worldMode > 0.5) return mix(fogColor * 0.8, vec3(0.20, 0.38, 0.52) * 1.6, smoothstep(-0.15, 0.7, direction.y)) * 0.5 * daylight;
  return studio(direction, roughness);
}

vec3 clearCoatLayer(vec3 baseRadiance, vec3 normal, vec3 viewDirection, float visibility, float coatStrength) {
  float roughness = clamp(materialCoat.y, 0.075, 1.0);
${t(`coatReset`)}  float coatFresnel = fresnel(max(dot(normal, viewDirection), 0.001), vec3(0.04)).x * coatStrength;
  vec3 mirror = surroundingsColor(reflect(-viewDirection, normal), roughness) * coatFresnel * ambientIntensity;
  vec3 highlight = illuminate(normal, viewDirection, normalize(lightDirection), keyColor * visibility, vec3(0.04), 1.0, roughness);
  return baseRadiance * (1.0 - coatFresnel) + mirror + highlight * coatStrength;
}

vec3 sheenLayer(vec3 baseRadiance, vec3 normal, vec3 viewDirection, float visibility) {
  float roughness = clamp(materialSheen.w, 0.07, 1.0);
  float inverseAlpha = 1.0 / (roughness * roughness);
  vec3 lightVector = normalize(lightDirection);
  vec3 halfway = normalize(viewDirection + lightVector);
  float normalLight = max(dot(normal, lightVector), 0.0);
  float normalView = max(dot(normal, viewDirection), 0.001);
  float sine = sqrt(max(1.0 - pow(max(dot(normal, halfway), 0.0), 2.0), 0.0));
  float distribution = (2.0 + inverseAlpha) * pow(sine, inverseAlpha) / (2.0 * PI);
  float visibilityTerm = 1.0 / (4.0 * (normalLight + normalView - normalLight * normalView));
  vec3 keyTerm = materialSheen.rgb * distribution * visibilityTerm * normalLight * keyColor * visibility;
  vec3 ambientTerm = ENVIRONMENT_ENABLED ? environmentDiffuse(normal) : mix(vec3(0.16, 0.20, 0.22), vec3(0.19, 0.25, 0.30) * max(daylight, 0.08), worldMode);
  vec3 rimTerm = materialSheen.rgb * ambientTerm * pow(1.0 - normalView, 3.0) * ambientIntensity;
  float shadowedBase = 1.0 - 0.2 * max(materialSheen.r, max(materialSheen.g, materialSheen.b));
  return baseRadiance * shadowedBase + keyTerm + rimTerm;
}

vec3 renderPassValue(vec3 color, vec3 normal, vec3 emission) {
  if (renderPassMode < 1.5) return clamp(color, 0.0, 1.0);
  if (renderPassMode < 2.5) return normal * 0.5 + 0.5;
  if (renderPassMode < 3.5) return clamp(emission, 0.0, 1.0);
  if (renderPassMode < 4.5) {
    float steps = floor(clamp(length(worldPosition - eye) / renderPassDepthRange, 0.0, 1.0) * 65535.0 + 0.5);
    float high = floor(steps / 256.0);
    return vec3(high, steps - high * 256.0, 0.0) / 255.0;
  }
  float identifier = renderPassObjectBase + instanceEmission.w + 1.0;
  float high = floor(identifier / 65536.0);
  float middle = floor((identifier - high * 65536.0) / 256.0);
  return vec3(identifier - high * 65536.0 - middle * 256.0, middle, high) / 255.0;
}

void main() {
  vec3 normal = normalize(worldNormal);
  bool canopyShaded = CANOPY_TAG;
  if (doubleSided > 0.5 && !gl_FrontFacing && !canopyShaded) normal = -normal;
  vec3 geometricNormal = normal;
  if (USES_NORMAL_MAP) normal = BOX_MAPPED ? boxMappedNormal(normal) : mappedNormal(normal);
  vec3 viewDirection = normalize(eye - worldPosition);
  vec3 color = mix(baseColor, armorColor, step(0.5, surface.w) * (1.0 - step(1.5, surface.w)));
  if (!USES_SPLAT) color *= vertexTint;
  float textureAlpha = 1.0;
  if (USES_BASE_MAP) {
    vec4 sampledBase = BOX_MAPPED ? sampleBox(baseMap) : texture(baseMap, textureUV);
    color *= sampledBase.rgb;
    textureAlpha = sampledBase.a;
  }
${t(`surfaceHook`)}  float alpha = surfaceAlpha(textureAlpha);
  vec3 emission = instanceEmission.rgb * surface.z;
  if (USES_EMISSIVE_MAP) emission *= (BOX_MAPPED ? sampleBox(emissiveMap) : texture(emissiveMap, mapUV(hasEmissiveMap))).rgb;
  if (USES_RENDER_PASS) {
    outputColor = vec4(renderPassValue(color, normal, emission), 1.0);
    return;
  }
  if (TAG_UNLIT) {
    vec3 radiance = color * exposure + emission;
    outputColor = vec4(hdrEnabled > 0.5 ? radiance : pow(max(radiance, vec3(0)), vec3(1.0 / 2.2)), alpha);
    return;
  }
  float metallic = surface.x;
  float roughness = clamp(surface.y, 0.075, 1.0);
  if (surface.w > 0.5 && surface.w < 1.5) {
    metallic = armorSurface.x;
    roughness = armorSurface.y;
  }
  if (USES_METALLIC_ROUGHNESS_MAP) {
    vec4 sampled = BOX_MAPPED ? sampleBox(metallicRoughnessMap) : texture(metallicRoughnessMap, mapUV(hasMetallicRoughnessMap));
    metallic *= sampled.b;
    roughness *= sampled.g;
  }
  float coatKept = 1.0;
  if (USES_SURFACE_WEAR) {
    float wearBreak = 0.65 * wearNoise(worldPosition * 48.0) + 0.35 * wearNoise(worldPosition * 110.0 + vec3(17.0));
    float worn = smoothstep(wearShape.y - wearShape.z, wearShape.y + wearShape.z, vertexWear.x * (0.55 + 0.9 * wearBreak));
    color = mix(color, wearMetal.rgb * (0.8 + 0.4 * wearBreak), worn);
    metallic = mix(metallic, wearMetal.w, worn);
    roughness = mix(roughness, wearShape.x * (0.75 + 0.5 * wearBreak), worn);
    coatKept = 1.0 - worn;
    if (wearShape.w > 0.5) {
      float dirtBreak = 0.65 * wearNoise(worldPosition * 30.0 + vec3(5.0)) + 0.35 * wearNoise(worldPosition * 75.0 + vec3(31.0));
      float dirty = smoothstep(wearDirtShape.x - wearDirtShape.y, wearDirtShape.x + wearDirtShape.y, vertexWear.y * (0.7 + 0.6 * dirtBreak));
      color = mix(color, mix(color * 0.35, wearDirt.rgb, 0.6), dirty);
      metallic *= 1.0 - dirty;
      roughness = mix(roughness, max(roughness, wearDirt.w), dirty);
      coatKept *= 1.0 - dirty;
    }
  }
  float splatCavity = 1.0;
  if (USES_SPLAT) applySplat(color, normal, roughness, splatCavity);
  roughness = clamp(roughness, 0.075, 1.0);
  if (specularAntiAliasing > 0.0) {
    vec3 normalX = dFdx(normal);
    vec3 normalY = dFdy(normal);
    float screenVariance = 0.25 * (dot(normalX, normalX) + dot(normalY, normalY));
    float widening = min(2.0 * screenVariance + 0.5 * normalMapVariance, MAXIMUM_SPECULAR_WIDENING);
    roughness = clamp(sqrt(roughness * roughness + specularAntiAliasing * widening), 0.075, 1.0);
  }
  float mossCover = 0.0;
  vec3 mossTone = vec3(0.0);
${t(`worldSurface`)}  vec3 specularNormal = normal;
  vec3 baseReflectance = mix(materialDielectric, color, metallic);
${t(`mainSetup`)}  if (ENVIRONMENT_ENABLED && !LIGHT_SHADING) {
    vec2 brdfLookup = texture(environmentBrdf, vec2(clamp(dot(normal, viewDirection), 0.001, 1.0), roughness)).rg;
    directSpecularGain = multipleScatterGain(brdfLookup, baseReflectance);
  }
  float visibility = shadowBlind > 0.5 ? 1.0 : shadowVisibility(normal);
  vec3 shadowTint = (USES_TINTED_SHADOWS && shadowBlind < 0.5 && tintBlind < 0.5) ? tintedShadowTransmittance(normal) : vec3(1.0);
${t(`worldVisibility`)}  vec3 radiance = illuminate(normal, viewDirection, normalize(lightDirection), keyColor * visibility * shadowTint${t(`linkSun`)}, color, metallic, roughness);
  if (FILL_ON) {
  radiance += illuminate(normal, viewDirection, normalize(vec3(4.0, 2.0, -3.0)), mix(vec3(0.8, 2.0, 1.8), vec3(0.12, 0.17, 0.20) * daylight, worldMode) * fillIntensity * mix(1.0, vertexSkyVisibility, worldMode), color, metallic, roughness);
  radiance += illuminate(normal, viewDirection, normalize(vec3(1.0, 2.0, 5.0)), vec3(0.6, 0.7, 0.8) * mix(1.0, 0.25 * daylight, worldMode) * fillIntensity * mix(1.0, vertexSkyVisibility, worldMode), color, metallic, roughness);
  }
  for (int index = 0; index < 16; index++) {
    if (index >= pointLightCount) break;
    vec3 offset = pointLightPositions[index].xyz - worldPosition;
    float distanceSquared = dot(offset, offset);
    if (distanceSquared < 1e-12 || pointLightColors[index].w == 0.0) continue;
    float attenuation = localAttenuation(distanceSquared, pointLightPositions[index].w, pointLightRadii[index]);
    if (attenuation == 0.0) continue;
${t(`linkPoint`)}    vec3 lightRadiance = pointLightColors[index].rgb * pointLightColors[index].w * attenuation;
    if (USES_LOCAL_SHADOWS && pointLightShadowTiles[index] >= 0.0) {
      float tile = pointLightShadowTiles[index] + pointShadowFace(-offset);
      lightRadiance *= shadowBlind > 0.5 ? 1.0 : localShadowVisibility(tile, worldPosition, normal, sqrt(distanceSquared));
    }
    radiance += illuminate(normal, viewDirection, offset * inversesqrt(distanceSquared), lightRadiance, color, metallic, roughness);
  }
  if (USES_SPOT_LIGHTS) {
    for (int index = 0; index < 8; index++) {
      if (index >= spotLightCount) break;
      vec3 offset = spotLightPositions[index].xyz - worldPosition;
      float distanceSquared = dot(offset, offset);
      if (distanceSquared < 1e-12 || spotLightColors[index].w == 0.0) continue;
      vec3 toLight = offset * inversesqrt(distanceSquared);
      float coneCosine = dot(-toLight, spotLightDirections[index].xyz);
      float cone = smoothstep(spotLightDirections[index].w, spotLightParameters[index].y, coneCosine);
      float attenuation = localAttenuation(distanceSquared, spotLightPositions[index].w, spotLightParameters[index].x) * cone;
      if (attenuation == 0.0) continue;
${t(`linkSpot`)}      vec3 lightRadiance = spotLightColors[index].rgb * spotLightColors[index].w * attenuation;
      if (USES_LOCAL_SHADOWS && spotLightParameters[index].z >= 0.0) {
        lightRadiance *= shadowBlind > 0.5 ? 1.0 : localShadowVisibility(spotLightParameters[index].z, worldPosition, normal, sqrt(distanceSquared));
      }
      radiance += illuminate(normal, viewDirection, toLight, lightRadiance, color, metallic, roughness);
    }
  }
  if (USES_AREA_LIGHTS) {
    for (int index = 0; index < 7; index++) {
      if (index >= areaLightCount) break;
${t(`linkArea`)}      vec3 lightNormal = areaLightNormals[index].xyz;
      vec3 widthAxis = areaLightTangents[index].xyz;
      vec3 heightAxis = cross(lightNormal, widthAxis);
      vec2 halfSize = vec2(areaLightNormals[index].w, areaLightTangents[index].w) * 0.5;
      vec3 fromCenter = worldPosition - areaLightPositions[index].xyz;
      vec3 closest = areaLightPositions[index].xyz
        + widthAxis * clamp(dot(fromCenter, widthAxis), -halfSize.x, halfSize.x)
        + heightAxis * clamp(dot(fromCenter, heightAxis), -halfSize.y, halfSize.y);
      vec3 offset = closest - worldPosition;
      float distanceSquared = dot(offset, offset);
      vec3 toLight = offset * inversesqrt(max(distanceSquared, 1e-12));
      float emission = max(dot(-toLight, lightNormal), 0.0);
      float area = 4.0 * halfSize.x * halfSize.y;
      float attenuation = emission / (distanceSquared + area / PI);
      vec3 lightRadiance = areaLightColors[index].rgb * areaLightColors[index].w * attenuation;
${t(`areaRadiance`)}      radiance += illuminate(normal, viewDirection, toLight, lightRadiance, color, metallic, roughness);
    }
  }
  vec3 reflectance = fresnel(max(dot(normal, viewDirection), 0.0), baseReflectance);
  float occlusion = 1.0;
  if (USES_OCCLUSION_MAP) occlusion = mix(1.0, texture(occlusionMap, mapUV(hasOcclusionMap)).r, occlusionStrength);
  occlusion *= splatCavity * vertexSkyVisibility;
  if (USES_NORMAL_MAP) occlusion *= pow(0.5 + 0.5 * dot(normal, geometricNormal), 2.0);
  if (ENVIRONMENT_ENABLED) {
    float room = 1.0 - smoothstep(0.01, 0.06, dot(environmentDiffuse(vec3(0, 1, 0)), vec3(1)) / max(dot(keyColor, vec3(1)), 0.003));
    occlusion *= mix(1.0, mix(0.25, 1.0, visibility), room * (1.0 - metallic));
  }
  float skyReflection = canopyShaded ? 0.3 : 1.0;
  vec3 reflected = reflect(-viewDirection, specularNormal);
${t(`probeReflection`)}${t(`irradianceGridOcclusion`)}  if (ENVIRONMENT_ENABLED) {
    radiance += environmentLighting(normal, specularNormal, baseReflectance, viewDirection, reflected, color, metallic, roughness, occlusion, ambientIntensity, skyReflection);
  } else {
    vec3 surroundings = worldMode > 0.5 ? mix(fogColor * 0.8, vec3(0.20, 0.38, 0.52) * 1.6, smoothstep(-0.15, 0.7, reflected.y)) : studio(reflected, roughness);
${t(`probeSurroundings`)}    radiance += surroundings * reflectance * skyReflection * (1.0 - roughness * 0.55) * mix(1.0, 0.5 * daylight, worldMode) * occlusion * ambientIntensity;
    radiance += color * (1.0 - metallic) * mix(vec3(0.16, 0.20, 0.22), vec3(0.19, 0.25, 0.30) * max(daylight, 0.08), worldMode) * (0.45 + 0.55 * max(normal.y, 0.0)) * occlusion * ambientIntensity;
  }
  if (USES_LIGHT_MAP) radiance += color * (1.0 - metallic) * texture(lightMap, lightmapUV).rgb * lightMapScale;
${t(`irradianceGrid`)}  vec3 keyResponse = keyColor / mix(vec3(5.2, 4.7, 4.1), vec3(3.7, 3.4, 2.9), worldMode);
  keyResponse *= mix(daylight, 1.0, worldMode);
${t(`worldLight`)}  if (USES_SHEEN) radiance = sheenLayer(radiance, normal, viewDirection, visibility);
  if (USES_CLEARCOAT) radiance = clearCoatLayer(radiance, normal, viewDirection, visibility, materialCoat.x * coatKept);
  radiance += emission;
${t(`afterEmission`)}${t(`worldAfterEmission`)}  if (TAG_FLOOR) {
    float contact = 1.0 - 0.45 * exp(-dot(worldPosition.xz, worldPosition.xz) * 1.4);
    radiance = vec3(0.034, 0.041, 0.046) * (0.4 + visibility * 0.6) * contact;
    float fog = 1.0 - exp(-length(worldPosition.xz) * 0.05);
    radiance = mix(radiance, vec3(0.018, 0.022, 0.026), fog);
  }
${t(`worldFinal`)}  float fog = 1.0 - exp(-length(worldPosition - eye) * fogDensity);
  radiance = alphaMode > 2.5 ? radiance * (1.0 - fog * worldMode) : mix(radiance, fogColor, fog * worldMode);
  if (inspection > 0.5) radiance = normal * 0.5 + 0.5;
  outputColor = vec4(hdrEnabled > 0.5 ? clamp(radiance * exposure, vec3(0), vec3(65504.0)) : pow(toneMap(radiance * exposure), vec3(1.0 / 2.2)), alpha);
  if (TAG_FLOOR && inspection < 0.5) {
    float distanceFade = exp(-length(worldPosition.xz) * 0.08);
    float contact = 1.0 - 0.1 * exp(-dot(worldPosition.xz, worldPosition.xz) * 1.4);
    vec3 floorColor = mix(vec3(0.145, 0.162, 0.177), vec3(0.17, 0.19, 0.205), distanceFade);
    vec3 result = floorColor * (0.72 + 0.28 * visibility) * contact;
    outputColor = vec4(hdrEnabled > 0.5 ? pow(result, vec3(2.2)) : result, 1.0);
  }
  if (compositeMode > 0.5) outputColor = compositeMode < 1.5 ? vec4(0.0) : vec4(0.0, 0.0, 0.0, 1.0 - visibility);
}`}var _e={normalMap:[`USES_NORMAL_MAP`,`hasNormalMap > 0.5`],baseMap:[`USES_BASE_MAP`,`hasBaseMap > 0.5`],metallicRoughnessMap:[`USES_METALLIC_ROUGHNESS_MAP`,`hasMetallicRoughnessMap > 0.5`],occlusionMap:[`USES_OCCLUSION_MAP`,`hasOcclusionMap > 0.5`],emissiveMap:[`USES_EMISSIVE_MAP`,`hasEmissiveMap > 0.5`],lightMap:[`USES_LIGHT_MAP`,`hasLightMap > 0.5`],boxMapScale:[`BOX_MAPPED`,`boxMapScale > 0.0`],splat:[`USES_SPLAT`,`splatEnabled > 0.5`],moss:[`USES_MOSS`,`materialMoss.x > 0.0`],alphaMode:[`USES_ALPHA_MODE`,`alphaMode > 0.5`],floor:[`TAG_FLOOR`,`surface.w == 2.0`],water:[`TAG_WATER`,`surface.w == 3.0`],foliage:[`TAG_FOLIAGE`,`surface.w == 4.0`],terrain:[`TAG_TERRAIN`,`surface.w == 5.0`],grass:[`TAG_GRASS`,`surface.w == 7.0`],fire:[`TAG_FIRE`,`surface.w == 8.0`],smoke:[`TAG_SMOKE`,`surface.w == 9.0`],unlit:[`TAG_UNLIT`,`surface.w == 10.0`],spotLights:[`USES_SPOT_LIGHTS`,`spotLightCount > 0`],areaLights:[`USES_AREA_LIGHTS`,`areaLightCount > 0`],localShadows:[`USES_LOCAL_SHADOWS`,`true`],tintedShadows:[`USES_TINTED_SHADOWS`,`true`],fill:[`FILL_ON`,`true`],renderPass:[`USES_RENDER_PASS`,`renderPassMode > 0.5 && renderPassMode < 5.5`],sheen:[`USES_SHEEN`,`materialSheen.rgb != vec3(0.0)`],clearcoat:[`USES_CLEARCOAT`,`materialCoat.x > 0.0`],surfaceWear:[`USES_SURFACE_WEAR`,`wearEnabled > 0.5`]},ve=Object.freeze([`full`,`light`]),ye=Object.freeze([`environmentMap`,`studioLighting`]),be=Object.freeze([`skin`,`morph`,`crowd`,`vertexColors`,`instanced`]);function xe(e){let t=e.has(`environmentMap`),n=e.has(`studioLighting`);return t&&!n?`true`:n&&!t?`false`:`(environmentEnabled > 0.5)`}var Se={environmentShading:`
uniform sampler2D environmentBrdf;
uniform float environmentEnabled;
uniform float environmentLevelMax;
vec3 environmentRadiance(vec3 direction, float level) { return vec3(0.0); }
vec3 environmentDiffuse(vec3 normal) { return vec3(0.0); }
vec3 multipleScatterGain(vec2 lookup, vec3 baseReflectance) { return vec3(1.0); }
vec3 environmentLighting(vec3 normal, vec3 specularNormal, vec3 baseReflectance, vec3 viewDirection, vec3 reflected, vec3 color, float metallic, float roughness, float occlusion, float ambient, float specularWeight) { return vec3(0.0); }
`},Ce=Object.freeze([`water`,`foliage`,`grass`,`terrain`,`moss`,`fire`,`smoke`]),we={splat:{stub:{libraries:`void applySplat(inout vec3 color, inout vec3 normal, inout float roughness, inout float cavity) {}
`}}};function Te(){return d(`liquid`).fragment}function Ee(){return d(`liquid`).draw}function De(e){return e in we?!0:e in _e||e===`lightShading`?!1:!ye.includes(e)&&!be.includes(e)}function Oe(t){let n=new Set(t),r=t.filter(De).map(d);for(let[e,{stub:t}]of Object.entries(we))n.has(e)||r.push(t);return Ce.some(e=>n.has(e))&&r.push(d(`worldMaterials`)),r.push(n.has(`environmentMap`)?e.get(`environmentMap`)??Se:Se),e=>r.map(t=>t[e]??``).join(``)}var ke=Object.freeze([...Object.keys(_e),...ye,...be].filter(e=>!(e in we)&&!Ce.includes(e)));function Ae(e){return[[`vertexColors`,`VERTEX_COLORS`],[`surfaceWear`,`SURFACE_WEAR`],[`instanced`,`INSTANCED`]].filter(([t])=>e.has(t)).map(([,e])=>`#define ${e}`)}function je(e){let t=(e,t)=>e?`(${t})`:`false`;return[`#define USES_SKIN ${t(e.has(`skin`),`skinEnabled > 0.5`)}`,`#define USES_CROWD ${t(e.has(`crowd`),`crowdEnabled > 0.5`)}`,`#define USES_MORPH ${t(e.has(`morph`),`morphEnabled > 0.5`)}`,`#define USES_WIND ${t(e.has(`foliage`)||e.has(`grass`),`true`)}`,`#define USES_WAVES ${t(e.has(`water`),`true`)}`,`#define USES_EXPLOSION ${t(e.has(`fire`)||e.has(`smoke`),`true`)}`,...Ae(e)].join(`
`)}function Me(e=ke){return ae(je(new Set(e)),e)}var Ne=Me(ke.filter(e=>![`crowd`,`skin`,`morph`].includes(e)));function Pe(e=ke){let t=new Set(e),n=Object.entries(_e).map(([e,[n,r]])=>`#define ${n} ${t.has(e)?`(${r})`:`false`}`);return n.push(`#define CANOPY_TAG (TAG_FOLIAGE || TAG_GRASS)`,...Ae(t)),n.push(`#define ENVIRONMENT_ENABLED ${xe(t)}`),n.push(`#define LIGHT_SHADING ${t.has(`lightShading`)?`true`:`false`}`),ge(n.join(`
`),Oe([...t]))}Pe();var Fe=`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`;function N(e,t,n){let r=e.createProgram();e.getExtension(`KHR_parallel_shader_compile`);let i=[];for(let[a,o]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,n]]){let t=e.createShader(a);e.shaderSource(t,p.reduce((e,t)=>t(e),o)),e.compileShader(t),e.attachShader(r,t),i.push(t)}return e.linkProgram(r),{program:r,shaders:i}}var Ie=new WeakSet,Le=new WeakMap,Re=class extends Error{constructor(e){super(`A shader program is still building.`),this.name=`ProgramNotReady`,this.program=e}};function ze(e,t){let n=e.getExtension(`KHR_parallel_shader_compile`);return!n||!!e.getProgramParameter(t,n.COMPLETION_STATUS_KHR)}function Be(e,t){t?Ie.add(e):Ie.delete(e)}function P(e,{program:t,shaders:n}){if(Ie.has(e)&&!ze(e,t))throw new Re(t);let r=e.getProgramParameter(t,e.LINK_STATUS),i=n.find(t=>!e.getShaderParameter(t,e.COMPILE_STATUS)),a=i?e.getShaderInfoLog(i):e.getProgramInfoLog(t);if(n.forEach(t=>e.deleteShader(t)),!r){if(e.deleteProgram(t),e.isContextLost())return t;throw Error(i?`Shader compilation failed: ${a}`:`Shader linking failed: ${a}`)}return t}function Ve(e,t,n){if(!Ie.has(e))return P(e,N(e,t,n));Le.has(e)||Le.set(e,new Map);let r=Le.get(e),i=`${t} ${n}`;r.has(i)||r.set(i,N(e,t,n));let a=P(e,r.get(i));return r.delete(i),a}var He=1048576;function Ue(e,t,n,r){let i=e=>(e/He).toFixed(1);return RangeError(`Memory budget cannot hold geometry ${i(e)} MiB, textures ${i(t)} MiB and frame ${i(n)} MiB, over memoryBudgetMiB ${r}. Fix: pass { memoryBudgetMiB: ${Math.ceil((e+t+n)/He)} }.`)}Object.freeze({preview:{width:960,height:540,samples:2,fps:24,memoryBudgetMiB:256},balanced:{width:1280,height:720,samples:4,fps:24,memoryBudgetMiB:384},high:{width:1920,height:1080,samples:4,fps:24,memoryBudgetMiB:512},cpu:{width:640,height:360,samples:1,fps:12,memoryBudgetMiB:192}});function We(e,t,{mipmaps:n=!0}={}){if(!Number.isInteger(e)||!Number.isInteger(t)||e<=0||t<=0)throw Error(`Texture dimensions must be positive integers.`);let r=0;do{if(r+=e*t*4,!n||e===1&&t===1)break;e=Math.max(1,Math.floor(e/2)),t=Math.max(1,Math.floor(t/2))}while(1);return r}function Ge(e,t,n,r=2048,{hdr:i=!1,bloom:a=!1,depth:o=!1}={}){let s=i?8:4;return e*t*((s+4)*Math.max(1,n)+s+16)+(a?Math.ceil(e/2)*Math.ceil(t/2)*s*2:0)+(o?e*t*4:0)+r**2*4}function Ke({width:e,height:t,pixelRatio:n=1,samples:r=4,memoryBudgetMiB:i,geometryBytes:a=0,textureBytes:o=0,hdr:s=!1,bloom:c=!1,depth:l=!1,shadowResolution:u=2048,maximumSize:d=8192}){let f=Math.max(1,Math.round(e*n)),p=Math.max(1,Math.round(t*n)),m=Ge(Math.min(f,d),Math.min(p,d),r,u,{hdr:s,bloom:c,depth:l});i??=Math.min(globalThis.navigator?.deviceMemory>=8?1024:512,Math.max(256,Math.ceil((a+o+m)/He)));for(let a of[e,t,n,r,i,d])if(!Number.isFinite(a)||a<=0)throw Error(`Render dimensions, sample count and budget must be positive finite numbers.`);if(a<0||!Number.isFinite(a))throw Error(`Geometry memory must be a nonnegative finite number.`);if(o<0||!Number.isFinite(o))throw Error(`Texture memory must be a nonnegative finite number.`);if(!Number.isFinite(u)||u<0)throw Error(`Shadow resolution must be nonnegative and finite.`);let h=i*He-a-o-u**2*4,g=(s?12:8)*Math.max(1,r)+(s?24:20)+(c?s?4:2:0)+(l?4:0);if(h<Ge(64,64,r,0,{hdr:s,bloom:c,depth:l}))throw Ue(a,o,m,i);let _=Math.min(1,d/f,d/p,Math.sqrt(h/(f*p*g))),v=Math.max(1,Math.floor(f*_)),y=Math.max(1,Math.floor(p*_)),b=i*He;for(;Ge(v,y,r,u,{hdr:s,bloom:c,depth:l})+a+o>b;)v=Math.max(1,v-1),y=Math.max(1,y-1);return{width:v,height:y,samples:r,hdr:s,bloom:c,depth:l,textureBytes:o,estimatedBytes:Ge(v,y,r,u,{hdr:s,bloom:c,depth:l})+a+o,memoryBudgetMiB:i,reduced:v<f||y<p}}function qe(){var e=new _(3);return _!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Je(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function Ye(e,t,n){var r=new _(3);return r[0]=e,r[1]=t,r[2]=n,r}function Xe(e,t){var n=t[0],r=t[1],i=t[2],a=n*n+r*r+i*i;return a>0&&(a=1/Math.sqrt(a)),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e}function Ze(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Qe(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2];return e[0]=i*c-a*s,e[1]=a*o-r*c,e[2]=r*s-i*o,e}var $e=Je;(function(){var e=qe();return function(t,n,r,i,a,o){var s,c;for(n||=3,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})(),Object.freeze([`projection`,`orthoScale`,`focalLength`,`sensorWidth`,`shift`,`fStop`]);function et(e){if(!Array.isArray(e)||e.length!==2||!e.every(e=>Number.isFinite(e)&&Math.abs(e)<=1))throw RangeError(`Camera shift must be [x, y], each between -1 and 1 as a fraction of the frame.`)}function tt(e,t,n,{world:r=!1}={}){if(!Number.isFinite(n)||n<=0)throw RangeError(`Camera aspect must be positive and finite`);let i=t.projection!==void 0||t.fov!==void 0||t.focalLength!==void 0,a=t.near!==void 0||t.far!==void 0;if(!i&&!a)return e;let o=t.near??.1,s=t.far??(r?600:100);if(!Number.isFinite(o)||!Number.isFinite(s)||o<=0||s<=o)throw RangeError(`Camera clipping planes must satisfy 0 < near < far`);if(!i){let t=2*Math.atan(1/e[5]),r=e[8];return C(e,t,n,o,s),e[8]=r,e}if(t.shift!==void 0&&et(t.shift),t.projection===`orthographic`){let r=t.orthographicHeight??t.orthoScale??4;if(!Number.isFinite(r)||r<=0)throw RangeError(`Orthographic height must be positive and finite`);let i=r/2;return T(e,-i*n,i*n,-i,i,o,s),t.shift&&(e[12]-=2*t.shift[0],e[13]-=2*t.shift[1]),e}if(t.projection&&t.projection!==`perspective`)throw RangeError(`Unsupported camera projection: ${t.projection}`);return C(e,nt(t,n)*Math.PI/180,n,o,s),t.shift&&(e[8]+=2*t.shift[0],e[9]+=2*t.shift[1]),e}function nt(e,t){if(e.focalLength!==void 0){let{focalLength:n,sensorWidth:r=36}=e;if(!Number.isFinite(n)||n<=0||!Number.isFinite(r)||r<=0)throw RangeError(`Focal length and sensor width must be positive and finite`);return 2*Math.atan(r/t/n/2)*180/Math.PI}let n=e.fov??45;if(!Number.isFinite(n)||n<=0||n>=180)throw RangeError(`Camera field of view must be between 0 and 180 degrees`);return n}var rt=new Float32Array(4);function it(e,t){for(let n=0;n<4;n++){let r=n*4+2,i=t[r],a=t[r+1];e[n*4]=t[n*4],e[n*4+1]=t[n*4+1],e[r]=(a-i)/2,e[r+1]=a}return e}var at=`gl_Position = viewProjection * world;`,ot=`gl_Position = viewProjection * vec4(world.xyz - cameraOffset.xyz, 1.0 - cameraOffset.w) + cameraShift;`,st=`uniform mat4 lightProjection;
uniform vec4 cameraOffset;
uniform vec4 cameraShift;`,ct=!1,lt=!1;function ut(e){return!ct||!e.includes(at)?e:e.replace(`uniform mat4 lightProjection;`,st).replace(at,ot)}var dt=`#version 300 es
precision highp float;
uniform highp sampler2D reversedDepth;
void main() {
  gl_FragDepth = 1.0 - texelFetch(reversedDepth, ivec2(gl_FragCoord.xy), 0).r;
}`;function ft(){let e=null,t=null,n=null;function r(e){n&&=(e.deleteTexture(n.texture),e.deleteFramebuffer(n.framebuffer),null)}function i(e,t,n){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,t,n,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);let i=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,r,0),{texture:r,framebuffer:i,width:t,height:n}}function a(a){if(!a.depthTexture)return null;let o=a.context,{width:s,height:c}=a.canvas;return e||(e=Ve(o,`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`,dt),t=o.getUniformLocation(e,`reversedDepth`)),n&&(n.width!==s||n.height!==c)&&r(o),n??=i(o,s,c),o.bindFramebuffer(o.READ_FRAMEBUFFER,a.resolveFramebuffer),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,n.framebuffer),o.blitFramebuffer(0,0,s,c,0,0,s,c,o.DEPTH_BUFFER_BIT,o.NEAREST),o.bindFramebuffer(o.FRAMEBUFFER,a.resolveFramebuffer),o.viewport(0,0,s,c),o.useProgram(e),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.texture),o.uniform1i(t,0),o.enable(o.DEPTH_TEST),o.depthFunc(o.ALWAYS),o.colorMask(!1,!1,!1,!1),o.disable(o.CULL_FACE),o.bindVertexArray(null),o.drawArrays(o.TRIANGLES,0,3),o.colorMask(!0,!0,!0,!0),o.depthFunc(o.LESS),o.disable(o.DEPTH_TEST),null}function o(t){r(t),e&&t.deleteProgram(e),e=null}return{name:`Reversed depth`,apply:a,releaseTargets:r,dispose:o}}function pt(e){let t=e.context;if(!e.multisampleFramebuffer)return;let{width:n,height:r}=e.canvas;t.bindRenderbuffer(t.RENDERBUFFER,e.multisampleDepth),t.renderbufferStorageMultisample(t.RENDERBUFFER,e.multisampleSamples,t.DEPTH_COMPONENT32F,n,r),e.renderTargets?.record(`multisampleDepth`,{width:n,height:r,format:`DEPTH_COMPONENT32F`,samples:e.multisampleSamples}),e.depthTexture&&(t.bindTexture(t.TEXTURE_2D,e.depthTexture),t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT32F,n,r,0,t.DEPTH_COMPONENT,t.FLOAT,null),e.renderTargets?.record(`sceneDepth`,{width:n,height:r,format:`DEPTH_COMPONENT32F`}));for(let n of[e.multisampleFramebuffer,e.resolveFramebuffer])if(t.bindFramebuffer(t.FRAMEBUFFER,n),t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE)throw Error(`Reversed depth targets failed to allocate. Pass reversedDepth: false to the install.`);t.bindFramebuffer(t.FRAMEBUFFER,null)}function mt(e){if(e.cameraRelativeMainProgram)return;lt||=(p.push(ut),!0);let t=e.startMainProgram;e.startMainProgram=function(){ct=!0;try{return t.call(this)}finally{ct=!1}},e.cameraRelativeMainProgram=!0}function ht(e,t=`auto`){if(t===!1&&(e.reversedDepth??=!1),t===!1||e.reversedDepth!==void 0)return e;let n=e.context,r={render:e.render,applyEnvironmentUniforms:e.applyEnvironmentUniforms,applyDepthRank:e.applyDepthRank,resolveFrame:e.resolveFrame,allocateFrameTargets:e.allocateFrameTargets},i=v(),a=v(),o=new Float32Array([0,0,0,1]),s=new Float32Array(4),c=null,l=!1,u=!1,d=null,f=null;function p(){u&&c.active!==!1&&(c.extension.clipControlEXT(c.extension.LOWER_LEFT_EXT,c.extension.NEGATIVE_ONE_TO_ONE_EXT),n.depthFunc(n.LESS),c.active=!1)}function m(t,r){n.uniform4fv(n.getUniformLocation(e.program,`cameraOffset`),t),n.uniform4fv(n.getUniformLocation(e.program,`cameraShift`),r),f=e.program}function h(){f===e.program&&(n.useProgram(e.program),m(rt,rt),f=null)}function g(){it(i,e.projection),x(a,i,e.view),n.uniformMatrix4fv(e.uniforms.viewProjection,!1,a),e.setFlushProjection(a),o.set(d),s.set(i.subarray(12,16)),m(o,s),n.clearDepth(0),n.clear(n.DEPTH_BUFFER_BIT),n.clearDepth(1),c.extension.clipControlEXT(c.extension.LOWER_LEFT_EXT,c.extension.ZERO_TO_ONE_EXT),n.depthFunc(n.GREATER),c.active=!0}function _(){e.shaderFeatures&&(e.cameraRelativeMainProgram||(mt(e),e.rebuildMainProgram()))}function y(){let t=e.benchmark?null:n.getExtension?.(`EXT_clip_control`);return t?(c={extension:t,active:!1},u=!0,e.reversedDepth=!0,e.rasterProjection=i,e.rasterViewProjection=a,e.capabilities&&(e.capabilities.reversedDepth=!0),e.applyEnvironmentUniforms=function(e,t){r.applyEnvironmentUniforms.call(this,e,t),l&&!c.active&&t===void 0&&g()},e.applyDepthRank=function(e){r.applyDepthRank.call(this,e,c.active?1:-1)},e.resolveFrame=function(...e){return p(),r.resolveFrame.apply(this,e)},e.allocateFrameTargets=function(e,t){r.allocateFrameTargets.call(this,e,t),pt(this)},e.postStages.unshift(ft()),pt(e),_(),!0):(e.reversedDepth=!1,!1)}return e.render=function(e){let t=d;d=e.eye,l=!0;try{return r.render.call(this,e)}finally{l=!1,d=t,p(),h()}},y(),e}var gt=Object.freeze({depthOfField:Object.freeze({blur:0,focusDistance:5}),motionBlur:Object.freeze({shutter:0})});Object.freeze({neutral:Object.freeze({depthOfField:gt.depthOfField,motionBlur:gt.motionBlur,saturation:1,contrast:1,temperature:0,vignette:0,grain:0,ambientOcclusion:0,ambientOcclusionRadius:.5,bloom:Object.freeze({strength:0,threshold:1,radius:1})}),cinematic:Object.freeze({depthOfField:gt.depthOfField,motionBlur:gt.motionBlur,saturation:.88,contrast:1.08,temperature:.08,vignette:.16,grain:.012,ambientOcclusion:0,ambientOcclusionRadius:.5,bloom:Object.freeze({strength:.25,threshold:1,radius:1.5})}),vivid:Object.freeze({depthOfField:gt.depthOfField,motionBlur:gt.motionBlur,saturation:1.15,contrast:1.03,temperature:0,vignette:.06,grain:0,ambientOcclusion:0,ambientOcclusionRadius:.5,bloom:Object.freeze({strength:.3,threshold:.9,radius:1.2})})});function F(e,t,n,r,i){let a=e??t;if(!Number.isFinite(a)||a<n||a>r)throw Error(`${i} must be between ${n} and ${r}.`);return a}function _t(e={}){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Effects must be an object.`);let t=e.bloom??{};if(!t||typeof t!=`object`||Array.isArray(t))throw Error(`Bloom must be an object.`);let n=e.depthOfField??{},r=e.motionBlur??{};if(typeof n!=`object`||Array.isArray(n))throw Error(`Depth of field must be an object.`);if(typeof r!=`object`||Array.isArray(r))throw Error(`Motion blur must be an object.`);return{depthOfField:{blur:F(n.blur,0,0,1,`Depth of field blur`),focusDistance:F(n.focusDistance,5,.01,1e5,`Depth of field focus distance`)},motionBlur:{shutter:F(r.shutter,0,0,.5,`Motion blur shutter`),...r.objects>0?{objects:F(r.objects,0,0,1,`Motion blur objects`)}:{}},saturation:F(e.saturation,1,0,2,`Saturation`),contrast:F(e.contrast,1,.1,2,`Contrast`),temperature:F(e.temperature,0,-1,1,`Temperature`),vignette:F(e.vignette,0,0,1,`Vignette`),grain:F(e.grain,0,0,.1,`Grain`),ambientOcclusion:F(e.ambientOcclusion,0,0,1,`Ambient occlusion`),ambientOcclusionRadius:F(e.ambientOcclusionRadius,.5,.01,100,`Ambient occlusion radius`),bloom:{strength:F(t.strength,0,0,2,`Bloom strength`),threshold:F(t.threshold,1,0,10,`Bloom threshold`),radius:F(t.radius,1,.1,4,`Bloom radius`)}}}var vt=Math.PI/2-.01,yt=1e-4;function I(e,t,n,r){if(typeof e!=`number`||!Number.isFinite(e)||e<t||e>n)throw RangeError(`${r} must be between ${t} and ${n}`);return e}function bt(e,t,n,r){if(e?.length!==3)throw TypeError(`${r} must have three components`);for(let i=0;i<3;i++)I(e[i],t,n,r);return e}function xt(e,t,n){let r=e[t]??[];if(!Array.isArray(r)||r.length>n)throw RangeError(`${t} must be an array of at most ${n} lights`);return r}function St(e,t){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`${t} must be an object`);return e}function Ct(e,t){let n=e.range??0;if(I(n,0,1e6,`${t} range`),n!==0&&n<.001)throw RangeError(`${t} range must be zero or at least 0.001`)}function wt(e,t){if(e.castShadow!==void 0&&typeof e.castShadow!=`boolean`)throw TypeError(`${t} castShadow must be true or false`)}function Tt(e,t){bt(e,-1e6,1e6,t);let n=Math.hypot(e[0],e[1],e[2]);if(n<1e-6)throw RangeError(`${t} must not be zero length`);return[e[0]/n,e[1]/n,e[2]/n]}function Et(e){St(e,`Point light`),bt(e.position,-1e6,1e6,`Point light position`),bt(e.color??[1,1,1],0,1,`Point light color`),I(e.intensity??1,0,1e5,`Point light intensity`),I(e.radius??.05,.001,1e6,`Point light radius`),Ct(e,`Point light`),wt(e,`Point light`)}function Dt(e){St(e,`Spot light`),bt(e.position,-1e6,1e6,`Spot light position`),Tt(e.direction,`Spot light direction`),bt(e.color??[1,1,1],0,1,`Spot light color`),I(e.intensity??1,0,1e5,`Spot light intensity`),I(e.radius??.05,.001,1e6,`Spot light radius`),I(e.angle??Math.PI/4,.01,vt,`Spot light angle`),I(e.penumbra??.15,0,1,`Spot light penumbra`),Ct(e,`Spot light`),wt(e,`Spot light`)}function Ot(e){St(e,`Area light`),bt(e.position,-1e6,1e6,`Area light position`);let t=Tt(e.direction,`Area light direction`),n=Tt(e.up??[0,1,0],`Area light up`);if(Math.abs(t[0]*n[0]+t[1]*n[1]+t[2]*n[2])>.999&&e.up!==void 0)throw RangeError(`Area light up must not be parallel to its direction`);bt(e.color??[1,1,1],0,1,`Area light color`),I(e.intensity??1,0,1e5,`Area light intensity`),I(e.width,.001,1e4,`Area light width`),I(e.height,.001,1e4,`Area light height`)}function kt(e,t){let n=0;for(let t of e)t.castShadow&&(n+=6);for(let e of t)e.castShadow&&(n+=1);if(n>24)throw RangeError(`Shadow casting lights need ${n} atlas tiles, and the atlas holds 24 (a point light uses 6, a spot light one)`);return n}function At(){return{positions:new Float32Array(64),colors:new Float32Array(64),radii:new Float32Array(16),pointShadows:new Float32Array(16),spotPositions:new Float32Array(32),spotColors:new Float32Array(32),spotDirections:new Float32Array(32),spotParameters:new Float32Array(32),areaPositions:new Float32Array(28),areaColors:new Float32Array(28),areaNormals:new Float32Array(28),areaTangents:new Float32Array(28),shadowCasters:[],keyColor:new Float32Array(3),pointCount:0,spotCount:0,areaCount:0,fillIntensity:1,ambientIntensity:1,specularAntiAliasing:1}}function jt(e,t){e.positions.fill(0),e.colors.fill(0),e.radii.fill(0),e.pointShadows.fill(-1);for(let n=0;n<t.length;n++){let r=t[n];if(e.positions.set(r.position,n*4),e.positions[n*4+3]=r.range??0,e.colors.set(r.color??[1,1,1],n*4),e.colors[n*4+3]=r.intensity??1,e.radii[n]=r.radius??.05,r.castShadow){e.pointShadows[n]=e.shadowCasters.length;for(let t=0;t<6;t++)e.shadowCasters.push({light:r,face:t})}}}function Mt(e,t){e.spotPositions.fill(0),e.spotColors.fill(0),e.spotDirections.fill(0),e.spotParameters.fill(0);for(let n=0;n<t.length;n++){let r=t[n],i=r.angle??Math.PI/4,a=Math.cos(i),o=a+Math.max((1-a)*(r.penumbra??.15),yt);e.spotPositions.set(r.position,n*4),e.spotPositions[n*4+3]=r.range??0,e.spotColors.set(r.color??[1,1,1],n*4),e.spotColors[n*4+3]=r.intensity??1,e.spotDirections.set(Tt(r.direction,`Spot light direction`),n*4),e.spotDirections[n*4+3]=a,e.spotParameters[n*4]=r.radius??.05,e.spotParameters[n*4+1]=o,e.spotParameters[n*4+2]=-1,r.castShadow&&(e.spotParameters[n*4+2]=e.shadowCasters.length,e.shadowCasters.push({light:r,face:-1}))}}function Nt(e,t){e.areaPositions.fill(0),e.areaColors.fill(0),e.areaNormals.fill(0),e.areaTangents.fill(0);for(let n=0;n<t.length;n++){let r=t[n],i=Tt(r.direction,`Area light direction`),a=Tt(r.up??[0,1,0],`Area light up`),o=[a[1]*i[2]-a[2]*i[1],a[2]*i[0]-a[0]*i[2],a[0]*i[1]-a[1]*i[0]],s=Math.hypot(...o);s<.001&&(o=[1,0,0],s=1),e.areaPositions.set(r.position,n*4),e.areaColors.set(r.color??[1,1,1],n*4),e.areaColors[n*4+3]=r.intensity??1,e.areaNormals.set(i,n*4),e.areaNormals[n*4+3]=r.width,e.areaTangents.set(o.map(e=>e/s),n*4),e.areaTangents[n*4+3]=r.height}}function Pt(e,t,{world:n=!1}={}){let i=xt(t,`pointLights`,16),a=xt(t,`spotLights`,8),o=xt(t,`areaLights`,7),s=I(t.keyIntensity??1,0,100,`Key intensity`),c=I(t.fillIntensity??1,0,100,`Fill intensity`),l=I(t.ambientIntensity??1,0,100,`Ambient intensity`),u=I(t.daylight??1,0,100,`Daylight`),d=I(t.specularAntiAliasing??1,0,4,`Specular anti-aliasing`),f=t.keyColor??(n?[3.7*u,3.4*u,2.9*u]:[5.2,4.7,4.1]);bt(f,0,1e3,`Key color`),i.forEach(Et),a.forEach(Dt),o.forEach(Ot),kt(i,a),e.shadowCasters=[],jt(e,i),Mt(e,a),Nt(e,o),r.update?.(e,a,o);for(let t=0;t<3;t++)e.keyColor[t]=f[t]*s;return e.pointCount=i.length,e.spotCount=a.length,e.areaCount=o.length,e.fillIntensity=c,e.ambientIntensity=l,e.specularAntiAliasing=d,e}var Ft=Object.freeze({threshold:Object.freeze([0,1]),softness:Object.freeze([.001,.5]),levels:2047});Object.freeze({threshold:.5,softness:.25}),Object.freeze({color:Object.freeze([.56,.57,.58]),metallic:1,roughness:.3}),Object.freeze({color:Object.freeze([.05,.04,.03]),roughness:.9}),Ft.levels+1;function It(e){let t=e.dirt;return{metal:[...e.metal.color,e.metal.metallic],dirt:t?[...t.color,t.roughness]:[0,0,0,0],shape:[e.metal.roughness,e.threshold,e.softness,+!!t],dirtShape:t?[t.threshold,t.softness]:[.5,.25]}}var Lt=[-3,6,4],Rt={world:{distance:75,target:[0,2,-10],extent:65,near:1,far:220},studio:{distance:7.2,target:[0,1,0],extent:3.5,near:.1,far:15}};function zt(e,t,n={}){let{distance:r,...i}=Rt[e?`world`:`studio`],a=n.target??i.target,o=t??Lt,s=Math.hypot(o[0],o[1],o[2])>1e-6?o:Lt,c=Math.hypot(s[0],s[1],s[2]),l=a.map((e,t)=>e+s[t]/c*r);return{...i,eye:l,...n,target:a}}var Bt=3.5;function Vt(e,t){return e.extent*2/t*Bt/(e.far-e.near)}var Ht=new WeakMap;function Ut(e){return Ht.get(e)??null}function Wt(e){return e.depthLayer??+!!e.decal}var Gt=Object.freeze([-100,0,-100]),Kt=Object.freeze([100,20,100]),qt=Object.freeze([.8,.85,.9]),Jt=Object.freeze([.03,.035,.04]),Yt=Object.freeze([.03,0,0]);function L(e,t,n,r){if(typeof e!=`number`||!Number.isFinite(e)||e<t||e>n)throw RangeError(`${r} must be between ${t} and ${n}`);return e}function Xt(e,t,n,r){if(e?.length!==3)throw TypeError(`${r} requires three components`);for(let i=0;i<3;i++)L(e[i],t,n,r);return e}var Zt=2048,Qt=Object.freeze([`exponential`,`smoothstep`]);function $t(e){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Fog field must be an object with width, height and data`);for(let t of[`width`,`height`]){let n=e[t];if(!Number.isInteger(n)||n<1||n>2048)throw RangeError(`Fog field ${t} must be an integer between 1 and ${Zt}`)}if(!(e.data instanceof Float32Array))throw TypeError(`Fog field data must be a Float32Array of RGBA values`);if(e.data.length!==e.width*e.height*4)throw RangeError(`Fog field data must hold width * height * 4 = ${e.width*e.height*4} values, got ${e.data.length}`);for(let t=0;t<e.data.length;t++)if(!Number.isFinite(e.data[t]))throw RangeError(`Fog field data must be finite; index ${t} is not`);return e}function en(e={}){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`volumeFog must be an object`);let t=L(e.density??0,0,10,`Volume density`),n=Xt(e.minimum??Gt,-1e5,1e5,`Volume minimum`),r=Xt(e.maximum??Kt,-1e5,1e5,`Volume maximum`);for(let e=0;e<3;e++)if(Math.fround(r[e])<=Math.fround(n[e]))throw RangeError(`Volume bounds must remain ordered after Float32 rounding`);let i=Xt(e.color??qt,0,1,`Volume color`),a=Xt(e.ambient??Jt,0,10,`Volume ambient`),o=Xt(e.drift??Yt,-100,100,`Volume drift`),s=L(e.steps??16,8,48,`Volume steps`);if(!Number.isInteger(s))throw RangeError(`Volume steps must be an integer`);let c=L(e.anisotropy??.3,-.9,.9,`Volume anisotropy`),l=L(e.noiseAmount??.5,0,1,`Volume noise amount`),u=L(e.noiseScale??.3,.001,100,`Volume noise scale`),d=L(e.maxDistance??100,.01,1e4,`Volume maximum distance`),f=L(e.heightFalloff??0,0,1e5,`Volume height falloff`),p={...e,density:t,minimum:n,maximum:r,color:i,ambient:a,drift:o,steps:s,anisotropy:c,noiseAmount:l,noiseScale:u,maxDistance:d,heightFalloff:f};if(e.shadowAmbient!==void 0&&(p.shadowAmbient=L(e.shadowAmbient,0,1,`Volume shadow ambient`)),e.field!==void 0&&(p.field=$t(e.field)),e.flowStrength!==void 0&&(p.flowStrength=L(e.flowStrength,0,100,`Volume flow strength`)),e.flowPeriod!==void 0&&(p.flowPeriod=L(e.flowPeriod,.01,1e3,`Volume flow period`)),e.profile!==void 0){if(!Qt.includes(e.profile))throw RangeError(`Volume profile must be one of ${Qt.join(`, `)}`);p.profile=e.profile}return p}var tn=`
vec3 directionFromEquirectangular(vec2 coordinates) {
  float azimuth = (coordinates.x - 0.5) * 6.28318530718;
  float polar = coordinates.y * 3.14159265359;
  return vec3(sin(polar) * sin(azimuth), cos(polar), -sin(polar) * cos(azimuth));
}
vec2 equirectangularFromDirection(vec3 direction) {
  return vec2(atan(direction.x, -direction.z) * 0.15915494309 + 0.5, acos(clamp(direction.y, -1.0, 1.0)) * 0.31830988618);
}
`,nn=`
uniform sampler2D environmentSpecular;
uniform vec2 environmentRotation;
uniform float environmentIntensity;
uniform float environmentLevelMax;
${tn}
vec3 environmentDirection(vec3 direction) {
  return vec3(environmentRotation.x * direction.x - environmentRotation.y * direction.z, direction.y, environmentRotation.y * direction.x + environmentRotation.x * direction.z);
}
vec3 environmentRadiance(vec3 direction, float level) {
  return textureLod(environmentSpecular, equirectangularFromDirection(environmentDirection(direction)), level).rgb * environmentIntensity;
}
`,rn=`
uniform sampler2D environmentBrdf;
uniform float environmentEnabled;
uniform vec3 environmentIrradiance[9];
vec3 environmentDiffuse(vec3 normal) {
  vec3 mapped = environmentDirection(normal);
  if (LIGHT_SHADING) {
    vec3 firstOrder = environmentIrradiance[0] + environmentIrradiance[1] * mapped.y + environmentIrradiance[2] * mapped.z + environmentIrradiance[3] * mapped.x;
    return max(firstOrder, vec3(0.0)) * environmentIntensity;
  }
  vec3 result = environmentIrradiance[0]
    + environmentIrradiance[1] * mapped.y
    + environmentIrradiance[2] * mapped.z
    + environmentIrradiance[3] * mapped.x
    + environmentIrradiance[4] * (mapped.x * mapped.y)
    + environmentIrradiance[5] * (mapped.y * mapped.z)
    + environmentIrradiance[6] * (3.0 * mapped.z * mapped.z - 1.0)
    + environmentIrradiance[7] * (mapped.x * mapped.z)
    + environmentIrradiance[8] * (mapped.x * mapped.x - mapped.y * mapped.y);
  return max(result, vec3(0.0)) * environmentIntensity;
}
vec3 multipleScatterGain(vec2 lookup, vec3 baseReflectance) {
  float missingEnergy = 1.0 - (lookup.x + lookup.y);
  vec3 averageFresnel = baseReflectance + (1.0 - baseReflectance) / 21.0;
  return 1.0 / (1.0 - missingEnergy * averageFresnel);
}
vec2 environmentBrdfFit(float normalView, float roughness) {
  vec4 terms = roughness * vec4(-1.0, -0.0275, -0.572, 0.022) + vec4(1.0, 0.0425, 1.04, -0.04);
  float edge = min(terms.x * terms.x, exp2(-9.28 * normalView)) * terms.x + terms.y;
  return vec2(-1.04, 1.04) * edge + terms.zw;
}
vec3 environmentLighting(vec3 normal, vec3 specularNormal, vec3 baseReflectance, vec3 viewDirection, vec3 reflected, vec3 color, float metallic, float roughness, float occlusion, float ambient, float specularWeight) {
  if (LIGHT_SHADING) {
    vec2 fitted = environmentBrdfFit(clamp(dot(normal, viewDirection), 0.001, 1.0), roughness);
    vec3 fittedColor = (baseReflectance * fitted.x + fitted.y) * specularWeight;
    vec3 irradiance = environmentDiffuse(normal);
    return irradiance * (fittedColor + color * (1.0 - metallic) * (1.0 - fittedColor)) * occlusion * ambient;
  }
  float normalView = clamp(dot(normal, viewDirection), 0.001, 1.0);
  vec2 lookup = texture(environmentBrdf, vec2(normalView, roughness)).rg;
  vec3 singleScatter = baseReflectance * lookup.x + lookup.y;
  vec3 specularColor = singleScatter * multipleScatterGain(lookup, baseReflectance) * specularWeight;
  vec3 specular = environmentRadiance(reflected, roughness * environmentLevelMax) * specularColor;
  vec3 diffuse = environmentDiffuse(normal) * color * (1.0 - metallic) * (1.0 - specularColor);
  return (specular + diffuse) * occlusion * ambient;
}

`,an={};function on(e){Object.assign(an,e)}function R(){if(!an.createResources)throw Error(`An environment map needs its code: add import '@codepawlhq/67js/addons/hdri' or import createEnvironmentMap from the package entry.`);return an}var sn=Object.freeze([0,1]),cn=Object.freeze({clearcoat:0,clearcoatRoughness:0,transmission:0,thickness:0,ior:1.5,attenuationColor:Object.freeze([1,1,1]),attenuationDistance:1/0,sheenColor:Object.freeze([0,0,0]),sheenRoughness:0,specular:1,specularColor:Object.freeze([1,1,1]),anisotropy:0,anisotropyRotation:0,iridescence:0,iridescenceIor:1.3,iridescenceThickness:400,toon:0});Object.freeze(Object.keys(cn));var ln=Object.freeze({clearcoat:sn,clearcoatRoughness:sn,transmission:sn,thickness:Object.freeze([0,1e3]),ior:Object.freeze([1,2.5]),sheenRoughness:sn,specular:Object.freeze([0,4]),anisotropy:sn,anisotropyRotation:Object.freeze([-2*Math.PI,2*Math.PI]),iridescence:sn,iridescenceIor:Object.freeze([1,3]),iridescenceThickness:Object.freeze([0,1200]),toon:Object.freeze([0,8])}),un=Object.freeze({attenuationColor:sn,sheenColor:sn,specularColor:Object.freeze([0,4])});function dn([e,t]){return`between ${e} and ${t}`}function fn(e,t){let[n,r]=ln[e];if(typeof t!=`number`||!Number.isFinite(t)||t<n||t>r)throw RangeError(`${e} must be ${dn(ln[e])}, got ${t}. Use a number inside that range.`)}function pn(e,t){let[n,r]=un[e];if(!(Array.isArray(t)&&t.length===3&&t.every(e=>typeof e==`number`&&Number.isFinite(e)&&e>=n&&e<=r)))throw RangeError(`${e} must be three linear RGB numbers ${dn(un[e])}. Pass [red, green, blue].`)}function mn(e){if(!(typeof e==`number`&&e>0&&Number.isFinite(e)))throw RangeError(`attenuationDistance must be a finite number above 0 (metres), got ${e}. Leave it out for no absorption.`)}function hn(e){for(let t of Object.keys(ln))e[t]!==void 0&&fn(t,e[t]);for(let t of Object.keys(un))e[t]!==void 0&&pn(t,e[t]);if(e.attenuationDistance!==void 0&&e.attenuationDistance!==1/0&&mn(e.attenuationDistance),e.transmission>0&&e.tag!==void 0&&e.tag!==`surface`&&e.tag!==`gltf`&&e.tag!==`liquid`)throw RangeError(`transmission needs a standard PBR material tag, got ${e.tag}. Use the surface tag.`)}function z(e,t){return e[t]??cn[t]}function gn(e){let t=z(e,`ior`),n=((t-1)/(t+1))**2,r=z(e,`specular`);return z(e,`specularColor`).map(e=>Math.min(n*e,1)*r)}function _n(e){return hn(e),[...gn(e),z(e,`clearcoat`),z(e,`clearcoatRoughness`),...z(e,`sheenColor`),z(e,`sheenRoughness`),z(e,`transmission`),z(e,`ior`),z(e,`thickness`),z(e,`attenuationDistance`),...z(e,`attenuationColor`),z(e,`anisotropy`),z(e,`anisotropyRotation`),z(e,`iridescence`),z(e,`iridescenceIor`),z(e,`iridescenceThickness`),e.lightMask??-1,z(e,`toon`),e.subsurface?JSON.stringify(e.subsurface):``]}function vn(e,t,n,r){return`#version 300 es
${e}
precision highp float;
in vec2 textureCoordinate;
uniform sampler2D frameTexture;
uniform float transparent;
uniform sampler2D bloomTexture;
uniform float bloomStrength;
uniform float hdrEnabled;
uniform vec3 grade;
uniform float vignette;
uniform float grainAmount;
uniform vec2 resolution;
uniform float monochrome;
uniform float fade;
uniform float cinematic;
uniform float time;
uniform float volumeExplosion;
uniform float explosionProgress;
uniform mat4 inverseViewProjection;
uniform vec3 eye;
uniform sampler2D sceneDepth;
${n}
uniform sampler2D occlusionTexture;
uniform float occlusionStrength;
uniform vec2 occlusionTexel;
out vec4 outputColor;
float luminance(vec3 color) { return dot(color, vec3(0.299, 0.587, 0.114)); }
float hash(vec3 position) { return fract(sin(dot(position, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float cloudNoise(vec3 position) {
  vec3 cell = floor(position);
  vec3 fraction = fract(position);
  fraction = fraction * fraction * (3.0 - 2.0 * fraction);
  float lower = mix(mix(hash(cell), hash(cell + vec3(1,0,0)), fraction.x), mix(hash(cell + vec3(0,1,0)), hash(cell + vec3(1,1,0)), fraction.x), fraction.y);
  float upper = mix(mix(hash(cell + vec3(0,0,1)), hash(cell + vec3(1,0,1)), fraction.x), mix(hash(cell + vec3(0,1,1)), hash(cell + vec3(1,1,1)), fraction.x), fraction.y);
  return mix(lower, upper, fraction.z);
}
${t}
${r}
void main() {
  vec2 texel = 1.0 / resolution;
  vec3 center = texture(frameTexture, textureCoordinate).rgb;
  vec3 northwest = texture(frameTexture, textureCoordinate + vec2(-1.0, -1.0) * texel).rgb;
  vec3 northeast = texture(frameTexture, textureCoordinate + vec2(1.0, -1.0) * texel).rgb;
  vec3 southwest = texture(frameTexture, textureCoordinate + vec2(-1.0, 1.0) * texel).rgb;
  vec3 southeast = texture(frameTexture, textureCoordinate + vec2(1.0, 1.0) * texel).rgb;
  float centerLuma = luminance(center);
  float northwestLuma = luminance(northwest);
  float northeastLuma = luminance(northeast);
  float southwestLuma = luminance(southwest);
  float southeastLuma = luminance(southeast);
  float minimumLuma = min(centerLuma, min(min(northwestLuma, northeastLuma), min(southwestLuma, southeastLuma)));
  float maximumLuma = max(centerLuma, max(max(northwestLuma, northeastLuma), max(southwestLuma, southeastLuma)));
  vec2 direction = vec2(-((northwestLuma + northeastLuma) - (southwestLuma + southeastLuma)), (northwestLuma + southwestLuma) - (northeastLuma + southeastLuma));
  float reduction = max((northwestLuma + northeastLuma + southwestLuma + southeastLuma) * 0.03125, 0.0078125);
  direction = clamp(direction / (min(abs(direction.x), abs(direction.y)) + reduction), vec2(-6.0), vec2(6.0)) * texel;
  vec3 first = 0.5 * (texture(frameTexture, textureCoordinate + direction * (-1.0 / 6.0)).rgb + texture(frameTexture, textureCoordinate + direction * (1.0 / 6.0)).rgb);
  vec3 second = first * 0.5 + 0.25 * (texture(frameTexture, textureCoordinate - direction * 0.5).rgb + texture(frameTexture, textureCoordinate + direction * 0.5).rgb);
  float secondLuma = luminance(second);
  vec3 color = secondLuma < minimumLuma || secondLuma > maximumLuma ? first : second;
  if (maximumLuma - minimumLuma < max(0.03, maximumLuma * 0.125)) color = center;
  float coverage = POST_TRANSPARENT ? texture(frameTexture, textureCoordinate).a : 1.0;
  if (POST_TRANSPARENT) color = center / max(coverage, 0.00001);
  if (POST_OCCLUSION) {
    float visibility = 0.0;
    for (int row = -1; row <= 1; row++) {
      for (int column = -1; column <= 1; column++) {
        visibility += texture(occlusionTexture, textureCoordinate + vec2(float(column), float(row)) * occlusionTexel).r;
      }
    }
    float directShare = 1.0 / (1.0 + 0.4 * luminance(color));
    color *= mix(1.0, visibility / 9.0, occlusionStrength * directShare);
  }
  if (POST_BLOOM) color += texture(bloomTexture, textureCoordinate).rgb * bloomStrength;
  if (POST_LOCAL) color = localVolumes(color);
  if (POST_VOLUME) color = volumeFog(color);
  if (hdrEnabled > 0.5) {
    color = clamp((color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14), 0.0, 1.0);
    color = pow(color, vec3(1.0 / 2.2));
  }
  if (POST_EXPLOSION) color = explosion(color);
  if (POST_FINISH) {
  color = mix(color, vec3(luminance(color)), monochrome);
  if (grade.x != 1.0) color = mix(vec3(luminance(color)), color, grade.x);
  if (grade.y != 1.0) color = (color - 0.5) * grade.y + 0.5;
  if (grade.z != 0.0) color *= vec3(1.0 + grade.z * 0.1, 1.0, 1.0 - grade.z * 0.1);
  vec2 centered = textureCoordinate * 2.0 - 1.0;
  color *= max(0.0, 1.0 - (cinematic * 0.20 + vignette) * dot(centered, centered));
  float grain = fract(sin(dot(gl_FragCoord.xy + floor(time * 24.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  color += grain * (0.018 * cinematic + grainAmount);
  }
  float alpha = POST_TRANSPARENT ? coverage : 1.0;
  outputColor = vec4(color * (1.0 - fade) * alpha, alpha);
}`}var yn=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
uniform vec3 skyTop;
uniform vec3 skyBottom;
uniform vec3 sunDirection;
uniform mat4 inverseViewProjection;
uniform vec3 eye;
uniform float time;
uniform float daylight;
uniform float hdrEnabled;
out vec4 outputColor;
float noise(vec2 position) {
  return sin(position.x * 2.1 + sin(position.y * 1.3)) * 0.5 + sin(position.y * 2.8 - position.x * 0.8) * 0.3;
}
void main() {
  vec4 world = inverseViewProjection * vec4(textureCoordinate * 2.0 - 1.0, 1.0, 1.0);
  vec3 direction = normalize(world.xyz / world.w - eye);
  float height = clamp(direction.y * 1.3 + 0.12, 0.0, 1.0);
  vec3 color = mix(skyBottom, skyTop, pow(height, 0.6));
  float sun = max(dot(direction, normalize(sunDirection)), 0.0);
  color += vec3(1.0, 0.72, 0.35) * pow(sun, 300.0) * 0.7 * daylight;
  color += vec3(0.30, 0.22, 0.12) * pow(sun, 8.0) * daylight;
  vec2 cloudPosition = direction.xz / max(0.08, direction.y) * 0.5 + vec2(time * 0.006, 0.0);
  float cloud = smoothstep(0.1, 0.55, noise(cloudPosition) + noise(cloudPosition * 2.4) * 0.25);
  cloud *= smoothstep(0.02, 0.22, direction.y) * (1.0 - smoothstep(0.5, 0.95, direction.y));
  color = mix(color, mix(skyBottom, vec3(0.94, 0.93, 0.85), 0.7), cloud * 0.28 * daylight);
  outputColor = vec4(hdrEnabled > 0.5 ? pow(max(color, vec3(0)), vec3(2.2)) : color, 1.0);
}`,bn=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
uniform sampler2D sourceTexture;
uniform vec2 texelDirection;
uniform float threshold;
uniform float extract;
out vec4 outputColor;
vec3 sampleBloom(vec2 coordinate) {
  vec3 color = texture(sourceTexture, coordinate).rgb;
  if (extract > 0.5) {
    float peak = max(color.r, max(color.g, color.b));
    color *= max(peak - threshold, 0.0) / max(peak, 0.00001);
  }
  return color;
}
void main() {
  vec3 color = sampleBloom(textureCoordinate) * 0.227027;
  color += sampleBloom(textureCoordinate + texelDirection * 1.384615) * 0.316216;
  color += sampleBloom(textureCoordinate - texelDirection * 1.384615) * 0.316216;
  color += sampleBloom(textureCoordinate + texelDirection * 3.230769) * 0.070270;
  color += sampleBloom(textureCoordinate - texelDirection * 3.230769) * 0.070270;
  outputColor = vec4(color, 1.0);
}`,xn={transparent:[`POST_TRANSPARENT`,`transparent > 0.5`],occlusion:[`POST_OCCLUSION`,`occlusionStrength > 0.0`],bloom:[`POST_BLOOM`,`bloomStrength > 0.0`],volume:[`POST_VOLUME`,`volumeDensity > 0.0`],sky:[`POST_SKY`,`true`],field:[`POST_FIELD`,`true`],detail:[`POST_DETAIL`,`true`],lights:[`POST_LIGHTS`,`volumeLightCount > 0`],local:[`POST_LOCAL`,`localVolumeCount > 0`],explosion:[`POST_EXPLOSION`,`volumeExplosion > 0.5`],finish:[`POST_FINISH`,`true`]},Sn=Object.freeze([`volume`,`sky`,`field`,`detail`,`lights`,`local`,`explosion`]),Cn=Object.freeze(Object.keys(xn).filter(e=>!Sn.includes(e))),wn=`vec3 explosion(vec3 background) { return background; }`,Tn=`vec3 volumeFog(vec3 background) { return background; }`,En=`vec3 localVolumes(vec3 background) { return background; }`;function Dn(t){if(!t.has(`explosion`))return wn;let n=e.get(`explosion`);if(!n)throw Error(`The explosion step needs its shader code: add import './explosion-shader.js' (the film player does).`);return n.post}function On(e){let t=``,n=``;if(e.has(`volume`)){let e=d(`volumeFog`);t+=e.postDeclarations,n+=e.postFunctions}else n+=Tn;if(e.has(`local`)){let e=d(`volumeFog`);t+=e.localDeclarations,n+=e.localFunctions}else n+=En;return{declarations:t,functions:n}}function kn(e=Cn){let t=new Set(e),n=Object.entries(xn).map(([e,[n,r]])=>`#define ${n} ${t.has(e)?`(${r})`:`false`}`).join(`
`),r=On(t);return vn(n,Dn(t),r.declarations,r.functions)}var An=kn(),jn=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
uniform sampler2D sceneDepth;
uniform mat4 inverseViewProjection;
uniform float radius;
uniform float projectionScale;
uniform float aspect;
uniform float orthographic;
out vec4 occlusion;

vec3 worldPosition(vec2 uv, float depth) {
  vec4 point = inverseViewProjection * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  return point.xyz / point.w;
}

float interleavedNoise(vec2 pixel) {
  return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
}

void main() {
  float depth = texture(sceneDepth, textureCoordinate).r;
  if (depth >= 1.0) {
    occlusion = vec4(1.0);
    return;
  }
  vec3 position = worldPosition(textureCoordinate, depth);
  vec3 normal = normalize(cross(dFdx(position), dFdy(position)));
  if (orthographic < 0.5 && dot(normal, position) > 0.0) normal = -normal;
  float screenRadius = min(radius * projectionScale / (orthographic > 0.5 ? 1.0 : length(position)), 0.25);
  float rotation = interleavedNoise(gl_FragCoord.xy) * 6.2831853;
  float total = 0.0;
  for (int index = 0; index < 12; index++) {
    float fraction = (float(index) + 0.5) / float(12);
    float angle = rotation + float(index) * 2.3999632;
    vec2 offset = vec2(cos(angle), sin(angle)) * sqrt(fraction) * screenRadius;
    vec2 sampleUv = textureCoordinate + vec2(offset.x / aspect, offset.y);
    float sampleDepth = texture(sceneDepth, sampleUv).r;
    if (sampleDepth >= 1.0) continue;
    vec3 toSample = worldPosition(sampleUv, sampleDepth) - position;
    float sampleDistance = length(toSample);
    float falloff = 1.0 - clamp(sampleDistance / (radius * 1.5), 0.0, 1.0);
    total += max(dot(normal, toSample) / max(sampleDistance, 0.0001) - 0.15, 0.0) * falloff;
  }
  float visibility = clamp(1.0 - 2.5 * total / float(12), 0.0, 1.0);
  occlusion = vec4(vec3(visibility), 1.0);
}`,Mn=6,Nn=1e-6,Pn=new WeakMap;function Fn(e){let t=Pn.get(e);if(t)return t;let n=e.positions,r=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let e=0;e<n.length;e+=3)for(let t=0;t<3;t++)r[t]=Math.min(r[t],n[e+t]),i[t]=Math.max(i[t],n[e+t]);let a=r.map((e,t)=>(e+i[t])/2),o=0;for(let e=0;e<n.length;e+=3){let t=n[e]-a[0],r=n[e+1]-a[1],i=n[e+2]-a[2];o=Math.max(o,t*t+r*r+i*i)}let s=Object.freeze({center:Object.freeze(a),radius:Math.sqrt(o),minimum:r,maximum:i});return Pn.set(e,s),s}function In(e,t){for(let n=0;n<Mn;n++){let r=n>>1,i=n%2==0?1:-1;for(let a=0;a<4;a++)t[n*4+a]=e[a*4+3]+i*e[a*4+r];let a=Math.hypot(t[n*4],t[n*4+1],t[n*4+2]);for(let e=0;e<4;e++)t[n*4+e]/=a||1}return t}function Ln(e,t){let n=e[t]**2+e[t+1]**2+e[t+2]**2,r=e[t+4]**2+e[t+5]**2+e[t+6]**2,i=e[t+8]**2+e[t+9]**2+e[t+10]**2;return Math.sqrt(Math.max(n,r,i))}function Rn(e,t,n,r,i){for(let a=0;a<Mn;a++){let o=a*4;if(e[o]*t+e[o+1]*n+e[o+2]*r+e[o+3]<-i)return!0}return!1}function zn(e,t,n,r){let i=0;for(let a=1;a<e.length&&!(e[a]*t*n>r);a++)i=a;return i}var Bn=class{constructor(e,t){this.indices=Array.from({length:t},()=>new Uint32Array(e)),this.counts=new Uint32Array(t),this.visibleCount=0}get isEverything(){return this.visibleCount===this.indices[0].length&&this.counts[0]===this.visibleCount}};function Vn(e,{instanceData:t,instanceCount:n,stride:r,bounds:i,margin:a=0,levelErrors:o,planes:s,viewProjection:c,pixelsPerUnit:l,pixelError:u=1,belowHeight:d=-1/0,minimumPixelRadius:f=0}){e.counts.fill(0),e.visibleCount=0;let p=o.length>1,[m,h,g]=i.center;for(let _=0;_<n;_++){let n=_*r,v=t[n]*m+t[n+4]*h+t[n+8]*g+t[n+12],y=t[n+1]*m+t[n+5]*h+t[n+9]*g+t[n+13],b=t[n+2]*m+t[n+6]*h+t[n+10]*g+t[n+14],x=Ln(t,n),S=i.radius*x+a;if(y+S<d||Rn(s,v,y,b,S))continue;let C=0;if(p||f>0){let e=c[3]*v+c[7]*y+c[11]*b+c[15];if(e>Nn&&S*l/e<f)continue;C=p&&e>Nn?zn(o,x,l/e,u):0}e.indices[C][e.counts[C]++]=_,e.visibleCount++}return e}var Hn=.1,Un=.05,Wn=.9,Gn=.01;function Kn(e){let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let r of e){if(r.skin||r.morph||r.crowd||!r.matrix)return null;let e=Fn(r.geometry);for(let i=0;i<8;i++){let a=i&1?e.maximum[0]:e.minimum[0],o=i&2?e.maximum[1]:e.minimum[1],s=i&4?e.maximum[2]:e.minimum[2],c=r.matrix;for(let e=0;e<3;e++){let r=c[e]*a+c[4+e]*o+c[8+e]*s+c[12+e];t[e]=Math.min(t[e],r),n[e]=Math.max(n[e],r)}}}if(!t.every(Number.isFinite)||!n.every(Number.isFinite))return null;let r=Math.max(...n.map((e,n)=>e-t[n]))*Un;return{minimum:t.map(e=>e-r),maximum:n.map(e=>e+r)}}function qn(e,t){let n=1/0;for(let r=0;r<8;r++){let i=r&1?e.maximum[0]:e.minimum[0],a=r&2?e.maximum[1]:e.minimum[1],o=r&4?e.maximum[2]:e.minimum[2];n=Math.min(n,-(t[2]*i+t[6]*a+t[10]*o+t[14]))}return n}function Jn(e,t,n){let r=qn(e,t);return r>.1/Wn?Math.min(r*Wn,n*Gn):Hn}var Yn=10,Xn=Object.freeze([]);function Zn(e,t,n,r){return{kind:e,severity:`warning`,target:t,message:n,fix:r}}function Qn(e,t){let n=e[0]*t[0]+e[1]*t[1]+e[2]*t[2],r=Math.hypot(...e)*Math.hypot(...t);return r>1e-6?Math.acos(Math.max(-1,Math.min(1,n/r)))*180/Math.PI:0}function $n(e,t,n){let r=zt(e,t,n),i=Qn(r.eye.map((e,t)=>e-r.target[t]),t);return i<Yn?null:Zn(`shadow-light-direction-mismatch`,`shadowBounds.eye`,`shadowBounds.eye is ${Math.round(i)} degrees off lightDirection; the eye sets the shadow direction.`,`Drop shadowBounds.eye, or point lightDirection from shadowBounds.target to it.`)}function er({world:e,depth:t,effects:n,lightDirection:r,shadowBounds:i,coplanarProblems:a=null,skinProblems:o=null}){let s=[];if(n.ambientOcclusion>0&&!t&&s.push(Zn(`ambient-occlusion-without-depth`,`effects.ambientOcclusion`,`ambientOcclusion is ${n.ambientOcclusion} but the renderer has no depth, so the pass is skipped.`,`Build the renderer with depth: true, or set ambientOcclusion to 0.`)),i?.eye&&r){let t=$n(e,r,i);t&&s.push(t)}return a?.length&&s.push(...a),o?.length&&s.push(...o),s.length?s:Xn}var tr={R8:1,RGBA8:4,RGBA16F:8,R11F_G11F_B10F:4,R11F_G11F_B10F:4,DEPTH_COMPONENT16:2,DEPTH_COMPONENT24:4,DEPTH_COMPONENT32F:4},nr=1048576,rr=class{targets=new Map;record(e,{width:t,height:n,format:r,samples:i=1,layers:a=1}){let o=t*n*a*i*tr[r];this.targets.set(e,{name:e,width:t,height:n,layers:a,format:r,samples:i,bytes:o,megabytes:Number((o/nr).toFixed(2))})}release(...e){for(let t of e)this.targets.delete(t)}report(){let e=[...this.targets.values()].sort((e,t)=>t.bytes-e.bytes),t=e.reduce((e,t)=>e+t.bytes,0);return{totalBytes:t,totalMegabytes:Number((t/nr).toFixed(2)),targets:e}}},ir=2048;ir/512;var ar=.05,or=30,sr=92*Math.PI/180,cr=4*Math.PI/180,lr=170*Math.PI/180,ur=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],dr=[[0,1,0],[0,1,0],[0,0,1],[0,0,-1],[0,1,0],[0,1,0]];function fr(e){return Math.abs(e[1])>.99?[1,0,0]:[0,1,0]}function pr({light:e,face:t},n){let r=e.range>0?e.range:or,i=t===-1,a=i?Math.min(2*(e.angle??Math.PI/4)+cr,lr):sr,o=i?e.direction:ur[t],s=i?fr(o):dr[t],c=[e.position[0]+o[0],e.position[1]+o[1],e.position[2]+o[2]],l=E(v(),e.position,c,s);return x(n,C(v(),a,1,ar,r),l),2*Math.tan(a/2)/512}function mr(e){let t=e%4,n=Math.floor(e/4);return[t*512,n*512,512,512]}Object.freeze(`map.normalMap.metallicRoughnessMap.occlusionMap.emissiveMap.tag.alphaMode.alphaCutoff.opacity.doubleSided.occlusionStrength.moss.boxMapScale.boxMapAxis.lightMapScale.layerMaps.lightMask.clearcoat.clearcoatRoughness.transmission.thickness.ior.sheenRoughness.specular.anisotropy.anisotropyRotation.iridescence.iridescenceIor.iridescenceThickness.attenuationDistance.toon`.split(`.`)),Object.freeze([`normalScale`,`mossColor`,`lightMap`,`attenuationColor`,`sheenColor`,`specularColor`,`subsurface`,`wear`]);function hr(e){return e.normalScale===void 0&&e.mossColor===void 0&&e.lightMap===void 0&&e.attenuationColor===void 0&&e.sheenColor===void 0&&e.specularColor===void 0&&e.subsurface===void 0&&e.wear===void 0}var gr=class e{static of(t){return hr(t)?new e(t):null}constructor(e){this.map=e.map,this.normalMap=e.normalMap,this.metallicRoughnessMap=e.metallicRoughnessMap,this.occlusionMap=e.occlusionMap,this.emissiveMap=e.emissiveMap,this.tag=e.tag,this.alphaMode=e.alphaMode,this.alphaCutoff=e.alphaCutoff,this.opacity=e.opacity,this.doubleSided=e.doubleSided,this.occlusionStrength=e.occlusionStrength,this.moss=e.moss,this.boxMapScale=e.boxMapScale,this.boxMapAxis=e.boxMapAxis,this.lightMapScale=e.lightMapScale,this.layerMaps=e.layerMaps,this.lightMask=e.lightMask,this.clearcoat=e.clearcoat,this.clearcoatRoughness=e.clearcoatRoughness,this.transmission=e.transmission,this.thickness=e.thickness,this.ior=e.ior,this.sheenRoughness=e.sheenRoughness,this.specular=e.specular,this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.iridescence=e.iridescence,this.iridescenceIor=e.iridescenceIor,this.iridescenceThickness=e.iridescenceThickness,this.attenuationDistance=e.attenuationDistance,this.toon=e.toon}matches(e){return hr(e)&&this.map===e.map&&this.normalMap===e.normalMap&&this.metallicRoughnessMap===e.metallicRoughnessMap&&this.occlusionMap===e.occlusionMap&&this.emissiveMap===e.emissiveMap&&this.tag===e.tag&&this.alphaMode===e.alphaMode&&this.alphaCutoff===e.alphaCutoff&&this.opacity===e.opacity&&this.doubleSided===e.doubleSided&&this.occlusionStrength===e.occlusionStrength&&this.moss===e.moss&&this.boxMapScale===e.boxMapScale&&this.boxMapAxis===e.boxMapAxis&&this.lightMapScale===e.lightMapScale&&this.layerMaps===e.layerMaps&&this.lightMask===e.lightMask&&this.clearcoat===e.clearcoat&&this.clearcoatRoughness===e.clearcoatRoughness&&this.transmission===e.transmission&&this.thickness===e.thickness&&this.ior===e.ior&&this.sheenRoughness===e.sheenRoughness&&this.specular===e.specular&&this.anisotropy===e.anisotropy&&this.anisotropyRotation===e.anisotropyRotation&&this.iridescence===e.iridescence&&this.iridescenceIor===e.iridescenceIor&&this.iridescenceThickness===e.iridescenceThickness&&this.attenuationDistance===e.attenuationDistance&&this.toon===e.toon}},_r=.006,vr=1.2;function yr(e){let t=0;for(let n=0;n<3;n++)t=Math.max(t,Math.hypot(e[n*4],e[n*4+1],e[n*4+2]));return t}function br(e){let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let r of e){if(!r.geometry?.positions?.length||!r.matrix)continue;let e=Fn(r.geometry),i=r.matrix,a=e.radius*yr(i);for(let r=0;r<3;r++){let o=i[r]*e.center[0]+i[4+r]*e.center[1]+i[8+r]*e.center[2]+i[12+r];t[r]=Math.min(t[r],o-a),n[r]=Math.max(n[r],o+a)}}return Number.isFinite(t[0])?Math.hypot(n[0]-t[0],n[1]-t[1],n[2]-t[2]):0}function xr(e){let t=br(e);return t>0?Math.min(_r,vr/t):_r}var Sr=2048,Cr=new Set([`liquid`,`foam`]),B=42,wr=41,Tr=3e38,Er={opaque:0,mask:1,blend:2,add:3};function Dr(e){return e===`blend`||e===`add`}var Or=Object.freeze([0,0,0]),V=[`map`,`normalMap`,`metallicRoughnessMap`,`occlusionMap`,`emissiveMap`],kr=[`baseMap`,`normalMap`,`metallicRoughnessMap`,`occlusionMap`,`emissiveMap`],Ar=[`hasBaseMap`,`hasNormalMap`,`hasMetallicRoughnessMap`,`hasOcclusionMap`,`hasEmissiveMap`],jr=[1,1],Mr=8,Nr=new Set([`water`,`foliage`,`grass`,`terrain`,`floor`,`fire`,`smoke`,`liquid`,`foam`]),Pr=new Set([`foliage`,`grass`]),Fr=1e-4,Ir=2**-19,Lr=2**-22,Rr=4/256,zr=new Float32Array(4),Br=new Set([`foliage`,`grass`,`water`,`fire`,`smoke`]),Vr=.56,Hr=`transparent.frameTexture.bloomTexture.bloomStrength.hdrEnabled.grade.vignette.grainAmount.resolution.monochrome.fade.cinematic.time.volumeExplosion.explosionProgress.inverseViewProjection.eye.sceneDepth.volumeShadowMap.volumeLightProjection.volumeLightDirection.volumeLightColor.volumeDensity.volumeMinimum.volumeMaximum.volumeColor.volumeAmbient.volumeDrift.volumeSteps.volumeAnisotropy.volumeShadowAmbient.volumeGridFog.volumeNoiseAmount.volumeNoiseScale.volumeHeightFalloff.volumeMaxDistance.volumeField.volumeProfile.volumeFlowStrength.volumeFlowPeriod.volumeLightCount.volumeLightPositions[0].volumeLightColors[0].volumeLightDirections[0].volumeLightCones[0].fogSkyVisibility.orthographic.occlusionTexture.occlusionStrength.occlusionTexel`.split(`.`);function Ur(e,t){return Object.fromEntries(Hr.map(n=>[n,e.getUniformLocation(t,n)]))}var Wr=[`baseMap`,`normalMap`,`metallicRoughnessMap`,`occlusionMap`,`emissiveMap`],Gr=[`skin`,`crowd`,`morph`,`lightMap`,`waterReflection`],Kr=[`moss`,`anisotropy`,`iridescence`,`toon`,`boxMapScale`],qr=new Set([`floor`,`water`,`foliage`,`terrain`,`grass`,`fire`,`smoke`,`unlit`]);function Jr(e){let t=[];return e.spotCount>0&&t.push(`spotLights`),e.areaCount>0&&t.push(`areaLights`),e.shadowCasters.length>0&&t.push(`localShadows`),e.extraFeatures&&t.push(...e.extraFeatures),e.fillIntensity>0&&t.push(`fill`),t}function Yr(e){let t=new Set;for(let n of e){let{material:e}=n;for(let r of Gr)(n[r]||e[r])&&t.add(r);V.forEach((n,r)=>{e[n]&&t.add(Wr[r])}),Ci(n)&&t.add(`tintedShadows`),e.environmentProbe&&t.add(`probe`),e.irradianceGrid&&t.add(`irradianceGrid`),e.normalMap?.uvTransform&&t.add(`normalMapTransform`),Object.keys(e.layerMaps??{}).forEach(e=>t.add(e)),e.layers&&t.add(`splat`);for(let n of Kr)e[n]>0&&t.add(n);e.lightMask!==void 0&&t.add(`lightLinking`),(e.alphaMode??`opaque`)!==`opaque`&&t.add(`alphaMode`),e.subsurface?.weight>0&&t.add(`subsurface`),e.wear&&t.add(`surfaceWear`),e.snippet&&t.add(e.snippet.feature),z(e,`clearcoat`)>0&&t.add(`clearcoat`),z(e,`sheenColor`).some(e=>e!==0)&&t.add(`sheen`),qr.has(e.tag)&&t.add(e.tag),[n.geometry,...(n.lods??[]).map(e=>e.geometry)].some(e=>e.colors||H(e))&&t.add(`vertexColors`)}return t}function Xr(e){return e.transmission>0?`liquid`:Cr.has(e.tag)?e.tag:`opaque`}function Zr(e,t=!!a.begin){return!!(e.skin||e.morph||e.geometry.morphTargets||e.geometry.skinIndices||ki(e.material)&&!t)}function Qr(e){return e.pass??`opaque`}var $r=[`skinEnabled`,`skinInfluences`,`jointPalette`,`crowdEnabled`],ei=[`alphaMode`,`alphaCutoff`,`materialOpacity`,`alphaToCoverage`,`doubleSided`],ti=[`alphaMasked`,`alphaCutoff`,`materialOpacity`,`hasBaseMap`,`baseMap`,`tintPass`,`tintTransmission`,`tintMapSize`,`tintBias`,`opaqueShadow`],ni=[`morphEnabled`,`morphVertexCount`,`morphTargetCount`,`morphWeights[0]`,`morphTargets`],ri=[`environmentSpecular`,`environmentEnabled`,`environmentIntensity`,`environmentRotation`,`environmentLevelMax`,`environmentBrdf`,`environmentIrradiance[0]`],ii=6,ai=9,oi=10,si=15,ci=13,li=1024,ui=2,di=[`pointLightCount`,`pointLightPositions[0]`,`pointLightColors[0]`,`pointLightRadii[0]`,`pointLightShadowTiles[0]`,`spotLightCount`,`spotLightPositions[0]`,`spotLightColors[0]`,`spotLightDirections[0]`,`spotLightParameters[0]`,`areaLightCount`,`areaLightPositions[0]`,`areaLightColors[0]`,`areaLightNormals[0]`,`areaLightTangents[0]`,`localShadowAtlas`,`localShadowMatrices[0]`,`localShadowTexelAngles[0]`,`keyColor`,`fillIntensity`,`ambientIntensity`,`specularAntiAliasing`],fi=[`splatEnabled`,`splatColor`,`splatNormal`,`splatPacked`,`splatMask`,`splatLayer[0]`,`splatTint[0]`,`splatSlope[0]`,`splatHeightRange[0]`,`splatMaskChannel[0]`,`splatMaskInvert[0]`,`splatBlend`,`splatOptions`,`splatMaskBounds`,`splatVariation`];function pi(e){if(Nr.has(e.tag))for(let t=1;t<V.length;t++){let n=V[t]===`normalMap`&&Pr.has(e.tag);if(e[V[t]]&&!n)throw Error(`Material maps require a standard PBR material tag. Procedural tags accept only a base map, and foliage and grass also a normal map.`)}if(e.tag===`unlit`&&(e.normalMap||e.metallicRoughnessMap||e.occlusionMap))throw Error(`Unlit materials support only base and emissive maps.`);let t=e.normalScale??jr;if(t.length!==2||!Number.isFinite(t[0])||!Number.isFinite(t[1])||!Number.isFinite(Math.fround(t[0]))||!Number.isFinite(Math.fround(t[1])))throw Error(`normalScale must contain two finite floats.`);let n=e.occlusionStrength??1;if(!Number.isFinite(n)||n<0||n>1)throw Error(`occlusionStrength must be within zero and one.`);hi(e)}var mi=Object.freeze([.05,.085,.02]);function hi(e){if(e.moss===void 0)return;if(typeof e.moss!=`number`||!(e.moss>=0&&e.moss<=1))throw Error(`moss must be within zero and one.`);if(e.moss>0&&Nr.has(e.tag))throw Error(`Moss needs a standard PBR material tag.`);let t=e.mossColor??mi;if(!Array.isArray(t)||t.length!==3||!t.every(Number.isFinite))throw Error(`mossColor must be three linear RGB numbers.`)}function gi(e){return[e.moss??0,...e.mossColor??mi]}function _i(e){pi(e);let t=e.normalScale??jr,n=e.occlusionStrength??1;if((e.layers||e.splat)&&c().validate(e),e.layers&&Nr.has(e.tag))throw Error(`Splat layers require a standard PBR material tag.`);return[...V.map(t=>e[t]??null),t[0],t[1],n,...gi(e),e.boxMapScale??0,e.boxMapAxis??1,...vi(e),e.layers??null,e.splat??null,e.layerMaps??null,e.environmentProbe??null,e.waterReflection??null,e.irradianceGrid??null,e.wear??null]}function vi(e){if(!e.lightMap)return[null,0];let t=e.lightMapScale??1;if(!Number.isFinite(t)||t<0)throw RangeError(`lightMapScale must be a nonnegative number.`);if((e.lightMap.colorSpace??`srgb`)!==`srgb`)throw Error(`lightMap requires an srgb texture descriptor.`);return[e.lightMap,t]}function yi(e){let t=e.alphaMode??`opaque`;if(!Object.hasOwn(Er,t))throw Error(`alphaMode must be 'opaque', 'mask', 'blend' or 'add'.`);for(let t of[`alphaCutoff`,`opacity`]){let n=e[t]??1;if(typeof n!=`number`||!Number.isFinite(n)||n<0||n>1)throw Error(`${t} must be a number within zero and one.`)}if(e.doubleSided!==void 0&&typeof e.doubleSided!=`boolean`)throw TypeError(`doubleSided must be a boolean`)}function bi(e){return Dr(e.alphaMode??`opaque`)?(e.opacity??1)+(e.opacityBias??0):1}function xi(e){yi(e);let t=e.alphaMode??`opaque`;return[t,t===`mask`?e.alphaCutoff??.5:0,t===`mask`?(e.opacity??1)+(e.opacityBias??0):1,e.doubleSided===!0]}function Si(e){let t=e.material.alphaMode??`opaque`,n=t===`blend`&&Wt(e)>0;return e.castShadow??!(e.shadowCatcher===!0||t===`add`||n)}function Ci(e){return Si(e)&&e.material.tag!==`floor`&&((e.material.alphaMode??`opaque`)===`blend`||e.material.transmission>0)}var wi=e=>e.receiveShadow!==!1,Ti=e=>e.holdout===!0?1:e.shadowCatcher===!0?2:0,Ei=[`castShadow`,`receiveShadow`,`holdout`,`shadowCatcher`,`visible`];function Di(e){for(let t of Ei)if(e[t]!==void 0&&typeof e[t]!=`boolean`)throw TypeError(`${t} must be a boolean`);if(e.holdout===!0&&e.shadowCatcher===!0)throw Error(`A part is a holdout or a shadow catcher, not both: ${e.name}`)}var Oi=e=>e.visible===!1||e.visibility?.visible===!1;function ki(e){return V.some(t=>e[t])}var Ai=2**128-2**103;function ji(e){return typeof e==`number`&&e>-Ai&&e<Ai}function Mi(e,t){if(e?.length!==t)return!1;if(e instanceof Float32Array){let n=0;for(let r=0;r<t;r++)n+=e[r]*0;return n===0}for(let n=0;n<t;n++)if(!ji(e[n]))return!1;return!0}function Ni(e,t=D()){if(!Mi(e.matrix,16))throw Error(`Invalid transform: ${e.name}`);if(!O(t,e.matrix)||!Mi(t,9))throw Error(`Singular transform: ${e.name}`);let n=e.material,r=e.assembly;if(!Mi(n.color,3)||n.emissiveColor!==void 0&&!Mi(n.emissiveColor,3)||r&&(!Mi(r.offset??Or,3)||!Mi(r.detailOffset??Or,3)))throw Error(`Invalid instance vector: ${e.name}`);if(!ji(e.material.metallic)||!ji(e.material.roughness)||!ji(e.material.emission??0))throw Error(`Invalid material: ${e.name}`);return t}function Pi(e,t,n){e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2]}function Fi(e){return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0}function Ii(e,t,n,r){let i=t*B,a=n.material;Oi(n)?e.fill(0,i,i+25):(e.set(n.matrix,i),e.set(r,i+16)),Pi(e,i+25,a.color),e[i+28]=a.metallic,e[i+29]=a.roughness,e[i+30]=a.emission??0,e[i+31]=f[a.tag]??0,Pi(e,i+32,n.assembly?.offset??Or),Pi(e,i+35,n.assembly?.detailOffset??Or),Pi(e,i+38,a.emissiveColor??a.color),e[i+wr]=bi(a)}var Li=5;function Ri(e){let t=e[0];return t.skin||t.morph||Br.has(t.material.tag)&&!Pr.has(t.material.tag)||Xr(t.material)!==`opaque`||Dr(xi(t.material)[0])?!1:e.every(e=>!e.assembly||e.crowd)}function zi(e,t){if(!Array.isArray(t)||t.length<2||t[0].geometry!==e.geometry)throw TypeError(`lods must list level 0 (the own geometry of the part) and at least one coarser level: ${e.name}`);t.forEach((n,r)=>{if(!n.geometry?.positions||!n.geometry.indices)throw TypeError(`Every lods entry needs a geometry: ${e.name}`);if(!Number.isFinite(n.error)||n.error<0||r>0&&n.error<t[r-1].error)throw RangeError(`lods errors must be finite and not decrease from level to level: ${e.name}`)})}function Bi(e){let t=[e.geometry,...(e.lods??[]).map(e=>e.geometry),...(e.shadowLods??[]).map(e=>e.geometry)],n=Ut(e)?.geometry;return n&&t.push(n),t}function Vi(e,t){return{levelErrors:e.map(e=>e.error),levelGeometries:e.map(e=>e.geometry),levelDraws:[],selection:new Bn(t,e.length)}}function Hi(e){let t=1/0,n=-1/0;for(let{geometry:r,matrix:i}of e){if(!r?.positions?.length||!i)continue;let{minimum:e,maximum:a}=Fn(r),o=i[13],s=0;for(let t=0;t<3;t++){let n=i[1+t*4];o+=Math.min(n*e[t],n*a[t]),s+=Math.abs(n)*(a[t]-e[t])}t=Math.min(t,o),n=Math.max(n,o+s)}let r=n-t;return .019-t>r*.1?t+r*.02:.019}function Ui(e=.019){return{name:`Studio floor`,geometry:{positions:new Float32Array([-100,e,-100,-100,e,100,100,e,100,100,e,-100]),normals:new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),indices:new Uint32Array([0,1,2,0,2,3])},matrix:v(),material:{color:[.04,.05,.06],metallic:0,roughness:1,emission:0,tag:`floor`}}}var Wi=()=>g(`validateSkinGeometry`,`skinning.js`),Gi=()=>g(`validateMorphGeometry`,`morph.js`),Ki=e=>!!(e.skin||e.geometry.skinIndices||e.geometry.skinWeights),qi=e=>!!(e.morph||e.geometry.morphTargets!==void 0);function Ji(e,t=!0){let n=new Map,r=[],i=new Map,a=new Map,o=new Map;for(let s of e){if(Ni(s),Di(s),Ki(s)){let{validateSkinGeometry:e,validateSkinPose:t}=Wi();e(s.geometry,s.skin),s.skin&&t(s.skin,s.geometry,s.matrix)}if(s.skin&&Nr.has(s.material.tag))throw Error(`Skinned parts require a standard material tag.`);if(qi(s)){let{validateMorphGeometry:e,validateMorphPose:t,validateMorphTransform:n}=Gi();i.has(s.geometry)?t(s.morph,i.get(s.geometry)):i.set(s.geometry,e(s.geometry,s.morph)),s.morph&&n(s.morph,i.get(s.geometry),s.matrix,s.skin)}if(s.morph&&Nr.has(s.material.tag))throw Error(`Morphed parts require a standard material tag.`);let e=t?s.geometry:s;n.has(e)||n.set(e,new Map);let c=n.get(e),l=a.get(s.material);l||(l=[..._i(s.material),..._n(s.material)],a.set(s.material,l));let u=o.get(s.material);u||(u=[Xr(s.material),...xi(s.material),s.material.aovMap??null,s.material.transmissionMap??null,...s.material.aov??Or],o.set(s.material,u));for(let e of[...l,s.skin??null,s.material.snippet,s.crowd??null,s.morph??null,Si(s),wi(s),Ti(s),Wt(s),Ut(s),s.lods??null,s.shadowLods??null,Fi(s.matrix),...u])c.has(e)||c.set(e,new Map),c=c.get(e);if(!c.has(`parts`)){let e=[];c.set(`parts`,e),r.push(e)}c.get(`parts`).push(s)}return r}function Yi(e,t,n=!0){let r=e&&n&&e.parts.length<=t.length&&e.parts.every((e,n)=>e===t[n])?t.slice(e.parts.length):null;if(r&&r.every(t=>!e.geometries.has(t.geometry))){for(let t of r)e.geometries.add(t.geometry);let i=[...e.batches,...Ji(r,n)];return{batches:i,state:{parts:t.slice(),geometries:e.geometries,batches:i}}}let i=Ji(t,n);return{batches:i,state:{parts:t.slice(),geometries:new Set(t.map(e=>e.geometry)),batches:i}}}function Xi(e,t,n,r,i){if(!i)return{batches:Ji(n?[...t,n]:t,r),state:null};let a=Yi(e,t,r);return n?{batches:a.state.geometries.has(n.geometry)?Ji([...t,n],r):[...a.batches,...Ji([n],r)],state:a.state}:a}function Zi(e,t=1/0){let n=e.image?.naturalWidth??e.image?.width,r=e.image?.naturalHeight??e.image?.height;if(!Number.isInteger(n)||!Number.isInteger(r)||n<=0||r<=0||n>t||r>t)throw Error(`Texture image dimensions are invalid or exceed MAX_TEXTURE_SIZE.`);if(![0,1].includes(e.uvChannel??0))throw Error(`Only texture UV channels 0 and 1 are supported.`);if(e.transform||e.offset||e.repeat||e.rotation!==void 0||e.extensions&&Object.keys(e.extensions).length)throw Error(`Texture transforms and extensions are unsupported. Bake them into UV channel 0.`);if(e.colorSpace&&![`srgb`,`linear`].includes(e.colorSpace))throw Error(`Texture color space must be srgb or linear.`);let i=e.wrapS??10497,a=e.wrapT??10497,o=e.minFilter??9987,s=e.magFilter??9729;if(![10497,33071,33648].includes(i)||![10497,33071,33648].includes(a))throw Error(`Unsupported texture wrap mode.`);if(![9728,9729,9984,9985,9986,9987].includes(o)||![9728,9729].includes(s))throw Error(`Unsupported texture filtering mode.`);let c=e.image.compressed;if(c)return{width:n,height:r,wrapS:i,wrapT:a,minFilter:c.minFilter(o),magFilter:s,mipmaps:!1,bytes:c.bytes};let l=o>=9984;return{width:n,height:r,wrapS:i,wrapT:a,minFilter:o,magFilter:s,mipmaps:l,bytes:We(n,r,{mipmaps:l})}}function Qi(e,t,n){let r=Array.from(e.getInternalformatParameter(e.RENDERBUFFER,t,e.SAMPLES)),i=Array.from(e.getInternalformatParameter(e.RENDERBUFFER,e.DEPTH_COMPONENT24,e.SAMPLES));return Math.max(0,...r.filter(e=>e<=n&&i.includes(e)))}function $i(e){return e.lightUvs?e.lightUvs.byteLength*2:e.uvs?.byteLength??0}function ea(e){let t=e.lightUvs.length/2,n=new Float32Array(t*4);for(let r=0;r<t;r++)n[r*4]=e.uvs?.[r*2]??0,n[r*4+1]=e.uvs?.[r*2+1]??0,n[r*4+2]=e.lightUvs[r*2],n[r*4+3]=e.lightUvs[r*2+1];return n}function H(e){return e.surfaceMasks??e.skyVisibility}function ta(e){let t=H(e).length,n=new Float32Array(t*4);for(let r=0;r<t;r++){for(let t=0;t<3;t++)n[r*4+t]=e.colors?e.colors[r*3+t]:1;n[r*4+3]=H(e)[r]}return n}function na(e){let t=[`positions`,`normals`,`colors`,`indices`].reduce((t,n)=>t+(e[n]?.byteLength??0),$i(e));return H(e)?t-(e.colors?.byteLength??0)+H(e).length*16:t}function ra(e){let t=e.positions?.length/3;if(!(e.positions instanceof Float32Array)||!Number.isInteger(t)||t<1||!(e.normals instanceof Float32Array)||e.normals.length!==t*3||!(e.indices instanceof Uint32Array)||e.indices.length<3||e.indices.length%3!=0)throw TypeError(`Replacement geometry needs matching Float32 positions/normals and Uint32 triangles.`);for(let[n,r]of[[`positions`,3],[`normals`,3],[`uvs`,2],[`colors`,3]]){let i=e[n];if((i||![`uvs`,`colors`].includes(n))&&(!(i instanceof Float32Array)||i.length!==t*r||!ia(i)))throw TypeError(`Replacement ${n} must contain finite matching Float32 data.`)}let n=e.indices;for(let e=0;e<n.length;e++)if(n[e]>=t)throw RangeError(`Replacement triangle indices must address existing vertices.`)}function ia(e){for(let t=0;t<e.length;t++){let n=e[t];if(!(n>-1/0&&n<1/0))return!1}return!0}var aa=class{constructor(e,t,{batching:n=!0,pixelRatio:r=1.5,benchmark:i=!1,world:a=!1,ground:o=!0,transparent:s=!1,samples:l=4,hdr:u=!1,depth:d=!1,memoryBudgetMiB:f,environment:p={},shadowBounds:m={},shadowCascades:h=null,culling:g=!0,lodPixelError:_=1,createGpuTimer:y=null,skyOpenness:b=null,fogSkyVisibility:x=null,shading:S=`full`,viewTransform:C=`aces`,look:w=null,resolveCoplanar:T=!1,reversedDepth:E=`auto`,deferProgramLink:D=!1,deferEnvironmentPrefilter:O=!1}={}){if(this.canvas=e,this.sceneParts=t,this.skyOpenness=b,this.fogSkyVisibility=x,this.fogFieldOverride=null,this.fogFieldTexture=null,this.fogLightBuffers=null,this.createGpuTimer=y,this.gpuTimer=void 0,this.gpuMilliseconds=null,this.culling=g,this.lodPixelError=_,this.frustumPlanes=new Float32Array(24),!Number.isInteger(l)||l<1)throw Error(`MSAA sample count must be a positive integer.`);if(!ve.includes(S))throw Error(`shading must be one of ${ve.join(`, `)}.`);if(this.shading=S,new Set(t).size!==t.length)throw Error(`Scene parts must have distinct object identities for animation.`);this.lighting=At(),Pt(this.lighting,p,{world:a});let k=en(p.volumeFog);if(k.density>0&&(!d||i||s||!u))throw Error(`Volume fog requires depth:true, hdr:true, an opaque canvas and normal rendering`);if(this.context=e.getContext(`webgl2`,{antialias:!0,alpha:!!s,premultipliedAlpha:!0,powerPreference:`high-performance`}),!this.context)throw Error(`WebGL2 is unavailable. Enable hardware acceleration or use a supported browser.`);this.transparent=!!s,this.pixelRatio=r,this.benchmark=i,this.depth=!(!d||i),this.world=a,this.environment=p,this.fittedFogDensity=a?xr(t):void 0,this.shadowBounds=m,this.coplanarDiagnostics=null,this.reversedDepthMode=E;let A=E!==!1&&!i&&!!this.context.getExtension?.(`EXT_clip_control`);if(this.diagnostics=[],this.activeLightDirection=p.lightDirection??[-3,6,4],this.shadowCascades=h,this.renderTargets=new rr,this.defaultViewTransform=C,this.defaultLook=w,this.viewTransform=`aces`,this.look=null,this.lookSource=null,this.selectViewTransform(C,w),this.hdr=!!(u&&!i&&this.context.getExtension(`EXT_color_buffer_float`)),k.density>0&&!this.hdr)throw Error(`Volume fog requires EXT_color_buffer_float for HDR rendering`);if(this.multisampleSamples=i?0:Qi(this.context,this.hdr?this.context.RGBA16F:this.context.RGBA8,Math.min(S===`light`?Math.min(l,2):l,this.context.getParameter(this.context.MAX_SAMPLES))),this.capabilities={hdr:this.hdr,hdrRequested:!!u,hdrFallbackReason:u&&!this.hdr?i?`HDR is disabled in benchmark mode`:`EXT_color_buffer_float is unavailable`:null,samples:this.multisampleSamples},this.geometryBytes=0,this.geometryBuffers=new Map,this.batching=n,this.groundPart=o===!0?Ui(Hi(t)):o||null,this.buffers=[],this.batches=[],this.partLocations=new Map,this.updateBatches=new Set,this.postStages=[],this.passSupport=null,this.updateSkins=new Set,this.updateMorphs=new Set,this.skinTextures=new Map,this.influenceTextures=new Map,this.morphTextures=new Map,this.textures=new Map,this.splatResources=new Map,this.textureBytes=4,this.shadowsDirty=!0,this.windState={time:0,strength:.3},this.assemblyAmount=0,T&&typeof T!=`function`)throw TypeError(`resolveCoplanar is resolveFlushParts from 67js/addons/coplanar-overlap.`);T&&!i&&T(t),this.fitParts=this.groundPart?[...t,this.groundPart]:t;let j=Ji(this.fitParts,n),M=this.context.getParameter(this.context.MAX_TEXTURE_SIZE);if(this.hasSkins=j.some(e=>e[0].skin||e[0].crowd),this.hasMorphs=j.some(e=>e[0].morph),this.hasSkins&&(this.context.getParameter(this.context.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<2||this.context.getParameter(this.context.MAX_COMBINED_TEXTURE_IMAGE_UNITS)<8))throw Error(`GPU skinning requires two vertex texture units and eight combined texture units.`);if(this.hasMorphs&&(this.context.getParameter(this.context.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<(this.hasSkins?3:1)||this.context.getParameter(this.context.MAX_COMBINED_TEXTURE_IMAGE_UNITS)<9))throw Error(`GPU morphing requires one additional vertex texture unit and nine combined texture units.`);let ee=new Set;for(let e of j){let t=e[0];if(!t.morph||ee.has(t.geometry))continue;let n=t.geometry.positions.length/3*t.geometry.morphTargets.length*2;this.textureBytes+=Gi().skinTextureLayout(n,M,2).bytes,ee.add(t.geometry)}let te=new Set,ne=new Set;for(let e of j){let t=e[0];t.crowd&&!te.has(t.crowd)&&(this.textureBytes+=Wi().skinTextureLayout(t.crowd.data.length/4,M,4).bytes,te.add(t.crowd)),t.skin&&(te.has(t.skin)||(this.textureBytes+=Wi().skinTextureLayout(t.skin.jointMatrices.length/4,M,4).bytes),ne.has(t.geometry)||(this.textureBytes+=Wi().skinTextureLayout(t.geometry.positions.length/3*2,M,2).bytes),te.add(t.skin),ne.add(t.geometry))}let re=new Set;for(let e of j){let t=e[0].material;for(let[e,n]of[...V,`lightMap`].map(e=>[e,t[e]]).concat(Object.entries(t.layerMaps??{}))){if(!n)continue;let t=Zi(n,M);if([`normalMap`,`metallicRoughnessMap`,`occlusionMap`].includes(e)&&n.colorSpace!==`linear`)throw Error(`${e} requires a linear texture descriptor.`);if(e===`emissiveMap`&&(n.colorSpace??`srgb`)!==`srgb`)throw Error(`emissiveMap requires an srgb texture descriptor.`);re.has(n)||(this.textureBytes+=t.bytes),re.add(n)}}this.splatBytes=0;let ie=new Set;for(let e of j){let t=e[0].material;t.layers&&!ie.has(t.layers)&&(ie.add(t.layers),this.splatBytes+=c().textureBytes(c().resolveSize(t,M),t.layers.length)+(t.splat?.maskMap?Zi(t.splat.maskMap,M).bytes:0))}this.textureBytes+=this.splatBytes,this.capabilities.maximumTextureSize=M,this.environmentResources=null,this.environmentBackgroundProgram=null,this.environmentBytes=!i&&p.map?R().estimateBytes(p.map,M):0,this.textureBytes+=this.environmentBytes;for(let e of j){let t=e[0].geometry;if(t.uvs&&t.uvs.length!==t.positions.length/3*2)throw Error(`Geometry UV count must match the vertex count.`);if(ki(e[0].material)&&!t.uvs&&!t.lightUvs&&!e[0].material.boxMapScale)throw Error(`Textured geometry requires UV channel 0.`);for(let e of t.uvs??[])if(!Number.isFinite(e))throw Error(`Geometry UVs must be finite.`);if(t.colors&&t.colors.length!==t.positions.length)throw Error(`Geometry colors must contain RGB for every vertex.`)}let ae=j.reduce((e,t)=>e+na(t[0].geometry)+t.length*B*4,0);this.memoryBudgetMiB=Ke({width:Math.max(1,e.clientWidth),height:Math.max(1,e.clientHeight),pixelRatio:r,samples:this.samples,memoryBudgetMiB:f,geometryBytes:ae,textureBytes:this.textureBytes,hdr:this.hdr,bloom:!i,depth:this.depth,maximumSize:M}).memoryBudgetMiB,this.view=v(),this.projection=v(),this.viewProjection=v(),this.lightProjection=v(),this.shadowBiasPerSlope=0,this.inverseViewProjection=v(),this.shaderFeatures=Yr(j.flat()),j.some(e=>e.length>1)&&this.shaderFeatures.add(`instanced`),this.shaderFeatures.add(p.map?`environmentMap`:`studioLighting`),Jr(this.lighting).forEach(e=>this.shaderFeatures.add(e)),S===`light`&&this.shaderFeatures.add(`lightShading`),h&&this.shaderFeatures.add(h.shaderFeature),this.shaderFeatures.has(`tintedShadows`)&&(h||!this.context.getExtension(`EXT_color_buffer_float`))&&this.shaderFeatures.delete(`tintedShadows`),this.tintedShadowsActive=this.shaderFeatures.has(`tintedShadows`),A&&mt(this);let oe={main:this.startMainProgram(),depth:N(this.context,se(this.shaderFeatures),pe(this.shaderFeatures))};i||(oe.post=N(this.context,`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`,this.withViewTransform(An,`post`)),oe.sky=N(this.context,`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`,yn),oe.bloom=N(this.context,`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`,bn),p.map&&this.startEnvironmentPrograms()),j.forEach(e=>this.batches.push(this.uploadBatch(e))),this.pendingConstruction={pending:oe,parts:t,environment:p},this.deferEnvironmentPrefilter=O,D||this.finishConstruction()}finishConstruction(){let{pending:e,parts:t,environment:n}=this.pendingConstruction;this.pendingConstruction=null;let r=this.benchmark;this.finishMainProgram(e.main),this.depthProgram=P(this.context,e.depth),this.depthSkinUniforms=Object.fromEntries($r.map(e=>[e,this.context.getUniformLocation(this.depthProgram,e)])),this.depthMorphUniforms=Object.fromEntries(ni.map(e=>[e,this.context.getUniformLocation(this.depthProgram,e)])),r||(this.postProgram=P(this.context,e.post),this.skyProgram=P(this.context,e.sky),this.postUniforms=Ur(this.context,this.postProgram),this.postVariants=new Map,this.bloomProgram=P(this.context,e.bloom),this.bloomUniforms=Object.fromEntries([`sourceTexture`,`texelDirection`,`threshold`,`extract`].map(e=>[e,this.context.getUniformLocation(this.bloomProgram,e)])),this.skyUniforms=Object.fromEntries([`skyTop`,`skyBottom`,`sunDirection`,`inverseViewProjection`,`eye`,`time`,`daylight`,`hdrEnabled`].map(e=>[e,this.context.getUniformLocation(this.skyProgram,e)]))),this.depthAlphaUniforms=Object.fromEntries(ti.map(e=>[e,this.context.getUniformLocation(this.depthProgram,e)])),this.depthUniform=this.context.getUniformLocation(this.depthProgram,`lightProjection`),this.depthAssemblyUniform=this.context.getUniformLocation(this.depthProgram,`assemblyAmount`),this.depthWindUniforms={time:this.context.getUniformLocation(this.depthProgram,`time`),wind:this.context.getUniformLocation(this.depthProgram,`wind`)},this.partCount=t.length,this.triangles=t.reduce((e,t)=>e+t.geometry.indices.length/3,0),this.whiteTexture=this.createTexture(null);for(let[e,t]of[[this.program,this.uniforms],[this.depthProgram,this.depthSkinUniforms]])this.context.useProgram(e),this.context.uniform1i(t.skinInfluences,6),this.context.uniform1i(t.jointPalette,7);for(let[e,t]of[[this.program,this.uniforms],[this.depthProgram,this.depthMorphUniforms]])this.context.useProgram(e),this.context.uniform1i(t.morphTargets,8);for(let e of[6,7,8])this.context.activeTexture(this.context.TEXTURE0+e),this.context.bindTexture(this.context.TEXTURE_2D,this.whiteTexture);this.shaderFeatures.has(`splat`)&&c().initializePlaceholders(this),this.initializeEnvironment(n.map),this.createShadowMap(),this.reversedDepthMode!==!1&&!r&&ht(this,this.reversedDepthMode),this.resize(),!this.benchmark&&!this.multisampleFramebuffer&&this.allocateFrameTargets(this.canvas.width,this.canvas.height)}async programsReady(){if(!this.pendingConstruction)return;let e=this.context,t=e.getExtension(`KHR_parallel_shader_compile`),{pending:n}=this.pendingConstruction,r=[...Object.values(n),...this.pendingEnvironmentPrograms?.values()??[]].map(e=>e.program);for(;t&&r.some(n=>!e.getProgramParameter(n,t.COMPLETION_STATUS_KHR));)await new Promise(e=>setTimeout(e,8));this.finishConstruction()}async prepareFrame(e,{timeoutMilliseconds:t=6e3}={}){await this.programsReady();let n=this.context,r=performance.now()+t;Be(n,!0);try{for(;;)try{return this.render(e),!0}catch(e){if(!(e instanceof Re))throw e;for(;!ze(n,e.program)&&performance.now()<r;)await new Promise(e=>setTimeout(e,8));if(performance.now()>=r)break}}finally{Be(n,!1)}return this.render(e),!1}selectViewTransform(e,t){if((e!==`aces`||t)&&!n.apply)throw Error(`viewTransform and look need their shader code: add import '@codepawlhq/67js/addons/view-transform-shader' (a recipe: await loadAgentSceneModules(recipe)).`);this.viewTransform=e,this.lookSource=t,this.look=t?n.resolveLook(t):null}syncViewTransform(e){let t=e.viewTransform??this.defaultViewTransform,r=e.look??this.defaultLook;if(t===this.viewTransform&&r===this.lookSource||(n.dispose?.(this),this.selectViewTransform(t,r),this.benchmark))return;let i=this.context;this.rebuildMainProgram();for(let e of this.postVariants.values())i.deleteProgram(e.pending?P(i,e.pending):e.program);this.postVariants.clear(),i.deleteProgram(this.postProgram),this.postProgram=P(i,N(i,Fe,this.withViewTransform(An,`post`))),this.postUniforms=Ur(i,this.postProgram),this.liquidProgram&&i.deleteProgram(this.liquidProgram),this.liquidProgram=null,this.environmentBackgroundProgram&&i.deleteProgram(this.environmentBackgroundProgram),this.environmentBackgroundProgram=null}withViewTransform(e,t){return this.viewTransform===`aces`&&!this.look?e:n.apply(e,t,this.viewTransform,!!this.look)}startMainProgram(){let e=this.benchmark,t=e?he:this.withViewTransform(Pe(this.shaderFeatures),`main`);return N(this.context,e?me:Me(this.shaderFeatures),t)}buildMainProgram(){this.finishMainProgram(this.startMainProgram())}finishMainProgram(e){this.program=P(this.context,e),this.uniforms=Object.fromEntries([`materialDielectric`,`materialCoat`,`materialSheen`,`materialAnisotropy`,`materialIridescence`,`lightLinkMask`,`boxMapScale`,`boxMapAxis`,`lightMap`,`lightMapScale`,`hasLightMap`,`viewProjection`,`flushBias`,`clipPerMetre`,`lightProjection`,`eye`,`armorColor`,`armorSurface`,`exposure`,`inspection`,`shadowMap`,`shadowBiasPerSlope`,...kr,...Ar,...$r,...ni,`normalScale`,`occlusionStrength`,`materialMoss`,`wearEnabled`,`wearMetal`,`wearDirt`,`wearShape`,`wearDirtShape`,...fi,`hdrEnabled`,`time`,`wind`,`worldMode`,`daylight`,`fogColor`,`lightDirection`,`fogDensity`,`waterRipple`,`rippleTime`,`explosionProgress`,`explosionCenter`,`assemblyAmount`,`renderPassMode`,`renderPassDepthRange`,`renderPassObjectBase`,`baseColor`,`surface`,`instanceEmission`,`instanceOpacity`,`boxNormalMatrix`,`shadowBlind`,`compositeMode`,`tintShadowMap`,`tintBlind`,...ei].map(e=>[e,this.context.getUniformLocation(this.program,e)]));for(let e of di)this.uniforms[e]=this.context.getUniformLocation(this.program,e);for(let e of ri)this.uniforms[e]=this.context.getUniformLocation(this.program,e);this.keepSamplerTypesApart()}keepSamplerTypesApart(){let e=this.context;e.useProgram(this.program);let t=e.getProgramParameter(this.program,e.ACTIVE_UNIFORMS);for(let n=0;n<t;n++){let t=e.getActiveUniform(this.program,n);t.type===e.SAMPLER_2D&&e.uniform1iv(e.getUniformLocation(this.program,t.name),new Int32Array(t.size).fill(1))}}get samples(){return Math.max(1,this.multisampleSamples)}uploadBuffer(e,t,n=this.context.STATIC_DRAW){let r=this.context.createBuffer();return this.buffers.push(r),this.context.bindBuffer(e,r),this.context.bufferData(e,t,n),this.geometryBytes+=t.byteLength,r}applyAnisotropy(e){let t=this.context,n=t.getExtension(`EXT_texture_filter_anisotropic`);if(!n)return;let r=t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);t.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(Mr,r))}createTexture(e){if(this.textures.has(e))return this.textures.get(e);let t=this.context,n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n);let r=t.getParameter(t.UNPACK_FLIP_Y_WEBGL),i=t.getParameter(t.UNPACK_COLORSPACE_CONVERSION_WEBGL);try{if(t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,e?.flipY??!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE),e){let n=Zi(e,t.getParameter(t.MAX_TEXTURE_SIZE));e.image.compressed?e.image.compressed.upload(t):t.texImage2D(t.TEXTURE_2D,0,e.colorSpace===`linear`?t.RGBA8:t.SRGB8_ALPHA8,t.RGBA,t.UNSIGNED_BYTE,e.image),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,n.wrapS),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,n.wrapT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n.minFilter),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n.magFilter),n.mipmaps&&(t.generateMipmap(t.TEXTURE_2D),this.applyAnisotropy(t.TEXTURE_2D))}else t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([255,255,255,255])),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR)}catch(e){throw t.deleteTexture(n),e}finally{t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,r),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}return this.textures.set(e,n),n}updateTexture(e,t={}){if(!i.update)throw Error(`updateTexture needs its code: add import '@codepawlhq/67js/addons/texture-update'.`);i.update(this,e,t)}requireShaderFeatures(e){this.requireFeatureNames([...Yr(e),...e.length>1?[`instanced`]:[]])}requireFeatureNames(e){if(this.benchmark||!this.shaderFeatures)return;let t=e.filter(e=>!this.shaderFeatures.has(e));t.length!==0&&(t.forEach(e=>this.shaderFeatures.add(e)),this.rebuildMainProgram())}rebuildMainProgram(){let e=this.context,t=this.program;this.buildMainProgram(),e.deleteProgram(t),e.useProgram(this.program);for(let[t,n]of[[`skinInfluences`,6],[`jointPalette`,7],[`morphTargets`,8],...Object.entries(s),[`environmentSpecular`,ai],[`environmentBrdf`,oi]])e.uniform1i(this.uniforms[t],n);e.uniform1f(this.uniforms.splatEnabled,0),this.shaderFeatures.has(`splat`)&&!this.splatPlaceholder&&c().initializePlaceholders(this)}uploadBatch(e){this.requireShaderFeatures(e);let t=this.context,n=t.createVertexArray();try{return this.uploadBatchData(e,n)}catch(e){throw t.bindVertexArray(null),t.deleteVertexArray(n),e}}bindSurfaceWear(e){let{context:t,uniforms:n}=this;if(t.uniform1f(n.wearEnabled,+!!e),!e)return;let r=It(e);t.uniform4fv(n.wearMetal,r.metal),t.uniform4fv(n.wearDirt,r.dirt),t.uniform4fv(n.wearShape,r.shape),t.uniform2fv(n.wearDirtShape,r.dirtShape)}bindGeometryAttributes(e,t){let n=this.context,r=this.geometryBuffers.get(e);if(!r){r=new Map;for(let t of[`positions`,`normals`,`uvs`,`colors`,`indices`,`crowdPacked`])if(e[t]){let i=t===`indices`?n.ELEMENT_ARRAY_BUFFER:n.ARRAY_BUFFER,a=t===`uvs`&&e.lightUvs?ea(e):e[t];r.set(t,this.uploadBuffer(i,t===`colors`&&H(e)?ta(e):a))}H(e)&&!e.colors&&r.set(`colors`,this.uploadBuffer(n.ARRAY_BUFFER,ta(e))),e.lightUvs&&!e.uvs&&r.set(`uvs`,this.uploadBuffer(n.ARRAY_BUFFER,ea(e))),this.geometryBuffers.set(e,r)}for(let[e,t]of[[0,`positions`],[1,`normals`]])n.bindBuffer(n.ARRAY_BUFFER,r.get(t)),n.enableVertexAttribArray(e),n.vertexAttribPointer(e,3,n.FLOAT,!1,0,0);if(e.lightUvs&&e.lightUvs.length!==e.positions.length/3*2)throw Error(`Geometry lightUvs count must match the vertex count.`);if(e.uvs||e.lightUvs){if(e.uvs&&e.uvs.length!==e.positions.length/3*2)throw Error(`Geometry UV count must match the vertex count.`);n.bindBuffer(n.ARRAY_BUFFER,r.get(`uvs`)),n.enableVertexAttribArray(13),n.vertexAttribPointer(13,e.lightUvs?4:2,n.FLOAT,!1,0,0)}else{if(ki(t)&&!t.boxMapScale)throw Error(`Textured geometry requires UV channel 0.`);n.disableVertexAttribArray(13),n.vertexAttrib2f(13,-1,-1)}if(e.colors&&e.colors.length!==e.positions.length)throw Error(`Geometry colors must contain RGB for every vertex.`);if(H(e)&&H(e).length!==e.positions.length/3)throw Error(`Geometry skyVisibility must hold one value for every vertex.`);e.colors||H(e)?(n.bindBuffer(n.ARRAY_BUFFER,r.get(`colors`)),n.enableVertexAttribArray(14),n.vertexAttribPointer(14,H(e)?4:3,n.FLOAT,!1,0,0)):(n.disableVertexAttribArray(14),n.vertexAttrib3f(14,1,1,1)),e.crowdPacked&&(n.bindBuffer(n.ARRAY_BUFFER,r.get(`crowdPacked`)),n.enableVertexAttribArray(14),n.vertexAttribPointer(14,4,n.FLOAT,!1,0,0)),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,r.get(`indices`))}pointInstanceAttributes(){for(let e=0;e<4;e++)this.attribute(2+e,4,168,e*16);for(let e=0;e<3;e++)this.attribute(6+e,3,168,64+e*12);this.attribute(9,3,168,100),this.attribute(10,4,168,112),this.attribute(11,3,168,128),this.attribute(12,3,168,140),this.attribute(15,4,168,152)}createCullingState(e){let t=e[0],n=Ri(e);if(t.lods&&(zi(t,t.lods),!n))throw RangeError(`lods need rigid or swaying, opaque parts without assembly motion: ${t.name}`);if(t.shadowLods&&(zi(t,t.shadowLods),!n))throw RangeError(`shadowLods need rigid or swaying, opaque parts without assembly motion: ${t.name}`);let r=t.lods??[{geometry:t.geometry,error:0}],i=t.crowd?.bounds??Fn(t.geometry),a={center:i.center,radius:i.radius+Math.max(...r.map(e=>e.error))},o=t.shadowLods?Vi(t.shadowLods,e.length):null;return{cullable:n,bounds:a,swayReach:Pr.has(t.material.tag)?Vr:0,...Vi(r,e.length),shadowLevels:o}}levelDraw(e,t,n=e){if(n.levelDraws[t])return n.levelDraws[t];let r=this.context,i=n===e&&t===0,a=i&&e.flushOrder?.geometry||n.levelGeometries[t],o=r.createVertexArray();r.bindVertexArray(o),this.bindGeometryAttributes(a,e.parts[0].material),e.flushIndexBuffer&&i&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.flushIndexBuffer);let s=r.createBuffer();return this.buffers.push(s),r.bindBuffer(r.ARRAY_BUFFER,s),r.bufferData(r.ARRAY_BUFFER,e.instanceData.byteLength,r.DYNAMIC_DRAW),this.pointInstanceAttributes(),r.bindVertexArray(null),n.levelDraws[t]={vertexArray:o,instanceBuffer:s,indexCount:a.indices.length},n.levelDraws[t]}releaseLevelDraws(e,t){for(let n of[e,e.shadowLevels])if(n){for(let e of n.levelDraws)e&&(this.context.deleteVertexArray(e.vertexArray),t?.add(e.instanceBuffer));n.levelDraws=[]}}selectBatchInstances(e){return!this.culling||!e.cullable?null:Vn(e.selection,{instanceData:e.instanceData,instanceCount:e.instanceCount,stride:B,bounds:e.bounds,margin:e.swayReach*Math.abs(this.windState.strength),levelErrors:e.levelErrors,planes:this.frustumPlanes,viewProjection:this.viewProjection,pixelsPerUnit:this.canvas.height/2*this.projection[5],pixelError:this.lodPixelError*(this.mirrorCulling?.lodScale??1),belowHeight:this.mirrorCulling?.belowHeight,minimumPixelRadius:this.mirrorCulling?.minimumPixelRadius})}drawSelectedLevels(e,t,n=e,r=null){let i=this.context,a=B;for(let o=0;o<t.counts.length;o++){let s=t.counts[o];if(s===0)continue;let c=this.levelDraw(e,o,n);this.selectionScratch?.length>=s*a||(this.selectionScratch=new Float32Array(s*a));for(let n=0;n<s;n++){let r=t.indices[o][n];this.selectionScratch.set(e.instanceData.subarray(r*a,(r+1)*a),n*a)}i.bindBuffer(i.ARRAY_BUFFER,c.instanceBuffer),i.bufferSubData(i.ARRAY_BUFFER,0,this.selectionScratch,0,s*a),i.bindVertexArray(c.vertexArray),r&&o===0?this.drawFlushRanges(e,r,s):i.drawElementsInstanced(i.TRIANGLES,c.indexCount,i.UNSIGNED_INT,0,s)}}drawFlushRanges(e,t,n){let r=this.context,i=(e.depthLayer??0)*16;for(let e of t)this.applyDepthRank(i+e.rank),r.drawElementsInstanced(r.TRIANGLES,e.count,r.UNSIGNED_INT,e.start*4,n);this.applyDepthRank(i)}uploadBatchData(e,t){let n=this.context,r=e[0].geometry;n.bindVertexArray(t);let i=Ut(e[0]);this.bindGeometryAttributes(i?.geometry??r,e[0].material);let a=i&&!i.geometry?this.uploadBuffer(n.ELEMENT_ARRAY_BUFFER,i.indices):null,o=B,s=new Float32Array(e.length*o),l=D();e.forEach((e,t)=>{O(l,e.matrix),Ii(s,t,e,l)});let u=this.uploadBuffer(n.ARRAY_BUFFER,s,n.DYNAMIC_DRAW);this.pointInstanceAttributes(),n.bindVertexArray(null);let d=e[0].material.map??null,f=_i(e[0].material),p=f.slice(0,5).map(e=>this.createTexture(e)),m=e[0].material.layers?c().createResources(this,e[0].material,c()):null,h=f[14]?this.createTexture(f[14]):null;if(h&&(e[0].skin||e[0].morph||!r.lightUvs))throw Error(`A light map needs lightUvs on rigid geometry, with no skin or morph.`);let g=e[0].skin??null,_=g?this.createSkinTexture(this.skinTextures,g,g.jointMatrices,4):null,v=g?this.createSkinTexture(this.influenceTextures,r,null,2):null,y=e[0].crowd??null,b=y?this.createSkinTexture(this.skinTextures,y,y.data,4):null,x=e[0].morph??null,S=x?this.createMorphTexture(r,x):null,C=x?new Float32Array(x.weights):null,[w,T,E,k]=xi(e[0].material),A=_n(e[0].material),j=this.createCullingState(e),M={...j,alphaMode:w,alphaCutoff:T,opacity:E,doubleSided:k,mirrored:Fi(e[0].matrix),layerState:A,wear:e[0].material.wear??null,parts:[...e],vertexArray:t,instanceBuffer:u,instanceData:s,textures:p,mapState:f,splat:m,lightMapTexture:h,texture:p[0],map:d,skin:g,skinTexture:_,influenceTexture:v,crowd:y,crowdTexture:b,morph:x,morphTexture:S,morphWeights:C,indexCount:i?.indices.length??r.indices.length,instanceCount:e.length,floor:e[0].material.tag===`floor`,castShadow:Si(e[0]),tintedShadow:Ci(e[0]),tintBlind:!!m||Object.keys(e[0].material.layerMaps??{}).length>=3,receivesShadow:wi(e[0]),compositeMode:Ti(e[0]),depthLayer:Wt(e[0]),flushOrder:i,flushIndexBuffer:a,pass:Xr(e[0].material)};return e[0].lods&&j.levelGeometries.forEach((e,t)=>this.levelDraw(M,t)),j.shadowLevels?.levelGeometries.forEach((e,t)=>this.levelDraw(M,t,M.shadowLevels)),e.forEach((e,t)=>this.partLocations.set(e,{batch:M,index:t,geometry:e.geometry,map:d,mapState:f,layerState:A,skin:g,jointMatrices:g?.jointMatrices,skinIndices:r.skinIndices,skinWeights:r.skinWeights,morph:x,morphWeights:x?.weights,morphTargets:r.morphTargets,normalMatrix:D(),committedMatrix:M.instanceData.subarray(t*B,t*B+16)})),M}replaceParts(e,{regroupOnly:t=!1,retainedUnchanged:n=!1}={}){if(!Array.isArray(e)||new Set(e).size!==e.length)throw TypeError(`Scene parts must be an array with distinct object identities.`);let r=this.groundPart?[...e,this.groundPart]:e;this.fitParts=r,this.fitBounds=void 0;let i=Xi(n?this.incrementalGrouping:null,e,this.groundPart,this.batching,n);this.incrementalGrouping=i.state;let o=i.batches,s=new Set(r.flatMap(Bi));for(let e of s)this.geometryBuffers.has(e)||ra(e);let c=new Set,l=o.map(e=>{let t=e[0],n=this.partLocations.get(t),r=n?.batch,i=_i(t.material),a=r?.parts.length===e.length&&r.parts.every((t,n)=>t===e[n]),o=xi(t.material),s=n?.geometry===t.geometry&&r?.castShadow===Si(t)&&r.receivesShadow===wi(t)&&r.compositeMode===Ti(t)&&(r.depthLayer??0)===Wt(t)&&(r.flushOrder??null)===Ut(t)&&r.floor===(t.material.tag===`floor`)&&Qr(r)===Xr(t.material)&&[r.alphaMode,r.alphaCutoff,r.opacity,r.doubleSided].every((e,t)=>e===o[t])&&r.mapState.every((e,t)=>e===i[t])&&r.layerState.every((e,n)=>e===_n(t.material)[n]);return a&&s?(c.add(r),{group:e,batch:r}):{group:e,batch:null}});for(let e of l)if(!e.batch&&e.group.some(e=>Zr(e,t||!!a.begin)))throw Error(`replaceParts can add or change only rigid, untextured parts. Keep textured, skinned and morphed parts unchanged, or import replace-textured-parts to add textured ones.`);for(let[e,n]of this.partLocations)if(!c.has(n.batch)&&(n.skin||n.morph||n.morphTargets||n.skinIndices||n.mapState.slice(0,5).some(Boolean)&&!a.begin&&!t))throw Error(`replaceParts can remove or regroup only existing rigid, untextured parts; ${e.name} is textured, skinned or morphed and needs a new renderer.`);let u=[...s].filter(e=>!this.geometryBuffers.has(e)).reduce((e,t)=>e+na(t),0),d=l.filter(e=>!e.batch).reduce((e,t)=>e+t.group.length*B*4,0),f=Ge(this.canvas.width,this.canvas.height,this.samples,2048,{hdr:this.hdr,bloom:!this.benchmark,depth:this.depth});if(f+this.textureBytes+this.geometryBytes+u+d>this.memoryBudgetMiB*1024*1024)throw Ue(this.geometryBytes+u+d,this.textureBytes,f,this.memoryBudgetMiB);let p=this.partLocations,m=[...this.buffers],h=this.geometryBytes,g=new Map(this.geometryBuffers),_=a.begin?.(this),v=new Map,y=[];this.partLocations=v;try{for(let e of l)if(e.batch){y.push(e.batch);for(let t of e.group)v.set(t,p.get(t))}else y.push(this.uploadBatch(e.group));let e=this.context.getError();if(e!==0)throw Error(`WebGL replacement allocation failed with error ${e}.`)}catch(e){for(let e of y)c.has(e)||(this.context.deleteVertexArray(e.vertexArray),this.releaseLevelDraws(e));for(let e of this.buffers.slice(m.length))this.context.deleteBuffer(e);throw this.context.bindVertexArray(null),this.buffers=m,this.geometryBytes=h,this.geometryBuffers=g,_?.(),this.partLocations=p,e}let b=new Set;for(let e of this.batches)c.has(e)||(this.context.deleteVertexArray(e.vertexArray),b.add(e.instanceBuffer),e.flushIndexBuffer&&b.add(e.flushIndexBuffer),this.releaseLevelDraws(e,b));for(let[e,t]of this.geometryBuffers)if(!s.has(e)){for(let e of t.values())b.add(e);this.geometryBuffers.delete(e)}for(let e of b)this.context.deleteBuffer(e);return this.buffers=this.buffers.filter(e=>!b.has(e)),_?.(this.batches,y),this.geometryBytes=[...s].reduce((e,t)=>e+na(t),0)+r.length*B*4,this.batches=y,this.partCount=e.length,this.triangles=e.reduce((e,t)=>e+t.geometry.indices.length/3,0),this.updateBatches.clear(),this.shadowsDirty=!0,this.updateParts(n?r.filter(e=>!c.has(this.partLocations.get(e)?.batch)):r),e.length}createSkinTexture(e,t,n,r){if(e.has(t))return e.get(t);let i=this.context,a=n?n.length/4:t.positions.length/3*2,o=Wi().skinTextureLayout(a,i.getParameter(i.MAX_TEXTURE_SIZE),r),s=n?new Float32Array(o.width*o.height*4):Wi().packSkinInfluences(t,o);n&&s.set(n);let c=this.createPackedTexture(o,s);return c.pose=n?t:null,e.set(t,c),c}createMorphTexture(e,t){if(this.morphTextures.has(e))return this.morphTextures.get(e);let n=Gi().validateMorphGeometry(e,t),r=Gi().skinTextureLayout(n.vertexCount*n.targetCount*2,this.context.getParameter(this.context.MAX_TEXTURE_SIZE),2),i=this.createPackedTexture(r,Gi().packMorphTargets(e,r));return i.info=n,this.morphTextures.set(e,i),i}createPackedTexture(e,t){let n=this.context,r=n.createTexture();n.bindTexture(n.TEXTURE_2D,r);try{n.texImage2D(n.TEXTURE_2D,0,n.RGBA32F,e.width,e.height,0,n.RGBA,n.FLOAT,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}catch(e){throw n.deleteTexture(r),e}return{...e,texture:r,data:t}}updateParts(e,{shadows:t=!0,checks:n=!0}={}){if(typeof n!=`boolean`)throw TypeError(`updateParts checks must be a boolean.`);this.updatePartIdentities??=new Set,this.updatePartIdentities.clear(),this.updateSkins.clear(),this.updateMorphs??=new Set,this.updateMorphs.clear(),this.updateBatches.clear();let r=this.updateLocations??=[];r.length=e.length;let i=!1;for(let t=0;t<e.length;t++){let a=e[t],o=this.partLocations.get(a);if(!o)throw Error(`Unknown part identity: ${a.name}`);if(r[t]=o,(a.skin||a.morph)&&this.updatePartIdentities.add(a),Di(a),Si(a)!==o.batch.castShadow)throw Error(`Shadow casting changes require a new renderer: ${a.name}`);if(wi(a)!==o.batch.receivesShadow||Ti(a)!==o.batch.compositeMode)throw Error(`receiveShadow, holdout and shadowCatcher changes require replaceParts: ${a.name}`);if(Wt(a)!==(o.batch.depthLayer??0))throw Error(`depthLayer changes require replaceParts: ${a.name}`);let s=o.materialSnapshot?.matches(a.material)===!0;if(!s){let e=xi(a.material),t=[o.batch.alphaMode,o.batch.alphaCutoff,o.batch.opacity,o.batch.doubleSided];if(e.some((e,n)=>e!==t[n]))throw Error(`Alpha mode, cutoff, double-sided and mask opacity changes require a new renderer (blend and add opacity may change): ${a.name}`)}if(a.geometry!==o.geometry)throw Error(`Geometry changes require a new renderer: ${a.name}`);if(Fi(a.matrix)!==!!o.batch.mirrored&&(i=!0),!s&&Xr(a.material)!==Qr(o.batch))throw Error(`Moving a part into or out of the liquid or foam pass requires replaceParts: ${a.name}`);if((a.skin??null)!==o.skin||a.skin?.jointMatrices!==o.jointMatrices||a.geometry.skinIndices!==o.skinIndices||a.geometry.skinWeights!==o.skinWeights)throw Error(`Skin identity changes require a new renderer: ${a.name}`);if(a.skin){if(Nr.has(a.material.tag))throw Error(`Skinned parts require a standard material tag.`);n&&Wi().validateSkinPose(a.skin,a.geometry,a.matrix),this.updateSkins.add(o.batch.skinTexture)}if((a.morph??null)!==(o.morph??null)||a.morph?.weights!==o.morphWeights||a.geometry.morphTargets!==o.morphTargets)throw Error(`Morph identity changes require a new renderer: ${a.name}`);if(a.morph){if(Nr.has(a.material.tag))throw Error(`Morphed parts require a standard material tag.`);n&&Gi().validateMorphTransform(a.morph,o.batch.morphTexture.info,a.matrix,a.skin),this.updateMorphs.add(a.morph)}if(s){Ni(a,o.normalMatrix);continue}if((a.material.map??null)!==o.map)throw Error(`Texture map changes require a new renderer: ${a.name}`);pi(a.material);let c=a.material.normalScale??jr,l=o.mapState;for(let e=0;e<V.length;e++)if((a.material[V[e]]??null)!==l[e])throw Error(`Material map or scale changes require a new renderer: ${a.name}`);let[u,d]=vi(a.material);if(u!==(l[14]??null)||d!==(l[15]??0)||(a.material.layerMaps??null)!==(l[18]??null))throw Error(`Light map and layer texture changes require a new renderer: ${a.name}`);if(c[0]!==l[5]||c[1]!==l[6]||(a.material.occlusionStrength??1)!==l[7]||gi(a.material).some((e,t)=>e!==l[8+t])||_n(a.material).some((e,t)=>e!==o.layerState[t]))throw Error(`Material map or scale changes require a new renderer: ${a.name}`);Ni(a,o.normalMatrix),o.materialSnapshot=gr.of(a.material)}if(i)return this.replaceParts([...this.partLocations.keys()].filter(e=>e!==this.groundPart),{regroupOnly:!0}),e.length;if(n&&this.updateSkins.size)for(let[e,t]of this.partLocations){if(!t.skin||!this.updateSkins.has(t.batch.skinTexture)||this.updatePartIdentities.has(e))continue;let n=t.committedMatrix??t.batch.instanceData.subarray(t.index*B,t.index*B+16);Wi().validateSkinPose(t.skin,t.geometry,n)}if(n&&(this.updateMorphs.size||this.updateSkins.size))for(let[e,t]of this.partLocations){if(!t.morph||this.updatePartIdentities.has(e)||!this.updateMorphs.has(t.morph)&&!this.updateSkins.has(t.batch.skinTexture))continue;let n=t.committedMatrix??t.batch.instanceData.subarray(t.index*B,t.index*B+16);Gi().validateMorphTransform(t.morph,t.batch.morphTexture.info,n,t.skin)}this.updateBatches.clear();for(let t=0;t<e.length;t++){let n=e[t],i=r[t];qr.has(n.material.tag)&&!this.shaderFeatures?.has(n.material.tag)&&this.requireShaderFeatures([n]),Ii(i.batch.instanceData,i.index,n,i.normalMatrix),this.updateBatches.add(i.batch)}for(let e of this.updateBatches)this.context.bindBuffer(this.context.ARRAY_BUFFER,e.instanceBuffer),this.context.bufferSubData(this.context.ARRAY_BUFFER,0,e.instanceData);for(let e of this.updateSkins){let t=e.pose;e.data.set(t.jointMatrices),this.context.bindTexture(this.context.TEXTURE_2D,e.texture),this.context.texSubImage2D(this.context.TEXTURE_2D,0,0,0,e.width,e.height,this.context.RGBA,this.context.FLOAT,e.data)}for(let e of this.batches??[])e.morph&&this.updateMorphs.has(e.morph)&&e.morphWeights.set(e.morph.weights);return t&&e.length>0&&(this.shadowsDirty=!0),e.length}attribute(e,t,n,r){this.context.enableVertexAttribArray(e),this.context.vertexAttribPointer(e,t,this.context.FLOAT,!1,n,r),this.context.vertexAttribDivisor(e,1)}shadowMapSizeWanted(){return this.batches.some(e=>!e.floor&&e.castShadow&&!this.tintsShadow(e))&&!this.shadowCascades?.replacesSingleMap(this)?Sr:1}createShadowMap(){let e=this.context,t=this.shadowMapSizeWanted();if(this.shadowTexture??=e.createTexture(),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.shadowTexture),t!==this.shadowMapSize&&(this.shadowMapSize=t,e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT24,t,t,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),this.renderTargets.record(`shadowMap`,{width:t,height:t,format:`DEPTH_COMPONENT24`})),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),this.shadowFramebuffer||=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,this.shadowFramebuffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,this.shadowTexture,0),e.drawBuffers([e.NONE]),e.readBuffer(e.NONE),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw Error(`Shadow framebuffer is incomplete.`);let n=zt(this.world,this.activeLightDirection,this.shadowBounds),r=E(v(),n.eye,n.target,n.up??[0,1,0]);T(this.lightProjection,-n.extent,n.extent,-n.extent,n.extent,n.near,n.far),x(this.lightProjection,this.lightProjection,r),e.viewport(0,0,t,t),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.clear(e.DEPTH_BUFFER_BIT),this.shadowBiasPerSlope=Vt(n,Sr),this.drawShadowCasters(this.lightProjection,t,!0),this.drawTintedShadows(),e.bindFramebuffer(e.FRAMEBUFFER,null),this.shadowsDirty=!1}tintsShadow(e){return!!(this.tintedShadowsActive&&e.tintedShadow)}bindPlaceholderOpaqueShadow(){let e=this.context;e.activeTexture(e.TEXTURE0+ui),this.placeholderShadowTexture||(this.placeholderShadowTexture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.placeholderShadowTexture),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT24,1,1,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE)),e.bindTexture(e.TEXTURE_2D,this.placeholderShadowTexture),e.activeTexture(e.TEXTURE0)}allocateTintTarget(){let e=this.context;if(this.tintTexture=e.createTexture(),e.activeTexture(e.TEXTURE0+ci),e.bindTexture(e.TEXTURE_2D,this.tintTexture),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,li,li,0,e.RGBA,e.HALF_FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),this.renderTargets.record(`tintShadow`,{width:li,height:li,format:`RGBA16F`}),this.tintFramebuffer=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,this.tintFramebuffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.tintTexture,0),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw Error(`Tinted shadow framebuffer is incomplete.`)}drawTintedShadows(){let e=this.batches.filter(e=>!e.floor&&e.castShadow&&this.tintsShadow(e));if(e.length===0)return;let t=this.context;this.tintFramebuffer||this.allocateTintTarget(),t.bindFramebuffer(t.FRAMEBUFFER,this.tintFramebuffer),t.viewport(0,0,li,li),t.activeTexture(t.TEXTURE0+ui),t.bindTexture(t.TEXTURE_2D,this.shadowTexture),t.activeTexture(t.TEXTURE0),t.useProgram(this.depthProgram);let n=this.depthAlphaUniforms;t.uniform1f(n.tintMapSize,li),t.uniform1f(n.tintBias,this.shadowBiasPerSlope*2),t.uniform1f(n.tintPass,1),t.disable(t.DEPTH_TEST),t.enable(t.BLEND),t.blendEquationSeparate(t.FUNC_ADD,t.MIN),t.blendFuncSeparate(t.DST_COLOR,t.ZERO,t.ONE,t.ONE),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.POLYGON_OFFSET_FILL),t.polygonOffset(1,1);for(let r of e)this.applyAlphaState(r,!1),t.uniform1f(n.tintTransmission,r.layerState[9]),this.drawBatch(r,!1,this.selectShadowInstances(r,r,this.lightProjection,li),r);t.disable(t.POLYGON_OFFSET_FILL),t.enable(t.CULL_FACE),t.disable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.enable(t.DEPTH_TEST),t.uniform1f(n.tintPass,0)}bindTintedShadows(){if(!this.tintedShadowsActive||!this.tintTexture)return;let e=this.context;e.activeTexture(e.TEXTURE0+ci),e.bindTexture(e.TEXTURE_2D,this.tintTexture),e.uniform1i(this.uniforms.tintShadowMap,ci),e.activeTexture(e.TEXTURE0)}selectShadowInstances(e,t,n,r){if(!this.culling||!e.cullable)return null;let i=In(n,this.shadowFrustumPlanes??=new Float32Array(24)),a=n[3]===0&&n[7]===0&&n[11]===0&&n[15]===1,o=!!r&&a&&t.levelErrors.length>1,s=o?Math.hypot(n[0],n[4],n[8])*r/2:0;return Vn(t.selection,{instanceData:e.instanceData,instanceCount:e.instanceCount,stride:B,bounds:e.bounds,margin:e.swayReach*Math.abs(this.windState.strength),levelErrors:o?t.levelErrors:[0],planes:i,viewProjection:n,pixelsPerUnit:s,pixelError:this.lodPixelError})}drawShadowCasters(e=this.lightProjection,t=null,n=!1){let r=this.context;r.useProgram(this.depthProgram),r.uniformMatrix4fv(this.depthUniform,!1,e),r.uniform1f(this.depthAssemblyUniform,this.assemblyAmount??0),r.uniform1f(this.depthWindUniforms.time,this.windState.time),r.uniform1f(this.depthWindUniforms.wind,this.windState.strength),r.uniform1i(this.depthAlphaUniforms.baseMap,1),this.tintedShadowsActive&&(r.uniform1f(this.depthAlphaUniforms.tintPass,0),r.uniform1i(this.depthAlphaUniforms.opaqueShadow,ui),this.bindPlaceholderOpaqueShadow()),r.enable(r.POLYGON_OFFSET_FILL),r.polygonOffset(1,1);for(let r of this.batches){if(r.floor||!r.castShadow||r.tintedShadow&&(n&&this.tintedShadowsActive||r.alphaMode===`blend`&&r.parts[0].castShadow!==!0))continue;let i=r.shadowLevels??r,a=this.selectShadowInstances(r,i,e,t);a?.visibleCount!==0&&(this.applyAlphaState(r,!1),this.drawBatch(r,!1,a,i))}r.disable(r.POLYGON_OFFSET_FILL),r.enable(r.CULL_FACE)}allocateLocalShadowAtlas(e){let t=this.context;if(this.localShadowTexture&&t.deleteTexture(this.localShadowTexture),this.localShadowFramebuffer&&t.deleteFramebuffer(this.localShadowFramebuffer),this.localShadowAtlasHeight=Math.ceil(e/4)*512,this.localShadowTexture=t.createTexture(),t.activeTexture(t.TEXTURE0+si),t.bindTexture(t.TEXTURE_2D,this.localShadowTexture),t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT24,ir,this.localShadowAtlasHeight,0,t.DEPTH_COMPONENT,t.UNSIGNED_INT,null),this.renderTargets.record(`localShadowAtlas`,{width:ir,height:this.localShadowAtlasHeight,format:`DEPTH_COMPONENT24`}),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),this.localShadowFramebuffer=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,this.localShadowFramebuffer),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,this.localShadowTexture,0),t.drawBuffers([t.NONE]),t.readBuffer(t.NONE),t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE)throw Error(`Local shadow framebuffer is incomplete.`);t.activeTexture(t.TEXTURE0)}updateLocalShadows(e){let t=this.lighting.shadowCasters;if(t.length===0||this.benchmark)return;let n=this.localShadowMatrices??=new Float32Array(384),r=this.localShadowTexelAngles??=new Float32Array(24),i=this.localShadowPreviousMatrices??=new Float32Array(384),a=new Float32Array(16);if(t.forEach((e,t)=>{r[t]=pr(e,a),n.set(a,t*16)}),!(t.length!==this.localShadowTileCount||n.some((e,t)=>e!==i[t]))&&!e&&this.localShadowTexture)return;i.set(n),this.localShadowTileCount=t.length;let o=this.context;(!this.localShadowTexture||Math.ceil(t.length/4)*512>this.localShadowAtlasHeight)&&this.allocateLocalShadowAtlas(t.length),o.bindFramebuffer(o.FRAMEBUFFER,this.localShadowFramebuffer),o.viewport(0,0,ir,this.localShadowAtlasHeight),o.enable(o.DEPTH_TEST),o.clear(o.DEPTH_BUFFER_BIT);for(let e=0;e<t.length;e++)o.viewport(...mr(e)),this.drawShadowCasters(n.subarray(e*16,e*16+16));o.bindFramebuffer(o.FRAMEBUFFER,null)}updateWindState(e){let t={time:e.time??0,strength:e.wind??.3},n=this.windState;return this.windState=t,n.time===t.time&&n.strength===t.strength?!1:this.batches.some(e=>e.castShadow&&Pr.has(e.parts[0].material.tag))}resize(){let e=Ke({width:Math.max(1,this.canvas.clientWidth),height:Math.max(1,this.canvas.clientHeight),pixelRatio:this.pixelRatio,samples:this.samples,memoryBudgetMiB:this.memoryBudgetMiB,geometryBytes:this.geometryBytes,textureBytes:this.textureBytes,hdr:this.hdr,bloom:!this.benchmark,depth:this.depth,maximumSize:Math.min(this.context.getParameter(this.context.MAX_RENDERBUFFER_SIZE),this.context.getParameter(this.context.MAX_TEXTURE_SIZE))}),{width:t,height:n}=e;this.memoryPlan=e,(this.canvas.width!==t||this.canvas.height!==n)&&(this.canvas.width=t,this.canvas.height=n,this.benchmark||this.allocateFrameTargets(t,n)),C(this.projection,this.world?Math.PI/4:Math.PI/5.5,t/n,.1,this.world?600:100)}withFittedNear(e){if(this.reversedDepth||e.near!==void 0||e.projection===`orthographic`||(this.fitBounds===void 0&&(this.fitBounds=Kn(this.fitParts)),!this.fitBounds))return e;let t=e.far??(this.world?600:100),n=Jn(this.fitBounds,this.view,t);return n===.1?e:{...e,near:n}}memoryReport(){return this.renderTargets.report()}releaseFrameTargets(){let e=this.context;this.multisampleFramebuffer&&e.deleteFramebuffer(this.multisampleFramebuffer),this.resolveFramebuffer&&e.deleteFramebuffer(this.resolveFramebuffer),this.multisampleColor&&e.deleteRenderbuffer(this.multisampleColor),this.multisampleDepth&&e.deleteRenderbuffer(this.multisampleDepth),this.frameTexture&&e.deleteTexture(this.frameTexture),this.depthTexture&&e.deleteTexture(this.depthTexture);for(let t of this.bloomTargets??[])e.deleteTexture(t.texture),e.deleteFramebuffer(t.framebuffer);this.bloomTargets=[],this.renderTargets.release(`multisampleColor`,`multisampleDepth`,`frameColor`,`sceneDepth`,`bloomA`,`bloomB`),this.releaseOcclusionTarget(),this.passSupport?.releaseTargets(e);for(let t of this.postStages??[])t.releaseTargets(e);this.multisampleFramebuffer=null,this.resolveFramebuffer=null,this.multisampleColor=null,this.multisampleDepth=null,this.frameTexture=null,this.depthTexture=null}releaseOcclusionTarget(){this.occlusionTarget&&=(this.context.deleteTexture(this.occlusionTarget.texture),this.context.deleteFramebuffer(this.occlusionTarget.framebuffer),this.renderTargets.release(`ambientOcclusion`),null)}drawsInOpaqueLoop(e){return Qr(e)===`opaque`&&!Dr(e.alphaMode)}ensureOcclusionTarget(){let e=this.context;if(!this.occlusionProgram){this.occlusionProgram=Ve(e,Fe,jn);let t=[`sceneDepth`,`inverseViewProjection`,`radius`,`projectionScale`,`aspect`,`orthographic`];this.occlusionUniforms=Object.fromEntries(t.map(t=>[t,e.getUniformLocation(this.occlusionProgram,t)]))}if(this.occlusionTarget)return;let t=Math.max(1,Math.ceil(this.canvas.width/2)),n=Math.max(1,Math.ceil(this.canvas.height/2)),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.R8,t,n,0,e.RED,e.UNSIGNED_BYTE,null),this.renderTargets.record(`ambientOcclusion`,{width:t,height:n,format:`R8`}),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),this.occlusionTarget={texture:r,framebuffer:i,width:t,height:n}}drawAmbientOcclusion(e,t){let n=this.context;this.ensureOcclusionTarget();let r=this.occlusionUniforms;n.bindFramebuffer(n.FRAMEBUFFER,this.occlusionTarget.framebuffer),n.viewport(0,0,this.occlusionTarget.width,this.occlusionTarget.height),n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.bindVertexArray(null),n.useProgram(this.occlusionProgram),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.depthTexture),n.uniform1i(r.sceneDepth,1),n.uniformMatrix4fv(r.inverseViewProjection,!1,b([],this.projection)),n.uniform1f(r.radius,t.ambientOcclusionRadius),n.uniform1f(r.projectionScale,.5*this.projection[5]),n.uniform1f(r.aspect,this.canvas.width/this.canvas.height),n.uniform1f(r.orthographic,+(e.projection===`orthographic`)),n.drawArrays(n.TRIANGLES,0,3)}allocateFrameTargets(e,t){let n=this.context;this.releaseFrameTargets(),this.multisampleFramebuffer=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,this.multisampleFramebuffer),this.multisampleColor=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,this.multisampleColor),n.renderbufferStorageMultisample(n.RENDERBUFFER,this.multisampleSamples,this.hdr?n.RGBA16F:n.RGBA8,e,t),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,this.multisampleColor),this.multisampleDepth=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,this.multisampleDepth);let r=`DEPTH_COMPONENT24`;if(n.renderbufferStorageMultisample(n.RENDERBUFFER,this.multisampleSamples,n[r],e,t),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,this.multisampleDepth),n.checkFramebufferStatus(n.FRAMEBUFFER)!==n.FRAMEBUFFER_COMPLETE)throw Error(`Multisample framebuffer allocation failed. Choose a lower quality preset.`);if(this.renderTargets.record(`multisampleColor`,{width:e,height:t,format:this.hdr?`RGBA16F`:`RGBA8`,samples:this.multisampleSamples}),this.renderTargets.record(`multisampleDepth`,{width:e,height:t,format:r,samples:this.multisampleSamples}),this.renderTargets.record(`frameColor`,{width:e,height:t,format:this.hdr?`RGBA16F`:`RGBA8`}),this.frameTexture=n.createTexture(),n.bindTexture(n.TEXTURE_2D,this.frameTexture),n.texImage2D(n.TEXTURE_2D,0,this.hdr?n.RGBA16F:n.RGBA8,e,t,0,n.RGBA,this.hdr?n.HALF_FLOAT:n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),this.resolveFramebuffer=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,this.resolveFramebuffer),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,this.frameTexture,0),this.depth&&(this.depthTexture=n.createTexture(),n.bindTexture(n.TEXTURE_2D,this.depthTexture),n.texImage2D(n.TEXTURE_2D,0,n.DEPTH_COMPONENT24,e,t,0,n.DEPTH_COMPONENT,n.UNSIGNED_INT,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,this.depthTexture,0),this.renderTargets.record(`sceneDepth`,{width:e,height:t,format:`DEPTH_COMPONENT24`})),n.checkFramebufferStatus(n.FRAMEBUFFER)!==n.FRAMEBUFFER_COMPLETE)throw Error(`Resolve framebuffer allocation failed. Choose a lower quality preset.`);this.bloomWidth=Math.max(1,Math.ceil(e/2)),this.bloomHeight=Math.max(1,Math.ceil(t/2)),n.bindFramebuffer(n.FRAMEBUFFER,null)}startEnvironmentPrograms(){this.pendingEnvironmentPrograms=new Map;for(let e of[R().prefilterFragment,R().brdfFragment])this.pendingEnvironmentPrograms.set(e,N(this.context,Fe,e))}compileEnvironmentProgram(e,t,n){let r=this.pendingEnvironmentPrograms?.get(n);return r?(this.pendingEnvironmentPrograms.delete(n),P(e,r)):Ve(e,t,n)}initializeEnvironment(e){let t=this.context;t.useProgram(this.program),t.uniform1i(this.uniforms.environmentSpecular,ai),t.uniform1i(this.uniforms.environmentBrdf,oi),this.liquidProgram&&(t.useProgram(this.liquidProgram),t.uniform1i(this.liquidUniforms.environmentSpecular,ai)),this.bindEnvironmentTextures(this.whiteTexture,this.whiteTexture),!this.benchmark&&e&&!this.deferEnvironmentPrefilter&&this.prepareEnvironment(e)}bindEnvironmentTextures(e,t){let n=this.context;n.activeTexture(n.TEXTURE0+ai),n.bindTexture(n.TEXTURE_2D,e),n.activeTexture(n.TEXTURE0+oi),n.bindTexture(n.TEXTURE_2D,t)}prepareEnvironment(e){if(R().assertMap(e),this.environmentResources?.data===e.data&&this.environmentResources.irradianceSource===e.irradianceSource)return!1;R().estimateBytes(e,this.capabilities.maximumTextureSize);let t=R().createResources(this.context,e,{compileProgram:(e,t,n)=>this.compileEnvironmentProgram(e,t,n),fullscreenVertex:Fe});return this.environmentResources?.dispose(),this.environmentResources=t,this.textureBytes+=t.bytes-this.environmentBytes,this.environmentBytes=t.bytes,!0}async prepareEnvironmentInSlices(e,t){if(R().assertMap(e),this.environmentResources?.data===e.data&&this.environmentResources.irradianceSource===e.irradianceSource)return!1;R().estimateBytes(e,this.capabilities.maximumTextureSize);let n=await R().createResourcesInSlices(this.context,e,{compileProgram:(e,t,n)=>this.compileEnvironmentProgram(e,t,n),fullscreenVertex:Fe},t);return this.environmentResources?.dispose(),this.environmentResources=n,this.textureBytes+=n.bytes-this.environmentBytes,this.environmentBytes=n.bytes,!0}activateEnvironment(e){return this.activeMap=this.benchmark?null:e,this.benchmark||!e?(this.bindEnvironmentTextures(this.whiteTexture,this.whiteTexture),null):(this.prepareEnvironment(e)&&this.resize(),this.bindEnvironmentTextures(this.environmentResources.specularTexture,this.environmentResources.brdfTexture),e)}applyEnvironmentUniforms(e,t=this.uniforms){let n=this.context;n.uniform1f(t.environmentEnabled,+!!e),e&&(t[`environmentIrradiance[0]`]&&n.uniform3fv(t[`environmentIrradiance[0]`],e.irradianceWithBounce?.(this.environmentResources.irradiance)??this.environmentResources.irradiance),n.uniform1f(t.environmentIntensity,e.intensity),n.uniform2f(t.environmentRotation,Math.cos(e.rotation),Math.sin(e.rotation)),n.uniform1f(t.environmentLevelMax,this.environmentResources.levelCount-1))}drawEnvironmentBackground(e,t,n){if(!e?.showBackground||this.transparent)return!1;let r=this.context;if(!this.environmentBackgroundProgram){this.environmentBackgroundProgram=Ve(r,Fe,this.withViewTransform(R().backgroundFragment,`background`));let e=[`inverseViewProjection`,`eye`,`backgroundLevel`,`exposure`,`hdrEnabled`,`environmentSpecular`,`environmentRotation`,`environmentIntensity`,`environmentLevelMax`];this.environmentBackgroundUniforms=Object.fromEntries(e.map(e=>[e,r.getUniformLocation(this.environmentBackgroundProgram,e)]))}let i=this.environmentBackgroundUniforms,a=this.environmentResources.levelCount-1;return r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.bindVertexArray(null),r.useProgram(this.environmentBackgroundProgram),r.uniformMatrix4fv(i.inverseViewProjection,!1,this.inverseViewProjection),r.uniform3fv(i.eye,t.eye),r.uniform1f(i.backgroundLevel,e.backgroundBlur*a),r.uniform1f(i.exposure,n),r.uniform1f(i.hdrEnabled,+!!this.hdr),r.uniform1i(i.environmentSpecular,ai),r.uniform2f(i.environmentRotation,Math.cos(e.rotation),Math.sin(e.rotation)),r.uniform1f(i.environmentIntensity,e.intensity),r.uniform1f(i.environmentLevelMax,a),r.drawArrays(r.TRIANGLES,0,3),!0}drawSky(e){let t=this.context,n={skyTop:[.2,.38,.52],skyBottom:[.62,.7,.67],lightDirection:[-3,6,4],daylight:1,...this.environment,...e.environment};t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.bindVertexArray(null),t.useProgram(this.skyProgram),t.uniform3fv(this.skyUniforms.skyTop,n.skyTop),t.uniform3fv(this.skyUniforms.skyBottom,n.skyBottom),t.uniform3fv(this.skyUniforms.sunDirection,n.lightDirection),t.uniformMatrix4fv(this.skyUniforms.inverseViewProjection,!1,this.inverseViewProjection),t.uniform3fv(this.skyUniforms.eye,e.eye),t.uniform1f(this.skyUniforms.time,e.time??0),t.uniform1f(this.skyUniforms.daylight,n.daylight),t.uniform1f(this.skyUniforms.hdrEnabled,+!!this.hdr),t.drawArrays(t.TRIANGLES,0,3)}prepareLocalVolumes(e,t){return e===void 0||Array.isArray(e)&&e.length===0?!1:d(`volumeFog`).support.prepareLocalVolumes(this,e,t)>0}postStepsOf(e,t,n,r,i,a){let o=[];return this.transparent&&o.push(`transparent`),r&&o.push(`occlusion`),t.bloom.strength>0&&o.push(`bloom`),n.density>0&&o.push(`volume`),n.density>0&&n.field&&o.push(`field`),n.density>0&&d(`volumeFog`).support.usesDetail(n)&&o.push(`detail`),n.density>0&&this.fogLightBuffers?.count>0&&o.push(`lights`),a&&o.push(`local`),i&&o.push(`sky`),e.volumeExplosion&&o.push(`explosion`),(t.saturation!==1||t.contrast!==1||t.temperature!==0||(e.monochrome??0)!==0||e.cinematic||t.vignette!==0||t.grain!==0)&&o.push(`finish`),o}selectPostProgram(e){if(e.join()===Cn.join())return{program:this.postProgram,uniforms:this.postUniforms};let t=e.join(`,`),n=this.postVariants.get(t);if(n||(n={pending:N(this.context,`#version 300 es
precision highp float;
out vec2 textureCoordinate;
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  textureCoordinate = position;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}`,this.withViewTransform(kn(e),`post`))},this.postVariants.set(t,n)),n.pending){let t=this.context.getExtension(`KHR_parallel_shader_compile`);if(t&&!Sn.some(t=>e.includes(t))&&!this.context.getProgramParameter(n.pending.program,t.COMPLETION_STATUS_KHR))return{program:this.postProgram,uniforms:this.postUniforms};n.program=P(this.context,n.pending),n.uniforms=Ur(this.context,n.program),n.pending=null}return n}restoreSingleLevelFiltering(){if(!this.mipmappedTexture)return;let e=this.context;e.bindTexture(e.TEXTURE_2D,this.mipmappedTexture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),this.mipmappedTexture=null}resolveFrame(e,t,r,i){let a=this.context;a.bindFramebuffer(a.READ_FRAMEBUFFER,this.multisampleFramebuffer),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,this.resolveFramebuffer),a.blitFramebuffer(0,0,this.canvas.width,this.canvas.height,0,0,this.canvas.width,this.canvas.height,a.COLOR_BUFFER_BIT|(this.depth?a.DEPTH_BUFFER_BIT:0),a.NEAREST),this.restoreSingleLevelFiltering();let o=this.frameTexture;for(let n of this.postStages)o=n.apply(this,e,t,o)??o;t.bloom.strength>0&&this.drawBloom(t.bloom,o);let s=t.ambientOcclusion>0&&!!this.depthTexture;s&&this.drawAmbientOcclusion(e,t),a.bindFramebuffer(a.FRAMEBUFFER,e.outputFramebuffer??null),a.viewport(0,0,this.canvas.width,this.canvas.height),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.bindVertexArray(null);let c=this.fogSkyVisibility?.(this.sceneParts,i,a,r),l=i.density>0?d(`volumeFog`).support:null,u=this.prepareLocalVolumes(r.localVolumes,e);l?l.packLights(this):this.fogLightBuffers&&(this.fogLightBuffers.count=0);let f=this.selectPostProgram(this.postStepsOf(e,t,i,s,c,u));a.useProgram(f.program),this.look&&n.bindLook(this,f.program),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,o),i.density>0?(a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),this.mipmappedTexture=o):this.mipmappedTexture===o&&(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),this.mipmappedTexture=null),a.uniform1i(f.uniforms.frameTexture,0),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this.depthTexture??this.whiteTexture),a.uniform1i(f.uniforms.sceneDepth,1),l?.bindUniforms(this,f,i,r,e),u&&d(`volumeFog`).support.bindLocalVolumes(this,f,e),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,t.bloom.strength>0?this.bloomTargets[1].texture:this.whiteTexture),a.uniform1i(f.uniforms.bloomTexture,2),a.uniform1f(f.uniforms.bloomStrength,t.bloom.strength),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,s?this.occlusionTarget.texture:this.whiteTexture),a.uniform1i(f.uniforms.occlusionTexture,4),a.uniform1f(f.uniforms.occlusionStrength,s?t.ambientOcclusion:0),a.uniform2f(f.uniforms.occlusionTexel,1/Math.ceil(this.canvas.width/2),1/Math.ceil(this.canvas.height/2)),a.uniform1f(f.uniforms.transparent,+!!this.transparent),a.uniform1f(f.uniforms.hdrEnabled,+!!this.hdr),a.uniform3f(f.uniforms.grade,t.saturation,t.contrast,t.temperature),a.uniform1f(f.uniforms.vignette,t.vignette),a.uniform1f(f.uniforms.grainAmount,t.grain),a.uniform2f(f.uniforms.resolution,this.canvas.width,this.canvas.height),a.uniform1f(f.uniforms.monochrome,e.monochrome??0),a.uniform1f(f.uniforms.fade,e.fade??0),a.uniform1f(f.uniforms.cinematic,+!!e.cinematic),a.uniform1f(f.uniforms.time,e.time??0),a.uniform1f(f.uniforms.volumeExplosion,+!!e.volumeExplosion),a.uniform1f(f.uniforms.explosionProgress,e.explosionProgress??1),a.uniformMatrix4fv(f.uniforms.inverseViewProjection,!1,this.inverseViewProjection),a.uniform3fv(f.uniforms.eye,e.eye),a.drawArrays(a.TRIANGLES,0,3)}drawTranslucent(e,t,n,r){this.activateEnvironment(r);let i=this.batches.filter(e=>Qr(e)===`liquid`),a=this.batches.filter(e=>Qr(e)===`foam`);(i.length!==0||a.length!==0)&&Ee()(this,{frame:e,environment:t,assemblyAmount:n,environmentMap:r,liquids:i,foams:a,environmentSpecularUnit:ai,maximumDistance:Tr,vertexSource:Ne,fragmentSource:Te()})}ensureBloomTargets(){if(this.bloomTargets.length>0)return;let e=this.context;for(let t=0;t<2;t++){let t=e.createTexture(),n=e.createFramebuffer();if(this.bloomTargets.push({texture:t,framebuffer:n}),e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,this.hdr?e.RGBA16F:e.RGBA8,this.bloomWidth,this.bloomHeight,0,e.RGBA,this.hdr?e.HALF_FLOAT:e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw Error(`Bloom framebuffer allocation failed. Choose a lower quality preset.`)}e.bindFramebuffer(e.FRAMEBUFFER,null),this.renderTargets.record(`bloomA`,{width:this.bloomWidth,height:this.bloomHeight,format:this.hdr?`RGBA16F`:`RGBA8`}),this.renderTargets.record(`bloomB`,{width:this.bloomWidth,height:this.bloomHeight,format:this.hdr?`RGBA16F`:`RGBA8`})}drawBloom(e,t=this.frameTexture){let n=this.context;this.ensureBloomTargets(),n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.bindVertexArray(null),n.useProgram(this.bloomProgram),n.viewport(0,0,this.bloomWidth,this.bloomHeight),n.uniform1i(this.bloomUniforms.sourceTexture,0),n.uniform1f(this.bloomUniforms.threshold,e.threshold);for(let r=0;r<2;r++)n.bindFramebuffer(n.FRAMEBUFFER,this.bloomTargets[r].framebuffer),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r===0?t:this.bloomTargets[0].texture),n.uniform1f(this.bloomUniforms.extract,+(r===0)),n.uniform2f(this.bloomUniforms.texelDirection,r===0?e.radius/this.bloomWidth:0,r===1?e.radius/this.bloomHeight:0),n.drawArrays(n.TRIANGLES,0,3)}applyAlphaState(e,n){let r=this.context;e.doubleSided||!n?r.disable(r.CULL_FACE):r.enable(r.CULL_FACE);let i=e.alphaMode===`mask`;if(!n){let n=this.depthAlphaUniforms;r.uniform1f(n.alphaMasked,+!!i),r.uniform1f(n.alphaCutoff,e.alphaCutoff),r.uniform1f(n.materialOpacity,e.opacity),r.uniform1f(n.hasBaseMap,+!!e.mapState[0]),t.bindDepth?.(this,e),(i||e.tintedShadow)&&(r.activeTexture(r.TEXTURE0+1),r.bindTexture(r.TEXTURE_2D,e.textures[0]));return}this.applyDepthRank((e.depthLayer??0)*16);let a=i&&this.samples>1&&!this.benchmark&&!this.renderingPass;a?r.enable(r.SAMPLE_ALPHA_TO_COVERAGE):r.disable(r.SAMPLE_ALPHA_TO_COVERAGE);let o=this.uniforms;r.uniform1f(o.alphaMode,Er[e.alphaMode]),r.uniform1f(o.alphaCutoff,e.alphaCutoff),r.uniform1f(o.materialOpacity,e.opacity),r.uniform1f(o.alphaToCoverage,+!!a),r.uniform1f(o.doubleSided,+!!e.doubleSided)}applyDepthRank(e,t=-1){let n=this.context;n.uniform3f(this.uniforms.flushBias,e*Fr,e*Ir,t<0&&e?-e*Lr:0),e?(n.enable(n.POLYGON_OFFSET_FILL),n.polygonOffset(t*e*Rr,0)):n.disable(n.POLYGON_OFFSET_FILL)}setFlushProjection(e){let t=this.view,n=[-t[2],-t[6],-t[10]];for(let t=0;t<4;t++)zr[t]=e[t]*n[0]+e[4+t]*n[1]+e[8+t]*n[2];this.context.uniform4fv(this.uniforms.clipPerMetre,zr)}uploadSortedInstances(e,t){if(e.instanceCount<2)return;let n=e.instanceData,r=Array.from({length:e.instanceCount},(e,r)=>{let i=r*B;return{index:r,distance:Math.hypot(n[i+12]-t[0],n[i+13]-t[1],n[i+14]-t[2])}});r.sort((e,t)=>t.distance-e.distance),e.sortedData??=new Float32Array(n.length),r.forEach(({index:t},r)=>{e.sortedData.set(n.subarray(t*B,(t+1)*B),r*B)}),this.context.bindBuffer(this.context.ARRAY_BUFFER,e.instanceBuffer),this.context.bufferSubData(this.context.ARRAY_BUFFER,0,e.sortedData)}hasOpaqueInstance(e){for(let t=0;t<e.instanceCount;t++)if(e.instanceData[t*B+wr]>=.999)return!0;return!1}drawBlendBatches(e){let t=this.context,n=e.eye,r=this.batches.filter(e=>e.alphaMode===`blend`&&Qr(e)===`opaque`),i=this.batches.filter(e=>e.alphaMode===`add`&&Qr(e)===`opaque`);if(r.length===0&&i.length===0)return;t.bindFramebuffer(t.FRAMEBUFFER,this.multisampleFramebuffer),t.viewport(0,0,this.canvas.width,this.canvas.height),t.enable(t.DEPTH_TEST),t.useProgram(this.program),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.shadowTexture),t.uniform1i(this.uniforms.shadowMap,0);let a=e=>{let t=0;for(let r=0;r<e.instanceCount;r++){let i=r*B;t+=Math.hypot(e.instanceData[i+12]-n[0],e.instanceData[i+13]-n[1],e.instanceData[i+14]-n[2])}return t/e.instanceCount},o=r.map(e=>({batch:e,distance:a(e)})).sort((e,t)=>t.distance-e.distance);for(let{batch:e}of o)this.hasOpaqueInstance(e)&&this.drawAlphaBatch({...e,alphaMode:`mask`,alphaCutoff:.999},!0);t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1);for(let{batch:e}of o)this.uploadSortedInstances(e,n),this.drawAlphaBatch(e,!0);if(i.length>0){t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ZERO,t.ONE);for(let e of i)this.drawAlphaBatch(e,!0)}t.depthMask(!0),this.applyDepthRank(0),t.disable(t.BLEND),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.enable(t.CULL_FACE),t.bindVertexArray(null)}drawAlphaBatch(e,t,n=!1){let r=n?this.selectBatchInstances(e):null;r?.visibleCount!==0&&(this.applyAlphaState(e,t),this.drawBatch(e,t,r))}setSingleInstanceUniforms(e){let t=this.context;t.uniform3f(this.uniforms.baseColor,e[25],e[26],e[27]),t.uniform4f(this.uniforms.surface,e[28],e[29],e[30],e[31]),t.uniform4f(this.uniforms.instanceEmission,e[38],e[39],e[40],0),t.uniform1f(this.uniforms.instanceOpacity,e[wr]),this.shaderFeatures.has(`boxMapScale`)&&t.uniformMatrix3fv(this.uniforms.boxNormalMatrix,!1,e.subarray(16,25))}drawBatch(e,n=!1,r=null,i=e){if(this.hasMorphs){let t=n?this.uniforms:this.depthMorphUniforms;this.context.uniform1f(t.morphEnabled,+!!e.morph),e.morph&&(this.context.uniform1i(t.morphVertexCount,e.morphTexture.info.vertexCount),this.context.uniform1i(t.morphTargetCount,e.morphTexture.info.targetCount),this.context.uniform1fv(t[`morphWeights[0]`],e.morphWeights),this.context.activeTexture(this.context.TEXTURE0+8),this.context.bindTexture(this.context.TEXTURE_2D,e.morphTexture.texture))}if(this.hasSkins){let t=n?this.uniforms:this.depthSkinUniforms;this.context.uniform1f(t.crowdEnabled,+!!e.crowd),this.context.uniform1f(t.skinEnabled,+!!e.skin),e.crowd?(this.context.activeTexture(this.context.TEXTURE0+7),this.context.bindTexture(this.context.TEXTURE_2D,e.crowdTexture.texture),this.context.uniform1i(t.jointPalette,7)):e.skin&&(this.context.activeTexture(this.context.TEXTURE0+6),this.context.bindTexture(this.context.TEXTURE_2D,e.influenceTexture.texture),this.context.uniform1i(t.skinInfluences,6),this.context.activeTexture(this.context.TEXTURE0+7),this.context.bindTexture(this.context.TEXTURE_2D,e.skinTexture.texture),this.context.uniform1i(t.jointPalette,7))}if(n&&!this.benchmark){this.context.uniform1f(this.uniforms.shadowBlind,+(e.receivesShadow===!1)),this.context.uniform1f(this.uniforms.tintBlind,+!!e.tintBlind),this.context.uniform1f(this.uniforms.compositeMode,e.compositeMode??0);for(let t=0;t<V.length;t++)this.context.activeTexture(this.context.TEXTURE0+t+1),this.context.bindTexture(this.context.TEXTURE_2D,e.textures[t]),this.context.uniform1i(this.uniforms[kr[t]],t+1),this.context.uniform1f(this.uniforms[Ar[t]],e.mapState[t]?1+(e.mapState[t].uvChannel??0):0);this.context.uniform2f(this.uniforms.normalScale,e.mapState[5],e.mapState[6]),this.context.uniform1f(this.uniforms.occlusionStrength,e.mapState[7]),this.context.uniform4f(this.uniforms.materialMoss,e.mapState[8],e.mapState[9],e.mapState[10],e.mapState[11]),this.bindSurfaceWear(e.wear);let n=e.layerState;this.context.uniform3f(this.uniforms.materialDielectric,n[0],n[1],n[2]),this.context.uniform2f(this.uniforms.materialCoat,n[3],n[4]),this.context.uniform4f(this.uniforms.materialSheen,n[5],n[6],n[7],n[8]),this.context.uniform2f(this.uniforms.materialAnisotropy,n[16],n[17]),this.context.uniform3f(this.uniforms.materialIridescence,n[18],n[19],n[20]),this.context.uniform1i(this.uniforms.lightLinkMask,n[21]),this.context.uniform1f(this.uniforms.materialToon,n[22]),this.context.uniform1f(this.uniforms.boxMapScale,e.mapState[12]),this.context.uniform1i(this.uniforms.boxMapAxis,e.mapState[13]),this.shaderFeatures?.has(`splat`)&&c().bind(this,e.splat),t.bind?.(this,e.mapState,n,e),this.context.uniform1f(this.uniforms.hasLightMap,+!!e.lightMapTexture),e.lightMapTexture&&(this.context.activeTexture(this.context.TEXTURE0+ii),this.context.bindTexture(this.context.TEXTURE_2D,e.lightMapTexture),this.context.uniform1i(this.uniforms.lightMap,ii),this.context.uniform1f(this.uniforms.lightMapScale,e.mapState[15]))}n&&!this.benchmark&&this.shaderFeatures?.has(`instanced`)===!1&&this.setSingleInstanceUniforms(e.instanceData),e.mirrored&&this.context.frontFace(this.context.CW);let a=n&&!this.benchmark?e.flushOrder?.ranges??null:null;r&&!r.isEverything?this.drawSelectedLevels(e,r,i,i===e?a:null):(this.context.bindVertexArray(e.vertexArray),a?this.drawFlushRanges(e,a,e.instanceCount):this.context.drawElementsInstanced(this.context.TRIANGLES,e.indexCount,this.context.UNSIGNED_INT,0,e.instanceCount)),e.mirrored&&this.context.frontFace(this.context.CCW)}preparePass(e){if(e.pass===void 0)return 0;if(!this.passSupport)throw Error(`Render passes need installRenderPasses(renderer) from 67js/addons/render-passes.`);return this.passSupport.prepare(e)}setFogField(e){this.fogFieldOverride=e===null?null:$t(e)}render(e){let{eye:t,target:n=[0,1.2,0],armorColor:r=[.53,.39,.24],armorSurface:i=[.88,.32],exposure:a=1,inspection:o=!1}=e,s=_t(e.effects),c={lightDirection:[-3,6,4],fogColor:[.35,.43,.43],fogDensity:.006,daylight:1,explosionCenter:[0,0,0],...this.environment,...e.environment};c.fogDensity??=this.fittedFogDensity??.006;let l=en(c.volumeFog);if(this.fogFieldOverride&&(l.field=this.fogFieldOverride),l.density>0){if(d(`volumeFog`),!this.depth||!this.hdr||this.transparent||this.benchmark)throw Error(`Volume fog requires depth:true, active HDR and an opaque canvas`);if(!Number.isFinite(e.time??0)||Math.abs(e.time??0)>1e6)throw RangeError(`Volume time must be finite and within ±1000000 seconds`);let t=c.lightDirection,n=t?.length===3?Math.hypot(...t):NaN;if(!Number.isFinite(n)||n<1e-6||!Array.from(t).every(e=>typeof e==`number`&&Math.abs(e)<=1e6))throw RangeError(`Volume light direction must have a finite nonzero length and bounded components`)}Pt(this.lighting,c,{world:this.world}),this.syncViewTransform(c);let u=String(this.activeLightDirection)!==String(c.lightDirection);this.activeLightDirection=c.lightDirection,this.diagnostics=er({world:this.world,depth:this.depth,effects:s,lightDirection:c.lightDirection,shadowBounds:this.shadowBounds,coplanarProblems:this.coplanarDiagnostics?.(this.batches),skinProblems:m.reflectedSkinDiagnostics?.(this.partLocations)});let f=performance.now(),p=this.context;this.beginGpuTiming();let h=Math.max(0,Math.min(1,e.assemblyAmount??0)),g=this.updateWindState(e),_=this.assemblyAmount!==h||this.shadowsDirty||g||u;this.requireFeatureNames(Jr(this.lighting));let v=this.preparePass(e);this.renderingPass=v>0,this.volumeShadowWanted=l.density>0,(_||this.shadowMapSizeWanted()!==this.shadowMapSize)&&(this.assemblyAmount=h,this.createShadowMap()),this.updateLocalShadows(_);let y=this.activateEnvironment(c.map);this.requireFeatureNames([y?`environmentMap`:`studioLighting`]),E(this.view,t,n,e.up??[0,1,0]),tt(this.projection,this.withFittedNear(e),this.canvas.width/this.canvas.height,{world:this.world}),x(this.viewProjection,this.projection,this.view),b(this.inverseViewProjection,this.viewProjection),In(this.viewProjection,this.frustumPlanes),this.viewForward=[-this.view[2],-this.view[6],-this.view[10]],e.reflectionTarget&&this.shadowCascades?.texture?this.cascadeCastersChanged||=_:(this.shadowCascades?.update(this,_||!!this.cascadeCastersChanged),this.cascadeCastersChanged=!1);let S=e.reflectionTarget;p.bindFramebuffer(p.FRAMEBUFFER,S?S.framebuffer:v?this.passSupport.framebuffer:this.benchmark?null:this.multisampleFramebuffer),p.viewport(0,0,S?.width??this.canvas.width,S?.height??this.canvas.height),v?p.clearColor(...this.passSupport.background(e.pass)):this.transparent?p.clearColor(0,0,0,0):p.clearColor(.145,.162,.177,1);let C=!v&&!!y?.showBackground&&!this.transparent;p.clear(C?p.DEPTH_BUFFER_BIT:p.COLOR_BUFFER_BIT|p.DEPTH_BUFFER_BIT);let w=!v&&this.drawEnvironmentBackground(y,e,a);this.world&&!this.benchmark&&!v&&!w&&this.drawSky(e),p.enable(p.DEPTH_TEST),p.enable(p.CULL_FACE),p.useProgram(this.program),p.uniformMatrix4fv(this.uniforms.viewProjection,!1,this.viewProjection),this.setFlushProjection(this.viewProjection),p.uniformMatrix4fv(this.uniforms.lightProjection,!1,this.lightProjection),p.uniform1f(this.uniforms.shadowBiasPerSlope,this.shadowBiasPerSlope),p.uniform3fv(this.uniforms.eye,t),this.shadowCascades?.bindUniforms(this),p.uniform3fv(this.uniforms.armorColor,r),p.uniform2fv(this.uniforms.armorSurface,i),p.uniform1f(this.uniforms.exposure,a),p.uniform1f(this.uniforms.inspection,+!!o),p.uniform1f(this.uniforms.hdrEnabled,+!!this.hdr),p.uniform1i(this.uniforms.pointLightCount,e.reflectionTarget?0:this.lighting.pointCount),p.uniform4fv(this.uniforms[`pointLightPositions[0]`],this.lighting.positions),p.uniform4fv(this.uniforms[`pointLightColors[0]`],this.lighting.colors),p.uniform1fv(this.uniforms[`pointLightRadii[0]`],this.lighting.radii),this.applyLocalLightUniforms(!!e.reflectionTarget),this.lighting.bind?.(this),p.uniform3fv(this.uniforms.keyColor,this.lighting.keyColor),p.uniform1f(this.uniforms.fillIntensity,this.lighting.fillIntensity),p.uniform1f(this.uniforms.ambientIntensity,this.lighting.ambientIntensity),p.uniform1f(this.uniforms.specularAntiAliasing,this.lighting.specularAntiAliasing),p.uniform1f(this.uniforms.time,e.time??0),p.uniform1f(this.uniforms.wind,e.wind??.3),p.uniform1f(this.uniforms.worldMode,+!!this.world),p.uniform1f(this.uniforms.daylight,c.daylight),p.uniform3fv(this.uniforms.lightDirection,c.lightDirection),p.uniform3fv(this.uniforms.fogColor,c.fogColor),p.uniform1f(this.uniforms.fogDensity,c.fogDensity),p.uniform3fv(this.uniforms.waterRipple,e.waterRipple??[1e4,0,1e4]),p.uniform1f(this.uniforms.rippleTime,e.rippleTime??-1e3),p.uniform1f(this.uniforms.explosionProgress,e.explosionProgress??1),p.uniform3fv(this.uniforms.explosionCenter,c.explosionCenter),p.uniform1f(this.uniforms.assemblyAmount,h),p.activeTexture(p.TEXTURE0),p.bindTexture(p.TEXTURE_2D,this.shadowTexture),p.uniform1i(this.uniforms.shadowMap,0),this.bindTintedShadows(),this.applyEnvironmentUniforms(y),p.uniform1f(this.uniforms.renderPassMode,v),p.uniform1f(this.uniforms.renderPassDepthRange,e.passDepthRange??100),v>5&&this.passSupport.bindFrame(e,c,l);let T=0;for(let t of this.batches)this.benchmark?this.drawBatch(t,!0):(v>5?this.passSupport.drawsInPass(t,v):this.drawsInOpaqueLoop(t))&&!(S&&t.mapState[20])&&(p.uniform1f(this.uniforms.renderPassObjectBase,T),T+=t.instanceCount,v>5?this.passSupport.drawBatch(t,v,e,T-t.instanceCount):this.drawAlphaBatch(t,!0,v!==Li));this.applyDepthRank(0),p.disable(p.SAMPLE_ALPHA_TO_COVERAGE),p.enable(p.CULL_FACE),p.bindVertexArray(null),S?(this.renderingPass=!1,this.endGpuTiming()):(v?this.passSupport.copyToCanvas():this.benchmark||(this.drawTranslucent(e,c,h,y),this.drawBlendBatches(e),this.resolveFrame(e,s,c,l)),this.renderingPass=!1,this.endGpuTiming(),this.cpuMilliseconds=performance.now()-f)}beginGpuTiming(){this.gpuTimer===void 0&&(this.gpuTimer=this.createGpuTimer?.(this.context)??null),this.gpuTimer?.begin()}endGpuTiming(){this.gpuTimer&&(this.gpuTimer.end(),this.gpuMilliseconds=this.gpuTimer.collect())}applyLocalLightUniforms(e=!1){let t=this.context,n=this.lighting,r=this.uniforms;t.uniform1fv(r[`pointLightShadowTiles[0]`],n.pointShadows),t.uniform1i(r.spotLightCount,e?0:n.spotCount),t.uniform4fv(r[`spotLightPositions[0]`],n.spotPositions),t.uniform4fv(r[`spotLightColors[0]`],n.spotColors),t.uniform4fv(r[`spotLightDirections[0]`],n.spotDirections),t.uniform4fv(r[`spotLightParameters[0]`],n.spotParameters),t.uniform1i(r.areaLightCount,e?0:n.areaCount),t.uniform4fv(r[`areaLightPositions[0]`],n.areaPositions),t.uniform4fv(r[`areaLightColors[0]`],n.areaColors),t.uniform4fv(r[`areaLightNormals[0]`],n.areaNormals),t.uniform4fv(r[`areaLightTangents[0]`],n.areaTangents),n.shadowCasters.length!==0&&this.localShadowTexture&&(t.uniformMatrix4fv(r[`localShadowMatrices[0]`],!1,this.localShadowMatrices),t.uniform1fv(r[`localShadowTexelAngles[0]`],this.localShadowTexelAngles),t.activeTexture(t.TEXTURE0+si),t.bindTexture(t.TEXTURE_2D,this.localShadowTexture),t.uniform1i(r.localShadowAtlas,si),t.activeTexture(t.TEXTURE0))}dispose(){this.fogFieldTexture?.dispose(),this.releaseFrameTargets(),this.shadowCascades?.dispose(this.context,this.renderTargets),n.dispose?.(this),this.localShadowTexture&&this.context.deleteTexture(this.localShadowTexture),this.localShadowFramebuffer&&this.context.deleteFramebuffer(this.localShadowFramebuffer),this.placeholderShadowTexture&&this.context.deleteTexture(this.placeholderShadowTexture),this.tintFramebuffer&&(this.context.deleteTexture(this.tintTexture),this.context.deleteFramebuffer(this.tintFramebuffer)),this.batches.forEach(e=>{this.context.deleteVertexArray(e.vertexArray),this.releaseLevelDraws(e)}),this.buffers.forEach(e=>this.context.deleteBuffer(e)),this.geometryBuffers?.clear(),this.context.deleteTexture(this.shadowTexture),this.context.deleteFramebuffer(this.shadowFramebuffer),this.context.deleteProgram(this.program),this.liquidProgram&&this.context.deleteProgram(this.liquidProgram),this.context.deleteProgram(this.depthProgram),this.postProgram&&this.context.deleteProgram(this.postProgram);for(let e of this.postVariants?.values()??[])this.context.deleteProgram(e.pending?P(this.context,e.pending):e.program);this.skyProgram&&this.context.deleteProgram(this.skyProgram),this.bloomProgram&&this.context.deleteProgram(this.bloomProgram),this.occlusionProgram&&this.context.deleteProgram(this.occlusionProgram),this.passSupport?.dispose(this.context);for(let e of this.postStages??[])e.dispose(this.context);this.environmentBackgroundProgram&&this.context.deleteProgram(this.environmentBackgroundProgram),this.environmentResources?.dispose();for(let e of this.textures.values())this.context.deleteTexture(e);this.splatPlaceholder&&c().dispose(this),this.textures.clear();for(let e of[this.skinTextures,this.influenceTextures,this.morphTextures]){for(let t of e?.values()??[])this.context.deleteTexture(t.texture);e?.clear()}this.partLocations.clear(),this.updatePartIdentities?.clear(),this.updateSkins?.clear(),this.updateMorphs?.clear(),this.updateBatches?.clear()}},oa=Math.PI*2,sa=1e6;function ca(e,t,n,r){if(!Number.isInteger(e)||e<t||e>n)throw RangeError(`${r} must be an integer from ${t} to ${n}.`)}function la(e,t){if(!Number.isFinite(e)||!Number.isFinite(Math.fround(e)))throw TypeError(`${t} must be a finite Float32 value.`)}function ua(e){if(e>sa)throw RangeError(`Primitive exceeds one million vertices. Reduce segments or subdivisions.`)}function da(e){return e===1?0:e*oa}function fa(e,t,n){return{positions:new Float32Array(e),normals:new Float32Array(t),indices:new Uint32Array(n)}}function pa(e,t,n){let r=[],i=[],a=[];for(let a=0;a<=t;a++)for(let o=0;o<=e;o++){let s=n(o/e,a/t);r.push(...s.position),i.push(...s.normal)}function o(e,t,n){let o=r.slice(t*3,t*3+3).map((t,n)=>t-r[e*3+n]),s=r.slice(n*3,n*3+3).map((t,n)=>t-r[e*3+n]),c=[o[1]*s[2]-o[2]*s[1],o[2]*s[0]-o[0]*s[2],o[0]*s[1]-o[1]*s[0]];if(Math.hypot(...c)<1e-10)return;let l=c.reduce((r,a,o)=>r+a*(i[e*3+o]+i[t*3+o]+i[n*3+o]),0);a.push(e,l>0?t:n,l>0?n:t)}for(let n=0;n<t;n++)for(let t=0;t<e;t++){let r=n*(e+1)+t,i=r+e+1;o(r,r+1,i),o(r+1,i+1,i)}let s=fa(r,i,a);s.uvs=new Float32Array((e+1)*(t+1)*2);for(let n=0;n<=t;n++)for(let r=0;r<=e;r++){let i=(n*(e+1)+r)*2;s.uvs[i]=r/e,s.uvs[i+1]=n/t}return s}function ma(e=64,t=40){return ca(e,3,2048,`segments`),ca(t,2,2048,`rings`),ua((e+1)*(t+1)),pa(e,t,(e,t)=>{let n=da(e),r=t*Math.PI,i=t===0||t===1?0:Math.sin(r),a=[i*Math.cos(n),Math.cos(r),i*Math.sin(n)];return{position:a,normal:a}})}function ha(e=80,t=.025,n=6){if(ca(e,3,2048,`segments`),ca(n,1,128,`bevelSegments`),la(t,`bevel`),t<0||t>.5||t>0&&Math.fround(t)===0)throw RangeError(`Cylinder bevel must be within zero and 0.5 without Float32 underflow.`);ua((e+1)*2*(n+1)+2*(e+2));let r=[];for(let e=0;e<=n;e++){let i=-Math.PI/2+e/n*Math.PI/2;r.push({radius:1-t+t*Math.cos(i),height:-.5+t+t*Math.sin(i),radialNormal:Math.cos(i),verticalNormal:Math.sin(i)})}for(let e=0;e<=n;e++){let i=e/n*Math.PI/2;r.push({radius:1-t+t*Math.cos(i),height:.5-t+t*Math.sin(i),radialNormal:Math.cos(i),verticalNormal:Math.sin(i)})}let i=pa(e,r.length-1,(e,t)=>{let n=da(e),i=r[Math.round(t*(r.length-1))];return{position:[i.radius*Math.cos(n),i.height,i.radius*Math.sin(n)],normal:[i.radialNormal*Math.cos(n),i.verticalNormal,i.radialNormal*Math.sin(n)]}}),a=[...i.positions],o=[...i.normals],s=[...i.indices];for(let n of[-1,1]){let r=a.length/3;a.push(0,n*.5,0),o.push(0,n,0);for(let r=0;r<=e;r++){let i=da(r/e);a.push((1-t)*Math.cos(i),n*.5,(1-t)*Math.sin(i)),o.push(0,n,0)}for(let t=0;t<e;t++){let e=r+t+1;s.push(r,n>0?e+1:e,n>0?e:e+1)}}return fa(a,o,s)}function ga(e=.08,t=6){if(la(e,`bevel`),e<0||e>.5||e>0&&Math.fround(e)===0)throw RangeError(`Box bevel must be within zero and 0.5 without Float32 underflow.`);ca(t,1,128,`subdivisions`),ua(e===0?24:6*(2*t+2)**2);let n=[],r=[],i=[],a=.5-e,o=[];if(e===0)o.push(-.5,.5);else{for(let n=0;n<=t;n++){let r=(1-n/t)*Math.PI/4;o.push(-a-e*Math.tan(r))}o.push(a);for(let n=1;n<=t;n++){let r=n/t*Math.PI/4;o.push(a+e*Math.tan(r))}}let s=o.length-1;for(let t=0;t<6;t++){let a=Math.floor(t/2),c=t%2==0?-1:1,l=pa(s,s,(t,n)=>{let r=[0,0,0];if(r[a]=c*.5,r[(a+1)%3]=o[Math.round(t*s)],r[(a+2)%3]=o[Math.round(n*s)],e===0){let e=[0,0,0];return e[a]=c,{position:r,normal:e}}let i=r.map(t=>Math.max(-.5+e,Math.min(.5-e,t))),l=r.map((e,t)=>e-i[t]),u=Math.hypot(...l),d=l.map(e=>e/u);return{position:i.map((t,n)=>t+d[n]*e),normal:d}}),u=n.length/3;n.push(...l.positions),r.push(...l.normals),i.push(...Array.from(l.indices,e=>e+u))}return fa(n,r,i)}v();var _a=1.000001;function va(e){return Number.isFinite(e)&&Number.isFinite(Math.fround(e))}function ya(e,t){let n=Math.fround(e[t]),r=Math.fround(e[t+1]),i=Math.fround(e[t+2]),a=Math.fround(e[t+4]),o=Math.fround(e[t+5]),s=Math.fround(e[t+6]),c=Math.fround(e[t+8]),l=Math.fround(e[t+9]),u=Math.fround(e[t+10]);return n*(o*u-l*s)-a*(r*u-l*i)+c*(r*s-o*i)}function ba(e,t,n){if(e?.length!==t*16)throw Error(`${n} must contain one matrix per joint.`);if(e instanceof Float32Array){for(let t=0;t<e.length;t++)if(!Number.isFinite(e[t]))throw Error(`${n} must contain finite floats.`)}else for(let t of e)if(!va(t))throw Error(`${n} must contain finite floats.`);for(let t=0;t<e.length;t+=16){if(e[t+3]!==0||e[t+7]!==0||e[t+11]!==0||e[t+15]!==1)throw Error(`${n} must contain affine matrices.`);if(Math.abs(ya(e,t))<1e-10)throw Error(`${n} contains a singular joint transform.`)}}function xa(e,t,n=1){if(!Number.isSafeInteger(e)||e<1||!Number.isInteger(t)||t<n)throw Error(`Invalid skin texture dimensions.`);let r=Math.min(Math.floor(t/n)*n,Math.max(n,Math.ceil(Math.sqrt(e)/n)*n)),i=Math.ceil(e/r);if(i>t)throw Error(`Skin texture exceeds MAX_TEXTURE_SIZE.`);return{width:r,height:i,bytes:r*i*16}}function Sa(e,t){if(!t){if(e.skinIndices||e.skinWeights)throw Error(`Skin attributes require a skin pose.`);return}let n=t.jointMatrices?.length/16;if(!Number.isInteger(n)||n<1||n>65536||!(t.jointMatrices instanceof Float32Array))throw Error(`Skin pose requires a Float32 joint palette.`);let r=e.positions.length/3;if(e.skinIndices?.length!==r*4||e.skinWeights?.length!==r*4)throw Error(`Skin indices and weights require four values per vertex.`);for(let t=0;t<r;t++){let r=0;for(let i=0;i<4;i++){let a=t*4+i,o=e.skinIndices[a],s=e.skinWeights[a];if(!Number.isInteger(o)||o<0||o>=n)throw Error(`Skin joint index is out of range.`);if(!va(s)||s<0||s>_a)throw Error(`Skin weights must be finite values within zero and one.`);r+=s}if(r<=1e-8)throw Error(`Skin vertex weights must have a positive total.`)}Da(t,e)}var Ca=new WeakMap;function wa(e){let t=Ca.get(e.skinWeights);if(t&&t.skinIndices===e.skinIndices)return t;let n=e.skinWeights.length/4,r=new Map,i=[],a=[];for(let t=0;t<n;t++){let n=0;for(let r=0;r<4;r++)n+=e.skinWeights[t*4+r];let o=[],s=[];for(let r=0;r<4;r++)o.push(e.skinIndices[t*4+r]),s.push(Math.fround(e.skinWeights[t*4+r]/n));let c=`${o.join(`,`)}|${s.join(`,`)}`;r.has(c)||(r.set(c,!0),i.push(...o),a.push(...s))}let o={skinIndices:e.skinIndices,joints:Int32Array.from(i),weights:Float32Array.from(a)};return Ca.set(e.skinWeights,o),o}var Ta=new WeakMap;function Ea(e){return Ta.get(e)??null}function Da(e,t,n){let r=e.jointMatrices;if(ba(r,r.length/16,`Joint palette`),!t)return;let{joints:i,weights:a}=wa(t),o=n?ya(n,0):0,s=0,c=-1;for(let e=0;e<i.length/4;e++){let t=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0;for(let n=0;n<4;n++){let o=a[e*4+n],s=i[e*4+n]*16;t+=r[s]*o,l+=r[s+1]*o,u+=r[s+2]*o,d+=r[s+4]*o,f+=r[s+5]*o,p+=r[s+6]*o,m+=r[s+8]*o,h+=r[s+9]*o,g+=r[s+10]*o}let _=t*(f*g-h*p)-d*(l*g-h*u)+m*(l*p-f*u);if(!Number.isFinite(_)||Math.abs(_)<1e-8)throw Error(`Skin pose produces a singular weighted vertex transform.`);n&&_*o<0&&(c<0&&(c=e),s++)}if(!n)return;if(s===0){Ta.delete(e);return}let l={sets:s,joints:[],weights:[]};for(let e=0;e<4;e++){let t=a[c*4+e];t<=0||(l.joints.push(i[c*4+e]),l.weights.push(Math.round(t*100)/100))}Ta.set(e,l)}function Oa(e,t){let n=new Float32Array(t.width*t.height*4);for(let t=0;t<e.skinWeights.length/4;t++){let r=0;for(let n=0;n<4;n++)r+=e.skinWeights[t*4+n];for(let i=0;i<4;i++)n[t*8+i]=e.skinIndices[t*4+i],n[t*8+4+i]=Math.fround(e.skinWeights[t*4+i]/r)}return n}l(`skin`,{vertexHead:`
uniform float skinEnabled;
uniform highp sampler2D skinInfluences;
uniform highp sampler2D jointPalette;
vec4 skinTexel(sampler2D source, int index) {
  int width = textureSize(source, 0).x;
  return texelFetch(source, ivec2(index % width, index / width), 0);
}
mat4 jointMatrix(int joint) {
  int offset = joint * 4;
  return mat4(skinTexel(jointPalette, offset), skinTexel(jointPalette, offset + 1),
    skinTexel(jointPalette, offset + 2), skinTexel(jointPalette, offset + 3));
}
`,vertexTail:`mat4 skinTransform() {
  if (skinEnabled < 0.5) return mat4(1.0);
  ivec4 joints = ivec4(skinTexel(skinInfluences, gl_VertexID * 2));
  vec4 weights = skinTexel(skinInfluences, gl_VertexID * 2 + 1);
  return jointMatrix(joints.x) * weights.x + jointMatrix(joints.y) * weights.y
    + jointMatrix(joints.z) * weights.z + jointMatrix(joints.w) * weights.w;
}
`});var ka=new WeakMap;function Aa(e){let t=ka.get(e);t||(t=[...e].filter(([,e])=>e.skin),ka.set(e,t));let n=[];for(let[e,r]of t){let t=Ea(r.skin);if(!t)continue;let i=e.name??`a skinned part`,a=t.joints.map((e,n)=>`joint ${e} at ${t.weights[n]}`).join(`, `);n.push({kind:`skin-reflected-vertices`,severity:`warning`,target:i,message:`${t.sets} vertex weight set(s) of ${i} mirror in this pose and draw pinched. First: ${a}.`,fix:`Move the weights of joints that turn opposite ways onto one joint, such as finger weights onto the hand.`})}return n}h({validateSkinGeometry:Sa,validateSkinPose:Da,reflectedSkinDiagnostics:Aa,skinTextureLayout:xa,packSkinInfluences:Oa});var ja=new WeakSet,Ma=2**-126;function U(e){let t=Math.fround(e);return t>=e||!Number.isFinite(t)?t:Math.fround(t+Math.max(2**-149,t*2**-23))}function Na(e){if(!Number.isSafeInteger(e)||e<1||e>64)throw RangeError(`Morph target count must be within one and 64.`);return e}function Pa(e,t,n,r=!1){if(!(e instanceof Float32Array)||e.length!==t)throw TypeError(`${n} requires one Float32 RGB vector per vertex.`);let i=[0,0,0];for(let a=0;a<t;a+=3){let t=0;for(let r=0;r<3;r++){let o=e[a+r];if(!Number.isFinite(o))throw RangeError(`${n} must contain finite Float32 values.`);i[r]=Math.max(i[r],Math.abs(o)),t=Math.fround(t+Math.fround(o*o))}if(r&&(!Number.isFinite(t)||t<Ma))throw RangeError(`Base morph normals require a finite normal Float32 squared length.`)}return Object.freeze(i)}function Fa(e){let t=e?.positions?.length;if(!Number.isSafeInteger(t)||t<3||t%3!=0)throw TypeError(`Morph base positions require a nonempty RGB vertex array.`);let n=Pa(e.positions,t,`Morph base positions`),r=Pa(e.normals,t,`Morph base normals`,!0);if(!Array.isArray(e.morphTargets))throw TypeError(`Morph geometry requires a target array.`);let i=Na(e.morphTargets.length),a=[];for(let n=0;n<i;n++){let r=e.morphTargets[n];if(!r||typeof r!=`object`||Array.isArray(r))throw TypeError(`Each morph target must be an object.`);for(let e of Object.keys(r))if(e!==`positions`&&e!==`normals`)throw TypeError(`Morph target ${e} is unsupported.`);if(r.positions===void 0&&r.normals===void 0)throw TypeError(`Each morph target requires positions or normals.`);let i=r.positions===void 0?Object.freeze([0,0,0]):Pa(r.positions,t,`Morph position deltas`),o=r.normals===void 0?Object.freeze([0,0,0]):Pa(r.normals,t,`Morph normal deltas`);a.push(Object.freeze({target:r,positions:r.positions,normals:r.normals,positionMaxima:i,normalMaxima:o}))}let o=Object.freeze({geometry:e,positions:e.positions,normals:e.normals,morphTargets:e.morphTargets,vertexCount:t/3,targetCount:i,texelCount:t/3*i*2,basePositionMaxima:n,baseNormalMaxima:r,targets:Object.freeze(a)});return ja.add(o),o}function Ia(e){if(!ja.has(e))throw TypeError(`Use metadata from validateMorphGeometry().`);let t=e.geometry;if(t.positions!==e.positions||t.normals!==e.normals||t.morphTargets!==e.morphTargets||t.morphTargets.length!==e.targetCount)throw Error(`Morph geometry array identities must remain unchanged after preflight.`);for(let n=0;n<e.targetCount;n++){let r=e.targets[n];if(t.morphTargets[n]!==r.target||r.target.positions!==r.positions||r.target.normals!==r.normals)throw Error(`Morph target and channel identities must remain unchanged after preflight.`)}}function La(e,t){if(!t){if(e?.morphTargets!==void 0)throw TypeError(`Morph targets require a morph pose.`);return}let n=Fa(e);return Ra(t,n),n}function Ra(e,t){Ia(t);let n=e?.weights;if(!(n instanceof Float32Array)||n.length!==t.targetCount)throw TypeError(`Morph pose requires one Float32 weight per target.`);for(let e=0;e<n.length;e++)if(!Number.isFinite(n[e]))throw RangeError(`Morph weights must remain finite Float32 values.`);let r=0;for(let e=0;e<3;e++){let i=t.basePositionMaxima[e],a=t.baseNormalMaxima[e];for(let r=0;r<n.length;r++){let o=Math.abs(n[r]);i=U(i+U(o*t.targets[r].positionMaxima[e])),a=U(a+U(o*t.targets[r].normalMaxima[e]))}if(!Number.isFinite(i)||!Number.isFinite(a))throw RangeError(`Morph weights exceed finite Float32 position or normal bounds.`);r=U(r+U(a*a))}if(!Number.isFinite(r))throw RangeError(`Morph weights exceed a finite Float32 normal squared length bound.`);return t}function za(e,t,n,r){Ra(e,t);for(let i=0;i<4;i++){let a=0;for(let o=0;o<4;o++){let s=o===3?1:t.basePositionMaxima[o];if(o<3)for(let n=0;n<t.targetCount;n++)s=U(s+U(Math.abs(e.weights[n])*t.targets[n].positionMaxima[o]));let c=Math.abs(Math.fround(n[o*4+i]));if(r){c=0;for(let e=0;e<4;e++){let t=0;for(let n=o*4+e;n<r.jointMatrices.length;n+=16)t=Math.max(t,Math.abs(Math.fround(r.jointMatrices[n])));t=U(t*(1+2**-21)),c=U(c+U(Math.abs(Math.fround(n[e*4+i]))*t))}}if(!Number.isFinite(c))throw RangeError(`Morph world/skin matrix product exceeds finite Float32 bounds.`);a=U(a+U(c*s))}if(!Number.isFinite(a))throw RangeError(`Morph world position exceeds finite Float32 bounds.`)}}function Ba(e,t){let n=Fa(e),r=t?.width,i=t?.height,a=r*i,o=a*16;if(!Number.isSafeInteger(r)||r<2||r%2!=0||!Number.isSafeInteger(i)||i<1||!Number.isSafeInteger(o)||o>2**31-1||a<n.texelCount||t.bytes!==void 0&&t.bytes!==o)throw RangeError(`Morph texture layout requires even width, sufficient capacity and a bounded byte length.`);let s=new Float32Array(a*4);for(let e=0;e<n.targetCount;e++){let t=n.targets[e];for(let r=0;r<n.vertexCount;r++){let i=(e*n.vertexCount+r)*8;for(let e=0;e<3;e++)s[i+e]=t.positions?.[r*3+e]??0,s[i+4+e]=t.normals?.[r*3+e]??0}}return s}l(`morph`,{vertex:`
uniform float morphEnabled;
uniform int morphVertexCount;
uniform int morphTargetCount;
uniform float morphWeights[64];
uniform highp sampler2D morphTargets;
vec3 morphDelta(int target, int channel) {
  int index = (target * morphVertexCount + gl_VertexID) * 2 + channel;
  int width = textureSize(morphTargets, 0).x;
  return texelFetch(morphTargets, ivec2(index % width, index / width), 0).xyz;
}
vec3 morphedPosition(vec3 base) {
  if (morphEnabled < 0.5) return base;
  vec3 result = base;
  for (int target = 0; target < 64; target++) {
    if (target >= morphTargetCount) break;
    if (morphWeights[target] != 0.0) result += morphDelta(target, 0) * morphWeights[target];
  }
  return result;
}
vec3 morphedNormal(vec3 base) {
  if (morphEnabled < 0.5) return base;
  vec3 result = base;
  for (int target = 0; target < 64; target++) {
    if (target >= morphTargetCount) break;
    if (morphWeights[target] != 0.0) result += morphDelta(target, 1) * morphWeights[target];
  }
  float largest = max(max(abs(result.x), abs(result.y)), abs(result.z));
  return largest > 0.0 ? normalize(result / largest) : base;
}
`}),h({validateMorphGeometry:La,validateMorphPose:Ra,validateMorphTransform:za,packMorphTargets:Ba,skinTextureLayout:xa}),Object.freeze([`KHR_materials_clearcoat`,`KHR_materials_transmission`,`KHR_materials_volume`,`KHR_materials_ior`,`KHR_materials_specular`,`KHR_materials_sheen`,`KHR_materials_anisotropy`,`KHR_materials_iridescence`]),Object.freeze([[`KHR_materials_clearcoat`,{clearcoat:`clearcoatFactor`,clearcoatRoughness:`clearcoatRoughnessFactor`}],[`KHR_materials_transmission`,{transmission:`transmissionFactor`}],[`KHR_materials_volume`,{thickness:`thicknessFactor`,attenuationDistance:`attenuationDistance`,attenuationColor:`attenuationColor`}],[`KHR_materials_ior`,{ior:`ior`}],[`KHR_materials_specular`,{specular:`specularFactor`,specularColor:`specularColorFactor`}],[`KHR_materials_sheen`,{sheenColor:`sheenColorFactor`,sheenRoughness:`sheenRoughnessFactor`}],[`KHR_materials_anisotropy`,{anisotropy:`anisotropyStrength`,anisotropyRotation:`anisotropyRotation`}],[`KHR_materials_iridescence`,{iridescence:`iridescenceFactor`,iridescenceIor:`iridescenceIor`,iridescenceThickness:`iridescenceThicknessMaximum`}]]),Object.freeze([[`KHR_materials_clearcoat`,`clearcoatTexture`,`linear`],[`KHR_materials_clearcoat`,`clearcoatRoughnessTexture`,`linear`],[`KHR_materials_clearcoat`,`clearcoatNormalTexture`,`linear`],[`KHR_materials_anisotropy`,`anisotropyTexture`,`linear`],[`KHR_materials_sheen`,`sheenColorTexture`,`srgb`],[`KHR_materials_sheen`,`sheenRoughnessTexture`,`linear`]]);function Va(){var e=new _(4);return _!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Ha(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a;return o>0&&(o=1/Math.sqrt(o)),e[0]=n*o,e[1]=r*o,e[2]=i*o,e[3]=a*o,e}(function(){var e=Va();return function(t,n,r,i,a,o){var s,c;for(n||=4,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function Ua(){var e=new _(4);return _!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Wa(e,t,n){n*=.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Ga(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=n[0],l=n[1],u=n[2],d=n[3],f,p=i*c+a*l+o*u+s*d,m,h,g;return p<0&&(p=-p,c=-c,l=-l,u=-u,d=-d),1-p>1e-6?(f=Math.acos(p),m=Math.sin(f),h=Math.sin((1-r)*f)/m,g=Math.sin(r*f)/m):(h=1-r,g=r),e[0]=h*i+g*c,e[1]=h*a+g*l,e[2]=h*o+g*u,e[3]=h*s+g*d,e}function Ka(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var a=(i+1)%3,o=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[a*3+a]-t[o*3+o]+1),e[i]=.5*r,r=.5/r,e[3]=(t[a*3+o]-t[o*3+a])*r,e[a]=(t[a*3+i]+t[i*3+a])*r,e[o]=(t[o*3+i]+t[i*3+o])*r}return e}var qa=Ha;(function(){var e=qe(),t=Ye(1,0,0),n=Ye(0,1,0);return function(r,i,a){var o=Ze(i,a);return o<-.999999?(Qe(e,t,i),$e(e)<1e-6&&Qe(e,n,i),Xe(e,e),Wa(r,e,Math.PI),r):o>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(Qe(e,i,a),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+o,qa(r,r))}})(),(function(){var e=Ua(),t=Ua();return function(n,r,i,a,o,s){return Ga(e,r,o,s),Ga(t,i,a,s),Ga(n,e,t,2*s*(1-s)),n}})(),function(){var e=D();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],qa(t,Ka(t,e))}}();var Ja=[`Sine`,`Quad`,`Cubic`,`Quart`,`Quint`,`Expo`,`Circ`,`Back`,`Bounce`,`Elastic`],Ya=[`In`,`Out`,`InOut`],Xa=Object.freeze([`linear`,...Ja.flatMap(e=>Ya.map(t=>`ease${t}${e}`))]);new Set(Xa),new Map(Xa.map(e=>[e.toLowerCase(),e])),Za();function Za(){let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e}Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),Object.freeze([0,0,0]);var Qa=16384,$a=1024,eo=65504,to=256;function no(e,t,n,r){if(typeof e!=`number`||!Number.isFinite(e)||e<n||e>r)throw RangeError(`Environment map ${t} must be a finite number between ${n} and ${r}.`)}function ro(e){if(e?.kind!==`environment-map`||!(e.data instanceof Float32Array))throw TypeError(`environment.map must be created with createEnvironmentMap.`);if(e.data.length!==e.width*e.height*e.channels)throw RangeError(`Environment map data length does not match its dimensions.`);no(e.intensity,`intensity`,0,1e3),no(e.rotation,`rotation`,-1e6,1e6),no(e.backgroundBlur,`backgroundBlur`,0,1)}function io(e){let t=Math.min(1,$a/e.width),n=Math.max(4,Math.round(e.width*t)),r=Math.max(2,Math.round(e.height*t)),i=Math.min(7,Math.floor(Math.log2(Math.max(n,r)))+1),a=[],o=65536;for(let e=0;e<i;e++){let t=Math.max(1,n>>e),i=Math.max(1,r>>e);a.push({width:t,height:i}),o+=t*i*8}return{width:n,height:r,levelCount:i,levels:a,bytes:o}}function ao(e,t=Qa){if(ro(e),e.width>t||e.height>t)throw RangeError(`Environment map ${e.width}x${e.height} exceeds the GPU texture limit of ${t}.`);return io(e).bytes}var oo=[.282095,.488603,.488603,.488603,1.092548,1.092548,.315392,1.092548,.546274],so=[1,2/3,2/3,2/3,1/4,1/4,1/4,1/4,1/4];function co(e,t,n){return[1,t,n,e,e*t,t*n,3*n*n-1,e*n,e*e-t*t]}var lo=32;function*uo(e){ro(e);let{width:t,height:n,channels:r,data:i}=e,a=new Float64Array(t),o=new Float64Array(t);for(let e=0;e<t;e++){let n=((e+.5)/t-.5)*2*Math.PI;a[e]=Math.sin(n),o[e]=Math.cos(n)}let s=new Float64Array(27),c=2*Math.PI/t*(Math.PI/n);for(let e=0;e<n;e++){let l=(e+.5)/n*Math.PI,u=Math.sin(l),d=Math.cos(l),f=u*c;for(let n=0;n<t;n++){let c=co(u*a[n],d,-u*o[n]),l=(e*t+n)*r;for(let e=0;e<9;e++){let t=c[e]*f;s[e*3]+=i[l]*t,s[e*3+1]+=i[l+1]*t,s[e*3+2]+=i[l+2]*t}}e%lo===31&&(yield)}let l=new Float32Array(27);for(let e=0;e<9;e++){let t=oo[e]**2*so[e];for(let n=0;n<3;n++)l[e*3+n]=s[e*3+n]*t}return l}function fo(e){let t=e.next();for(;!t.done;)t=e.next();return t.value}async function po(e,t){let n=e.next();for(;!n.done;)await t(),n=e.next();return n.value}var mo=64;function ho(e,t,n){let r=e.width*n,i=new Float32Array(r*4);for(let n=0;n<r;n++){let r=(t*e.width+n)*e.channels,a=n*4;i[a]=Math.min(Math.max(e.data[r],0),eo),i[a+1]=Math.min(Math.max(e.data[r+1],0),eo),i[a+2]=Math.min(Math.max(e.data[r+2],0),eo),i[a+3]=1}return i}var go=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
uniform sampler2D sourceMap;
uniform vec2 sourceSize;
uniform float roughness;
uniform float sourceLevelOffset;
out vec4 outputColor;
const float PI = 3.14159265359;
const uint SAMPLE_COUNT = ${to}u;
${tn}
float radicalInverse(uint bits) {
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return float(bits) * 2.3283064365386963e-10;
}
void main() {
  if (roughness < 0.001) {
    outputColor = vec4(min(textureLod(sourceMap, textureCoordinate, sourceLevelOffset).rgb, 65000.0), 1.0);
    return;
  }
  vec3 normal = directionFromEquirectangular(textureCoordinate);
  vec3 helper = abs(normal.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(helper, normal));
  vec3 bitangent = cross(normal, tangent);
  float alphaSquared = pow(roughness, 4.0);
  float texelSolidAngle = 4.0 * PI / (sourceSize.x * sourceSize.y);
  vec3 total = vec3(0.0);
  float totalWeight = 0.0;
  for (uint index = 0u; index < SAMPLE_COUNT; index++) {
    float firstRandom = float(index) / float(SAMPLE_COUNT);
    float secondRandom = radicalInverse(index);
    float cosineHalf = sqrt((1.0 - secondRandom) / (1.0 + (alphaSquared - 1.0) * secondRandom));
    float sineHalf = sqrt(max(1.0 - cosineHalf * cosineHalf, 0.0));
    float azimuth = 2.0 * PI * firstRandom;
    vec3 halfway = tangent * (sineHalf * cos(azimuth)) + bitangent * (sineHalf * sin(azimuth)) + normal * cosineHalf;
    vec3 light = reflect(-normal, halfway);
    float normalLight = dot(normal, light);
    if (normalLight <= 0.0) continue;
    float denominator = cosineHalf * cosineHalf * (alphaSquared - 1.0) + 1.0;
    float distribution = alphaSquared / (PI * denominator * denominator);
    float sampleSolidAngle = 1.0 / (float(SAMPLE_COUNT) * distribution * 0.25 + 0.0001);
    float sourceLevel = max(0.5 * log2(sampleSolidAngle / texelSolidAngle) + 1.0, 0.0);
    total += textureLod(sourceMap, equirectangularFromDirection(light), sourceLevel).rgb * normalLight;
    totalWeight += normalLight;
  }
  outputColor = vec4(min(total / max(totalWeight, 0.0001), 65000.0), 1.0);
}`,_o=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
out vec4 outputColor;
const float PI = 3.14159265359;
const uint SAMPLE_COUNT = 256u;
float radicalInverse(uint bits) {
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return float(bits) * 2.3283064365386963e-10;
}
void main() {
  float normalView = max(textureCoordinate.x, 0.001);
  float roughness = max(textureCoordinate.y, 0.02);
  float alpha = roughness * roughness;
  float alphaSquared = alpha * alpha;
  float visibilityBias = alpha * 0.5;
  vec3 view = vec3(sqrt(1.0 - normalView * normalView), 0.0, normalView);
  float scale = 0.0;
  float offset = 0.0;
  for (uint index = 0u; index < SAMPLE_COUNT; index++) {
    float firstRandom = float(index) / float(SAMPLE_COUNT);
    float secondRandom = radicalInverse(index);
    float cosineHalf = sqrt((1.0 - secondRandom) / (1.0 + (alphaSquared - 1.0) * secondRandom));
    float sineHalf = sqrt(max(1.0 - cosineHalf * cosineHalf, 0.0));
    float azimuth = 2.0 * PI * firstRandom;
    vec3 halfway = vec3(sineHalf * cos(azimuth), sineHalf * sin(azimuth), cosineHalf);
    vec3 light = 2.0 * dot(view, halfway) * halfway - view;
    float normalLight = max(light.z, 0.0);
    float normalHalf = max(halfway.z, 0.0);
    float viewHalf = max(dot(view, halfway), 0.0);
    if (normalLight <= 0.0) continue;
    float geometry = (normalLight / (normalLight * (1.0 - visibilityBias) + visibilityBias)) * (normalView / (normalView * (1.0 - visibilityBias) + visibilityBias));
    float visibility = geometry * viewHalf / max(normalHalf * normalView, 0.0001);
    float fresnelTerm = pow(1.0 - viewHalf, 5.0);
    scale += (1.0 - fresnelTerm) * visibility;
    offset += fresnelTerm * visibility;
  }
  outputColor = vec4(scale / float(SAMPLE_COUNT), offset / float(SAMPLE_COUNT), 0.0, 1.0);
}`,vo=`#version 300 es
precision highp float;
in vec2 textureCoordinate;
uniform mat4 inverseViewProjection;
uniform vec3 eye;
uniform float backgroundLevel;
uniform float exposure;
uniform float hdrEnabled;
out vec4 outputColor;
${nn}
vec3 toneMap(vec3 color) {
  return clamp((color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14), 0.0, 1.0);
}
void main() {
  vec4 world = inverseViewProjection * vec4(textureCoordinate * 2.0 - 1.0, 1.0, 1.0);
  vec3 direction = normalize(world.xyz / world.w - eye);
  vec3 radiance = environmentRadiance(direction, backgroundLevel);
  outputColor = vec4(hdrEnabled > 0.5 ? min(radiance * exposure, vec3(65504.0)) : pow(toneMap(radiance * exposure), vec3(1.0 / 2.2)), 1.0);
}`;function yo(e,t,n,r,i,{wrapHorizontally:a}){let o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texStorage2D(e.TEXTURE_2D,n,t,r,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n>1?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,a?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),o}function bo(e,t,n,r,i,a){if(e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,r),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw Error(`Environment prefilter framebuffer is incomplete.`);e.viewport(0,0,i,a),e.drawArrays(e.TRIANGLES,0,3)}function xo(e,t,n){return fo(Co(e,t,n))}function So(e,t,n,r){return po(Co(e,t,n),r)}function*Co(e,t,{compileProgram:n,fullscreenVertex:r}){if(ro(t),!e.getExtension(`EXT_color_buffer_float`))throw Error(`Environment maps require EXT_color_buffer_float.`);let i=performance.now(),a=io(t),o=Math.floor(Math.log2(Math.max(t.width,t.height)))+1,s=yo(e,e.RGBA16F,o,t.width,t.height,{wrapHorizontally:!0});for(let n=0;n<t.height;n+=mo){let r=Math.min(mo,t.height-n);e.texSubImage2D(e.TEXTURE_2D,0,0,n,t.width,r,e.RGBA,e.FLOAT,ho(t,n,r)),yield}e.generateMipmap(e.TEXTURE_2D),yield;let c=yo(e,e.RGBA16F,a.levelCount,a.width,a.height,{wrapHorizontally:!0}),l=yo(e,e.RG16F,1,128,128,{wrapHorizontally:!1}),u=e.createFramebuffer(),d=n(e,r,go),f=n(e,r,_o);e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindVertexArray(null),e.useProgram(d),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s),e.uniform1i(e.getUniformLocation(d,`sourceMap`),0),e.uniform2f(e.getUniformLocation(d,`sourceSize`),t.width,t.height);let p=e.getUniformLocation(d,`roughness`),m=e.getUniformLocation(d,`sourceLevelOffset`);for(let n=0;n<a.levelCount;n++)e.uniform1f(p,n/Math.max(1,a.levelCount-1)),e.uniform1f(m,Math.max(0,Math.log2(t.width/a.levels[n].width))),bo(e,u,c,n,a.levels[n].width,a.levels[n].height),yield;e.useProgram(f),bo(e,u,l,0,128,128),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(u),e.deleteProgram(d),e.deleteProgram(f),e.deleteTexture(s),e.finish(),yield;let h=yield*uo(t.irradianceSource??t);return{data:t.data,irradianceSource:t.irradianceSource,specularTexture:c,brdfTexture:l,levelCount:a.levelCount,bytes:a.bytes,irradiance:h,prefilterMilliseconds:performance.now()-i,dispose(){e.deleteTexture(c),e.deleteTexture(l)}}}l(`environmentMap`,{environmentShading:nn+rn}),on({assertMap:ro,estimateBytes:ao,createResources:xo,createResourcesInSlices:So,prefilterFragment:go,brdfFragment:_o,backgroundFragment:vo});var wo=`0.19.0`,W=e=>document.getElementById(e),G=W(`scene`),To=W(`stage`),Eo=e=>e*e*(3-2*e),K=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),q=(e,t)=>9.8-.43*t+2.1*Math.exp(-((t/2.95)**2))-.016*e*e+.17*Math.sin(e*.33)*Math.exp(-((t/14)**2)),Do=(e,t,n,r=1,i=1,a=1,o=0,s=0)=>{let c=Math.cos(o),l=Math.sin(o),u=Math.cos(s),d=Math.sin(s);return new Float32Array([c*u*r,d*r,-l*u*r,0,-c*d*i,u*i,l*d*i,0,l*a,0,c*a,0,e,t,n,1])},J=(e,t,n)=>({color:[e,t,n],metallic:0,roughness:.8,emission:0}),Oo={box:ga(),sphere:ma(12,8),cylinder:ha(12,0,1)},ko=[],Ao=(e,t,n,r)=>{let i={name:e,geometry:t,matrix:r,material:n};return ko.push(i),i};function jo(){let e=[],t=[],n=[],r=[];for(let n=0;n<=112;n++)for(let i=0;i<=64;i++){let a=-12+i*24/64,o=-23+n*46/112,s=q(a,o);e.push(a,s,o);let c=(q(a+.06,o)-q(a-.06,o))/.12,l=(q(a,o+.06)-q(a,o-.06))/.12,u=1/Math.hypot(-c,1,-l);t.push(-c*u,u,-l*u);let d=.915+Math.sin(a*.43+o*.31)*.028+Math.sin(o*.78)*.014;r.push(K(d),K(d+.027),K(d+.045))}for(let e=0;e<112;e++)for(let t=0;t<64;t++){let r=e*65+t,i=r+64+1;n.push(r,i,r+1,r+1,i,i+1)}return{positions:new Float32Array(e),normals:new Float32Array(t),colors:new Float32Array(r),indices:new Uint32Array(n)}}Ao(`snow-slope`,jo(),{...J(.99,.99,1),doubleSided:!0},Do(0,0,0));for(let e=0;e<9;e++){let t=-19+e*4.7;for(let n of[-1,1]){let r=n*(8.8+1.4*Math.sin(e)),i=q(r,t);Ao(`tree-${e}-${n}-trunk`,Oo.cylinder,J(.4,.37,.34),Do(r,i+.5,t,.16,1,.16)),Ao(`tree-${e}-${n}-leaf1`,Oo.sphere,J(.14,.45,.49),Do(r,i+1.45,t,.69,1.35,.69)),Ao(`tree-${e}-${n}-leaf2`,Oo.sphere,J(.2,.56,.57),Do(r,i+2.12,t,.49,.95,.49))}}for(let e=0;e<15;e++){let t=-21+e*3,n=-5.55;Ao(`side-marker-${e}`,Oo.box,J(.39,.75,.84),Do(n,q(n,t)+.045,t,.13,.06,.86))}var Mo=[];function No(e,t,n){return{id:e,items:[[`board`,`box`,n,[0,.19,0,.52,.13,1.82,0]],[`front-boot`,`box`,J(.13,.24,.31),[0,.34,.53,.51,.29,.33,0]],[`back-boot`,`box`,J(.13,.24,.31),[0,.34,-.49,.51,.29,.33,0]],[`front-leg`,`cylinder`,J(.28,.33,.38),[0,.71,.46,.22,.62,.22,0]],[`back-leg`,`cylinder`,J(.28,.33,.38),[0,.71,-.42,.22,.62,.22,0]],[`torso`,`box`,t,[0,1.31,0,.83,.91,.58,0]],[`arm-left`,`cylinder`,t,[-.49,1.41,.05,.2,.78,.2,.18]],[`arm-right`,`cylinder`,t,[.49,1.41,.05,.2,.78,.2,-.18]],[`glove-left`,`sphere`,J(.15,.29,.33),[-.62,1.09,.05,.24,.23,.23,0]],[`glove-right`,`sphere`,J(.15,.29,.33),[.62,1.09,.05,.24,.23,.23,0]],[`neck`,`cylinder`,J(.87,.72,.57),[0,1.87,0,.21,.23,.21,0]],[`head`,`sphere`,J(.98,.83,.64),[0,2.16,.04,.45,.51,.43,0]],[`helmet`,`sphere`,J(.12,.29,.42),[0,2.43,.03,.49,.3,.47,0]],[`goggles`,`box`,J(.1,.24,.35),[0,2.19,.42,.46,.2,.12,0]]].map(([t,n,r,i])=>({local:i,part:Ao(`${e}-${t}`,Oo[n],r,Do(0,-100,0))}))}}var Po=No(`blue`,J(.13,.46,.73),J(.2,.67,.82)),Fo=No(`orange`,J(.9,.46,.2),J(.96,.67,.31)),Io=No(`purple`,J(.48,.32,.69),J(.67,.48,.79));Mo.push(Po,Fo,Io);function Lo(e,t,n=!0){for(let{local:r,part:i}of e.items){let[e,a,o,s,c,l,u]=r,d=Math.cos(t.yaw),f=Math.sin(t.yaw);i.matrix=Do(t.x+e*d+o*f,n?t.y+a:-100,t.z-e*f+o*d,s,c,l,t.yaw,u+t.lean*.18)}}var Ro;try{Ro=new aa(G,ko,{ground:!1,world:!0,samples:1,memoryBudgetMiB:192,environment:{lightDirection:[-.6,.85,.55],keyIntensity:1.15,fillIntensity:.64,ambientIntensity:.85,skyTop:[.5,.7,.88],skyBottom:[.77,.88,.96],fogDensity:.0015},shadows:!0})}catch(e){throw W(`error`).style.display=`block`,W(`error`).textContent=`67.js 初始化失敗：${e.message}`,e}var Y=`INTRO_PAGE`,X=null,Z=0,Q=`top`,zo=1,Bo=performance.now(),Vo=0,Ho=null,Uo=0,Wo=0,Go=3.4,Ko=4.8;function qo(e,t){for(let n=1;n<160;n++){let r=n/160,i=e[0]*(1-r)+t[0]*r,a=e[1]*(1-r)+t[1]*r;if(q(i,e[2]*(1-r)+t[2]*r)>a+.02)return!0}return!1}function Jo(e){return qo([e.blue.x,e.blue.y+1.78,e.blue.z],[e.orange.x,e.orange.y+1.4,e.orange.z])}function Yo(e,t,n){n=K(n);let r={x:-.35,z:-7.15,yaw:0,lean:0},i={x:.35,z:6.38,yaw:0,lean:0},a={x:1.15,z:-15.4,yaw:0,lean:0};if(e===`INTRO_PAGE`&&(r.z=-15.6,i.z=6,a.z=-16.5),(e===`INTRO_PLAY`||e===`INTRO_PAUSED`)&&(r.z=-15.6+8.45*n,i.z=6+.38*n,a.z=-16.5+1.1*n,r.yaw=.04*Math.sin(n*2)),(e===`OUTCOME_PLAY`||e===`OUTCOME_PAUSED`||e===`RESULT`)&&(i.z=6.38+.62*n,a.z=-15.4+16.9*n,a.x=1.15+1.15*Eo(K((n-.73)/.27)),a.yaw=.56*Eo(K((n-.76)/.24)),a.lean=-.2*Math.sin(Math.PI*K((n-.72)/.28)),t===`A`&&(r.z=-7.15+15.6*n,r.x=-.35-.95*Eo(n),r.yaw=-.58*Eo(n),r.lean=-.18*Math.sin(Math.PI*n)),t===`B`&&(r.z=-7.15+13.2*(n-.08*n*n),r.x=-.35-2.3*Eo(n),r.yaw=-.46*Eo(n),r.lean=.12*Math.sin(Math.PI*n)*Math.cos(2*Math.PI*n)),t===`C`)){let e=Eo(K(n/.62));r.z=-7.15+10.45*e,r.x=-.35+.3*e,r.yaw=Math.PI*.5*e,r.lean=.08*Math.sin(Math.PI*e)}for(let e of[r,i,a])e.y=q(e.x,e.z);return{blue:r,orange:i,purple:a}}var $={az:.85,el:.64,dist:36};function Xo(e){let t=Q===`top`?[0,11.5,Y.startsWith(`INTRO`)?-5:-.5]:Q===`side`?[0,11,-2]:[e.blue.x,e.blue.y+1.7,e.blue.z+4];if(Q===`eye`)return{eye:[e.blue.x,e.blue.y+1.78,e.blue.z+.1],target:[t[0]+Math.sin(Uo)*6,t[1]-5+Math.sin(Wo)*6,t[2]+7*Math.cos(Uo)],fov:65,near:.05,far:250};let n=Q===`side`?Math.PI/2+$.az*.09:$.az,r=Q===`side`?.26+$.el*.11:$.el,i=Q===`side`?Math.min($.dist,46):$.dist;return{eye:[t[0]+Math.sin(n)*Math.cos(r)*i,t[1]+Math.sin(r)*i,t[2]+Math.cos(n)*Math.cos(r)*i],target:t,fov:49,near:.05,far:250}}function Zo(){Vo||=requestAnimationFrame(ds)}function Qo(e){Y=e,Bo=performance.now(),es(),Zo()}var $o={A:`你沒有先慢下來，滑過坡頂後才看到前面的人，因此轉彎或停下的反應時間變短。不是一定會撞上。`,B:`先減速並確認前方，可以保留更多反應時間與避讓空間；減速仍不是保證。`,C:`你通過後停在坡後盲區，紫色滑手從上坡接近，直到越過坡頂才發現你，只能急忙轉向避讓。`};function es(){let e=Y===`RESULT`,t=Y===`DECISION`,n=/PLAY/.test(Y),r=/PAUSED/.test(Y);W(`phaseName`).textContent={INTRO_PAGE:`準備`,INTRO_PLAY:`情境開始`,INTRO_PAUSED:`暫停`,DECISION:`輪到你選擇`,OUTCOME_PLAY:`看看後果`,OUTCOME_PAUSED:`暫停`,RESULT:`結果觀察`}[Y],W(`phaseTitle`).textContent=e?`選擇 `+X+`：發生了什麼？`:t?`你看不到坡後有人，怎麼做？`:n?`滑過小山頭，觀察每個人…`:r?`暫停，換角度檢查危險`:`坡頂後有人嗎？先看看雪道的地形。`,W(`detail`).textContent=e?`從俯瞰、側面及第一人稱再次觀察角色位置和因果。`:t?`選擇 A、B 或 C；動畫不代表實測距離。`:`藍色是你、橘色在坡後，第三位紫色只在 C 分支出現。`,W(`choices`).hidden=!t,W(`result`).hidden=!e,W(`result`).textContent=e?$o[X]:``,W(`start`).hidden=Y!==`INTRO_PAGE`,W(`pause`).hidden=!n,W(`resume`).hidden=!r,W(`retry`).hidden=!e,W(`replay`).hidden=!e,W(`thirdLegend`).hidden=X!==`C`||Y===`INTRO_PAGE`,document.querySelectorAll(`[data-branch]`).forEach(e=>e.classList.toggle(`selected`,e.dataset.branch===X))}function ts(e){Q=e,$={az:.85,el:.64,dist:36},Uo=0,Wo=0,document.querySelectorAll(`[data-view]`).forEach(t=>{t.classList.toggle(`active`,t.dataset.view===e),t.setAttribute(`aria-pressed`,String(t.dataset.view===e))}),Zo()}function ns(){Y=`INTRO_PAGE`,X=null,Z=0,ts(`top`),es(),Zo()}function rs(){X=null,Z=0,Qo(`INTRO_PLAY`)}function is(e){X=e,Z=0,Qo(`OUTCOME_PLAY`)}function as(){(Y===`INTRO_PLAY`||Y===`OUTCOME_PLAY`)&&Qo(Y===`INTRO_PLAY`?`INTRO_PAUSED`:`OUTCOME_PAUSED`)}function os(){(Y===`INTRO_PAUSED`||Y===`OUTCOME_PAUSED`)&&Qo(Y===`INTRO_PAUSED`?`INTRO_PLAY`:`OUTCOME_PLAY`)}W(`start`).onclick=rs,W(`pause`).onclick=as,W(`resume`).onclick=os,W(`retry`).onclick=()=>{X=null,Z=1,Qo(`DECISION`)},W(`replay`).onclick=()=>{Z=0,Qo(`OUTCOME_PLAY`)},W(`resetCamera`).onclick=()=>ts(Q),document.querySelectorAll(`[data-branch]`).forEach(e=>e.onclick=()=>{Y===`DECISION`&&is(e.dataset.branch)}),document.querySelectorAll(`[data-view]`).forEach(e=>e.onclick=()=>ts(e.dataset.view)),W(`speed`).onchange=e=>zo=Number(e.target.value)||1;var ss=new Map;G.addEventListener(`pointerdown`,e=>{G.setPointerCapture(e.pointerId),ss.set(e.pointerId,{x:e.clientX,y:e.clientY})}),G.addEventListener(`pointermove`,e=>{if(!ss.has(e.pointerId))return;let t=ss.get(e.pointerId);if(ss.set(e.pointerId,{x:e.clientX,y:e.clientY}),ss.size===1){let n=e.clientX-t.x,r=e.clientY-t.y;Q===`eye`?(Uo=K(Uo+n*.007,-.8,.8),Wo=K(Wo+r*.007,-.7,.7)):($.az+=n*.009,$.el=K($.el+r*.007,.15,1.35))}else if(ss.size===2){let e=[...ss.values()],t=Math.hypot(e[0].x-e[1].x,e[0].y-e[1].y);Ho&&($.dist=K($.dist*(Ho/Math.max(8,t)),15,80)),Ho=t}Zo()});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])G.addEventListener(e,e=>{ss.delete(e.pointerId),Ho=null});G.addEventListener(`wheel`,e=>{e.preventDefault(),$.dist=K($.dist*(e.deltaY>0?1.08:.92),15,80),Zo()},{passive:!1}),G.addEventListener(`keydown`,e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key))return;e.preventDefault();let t=e.key===`ArrowLeft`?-.11:e.key===`ArrowRight`?.11:0,n=e.key===`ArrowUp`?-.08:e.key===`ArrowDown`?.08:0;Q===`eye`?(Uo+=t,Wo=K(Wo+n,-.7,.7)):($.az+=t,$.el=K($.el+n,.15,1.35)),Zo()});var cs=[],ls=[],us=0;function ds(e){Vo=0;let t=K((e-Bo)/1e3,0,.09);if(Bo=e,Y===`INTRO_PLAY`||Y===`OUTCOME_PLAY`){let e=Y===`INTRO_PLAY`?Go:Ko;Z=K(Z+t*zo/e),Z>=1&&Qo(Y===`INTRO_PLAY`?`DECISION`:`RESULT`)}let n=Yo(Y,X,Z);W(`occlusion`).hidden=Q!==`eye`,Q===`eye`&&(W(`occlusion`).textContent=Jo(n)?`地形遮擋：橘色滑手被凸坡擋住`:`視線：前方滑手已可看見`),Lo(Po,n.blue),Lo(Fo,n.orange),Lo(Io,n.purple,X===`C`&&Y!==`DECISION`);let r=Math.min(window.devicePixelRatio||1,1.5),i=Math.max(1,Math.round(To.clientWidth*r)),a=Math.max(1,Math.round(To.clientHeight*r));(G.width!==i||G.height!==a)&&(G.width=i,G.height=a,Ro.resize());let o=performance.now();try{Ro.updateParts(ko,{shadows:!1,checks:!1}),Ro.render(Xo(n)),W(`renderStatus`).textContent=`67.js ${wo} · WebGL2 · ${i}×${a}`}catch(e){W(`error`).style.display=`block`,W(`error`).textContent=`67.js 渲染失敗：`+e.message,window.__pilotError=e.message;return}if(ls.push(performance.now()-o),ls.length>90&&ls.shift(),cs.push(t*1e3),cs.length>90&&cs.shift(),us++,us%30==0){let e=cs.reduce((e,t)=>e+t,0)/cs.length;W(`fps`).textContent=`FPS：`+(1e3/Math.max(1,e)).toFixed(1)}(Y===`INTRO_PLAY`||Y===`OUTCOME_PLAY`)&&Zo()}G.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),cancelAnimationFrame(Vo),W(`error`).style.display=`block`,W(`error`).textContent=`WebGL2 內容遺失，請重新整理。`,window.__pilotError=`webgl context lost`}),es(),Zo(),new ResizeObserver(Zo).observe(To),document.addEventListener(`visibilitychange`,()=>{Bo=performance.now(),document.hidden||Zo()}),window.__pilot={status:()=>({engine:`67.js`,version:wo,phase:Y,branch:X,progress:Z,mode:Q,speed:zo,canvas:[G.width,G.height],frameCount:us,frametimeMs:cs.length?cs.reduce((e,t)=>e+t,0)/cs.length:null,submitMs:ls.length?ls.reduce((e,t)=>e+t,0)/ls.length:null,actors:Yo(Y,X,Z),lineOfSightBlocked:Jo(Yo(Y,X,Z)),rendererError:window.__pilotError||null}),setPhase:Qo,choose:is,setView:ts,reset:ns,terrainHeight:q};