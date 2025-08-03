
 
Il calcolatore supporta sia sistemi **monofase** (tipici degli impianti civili) sia **trifase** (standard per applicazioni industriali e commerciali), fornendo un risultato indispensabile per attività quali il **dimensionamento di conduttori**, la **scelta delle protezioni** (es. interruttori magnetotermici) e le **verifiche di carico** di un impianto secondo la normativa vigente (es. CEI 64-8).

---

### I Parametri Fondamentali del Calcolo

Per utilizzare correttamente il calcolatore e interpretare i risultati, è essenziale comprendere i tre parametri elettrici coinvolti.

* **Potenza Attiva (P), in Watt (W)**
    Rappresenta la potenza che viene effettivamente trasformata in lavoro utile (es. calore, luce, movimento meccanico). È la potenza indicata sulla targa della maggior parte degli apparecchi elettrici.

* **Tensione (V), in Volt (V)**
    È la differenza di potenziale elettrico fornita dalla rete. In Italia, i valori nominali standard sono:
    * **230 V** per i sistemi monofase (tra fase e neutro).
    * **400 V** per i sistemi trifase (tra due fasi, detta anche tensione di linea o concatenata). **Questo è il valore da inserire nel calcolatore per i sistemi trifase.**

* **Fattore di Potenza ($cos\,\phi$)**
    È un valore adimensionale (tra 0 e 1) che descrive l'efficienza con cui un carico utilizza l'energia elettrica in corrente alternata. È il rapporto tra la Potenza Attiva (P) e la Potenza Apparente (S):
    $$cos\,\phi = \frac{P}{S}$$
    * Un **$cos\,\phi = 1$** indica un carico puramente resistivo (es. stufe, lampade a incandescenza), dove la corrente è in fase con la tensione.
    * Un **$cos\,\phi < 1$** indica un carico reattivo (induttivo o capacitivo), come motori, trasformatori o lampade fluorescenti. In questi carichi, la corrente è sfasata rispetto alla tensione, e a parità di potenza attiva (lavoro utile), la corrente assorbita dalla linea è maggiore. Un basso fattore di potenza comporta maggiori perdite sulle linee e richiede cavi di sezione superiore. Per questo, la normativa spesso impone il **rifasamento** degli impianti con $cos\,\phi$ medio inferiore a 0,9.

---

### Le Formule di Calcolo Watt-Ampere

Il calcolatore applica le formule standard dell'elettrotecnica per la corrente alternata.

#### **Sistema Monofase**
La corrente `I` si calcola come il rapporto tra la potenza attiva `P` e il prodotto di tensione `V` e fattore di potenza `cos φ`.
$$I = \frac{P}{V \cdot \cos\phi}$$

#### **Sistema Trifase**
Per un sistema trifase bilanciato, la formula utilizza la tensione di linea `V` (400V in Italia) e il fattore $\sqrt{3}$ (circa 1,732).
$$I = \frac{P}{V \cdot \sqrt{3} \cdot \cos\phi}$$

#### **E per la Corrente Continua (DC)?**
Nei circuiti in corrente continua (es. fotovoltaico, automotive, elettronica), il concetto di fattore di potenza non esiste ($cos\,\phi = 1$). La formula è la più semplice:
$$I = \frac{P}{V}$$

---

### Applicazioni Pratiche e Riferimenti Normativi

Il calcolo della corrente è il punto di partenza per due attività cruciali nella progettazione di impianti sicuri e a norma.

#### **1. Dimensionamento dei Cavi Elettrici**
La corrente `I` calcolata è la **corrente di impiego ($I_B$)** che il cavo dovrà sopportare. La sezione del cavo deve essere scelta in modo che la sua **portata ($I_z$)** sia superiore alla corrente di impiego.

La portata di un cavo dipende da molti fattori (materiale, tipo di posa, temperatura ambiente, raggruppamento con altri cavi) ed è normata dalle tabelle della **Norma CEI-UNEL 35024-1**.

| Sezione cavo (mm²) | Portata Indicativa* (A) |
| :----------------- | :---------------------- |
| 1,5                | 14                      |
| 2,5                | 20                      |
| 4,0                | 25                      |
| 6,0                | 32                      |
| 10,0               | 45                      |

*_*Attenzione: La tabella è puramente indicativa (rame, posa in tubo, 30°C). Per un dimensionamento professionale fare sempre riferimento alle norme CEI 64-8 e alle tabelle CEI-UNEL._

#### **2. Scelta degli Interruttori di Protezione**
L'interruttore magnetotermico deve proteggere il cavo dal sovraccarico. La sua **corrente nominale ($I_n$)** deve essere scelta rispettando la duplice condizione imposta dalla norma **CEI 64-8**:
$$I_B \le I_n \le I_z$$
In pratica, la corrente nominale dell'interruttore deve essere maggiore della corrente assorbita dal carico, ma minore della portata del cavo che protegge.

---

### Domande Frequenti (FAQ)

**D: Perché nel calcolatore non c'è l'opzione per la Corrente Continua (DC)?**
R: Sebbene la formula per la DC ($I = P / V$) sia semplice, questo strumento è specializzato per i calcoli in corrente alternata (AC), che sono più complessi a causa del fattore di potenza e dei sistemi trifase e rappresentano la maggioranza delle applicazioni in ambito civile e industriale.

**D: Quale tensione trifase usare: 230V o 400V?**
R: Per i sistemi trifase, inserire sempre la **tensione concatenata (o di linea)**, che in Italia è **400 V**. La tensione di 230 V in un sistema trifase è quella "stellata" (tra una fase e il neutro), che non si usa in questa formula.

**D: Un ampere a quanti watt corrisponde?**
R: Ampere (corrente) e Watt (potenza) non sono direttamente convertibili. La relazione dipende dalla tensione e, in AC, dal fattore di potenza. Dire "1 Ampere = X Watt" è possibile solo se si specifica la tensione. Ad esempio, a 230V e con $cos\,\phi = 1$, 1 Ampere corrisponde a $1 A \cdot 230 V = 230 W$.