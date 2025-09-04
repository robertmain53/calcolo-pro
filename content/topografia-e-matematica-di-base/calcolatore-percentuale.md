Questo strumento è progettato per **uso professionale** (periti, ingegneri, architetti) e per chi desidera **capire** oltre che ottenere un numero.  
Offre:

- **9 modalità**: percentuale di un numero, incidenza, totale da parte e %, aumento, sconto, variazione %, **differenza % (simmetrica)**, **punti percentuali**, **inversi** (pre-sconto/pre-aumento).
- **Mostra i passaggi**: formula → sostituzione → semplificazione, direttamente sotto al risultato.
- **Parsing locale** robusto: accetta **virgola o punto** per i decimali; separatore migliaia libero.
- **Cifre decimali** a scelta (0–6) e **formato di visualizzazione** (it-IT / en-US).
- **Deep-link**: puoi precompilare i campi via URL (esempio: `?mode=variation&Xi=80&Xf=100&decimals=2`).
- **Batch mode**: incolla righe/CSV e scarica i risultati.

> **Nota professionale:** dove rilevante distinguiamo **punti percentuali (pp)** da **variazione percentuale**.

---

## Modalità e formule

### Percentuale di un numero
**Formula:** `V = N × (P/100)`  
**Esempio:** 20% di 500 = 100.

### Incidenza (A è che % di B?)
**Formula:** `P = 100 × A / B` (con **B ≠ 0**).

### Totale da parte e %
**Formula:** `N = 100 × A / P` (con **P ≠ 0**).

### Aumento / Sconto
**Formule:**  
- Aumento: `R = N × (1 + P/100)`  
- Sconto: `R = N × (1 − P/100)`  
**Note:** con P = 100% lo sconto porta a 0; con P > 100% il risultato diventa negativo.

### Variazione percentuale (da Xi a Xf)
**Formula:** `Var% = ((Xf − Xi) / Xi) × 100` (con **Xi ≠ 0**).

### Differenza percentuale (simmetrica)
**Formula:** `Diff% = 100 × |a−b| / ((a+b)/2)` (con **(a+b)/2 ≠ 0**).  
**Uso:** confronto bidirezionale tra due valori (evita l’asimmetria di “quanto cresce da a a b”).

### Punti percentuali (pp)
**Formula:** `Δpp = p2 − p1`.  
**Esempio:** da 12% a 15% = **+3 pp** (non +25%).

### Inversi (pre-sconto / pre-aumento)
**Formule:**  
- Pre-sconto: `Npre = Npost / (1 − P/100)` (con **P ≠ 100%**)  
- Pre-aumento: `Npre = Npost / (1 + P/100)` (con **P ≠ −100%**)

---

## Esempi tecnici (ingegneria/architettura)

- **Variazione di resistenza**: da 25 MPa a 28 MPa → `(28−25)/25 × 100 = 12%`.  
- **Tolleranza dimensionale**: nominale 50 mm, misurato 49,6 mm → `(49,6−50)/50 × 100 = −0,8%`.  
- **Pendenza (rapporto 1:X)**: 1:12 → `% = 100/12 = 8,333…%` (conversione in gradi tramite `arctan` in pagina dedicata alla pendenza).

> Per casi normati (es. **rampe accessibili**), vedi la pagina specifica e relative **fonti normative**.

---

## FAQ (selezione)

**Differenza % vs Variazione %: che cambia?**  
- *Variazione %* usa un valore iniziale `Xi` come base: `((Xf−Xi)/Xi)×100`.  
- *Differenza % (simmetrica)* confronta due valori senza scegliere una base: `100×|a−b|/((a+b)/2)`.

**Cosa sono i punti percentuali (pp)?**  
Sono la **differenza tra percentuali**, non una percentuale della percentuale. Da 12% a 15% = **+3 pp**.

**Posso usare la virgola per i decimali?**  
Sì. L’input accetta **virgola** o **punto**; l’output si può formattare in it-IT o en-US.

**Perché alcuni input non sono ammessi (es. B=0)?**  
Per evitare divisioni per zero o casi non definiti (es. media `(a+b)/2 = 0` nella differenza simmetrica).

---

## Metodologia, qualità e revisione (E-E-A-T)

- **Formule**: derivate da algebra elementare e prassi contabile/ingegneristica.  
- **Trasparenza**: per ogni modalità il calcolatore mostra **passaggi** e **arrotondamento** scelto.  
- **Controlli qualità**: test numerici su casi tipici ed edge case (0, negativi, grandi numeri, decimali lunghi).

### Fonti (selezione)
- Microsoft Support — *Calcolare le percentuali in Excel*: principi e formule operative.  
- Dispense universitarie (metodi percentuali, proporzioni, conversioni frazione↔%↔decimale).  
- Testi di metrologia/qualità: confronto valori e *differenza percentuale simmetrica* (uso su base media).