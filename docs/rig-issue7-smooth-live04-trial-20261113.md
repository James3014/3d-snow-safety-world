# Issue #7 | True smooth surface in authored scene 04 — visual integration trial

Date: 2026-11-13, Asia/Taipei. Source base:
`157fa7fb1c1a5017be39719d0a441643b310e18b` (Draft PR #9, V3 continuous-surface shape lab), itself based on the V2 Draft PR #8.

## Verdict and scope

- **Visual gate: GO to Owner side-by-side review of actual 67.js scene 04.**
- **Motion/safety gate: NO-GO to accepting this as a sliding/falling/braking technique animation** or replacing scenes 01, 09, the ten lesson Session, or the production/original site.
- New preview is an independently built, private test of *only* scene 04, not a public or approved deployment. Default remains the original rider. A/B button returns the original without changing branch/time/camera.

## What is now true versus the prior static shape lab

The V3 static lab supplies a **single, original, connected SDF/marching-tetrahedra surface**. This integration creates one 16,152-vertex / 5,384-triangle contiguous body shared across all instantiated actors; connected components = 1. Two snowboard bindings, the directional board, and original paths remain. All body pieces are one shaded surface, not separate shoulder/elbow/knee balls.

A small adapter `experiments/67js-opt/shared/smooth-motion-rig.js` uses the existing `Renderer67`, `shared/runtime.js` and exactly the original `frameFor` pose source. The body's rigid root and lean now respond continuously to the authored x/y/z/yaw/lean, as do the original snowboard and bindings; the selected scene 04 adapter alone calls this alternate visual rig factory. It does **not** generate true bendable joint skinning. No new renderer, RAF, timer, camera or safety-decision policy was introduced.

The smooth model's built-in knee/elbow sculpt is static while the whole body moves. This matters: a root-path parity check **cannot** prove that the learner sees correct stopping, knee flexion, directional looking, fall or weight transfer. The single shape is not yet a complete, dynamically skinned rig.

## Verification, with evidence limits

- RED: factory missing; then 3/3 new unit tests passed after the bounded scene 04 integration.
- Existing shape-lab geometry tests: 4/4 passed. Original static-release tests: 24/24 passed.
- M4 Chrome 157, actual WebGL2: 320, 390 and 1280px browser viewports; A/B/C × five time checkpoints, comparing all authored actor source values between original and smooth, plus three camera modes. **55 observable checks and 19 true browser Canvas screenshots passed**, zero JS page exceptions.
- A dedicated scene 04 390px pixel positive control requires over 400 body-colored pixels *above* the snowboard; observed 747. This avoids the earlier false-green case where mesh indices rendered only boots/board while the body was absent.
- `60 seconds` paused idle at 390px: stage and canvas height 440.6875px, shell 1209.90625px and document height 1210px before and after, unchanged.
- Three short, interleaved 2.3-second M4 Chrome CDP TaskDuration probes at 390px: main-thread busy median, published legacy 15.34%, candidate legacy 14.27%, candidate smooth 16.45%. These volatile, tiny samples show **no confirmed performance advantage** and cannot certify mobile GPU/FPS/battery/thermal cost. Registration count in scene 04 increases from 169 published to 209 in switchable pilot; batches 7 → 8.
- Actual first-person and mini self-pose paths are kept, and self body is hidden in first person to avoid blocking the forward view. But the smooth model's visible head height and the existing eye camera height are different: their teaching semantics still need review before approval.
- No native iPhone/Android, touch/back-to-background OS lifecycle, long-run GPU test, cross-language learner understanding, continuous bone motion, fall/sit case, or ski-specific two-ski scene was accepted (`NOT_RUN`).

## Visual evidence

- [Actual scene 04, 1280px V2 vs continuous-surface V3, zoomed side-by-side](rig-issue7-evidence/smooth-live04-v2-v3-zoom.png)
- [Actual scene 04, 390px V2 vs V3](rig-issue7-evidence/smooth-live04-v2-v3-mobile.png)

These images are exact Chrome WebGL Canvas screenshots. Both variants use the same authored root position/time/camera, but *not* identical articulated limb shape. Their visual difference is **not** an equal-pose safety validation.

Machine records and uncurated screenshots are kept separately from the published repository and private static web root, in an authorized M4 QA directory. No private host address or personal files are committed.

## Rollback / next gate

1. In the scene 04 private experiment, click **切換原有角色**; scenario phase, branch, and timer do not reset.
2. Stop the isolated private HTTP server and leave this Draft stacked PR unmerged; public ten-lesson assets and the UX worktree remain unchanged.
3. Only after Owner confirms this continuous-surface silhouette should a separate, bounded scene-04 **deformable skinning/IK + motion equivalence** experiment start. Its negative controls must test false pose parity (root coordinates match but knees/hands incorrectly move), motion clarity, exact independent camera/eye height, and memory/GPU impact. No automatic 3→10 migration.

**Never describe this as approved skiing technique, completed ten-lesson compatibility or a production deployment.**
