// Le mie carte — carte fedeltà dei negozi con codice a barre e punti.
// Le carte sono sul telefono (si aprono subito, anche senza Internet) e online per tutta la famiglia (nube.js).
export const VERSIONE = '28';

// ---------- I negozi (colori e scritte, simili a quelli veri) ----------
const SERIF = "'Didot','Bodoni 72','Playfair Display',Georgia,serif";
const STRETTO = "'Avenir Next Condensed','Arial Narrow','Roboto Condensed',sans-serif";
export const NEGOZI = {
  coop:       { nome: 'Coop',       bg: '#2a8fd0', fg: '#ffffff', img: 'negozi/coop.png?v=13', font: 'font-weight:900;font-style:italic;letter-spacing:-.04em' },
  esselunga:  { nome: 'Esselunga',  bg: '#1aa84a', fg: '#ffffff', img: 'negozi/esselunga.png?v=12', font: 'font-weight:800;font-style:italic;letter-spacing:-.03em;text-transform:lowercase' },
  famila:     { nome: 'Famila',     bg: '#f05a2d', fg: '#ffffff', img: 'negozi/famila.png?v=12', font: 'font-weight:900;letter-spacing:-.02em;text-transform:lowercase' },
  pittarosso: { nome: 'PittaRosso', bg: '#d0043c', fg: '#ffffff', img: 'negozi/pittarosso.png?v=12', font: `font-family:${STRETTO};font-weight:800;text-transform:uppercase;letter-spacing:.01em` },
  benetton:   { nome: 'Benetton',   bg: '#00a04a', fg: '#ffffff', img: 'negozi/benetton.png?v=12', font: `font-family:${STRETTO};font-weight:700;text-transform:uppercase;letter-spacing:.06em` },
  conbipel:   { nome: 'Conbipel',   bg: '#111111', fg: '#ffffff', img: 'negozi/conbipel.png?v=12', font: 'font-weight:300;text-transform:uppercase;letter-spacing:.14em' },
  douglas:    { nome: 'Douglas',    bg: '#c5e4e1', fg: '#111111', img: 'negozi/douglas.png?v=12', font: `font-family:${SERIF};font-weight:400;text-transform:uppercase;letter-spacing:.1em` },
  gala:       { nome: 'Gala',       bg: '#b01832', fg: '#ffffff', img: 'negozi/gala.png?v=12', font: `font-family:${SERIF};font-style:italic;font-weight:600` },
  guess:      { nome: 'Guess',      bg: '#111111', fg: '#ffffff', img: 'negozi/guess.png?v=12', font: `font-family:${SERIF};font-weight:700;text-transform:uppercase;letter-spacing:.08em` },
  limoni:     { nome: 'Limoni',     bg: '#111111', fg: '#ffffff', img: 'negozi/limoni.png?v=12', font: `font-family:${SERIF};font-weight:600;letter-spacing:.01em` },
  lindt:      { nome: 'Lindt',      bg: '#dccf94', fg: '#3a2a05', img: 'negozi/lindt.png?v=12', font: `font-family:${SERIF};font-style:italic;font-weight:600` },
  ovs:        { nome: 'OVS',        bg: '#1c1a1b', fg: '#ffffff', img: 'negozi/ovs.png?v=12', font: 'font-weight:900;letter-spacing:.02em' },
  lidl:       { nome: 'Lidl',       bg: '#0a5fc4', fg: '#ffffff', img: 'negozi/lidl.png?v=14', font: 'font-weight:800;letter-spacing:-.01em' },
  arcaplanet: { nome: 'Arca Planet', bg: '#fbdd01', fg: '#2a2200', img: 'negozi/arcaplanet.png?v=18', font: 'font-weight:800' },
  bialetti:   { nome: 'Bialetti', bg: '#111111', fg: '#ffffff', img: 'negozi/bialetti.png?v=18', font: 'font-weight:800' },
  bottegaverde:{ nome: 'Bottega Verde', bg: '#3f6b34', fg: '#ffffff', img: 'negozi/bottegaverde.png?v=18', font: 'font-weight:800' },
  gabel:      { nome: 'Gabel', bg: '#e2211c', fg: '#ffffff', img: 'negozi/gabel.png?v=18', font: 'font-weight:800' },
  gaudi:      { nome: 'Gaudi', bg: '#000000', fg: '#ffffff', img: 'negozi/gaudi.png?v=18', font: 'font-weight:800' },
  nunalie:    { nome: 'Nuna Lie', bg: '#111111', fg: '#ffffff', img: 'negozi/nunalie.png?v=18', font: 'font-weight:800' },
  sandroferrone:{ nome: 'Sandro Ferrone', bg: '#111111', fg: '#ffffff', img: 'negozi/sandroferrone.png?v=18', font: 'font-weight:800' }
};
// Una carta aggiunta con «Altro…» il cui nome è quello di un negozio che conosciamo prende la sua grafica
const norm = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function negozioPerNome(nome) {
  const n = norm(nome); if (n.length < 3) return null;
  return Object.keys(NEGOZI).find(k => n === norm(k) || n === norm(NEGOZI[k].nome) || (n.length > 4 && (n.startsWith(norm(k)) || n.startsWith(norm(NEGOZI[k].nome))))) || null;
}
function associaNegozi() {
  let cambiato = false;
  for (const c of carte.values()) if (!NEGOZI[c.negozio]) { const k = negozioPerNome(c.nome); if (k) { c.negozio = k; cambiato = true; } }
  return cambiato;
}
// Colori per le carte di altri negozi (scelti dal nome, sempre uguali per lo stesso nome)
const ALTRI = [
  ['linear-gradient(135deg,#ff7a18,#d94a00)', '#fff'], ['linear-gradient(135deg,#0fb5ae,#06756f)', '#fff'],
  ['linear-gradient(135deg,#5b5bd6,#2f2f99)', '#fff'], ['linear-gradient(135deg,#ff5d8f,#c2185b)', '#fff'],
  ['linear-gradient(135deg,#2e9cf3,#1060b8)', '#fff'], ['linear-gradient(135deg,#8bc34a,#4e8a1c)', '#fff'],
  ['linear-gradient(135deg,#795548,#4a2f25)', '#fff'], ['linear-gradient(135deg,#f6d365,#fda085)', '#3a1d00']
];
function aspetto(c) {
  const n = NEGOZI[c.negozio];
  if (n) return { nome: c.nome || n.nome, bg: n.bg, fg: n.fg, font: n.font, img: n.img };
  const nome = c.nome || 'Carta';
  if (c.img) return { nome, bg: '#111111', fg: '#ffffff', font: 'font-weight:800', img: c.img };   // immagine vera della carta, messa online per tutti
  let h = 0; for (const ch of nome.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [bg, fg] = ALTRI[h % ALTRI.length];
  return { nome, bg, fg, font: 'font-weight:800' };
}

// ---------- Piccoli aiuti ----------
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const numero = n => (n || 0).toLocaleString('it-IT');
const QUADRATI = ['QRCode', 'MicroQRCode', 'RMQRCode', 'DataMatrix', 'Aztec', 'AztecCode', 'MaxiCode'];

let tempoAvviso;
function avviso(t) {
  const a = $('avviso'); a.textContent = t; a.classList.add('su');
  clearTimeout(tempoAvviso); tempoAvviso = setTimeout(() => a.classList.remove('su'), 2400);
}
function numeroCodice(c) {
  // Le cifre a gruppi, come sono stampate sulle carte
  if (/^\d{13}$/.test(c)) return c.replace(/^(\d)(\d{6})(\d{6})$/, '$1 $2 $3');
  if (/^\d{8,}$/.test(c)) return c.replace(/(\d{4})(?=\d)/g, '$1 ');
  return c;
}
function disegnoCodice(svg, formato) {
  // L'SVG del codice si allarga a tutto lo spazio (le barre si stirano solo in larghezza)
  const m = svg.match(/<svg[^>]*width="(\d+(?:\.\d+)?)"[^>]*height="(\d+(?:\.\d+)?)"/);
  const quadrato = QUADRATI.includes(formato);
  let s = svg.replace(/<\?xml[^>]*>/, '').replace(/<!DOCTYPE[^>]*>/, '').replace(/<desc>.*?<\/desc>/, '');
  if (m) s = s.replace(/<svg([^>]*?)width="[^"]*"([^>]*?)height="[^"]*"/,
    `<svg$1viewBox="0 0 ${m[1]} ${m[2]}" preserveAspectRatio="${quadrato ? 'xMidYMid meet' : 'none'}"$2`);
  return s;
}

// ---------- Le carte, salvate sul telefono ----------
const CHIAVE = 'carte';
const carte = new Map();          // id → dati della carta
const elementi = new Map();       // id → elemento nella griglia

// Lo stesso codice a barre dà sempre lo stesso id: su ogni telefono la stessa carta è la stessa carta online (niente doppioni)
function idDa(codice) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < codice.length; i++) { const ch = codice.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 'c' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
function salvaLocale() {
  associaNegozi();
  try { localStorage.setItem(CHIAVE, JSON.stringify([...carte.values()])); return true; }
  catch (_) { avviso('Non riesco a salvare: memoria del telefono piena'); return false; }
}
function leggiCarte() {
  let lista = [];
  try { lista = JSON.parse(localStorage.getItem(CHIAVE) || '[]'); } catch (_) {}
  carte.clear();
  let cambiato = false;
  lista.sort((x, y) => x.ordine - y.ordine).forEach(c => {
    if (!c || typeof c.codice !== 'string') return;
    const id = idDa(c.codice);
    if (c.id !== id) { c.id = id; cambiato = true; }
    if (!carte.has(id)) carte.set(id, c); else cambiato = true;
  });
  if (associaNegozi() || cambiato) salvaLocale();
  disegna();
}
function salvaCarte() { salvaLocale(); disegna(); }
function aggiungiCarta(c) { carte.set(c.id, c); salvaCarte(); inNube(c, true); }
function cambiaCarta(id, campi) {
  const c = carte.get(id); if (!c) return;
  const prima = c.nome ? aspetto(c).nome : '';
  Object.assign(c, campi); salvaCarte();
  if (('negozio' in campi) || ('nome' in campi)) {
    inNube(c, false);
    const dopo = aspetto(c).nome;   // chi ha dato il nome a una carta nuova, o l'ha cambiato, resta scritto nel registro
    if (nube && dopo && dopo !== prima) nube.registra(c, prima ? 'modifica' : 'nuova', chi() || 'Famiglia', prima ? `Rinominata: ${prima} → ${dopo}` : '');
  }
}
function eliminaCarta(id) {
  const c = carte.get(id);
  if (c && nube) nube.registra(c, 'elimina', chi() || 'Famiglia', '');
  carte.delete(id); salvaCarte(); nube?.eliminaCarta(id);
}

// ---------- Online, per tutta la famiglia ----------
// Online stanno: negozio, nome, codice, saldo punti e registro dei movimenti. Sul telefono restano solo i gusti personali
// (carte più usate, stelle, ordine trascinato).
let nube = null;
let risolviNube; const nubePronta = new Promise(r => { risolviNube = r; });
const CAMPI_NUBE = ['negozio', 'nome', 'codice', 'formato', 'svg', 'punti', 'ordine', 'img'];
const CH_CHI = 'carte-chi';
function chi() { try { return (localStorage.getItem(CH_CHI) || '').trim(); } catch (_) { return ''; } }
function inNube(c, nuova) {
  if (!nube) return;   // se Internet non c'è ancora, la carta parte da sola alla prima connessione (sincronizza)
  nube.scriviCarta(c, nuova);
  if (nuova && c.punti > 0) nube.saldoIniziale(c, chi() || 'Famiglia');
}
async function avviaNube() {
  let m;
  try { m = await import('./nube.js?v=28'); } catch (_) { risolviNube(null); return; }
  nube = m; risolviNube(m);
  m.ascoltaCarte(dalCloud, sincronizza);
}
// Arrivano le carte online (nuove, cambiate, tolte da qualcuno)
function dalCloud(modifiche) {
  let cambiato = false;
  for (const m of modifiche) {
    if (m.tipo === 'removed') { if (carte.delete(m.id)) cambiato = true; continue; }
    const d = m.dati; let c = carte.get(m.id);
    if (!c) {
      if (typeof d.codice !== 'string') continue;
      c = { id: m.id, uso: 0, ultimo: 0, fissa: 0, ordine: Date.now() };
      carte.set(m.id, c); cambiato = true;
    }
    for (const k of CAMPI_NUBE) if (d[k] !== undefined && c[k] !== d[k]) { c[k] = d[k]; cambiato = true; }
  }
  if (cambiato) { salvaLocale(); disegna(); }
}
// Le carte che ci sono solo su questo telefono vanno online (così le vedono tutti)
function sincronizza(idsOnline) {
  for (const c of carte.values()) if (!idsOnline.has(c.id)) inNube(c, true);
}
async function nubeUsabile() {
  if (!nube) await Promise.race([nubePronta, new Promise(r => setTimeout(r, 5000))]);
  if (!nube) return false;
  return !!(await Promise.race([nube.pronta, new Promise(r => setTimeout(() => r(null), 5000))]));
}

// Se l'app è aperta in due finestre, l'altra si aggiorna subito
addEventListener('storage', e => { if (e.key === CHIAVE) leggiCarte(); });
// Chiede al telefono di non cancellare mai le carte per fare spazio
navigator.storage?.persist?.().catch(() => {});

function htmlCarta(c) {
  const a = aspetto(c);
  const quadrato = QUADRATI.includes(c.formato);
  return `
    <div class="giro">
      ${a.img ? `<div class="faccia fronte con-img" style="background-image:url('${a.img}')">${
          NEGOZI[c.negozio] && c.nome && c.nome !== NEGOZI[c.negozio].nome ? `<div class="f-etichetta">${esc(c.nome)}</div>` : ''}</div>` : `
      <div class="faccia fronte">
        <div class="lucido"></div>
        <div class="f-tipo">Carta fedeltà</div>
        <div class="f-chip"></div>
        <div class="f-nome" style="${a.font}">${esc(a.nome)}</div>
      </div>`}
      <div class="faccia retro">
        <div class="r-testa">
          <span class="r-nome" style="${a.font}">${esc(a.nome)}</span>
          <span class="r-punti"><b>${numero(c.punti)}</b><small>punti</small></span>
        </div>
        <div class="r-codice${quadrato ? ' quadrato' : ''}">${disegnoCodice(c.svg || '', c.formato)}</div>
        <div class="r-numero">${esc(numeroCodice(c.codice))}</div>
      </div>
    </div>
    <button class="cestino" aria-label="Elimina"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg></button>`;
}
function stileCarta(el, c) {
  const a = aspetto(c);
  el.style.setProperty('--bg', a.bg);
  el.style.setProperty('--fg', a.fg);
}
function impronta(c) { return [c.negozio, c.nome, c.codice, c.formato, c.svg?.length, c.img?.length].join('|'); }

// Le 4 carte più usate stanno in alto, poi una linea, poi tutte le altre dalla più usata alla meno usata.
const IN_ALTO = 4;
const CH_MODO = 'carte-modo';   // 'auto' = le più usate, 'manuale' = le 4 con la stella (campo «fissa»), 'libero' = l'ordine deciso trascinando (campo «pos»)
let modoAlte = 'auto';
try { const m = localStorage.getItem(CH_MODO); if (m === 'manuale' || m === 'libero') modoAlte = m; } catch (_) {}
let ordineFermo = null;   // mentre una carta è aperta l'ordine non cambia (si riordina alla chiusura)
function ordineVisuale() {
  const tutte = [...carte.values()];
  if (ordineFermo) {
    const prima = ordineFermo.ids.filter(id => carte.has(id));
    const nuove = tutte.filter(c => !ordineFermo.ids.includes(c.id)).sort((x, y) => x.ordine - y.ordine).map(c => c.id);
    return { ids: prima.concat(nuove), alte: Math.min(ordineFermo.alte, prima.length) };
  }
  if (modoAlte === 'libero') {   // l'ordine che ha deciso lui trascinando le carte
    const ids = tutte.sort((x, y) => ((x.pos ?? 1e9) - (y.pos ?? 1e9)) || (x.ordine - y.ordine)).map(c => c.id);
    return { ids, alte: Math.min(IN_ALTO, ids.length) };
  }
  const alte = (modoAlte === 'manuale'
    ? tutte.filter(c => c.fissa).sort((x, y) => x.fissa - y.fissa)
    : tutte.filter(c => c.uso > 0).sort((x, y) => (y.uso - x.uso) || ((y.ultimo || 0) - (x.ultimo || 0))))
    .slice(0, IN_ALTO).map(c => c.id);
  // Sotto la linea: dalla più usata alla meno usata (a parità, la usata più di recente; poi l'ordine in cui sono state aggiunte)
  const resto = tutte.filter(c => !alte.includes(c.id))
    .sort((x, y) => ((y.uso || 0) - (x.uso || 0)) || ((y.ultimo || 0) - (x.ultimo || 0)) || (x.ordine - y.ordine)).map(c => c.id);
  return { ids: alte.concat(resto), alte: alte.length };
}
function disegna() {
  const g = $('griglia');
  const { ids: ordine, alte } = ordineVisuale();
  // La linea sta solo se ci sono carte sia sopra sia sotto
  let sep = $('separatore');
  if (!sep) { sep = document.createElement('div'); sep.id = 'separatore'; sep.className = 'separatore'; }
  const conLinea = alte > 0 && alte < ordine.length;
  const posti = [];
  ordine.forEach((id, i) => { if (conLinea && i === alte) posti.push(sep); posti.push(id); });
  posti.forEach((voce, i) => {
    if (voce === sep) { if (g.children[i] !== sep) g.insertBefore(sep, g.children[i] || null); return; }
    const id = voce;
    const c = carte.get(id);
    let el = elementi.get(id);
    if (!el) {
      el = document.createElement('div');
      el.className = 'carta';
      el.dataset.id = id;
      el.onclick = () => tocca(id);
      el.addEventListener('animationend', () => { el.style.animation = 'none'; }, { once: true });   // l'entrata si vede una volta sola, non a ogni spostamento
      elementi.set(id, el);
    }
    if (el.dataset.impronta !== impronta(c)) {
      el.innerHTML = htmlCarta(c); stileCarta(el, c);
      el.dataset.impronta = impronta(c);
      el.dataset.punti = c.punti;
    } else if (el.dataset.punti != c.punti) {
      el.querySelector('.r-punti b').textContent = numero(c.punti);
      el.dataset.punti = c.punti;
    }
    if (g.children[i] !== el) g.insertBefore(el, g.children[i] || null);
  });
  if (!conLinea && sep.parentNode) sep.remove();
  for (const [id, el] of elementi) if (!carte.has(id)) { el.remove(); elementi.delete(id); }
  const n = carte.size;
  $('conta').textContent = n ? (n === 1 ? '1 carta' : n + ' carte') : '';
  $('vuoto').hidden = n > 0;
  if (!n && modoElimina) fineElimina();
  // La carta aperta segue i cambiamenti (anche quelli fatti da un altro telefono)
  if (aperta) {
    const c = carte.get(aperta.id);
    if (!c) { chiudiCarta(true); chiudiFoglio(); }
    else if (aperta.el.dataset.punti != c.punti) {
      const b = aperta.el.querySelector('.r-punti b');
      b.textContent = numero(c.punti);
      b.classList.remove('balza'); void b.offsetWidth; b.classList.add('balza');
      aperta.el.dataset.punti = c.punti;
    }
  }
}


// ---------- Tenere premuto una carta per spostarla ----------
let bloccaClickFino = 0;
let drag = null;   // { id, el, x0, y0, x, y, attivo, timer, clone, dx, dy, raf }
function assegnaPos(ids) { ids.forEach((id, i) => { const c = carte.get(id); if (c) c.pos = i; }); }
function impostaModo(m) { modoAlte = m; try { localStorage.setItem(CH_MODO, m); } catch (_) {} }
const idsInGriglia = () => [...$('griglia').children].filter(c => c.classList.contains('carta') && !c.classList.contains('volante')).map(c => c.dataset.id);

$('griglia').addEventListener('pointerdown', e => {
  if (modoElimina || aperta || drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
  const el = e.target.closest('.carta'); if (!el) return;
  drag = { id: el.dataset.id, el, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, attivo: false };
  drag.timer = setTimeout(iniziaTrascinamento, 380);
});
document.addEventListener('pointermove', e => {
  if (!drag) return;
  drag.x = e.clientX; drag.y = e.clientY;
  if (!drag.attivo) {
    // Se il dito si muove prima del mezzo secondo, è uno scorrimento della pagina: niente trascinamento
    if (Math.hypot(drag.x - drag.x0, drag.y - drag.y0) > 10) { clearTimeout(drag.timer); drag = null; }
    return;
  }
  muoviTrascinata();
});
document.addEventListener('pointerup', fineTrascinamento);
document.addEventListener('pointercancel', fineTrascinamento);
document.addEventListener('touchmove', e => { if (drag && drag.attivo) e.preventDefault(); }, { passive: false });
document.addEventListener('contextmenu', e => { if (drag && drag.attivo) e.preventDefault(); });

function iniziaTrascinamento() {
  if (!drag || aperta) { drag = null; return; }
  const r = drag.el.getBoundingClientRect();
  drag.attivo = true;
  drag.dx = drag.x - r.left; drag.dy = drag.y - r.top;
  const clone = drag.el.cloneNode(true);
  clone.classList.add('volante'); clone.removeAttribute('data-id');
  Object.assign(clone.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  document.body.appendChild(clone);
  drag.clone = clone;
  drag.el.classList.add('segnaposto');
  document.body.classList.add('trascina');
  navigator.vibrate?.(25);
  muoviTrascinata();
  scorriSeVicinoAlBordo();
}
// Posizione «vera» di una carta nella griglia (senza contare gli scivolamenti in corso): è su questa che si decide dove sta il dito
const postoVero = el => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
function muoviTrascinata() {
  drag.clone.style.transform = `translate(${drag.x - drag.dx - parseFloat(drag.clone.style.left)}px, ${drag.y - drag.dy - parseFloat(drag.clone.style.top)}px) scale(1.06)`;
  // Dove si trova il dito, nel sistema di coordinate delle posizioni vere
  const op = drag.el.offsetParent || document.body, ro = op.getBoundingClientRect();
  const px = drag.x - ro.left - op.clientLeft, py = drag.y - ro.top - op.clientTop;
  for (const el of elementi.values()) {
    if (el === drag.el) continue;
    const r = postoVero(el), mx = r.w * 0.18, my = r.h * 0.18;   // ci si sposta solo entrando bene dentro un'altra carta: niente scambi avanti e indietro sul bordo
    if (px < r.x + mx || px > r.x + r.w - mx || py < r.y + my || py > r.y + r.h - my) continue;
    const g = $('griglia'), figli = [...g.children];
    const dopo = figli.indexOf(el) > figli.indexOf(drag.el);
    // prima dello spostamento: dove sta ogni carta (vera) e dove si vede adesso (se sta ancora scivolando)
    const prima = new Map([...elementi.values()].filter(x => x !== drag.el).map(x => {
      const t = getComputedStyle(x).transform; let m = { m41: 0, m42: 0 };
      try { if (t && t !== 'none') m = new DOMMatrix(t); } catch (_) {}
      return [x, { p: postoVero(x), vx: m.m41, vy: m.m42 }];
    }));
    g.insertBefore(drag.el, dopo ? el.nextSibling : el);
    for (const [x, v] of prima) {
      const n = postoVero(x), dx = v.p.x - n.x + v.vx, dy = v.p.y - n.y + v.vy;   // parte da dove si vede adesso: nessuno scatto
      if (Math.abs(dx) < .5 && Math.abs(dy) < .5) continue;
      x.getAnimations().forEach(a => a.cancel());
      x.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    break;
  }
}
function scorriSeVicinoAlBordo() {
  if (!drag || !drag.attivo) return;
  const margine = 90, passo = 14;
  if (drag.y < margine) window.scrollBy(0, -passo); else if (drag.y > innerHeight - margine) window.scrollBy(0, passo);
  drag.raf = requestAnimationFrame(() => { if (drag && drag.attivo) { muoviTrascinata(); scorriSeVicinoAlBordo(); } });
}
function fineTrascinamento() {
  if (!drag) return;
  clearTimeout(drag.timer); cancelAnimationFrame(drag.raf);
  const d = drag; drag = null;
  if (!d.attivo) return;
  bloccaClickFino = Date.now() + 450;
  const finale = idsInGriglia();
  // la carta sollevata si posa nel suo posto
  const r = d.el.getBoundingClientRect(); const c = d.clone;
  c.style.transition = 'transform .18s cubic-bezier(.2,.8,.2,1)';
  c.style.transform = `translate(${r.left - parseFloat(c.style.left)}px, ${r.top - parseFloat(c.style.top)}px) scale(1)`;
  setTimeout(() => { c.remove(); d.el.classList.remove('segnaposto'); document.body.classList.remove('trascina'); }, 190);
  const prima = ordineVisuale().ids;
  if (finale.join() !== prima.join()) {
    const eraLibero = modoAlte === 'libero';
    assegnaPos(finale); impostaModo('libero'); salvaCarte();
    if (!eraLibero) avviso('Ora l\'ordine lo decidi tu (puoi cambiarlo in Impostazioni)');
  }
}

function tocca(id) {
  if (Date.now() < bloccaClickFino) return;   // appena finito di trascinare: non è un tocco
  if (modoElimina) return chiediElimina(id);
  apriCarta(id);
}

// ---------- Carta aperta: si alza, si ingrandisce e si gira ----------
let aperta = null;   // { id, el, origine }
// Finché la carta è girata lo schermo non si oscura e non si spegne (se il telefono lo permette)
let schermoAcceso = null;
async function tieniAcceso() {
  try { if (navigator.wakeLock && !schermoAcceso) { schermoAcceso = await navigator.wakeLock.request('screen'); schermoAcceso.addEventListener('release', () => { schermoAcceso = null; }); } } catch (_) {}
}
function lasciaSpegnere() { try { schermoAcceso?.release(); } catch (_) {} schermoAcceso = null; }
// Se si esce e si rientra nell'app mentre la carta è aperta, lo schermo torna a restare acceso
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && aperta) tieniAcceso(); });
let sonda;
function zonaSicuraSopra() {
  if (!sonda) { sonda = document.createElement('div'); sonda.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;padding-top:env(safe-area-inset-top,0px)'; document.body.appendChild(sonda); }
  return parseFloat(getComputedStyle(sonda).paddingTop) || 0;
}
function misureGrande() {
  const W = Math.min(innerWidth - 32, 440);
  const H = W / 1.586;
  // La carta si ferma in alto, vicino al bordo, così il lettore del negozio la prende bene (sotto la tacca dell'iPhone)
  const T = zonaSicuraSopra() + 14;
  return { W, H, L: (innerWidth - W) / 2, T };
}
function posizioneDa(orig, m) {
  const r = orig.getBoundingClientRect();
  return `translate(${r.left - m.L}px, ${r.top - m.T}px) scale(${r.width / m.W})`;
}
function apriCarta(id) {
  if (aperta) return;
  const orig = elementi.get(id), c = carte.get(id);
  if (!orig || !c) return;
  ordineFermo = ordineVisuale();                    // l'ordine resta com'è finché la carta è aperta
  c.uso = (c.uso || 0) + 1; c.ultimo = Date.now();  // conta quante volte la usi
  try { localStorage.setItem(CHIAVE, JSON.stringify([...carte.values()])); } catch (_) {}
  const m = misureGrande();
  const el = document.createElement('div');
  el.className = 'carta grande';
  el.innerHTML = htmlCarta(c); stileCarta(el, c);
  el.dataset.punti = c.punti;
  Object.assign(el.style, { left: m.L + 'px', top: m.T + 'px', width: m.W + 'px', transform: posizioneDa(orig, m) });
  el.onclick = () => chiudiCarta();
  document.body.appendChild(el);
  orig.style.visibility = 'hidden';
  aperta = { id, el, origine: orig };
  tieniAcceso();
  const az = $('apertaAzioni');
  az.style.top = (m.T + m.H + 22) + 'px';
  void el.offsetWidth;   // fa partire l'animazione dalla posizione nella griglia
  el.style.transform = 'none';
  el.classList.add('girata');
  $('velo').classList.add('su');
  az.classList.add('su');
}
function chiudiCarta(subito) {
  if (!aperta) return;
  const { el, origine } = aperta;
  aperta = null;
  lasciaSpegnere();
  $('velo').classList.remove('su');
  $('apertaAzioni').classList.remove('su');
  const fine = () => { el.remove(); origine.style.visibility = ''; if (!aperta) { ordineFermo = null; disegna(); } };
  if (subito || !origine.isConnected) return fine();
  el.classList.remove('girata');
  el.style.transform = posizioneDa(origine, misureGrande());
  el.addEventListener('transitionend', function f(e) { if (e.target === el) { el.removeEventListener('transitionend', f); fine(); } });
  setTimeout(() => { if (el.isConnected) fine(); }, 900);
}
$('velo').onclick = () => chiudiCarta();
addEventListener('resize', () => {
  if (!aperta) return;
  const m = misureGrande();
  Object.assign(aperta.el.style, { left: m.L + 'px', top: m.T + 'px', width: m.W + 'px' });
  $('apertaAzioni').style.top = (m.T + m.H + 22) + 'px';
});

// ---------- Foglio dal basso ----------
function apriFoglio(html) {
  $('foglioDentro').innerHTML = html;
  $('foglio').classList.add('su');
  $('foglioVelo').classList.add('su');
}
let fermaRegistro = null;
let foglioFisso = false;   // il foglio del nome non si chiude toccando fuori
function chiudiFoglio() {
  foglioFisso = false;
  if (fermaRegistro) { fermaRegistro(); fermaRegistro = null; }
  $('foglio').classList.remove('su');
  $('foglioVelo').classList.remove('su');
  document.activeElement?.blur?.();
}
$('foglioVelo').onclick = () => { if (!foglioFisso) chiudiFoglio(); };

// ---------- Punti: + carica, − scarica ----------
$('bPiu').onclick = () => aperta && chiediPunti(aperta.id, +1);
$('bMeno').onclick = () => aperta && chiediPunti(aperta.id, -1);
function chiediPunti(id, segno) {
  const c = carte.get(id); if (!c) return;
  const a = aspetto(c);
  apriFoglio(`
    <h2>${segno > 0 ? 'Carica punti' : 'Scarica punti'}</h2>
    <p class="sotto">${esc(a.nome)} — ${segno > 0 ? 'quanti punti hai caricato?' : 'quanti punti hai scaricato?'}</p>
    <form id="fPunti">
      <input class="campo-punti" id="nPunti" inputmode="numeric" pattern="[0-9]*" placeholder="0" autocomplete="off">
      <p class="saldo-ora">Adesso sulla carta: <b>${numero(c.punti)} punti</b></p>
      <div class="bottoni due">
        <button type="button" class="btn" id="fAnnulla">Annulla</button>
        <button type="submit" class="btn primario">${segno > 0 ? 'Carica' : 'Scarica'}</button>
      </div>
    </form>`);
  const campo = $('nPunti');
  setTimeout(() => campo.focus(), 60);
  campo.oninput = () => { campo.value = campo.value.replace(/\D/g, '').slice(0, 9); };
  $('fAnnulla').onclick = chiudiFoglio;
  $('fPunti').onsubmit = async e => {
    e.preventDefault();
    const n = parseInt(campo.value, 10);
    const ora = carte.get(id)?.punti || 0;
    const scuoti = () => { campo.classList.remove('scuoti'); void campo.offsetWidth; campo.classList.add('scuoti'); };
    if (!n) return scuoti();
    if (segno < 0 && n > ora) { scuoti(); avviso(`Sulla carta ci sono solo ${numero(ora)} punti`); return; }
    if (!chi()) { chiediNome(true, () => chiediPunti(id, segno)); return; }   // il movimento porta il nome di chi lo fa
    if (!await nubeUsabile()) { avviso('Manca il collegamento: riprova tra poco'); return; }
    // Saldo e movimento vanno online insieme; senza Internet partono da soli appena torna
    const c = carte.get(id); if (!c) return;
    const delta = segno * n, saldo = (c.punti || 0) + delta;
    c.punti = saldo; salvaCarte();
    nube.muoviPunti(c, delta, saldo, chi()).catch(() => avviso('Movimento non registrato: controlla il registro'));
    chiudiFoglio();
    avviso(`${segno > 0 ? '+' : '−'}${numero(n)} punti`);
  };
}

// ---------- Menu ----------
$('bMenu').onclick = e => { e.stopPropagation(); $('menu').hidden = !$('menu').hidden; };
document.addEventListener('click', e => { if (!$('menu').hidden && !$('menu').contains(e.target)) $('menu').hidden = true; });

// ---------- Eliminare una carta ----------
let modoElimina = false;
// ---------- Impostazioni: le 4 carte in alto e il nome delle carte ----------
const SVG_MATITA = '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4zM13.5 6.5l4 4"/></svg>';
const SVG_STELLA = '<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.8l6.1-.7z"/></svg>';
$('mImpostazioni').onclick = () => { $('menu').hidden = true; mostraImpostazioni(); };
function mostraImpostazioni() {
  const lista = [...carte.values()].sort((x, y) => x.ordine - y.ordine);
  const man = modoAlte === 'manuale';
  const nFisse = lista.filter(c => c.fissa).length;
  const righe = lista.map(c => {
    const a = aspetto(c);
    return `<div class="riga" data-id="${c.id}">
      <span class="pallino" style="background:${a.img ? `url('${a.img}') center/cover` : a.bg}"></span>
      <span class="riga-nome">${esc(a.nome)}</span>
      <button class="r-btn" data-az="rinomina" aria-label="Rinomina ${esc(a.nome)}">${SVG_MATITA}</button>
      ${man ? `<button class="r-btn stella${c.fissa ? ' su' : ''}" data-az="fissa" aria-label="Fissa in alto ${esc(a.nome)}">${SVG_STELLA}</button>` : ''}
    </div>`;
  }).join('');
  apriFoglio(`
    <h2>Impostazioni</h2>
    <p class="sezione">Le carte in alto</p>
    <div class="seg tre">
      <button data-m="auto" class="${modoAlte === 'auto' ? 'su' : ''}">Le più usate</button>
      <button data-m="manuale" class="${man ? 'su' : ''}">Le scelgo io</button>
      <button data-m="libero" class="${modoAlte === 'libero' ? 'su' : ''}">Il mio ordine</button>
    </div>
    <p class="sotto piccolo">${man
      ? `Tocca la stella per fissare fino a 4 carte in alto (${nFisse} di ${IN_ALTO}).`
      : modoAlte === 'libero'
        ? 'Le carte stanno dove le hai messe tu. Tieni premuta una carta e trascinala per spostarla.'
        : 'In alto ci sono le 4 carte che apri più spesso. Tieni premuta una carta e trascinala per decidere tu l\'ordine.'}</p>
    <p class="sezione">Le tue carte${man ? '' : ' · tocca la matita per rinominare'}</p>
    <div class="righe">${righe || '<p class="sotto">Non hai ancora nessuna carta.</p>'}</div>
    <div class="bottoni"><button class="btn primario" id="fFatto">Fatto</button></div>`);
  $('fFatto').onclick = chiudiFoglio;
  $('foglioDentro').querySelectorAll('.seg button').forEach(b => b.onclick = () => {
    if (b.dataset.m === 'libero' && modoAlte !== 'libero') assegnaPos(ordineVisuale().ids);   // parte dall'ordine che vede adesso
    impostaModo(b.dataset.m);
    salvaCarte(); mostraImpostazioni();
  });
  $('foglioDentro').querySelectorAll('.riga button').forEach(b => b.onclick = () => {
    const id = b.closest('.riga').dataset.id;
    if (b.dataset.az === 'rinomina') return rinominaCarta(id);
    const c = carte.get(id); if (!c) return;
    if (c.fissa) cambiaCarta(id, { fissa: 0 });
    else if (nFisse >= IN_ALTO) { avviso(`Sono già ${IN_ALTO}: togline una prima`); return; }
    else cambiaCarta(id, { fissa: Date.now() });
    mostraImpostazioni();
  });
}
function rinominaCarta(id) {
  const c = carte.get(id); if (!c) return;
  apriFoglio(`
    <h2>Rinomina la carta</h2>
    <p class="sotto">Il codice a barre e i punti restano gli stessi.</p>
    <form id="fRin">
      <input class="campo-testo" id="nNomeCarta" maxlength="40" value="${esc(aspetto(c).nome)}" autocomplete="off" autocapitalize="words">
      <div class="bottoni due">
        <button type="button" class="btn" id="fIndietro">Indietro</button>
        <button type="submit" class="btn primario">Salva</button>
      </div>
    </form>`);
  const campo = $('nNomeCarta');
  setTimeout(() => { campo.focus(); campo.select(); }, 80);
  $('fIndietro').onclick = mostraImpostazioni;
  $('fRin').onsubmit = e => {
    e.preventDefault();
    const nome = campo.value.trim();
    if (!nome) { campo.focus(); return; }
    cambiaCarta(id, { nome });
    avviso(`Carta rinominata «${nome}»`);
    mostraImpostazioni();
  };
}

// ---------- Il mio nome (resta scritto su ogni movimento di punti) ----------
function chiediNome(primo, dopo) {
  foglioFisso = !!primo;
  apriFoglio(`
    <h2>${primo ? 'Come ti chiami?' : 'Il mio nome'}</h2>
    <p class="sotto">Scrivi il tuo nome: quando carichi o scarichi punti, nel registro resta scritto che l'hai fatto tu.</p>
    <form id="fChi">
      <input class="campo-testo" id="nChi" maxlength="30" value="${esc(chi())}" placeholder="Il tuo nome" autocomplete="off" autocapitalize="words">
      <div class="bottoni${primo ? '' : ' due'}">
        ${primo ? '' : '<button type="button" class="btn" id="fAnnulla">Annulla</button>'}
        <button type="submit" class="btn primario">Salva</button>
      </div>
    </form>`);
  const campo = $('nChi');
  setTimeout(() => { campo.focus(); campo.select(); }, 80);
  if (!primo) $('fAnnulla').onclick = chiudiFoglio;
  $('fChi').onsubmit = e => {
    e.preventDefault();
    const nome = campo.value.trim().replace(/\s+/g, ' ');
    if (!nome) { campo.focus(); return; }
    try { localStorage.setItem(CH_CHI, nome); } catch (_) {}
    chiudiFoglio();
    avviso(`Ciao ${nome}!`);
    if (dopo) setTimeout(dopo, 450);
  };
}
$('mNome').onclick = () => { $('menu').hidden = true; chiediNome(false); };

// ---------- Registro dei punti: chi, quando, per ogni carta, mese e anno ----------
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const segnoPunti = n => (n > 0 ? '+' : n < 0 ? '−' : '') + numero(Math.abs(n));
$('mRegistro').onclick = () => { $('menu').hidden = true; mostraRegistro(); };
async function mostraRegistro() {
  apriFoglio(`<h2>Registro punti</h2><p class="sotto">Sto caricando…</p>`);
  if (!await nubeUsabile()) { apriFoglio(`<h2>Registro punti</h2><p class="sotto">Il registro è online: serve almeno una volta il collegamento a Internet.</p><div class="bottoni"><button class="btn primario" id="fFatto">Chiudi</button></div>`); $('fFatto').onclick = chiudiFoglio; return; }
  const oggi = new Date();
  const filtro = { carta: '', anno: String(oggi.getFullYear()), mese: '' };
  let tutti = [];
  const quando = m => { const t = m.ts?.toDate ? m.ts.toDate() : new Date(); return t; };
  apriFoglio(`
    <h2>Registro punti</h2>
    <p class="sotto">Carica e scarica punti, carte aggiunte, rinominate o eliminate: con chi l'ha fatto e quando.</p>
    <div class="filtri">
      <select id="rCarta" aria-label="Carta"></select>
      <select id="rAnno" aria-label="Anno"></select>
      <select id="rMese" aria-label="Mese"></select>
    </div>
    <div id="rDentro"></div>
    <div class="bottoni"><button class="btn primario" id="fFatto">Chiudi</button></div>`);
  $('fFatto').onclick = chiudiFoglio;
  const opzioni = (el, voci, scelto) => { el.innerHTML = voci.map(([v, t]) => `<option value="${esc(v)}"${v === scelto ? ' selected' : ''}>${esc(t)}</option>`).join(''); };
  function filtri() {
    const carteNomi = new Map();   // anche le carte che non ci sono più, finché hanno movimenti
    for (const m of [...tutti].reverse()) carteNomi.set(m.carta, m.cartaNome || 'Carta');
    for (const c of carte.values()) carteNomi.set(c.id, aspetto(c).nome);
    opzioni($('rCarta'), [['', 'Tutte le carte'], ...[...carteNomi].sort((a, b) => a[1].localeCompare(b[1], 'it'))], filtro.carta);
    const anni = new Set([String(oggi.getFullYear()), ...tutti.map(m => String(quando(m).getFullYear()))]);
    opzioni($('rAnno'), [['', 'Tutti gli anni'], ...[...anni].sort((a, b) => b - a).map(a => [a, a])], filtro.anno);
    opzioni($('rMese'), [['', 'Tutti i mesi'], ...MESI.map((m, i) => [String(i + 1), m[0].toUpperCase() + m.slice(1)])], filtro.mese);
  }
  function lista() {
    const el = $('rDentro'); if (!el) return;
    const righe = tutti.filter(m => {
      const t = quando(m);
      return (!filtro.carta || m.carta === filtro.carta) && (!filtro.anno || String(t.getFullYear()) === filtro.anno) && (!filtro.mese || String(t.getMonth() + 1) === filtro.mese);
    });
    if (!righe.length) { el.innerHTML = '<p class="sotto vuoto-reg">Nessun movimento con questi filtri.</p>'; return; }
    const somma = r => ({ su: r.filter(m => m.tipo !== 'iniziale' && m.punti > 0).reduce((a, m) => a + m.punti, 0), giu: r.filter(m => m.tipo !== 'iniziale' && m.punti < 0).reduce((a, m) => a - m.punti, 0) });
    const tot = somma(righe);
    const saldo = filtro.carta && carte.get(filtro.carta) ? `<div><small>Saldo ora</small><b>${numero(carte.get(filtro.carta).punti)}</b></div>` : '';
    let html = `<div class="riepilogo">${saldo}<div><small>Caricati</small><b class="pos">+${numero(tot.su)}</b></div><div><small>Scaricati</small><b class="neg">−${numero(tot.giu)}</b></div></div>`;
    const mesi = new Map();
    for (const m of righe) { const t = quando(m), k = t.getFullYear() * 100 + t.getMonth(); (mesi.get(k) || mesi.set(k, []).get(k)).push(m); }
    for (const [k, r] of [...mesi].sort((a, b) => b[0] - a[0])) {
      const s = somma(r);
      html += `<div class="mese"><span>${MESI[k % 100]} ${Math.floor(k / 100)}</span><span><i class="pos">+${numero(s.su)}</i> <i class="neg">−${numero(s.giu)}</i></span></div>`;
      html += r.map(m => {
        const t = quando(m);
        const data = t.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }) + ' · ' + t.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        const iniz = m.tipo === 'iniziale';
        if (m.tipo === 'nuova' || m.tipo === 'modifica' || m.tipo === 'elimina') {
          const testo = m.tipo === 'nuova' ? 'Carta aggiunta' : m.tipo === 'elimina' ? 'Carta eliminata' : (m.dettaglio || 'Carta rinominata');
          return `<div class="mov">
          <div class="mov-sx"><b>${filtro.carta ? esc(m.chi) : esc(m.cartaNome || 'Carta')}</b><small>${data}${filtro.carta ? '' : ' · ' + esc(m.chi)}</small></div>
          <div class="mov-dx"><small class="evento">${esc(testo)}</small></div>
        </div>`;
        }
        return `<div class="mov">
          <div class="mov-sx"><b>${filtro.carta ? esc(m.chi) : esc(m.cartaNome || 'Carta')}</b><small>${data}${filtro.carta ? '' : ' · ' + esc(m.chi)}</small></div>
          <div class="mov-dx"><b class="${iniz ? '' : m.punti > 0 ? 'pos' : 'neg'}">${iniz ? numero(m.punti) : segnoPunti(m.punti)}</b><small>${iniz ? 'saldo iniziale' : 'saldo ' + numero(m.saldo)}</small></div>
        </div>`;
      }).join('');
    }
    el.innerHTML = html;
  }
  ['rCarta', 'rAnno', 'rMese'].forEach(id => $(id).onchange = () => { filtro.carta = $('rCarta').value; filtro.anno = $('rAnno').value; filtro.mese = $('rMese').value; lista(); });
  filtri(); $('rDentro').innerHTML = '<p class="sotto vuoto-reg">Sto caricando…</p>';
  const ferma = nube.ascoltaMovimenti(l => {
    if (!$('rDentro')) { ferma(); return; }
    if (l) { tutti = l; const a = [filtro.carta, filtro.anno, filtro.mese]; filtri(); lista(); }
  });
  fermaRegistro = ferma;
}

