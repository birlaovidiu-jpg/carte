// Le mie carte — carte fedeltà dei negozi con codice a barre e punti.
// Le carte sono salvate sul telefono (memoria del browser): niente account, niente server.
export const VERSIONE = '5';

// ---------- I negozi (colori e scritte, simili a quelli veri) ----------
const SERIF = "'Didot','Bodoni 72','Playfair Display',Georgia,serif";
const STRETTO = "'Avenir Next Condensed','Arial Narrow','Roboto Condensed',sans-serif";
export const NEGOZI = {
  coop:       { nome: 'Coop',       bg: '#ffffff', fg: '#e2231a', font: 'font-weight:900;font-style:italic;letter-spacing:-.04em' },
  esselunga:  { nome: 'Esselunga',  bg: 'linear-gradient(135deg,#e5101f,#a0000f)', fg: '#ffffff', font: 'font-weight:800;font-style:italic;letter-spacing:-.03em;text-transform:lowercase' },
  famila:     { nome: 'Famila',     bg: 'linear-gradient(135deg,#e30613,#b8000c)', fg: '#ffdd00', font: 'font-weight:900;letter-spacing:-.02em;text-transform:lowercase' },
  pittarosso: { nome: 'PittaRosso', bg: 'linear-gradient(135deg,#ff2a3c,#c4001a)', fg: '#ffffff', font: `font-family:${STRETTO};font-weight:800;text-transform:uppercase;letter-spacing:.01em` },
  benetton:   { nome: 'Benetton',   bg: 'linear-gradient(135deg,#119a4a,#006b2e)', fg: '#ffffff', font: `font-family:${STRETTO};font-weight:700;text-transform:uppercase;letter-spacing:.06em` },
  conbipel:   { nome: 'Conbipel',   bg: 'linear-gradient(135deg,#3a3a3e,#1b1b1e)', fg: '#ffffff', font: 'font-weight:300;text-transform:uppercase;letter-spacing:.14em' },
  douglas:    { nome: 'Douglas',    bg: 'linear-gradient(135deg,#b3eae0,#8fd6c9)', fg: '#0b0b0b', font: `font-family:${SERIF};font-weight:400;text-transform:uppercase;letter-spacing:.1em` },
  gala:       { nome: 'Gala',       bg: 'linear-gradient(135deg,#8a3ba0,#3f1450)', fg: '#ffffff', font: `font-family:${SERIF};font-style:italic;font-weight:600` },
  guess:      { nome: 'Guess',      bg: 'linear-gradient(135deg,#1a1a1a,#000000)', fg: '#d9b871', font: `font-family:${SERIF};font-weight:700;text-transform:uppercase;letter-spacing:.08em` },
  limoni:     { nome: 'Limoni',     bg: 'linear-gradient(135deg,#ffe24a,#f8c600)', fg: '#1a1a1a', font: `font-family:${SERIF};font-weight:600;letter-spacing:.01em` },
  lindt:      { nome: 'Lindt',      bg: 'linear-gradient(135deg,#123a80,#061a42)', fg: '#d6b46c', font: `font-family:${SERIF};font-style:italic;font-weight:600` },
  ovs:        { nome: 'OVS',        bg: 'linear-gradient(135deg,#1747c2,#002a8a)', fg: '#ffffff', font: 'font-weight:900;letter-spacing:.02em' }
};
// Colori per le carte di altri negozi (scelti dal nome, sempre uguali per lo stesso nome)
const ALTRI = [
  ['linear-gradient(135deg,#ff7a18,#d94a00)', '#fff'], ['linear-gradient(135deg,#0fb5ae,#06756f)', '#fff'],
  ['linear-gradient(135deg,#5b5bd6,#2f2f99)', '#fff'], ['linear-gradient(135deg,#ff5d8f,#c2185b)', '#fff'],
  ['linear-gradient(135deg,#2e9cf3,#1060b8)', '#fff'], ['linear-gradient(135deg,#8bc34a,#4e8a1c)', '#fff'],
  ['linear-gradient(135deg,#795548,#4a2f25)', '#fff'], ['linear-gradient(135deg,#f6d365,#fda085)', '#3a1d00']
];
function aspetto(c) {
  const n = NEGOZI[c.negozio];
  if (n) return { nome: c.nome || n.nome, bg: n.bg, fg: n.fg, font: n.font };
  const nome = c.nome || 'Carta';
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

function leggiCarte() {
  let lista = [];
  try { lista = JSON.parse(localStorage.getItem(CHIAVE) || '[]'); } catch (_) {}
  carte.clear();
  lista.sort((x, y) => x.ordine - y.ordine).forEach(c => carte.set(c.id, c));
  disegna([...carte.keys()]);
}
function salvaCarte() {
  try { localStorage.setItem(CHIAVE, JSON.stringify([...carte.values()])); }
  catch (_) { avviso('Non riesco a salvare: memoria del telefono piena'); }
  disegna([...carte.keys()]);
}
function aggiungiCarta(c) { carte.set(c.id, c); salvaCarte(); }
function cambiaCarta(id, campi) { const c = carte.get(id); if (!c) return; Object.assign(c, campi); salvaCarte(); }
function eliminaCarta(id) { carte.delete(id); salvaCarte(); }
const nuovoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// Se l'app è aperta in due finestre, l'altra si aggiorna subito
addEventListener('storage', e => { if (e.key === CHIAVE) leggiCarte(); });
// Chiede al telefono di non cancellare mai le carte per fare spazio
navigator.storage?.persist?.().catch(() => {});

function htmlCarta(c) {
  const a = aspetto(c);
  const quadrato = QUADRATI.includes(c.formato);
  return `
    <div class="giro">
      <div class="faccia fronte">
        <div class="lucido"></div>
        <div class="f-tipo">Carta fedeltà</div>
        <div class="f-chip"></div>
        <div class="f-nome" style="${a.font}">${esc(a.nome)}</div>
      </div>
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
function impronta(c) { return [c.negozio, c.nome, c.codice, c.formato, c.svg?.length].join('|'); }

function disegna(ordine) {
  const g = $('griglia');
  ordine.forEach((id, i) => {
    const c = carte.get(id);
    let el = elementi.get(id);
    if (!el) {
      el = document.createElement('div');
      el.className = 'carta';
      el.dataset.id = id;
      el.onclick = () => tocca(id);
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

function tocca(id) {
  if (modoElimina) return chiediElimina(id);
  apriCarta(id);
}

// ---------- Carta aperta: si alza, si ingrandisce e si gira ----------
let aperta = null;   // { id, el, origine }
function misureGrande() {
  const W = Math.min(innerWidth - 32, 440);
  const H = W / 1.586;
  const sopra = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sicuro-su')) || 0;
  const T = Math.max(sopra + 24, Math.min(innerHeight * 0.16, (innerHeight - H - 170) / 2));
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
  $('velo').classList.remove('su');
  $('apertaAzioni').classList.remove('su');
  const fine = () => { el.remove(); origine.style.visibility = ''; };
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
function chiudiFoglio() {
  $('foglio').classList.remove('su');
  $('foglioVelo').classList.remove('su');
  document.activeElement?.blur?.();
}
$('foglioVelo').onclick = chiudiFoglio;

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
  $('fPunti').onsubmit = e => {
    e.preventDefault();
    const n = parseInt(campo.value, 10);
    const ora = carte.get(id)?.punti || 0;
    const scuoti = () => { campo.classList.remove('scuoti'); void campo.offsetWidth; campo.classList.add('scuoti'); };
    if (!n) return scuoti();
    if (segno < 0 && n > ora) { scuoti(); avviso(`Sulla carta ci sono solo ${numero(ora)} punti`); return; }
        cambiaCarta(id, { punti: ora + segno * n });
    chiudiFoglio();
    avviso(`${segno > 0 ? '+' : '−'}${numero(n)} punti`);
  };
}

// ---------- Menu ----------
$('bMenu').onclick = e => { e.stopPropagation(); $('menu').hidden = !$('menu').hidden; };
document.addEventListener('click', e => { if (!$('menu').hidden && !$('menu').contains(e.target)) $('menu').hidden = true; });

// ---------- Eliminare una carta ----------
let modoElimina = false;
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
    <p class="sotto">La carta, il codice a barre e i punti vengono cancellati.</p>
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
  const id = nuovoId();
  aggiungiCarta({ id, negozio: null, nome: '', codice, formato, svg: out.svg, punti: 0, ordine: Date.now() });
  scegliNegozio(id, codice);
}

function scegliNegozio(id, codice) {
  const mini = Object.entries(NEGOZI).map(([k, n]) =>
    `<button class="negozio" data-k="${k}" style="--bg:${n.bg};--fg:${n.fg}"><span style="${n.font}">${esc(n.nome)}</span></button>`).join('');
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

// ---------- Installabile sul telefono + aggiornamenti ----------
const PROVA = ['localhost', '127.0.0.1'].includes(location.hostname);
if ('serviceWorker' in navigator && !PROVA) navigator.serviceWorker.register('sw.js').catch(() => {});
(async () => {
  try {
    const r = await fetch('versione.txt?x=' + Date.now(), { cache: 'no-store' });
    const nuova = (await r.text()).trim();
    if (nuova && nuova !== VERSIONE && sessionStorage.getItem('aggiornato') !== nuova) {
      sessionStorage.setItem('aggiornato', nuova);
      const u = new URL(location.href); u.searchParams.set('agg', nuova); location.replace(u.href);
    }
  } catch (_) {}
})();

// Per le prove
window.__carte = { carte, NEGOZI, aggiungiCarta };

leggiCarte();
