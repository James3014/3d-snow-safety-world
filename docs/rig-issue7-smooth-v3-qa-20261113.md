# Issue #7 | Smooth skin / no separate joint balls | V3 shape-only gate

Date: 2026-11-13 (Asia/Taipei). Source base:
`f4f208be8028ea054102dcc2781c406d4f885663` (previous V2 Draft PR #8).

## Decision boundary

Status: **SHAPE REVIEW CANDIDATE; NOT ADOPTED**. No lesson implementation,
merge, production release or replacement of the ten public lesson bundles.
The Owner has **not yet approved** this look. It is not a physical motion or
learner-comprehension certification.

## The visual change

The V2 rider is assembled from separate box/sphere/capsule-like limbs and
visible ball joints. V3 instead generates a *single, connected* surface from
blended tapered body volumes and a featureless spherical head. Arms, elbows,
shoulders, hips and knees are integrated into the same smooth-shaded mesh.
The board is independent; both boot/foot ends lie on the same board with two
bindings. The single-surface geometry is checked using welded-edge triangle
connectivity. No third-party video, mesh, animation or texture assets are used.

The sculpt is a separate static-pose proof of concept, **not a real-time skinned
Rig**. Three surfaces are precomputed for standing, snowboard knee bend and
weight-shift silhouettes. The runtime has not been updated to create one
continuous deforming mesh, so the V3 look cannot yet drive the 67.js lesson
actor's authored x/y/z/yaw/lean timeline or validate braking/turning behavior.
The old and new preview canvases use the same camera and scale but the V2
skeletal stance is **not identical** to the V3 pose and therefore cannot
serve as a same-pose safety-path comparison.

## Actual visual evidence

- `rig-issue7-evidence/rig-smooth-v3-before-after.png`: the two WebGL2
  preview renderers at the same camera, captured by M4 Chrome.
- `rig-issue7-evidence/rig-smooth-v3-six-views.png`: independent V3 screenshots
  for standing, snowboard bend and weight shift, each from front and side.
- The private lab itself supports front/45-degree/side, mouse/touch drag,
  zoom, stand/snowboard/carve and dark/snow light/sky environments.
- Daylight snow contrast is perceptibly weaker than the dark-studio result;
  small-distant-character readability has not been proven.
- The new result is closer to the desired smooth silhouette, but broad shoulder
  transitions and limited authored poses remain an artistic judgement for
  the Owner, not an automated PASS.

## Verification on M4

- Initial RED: missing mesh implementation, then slimming revealed separate
  components in snowboard/carve. Fixed the shoulder attachment within the
  isolated lab until all three poses produced one connected surface.
- 4/4 geometry unit tests: nonempty finite vertices and normals, bounded
  vertex budget, connectivity=1 for all three poses, head/leg proportions,
  two snowboard bindings and deliberate bend/lean variation.
- 27 actual WebGL2 combinations: 320, 390, 1280px × 3 poses × 3 camera
  presets, plus WebGL disabled fail state. 28/28 checks PASS on M4 Chrome,
  including snow-vs-dark real raster difference, pointer rotate, wheel zoom,
  zero horizontal overflow, 12 actual screenshots, no JS page exceptions.
- 60-second paused/idle M4 Chrome 390x844: the document remained 390x1503,
  and each canvas retained 306.765625px height; no resize feedback loop.
- Exact V3 appearance source SHA-256: `5f408deaa9161adc6ce4f3d5caa7d7f24649dc34cefc5c824208df23488c1f8e`.
  Compiled private preview JavaScript SHA-256: `fc0e659913c8702103cdadd8f365aca8d8adcce84450789b166dd790c5eab72e`.
- Original repository's 24/24 static release tests PASS; none of `site/`,
  `experiments/67js-opt/scene01/`, `scene04/`, `scene09/`,
  `experiments/67js-opt/shared/runtime.js` or the UX branch were changed.
- Browser viewports emulated mobile size **on desktop Chrome**, not an iPhone
  or Android hardware acceptance.

## Explicit incomplete gates

- NOT_RUN: physical mobile browser, native WebKit/Safari, 30-minute thermal/GPU,
  continuous skinned animation at 60fps, first-person view height tied to the
  new head, live A/B/C safety movement, real fall/sit motions and ski-specific
  two-ski lesson. No change to safety causality was attempted.
- PARTIAL: snow visibility, movement interpretation, shoulder/hip style
  fidelity. The new shape must be reviewed at normal mobile-size and at close
  range before there is authority to integrate scene 04.
- Rollback is simply to stop the private shape-lab HTTP server or leave this
  feature branch unmerged. The old V2 Draft PR #8 remains intact.

**Owner's next decision**: Is V3's continuous silhouette an acceptable
visual direction for a separate real-time deformable Rig test? If yes, the
next bounded step would be just scene 04, RED-first safety pose parity.