// ---------- Backup delle carte su file ----------
$('mBackup').onclick = async () => {
  $('menu').hidden = true;
  if (!carte.size) { avviso('Non ci sono carte da salvare'); return; }
  const data = new Date().toISOString().slice(0, 10);
  const nome = `carte-backup-${data}.json`;
  const testo = JSON.stringify({ app: 'carte', versione: 1, salvato: new Date().toISOString(), carte: [...carte.values()] });
  const file = new File([testo], nome, { type: 'application/json' });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      // Su iPhone si apre il foglio di condivisione: «Salva su File» o AirDrop, Mail, ecc.
      await navigator.share({ files: [file] });
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file); a.download = nome;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
    avviso(`Backup di ${carte.size} ${carte.size === 1 ? 'carta' : 'carte'} pronto`);
  } catch (x) {
    if (x.name !== 'AbortError') avviso('Backup non riuscito');
  }
};
$('mRipristina').onclick = () => { $('menu').hidden = true; $('fileBackup').value = ''; $('fileBackup').click(); };
$('fileBackup').onchange = async e => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const d = JSON.parse(await f.text());
    const lista = (d.app === 'carte' && Array.isArray(d.carte)) ? d.carte : null;
    if (!lista) throw new Error('formato');
    let nuove = 0; const aggiunte = [];
    for (const c of lista) {
      if (!c || typeof c.codice !== 'string' || typeof c.svg !== 'string' || typeof c.formato !== 'string') continue;
      // La stessa carta (stesso codice) non si duplica: se c'è già, resta quella che hai sul telefono
      if ([...carte.values()].some(x => x.codice === c.codice)) continue;
      const id = idDa(c.codice);
      const nuova = { id, negozio: c.negozio || null, nome: String(c.nome || ''), codice: c.codice, formato: c.formato,
                      svg: c.svg, img: typeof c.img === 'string' ? c.img : undefined, punti: Number.isFinite(c.punti) ? Math.round(c.punti) : 0,
                      uso: Number.isFinite(c.uso) ? c.uso : 0, fissa: Number.isFinite(c.fissa) ? c.fissa : 0, pos: Number.isFinite(c.pos) ? c.pos : undefined, ultimo: Number.isFinite(c.ultimo) ? c.ultimo : 0, ordine: Number.isFinite(c.ordine) ? c.ordine : Date.now() + nuove };
      carte.set(id, nuova); aggiunte.push(nuova);
      nuove++;
    }
    salvaCarte();
    aggiunte.forEach(c => inNube(c, true));
    avviso(nuove ? `Ripristinate ${nuove} ${nuove === 1 ? 'carta' : 'carte'}` : 'Nessuna carta nuova: ci sono già tutte');
  } catch (_) { avviso('Questo file non è un backup delle carte'); }
};

