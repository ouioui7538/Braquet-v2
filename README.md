# Braquets & Pentes

Application web progressive (PWA) de calcul de braquets cyclistes.

## Fonctionnalités

- **Configuration** : poids cycliste/vélo, FTP, position aérodynamique, groupe parmi 60+ références (Shimano, SRAM, Campagnolo, Microshift)
- **Analyse** : vitesse soutenable en fonction de la pente, cadence requise par braquet, pente maximale tenable par braquet à cadence cible, comparaison de deux groupes
- **Parcours GPX** : import d'un fichier GPX, détection automatique des montées, diagnostic par montée (pente moyenne/max, durée estimée, type d'effort, ✅/⚠️)
- **Mon garage** : rack de vélos issu d'une base de 120+ configurations (Trek, Specialized, Giant, Cannondale, Scott, Bianchi, Orbea — millésimes 2021-2025), ajout de vélos personnalisés, gestion de plusieurs cassettes par vélo

## Architecture

```
pwa/
├── index.html      — UI (onglets Config / Analyse / GPX / Garage)
├── calc.js         — Moteur de calcul pur (braquets, puissance, aéro)
├── cassettes.js    — Base de groupes et cassettes du commerce
├── bikes.js        — Base de vélos par marque/modèle/millésime
├── gpx.js          — Parsing GPX + détection de montées
├── sw.js           — Service worker (cache offline)
├── manifest.json   — Manifest PWA
├── icon-192.png    — Icône PWA
└── icon-512.png    — Icône PWA
```

## Modèle physique

Puissance requise : `P = (1/η) × [m·g·(Crr·cos θ + sin θ)·v + ½·ρ·CdA·v³]`

- η = 0.97 (rendement transmission)
- ρ = 1.225 kg/m³ (densité air)
- CdA variable selon position + tenue (0.21 à 0.35 m²)
- Crr variable selon terrain (0.0045 à 0.012)

## Déploiement

Site statique, aucun backend requis. Déployable sur Netlify, GitHub Pages, Cloudflare Pages.

```bash
# Déployer sur Netlify via CLI
netlify deploy --dir=pwa --prod
```

## Installation comme app (PWA)

Sur iOS (Safari) ou Android (Chrome) : ouvrir le site → Partager → Ajouter à l'écran d'accueil.
