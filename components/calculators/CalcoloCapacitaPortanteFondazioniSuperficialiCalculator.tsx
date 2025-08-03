"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables, ChartConfiguration, ChartItem } from 'chart.js';

// Registra tutti i componenti di Chart.js (controller, elementi, scale, plugin)
Chart.register(...registerables);

// Interfacce TypeScript per una migliore gestione dei tipi
interface InputData {
  coesioneEfficace: number;
  angoloAttritoEfficace: number;
  pesoUnitaVolume: number;
  larghezzaFondazione: number;
  lunghezzaFondazione: number;
  profonditaPianoPosa: number;
  caricoVerticale: number;
  caricoOrizzontale: number;
  gammaR: number;
}

interface ResultData {
  q_ult: number;
  q_d: number;
  sigma_app: number;
}

// Dati di esempio per il pulsante "Carica Esempio"
const exampleData: InputData = {
  coesioneEfficace: 5,
  angoloAttritoEfficace: 28,
  pesoUnitaVolume: 18,
  larghezzaFondazione: 2,
  lunghezzaFondazione: 3,
  profonditaPianoPosa: 1.5,
  caricoVerticale: 1000,
  caricoOrizzontale: 50,
  gammaR: 2.3,
};

const CapacitaPortanteApp: React.FC = () => {
  // Stato per gli input del calcolatore
  const [inputs, setInputs] = useState<InputData>(exampleData);
  // Stato per i risultati del calcolo
  const [result, setResult] = useState<ResultData | null>(null);
  // Stato per la gestione della scheda attiva nella guida
  const [activeTab, setActiveTab] = useState<string>('metodologia');

  // Riferimenti per il canvas del grafico e l'istanza di Chart.js
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Gestore per l'aggiornamento dei campi di input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  // Funzione principale per il calcolo della capacità portante
  const calculateCapacity = () => {
    const {
      coesioneEfficace: c,
      angoloAttritoEfficace: phi_deg,
      pesoUnitaVolume: gamma,
      larghezzaFondazione: B,
      lunghezzaFondazione: L,
      profonditaPianoPosa: Df,
      caricoVerticale: V,
      caricoOrizzontale: H,
      gammaR
    } = inputs;
    
    // Validazione base
    if (B <= 0 || L <= 0 || gammaR <= 0) {
        alert("Larghezza, Lunghezza e Coefficiente di sicurezza devono essere maggiori di zero.");
        return;
    }

    const phi_rad = (phi_deg * Math.PI) / 180;
    const q_prime = gamma * Df;

    const Nq = Math.exp(Math.PI * Math.tan(phi_rad)) * Math.pow(Math.tan(Math.PI / 4 + phi_rad / 2), 2);
    const Nc = phi_deg > 0 ? (Nq - 1) / Math.tan(phi_rad) : 5.14;
    const Ngamma = 2 * (Nq - 1) * Math.tan(phi_rad);

    const B_L_ratio = B / L;
    const sq = 1 + B_L_ratio * Math.sin(phi_rad);
    const sgamma = 1 - 0.3 * B_L_ratio;
    const sc = phi_deg > 0 ? (sq * Nq - 1) / (Nq - 1) : 1 + 0.2 * B_L_ratio;

    const k = Df / B;
    const dq = 1 + 2 * Math.tan(phi_rad) * Math.pow(1 - Math.sin(phi_rad), 2) * k;
    const dgamma = 1;
    const dc = phi_deg > 0 ? dq - (1 - dq) / (Nc * Math.tan(phi_rad)) : 1 + 0.4 * k;

    const areaEffettiva = B * L;
    const V_adesione = areaEffettiva * c / (phi_deg > 0 ? Math.tan(phi_rad) : 1);
    const m = (2 + B_L_ratio) / (1 + B_L_ratio);
    const V_tot_resistente = V + V_adesione;

    let iq = 1, ic = 1, igamma = 1;
    if (V_tot_resistente > 0 && H > 0) {
        const ratio = H / V_tot_resistente;
        if (ratio < 1) {
            iq = Math.pow(1 - ratio, m);
            igamma = Math.pow(1 - ratio, m + 1);
            ic = phi_deg > 0 ? iq - (1 - iq) / (Nc * Math.tan(phi_rad)) : 0.5 * (1 + Math.sqrt(1 - H / (areaEffettiva * c)));
        } else {
            iq = ic = igamma = 0; // Scivolamento
        }
    }

    const termine_coesione = c * Nc * sc * dc * ic;
    const termine_sovraccarico = q_prime * Nq * sq * dq * iq;
    const termine_peso = 0.5 * gamma * B * Ngamma * sgamma * dgamma * igamma;

    const q_ult = termine_coesione + termine_sovraccarico + termine_peso;
    const q_d = q_ult / gammaR;
    const sigma_app = V / areaEffettiva;

    setResult({ q_ult, q_d, sigma_app });
  };

  // useEffect per creare e aggiornare il grafico quando i risultati cambiano
  useEffect(() => {
    if (!result || !chartContainer.current) return;

    const chartData = {
        labels: ['Verifica di Sicurezza'],
        datasets: [
            {
                label: 'Pressione Applicata (σ_app)',
                data: [result.sigma_app], // CORREZIONE: Passato come numero
                backgroundColor: '#6366f1',
                borderColor: '#4f46e5',
                borderWidth: 1
            },
            {
                label: 'Capacità di Progetto (q_d)',
                data: [result.q_d], // CORREZIONE: Passato come numero
                backgroundColor: '#a5b4fc',
                borderColor: '#818cf8',
                borderWidth: 1
            }
        ]
    };

    if (chartInstance.current) {
        chartInstance.current.data = chartData;
        chartInstance.current.update();
    } else {
        const ctx = chartContainer.current.getContext('2d') as ChartItem;
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Confronto Pressione Applicata vs Capacità di Progetto' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${Number(context.raw).toFixed(2)} kPa`
                        }
                    }
                },
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        title: { display: true, text: 'Pressione [kPa]' },
                        ticks: {
                            callback: function(value) {
                                return Number(value).toFixed(2);
                            }
                        }
                    } 
                }
            }
        });
    }
     // Cleanup function per distruggere il grafico quando il componente viene smontato
    return () => {
        chartInstance.current?.destroy();
        chartInstance.current = null;
    };
  }, [result]);

  const verificationStatus = result ? (result.sigma_app <= result.q_d) : null;

  // Componente per le schede della guida
  const TabButton: React.FC<{ id: string; label: string }> = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm transition-colors ${activeTab === id ? 'border-indigo-500 text-indigo-600 font-semibold' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Gli stili globali o complessi possono essere inseriti qui */}
      <style>{`
        body { font-family: 'Inter', sans-serif; background-color: #F9F9F7; }
        .chart-container { position: relative; width: 100%; height: 280px; max-height: 300px; }
      `}</style>
      
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Calcolatore Capacità Portante</h1>
          <p className="mt-2 text-lg text-gray-600">Strumento interattivo per fondazioni superficiali secondo NTC 2018 / EC7</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Colonna Sinistra: Calcolatore */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Parametri di Calcolo</h2>
            <div className="space-y-6">
              {/* Sezione Parametri Geotecnici */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Parametri Geotecnici</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="coesioneEfficace" className="text-sm font-medium">Coesione efficace (c') [kPa]</label>
                    <input type="number" id="coesioneEfficace" value={inputs.coesioneEfficace} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="angoloAttritoEfficace" className="text-sm font-medium">Angolo di attrito (φ') [°]</label>
                    <input type="number" id="angoloAttritoEfficace" value={inputs.angoloAttritoEfficace} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="pesoUnitaVolume" className="text-sm font-medium">Peso unità di volume (γ) [kN/m³]</label>
                    <input type="number" id="pesoUnitaVolume" value={inputs.pesoUnitaVolume} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                  </div>
                </div>
              </div>
              {/* Sezione Geometria Fondazione */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Geometria Fondazione</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="larghezzaFondazione" className="text-sm font-medium">Larghezza (B) [m]</label>
                        <input type="number" id="larghezzaFondazione" value={inputs.larghezzaFondazione} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="lunghezzaFondazione" className="text-sm font-medium">Lunghezza (L) [m]</label>
                        <input type="number" id="lunghezzaFondazione" value={inputs.lunghezzaFondazione} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="profonditaPianoPosa" className="text-sm font-medium">Profondità piano posa (D) [m]</label>
                        <input type="number" id="profonditaPianoPosa" value={inputs.profonditaPianoPosa} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
              </div>
              {/* Sezione Carichi e Fattori */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Carichi e Fattori</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="caricoVerticale" className="text-sm font-medium">Carico verticale (V) [kN]</label>
                        <input type="number" id="caricoVerticale" value={inputs.caricoVerticale} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="caricoOrizzontale" className="text-sm font-medium">Carico orizzontale (H) [kN]</label>
                        <input type="number" id="caricoOrizzontale" value={inputs.caricoOrizzontale} onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="gammaR" className="text-sm font-medium">Coeff. sicurezza (γR)</label>
                        <input type="number" id="gammaR" value={inputs.gammaR} step="0.1" onChange={handleInputChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
              </div>
            </div>
            <button onClick={calculateCapacity} className="w-full mt-8 bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Calcola</button>
            
            {/* Sezione Risultati */}
            {result && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold">Risultati e Verifica</h3>
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="flex justify-between"><span>Carico limite (q<sub>ult</sub>):</span> <strong className="font-mono">{result.q_ult.toFixed(2)} kPa</strong></p>
                  <p className="flex justify-between"><span>Capacità di progetto (q<sub>d</sub>):</span> <strong className="font-mono">{result.q_d.toFixed(2)} kPa</strong></p>
                  <p className="flex justify-between"><span>Pressione applicata (σ<sub>app</sub>):</span> <strong className="font-mono">{result.sigma_app.toFixed(2)} kPa</strong></p>
                </div>
                <div className={`p-3 rounded-lg text-center font-bold ${verificationStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {verificationStatus ? 'VERIFICATO' : 'NON VERIFICATO'}
                </div>
                <div className="chart-container">
                  <canvas ref={chartContainer}></canvas>
                </div>
              </div>
            )}
          </div>

          {/* Colonna Destra: Guida */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <TabButton id="metodologia" label="Metodologia" />
                <TabButton id="esempio" label="Esempio Pratico" />
                <TabButton id="faq" label="FAQ" />
              </nav>
            </div>
            <div className="mt-6 text-gray-700 space-y-4 text-sm leading-relaxed">
              {activeTab === 'metodologia' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Introduzione alla Metodologia</h3>
                  <p>Questo calcolatore determina la <strong>capacità portante</strong> di una fondazione superficiale, ovvero la massima pressione che il terreno può sopportare prima di raggiungere uno stato di rottura (collasso).</p>
                  <p>Il calcolo si basa sulla <strong>formula generale di Brinch-Hansen (1970)</strong>, una delle metodologie più complete e raccomandate dall'<strong>Eurocodice 7 (EC7)</strong> e dalle <strong>Norme Tecniche per le Costruzioni (NTC 2018)</strong>.</p>
                  <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                        <li>Proprietà del suolo (coesione c' e angolo di attrito φ').</li>
                        <li>Geometria della fondazione (forma e profondità).</li>
                        <li>Inclinazione del carico applicato.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'esempio' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Esempio di Calcolo e Verifica</h3>
                  <p>Per utilizzare correttamente il calcolatore, è essenziale capire come interpretare i risultati. Clicca il pulsante per caricare i dati dell'esempio.</p>
                  <button onClick={() => setInputs(exampleData)} className="w-full my-3 bg-gray-200 text-gray-800 p-2 rounded-lg font-semibold hover:bg-gray-300 transition">Carica Dati Esempio</button>
                  <p><strong>Verifica di Sicurezza:</strong><br/>La verifica consiste nel confrontare la pressione applicata con la capacità portante di progetto: <strong>σ<sub>app</sub> ≤ q<sub>d</sub></strong>. Se la condizione è soddisfatta, la fondazione è verificata.</p>
                </div>
              )}
              {activeTab === 'faq' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">1. Perché usare la formula di Brinch-Hansen?</h4>
                    <p>È una delle più complete e accurate per scenari reali, includendo fattori correttivi per forma, profondità e inclinazione del carico.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">2. Come si ottengono i parametri geotecnici?</h4>
                    <p>Da una caratterizzazione geotecnica del sito (indagini in sito e prove di laboratorio). La loro accuratezza è fondamentale.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">3. Quali sono i limiti di questo calcolatore?</h4>
                    <p>È valido per fondazioni superficiali su terreno omogeneo. Non è adatto per fondazioni profonde, terreni stratificati, fondazioni su pendio o analisi sismiche.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CapacitaPortanteApp;
