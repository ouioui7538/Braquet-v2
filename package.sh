#!/bin/bash
# package.sh — Génère le zip de déploiement avec un timestamp de build
# Usage : bash package.sh
# Résultat : ../braquets-pwa.zip prêt à déployer

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Timestamp de build (ex: 20250713-1423)
BUILD_TIME=$(date +"%Y%m%d-%H%M")

echo "→ Build : $BUILD_TIME"

# Injecter le timestamp dans sw.js (copie temporaire)
sed "s/__BUILD_TIME__/$BUILD_TIME/" sw.js > /tmp/sw_build.js
cp /tmp/sw_build.js sw.js
echo "✓ sw.js mis à jour (cache: braquets-$BUILD_TIME)"

# Générer le zip
cd ..
OUTPUT="braquets-pwa-$BUILD_TIME.zip"
zip -r "$OUTPUT" pwa -x "*.DS_Store" -x "*.sh" -x ".git/*"
echo "✓ Zip généré : $OUTPUT"

# Lien symbolique vers la dernière version
ln -sf "$OUTPUT" braquets-pwa-latest.zip
echo "✓ Lien : braquets-pwa-latest.zip → $OUTPUT"

echo ""
echo "Déploiement GitHub Pages :"
echo "  git add . && git commit -m \"deploy $BUILD_TIME\" && git push"
