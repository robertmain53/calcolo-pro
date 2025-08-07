

# L'Analisi a Spettro di Risposta Sismico (NTC 2018)

L'analisi a spettro di risposta è una delle metodologie fondamentali e più utilizzate nell'ingegneria sismica italiana per la progettazione e la verifica delle costruzioni. Introdotta e standardizzata dalle **Norme Tecniche per le Costruzioni (D.M. 17 gennaio 2018)**, permette di valutare gli effetti massimi di un terremoto su una struttura in modo efficiente e affidabile, sostituendo analisi dinamiche nel tempo più complesse per la maggior parte dei casi progettuali.

Questa pagina offre uno strumento di calcolo interattivo e una guida tecnica dettagliata per comprendere, utilizzare e applicare correttamente questa metodologia.


## 1. Come si Utilizza il Calcolatore

Questo strumento è stato progettato per essere intuitivo e trasparente. Per determinare l'accelerazione spettrale di progetto $S_d(T)$, segui questi passaggi:

1.  **Inserisci i Parametri di Pericolosità (Sez. 1)**:
    * **$a_g$, $F_0$, $T_C^*$**: Questi tre parametri definiscono la pericolosità sismica di base del sito per un dato **Stato Limite** (e quindi un dato periodo di ritorno $T_R$). Si ottengono da un'analisi di pericolosità sismica, tipicamente attraverso software dedicati che interrogano le mappe di pericolosità nazionale fornite dall'INGV, in funzione delle coordinate geografiche del sito e della vita nominale della costruzione.

2.  **Definisci le Condizioni di Sito (Sez. 2)**:
    * **Categoria Sottosuolo**: Seleziona la categoria del terreno di fondazione (da A-roccia a E-terreni molto soffici) come definita al § 3.2.2 delle NTC 2018. Questa scelta determina il coefficiente di amplificazione stratigrafica $S_S$ e il coefficiente $C_C$ che modifica il periodo $T_C^*$.
    * **Categoria Topografica**: Seleziona la categoria che descrive la morfologia del sito. Per pendenze o rilievi accentuati, la norma prescrive un'amplificazione $S_T$.

3.  **Specifica i Parametri Strutturali (Sez. 3)**:
    * **Fattore di comportamento $q$**: È il parametro cruciale che quantifica la capacità della struttura di dissipare energia attraverso un comportamento duttile (non-lineare). Il suo valore, definito nel Cap. 7 delle NTC 2018, dipende dalla tipologia strutturale, dalla classe di duttilità e dalla regolarità.
    * **Periodo della struttura $T$**: Inserisci il primo periodo proprio di vibrazione della struttura (in secondi), ottenuto da un'analisi modale eseguita con un software di calcolo strutturale.

4.  **Calcola e Analizza**:
    * Clicca su "Calcola" per ottenere l'accelerazione spettrale elastica **$S_e(T)$** e quella di progetto **$S_d(T)$**. Lo strumento mostra anche tutti i valori intermedi ($S_S, S_T, T_C, T_B, T_D$) per una completa verifica del processo.

---

## 2. Riferimenti Normativi e Formule di Calcolo

La metodologia è definita principalmente nel **Capitolo 3 delle NTC 2018 (D.M. 17/01/2018)** e nella relativa **Circolare applicativa n.7 del 21/01/2019**. Di seguito sono riportate le formule implementate nel calcolatore.

### Parametri di Amplificazione di Sito (§ 3.2.3.1)

L'azione sismica di base, definita per un suolo rigido e pianeggiante (Cat. A, T1), viene modificata per tenere conto delle condizioni locali reali.

* **Amplificazione Stratigrafica ($S_S$)**: Dipende dalla categoria di sottosuolo.
* **Amplificazione Topografica ($S_T$)**: Dipende dalla pendenza e dalla posizione.
* **Coefficiente di Sito Totale ($S$)**: $S = S_S \cdot S_T$

### Spettro Elastico in Accelerazione $S_e(T)$ (§ 3.2.3.2)

Lo spettro elastico rappresenta la massima accelerazione di un oscillatore con smorzamento al 5%, in funzione del suo periodo T. Le sue ordinate sono definite dalle seguenti espressioni:

* **Per $0 \le T \le T_B$ (ramo a variazione lineare):**
    $S_e(T) = a_g \cdot S \cdot \left[1 + \frac{T}{T_B} \cdot (\eta \cdot F_0 - 1)\right]$

* **Per $T_B \le T \le T_C$ (ramo ad accelerazione costante):**
    $S_e(T) = a_g \cdot S \cdot \eta \cdot F_0$

* **Per $T_C \le T \le T_D$ (ramo a velocità costante):**
    $S_e(T) = a_g \cdot S \cdot \eta \cdot F_0 \cdot \frac{T_C}{T}$

