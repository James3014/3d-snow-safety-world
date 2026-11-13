# 3D Snow Safety World | Issue #7 | Three-lesson geometry rig trial

> **Owner visual feedback iteration (2026-11-13, V2):** The first
> A/B candidate looked too short, bulky and robotic. V2 replaces the dark
> joint/helmet styling with a taller white/pearl-gray, round-headed,
> narrow-torso stick silhouette. The original V1 measurements below are
> retained as historical evidence, not proof of the latest V2 performance.
> The new 3-lesson V2 browser run and 6 unit tests passed; the separate
> real-device and head-height/first-person viewpoint teaching check remains
> NOT_RUN / PARTIAL. Do not merge or publish by default.


Evidence date: 2026-11-13 (Asia/Taipei)
Decision: GO to Owner review of the three-lesson pilot; NO-GO to automatic
replacement of all ten lessons or production deployment.

## Exact source and isolation

- Public main base: 1b25a752ade56f6997ebd03c67a36ba6407a5caa
  (isolated 67.js ten-lesson GitHub Pages preview).
- Historical shared source imported as files from existing M5 experimental
  commit b8470031fdb546b4233a44b764af5e069dd1d300, without modifying
  its worktree. The candidate was implemented and verified on an independent
  M4 Git worktree, based on public main.
- The separate onboarding branch at 6a3923a is not merged into or changed by
  this candidate. None of site/ or original scene assets were modified.
- The previously published ten lessons remain a separate public preview,
  not a certified product release.

Canonical source continuity was verified:
- Scene 01 authored crest track blob: 9fee6171f7eaaac87af5fb8b36d85a3697047e36
- Scene 04 authored source lesson blob: 51ad3eea3be6315579edf178b27d31e0c15c1e84
- Scene 09 authored source lesson blob: a8ee0b34fbc2186271901f14c99bab5fb1ff67f3
All three match their pre-change experimental source objects exactly.

## Geometry, pose and A/B operation

The new geometry source is experiments/67js-opt/shared/geometric-rig.js.
It creates a featureless light spherical head, light torso, simplified thick
limbs, dark joints, identity-colored shoulder/collar details and bindings.
The geometry carries no actor trajectory, causal policy, second renderer,
second animation clock or replacement camera implementation.

Each actor contains the legacy and proposed renderable parts. One style is
placed outside the frustum at a time; toggling the live A/B button reuses
the same authored x/y/z/yaw/lean/progress, existing phase/branch and camera.
The first-person inset uses the same selected rig and authored source.
The old rig remains available through the same button. This reversible
implementation intentionally adds GPU-side model registrations and is not
an optimized final ten-lesson deployment architecture.

All three actual source lessons are snowboard. The optional ski geometry
uses two separately positioned skis and a lateral leg/shoulder stance,
but it has only passed a unit test. It is NOT an accepted ski-lesson
replacement, a validated weight-transfer biomechanical model or an
independent fall/sit animation.

## Reproducible test results

- Shared geometry unit tests: 4 PASS (original default and recovery,
  featureless head/role color/two snowboard bindings, two separated skis
  and different stance, identical authored pose after change).
- Browser A/B: 9 scenario-by-viewport combinations PASS: 01/04/09 at
  320x740, 390x844 and 1280x820, using real M4 Chrome 157 WebGL2 with
  mobile-sized browser viewports, not mobile phone hardware.
- For each combination, 3 branches times 5 authored time points were
  compared (135 pairs). Actor identities and x/y/z/yaw/lean source objects
  were exactly equal across the original and proposed rig.
- Three camera positions in each viewport (top/side/eye), real screenshot
  raster differences, live A/B button, visible first-person self inset,
  practice/demo, 1x/0.25x speed, pause, retry and chosen branch passed.
  A total of 73 actual PNG screenshots were captured; curated evidence:
  rig-issue7-evidence/rig-ab-contact-320.png,
  rig-issue7-evidence/rig-ab-contact-390.png and
  rig-issue7-evidence/rig-ab-contact-1280.png.
- Compared against the unchanged published lesson assets at 390px,
  B-branch midpoint, side view: scene Canvas pixels EXCLUDING the
  top-left toolbar matched exactly for all three lessons (zero changed
  pixels). The full-canvas pixel comparison may vary by transient toolbar
  hover state, so those pixels are deliberately not counted as rig parity.
- 60-second paused idle on 390px: stage 440.6875px, shell 1209.90625px,
  page height 1210px and canvas 440.6875px were unchanged.
- Original public ten-lesson test assets: all 10 real WebGL2 loads PASS;
  all 30 A/B/C decision-click-to-result smoke paths PASS.
  The ten-lesson Session root loaded as expected; this does not claim
  a newly released or migrated ten-lesson rig.
- WebGL2 disabled: the actual trial failed closed and displayed a working
  link to the existing published original instead of hanging in Loading.
- Synthetic blur event: the shared runtime paused and did not auto-resume;
  it does NOT prove native tab lifecycle. Headless Chrome did not emit
  blur or visibilitychange when its tabs were switched, so real
  foreground/background QA remains NOT_RUN.
- Static original GitHub Pages release regression: existing Node release
  tests 4/4 PASS, and source branch changed no file under site/.

The full machine-readable records remain outside the static release and
Git branch in the private local QA directory:
rig-browser-report.json, rig-regression-report.json,
rig-performance-report.json, ten-branch-smoke.json and the PNG matrix.

## Size, runtime cost and maintainability

