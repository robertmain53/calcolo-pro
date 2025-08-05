"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface GabbionateData {
  altezza: number;
  larghezza: number;
  angolo: number;
}

const ProgettazioneVerificaGabbionateCalculator: React.FC = () => {
  const [gabbionateData, setGabbionateData] = useState<GabbionateData>({ altezza: 0, larghezza: 0, angolo: 0 });
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGabbionateData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculate = () => {
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const { altezza, larghezza, angolo } = gabbionateData;
    const result = altezza * larghezza * Math.sin(angolo * Math.PI / 180);
    setResult(result);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Progettazione e Verifica Gabbionate</h1>
      <p className="text-gray-600 mb-4">Calcolatore per opere di sostegno e di sistemazione idraulica.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="altezza" className="block text-gray-700 font-bold mb-2">Altezza (m):</label>
          <input type="number" id="altezza" name="altezza" value={gabbionateData.altezza} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="larghezza" className="block text-gray-700 font-bold mb-2">Larghezza (m):</label>
          <input type="number" id="larghezza" name="larghezza" value={gabbionateData.larghezza} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="angolo" className="block text-gray-700 font-bold mb-2">Angolo (gradi):</label>
          <input type="number" id="angolo" name="angolo" value={gabbionateData.angolo} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <button onClick={calculate} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calcola</button>
      {result !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Risultato:</p>
          <p className="text-xl text-green-500">{result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ProgettazioneVerificaGabbionateCalculator;
