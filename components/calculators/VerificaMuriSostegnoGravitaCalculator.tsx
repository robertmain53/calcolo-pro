"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  altezzaMuro: number;
  pesoSpecificoSuolo: number;
  angoloAttrito: number;
  coefficienteAdesione: number;
  caricoApplicato: number;
}

const VerificaMuriSostegnoGravitaCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    altezzaMuro: 0,
    pesoSpecificoSuolo: 0,
    angoloAttrito: 0,
    coefficienteAdesione: 0,
    caricoApplicato: 0,
  });

  const [risultato, setRisultato] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo in base alla NTC 2018
    // ...
    setRisultato('Calcolo in corso...'); // Sostituisci con il risultato effettivo
  };

  return (
    <div className="p-4">
      <h1>Verifica Muri di Sostegno a Gravità</h1>
      <p>Calcolo del ribaltamento, scorrimento e carico limite secondo NTC 2018.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="altezzaMuro" className="block text-gray-700 font-bold mb-2">Altezza Muro (m):</label>
          <input type="number" id="altezzaMuro" name="altezzaMuro" value={formData.altezzaMuro} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* Altri campi di input */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      <div className="mt-4">
        <p>Risultato: {risultato}</p>
      </div>
    </div>
  );
};

export default VerificaMuriSostegnoGravitaCalculator;