"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  windLoad: number;
  overload: number;
  anchorCheck: number;
}

const VerificaStabilitaPonteggiCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ windLoad: 0, overload: 0, anchorCheck: 0 });
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calcolo esempio (sostituire con la logica effettiva)
    const calculationResult = formData.windLoad + formData.overload + formData.anchorCheck;
    setResult(calculationResult);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Verifica Stabilità Ponteggi a Tubi e Giunti</h1>
      <p className="text-gray-600 mb-4">Carichi vento, sovraccarichi, verifica ancoraggi</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="windLoad" className="block text-gray-700 font-bold mb-2">Carico Vento:</label>
          <input
            type="number"
            id="windLoad"
            name="windLoad"
            value={formData.windLoad}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="overload" className="block text-gray-700 font-bold mb-2">Sovraccarico:</label>
          <input
            type="number"
            id="overload"
            name="overload"
            value={formData.overload}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="anchorCheck" className="block text-gray-700 font-bold mb-2">Verifica Ancoraggi:</label>
          <input
            type="number"
            id="anchorCheck"
            name="anchorCheck"
            value={formData.anchorCheck}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calcola
        </button>
      </form>
      {result !== null && (
        <div className="mt-4">
          <p className="text-green-600 font-bold">Risultato: {result}</p>
        </div>
      )}
    </div>
  );
};

export default VerificaStabilitaPonteggiCalculator;
