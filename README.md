# Carte

Carte fedeltà dei negozi sul telefono: codice a barre e punti.

- Sito: https://birlaovidiu-jpg.github.io/carte/
- Le carte sono online per tutta la famiglia (Firebase `carte-famiglia`, accesso anonimo: ognuno scrive il suo nome) e anche sul telefono, così l'app si apre subito e funziona senza Internet.
- Il registro dei punti (chi, quando, quanto, per carta/mese/anno) è nella raccolta `movimenti`: si può solo aggiungere. Regole in `firestore.rules`, codice online in `nube.js`.
- Lettore e disegno dei codici a barre: `lib/zxing.js` + `lib/zxing_full.wasm` (zxing-wasm, licenza in `lib/zxing-LICENZA.txt`).

Pubblicare una versione nuova: alzare insieme `versione.txt`, `VERSIONE` in `app.js` e i `?v=` in `index.html`/`app.js`/`manifest.json`, poi `git push`.
