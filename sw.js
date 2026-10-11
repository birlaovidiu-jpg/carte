// Fa aprire l'app SUBITO: mostra la copia salvata sul telefono e intanto, in silenzio, controlla su Internet
// se c'è una versione nuova (che si vedrà alla prossima apertura, o subito se app.js ricarica la pagina).
// Funziona anche senza rete (al negozio).
const CACHE = 'carte-3';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) return;
  if (u.pathname.endsWith('versione.txt')) return;           // sempre da Internet
  const nav = req.mode === 'navigate';
  // Dopo un aggiornamento app.js ricarica la pagina con ?agg=N: quella volta si va a Internet
  if (nav && u.searchParams.has('agg')) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) caches.open(CACHE).then(c => c.put(new URL('index.html', location.href), r.clone()));
      return r;
    }).catch(() => caches.match(new URL('index.html', location.href).href)));
    return;
  }
  // La pagina si apre sempre con la stessa copia, comunque sia scritto l'indirizzo
  const chiave = nav ? new Request(new URL('index.html', location.href).href) : req;
  e.respondWith(caches.open(CACHE).then(async c => {
    const salvata = await c.match(chiave);
    const rete = fetch(req, { cache: 'no-cache' }).then(r => {
      if (r.ok) c.put(chiave, r.clone());
      return r;
    }).catch(() => null);
    if (salvata) { e.waitUntil(rete); return salvata; }
    return (await rete) || Response.error();
  }));
});
