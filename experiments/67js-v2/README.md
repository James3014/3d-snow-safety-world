# 3D Snow Safety World — 67.js V2, Scene 01

Isolated first-lesson candidate, not a replacement for the ten official lessons. Comparison: `site/67js-v2/compare.html`. Original: `site/scene-01-speed.html`. V1: `site/67js/`.

## Locked reproduction

- Runtime: `67js` npm alias `@codepawlhq/67js@0.19.0`, MIT. Build with Vite 8.3.5.
- `npm ci` (requires Node.js 20.19+, modern Chrome with WebGL2 for browser verification)
- `npm run build -- --config vite.publish.config.js --base /3d-snow-safety-world/67js-v2/`
- Copy the resulting `dist/` to `site/67js-v2/`. Keep ten-lesson site untouched.
- Local QA commands: `npm run test:acceptance`, `npm run test:e2e`, `npm run test:capture`, `npm run test:benchmark` (browser tests require a local Chrome; set `V2_URL` for the exact URL).

## Scope

The blue snowboarder, orange blind-crest rider and purple late-arrival rider retain the original authored illustrative trajectories for A/B/C. The terrain is actual triangle geometry with true-elevation contour strips (not invisible/hide-toggled riders). New segmented procedural rig shares time/pose logic with the 3D posture inset. Contains a separate first-person board/downlook mode and correct two-finger eye FOV zoom, bilingual Chinese/English controls, three cameras, pause/replay and speeds.

Explicit render `pixelRatio=1`; dynamic shadow refresh every 5 animation frames. This was selected after a bounded CPU experiment. It is not measured mobile hardware FPS. Despite posture improvements, the 67js model is **procedural jointed primitives, not an imported professionally rigged glTF / certified biomechanical motion**.

## Negative controls and limits

- V1 lacks lookdown/expanded-stance and eye pinch. Comparison page must label these missing rather than showing fake screenshots.
- WebGL2 unavailable: V2 reports failure and directs users to the software-fallback original. It **does not** implement interactive software 3D itself.
- Real iPhone Safari, 200% text resizing, GPU VRAM/thermal and live human learning tests: NOT_RUN. The Chrome simulated-mobile tests are not hardware certification.
- One lesson only, do not adopt across all ten without Owner approval.

Evidence: source SHA in Git commit, screenshots under `site/67js-v2/comparison-assets/` are real M5 Chrome viewport 390×844 images from original/V1/V2. Standalone camera contents may differ; do not treat pixel brightness as a controlled renderer quality comparison. Runtime performance medians are provisional until measured across all three public GitHub Pages URLs.
