"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface IlluminanceData {
  area: number;
  luminance: number;
  numberOfFixtures: number;
}

const VerificaIlluminamentoUniformitaCalculator: React.FC = () => {
  const [area, setArea] = useState<number>(0);
  const [luminance, setLuminance] = useState<number>(0);
  const [numberOfFixtures, setNumberOfFixtures] = useState<number>(0);
  const [averageIlluminance, setAverageIlluminance] = useState<number>(0);

  const calculateAverageIlluminance = () => {
    if (area <= 0 || luminance <= 0 || numberOfFixtures <=0) return;
    setAverageIlluminance((luminance * numberOfFixtures) / area);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Verifica Illuminamento Medio e Uniformità: Per ambienti interni</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina l'illuminamento medio di un ambiente interno.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="area">
          Area (m²):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="area"
          value={area}
          onChange={(e) => setArea(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="luminance">
          Luminanza (lux):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="luminance"
          value={luminance}
          onChange={(e) => setLuminance(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="numberOfFixtures">
          Numero di apparecchi:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="numberOfFixtures"
          value={numberOfFixtures}
          onChange={(e) => setNumberOfFixtures(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={calculateAverageIlluminance}
      >
        Calcola
      </button>
      {averageIlluminance > 0 && (
        <div className="mt-4">
          <p className="text-gray-800 font-bold">Illuminamento medio: {averageIlluminance.toFixed(2)} lux</p>
        </div>
      )}
    </div>
  );
};

export default VerificaIlluminamentoUniformitaCalculator;