$('mElimina').onclick = () => {
  $('menu').hidden = true;
  if (!carte.size) { avviso('Non ci sono carte da eliminare'); return; }
  modoElimina = true;
  $('app').classList.add('elimina');
  $('strisciaElimina').hidden = false;
};
function fineElimina() {
  modoElimina = false;
  $('app').classList.remove('elimina');
  $('strisciaElimina').hidden = true;
}
$('bFineElimina').onclick = fineElimina;
function chiediElimina(id) {
  const c = carte.get(id); if (!c) return;
  const a = aspetto(c);
  apriFoglio(`
    <h2>Eliminare «${esc(a.nome)}»?</h2>
    <p class="sotto">La carta, il codice a barre e i punti vengono cancellati per tutta la famiglia. Il registro dei movimenti resta.</p>
    <div class="bottoni">
      <button class="btn rosso" id="fElimina">Elimina la carta</button>
      <button class="btn" id="fAnnulla">Annulla</button>
    </div>`);
  $('fAnnulla').onclick = chiudiFoglio;
  $('fElimina').onclick = () => {
    eliminaCarta(id);
    chiudiFoglio();
    avviso(`«${a.nome}» eliminata`);
  };
}

// ---------- Aggiungere una carta con la fotocamera ----------
let zx = null;
function caricaZXing() {
  if (zx) return zx;
  zx = new Promise((ok, no) => {
    const s = document.createElement('script');
    s.src = 'lib/zxing.js?v=3';
    s.onload = () => {
      ZXingWASM.prepareZXingModule({
        overrides: { locateFile: (p, prefix) => p.endsWith('.wasm') ? new URL('lib/zxing_full.wasm?v=3', location.href).href : prefix + p },
        fireImmediately: true
      }).then(() => ok(ZXingWASM), no);
    };
    s.onerror = () => { zx = null; no(new Error('libreria non caricata')); };
    document.head.appendChild(s);
  });
  return zx;
}

