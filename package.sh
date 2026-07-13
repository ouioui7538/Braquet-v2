#!/bin/bash
# package.sh — Génère le zip de déploiement avec timestamp de build injecté
# Usage : bash package.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

BUILD_TIME=$(date +"%Y%m%d-%H%M")
echo "→ Build : $BUILD_TIME"

sed -i "s/__BUILD_TIME__/$BUILD_TIME/g" sw.js
sed -i "s/__BUILD_TIME__/$BUILD_TIME/g" index.html
echo "✓ Version injectée dans sw.js et index.html"

cd ..
OUTPUT="braquets-pwa-$BUILD_TIME.zip"
zip -r "$OUTPUT" pwa -x "*.DS_Store" -x ".git/*"
echo "✓ $OUTPUT"

echo ""
echo "  git add . && git commit -m \"deploy $BUILD_TIME\" && git push"
