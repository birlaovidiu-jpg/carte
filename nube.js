// Le carte di famiglia sono online: le vedono e le usano tutti, e ogni movimento di punti resta nel registro.
// Questo file si carica in secondo piano: l'app si apre subito anche senza Internet, dalle carte salvate sul telefono.
// Progetto Firebase «carte-famiglia» (Firestore Milano, accesso anonimo). Questi dati non sono segreti: dicono solo quale database usare;
// la protezione la fanno le regole in firestore.rules.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, collection, doc, setDoc, deleteDoc,
         writeBatch, increment, onSnapshot, query, orderBy, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const FIREBASE = {
  apiKey: 'AIzaSyBswGgzdLYgzHWRWlnP6JEO7ZjK_Mh4QY0',
  authDomain: 'carte-famiglia.firebaseapp.com',
  projectId: 'carte-famiglia',
  appId: '1:254607939368:web:e824940c51e234a7e5221d'
};

const app = initializeApp(FIREBASE);
const auth = getAuth(app);
// Le modifiche fatte senza rete restano sul telefono e partono da sole appena torna Internet
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  experimentalAutoDetectLongPolling: true
});

// Pronto quando c'è un accesso (anonimo, senza password) — serve per scrivere
let ok;
export const pronta = new Promise(r => { ok = r; });
onAuthStateChanged(auth, u => { if (u) ok(u); });
function entra() { if (!auth.currentUser) signInAnonymously(auth).catch(() => {}); }
setTimeout(entra, 400);   // se l'accesso salvato non è tornato da solo
addEventListener('online', entra);

// Un ascolto parte solo quando l'accesso c'è già; se il server lo rifiuta o cade, riparte da solo dopo qualche secondo
function ascolta(avvia) {
  let ferma = null, fermo = false;
  const parti = () => pronta.then(() => {
    if (fermo) return;
    ferma = avvia(() => { ferma?.(); ferma = null; if (!fermo) setTimeout(parti, 5000); });
  });
  parti();
  return () => { fermo = true; ferma?.(); };
}

// ---------- Le carte ----------
// aMod(modifiche, daCache): modifiche = [{ tipo:'added'|'modified'|'removed', id, dati }]
// aSync(ids): la prima volta che il server risponde, con gli id delle carte che ci sono online
export function ascoltaCarte(aMod, aSync) {
  let primo = true;
  return ascolta(errore => onSnapshot(collection(db, 'carte'), snap => {
    aMod(snap.docChanges().map(c => ({ tipo: c.type, id: c.doc.id, dati: c.doc.data() })), snap.metadata.fromCache);
    if (primo && !snap.metadata.fromCache) { primo = false; aSync(new Set(snap.docs.map(d => d.id))); }
  }, errore));
}
// Carta nuova o modificata. I punti si scrivono solo alla creazione (poi cambiano solo con i movimenti)
export function scriviCarta(c, conPunti) {
  const dati = { negozio: c.negozio ?? null, nome: c.nome || '', codice: c.codice, formato: c.formato, svg: c.svg, ordine: c.ordine || Date.now() };
  if (conPunti) dati.punti = Math.max(0, Math.round(c.punti || 0));
  return setDoc(doc(db, 'carte', c.id), dati, { merge: true }).catch(() => {});
}
export function eliminaCarta(id) { return deleteDoc(doc(db, 'carte', id)).catch(() => {}); }

// ---------- Il registro dei punti ----------
function movimento(c, tipo, punti, saldo, chi) {
  const d = new Date();
  return { carta: c.id, cartaNome: (c.nome || '').slice(0, 60), tipo, punti, saldo, chi: chi.slice(0, 30), ts: serverTimestamp(),
           anno: d.getFullYear(), mese: d.getMonth() + 1 };
}
// Carica o scarica: cambia il saldo della carta e scrive il movimento, insieme (o tutti e due o nessuno)
export function muoviPunti(c, delta, saldo, chi) {
  const b = writeBatch(db);
  b.update(doc(db, 'carte', c.id), { punti: increment(delta) });
  b.set(doc(collection(db, 'movimenti')), movimento(c, delta > 0 ? 'carica' : 'scarica', delta, saldo, chi));
  return b.commit();
}
// Saldo con cui una carta entra nel registro (una volta sola per carta: l'id è sempre lo stesso)
export function saldoIniziale(c, chi) {
  return setDoc(doc(db, 'movimenti', 'ini_' + c.id), movimento(c, 'iniziale', c.punti, c.punti, chi)).catch(() => {});
}
export function ascoltaMovimenti(aggiorna) {
  return ascolta(errore => onSnapshot(query(collection(db, 'movimenti'), orderBy('ts', 'desc')), snap => {
    aggiorna(snap.docs.map(d => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) })), snap.metadata.fromCache);
  }, errore));
}
