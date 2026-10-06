# Carte

Carte fedeltà dei negozi sul telefono: codice a barre e punti.

- Sito: https://birlaovidiu-jpg.github.io/carte/
- Le carte sono salvate sul telefono (memoria del browser): niente account, niente server.
- Lettore e disegno dei codici a barre: `lib/zxing.js` + `lib/zxing_full.wasm` (zxing-wasm, licenza in `lib/zxing-LICENZA.txt`).

Pubblicare una versione nuova: alzare insieme `versione.txt`, `VERSIONE` in `app.js` e i `?v=` in `index.html`/`app.js`, poi `git push`.
