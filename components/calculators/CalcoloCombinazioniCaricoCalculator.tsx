'use client';

import React from 'react';
import CalcoloComb from './CalcoloComb';
import MathBlock from '../ui/MathBlock';
import { InlineMath } from 'react-katex';

const PaginaHubCombinazioniCarico: React.FC = () => {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <article className="prose max-w-none lg:prose-lg bg-white p-6 rounded-lg shadow-lg">
        <header className="text-center border-b pb-4 mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Hub sulle Combinazioni di Carico
          </h1>
          <p className="text-xl text-gray-600">
            Una guida pratica e teorica alle combinazioni di carico secondo le
            NTC 2018 per professionisti del settore.
          </p>
        </header>

        <section id="introduzione">
          <h2 className="text-2xl font-bold">Introduzione e Norme di Riferimento</h2>
          <p>
            La corretta definizione delle combinazioni di carico è un passo
            cruciale nella progettazione e verifica di qualsiasi opera civile.
            Essa garantisce che la struttura sia sicura e funzionale in tutti
            gli scenari di carico plausibili durante la sua vita utile. Le
            metodologie e i coefficienti qui presentati si basano sul metodo
            semiprobabilistico agli stati limite.
          </p>
          <p>Le principali normative di riferimento sono:</p>
          <ul>
            <li>
              <strong>D.M. 17 gennaio 2018</strong> - Norme Tecniche per le
              Costruzioni (NTC 2018).
            </li>
            <li>
              <strong>Circolare n. 7 del 21 gennaio 2019</strong> - Istruzioni
              per l'applicazione delle NTC 2018.
            </li>
            <li>
              <strong>Eurocodice 0 (EN 1990)</strong> - Criteri generali di
              progettazione strutturale.
            </li>
          </ul>
        </section>

        <section id="fondamenti">
          <h2 className="text-2xl font-bold">Fondamenti Teorici: SLU e SLE</h2>
          <p>Le verifiche strutturali si eseguono rispetto a due tipi di stati limite:</p>
          <ul>
            <li>
              <strong>Stati Limite Ultimi (SLU):</strong> Riguardano la
              sicurezza della struttura e la salvaguardia della vita umana. Il
              loro superamento implica un collasso parziale o totale (es.
              perdita di equilibrio, rottura di elementi). Le azioni sono
              amplificate tramite coefficienti di sicurezza parziali <InlineMath math="\gamma" />.
            </li>
            <li>
              <strong>Stati Limite di Esercizio (SLE):</strong> Riguardano la
              funzionalità e il comfort. Il loro superamento può causare
              deformazioni, vibrazioni o fessurazioni eccessive che, pur non
              compromettendo la sicurezza, rendono l'opera inadatta all'uso. Le
              azioni non sono amplificate, ma combinate secondo la loro
              probabilità di accadimento simultaneo tramite i coefficienti
              <InlineMath math="\psi" />.
            </li>
          </ul>
        </section>

        <section id="formule">
          <h2 className="text-2xl font-bold">Le Formule di Combinazione (§ 2.5.3 NTC 2018)</h2>

          <h3 className="text-xl font-semibold">Stati Limite Ultimi (SLU)</h3>
          <p>
            <strong>Combinazione Fondamentale:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} \\gamma_{G,j} G_{k,j} + \\gamma_P P + \\gamma_{Q,1} Q_{k,1} + \\sum_{i > 1} \\gamma_{Q,i} \\psi_{0,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <ul>
            <li>E_d: Valore di progetto dell'effetto delle azioni.</li>
            <li>
            <InlineMath math="\gamma_G" />: Coefficiente parziale per i carichi
              permanenti (
            <InlineMath math="\gamma_{G1}=1.3" />, <InlineMath math="\gamma_{G2}=1.5" />).
            </li>
            <li><InlineMath math="G_k"/>: Valore caratteristico dei carichi permanenti.</li>
            <li>
             <InlineMath math="\gamma_Q" />: Coefficiente parziale per i carichi variabili
              (<InlineMath math="\gamma_Q=1.5" />).
            </li>
            <li>
              <InlineMath math="Q_{k,1}"/>: Valore caratteristico dell'azione variabile
              <strong>di base</strong>.
            </li>
            <li>
              <InlineMath math="Q_{k,i}" />: Valore caratteristico delle altre azioni variabili
              <strong>di accompagnamento</strong>.
            </li>
            <li>
              <InlineMath math="\psi_0 " />: Coefficiente di combinazione, per il valore raro delle
              azioni variabili.
            </li>
          </ul>

          <p>
            <strong>Combinazione Sismica (§ 7.3.5 NTC 2018):</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = E_{Ed} + \\sum_{j \\ge 1} G_{k,j} + P + \\sum_{i \\ge 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <ul>
            <li><InlineMath math="E_{Ed}2" />:: Valore di progetto dell'azione sismica.</li>
            <li>
              <InlineMath math="\psi_2" />: Coefficiente di combinazione, per il valore
              <strong>quasi-permanente</strong> delle azioni variabili.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">Stati Limite di Esercizio (SLE)</h3>
          <p>
            <strong>Combinazione Rara:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + Q_{k,1} + \\sum_{i > 1} \\psi_{0,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <p>
            <strong>Combinazione Frequente:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + \\psi_{1,1} Q_{k,1} + \\sum_{i > 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <p>
            <strong>Combinazione Quasi-Permanente:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + \\sum_{i \\ge 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
        </section>

        <hr className="my-8" />

        {/* Inserimento del calcolatore importato */}
        <CalcoloComb />

        <hr className="my-8" />

        <section id="guida-uso">
          <h2 className="text-2xl font-bold">Guida all'Utilizzo del Calcolatore</h2>
          <p>Per utilizzare lo strumento, seguire questi semplici passaggi:</p>
          <ol>
            <li>
              <strong>Inserire i valori caratteristici</strong> dei carichi nei
              rispettivi campi. I valori non applicabili possono essere
              lasciati a zero.
            </li>
            <li>
              Distinguere tra carichi <strong>permanenti strutturali (G1)</strong>,
              come il peso proprio, e <strong>permanenti non strutturali (G2)</strong>,
              come massetti e impianti.
            </li>
            <li>
              Per il carico variabile generico (Q), selezionare la{' '}
              <strong>Categoria d'uso</strong> corrispondente per applicare i
              corretti coefficienti <InlineMath math="\psi" />.
            </li>
            <li>
              Per il carico da Neve, specificare se l'altitudine del sito è{' '}
              <strong>inferiore o superiore a 1000 m s.l.m.</strong>
            </li>
            <li>
              Premere il pulsante <strong>"Calcola"</strong>. Lo strumento
              calcolerà automaticamente il valore massimo per le combinazioni
              SLU e SLE che lo richiedono (es. Fondamentale, Rara, Frequente) e
              mostrerà tutti i risultati.
            </li>
          </ol>
        </section>

        <section id="limiti">
          <h2 className="text-2xl font-bold">Limiti e Note Importanti</h2>
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Attenzione</p>
            <p>
              Questo strumento è stato creato per scopi didattici e per fornire
              una rapida stima. Non deve essere usato come sostituto di un'analisi
              strutturale completa eseguita con software certificato.
            </p>
          </div>
          <p>Si prega di notare i seguenti limiti:</p>
          <ul>
            <li>
              Il calcolatore <strong>non determina i carichi caratteristici</strong>{' '}
              (es. pressione del vento, carico neve, azione sismica). Questi
              valori devono essere calcolati separatamente secondo norma e
              inseriti come input.
            </li>
            <li>
              Vengono considerate solo le combinazioni fondamentali. Non sono
              incluse combinazioni per situazioni eccezionali o specifiche (es.
              urti, esplosioni).
            </li>
            <li>
              L'applicazione dei coefficienti per i carichi permanenti (<InlineMath math="\gamma_G" />)
              è semplificata e non distingue tra contributi favorevoli o
              sfavorevoli alla stabilità di singole parti della struttura.
            </li>
            <li>
              Il risultato è l'effetto dell'azione combinata (es. una forza o un
              momento), non la verifica di un elemento.
            </li>
          </ul>
          <p className="font-semibold text-center mt-4">
            L'utilizzo di questo strumento è a totale discrezione e
            responsabilità dell'utente. I risultati devono sempre essere
            validati da un ingegnere professionista.
          </p>
        </section>
      </article>
    </main>
  );
};

export default PaginaHubCombinazioniCarico;
