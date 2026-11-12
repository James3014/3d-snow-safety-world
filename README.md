# 3D Snow Safety World

[Traditional Chinese](README.zh-TW.md) | English

An **open-source, bilingual (Traditional Chinese / English) 3D snow-safety learning prototype**. Explore ten slope scenarios, choose between A/B/C actions, observe different outcomes, replay in slow motion, and change camera views (top / rider / side).

> **Educational prototype, not a certification.** The animated movement, virtual dimensions, timing and outcomes are illustrative. They are not validated safe speeds, distances, maneuvers, first-aid instructions or a substitute for resort rules, qualified instruction or emergency personnel. The current ten scenarios have *not* completed professional owner acceptance, real learner evaluation or physical-device validation.

## What is included

- Ten interactive scenarios in a single session; three outcomes per scenario.
- Seven reusable data-driven scenarios and three individual introductory scenes.
- 3D WebGL rendering with a limited software fallback, speed controls (1x / 0.5x / 0.25x), replay, full-body stance inset and camera switching.
- Local-only progress tracking using browser `localStorage`; no analytics SDK or external data collection is shipped.
- Basic keyboard controls, accessibility labels, two languages and a ten-topic review.

## Run locally

Requires Python 3 or another static-file web server. No build process, service account, API key or package download is required for the site.

```sh
cd site
python3 -m http.server 8080 --bind 127.0.0.1
```

Open **http://127.0.0.1:8080/** in a browser with WebGL support. For a lightweight alternative, `npx` is **not** necessary.

Public interactive demo: https://james3014.github.io/3d-snow-safety-world/ . The site retains `noindex` / `robots.txt` to avoid search indexing of educational material that still requires professional review. GitHub Pages hosts only the `site/` assets; it does not host the private QA artifacts.

## Test

```sh
node --test tests/*.test.cjs
```

Node.js 20+ is sufficient. CI validates the scenario inventory, outcome data, local asset references, privacy and basic accessibility controls. These static checks are **not** browser visual QA, learning effectiveness testing or a complete safety audit.

## Structure

- `site/index.html` - ten-scenario session and bilingual review.
- `site/scene-01-speed.html`, `site/merge-entry-speed.html`, `site/safe-overtake-speed.html` - introductory stand-alone scenes.
- `site/lesson-play-speed.html` and `site/lessons-data.js` - shared renderer and seven scenario data objects.
- `tests/` - dependency-free structural and safety-boundary checks.
- `docs/BASELINE.md` - original source fingerprint and known verification limits.

## Contributions and limits

Please open an Issue describing the scenario, language, browser and a minimal reproduction before changing movement semantics. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). An animation looking plausible does not prove its educational or physical safety correctness. Do not upload personal records, private QA data or unreleased assets into a public PR.

## License

Code is available under the [MIT License](LICENSE). This license does not grant rights to any third-party trademarks, ski-resort imagery, names or external standards documents. The working title remains subject to project-owner branding decisions.
