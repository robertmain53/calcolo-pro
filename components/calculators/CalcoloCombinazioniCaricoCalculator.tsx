"use client";
import React, { useState } from 'react';

interface LoadCombinationData {
  permanent: number;
  variable: number;
  snow: number;
  wind: number;
  seismic: number;
}

const CalcoloCombinazioniCaricoCalculator: React.FC = () => {
  const [loadCombinationData, setLoadCombinationData] = useState<LoadCombinationData | null>(null);
  const [result, setResult] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoadCombinationData(prevData => ({
      ...prevData,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculate = () => {
    if (loadCombinationData) {
      // Example calculation (replace with actual calculation logic)
      const slu = loadCombinationData.permanent + loadCombinationData.variable + loadCombinationData.snow + loadCombinationData.wind + loadCombinationData.seismic;
      const sle = 1.35 * loadCombinationData.permanent + 1.5 * loadCombinationData.variable + 1.5 * loadCombinationData.snow + 1.5 * loadCombinationData.wind + 1.5 * loadCombinationData.seismic;
      setResult(`SLU: ${slu.toFixed(2)}\nSLE: ${sle.toFixed(2)}`);
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo Combinazioni di Carico (SLU e SLE)</h1>
      <p>Calcola le combinazioni di carico SLU e SLE secondo NTC 2018 e EC0, considerando carichi permanenti, variabili, neve, vento e sisma.</p>
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="permanent" placeholder="Permanente" className="border border-gray-300 p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="variable" placeholder="Variabile" className="border border-gray-300 p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="snow" placeholder="Neve" className="border border-gray-300 p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="wind" placeholder="Vento" className="border border-gray-300 p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="seismic" placeholder="Sisma" className="border border-gray-300 p-2 rounded" onChange={handleInputChange} />
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calcola</button>
      <pre className="mt-4 border border-gray-300 p-2 rounded">{result}</pre>
    </div>
  );
};

export default CalcoloCombinazioniCaricoCalculator;
