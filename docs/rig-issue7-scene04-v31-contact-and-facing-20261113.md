# Issue #7 — Scene 04 V3.1 / Snow contact + minimal orientation markers

Date: 2026-11-13 Asia/Taipei. Engineering status: **PILOT / Owner visual review**.

## Bounded purpose

Owner identified two errors in scene 04's previous V3 GPU-skinned snowboarder:
1. snowboard appeared to float or cut into the sloping terrain rather than glide on it;
2. featureless white/gray front and back were difficult to distinguish.

This isolated trial addresses *only* those two visible problems in lesson 04. The default remains the existing classic rider; the old/new A/B button and private, paired comparison page remain available. No changes to authored safety data, actor x/z tracks or yaw/lean/branch, shared Runtime/camera/phase/RAF, the public `site/` output, the UX onboarding branch, or the nine other lessons.

## Actual implementation

- `shared/snowboard-ground.js`: receives authored source x/y/z/yaw and the canonical scene `H(x,z)`. Samples snow along a board-length ±1.22-unit tangent and ±0.45-unit cross slope, builds a right-handed orthonormal board basis and bounded edge angle derived only from existing authored lean. A rigid board/boots/bindings assembly follows one terrain contact plane; contact samples at seven longitudinal positions × three lateral offsets find the small vertical lift needed to keep the deck outside the terrain. Body visual root follows the same basis and visual-only lift. **The timeline, scenario events, world-source authored root, camera height and safety consequences remain unchanged.**
- `shared/smooth-motion-rig.js`: V3 GPU skin remains one shared continuous body with per-actor skin joint palette. Added a small forward-facing round color emblem and a short vertical upper-back stripe. Both are separate *surface-conforming*, GPU-skinned decal meshes, not joint balls or a face. Board role colors (blue, orange, purple) are reused; no clothing textures or borrowed third-party mesh assets. They disappear in the main first-person view, remain visible in the body inset, and disappear on classic rollback.
- `scene04/src/app.js`: injects the **same canonical H** into the scene04-only visual rig choice; no duplicate snow-height authority.
- `scene04-skin-compare/index.html`: clearly labels the V3.1 ground contact/orientation changes. Actual private preview is built outside the GitHub Pages `site/` tree.

## Why the old board was visibly wrong

Before this change, board parts were given a fixed local y offset and only yaw, while the authored scene's snow height drops along travel. At one verified scene04 B-branch midpoint, the old board part center was roughly **0.40 scene units above snow near the front and 0.11 units below snow near the tail** (centerline approximation, before board thickness). This cannot depict a properly snow-supported board. The V3.1 visual assembly fits local snow slope without changing the snowboarder's actual lesson path or pretending to compute real-world centimeters, forces or friction.

## Verification bound to V3.1 source / final bundle

- **Geometry unit tests PASS**: three branches A/B/C × six outcome progress samples × two principal actors (36 source rider pose cases) and seven longitudinal × three lateral points per pose (756 contact samples). All sampled board support gaps **0.016–0.064 illustrative scene units**, with none below terrain and max visual root adjustment **0.061 units**. In addition, both ambient traffic riders and intro/decision frames were sampled. A bounded smooth deck gap is not proof of physical edge mechanics or of all untested terrain/speeds.
- Board source-root parity: source frame remained unchanged; snowboard matrix has non-flat longitudinal pitch, boot and binding matrices follow the identical fitted basis; both feet remain mounted to one board. The original old-gear path is retained for immediate classic rollback.
- Front/back marker tests: exactly two minimal markers per V3 actor; one round chest emblem and one taller/narrower upper-back stripe, both on the body's skin palette and in the corresponding rider identity hue. Standalone actual M4 WebGL2 front/back/oblique screenshots show the final **clean round dot and clean single vertical stripe**, unlike an earlier jagged polygon attempt, which was rejected during review.
- **Actual browser E2E PASS after the final source/bundle**: M4 Chrome 320×740, 390×844, 1280×820, × A/B/C × five sampled times = **45 exact pairs of authored actors**, and three views × three sizes = **nine screenshot A/B pairs**. 27 scene screenshots, screenshot contact sheets, real toggle/playback/demonstration/slow speed/retry/branch/first-person inset. Original published scene04 image pixels remain identical in the classic option (except transient toolbar hover region). Browser WebGL2 error and fallback behave as before.
- Synthetic blur/no automatic resume is a handler-level check, not actual OS native tab lifecycle acceptance. The 60-second 390×844 viewport test **PASS**: stage and canvas height remained **440.6875 px**, document scroll height **1210 px**, no page elongation; synthetic blur paused until explicit resume. This is **not** native OS tab-switch acceptance.
- **Original repository release Node tests 24/24 PASS**, and prior GPU fixed-root negative control still PASS (4,616 changed pixels for knee/progress, 5,316 for lean, 0 for repeating identical pose). Source contains no second RAF, engine, camera, or authored route/physics rewrite.

## Lightweight M4 performance control (not GPU/phone benchmark)

Three interleaved Chrome headless 390px trials, 2.3 seconds each, measured CDP main-thread TaskDuration median: published classic **14.48%**, V3.1 pilot in classic style **14.49%**, and V3.1 **15.68%**. Registered parts **169→217**, renderer batches **7→19**, with both A/B rigs and additional identity markers retained. This is a small noisy main-thread sample, **not** proof of acceptable physical phone FPS, GPU latency, battery, temperature, or statistically significant differences. Bundle SHA and performance JSON remain bound to this candidate and are not generalized to other scenes.

## Curated evidence

- `docs/rig-issue7-evidence/scene04-v31-facing-3views.png` — genuine M4 67.js front/back/oblique closeups.
- `docs/rig-issue7-evidence/scene04-skinned-ab-mobile.png` — actual 390px simulated viewport paired top/side/eye screenshots.
- `docs/rig-issue7-evidence/scene04-skinned-ab-desktop.png` — 1280px desktop paired screenshot.
- `docs/rig-issue7-evidence/scene04-skinned-branch-timeline.png` — scene04 A/B/C three-step authored result screenshots.
- `docs/rig-issue7-evidence/scene04-skinned-zoom.png` — near-zoom original vs V3.1 contact/markers in the actual lesson.

All source QA JSON files and raw captures stay outside public source release and are not copied under `site/`. The M4 private Tailnet preview is a volatile review page, not a public deployment. The exact final commit/JS SHA is recorded after commit/rebuild for traceability.

## Open gates / decision

**GO to Owner scene04 visual comparison**: sampled board no longer floats/tunnels on the authored local snow; marker difference can identify front/back without a new detailed face or costume; A/B + scene operation preserved.

**NO-GO to deployment or safety certification**: snow contact is a geometry-fit display approximation, not real snowboard pressure, carve/edge dynamics, flex or normal force; body movement is still procedural and not independently verified against real ski coaching. Unverified: actual iPhone Safari/Android Chrome, native tab background, 30-minute GPU/battery/heat, dynamic occlusion for every frame, snow contact on other terrain/scenes, professional snowboard technique and beginner comprehension. Do not interpret an automated PASS as a rider-skills endorsement.

**Rollback:** switch to classic in the private scene without reloading/losing the branch/time, or leave this isolated feature branch unmerged and stop its private preview service. No `site/` restoration, public deployment rollback or resets of other active worktrees needed.
