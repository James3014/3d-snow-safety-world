# 3D Snow Safety World / Lesson 01 / 67.js V2

Isolated parity-oriented rebuild of the first *blind convex crest* snowboarding scenario. Uses `@codepawlhq/67js@0.19.0` via the npm alias `67js`, `Renderer67` with WebGL2, a procedurally articulated snowboard rider with shared live pose data for the first-person inset, marching-squares elevation contours, character position/yaw parity with the existing first lesson, A/B/C visual outcomes, bilingual UI, first-person board view, functional pinch zoom, 0.25×–1× playback and a controlled shadow-update cadence.

This is NOT a skinned glTF model or a physically verified snowboarding technique. The articulated rig is a deterministic procedural skeleton-like assembly of parts, with segment transforms and joint poses. No calibrated speed, stopping distance, collision or learning effectiveness is claimed.

Run from this folder on Node 20.19+:

```
npm ci
npm run dev -- --host 127.0.0.1 --port 8398
npm run build -- --base /3d-snow-safety-world/67js-v2/
```

`../..` at the GitHub repository root includes the published output at `site/67js-v2`. Source and published output are separate; the ten original lessons and the 67.js V1 remain unchanged.

Automated non-human QA (requires Chrome): `node tests/v2-e2e.cjs`, `node tests/v2-acceptance.cjs`, `node tests/v2-capture-three.cjs`; set `V2_URL` to point at a live V2 server or the public URL. Real iPhone Safari testing, 200% zoom, all browser permutations, physiological motion accuracy and human learning outcomes are NOT covered by passing these scripts.

The comparison snapshots in `site/67js-v2/evidence` were captured from the original public WebGL lesson, public 67.js V1 and the V2 development build at a 390×844 mobile-emulated Chrome viewport; compare them as illustrative render evidence, not controlled perceptual-quality metrics.

No source or file in this package requires signing in, proprietary assets, or SkiDIY customer data.
