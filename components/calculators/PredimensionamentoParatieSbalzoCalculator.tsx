"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface PredimensionamentoParatieProps {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const PredimensionamentoParatieSbalzoCalculator: React.FC<PredimensionamentoParatieProps> = ({ _rowIndex, Titolo, Slug, Categoria, Descrizione, Lingua }) => {
  const [profondita, setProfondita] = useState<number | null>(null);
  const [gammaSuolo, setGammaSuolo] = useState<number | null>(null);
  const [coefficienteSpinta, setCoefficienteSpinta] = useState<number | null>(null);
  const [momentoResistente, setMomentoResistente] = useState<number | null>(null);

  const calcola = () => {
    if (profondita === null || gammaSuolo === null || coefficienteSpinta === null) {
      return null; // Handle missing inputs
    }
    // Calcolo semplificato (sostituire con la formula corretta)
    const risultato = profondita * gammaSuolo * coefficienteSpinta;
    setMomentoResistente(risultato);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>{Titolo}</h1>
      <p>{Descrizione}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="profondita" className="block text-gray-700 font-bold mb-2">Profondità (m):</label>
          <input
            type="number"
            id="profondita"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={profondita || ''}
            onChange={(e) => setProfondita(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="gammaSuolo" className="block text-gray-700 font-bold mb-2">Peso specifico del suolo (kN/m³):</label>
          <input
            type="number"
            id="gammaSuolo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={gammaSuolo || ''}
            onChange={(e) => setGammaSuolo(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="coefficienteSpinta" className="block text-gray-700 font-bold mb-2">Coefficiente di spinta:</label>
          <input
            type="number"
            id="coefficienteSpinta"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={coefficienteSpinta || ''}
            onChange={(e) => setCoefficienteSpinta(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button onClick={calcola} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calcola</button>
      {momentoResistente !== null && (
        <div className="mt-4">
          <p className="text-green-600 font-bold">Momento resistente: {momentoResistente.toFixed(2)} kN</p>
        </div>
      )}
    </div>
  );
};

export default PredimensionamentoParatieSbalzoCalculator;
