"use client";
import React, { useState } from 'react';

interface CorrelazioniProvePenetrometricheData {
  Nspt: number;
  qc: number;
  fs: number;
}

const CorrelazioniProvePenetrometricheCalculator: React.FC = () => {
  const [data, setData] = useState<CorrelazioniProvePenetrometricheData | null>(null);
  const [phiPrima, setPhiPrima] = useState<number | null>(null);
  const [cu, setCu] = useState<number | null>(null);
  const [Ed, setEd] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculate = () => {
    // Aggiungi qui la logica di calcolo basata su Nspt, qc e fs
    // Esempio (sostituisci con le tue formule):
    if (data) {
      const { Nspt, qc, fs } = data;
      const calculatedPhiPrima = Nspt * 0.1; // Sostituisci con la tua formula
      const calculatedCu = qc * 0.01; // Sostituisci con la tua formula
      const calculatedEd = fs * 10; // Sostituisci con la tua formula
      setPhiPrima(calculatedPhiPrima);
      setCu(calculatedCu);
      setEd(calculatedEd);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Correlazione da Prove Penetrometriche (SPT, CPT): Stima di ϕ′, cu​, Ed​</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore stima i parametri geotecnici ϕ′, cu​, Ed​ a partire dai dati delle prove penetrometriche SPT e CPT.</p>
      <div className="mb-4">
        <label htmlFor="Nspt" className="block text-gray-700 font-bold mb-1">Nspt:</label>
        <input
          type="number"
          id="Nspt"
          name="Nspt"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="qc" className="block text-gray-700 font-bold mb-1">qc:</label>
        <input
          type="number"
          id="qc"
          name="qc"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fs" className="block text-gray-700 font-bold mb-1">fs:</label>
        <input
          type="number"
          id="fs"
          name="fs"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleInputChange}
        />
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      {phiPrima !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">ϕ′: {phiPrima.toFixed(2)}</p>
        </div>
      )}
      {cu !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">cu: {cu.toFixed(2)}</p>
        </div>
      )}
      {Ed !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Ed: {Ed.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CorrelazioniProvePenetrometricheCalculator;
