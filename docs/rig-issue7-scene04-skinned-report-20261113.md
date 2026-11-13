# Issue #7 | Scene 04 V3 GPU-skinned continuous-surface rider

**Evidence date:** 2026-11-13 (Taipei). **Scope:** scene 04 「人多時控速」 only.
**Decision:** *Technical pilot GO for Owner visual review*. **NO-GO** for safety-motion certification, automatic ten-lesson migration, merge to main, or public deployment.

## Source and isolation

- New isolated M4 worktree: `experiment/issue7-scene04-skinned-20261113`.
- Source base commit `0d6707c95c9e0e1e5c4234c06c207b858ce6b7c0` (Draft PR #10, scene 04 visual-only body following a rigid root). This inherits separate V3 shape-lab PR #9 and V2 rig PR #8.
- The public published main base is `1b25a752ade56f6997ebd03c67a36ba6407a5caa` (ten-lesson isolated GitHub Pages preview). The original public site, all ten lesson bundles, UX onboarding worktree, scene 01, scene 09, authored source lesson JSON and canonical path/camera/phase Runtime are **not changed**.
- Added GPU deformation solely via `shared/smooth-motion-rig.js` and the scene04 adapter's `createSkinPose` dependency injection. `shared/runtime.js` remains the **only** RAF, scene Renderer67, camera, save/restore, pause and phase owner.
- True private preview was confirmed by exact HTTP page markers and fresh hashed JS under a *previously unused* M4 Tailnet port (8647). Port 8627 belongs to a separate, earlier static trial and was **not** treated as the new source. No changes were made to the earlier port or another worktree.

## What actually changed

The V3 white round-headed, pearl-grey skier is **one contiguous original surface** (16,152 vertices, 5,384 triangles, source 0.10 geometry sampling). On top of the previous rigid-root pilot, it now has **seven GPU skin transforms** and **four normalized influences per vertex**. Each blue/orange/ambient actor and the first-person whole-body inset receives its own skin joint-palette identity but reuses the same immutable geometry.

- Joint 0 remains the identity anchor at ankles. The pelvis, front/rear knees, front/rear arms and head receive bounded pose-dependent transforms; authored `lean` and `phaseProgress` derive the visual deformation. The first-person main canvas hides the skinned body, leaving the original scene eye camera and a separately rendered body inset.
- Blue, orange and purple snowboard equipment retain their established color differentiation. Two separate snowboard bindings and two feet are kept on the same board; board and bindings follow exactly the existing authored path. The V3 head remains featureless and bright. One shared vertex-color gradient darkens the pearl-grey torso/limbs for snowy contrast, without adding an independent helmet or limb components.
- This is **illustrative, deterministic procedural deformation**, not inverse-dynamics, an independently recognized braking technique, a fall/sit pose, or independently established physical speed/force measurements. The flexible body does not invent a new safety result.
- On-page feature flag uses the already existing `rigStyle=legacy/geometric` runtime contract, with `geometric` now rendering V3 skin **only in scene04**. The private A/B comparison labels the two appearances clearly. The default still selects `legacy` and can be changed in place without seeking or restarting.

## Functional and real browser tests

All results below bind to the final built preview and test evidence on M4, **not** to historical V2/PR #10 tests.

| Gate | Result | Actual evidence |
|---|---|---|
| Live GPU deformation (not rigid-root false-green) | **PASS** | Dedicated 67.js WebGL2 probe holds root and camera fixed; progress 0→0.5 changed **4,616 pixels**, lean change a further **5,316 pixels**, and repeated identical pose changed **0 pixels** |
| Old/new authored world-path parity | **PASS** | 320 / 390 / 1280px × A/B/C × 5 sampled times = **45 exact actor-state pairs**; same x/y/z/yaw/lean, phase, branch and progress |
| Main camera/scene render | **PASS** | 3 viewports × 3 camera modes = **9 A/B screenshot pairs**; main WebGL2 context no reported error; 27 machine-captured scene screenshots plus close/compare, first-person inset and 5 curated contact sheets |
| Original published scene 04 pixels | **PASS** | 390px side B midpoint: 0 changed scene pixels, excluding transient top-left camera toolbar hover pixels |
| A/B UI, practice/demo, speed and replay controls | **PASS** | Real Chrome clicks: old/new toggle preserves state, demonstration/practice, 0.25x speed, retry, choose C, pause; separate dual-iframe comparison stays synchronized |
| Idle/blur/failed WebGL | **PASS / PARTIAL** | Paused idle 60s at 390px: stage & canvas **440.6875px**, page **1210px** unchanged; synthetic window blur pauses without auto-resume; disabled WebGL2 shows original-release fallback link. **Real OS background cycle not measured.** |
| Shared architecture unaffected | **PASS** | Original site Node tests 24/24; all ten original public test pages' 30 A/B/C branch-click-to-result paths PASS; scenario source and existing shared Runtime unchanged |
| Actual mobile hardware/learners | **NOT_RUN** | Simulated viewport sizes are M4 desktop Chrome, **not** physical iPhone Safari / Android, not a learner or professional motion approval |

Source-level regression: 5 new skin tests, 3 previous scene04 visual-rig tests = **8/8 PASS**. The independent V3 shape lab retains its separate **4/4 PASS**. All visual snapshots originate in M4 Chrome 67.js WebGL2 rather than synthetic illustrations.

## M4 performance (limited; not a GPU/mobile benchmark)

The original JS bundle gzipped to **77,492 B**; the updated scene04 pilot is **83,773 B** (roughly +8.1%). Renderable parts grow from **169** in published original to **209** in switchable pilot, and batching from **7 to 11** because both appearances remain registered during the comparison; this is not the final production optimization target.

Three interleaved 2.3-second Chrome 390px CDP TaskDuration runs measured median busy time: **16.26%** published classic, **17.22%** pilot classic, **17.26%** pilot GPU-skinned V3. This limited, variable **main-thread** measurement is not an FPS, GPU workload, memory, energy/thermal, or statistically reliable proof of performance equivalence or regression. It shows no supported performance improvement claim.

## Actual screenshot references

- `rig-issue7-evidence/scene04-skinned-ab-mobile.png` — 390px A/B (top, side, first-person).
- `rig-issue7-evidence/scene04-skinned-ab-desktop.png` — 1280px side A/B.
- `rig-issue7-evidence/scene04-skinned-branch-timeline.png` — three safety branches × three authored points.
- `rig-issue7-evidence/scene04-skinned-gpu-proof.png` — identical root/camera, GPU skin changes across poses.
- `rig-issue7-evidence/scene04-skinned-zoom.png` — live in-scene close zoom at B midpoint.

Complete raw PNGs, JSON E2E / GPU / performance / 60-second regression records are kept **outside** source and published static HTML in an M4-only QA directory. Their source/build sha256 values must be checked against the exact commit before reuse; a previous pass cannot be inherited by a later mutation.

## Unpassed gates and recommended decision

- **PARTIAL (visual readability):** The V3 continuous figure is easier to distinguish from V2's robot-like detached joints at close zoom. At 320–390px in an actual crowded snow scene, white/pearl-grey bodies can still look faint, and more distant rider identity depends heavily on board color. This is a material educational clarity issue for the Owner to judge.
- **PARTIAL (motion accuracy):** The seven-joint GPU deformation moves beyond a rigid root. However knee flexion, arm swing and weight transfer have only a bounded *programmatic* mapping from existing pose values; no professional proof that braking speed, balance, posture and collision avoidance can be inferred from those joints. Do not claim a certified safety demonstration.
- **PARTIAL (first person):** First-person uses unchanged legacy eye height (2.05 units relative to original authored pose); the V3 head rises higher. Deliberately not changing the camera avoids silently changing safety visibility, but eye/head equivalence remains unresolved.
- **NOT_RUN:** actual iOS Safari/Android Chrome, two-finger physical zoom, true native background/resume, 30-minute GPU/temperature/power, learner comprehension, verified sit/fall motions, snowboard technique authority, ski-specific two separate skis, and all ten lesson V3 migrations.

**Verdict:** The requested *one-lesson GPU-skinned A/B engineering experiment is implemented and browser-proven*. **GO** to Owner visual/motion review of scene 04 only. **NO-GO** to treating V3 as the correct teaching motion, merging all linked Draft PRs, default release, or replacing the public ten lessons.

## Reproduction and rollback

On an authorized development computer with Node.js >=24 and Chrome:

```sh
cd experiments/67js-opt/scene04
npm ci --ignore-scripts
npm run build -- --base=./
mkdir -p /tmp/scene04-skin-review/lesson04
cp -R dist/. /tmp/scene04-skin-review/lesson04/
cp ../scene04-skin-compare/index.html /tmp/scene04-skin-review/index.html
python3 -m http.server 8647 --bind 127.0.0.1 --directory /tmp/scene04-skin-review
```

Open `http://127.0.0.1:8647/` for side-by-side scene04 comparison. `experiments/67js-opt/tests/smooth-skinned04-e2e.cjs` uses that preview URL, with the unchanged original site served locally at port 8597. For isolated fixed-root GPU validation, run Vite development server from the `scene04/` folder (port 8633) to expose `/fixtures/skin-probe.html`; then run `smooth-skinned04-pixels.cjs`.

Rollback is **instant in the private page**: click the rig toggle from V3 to original without resetting the branch/time. To abandon, stop this preview server and leave the isolated branch / stacked Draft PR unmerged. None of the original `site/` assets or the UX branch require a reset or restoration. A future separately approved merge must be reverted by its exact reviewed commit, not by hard-resetting someone else's worktree.
