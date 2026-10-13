// Fa aprire l'app SUBITO, anche dopo giorni: tutto viene dalla copia salvata sul telefono, senza aspettare Internet.
// - I file con «?v=numero» non cambiano mai per quel numero: si prendono dalla copia salvata e basta (nessun controllo in rete).
// - La pagina (index.html) e il manifest si mostrano dalla copia salvata e intanto si aggiornano in silenzio per la prossima apertura.
// - versione.txt e gli indirizzi con «?x=» vanno sempre a Internet (servono ad app.js per preparare gli aggiornamenti).
const CACHE = 'carte-4';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())
));
const INDICE = () => new Request(new URL('index.html', location.href).href);
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) return;
  if (u.pathname.endsWith('versione.txt') || u.searchParams.has('x')) return;   // sempre da Internet
  const nav = req.mode === 'navigate';
  // (Versioni vecchie dell'app ricaricavano la pagina con ?agg=N: quella volta si va a Internet)
  if (nav && u.searchParams.has('agg')) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) caches.open(CACHE).then(c => c.put(INDICE(), r.clone()));
      return r;
    }).catch(() => caches.match(INDICE(), { cacheName: CACHE })));
    return;
  }
  // File con numero di versione: solo copia salvata (se manca, si scarica una volta e si salva)
  if (!nav && u.searchParams.has('v')) {
    e.respondWith(caches.match(req, { cacheName: CACHE }).then(salvata => salvata || fetch(req).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
      return r;
    })));
    return;
  }
  // Pagina e manifest: subito la copia salvata, e intanto si aggiorna per la prossima volta
  const chiave = nav ? INDICE() : req;
  e.respondWith(caches.match(chiave, { cacheName: CACHE }).then(salvata => {
    const rete = fetch(req, { cache: 'no-cache' }).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(CACHE).then(c => c.put(chiave, copia)); }
      return r;
    }).catch(() => null);
    if (salvata) { e.waitUntil(rete); return salvata; }
    return rete.then(r => r || Response.error());
  }));
});
