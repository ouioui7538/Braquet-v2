#!/bin/bash
# setup-github.sh
# À exécuter UNE SEULE FOIS depuis le dossier contenant les fichiers de l'app.
# Prérequis : avoir Git installé, et soit gh CLI soit créer le repo manuellement.

set -e

REPO_NAME="braquets-et-pentes"
REPO_DESC="PWA de calcul de braquets et pentes soutenables pour cyclistes"

echo "═══════════════════════════════════════════════"
echo " Setup GitHub — Braquets & Pentes"
echo "═══════════════════════════════════════════════"

# 1. Initialiser le dépôt Git local
if [ ! -d ".git" ]; then
  git init
  echo "✓ Dépôt Git initialisé"
else
  echo "✓ Dépôt Git déjà existant"
fi

# 2. Premier commit
git add .
git commit -m "Initial commit — Braquets & Pentes PWA v1.0" 2>/dev/null || \
  echo "  (rien à committer, working tree clean)"

# 3. Créer le dépôt GitHub et pousser
if command -v gh &> /dev/null; then
  echo ""
  echo "→ Création du dépôt GitHub via gh CLI..."
  gh repo create "$REPO_NAME" \
    --description "$REPO_DESC" \
    --public \
    --source=. \
    --remote=origin \
    --push
  echo "✓ Dépôt créé et code poussé"
  echo ""
  GITHUB_USER=$(gh api user --jq '.login')
  echo "═══════════════════════════════════════════════"
  echo " Dépôt : https://github.com/$GITHUB_USER/$REPO_NAME"
  echo "═══════════════════════════════════════════════"
  echo ""
  echo "Prochaine étape : connecter Netlify à ce dépôt"
  echo "  1. Va sur https://app.netlify.com → Add new site → Import from Git"
  echo "  2. Choisir GitHub → sélectionner '$REPO_NAME'"
  echo "  3. Build command : (laisser vide)"
  echo "  4. Publish directory : ."
  echo "  5. Deploy site"
  echo ""
  echo "Ensuite, pour chaque mise à jour :"
  echo "  git add . && git commit -m 'update' && git push"
else
  echo ""
  echo "⚠ gh CLI non trouvé. Étapes manuelles :"
  echo ""
  echo "  1. Crée le dépôt sur https://github.com/new"
  echo "     Nom : $REPO_NAME"
  echo "     Visibilité : Public (ou Private)"
  echo ""
  echo "  2. Puis dans ce dossier :"
  echo "     git remote add origin https://github.com/TON_USERNAME/$REPO_NAME.git"
  echo "     git branch -M main"
  echo "     git push -u origin main"
  echo ""
  echo "  3. Connecte Netlify à ce dépôt GitHub"
  echo "     https://app.netlify.com → Add new site → Import from Git"
fi