* **Per $T > T_D$ (ramo a spostamento costante):**
    $S_e(T) = a_g \cdot S \cdot \eta \cdot F_0 \cdot \frac{T_C \cdot T_D}{T^2}$

Dove $\eta=1$ per smorzamento viscoso convenzionale al 5%. I periodi caratteristici $T_B, T_C, T_D$ sono calcolati a partire da $T_C^*$ e dai coefficienti di sito.

### Spettro di Progetto $S_d(T)$ (§ 3.2.3.5)

Per tenere conto delle capacità dissipative post-elastiche della struttura, lo spettro elastico viene ridotto tramite il fattore di comportamento $q$.

* **Formula di riduzione:**
    $S_d(T) = \frac{S_e(T)}{q}$

* **Valore minimo (§ 7.3.4):**
    La norma impone un limite inferiore per garantire un minimo di resistenza.
    $S_d(T) \ge 0.20 \cdot a_g$

---

## 3. Utilizzi e Applicazioni Pratiche

L'analisi a spettro di risposta è il fulcro dell'**analisi sismica lineare-dinamica (o analisi modale)**, la procedura più comune per la progettazione di nuove costruzioni. Il flusso di lavoro tipico è:

1.  **Modellazione della Struttura**: Creazione di un modello agli elementi finiti della costruzione con un software di calcolo.
2.  **Analisi Modale**: Il software calcola le proprietà dinamiche della struttura:
    * **Periodi Propri ($T_i$)**: I periodi naturali di vibrazione per ciascun modo.
    * **Forme Modali ($\phi_i$)**: Le configurazioni di deformata per ciascun modo.
    * **Masse Partecipanti**: La percentuale di massa totale della struttura che si attiva per ciascun modo.
3.  **Applicazione dello Spettro**: Per ciascun modo di vibrazione significativo, si entra nello spettro di progetto $S_d(T)$ con il periodo corrispondente ($T_i$) e si ottiene l'accelerazione modale $S_d(T_i)$.
4.  **Calcolo degli Effetti**: Per ogni modo, si calcolano gli effetti massimi (forze, spostamenti, sollecitazioni).
5.  **Combinazione Modale**: Poiché è improbabile che i massimi di ogni modo si verifichino contemporaneamente, i loro effetti vengono combinati statisticamente. La regola più utilizzata è la **CQC (Complete Quadratic Combination)**.
6.  **Verifiche Strutturali**: Le sollecitazioni risultanti dalla combinazione modale vengono usate per le verifiche di resistenza e stabilità degli elementi strutturali.

---

## 4. Domande Frequenti (FAQ)

> **D: Qual è la differenza tra spettro elastico e di progetto?**
> **R:** Lo **spettro elastico** descrive la risposta di una struttura che non subisce danni (rimane in campo elastico). Lo **spettro di progetto** è derivato da quello elastico riducendolo tramite il **fattore `q`**. Rappresenta la domanda di resistenza per una struttura che si progetta affinché possa subire danni controllati (duttilità), dissipando energia e riducendo così le forze sismiche.

> **D: Perché la parte centrale dello spettro è piatta?**
> **R:** Il plateau tra $T_B$ e $T_C$ rappresenta il campo dei periodi in cui l'amplificazione dinamica è massima e l'accelerazione di risposta è costante. Fisicamente, corrisponde alla condizione di massima risonanza tra il contenuto in frequenza del sisma e le strutture con periodi in quell'intervallo.

> **D: Come ottengo i valori di $a_g$, $F_0$ e $T_C^*$ per il mio sito?**
> **R:** Questi parametri non sono scelti arbitrariamente ma sono il risultato di un'analisi di pericolosità sismica di base. Possono essere ottenuti tramite software specifici, servizi online basati sui dati INGV, o consultando l'Allegato A e B delle NTC 2018, inserendo le coordinate geografiche del sito, la vita nominale della costruzione ($V_N$) e la sua classe d'uso ($C_U$) per determinare il periodo di ritorno $T_R$ di riferimento per lo Stato Limite considerato.

> **D: Devo considerare anche lo spettro verticale?**
> **R:** Sì. Le NTC 2018 (§ 3.2.3.3) richiedono di considerare la componente verticale dell'azione sismica per specifiche tipologie strutturali, come travi di grande luce (>20m), elementi precompressi, strutture a mensola e strutture spingenti. Lo spettro verticale ha una forma diversa ed è definito da parametri propri.

> **D: Questa analisi è sempre sufficiente?**
> **R:** No. L'analisi lineare a spettro di risposta si basa su ipotesi di comportamento lineare e disaccoppiamento modale. Per strutture molto complesse, irregolari, o per valutazioni di vulnerabilità sismica avanzate su edifici esistenti, le NTC 2018 prevedono e incoraggiano l'uso di **analisi non-lineari**, come l'analisi statica non-lineare (pushover) o l'analisi dinamica non-lineare, che offrono una rappresentazione più accurata del reale comportamento post-elastico.