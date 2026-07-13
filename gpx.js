/* gpx.js
 * Parsing GPX + détection de montées, en fonctions pures (testable en Node,
 * pas de dépendance DOM — parsing par regex plutôt que DOMParser pour rester
 * portable).
 */
(function (global) {

  function parseGpxString(xmlText) {
    const points = [];
    const trkptBlocks = xmlText.match(/<trkpt\b[^>]*>[\s\S]*?<\/trkpt>/g) || [];
    for (const block of trkptBlocks) {
      const latM = block.match(/lat="(-?[0-9.]+)"/);
      const lonM = block.match(/lon="(-?[0-9.]+)"/);
      const eleM = block.match(/<ele>(-?[0-9.]+)<\/ele>/);
      if (!latM || !lonM) continue;
      points.push({
        lat: parseFloat(latM[1]),
        lon: parseFloat(lonM[1]),
        ele: eleM ? parseFloat(eleM[1]) : null,
      });
    }
    return points;
  }

  function haversineMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  // Construit le profil distance cumulée / altitude, en interpolant les
  // altitudes manquantes (certains GPX n'ont pas d'élévation sur tous les points).
  function buildProfile(points) {
    const profile = [];
    let dist = 0;
    let lastEle = points.find(p => p.ele != null)?.ele ?? 0;
    for (let i = 0; i < points.length; i++) {
      if (i > 0) {
        dist += haversineMeters(points[i-1].lat, points[i-1].lon, points[i].lat, points[i].lon);
      }
      const ele = points[i].ele != null ? points[i].ele : lastEle;
      lastEle = ele;
      profile.push({ dist, ele, lat: points[i].lat, lon: points[i].lon });
    }
    return profile;
  }

  // Lissage de l'altitude par moyenne glissante sur une fenêtre en distance (m),
  // pour atténuer le bruit GPS/baro qui crée de faux micro-reliefs.
  function smoothProfile(profile, windowM = 80) {
    const n = profile.length;
    const smoothed = new Array(n);
    let lo = 0, hi = 0, sum = 0, count = 0;
    for (let i = 0; i < n; i++) {
      while (hi < n && profile[hi].dist - profile[i].dist <= windowM / 2) { sum += profile[hi].ele; count++; hi++; }
      while (profile[i].dist - profile[lo].dist > windowM / 2) { sum -= profile[lo].ele; count--; lo++; }
      smoothed[i] = sum / count;
    }
    return profile.map((p, i) => ({ ...p, eleSmooth: smoothed[i] }));
  }

  // Pente instantanée (%) en comparant chaque point à un point ~stepM plus loin.
  function computeSlopes(profile, stepM = 40) {
    const n = profile.length;
    const slopes = new Array(n).fill(0);
    let j = 0;
    for (let i = 0; i < n; i++) {
      if (j < i) j = i;
      while (j < n - 1 && profile[j].dist - profile[i].dist < stepM) j++;
      const dDist = profile[j].dist - profile[i].dist;
      if (dDist > 1) {
        slopes[i] = (profile[j].eleSmooth - profile[i].eleSmooth) / dDist * 100;
      } else {
        slopes[i] = i > 0 ? slopes[i-1] : 0;
      }
    }
    return slopes;
  }

  // Detecte les segments de montee continus (regroupes si separes par un court
  // passage non-montant), filtre les segments trop courts pour etre significatifs.
  function detectClimbs(profile, slopes, opts = {}) {
    const threshold = opts.threshold ?? 3;     // % pente mini pour compter comme montee
    const minLength = opts.minLength ?? 300;   // m, longueur mini apres fusion
    const mergeGap = opts.mergeGap ?? 200;      // m, tolerance de regroupement

    const n = profile.length;
    const rawSegments = [];
    let segStart = null;
    for (let i = 0; i < n; i++) {
      const climbing = slopes[i] >= threshold;
      if (climbing && segStart === null) segStart = i;
      if (!climbing && segStart !== null) {
        rawSegments.push([segStart, i - 1]);
        segStart = null;
      }
    }
    if (segStart !== null) rawSegments.push([segStart, n - 1]);

    // fusion des segments proches
    const merged = [];
    for (const seg of rawSegments) {
      if (merged.length > 0) {
        const prev = merged[merged.length - 1];
        const gap = profile[seg[0]].dist - profile[prev[1]].dist;
        if (gap <= mergeGap) { prev[1] = seg[1]; continue; }
      }
      merged.push([...seg]);
    }

    const climbs = merged
      .map(([startIdx, endIdx]) => {
        const startDist = profile[startIdx].dist;
        const endDist = profile[endIdx].dist;
        const length = endDist - startDist;
        let elevGain = 0;
        let maxSlope = -Infinity;
        for (let i = startIdx; i < endIdx; i++) {
          const d = profile[i+1].eleSmooth - profile[i].eleSmooth;
          if (d > 0) elevGain += d;
          if (slopes[i] > maxSlope) maxSlope = slopes[i];
        }
        const avgSlope = length > 0 ? (elevGain / length) * 100 : 0;
        return { startIdx, endIdx, startDist, endDist, length, elevGain, avgSlope, maxSlope };
      })
      .filter(c => c.length >= minLength);

    return climbs;
  }

  global.GpxAnalyzer = {
    parseGpxString, haversineMeters, buildProfile, smoothProfile, computeSlopes, detectClimbs,
  };
})(typeof window !== 'undefined' ? window : global);