let flusso = null, cerca = false;
const tela = document.createElement('canvas');
const ctx = tela.getContext('2d', { willReadFrequently: true });

$('bAggiungi').onclick = apriCamera;
$('bAggiungiVuoto').onclick = apriCamera;
$('bChiudiCamera').onclick = chiudiCamera;

async function apriCamera() {
  if (modoElimina) fineElimina();
  $('camera').hidden = false;
  $('mirino').classList.remove('trovato');
  $('camTesto').textContent = 'Sto aprendo la fotocamera…';
  const libreria = caricaZXing().catch(() => null);
  try {
    flusso = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }
    });
  } catch (x) {
    $('camTesto').textContent = x.name === 'NotAllowedError'
      ? 'La fotocamera è bloccata: permetti l\'uso della fotocamera nelle impostazioni del browser'
      : 'Non riesco ad aprire la fotocamera';
    return;
  }
  if ($('camera').hidden) { fermaFlusso(); return; }
  const v = $('video');
  v.srcObject = flusso;
  try { await v.play(); } catch (_) {}
  // Messa a fuoco continua, se il telefono la permette
  try {
    const t = flusso.getVideoTracks()[0];
    const cap = t.getCapabilities?.() || {};
    if (cap.focusMode?.includes('continuous')) await t.applyConstraints({ advanced: [{ focusMode: 'continuous' }] });
  } catch (_) {}
  $('camTesto').textContent = 'Inquadra il codice a barre della carta';
  const Z = await libreria;
  if (!Z) { $('camTesto').textContent = 'Manca la connessione per il lettore dei codici'; return; }
  cerca = true;
  giro(Z, 0);
}
function fermaFlusso() {
  cerca = false;
  if (flusso) flusso.getTracks().forEach(t => t.stop());
  flusso = null;
  $('video').srcObject = null;
}
function chiudiCamera() { fermaFlusso(); $('camera').hidden = true; }

