# Issue #7 V3 | Separate smooth-manikin shape lab

This is an isolated shape study based on the user's desired round-head, smooth
human-silhouette style. It does **not** use the third-party reference video,
model, textures, or animation. It does **not** modify scene 04, the shared
lesson Runtime, original `site/`, the UX branch, or deployed GitHub Pages.

## Approach and limits

- `smooth-skin.js` defines three human poses (`stand`, `snowboard`, `carve`).
  A smooth signed-distance field unifies torso, neck, spherical head, both
  arms and both legs into **one connected surface** (marching tetrahedra).
  No floating elbow, shoulder, hip or knee spheres are added.
- The snowboard is separate equipment. Two feet are spaced along the same
  board and two bindings are independently represented. These three static
  poses are not yet a skinned, continuously interpolated animation Rig.
- The `67.js` renderer is reused for both independent preview canvases. The
  original V2 source rider is shown as a baseline; it retains its prior
  authored pose, which is **not identical** to any of the new V3 poses.
  Comparing silhouettes must not be misrepresented as safety-path parity.
- V3 deliberately retains a simplified board, boots, knee bend and body
  outline. Snow contrast, first-person camera height and actual dynamic
  braking/weight-transfer movement still need a separate integration gate.

## Local reproduction

```sh
cd experiments/67js-opt/rig-lab
npm ci --ignore-scripts
node --test smooth-skin.test.mjs
npm run build -- --base=./ --outDir /tmp/snow-smooth-rig-lab --emptyOutDir
python3 -m http.server 8600 --bind 127.0.0.1 --directory /tmp/snow-smooth-rig-lab
```

Open `http://127.0.0.1:8600/` in a WebGL2-enabled browser. Select a pose,
front/45-degree/side view, and dark/snow context. Drag either panel to rotate
both models; use wheel zoom or arrow keys. `window.__rigLab.status()` exposes
an observable state for accessibility/agent QA.

In another terminal, after the preview is running:

```sh
RIG_LAB_URL=http://127.0.0.1:8600/ node rig-lab.e2e.cjs
RIG_LAB_URL=http://127.0.0.1:8600/ node curate.cjs
```

Default QA artifacts are written outside the repository to a private local
preview folder. Curated Chrome screenshots, when generated, go in the repo's
`docs/rig-issue7-evidence/` and do **not** contain private Tailnet addresses.

## Acceptance boundaries

- `PASS`: single continuous body in all three distinct poses; explicit
  snowboard bindings; no isolated joint blobs; 3 screen widths × 3 poses ×
  3 views, actual M4 Chrome WebGL2 rendering; dark/snow context and dragging.
- `PARTIAL`: artistic likeness to the reference, realistic leg/arm movement,
  snow readability at long distance. Owner still must review shape quality.
- `NOT_RUN`: continuous 60fps mesh deformation, real ski instruction
  mechanics and pose parity, phone hardware, WebKit/Android, thermal load,
  first-person eye alignment and all ten lessons.

Do **not** automatically merge into PR #8, migrate all ten lessons or deploy.
If rejected, simply leave this branch unmerged and stop the private preview.
