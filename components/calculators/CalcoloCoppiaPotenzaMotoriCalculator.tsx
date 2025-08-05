"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface MotorData {
  potenza: number;
  coppia: number;
  rendimento: number;
}

const CalcoloCoppiaPotenzaMotoriCalculator: React.FC = () => {
  const [potenza, setPotenza] = useState<number>(0);
  const [coppia, setCoppia] = useState<number>(0);
  const [rendimento, setRendimento] = useState<number>(0);
  const [results, setResults] = useState<MotorData | null>(null);

  const calculate = () => {
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const calculatedRendimento = (potenza * coppia) / 100; // esempio di calcolo
    setResults({ potenza, coppia, rendimento: calculatedRendimento });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Coppia, Potenza e Rendimento Motori Elettrici: Trifase asincroni</h1>
      <p className="text-gray-600 mb-4">Calcola la coppia, la potenza e il rendimento dei motori trifase asincroni.</p>
      <div className="mb-4">
        <label htmlFor="potenza" className="block text-gray-700 font-bold mb-2">Potenza (kW):</label>
        <input
          type="number"
          id="potenza"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={potenza}
          onChange={(e) => setPotenza(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coppia" className="block text-gray-700 font-bold mb-2">Coppia (Nm):</label>
        <input
          type="number"
          id="coppia"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={coppia}
          onChange={(e) => setCoppia(parseFloat(e.target.value))}
        />
      </div>
      <button
        onClick={calculate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcola
      </button>
      {results && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Risultati:</p>
          <p>Potenza: {results.potenza} kW</p>
          <p>Coppia: {results.coppia} Nm</p>
          <p>Rendimento: {results.rendimento.toFixed(2)} %</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCoppiaPotenzaMotoriCalculator;
