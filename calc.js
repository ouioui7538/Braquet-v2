/* calc.js
 * Logique de calcul pure (aucune dépendance DOM/Chart.js) afin de pouvoir
 * être testée unitairement et réutilisée telle quelle dans une future app
 * native (la traduire en Swift/Kotlin/Dart reste triviale : ce sont des
 * fonctions mathématiques sans état).
 */
(function (global) {
  const WHEEL_CIRC_M = 2.105; // développement de référence, pneu 700x25c
  const RHO = 1.225;          // densité de l'air, kg/m3, niveau de la mer
  const G = 9.81;
  const EFFICIENCY = 0.97;    // rendement chaîne/transmission

  // --- Aérodynamique : CdA = position * ajustement tenue -------------------
  const POSTURE_CDA = {
    hoods: 0.32,   // mains sur les poignées de frein
    drops: 0.28,   // mains en bas de cintre
    aero: 0.23,    // prolongateurs / position aéro
  };
  const KIT_ADJUST = {
    casual: 0.035,   // vêtements ville, coupe ample
    jersey: 0,        // tenue cycliste classique (référence)
    skinsuit: -0.02,  // combinaison aéro
  };
  function computeCdA(posture, kit) {
    const base = POSTURE_CDA[posture] ?? POSTURE_CDA.hoods;
    const adjust = KIT_ADJUST[kit] ?? 0;
    return Math.max(0.16, base + adjust);
  }

  // --- Braquets --------------------------------------------------------------
  function gearRatio(ring, cog) { return ring / cog; }

  function speedFromCadence(ratio, cadenceRpm, wheelCirc = WHEEL_CIRC_M) {
    // km/h = cadence(rpm) * ratio * circonference(m) * 60 / 1000
    return cadenceRpm * ratio * wheelCirc * 60 / 1000;
  }

  function cadenceFromSpeed(ratio, speedKmh, wheelCirc = WHEEL_CIRC_M) {
    const devM = ratio * wheelCirc;
    const mPerMin = speedKmh * 1000 / 60;
    return mPerMin / devM;
  }

  // Toutes les combinaisons réelles plateau x pignon pour un groupe donné,
  // triées par rapport croissant (du plus facile au plus dur).
  function allGearCombos(ringSmall, ringBig, cassetteTeeth) {
    const rings = ringSmall === ringBig ? [ringSmall] : [ringSmall, ringBig];
    const combos = [];
    for (const ring of rings) {
      for (const cog of cassetteTeeth) {
        combos.push({ ring, cog, ratio: gearRatio(ring, cog) });
      }
    }
    combos.sort((a, b) => a.ratio - b.ratio);
    return combos;
  }

  // Combinaisons réalistes : on exclut le cross-chaining (petit plateau + petits
  // pignons, grand plateau + grands pignons), jamais utilisé en pratique car la
  // chaîne travaille en biais et l'usure/rendement en pâtissent.
  function realisticGearCombos(ringSmall, ringBig, cassetteTeeth, crossChainMargin = 2) {
    if (ringSmall === ringBig) {
      // transmission 1x : pas de notion de croisement entre plateaux
      return cassetteTeeth
        .map(cog => ({ ring: ringSmall, cog, ratio: gearRatio(ringSmall, cog) }))
        .sort((a, b) => a.ratio - b.ratio);
    }
    const sorted = [...cassetteTeeth].sort((a, b) => a - b);
    const n = sorted.length;
    const margin = Math.min(crossChainMargin, Math.floor((n - 1) / 2));
    const smallRingCogs = sorted.slice(margin);           // exclut les pignons les plus petits
    const bigRingCogs = sorted.slice(0, n - margin);       // exclut les pignons les plus grands
    const combos = [
      ...smallRingCogs.map(cog => ({ ring: ringSmall, cog, ratio: gearRatio(ringSmall, cog) })),
      ...bigRingCogs.map(cog => ({ ring: ringBig, cog, ratio: gearRatio(ringBig, cog) })),
    ];
    combos.sort((a, b) => a.ratio - b.ratio);
    return combos;
  }

  function easiestGear(ringSmall, cassetteTeeth) {
    const maxCog = Math.max(...cassetteTeeth);
    return { ring: ringSmall, cog: maxCog, ratio: gearRatio(ringSmall, maxCog) };
  }
  function hardestGear(ringBig, cassetteTeeth) {
    const minCog = Math.min(...cassetteTeeth);
    return { ring: ringBig, cog: minCog, ratio: gearRatio(ringBig, minCog) };
  }

  // --- Modèle de puissance -----------------------------------------------
  // P(v, pente) = (1/eff) * [ m*g*(Crr*cos(theta) + sin(theta))*v + 0.5*rho*CdA*v^3 ]
  function powerForSpeed(vMs, slopePct, totalMassKg, crr, cda) {
    const theta = Math.atan(slopePct / 100);
    const grav = totalMassKg * G * (crr * Math.cos(theta) + Math.sin(theta));
    const aero = 0.5 * RHO * cda * vMs * vMs * vMs;
    return (grav * vMs + aero) / EFFICIENCY;
  }

  function solveSpeedForPower(Psustain, slopePct, totalMassKg, crr, cda) {
    let lo = 0, hi = 40;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const p = powerForSpeed(mid, slopePct, totalMassKg, crr, cda);
      if (p > Psustain) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2; // m/s
  }

  function solveSlopeForSpeed(vMs, Psustain, totalMassKg, crr, cda) {
    let lo = -10, hi = 40;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const p = powerForSpeed(vMs, mid, totalMassKg, crr, cda);
      if (p > Psustain) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2; // pente en %
  }

  global.BraquetsCalc = {
    WHEEL_CIRC_M, RHO, G, EFFICIENCY,
    POSTURE_CDA, KIT_ADJUST, computeCdA,
    gearRatio, speedFromCadence, cadenceFromSpeed,
    allGearCombos, realisticGearCombos, easiestGear, hardestGear,
    powerForSpeed, solveSpeedForPower, solveSlopeForSpeed,
  };
})(window);
