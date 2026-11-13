#!/bin/sh
set -eu
root="$(CDPATH= cd -- "$(dirname -- "$0")/../../.." && pwd)"
out="$HOME/workspace/3d-snow-safety-rig-preview-20261113"
if [ "$#" -gt 0 ]; then out="$1"; fi
mkdir -p "$out"
for n in 04 01 09; do
  scene="$root/experiments/67js-opt/scene$n"
  if [ ! -x "$scene/node_modules/.bin/vite" ]; then
    (cd "$scene" && npm ci --ignore-scripts --no-audit --no-fund)
  fi
  (cd "$scene" && npm run build --silent -- --base=./)
  mkdir -p "$out/lesson$n"
  cp -R "$scene/dist/." "$out/lesson$n/"
done
# Do not expose historical developer-only pages in the preview root.
rm -f "$out/lesson01/device-qa.html"
cp "$root/experiments/67js-opt/rig-compare/index.html" "$out/index.html"
printf 'PRIVATE_RIG_PREVIEW=%s\n' "$out"
