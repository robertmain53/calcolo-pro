"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalcoloMistoAcciaioCalcestruzzoConnettoriProps {
  datiCompleti: {
    _rowIndex: number;
    Titolo: string;
    Slug: string;
    Categoria: string;
    Descrizione: string;
    Lingua: string;
  };
}

const CalcoloMistoAcciaioCalcestruzzoConnettoriCalculator: React.FC<CalcoloMistoAcciaioCalcestruzzoConnettoriProps> = ({ datiCompleti }) => {
  const [valore1, setValore1] = useState<number | null>(null);
  const [valore2, setValore2] = useState<number | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleCalcolo = () => {
    if (valore1 !== null && valore2 !== null) {
      // Inserire qui la logica di calcolo
      const risultatoCalcolo = valore1 + valore2; // Esempio di calcolo
      setRisultato(risultatoCalcolo);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{datiCompleti.Titolo}</h1>
      <p className="text-gray-600 mb-4">{datiCompleti.Descrizione}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="valore1">
          Valore 1:
        </label>
        <input
          type="number"
          id="valore1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={valore1 || ''}
          onChange={(e) => setValore1(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="valore2">
          Valore 2:
        </label>
        <input
          type="number"
          id="valore2"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={valore2 || ''}
          onChange={(e) => setValore2(parseFloat(e.target.value))}
        />
      </div>
      <button
        onClick={handleCalcolo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Risultato: {risultato}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloMistoAcciaioCalcestruzzoConnettoriCalculator;
