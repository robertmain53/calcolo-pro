"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

// Interfacce e Costanti usate solo dal calcolatore
interface LoadData {
  g1: number; g2: number; q: number; snow: number; wind: number; seismic: number;
  categoriaUso: 'A' | 'B' | 'C' | 'D' | 'E';
  altitudineNeve: 'inf_1000' | 'sup_1000';
}
interface Results {
  sluFondale: string; sluSismico: string; sleRara: string;
  sleFrequente: string; sleQuasiPermanente: string;
}
const COEFFICIENTS = {
  gamma: { g1_sfav: 1.3, g2_sfav: 1.5, q_sfav: 1.5 },
  psi: {
    A: { psi0: 0.7, psi1: 0.5, psi2: 0.3 }, B: { psi0: 0.7, psi1: 0.5, psi2: 0.3 },
    C: { psi0: 0.7, psi1: 0.7, psi2: 0.6 }, D: { psi0: 0.7, psi1: 0.7, psi2: 0.6 },
    E: { psi0: 1.0, psi1: 0.9, psi2: 0.8 },
    neve: {
      inf_1000: { psi0: 0.5, psi1: 0.2, psi2: 0.0 },
      sup_1000: { psi0: 0.7, psi1: 0.5, psi2: 0.2 },
    },
    vento: { psi0: 0.6, psi1: 0.2, psi2: 0.0 },
  }
};

