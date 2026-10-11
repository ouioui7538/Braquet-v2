/* tires.js
 * Base de pneus : circonférence de roulement et coefficient de résistance au
 * roulement (Crr) selon le revêtement.
 *
 * - circ : circonférence de roulement en mètres (pneu gonflé, cycliste en
 *   charge), valeurs usuelles des tables compteurs (700C). Ce sont des
 *   valeurs indicatives : le mieux reste de mesurer son propre développement
 *   (un tour de roue, vélo chargé).
 * - crr  : Crr du pneu selon le revêtement { smooth, rough, gravel }.
 *   Valeurs de référence d'ordre de grandeur, inspirées des mesures
 *   publiques sur rouleau (type bicyclerollingresistance.com) corrigées d'un
 *   facteur revêtement. À affiner pneu par pneu si besoin.
 *
 * Le pneu par défaut (route 700x25) reproduit exactement les anciens
 * réglages : circonférence 2.105 m, Crr 0.0045 / 0.006 / 0.012.
 */
(function (global) {
  const SURFACES = {
    smooth: { label: '🛣 Route lisse' },
    rough:  { label: '🚗 Route moyenne' },
    gravel: { label: '🪨 Gravel / chemin' },
  };

  // Anciennes valeurs du sélecteur terrain (Crr brut) → clé de revêtement.
  // Sert à migrer les préférences déjà enregistrées dans localStorage.
  const LEGACY_TERRAIN = { '0.0045': 'smooth', '0.006': 'rough', '0.012': 'gravel' };

  const DEFAULT_TIRE_ID = 'road-25';
  const DEFAULT_SURFACE = 'rough';

  const TIRES = {
    'road-23':   { group: 'Route',  label: '700×23 route',              width: 23, circ: 2.096, crr: { smooth: 0.0042, rough: 0.0068, gravel: 0.0135 } },
    'road-25':   { group: 'Route',  label: '700×25 route',              width: 25, circ: 2.105, crr: { smooth: 0.0045, rough: 0.0060, gravel: 0.0120 } },
    'road-28':   { group: 'Route',  label: '700×28 route / endurance',  width: 28, circ: 2.136, crr: { smooth: 0.0044, rough: 0.0058, gravel: 0.0110 } },
    'road-30':   { group: 'Route',  label: '700×30 endurance tubeless', width: 30, circ: 2.146, crr: { smooth: 0.0045, rough: 0.0058, gravel: 0.0100 } },
    'road-32':   { group: 'Route',  label: '700×32 endurance tubeless', width: 32, circ: 2.155, crr: { smooth: 0.0046, rough: 0.0058, gravel: 0.0095 } },
    'mixed-35':  { group: 'Mixte',  label: '700×35 mixte',              width: 35, circ: 2.168, crr: { smooth: 0.0052, rough: 0.0062, gravel: 0.0090 } },
    'gravel-40': { group: 'Gravel', label: '700×40 gravel',             width: 40, circ: 2.200, crr: { smooth: 0.0058, rough: 0.0066, gravel: 0.0085 } },
    'gravel-45': { group: 'Gravel', label: '700×45 gravel',             width: 45, circ: 2.240, crr: { smooth: 0.0064, rough: 0.0070, gravel: 0.0082 } },
  };

  function getTire(id) {
    return TIRES[id] || TIRES[DEFAULT_TIRE_ID];
  }

  // Crr effectif = pneu × revêtement. Retombe sur des valeurs par défaut
  // si l'identifiant ou le revêtement est inconnu.
  function crrFor(tireId, surface) {
    const tire = getTire(tireId);
    return tire.crr[surface] ?? tire.crr[DEFAULT_SURFACE];
  }

  // Pneu conseillé par défaut selon l'usage du vélo (champ `usage` de bikes.js).
  function defaultTireForUsage(usage) {
    if (usage === 'gravel') return 'gravel-40';
    if (usage === 'endurance') return 'road-28';
    return DEFAULT_TIRE_ID;
  }

  global.TIRES = TIRES;
  global.TireDB = {
    SURFACES, LEGACY_TERRAIN, DEFAULT_TIRE_ID, DEFAULT_SURFACE,
    getTire, crrFor, defaultTireForUsage,
  };
})(typeof window !== 'undefined' ? window : globalThis);