async function giro(Z, n) {
  if (!cerca) return;
  const v = $('video');
  if (v.readyState >= 2 && v.videoWidth) {
    try {
      const r = await leggi(Z, v, n % 2 === 0);
      if (r && cerca) return trovato(Z, r);
    } catch (_) {}
  }
  setTimeout(() => giro(Z, n + 1), 90);
}
// Legge un fotogramma: a giri alterni il riquadro del mirino (ingrandito) o tutta l'immagine
async function leggi(Z, v, soloMirino) {
  const vw = v.videoWidth, vh = v.videoHeight;
  let sx = 0, sy = 0, sw = vw, sh = vh;
  if (soloMirino) {
    const box = $('mirino').getBoundingClientRect();
    const sc = Math.max(innerWidth / vw, innerHeight / vh);
    const ox = (innerWidth - vw * sc) / 2, oy = (innerHeight - vh * sc) / 2;
    const marg = 0.12;
    sx = Math.max(0, (box.left - ox) / sc - box.width / sc * marg);
    sy = Math.max(0, (box.top - oy) / sc - box.height / sc * marg);
    sw = Math.min(vw - sx, box.width / sc * (1 + 2 * marg));
    sh = Math.min(vh - sy, box.height / sc * (1 + 2 * marg));
  }
  const k = Math.min(1, 1280 / sw);
  tela.width = Math.round(sw * k); tela.height = Math.round(sh * k);
  ctx.drawImage(v, sx, sy, sw, sh, 0, 0, tela.width, tela.height);
  const img = ctx.getImageData(0, 0, tela.width, tela.height);
  const ris = await Z.readBarcodes(img, { tryHarder: true, maxNumberOfSymbols: 1 });
  return ris.find(x => x.isValid && x.text);
}
async function trovato(Z, r) {
  cerca = false;
  navigator.vibrate?.(60);
  $('mirino').classList.add('trovato');
  $('camTesto').textContent = 'Carta letta!';
  const codice = r.text.trim();
  let formato = r.format;
  let out = await Z.writeBarcode(codice, { format: formato, withHRT: false }).catch(() => null);
  if (!out || out.error || !out.svg) {   // formato che non si sa ridisegnare: si usa il Code 128
    formato = 'Code128';
    out = await Z.writeBarcode(codice, { format: 'Code128', withHRT: false });
  }
  await new Promise(ok => setTimeout(ok, 550));
  chiudiCamera();
  const doppia = [...carte.values()].find(c => c.codice === codice);
  if (doppia) { avviso('Questa carta c\'è già'); apriCarta(doppia.id); return; }
  // Si salva subito; poi si sceglie il negozio
  const id = idDa(codice);
  aggiungiCarta({ id, negozio: null, nome: '', codice, formato, svg: out.svg, punti: 0, ordine: Date.now() });
  scegliNegozio(id, codice);
}