// Definizione del componente Calcolatore
const CalcoloComb: React.FC = () => {
  const [loads, setLoads] = useState<LoadData>({
    g1: 0, g2: 0, q: 0, snow: 0, wind: 0, seismic: 0,
    categoriaUso: 'A', altitudineNeve: 'inf_1000',
  });
  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoads(prevData => ({ ...prevData, [name]: parseFloat(value) || 0 }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setLoads(prevData => ({ ...prevData, [name]: value as any }));
  };

  const calculate = () => {
    const { g1, g2, q, snow, wind, seismic, categoriaUso, altitudineNeve } = loads;
    const psi_q = COEFFICIENTS.psi[categoriaUso];
    const psi_snow = COEFFICIENTS.psi.neve[altitudineNeve];
    const psi_wind = COEFFICIENTS.psi.vento;
    const g_tot = g1 + g2;
    const variableActions = [
      { value: q, psi: psi_q }, { value: snow, psi: psi_snow }, { value: wind, psi: psi_wind },
    ];
    let sluFondaleMax = COEFFICIENTS.gamma.g1_sfav * g1 + COEFFICIENTS.gamma.g2_sfav * g2;
    for (let i = 0; i < variableActions.length; i++) {
        if (variableActions[i].value > 0) {
            let currentSlu = COEFFICIENTS.gamma.g1_sfav * g1 + COEFFICIENTS.gamma.g2_sfav * g2;
            currentSlu += COEFFICIENTS.gamma.q_sfav * variableActions[i].value;
            for (let j = 0; j < variableActions.length; j++) {
                if (i !== j) currentSlu += COEFFICIENTS.gamma.q_sfav * variableActions[j].psi.psi0 * variableActions[j].value;
            }
            sluFondaleMax = Math.max(sluFondaleMax, currentSlu);
        }
    }
    const sluSismico = seismic + g_tot + (psi_q.psi2 * q) + (psi_snow.psi2 * snow) + (psi_wind.psi2 * wind);
    let sleRaraMax = g_tot, sleFrequenteMax = g_tot;
    for (let i = 0; i < variableActions.length; i++) {
       if (variableActions[i].value > 0) {
            let currentSleRara = g_tot, currentSleFrequente = g_tot;
            currentSleRara += variableActions[i].value;
            currentSleFrequente += variableActions[i].psi.psi1 * variableActions[i].value;
            for (let j = 0; j < variableActions.length; j++) {
                if (i !== j) {
                    currentSleRara += variableActions[j].psi.psi0 * variableActions[j].value;
                    currentSleFrequente += variableActions[j].psi.psi2 * variableActions[j].value;
                }
            }
            sleRaraMax = Math.max(sleRaraMax, currentSleRara);
            sleFrequenteMax = Math.max(sleFrequenteMax, currentSleFrequente);
       }
    }
    const sleQuasiPermanente = g_tot + (psi_q.psi2 * q) + (psi_snow.psi2 * snow) + (psi_wind.psi2 * wind);
    setResults({
      sluFondale: sluFondaleMax.toFixed(2), sluSismico: sluSismico.toFixed(2),
      sleRara: sleRaraMax.toFixed(2), sleFrequente: sleFrequenteMax.toFixed(2),
      sleQuasiPermanente: sleQuasiPermanente.toFixed(2),
    });
  };
  const reset = () => {
    setLoads({
      g1: 0, g2: 0, q: 0, snow: 0, wind: 0, seismic: 0,
      categoriaUso: 'A', altitudineNeve: 'inf_1000',
    });
    setResults(null);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 border-2 border-indigo-600">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">Calcolatore Interattivo</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700">Dati di Input</h4>
          <div><label htmlFor="g1" className="block text-sm font-medium text-gray-700">Permanente Strutturale (G1)</label><input type="number" name="g1" value={loads.g1} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
          <div><label htmlFor="g2" className="block text-sm font-medium text-gray-700">Permanente non Strutturale (G2)</label><input type="number" name="g2" value={loads.g2} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
          <div><label htmlFor="q" className="block text-sm font-medium text-gray-700">Variabile (Q)</label><input type="number" name="q" value={loads.q} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
          <div><label htmlFor="categoriaUso" className="block text-sm font-medium text-gray-700">Categoria d'uso per carico Q</label><select name="categoriaUso" value={loads.categoriaUso} onChange={handleSelectChange} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"><option value="A">A - Ambienti ad uso residenziale</option><option value="B">B - Uffici</option><option value="C">C - Ambienti suscettibili di affollamento</option><option value="D">D - Ambienti ad uso commerciale</option><option value="E">E - Biblioteche, archivi, magazzini</option></select></div>
          <div><label htmlFor="snow" className="block text-sm font-medium text-gray-700">Neve</label><input type="number" name="snow" value={loads.snow} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
          <div><label htmlFor="altitudineNeve" className="block text-sm font-medium text-gray-700">Altitudine per carico Neve</label><select name="altitudineNeve" value={loads.altitudineNeve} onChange={handleSelectChange} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"><option value="inf_1000">≤ 1000 m s.l.m.</option><option value="sup_1000">&gt; 1000 m s.l.m.</option></select></div>
          <div><label htmlFor="wind" className="block text-sm font-medium text-gray-700">Vento</label><input type="number" name="wind" value={loads.wind} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
          <div><label htmlFor="seismic" className="block text-sm font-medium text-gray-700">Sisma (effetto $E_d$)</label><input type="number" name="seismic" value={loads.seismic} className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleInputChange} /></div>
        </div>
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-700">Risultati</h4>
          {results ? (
            <div className="space-y-3 text-gray-800">
              <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded"><p className="font-bold">SLU - Fondamentale (max)</p><p className="text-xl font-mono">{results.sluFondale}</p></div>
              <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded"><p className="font-bold">SLU - Sismica</p><p className="text-xl font-mono">{results.sluSismico}</p></div>
              <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded"><p className="font-bold">SLE - Rara (max)</p><p className="text-xl font-mono">{results.sleRara}</p></div>
              <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded"><p className="font-bold">SLE - Frequente (max)</p><p className="text-xl font-mono">{results.sleFrequente}</p></div>
              <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded"><p className="font-bold">SLE - Quasi-Permanente</p><p className="text-xl font-mono">{results.sleQuasiPermanente}</p></div>
            </div>
          ) : (<div className="flex items-center justify-center h-full text-gray-500"><p>I risultati verranno mostrati qui.</p></div>)}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={calculate} className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">Calcola</button>
        <button onClick={reset} className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">Reset</button>
      </div>
    </div>
  );
};

export default CalcoloComb;