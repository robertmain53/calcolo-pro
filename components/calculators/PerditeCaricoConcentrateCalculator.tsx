"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const PerditeCaricoConcentrateCalculator: React.FC = () => {
  const [diameter, setDiameter] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [kFactor, setKFactor] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const calculateHeadLoss = () => {
    // Formula semplificata per la perdita di carico concentrata
    //  hL = k * (v^2 / (2 * g))
    //  dove:
    //  hL = perdita di carico concentrata
    //  k = coefficiente di perdita di carico
    //  v = velocità del fluido
    //  g = accelerazione di gravità (9.81 m/s^2)
    const g = 9.81;
    const headLoss = kFactor * (velocity * velocity) / (2 * g);
    setResult(headLoss);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Perdite di Carico Concentrate: Calcolo per curve, valvole, raccordi</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina la perdita di carico concentrata in un sistema idraulico.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="diameter">
          Diametro (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="diameter"
          value={diameter}
          onChange={(e) => setDiameter(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="velocity">
          Velocità (m/s):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="velocity"
          value={velocity}
          onChange={(e) => setVelocity(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="kFactor">
          Coefficiente di Perdita (k):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="kFactor"
          value={kFactor}
          onChange={(e) => setKFactor(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={calculateHeadLoss}
      >
        Calcola
      </button>
      {result > 0 && (
        <div className="mt-4">
          <p className="text-green-600 font-bold">Perdita di carico concentrata: {result.toFixed(2)} m</p>
        </div>
      )}
    </div>
  );
};

export default PerditeCaricoConcentrateCalculator;