function scegliNegozio(id, codice) {
  const mini = Object.entries(NEGOZI).map(([k, n]) =>
    `<button class="negozio con-img" data-k="${k}" aria-label="${esc(n.nome)}" style="background-image:url('${n.img}')"></button>`).join('');
  apriFoglio(`
    <div class="letto"><span class="ok">✓</span><span>Carta salvata · <b>${esc(numeroCodice(codice))}</b></span></div>
    <h2>Di quale negozio è?</h2>
    <p class="sotto">Tocca il negozio</p>
    <div class="negozi">${mini}<button class="negozio altro" id="fAltro"><span>Altro…</span></button></div>
    <form id="fNome" hidden class="bottoni">
      <input class="campo-testo" id="nNome" placeholder="Nome del negozio" maxlength="40" autocomplete="off">
      <button class="btn primario" type="submit">Salva</button>
    </form>`);
  $('foglioDentro').querySelectorAll('.negozio[data-k]').forEach(b => b.onclick = () => {
    cambiaCarta(id, { negozio: b.dataset.k, nome: NEGOZI[b.dataset.k].nome });
    chiudiFoglio();
  });
  $('fAltro').onclick = () => { $('fNome').hidden = false; $('nNome').focus(); };
  $('fNome').onsubmit = e => {
    e.preventDefault();
    const nome = $('nNome').value.trim();
    if (!nome) return $('nNome').focus();
    cambiaCarta(id, { negozio: null, nome });
    chiudiFoglio();
  };
}

