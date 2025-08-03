"use client";
import React, { useState } from 'react';

interface FormData {
  lunghezza: number;
  larghezza: number;
  carico: number;
}

const PredimensionamentoVerificaSolaiLaterocementoCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ lunghezza: 0, larghezza: 0, carico: 0 });
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo in base ai dati di input
    // Esempio di calcolo semplificato (sostituisci con la tua logica):
    const calcolo = formData.lunghezza * formData.larghezza * formData.carico;
    setRisultato(calcolo);
  };

  return (
    <div className="p-4">
      <h1>Pre-dimensionamento e Verifica Solai in Laterocemento (NTC 2018 §4.1.9)</h1>
      <p>Questo calcolatore aiuta a pre-dimensionare e verificare solai in laterocemento secondo la normativa NTC 2018 §4.1.9.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lunghezza" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
          <input type="number" id="lunghezza" name="lunghezza" value={formData.lunghezza} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="larghezza" className="block text-gray-700 font-bold mb-2">Larghezza (m):</label>
          <input type="number" id="larghezza" name="larghezza" value={formData.larghezza} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="carico" className="block text-gray-700 font-bold mb-2">Carico (kN/m²):</label>
          <input type="number" id="carico" name="carico" value={formData.carico} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-green-500">Risultato: {risultato}</p>
        </div>
      )}
    </div>
  );
};

export default PredimensionamentoVerificaSolaiLaterocementoCalculator;
