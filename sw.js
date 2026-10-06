// Serve per installare il programma sul telefono e per aprirlo anche senza rete (al negozio).
// Si chiede sempre a Internet la versione nuova; la copia salvata si usa solo senza rete.
const CACHE = 'carte-2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.origin === location.origin) {
    if (u.pathname.endsWith('versione.txt')) return;
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' }).then(r => {
        const copia = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia));
        return r;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
  }
});
