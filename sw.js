// BUILD_TIME est injecté automatiquement lors du packaging
// Ne pas éditer manuellement — modifier package.sh à la place
const BUILD_TIME = '20260713-1136';
const CACHE_NAME = 'braquets-' + BUILD_TIME;

const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './cassettes.js',
  './calc.js',
  './tires.js',
  './gpx.js',
  './bikes.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
  );
  // Activer immédiatement sans attendre la fermeture de l'ancien SW
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  // Prendre le contrôle de tous les onglets ouverts immédiatement
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Réseau d'abord pour le HTML : toujours la dernière version
    // Repli sur le cache uniquement si hors-ligne
    event.respondWith(
      fetch(req).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Assets statiques : cache d'abord, réseau en repli
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
