"use client";
import React, { useState } from 'react';

interface FormData {
  lunghezzaTrave: number;
  larghezzaTrave: number;
  altezzaTrave: number;
  moduloElasticita: number;
  carico: number;
  interasse: number;
}

const PredimensionamentoVerificaSolaiLegnoCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ lunghezzaTrave: 0, larghezzaTrave: 0, altezzaTrave: 0, moduloElasticita: 0, carico: 0, interasse: 0 });
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const calcolo = formData.lunghezzaTrave * formData.larghezzaTrave * formData.altezzaTrave;
    setRisultato(calcolo);
  };

  return (
    <div className="p-4">
      <h1>Pre-dimensionamento e Verifica Solai in Legno: Travetti e assito</h1>
      <p>Questo calcolatore aiuta a pre-dimensionare e verificare solai in legno, considerando travetti e assito.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lunghezzaTrave" className="block text-gray-700 font-bold mb-2">Lunghezza Trave (m):</label>
          <input type="number" id="lunghezzaTrave" name="lunghezzaTrave" value={formData.lunghezzaTrave} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* Aggiungi altri campi input qui */}
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

export default PredimensionamentoVerificaSolaiLegnoCalculator;
