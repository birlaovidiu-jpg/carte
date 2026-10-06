# Le mie carte

Carte fedeltà dei negozi sul telefono: codice a barre e punti, in tempo reale su tutti i telefoni.

- Sito: https://birlaovidiu-jpg.github.io/carte/
- Database: Firebase, progetto `carte-soci` (Firestore a Milano, accesso con nome utente e password).
- Regole del database: `firestore.rules` (da incollare in Firebase → Firestore → Regole → Pubblica).
- Lettore e disegno dei codici a barre: `lib/zxing.js` + `lib/zxing_full.wasm` (zxing-wasm, licenza in `lib/zxing-LICENZA.txt`).

Pubblicare una versione nuova: alzare insieme `versione.txt`, `VERSIONE` in `app.js` e i `?v=` in `index.html`/`app.js`, poi `git push`.