This is a 67.js 0.19.0 geometry change, not an engine comparison.
The independent bundles grew compared with the exact prior published
bundles (same scenario, different rig code):

| Lesson | Original JS gzip | Candidate JS gzip | Delta |
| --- | ---: | ---: | ---: |
| 01 | 74,407 B | 76,413 B | +2,006 B (+2.7%) |
| 04 | 77,492 B | 80,395 B | +2,903 B (+3.7%) |
| 09 | 77,472 B | 80,368 B | +2,896 B (+3.7%) |

On lesson 04, original registry count was 169 parts, the switchable
candidate 305 parts (+136). Both had 7 renderer batches. This overhead is
expected because the pilot keeps both rigs present for instantaneous A/B.

M4 Chrome 157, 390x844, three interleaved 2.3-second TaskDuration trials,
same authored B-branch outcome: median main-thread busy percent was
15.84% for public original, 16.81% for candidate legacy view and
17.12% for candidate geometric view. This small, variable sample is
NOT proof of an inherent speed improvement or a statistically reliable
performance regression. No GPU memory, battery, heat or physical phone
FPS measurement was made.

One shared geometric module, three scenario adapter integrations and one
small UI/controller extension in the existing shared runtime preserve
maintenance boundaries. The already existing source bundles still carry
legacy procedural rider definitions; if expansion is approved, reduce
duplicate registered geometry before replacing any production lesson.

## Known limits / Owner gates

PASS: three visual samples, 390px identity/readability visual spot checks,
baseline actor trajectories, WebGL2, comparisons, input controls, ten public
lesson smoke checks, 60s paused idle and explicit fallback link.

PARTIAL: motion readability. Head/arms/board can be seen in actual Chrome
captures, but the posture, braking, weight shifts and lift-exit body angles
have not been approved by a human ski-teaching Owner across all recorded
frames, nor validated with beginners. Snow contrast is improved with a
light head material and dark joints, but very distant figures remain small.

NOT_RUN: actual iPhone Safari and Android browser tests, native macOS
Chrome/Safari background transitions, physical dual-touch/zoom, 30-minute
GPU/heat/power tests, fall/sit mechanics, a real ski-specific lesson,
professional movement and learner comprehension validation.

GO: request Owner to review the side-by-side evidence for lessons 04,
01 and 09 and decide whether a tighter performance/motion pilot is useful.
NO-GO: do not merge or deploy the rig as the default for all ten lessons.
A three-lesson test does not constitute ten-lesson content or safety signoff.

## Review and rollback

The private isolated HTML comparison is generated by
experiments/67js-opt/scripts/build-rig-preview.sh into an output folder
outside GitHub Pages site/. The URL is shared privately with the Owner;
there is no public test deployment of this rig.

Within the preview, click 切換原有角色 for immediate visual rollback at
the same branch/time/camera. To abandon the experiment, stop its private
preview service and leave the candidate PR unmerged. If a future separately
authorized merge is performed, revert that exact reviewed change through
the repository process, not by resetting another active worktree.

No new lesson, change to safety causality, production deployment, automatic
ten-lesson migration or professional certification is authorized here.


## 2026-11-13 follow-up: stickmaxx-inspired character revision (V2)

After Owner indicated the V1 figures looked too bulky, a new geometry-only
revision was prepared in a separate M4 worktree and visually compared with V1.
The supplied third-party image is only a visual reference: no third-party
model, animation, textures, or copied art are included.

Changes: a single featureless white spherical head (no gray helmet shell),
longer shin/thigh/arm silhouette, narrow torso and hips, smaller rounded limb
joints with a common pearl-gray/white surface, and unobtrusive identity colors
on the board and a small chest mark. Snowboard feet and bindings stay at their
original coordinates. Original timeline, decision consequences, trajectories,
camera, WebGL2 renderer, playback and old model rollback remain unchanged.
The two-ski geometry is still an unaccepted unit-test-only variant.

- Side-by-side reference to *our* V1: `rig-issue7-evidence/rig-style-v1-v2-zoom.png`.
- Latest V2 has 9/9 browser viewport/lesson combinations passing (320, 390,
  1280 pixels), 73 new Chrome canvas screenshots, 135 authored-pose comparisons,
  6/6 rig unit tests, 24/24 original site tests, and 3/3 original scene
  screenshots with unchanged scene pixels (toolbar hover excluded).
- V2 registered parts: lesson 04 297 (was V1 305), lesson 01 314 (was 320),
  lesson 09 154 (was 158). 04 still exceeds published legacy 169.
- V2 CDP experiment (three 2.3-second interleaved 390px rounds) measured
  median main-thread busy at 14.99% published original, 14.53% V2 pilot
  legacy view and 16.75% V2 geometric view. Too variable and brief to claim
  speedup, GPU efficiency or statistically reliable degradation.
- V2 round-head geometry is vertically taller than the original camera eye
  anchor, whose old authored height remains unchanged. This intentionally
  avoids silently altering the blind-crest causal camera but means accurate
  first-person head-to-eye alignment is still PARTIAL and must be resolved
  before any teaching-use adoption. Mobile physical hardware NOT_RUN.
- Important visual limitation: compared with the reference clip, V2 retains
  additional board equipment and necessary snowboarding bent knees, and white
  bodies remain smaller/less contrasted in distant views. An exact likeness
  is not claimed, nor a professional motion/learning-clarity sign-off.

Disposition: proceed to Owner visual review only. No auto-merge, ten-lesson
replacement or public deployment.
