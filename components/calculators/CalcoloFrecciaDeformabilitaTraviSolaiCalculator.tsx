"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  lunghezza: number;
  larghezza: number;
  altezza: number;
  materiale: string;
  carico: number;
}

const CalcoloFrecciaDeformabilitaTraviSolaiCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ lunghezza: 0, larghezza: 0, altezza: 0, materiale: '', carico: 0 });
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const calcolo = formData.lunghezza * formData.larghezza * formData.altezza * formData.carico;
    setRisultato(calcolo);
  };

  return (
    <div className="p-4">
      <h1>Calcolo della Freccia e Deformabilità (SLE): Per travi e solai (considerando effetti viscosi)</h1>
      <p>Questo calcolatore aiuta a determinare la freccia e la deformabilità di travi e solai, considerando gli effetti viscosi.</p>
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
          <label htmlFor="altezza" className="block text-gray-700 font-bold mb-2">Altezza (m):</label>
          <input type="number" id="altezza" name="altezza" value={formData.altezza} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="materiale" className="block text-gray-700 font-bold mb-2">Materiale:</label>
          <input type="text" id="materiale" name="materiale" value={formData.materiale} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="carico" className="block text-gray-700 font-bold mb-2">Carico (kN):</label>
          <input type="number" id="carico" name="carico" value={formData.carico} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {risultato !== null && (
        <div className="mt-4">
          <p>Risultato: {risultato}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloFrecciaDeformabilitaTraviSolaiCalculator;
