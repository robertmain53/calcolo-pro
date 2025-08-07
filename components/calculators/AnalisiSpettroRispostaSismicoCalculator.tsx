"use client";

import React, { useState } from 'react';

// Un componente di base per renderizzare formule LaTeX (puoi usare una libreria come 'react-latex-next')
const MathBlock: React.FC<{ children: string }> = ({ children }) => (
  <div className="bg-gray-800 text-white p-3 my-2 rounded-md overflow-x-auto">
    <pre><code>{children}</code></pre>
  </div>
);

// Tipi per i dati di input e i risultati
interface NTCInput {
  ag: number;
  F0: number;
  TC_star: number;
  categoriaSuolo: 'A' | 'B' | 'C' | 'D' | 'E';
  categoriaTopografica: 'T1' | 'T2' | 'T3' | 'T4';
  q: number;
  T_input: number;
}

interface NTCResult {
  SS: number;
  ST: number;
  S: number;
  TC: number;
  TB: number;
  TD: number;
  Se_T: number;
  Sd_T: number;
}

const AnalisiSpettroNTC2018: React.FC = () => {
  const [input, setInput] = useState<NTCInput>({
    ag: 0.25,
    F0: 2.5,
    TC_star: 0.35,
    categoriaSuolo: 'C',
    categoriaTopografica: 'T1',
    q: 3.0,
    T_input: 0.5,
  });

  const [result, setResult] = useState<NTCResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: name === 'categoriaSuolo' || name === 'categoriaTopografica' ? value : parseFloat(value)
    }));
  };

  const calculateSpectrum = () => {
    const { ag, F0, TC_star, categoriaSuolo, categoriaTopografica, q, T_input } = input;

    // § 3.2.3.1 - Coefficienti di amplificazione stratigrafica (SS)
    const SS_map = { 'A': 1.0, 'B': 1.36, 'C': 1.54, 'D': 1.89, 'E': 2.42 };
    const Cc_map = { 'A': 1.0, 'B': 1.15, 'C': 1.22, 'D': 1.48, 'E': 1.46 };
    const SS = SS_map[categoriaSuolo];
    const Cc = Cc_map[categoriaSuolo];

    // § 3.2.3.1 - Coefficienti di amplificazione topografica (ST)
    const ST_map = { 'T1': 1.0, 'T2': 1.2, 'T3': 1.2, 'T4': 1.4 };
    const ST = ST_map[categoriaTopografica];

    const S = SS * ST;

    // § 3.2.3.2 - Calcolo dei periodi caratteristici
    const TC = Cc * TC_star;
    const TB = TC / 3.0;
    const TD = (2.0 / F0 + 0.05) * (TC / 0.15); // Formula da Circolare 2019, più stabile

    let Se_T = 0;
    const eta = 1.0; // Fattore per smorzamento al 5%

    // § 3.2.3.2.1 - Formule dello spettro elastico orizzontale
    if (T_input >= 0 && T_input < TB) {
      Se_T = ag * S * (1 + (F0 * eta - 1) * (T_input / TB));
    } else if (T_input >= TB && T_input <= TC) {
      Se_T = ag * S * F0 * eta;
    } else if (T_input > TC && T_input <= TD) {
      Se_T = ag * S * F0 * eta * (TC / T_input);
    } else if (T_input > TD) {
      Se_T = ag * S * F0 * eta * (TC * TD) / (T_input * T_input);
    }

    // § 3.2.3.5 - Spettro di progetto per le analisi lineari
    let Sd_T = Se_T / q;
    // Condizione al § 7.3.4
    if (Sd_T < 0.20 * ag) {
      Sd_T = 0.20 * ag;
    }

    setResult({ SS, ST, S, TC, TB, TD, Se_T, Sd_T });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg font-sans">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Calcolatore Spettro di Risposta NTC 2018</h1>
      <p className="text-gray-600 mb-6">Determina l'azione sismica elastica e di progetto per un dato periodo.</p>

      {/* SEZIONE INPUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Parametri di Pericolosità */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-3">1. Parametri di Pericolosità</h3>
          <div>
            <label htmlFor="ag" className="block text-sm font-medium text-gray-700">Accelerazione al suolo $a_g$ [g]</label>
            <input type="number" name="ag" value={input.ag} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" step="0.01" />
          </div>
          <div className="mt-4">
            <label htmlFor="F0" className="block text-sm font-medium text-gray-700">Fattore di amplificazione $F_0$</label>
            <input type="number" name="F0" value={input.F0} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" step="0.1" />
          </div>
          <div className="mt-4">
            <label htmlFor="TC_star" className="block text-sm font-medium text-gray-700">Periodo $T_C^*$ [s]</label>
            <input type="number" name="TC_star" value={input.TC_star} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" step="0.01" />
          </div>
        </div>

        {/* Parametri di Sito */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-3">2. Condizioni di Sito</h3>
          <div>
            <label htmlFor="categoriaSuolo" className="block text-sm font-medium text-gray-700">Categoria Sottosuolo ($S_S$, $C_C$)</label>
            <select name="categoriaSuolo" value={input.categoriaSuolo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="A">A - Roccia</option>
              <option value="B">B - Terreni rigidi</option>
              <option value="C">C - Terreni mediamente compatti</option>
              <option value="D">D - Terreni soffici</option>
              <option value="E">E - Terreni molto soffici</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="categoriaTopografica" className="block text-sm font-medium text-gray-700">Categoria Topografica ($S_T$)</label>
            <select name="categoriaTopografica" value={input.categoriaTopografica} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="T1">T1 - Pianura ($\le 15^\circ$)</option>
              <option value="T2">T2 - Crinale ($&gt; 15^\circ$)</option>
              <option value="T3">T3 - Pendio ($15^\circ-30^\circ$)</option>
              <option value="T4">T4 - Pendio ($&gt; 30^\circ$)</option>
            </select>
          </div>
        </div>

        {/* Parametri Strutturali */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-3">3. Parametri Strutturali</h3>
          <div>
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Fattore di comportamento $q$</label>
            <input type="number" name="q" value={input.q} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" step="0.1" />
          </div>
          <div className="mt-4">
            <label htmlFor="T_input" className="block text-sm font-medium text-gray-700">Periodo della struttura $T$ [s]</label>
            <input type="number" name="T_input" value={input.T_input} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" step="0.01" />
          </div>
        </div>
      </div>

      <button onClick={calculateSpectrum} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
        Calcola Spettro di Risposta
      </button>

      {/* SEZIONE RISULTATI */}
      {result && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Risultati del Calcolo per T = {input.T_input} s</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Spettro Elastico $S_e(T)$</p>
              <p className="text-2xl font-bold text-blue-600">{result.Se_T.toFixed(4)} g</p>
            </div>
            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Spettro di Progetto $S_d(T)$</p>
              <p className="text-2xl font-bold text-green-600">{result.Sd_T.toFixed(4)} g</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Valori Intermedi Calcolati:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm text-center">
              <p>SS: <strong>{result.SS.toFixed(2)}</strong></p>
              <p>ST: <strong>{result.ST.toFixed(2)}</strong></p>
              <p>TC: <strong>{result.TC.toFixed(3)}s</strong></p>
              <p>TB: <strong>{result.TB.toFixed(3)}s</strong></p>
              <p>TD: <strong>{result.TD.toFixed(3)}s</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* SEZIONE DOCUMENTAZIONE */}
      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Documentazione: Parametri e Formule (NTC 2018, Cap. 3)</h2>
        <p className="mb-4">Questa sezione riporta i parametri e le formule utilizzate dal calcolatore, in accordo con le Norme Tecniche per le Costruzioni 2018, per garantire la massima trasparenza.</p>
        
        <h3 className="text-xl font-semibold mb-2">Parametri di Input</h3>
        <ul>
          <li className="mb-1"><strong>$a_g$</strong>: Accelerazione orizzontale massima al sito di riferimento su suolo tipo A.</li>
          <li className="mb-1"><strong>$F_0$</strong>: Valore massimo del fattore di amplificazione dello spettro.</li>
          <li className="mb-1"><strong>$T_C^*$</strong>: Periodo di inizio del tratto a velocità costante dello spettro di risposta.</li>
          <li className="mb-1"><strong>Categoria Sottosuolo</strong>: Definisce le proprietà meccaniche del terreno e determina i coefficienti $S_S$ e $C_C$.</li>
          <li className="mb-1"><strong>Categoria Topografica</strong>: Definisce l'effetto morfologico del sito e determina il coefficiente $S_T$.</li>
          <li className="mb-1"><strong>$q$</strong>: Fattore di comportamento della struttura, che tiene conto della sua duttilità e capacità dissipative.</li>
          <li className="mb-1"><strong>$T$</strong>: Primo periodo proprio di vibrazione della struttura.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Formule di Calcolo dello Spettro Elastico Orizzontale $S_e(T)$</h3>
        <p>Per $0 \le T \le T_B$:</p>
        <MathBlock>Se(T) = ag · S · [1 + (T/TB) · (η · F0 - 1)]</MathBlock>

        <p>Per $T_B \le T \le T_C$:</p>
        <MathBlock>Se(T) = ag · S · η · F0</MathBlock>

        <p>Per $T_C \le T \le T_D$:</p>
        <MathBlock>Se(T) = ag · S · η · F0 · (TC / T)</MathBlock>

        <p>Per $T &gt; T_D$:</p>
        <MathBlock>Se(T) = ag · S · η · F0 · (TC · TD / T²)</MathBlock>

        <p>Dove:</p>
        <ul className="list-disc list-inside ml-4">
          <li>$S = S_S \cdot S_T$ è il coefficiente di sito.</li>
          <li>$\eta$ è il fattore di smorzamento, pari a 1 per smorzamento viscoso convenzionale del 5%.</li>
          <li>$T_B, T_C, T_D$ sono i periodi caratteristici dello spettro.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Formula dello Spettro di Progetto $S_d(T)$</h3>
        <p>Lo spettro di progetto si ottiene riducendo lo spettro elastico tramite il fattore di comportamento $q$:</p>
        <MathBlock>Sd(T) = Se(T) / q</MathBlock>
        <p>Con la condizione che $S_d(T) \ge 0.20 \cdot a_g$.</p>
      </div>

      <div className="mt-8 text-xs text-gray-500 text-center border-t pt-4">
        <strong>Disclaimer:</strong> Questo calcolatore è uno strumento didattico e di supporto alla pre-progettazione. I risultati devono essere verificati con software certificati e da un professionista abilitato. I valori dei coefficienti di sito ($S_S$, $C_C$) sono indicativi e devono essere verificati secondo le tabelle 3.2.II e 3.2.III delle NTC 2018 in base ai parametri specifici del sito ($a_g, F_0$).
      </div>
    </div>
  );
};

export default AnalisiSpettroNTC2018;