// ---------- Installabile sul telefono + aggiornamenti in silenzio ----------
// L'apertura non aspetta mai Internet. Se c'è una versione nuova, i suoi file si scaricano in secondo piano
// (mentre usi l'app) e si vedono alla PROSSIMA apertura, già pronti sul telefono.
const PROVA = ['localhost', '127.0.0.1'].includes(location.hostname);
async function preparaAggiornamento() {
  try {
    const r = await fetch('versione.txt?x=' + Date.now(), { cache: 'no-store' });
    const nuova = (await r.text()).trim();
    if (!nuova || nuova === VERSIONE || localStorage.getItem('carte-preparata') === nuova) return;
    const html = await (await fetch('index.html?x=' + Date.now(), { cache: 'no-store' })).text();
    const indirizzi = new Set(html.match(/[\w./-]+\?v=\d+/g) || []);
    const jsUrl = [...indirizzi].find(u => /^app\.js\?v=/.test(u));
    if (jsUrl) {   // anche le immagini dei negozi citate nel nuovo app.js
      const js = await (await fetch(jsUrl)).text();
      (js.match(/negozi\/[\w-]+\.png\?v=\d+|nube\.js\?v=\d+/g) || []).forEach(u => indirizzi.add(u));
    }
    for (const u of indirizzi) await fetch(u);
    localStorage.setItem('carte-preparata', nuova);
  } catch (_) { /* senza rete: si riprova alla prossima apertura */ }
}
// Tutto questo parte DOPO che l'app si è già mostrata
addEventListener('load', () => setTimeout(() => {
  if ('serviceWorker' in navigator && !PROVA) navigator.serviceWorker.register('sw.js').catch(() => {});
  preparaAggiornamento();
}, 1500));

