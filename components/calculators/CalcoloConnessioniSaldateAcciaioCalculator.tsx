"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  thickness: number;
  width: number;
  height: number;
  fy: number;
}

const CalcoloConnessioniSaldateAcciaioCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ thickness: 0, width: 0, height: 0, fy: 0 });
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo in base ai dati di formData
    // Esempio di calcolo semplificato:
    const calculatedResult = formData.thickness * formData.width * formData.height * formData.fy;
    setResult(calculatedResult);
  };

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Connessioni Saldate in Acciaio</h1>
      <p>Calcolo delle connessioni saldate in acciaio a piena e parziale penetrazione (EC3).</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="thickness" className="block text-gray-700 font-bold mb-2">Spessore (mm):</label>
          <input type="number" id="thickness" name="thickness" value={formData.thickness} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="width" className="block text-gray-700 font-bold mb-2">Larghezza (mm):</label>
          <input type="number" id="width" name="width" value={formData.width} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Altezza (mm):</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="fy" className="block text-gray-700 font-bold mb-2">Resistenza caratteristica a snervamento (MPa):</label>
          <input type="number" id="fy" name="fy" value={formData.fy} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {result !== null && (
        <div className="mt-4">
          <p className="text-green-500">Risultato: {result}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloConnessioniSaldateAcciaioCalculator;
