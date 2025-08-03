"use client";
import React, { useState } from 'react';

interface InputData {
  span: number;
  b: number;
  h: number;
  fy: number;
  fck: number;
  l: number;
  q: number;
}

const VerificaTraveInLegnoCalculator: React.FC = () => {
  const [inputData, setInputData] = useState<InputData | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputData) {
      // Aggiungi qui la logica di calcolo
      // ...
      setResult('Risultato del calcolo');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({...inputData, [e.target.name]: parseFloat(e.target.value)});
  };

  return (
    <div className="p-4">
      <h1>Analisi e Verifica Trave in Legno</h1>
      <p>Flessione, Taglio, Deformabilità (NTC 2018, EC5)</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="span" className="block text-gray-700 font-bold mb-2">Larghezza (span):</label>
          <input type="number" id="span" name="span" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInputChange} required/>
        </div>
        {/* Aggiungi altri campi input qui */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {result && <div className="mt-4">{result}</div>}
    </div>
  );
};

export default VerificaTraveInLegnoCalculator;