// Registro dei tempi di apertura (solo sul telefono, non si vede): serve a capire se qualcosa rallenta
function registraTempi() {
  try {
    const n = performance.getEntriesByType('navigation')[0] || {};
    const fp = (performance.getEntriesByType('paint')[0] || {}).startTime || 0;
    const l = JSON.parse(localStorage.getItem('carte-tempi') || '[]');
    l.push({ quando: new Date().toISOString().slice(0, 16).replace('T', ' '), v: VERSIONE, sw: n.workerStart > 0, ms_pagina: Math.round(n.domContentLoadedEventEnd || 0),
             ms_prima_immagine: Math.round(fp), ms_carte: Math.round(performance.now()), tipo: n.type || '', rete: Math.round(n.responseEnd - n.fetchStart) || 0 });
    localStorage.setItem('carte-tempi', JSON.stringify(l.slice(-15)));
  } catch (_) {}
}

// Per le prove
window.__carte = { carte, NEGOZI, aggiungiCarta };

// ---------- Finestrina «App aggiornata» con la i per vedere cosa è cambiato ----------
// A ogni pubblicazione si aggiunge qui una riga con il numero della versione e le novità (in italiano semplice).
const NOVITA = {
  28: 'Quando qualcuno aggiunge una carta di un negozio nuovo, dopo poco compare con la sua immagine vera, per tutti.',
  27: 'Nel registro resta scritto anche chi aggiunge, rinomina o elimina una carta. L\'app si apre ancora più veloce.',
  26: 'Su un telefono nuovo le carte della famiglia arrivano subito e da sole.',
  25: 'Le carte sono online: le vedono e le usano tutti in famiglia. Ogni volta che carichi o scarichi punti, il saldo si aggiorna per tutti e resta scritto nel registro chi l\'ha fatto e quando (menu ⋯ → Registro punti).',
  24: 'Quando sposti una carta, le altre scivolano al loro posto senza tremare.',
  23: 'All\'avvio compare subito lo sfondo scuro, senza il bianco prima delle carte.',
  21: 'L\'app si apre subito anche dopo molte ore o giorni. Gli aggiornamenti arrivano in silenzio e si vedono alla prossima apertura.',
  20: 'Tieni premuta una carta e trascinala per metterla dove vuoi. In Impostazioni, «Il mio ordine» o «Le più usate».',
  19: 'Anche le carte sotto la linea sono ordinate in base a quanto le usi.',
  18: 'Le carte Arca Planet, Bialetti, Bottega Verde, Gabel, Gaudi, Nuna Lie e Sandro Ferrone hanno la loro immagine.',
  17: 'Il pulsante OK della finestra di aggiornamento ha un colore nuovo.',
  16: 'Quando l\'app si aggiorna compare questa finestra: con la i vedi cosa è cambiato.',
  15: 'L\'app si apre subito, senza aspettare.',
  14: 'Aggiunta la carta Lidl.',
  13: 'La carta Coop ora è quella di Unicoop Firenze.',
  12: 'Le carte hanno la grafica vera dei negozi.',
  11: 'Con la carta girata lo schermo resta acceso e la carta sale in alto, vicino al bordo, per il lettore.',
  10: 'Il backup salva un solo file. Nuova icona.',
  9: 'Nelle Impostazioni scegli tu le 4 carte in alto e puoi rinominare le carte.',
  8: 'Le 4 carte più usate stanno in alto, separate da una linea.',
  7: 'Salvataggio e ripristino delle carte con un file di backup.'
};
const CH_VISTA = 'carte-vista';
function mostraAggiornamento() {
  let vista = 14;   // la prima volta si parte dalla 14, l'ultima prima di questa finestra
  try { const v = parseInt(localStorage.getItem(CH_VISTA), 10); if (v > 0) vista = v; } catch (_) {}
  const ora = parseInt(VERSIONE, 10);
  if (ora <= vista) return;
  const nuove = Object.keys(NOVITA).map(Number).filter(n => n > vista && n <= ora).sort((a, b) => b - a).slice(0, 8);
  $('aggVersione').textContent = 'Versione ' + ora;
  $('aggLista').innerHTML = nuove.map(n => `<li><b>${n}</b><span>${esc(NOVITA[n])}</span></li>`).join('');
  $('aggNovita').hidden = true; $('aggInfo').setAttribute('aria-expanded', 'false');
  $('aggVelo').hidden = false;
  $('aggInfo').onclick = () => {
    const apri = $('aggNovita').hidden; $('aggNovita').hidden = !apri;
    $('aggInfo').setAttribute('aria-expanded', apri ? 'true' : 'false'); $('aggInfo').classList.toggle('su', apri);
  };
  $('aggOk').onclick = () => {
    try { localStorage.setItem(CH_VISTA, String(ora)); } catch (_) {}
    $('aggVelo').hidden = true;
  };
}

leggiCarte();
mostraAggiornamento();
// Le carte online si collegano a riposo, dopo che l'app si è già mostrata e animata: l'apertura non rallenta
addEventListener('load', () => { const via = () => setTimeout(avviaNube, 300); ('requestIdleCallback' in window) ? requestIdleCallback(via, { timeout: 2500 }) : via(); });
if (!chi()) setTimeout(() => { if (!aperta) chiediNome(true); }, 700);   // ognuno scrive il suo nome una volta sola
// Le carte sono pronte: si toglie la schermata scura, ma solo quando lo stile è arrivato (così non si vede mai niente «a metà»)
function finitoAvvio() { document.getElementById('splash')?.remove(); registraTempi(); }
const fogliostile = document.querySelector('link[rel="stylesheet"]');
if (fogliostile && fogliostile.media !== 'all') fogliostile.addEventListener('load', finitoAvvio, { once: true }); else finitoAvvio();
