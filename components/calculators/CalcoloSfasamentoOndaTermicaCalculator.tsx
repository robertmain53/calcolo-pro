"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalcoloSfasamentoOndaTermicaProps {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const CalcoloSfasamentoOndaTermicaCalculator: React.FC<CalcoloSfasamentoOndaTermicaProps> = ({ _rowIndex, Titolo, Slug, Categoria, Descrizione, Lingua }) => {
  const [resistenzaTermica, setResistenzaTermica] = useState<number | null>(null);
  const [diffusivitaTermica, setDiffusivitaTermica] = useState<number | null>(null);
  const [sfasamento, setSfasamento] = useState<number | null>(null);
  const [attenuazione, setAttenuazione] = useState<number | null>(null);

  const calculate = () => {
    if (resistenzaTermica !== null && diffusivitaTermica !== null) {
      // Calcolo sfasamento (semplificato per esempio)
      const sfasamentoCalcolato = Math.sqrt(resistenzaTermica * diffusivitaTermica);
      setSfasamento(sfasamentoCalcolato);

      // Calcolo attenuazione (semplificato per esempio)
      const attenuazioneCalcolata = 1 / resistenzaTermica;
      setAttenuazione(attenuazioneCalcolata);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{Titolo}</h1>
      <p className="text-gray-600 mb-4">{Descrizione}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="resistenzaTermica">
          Resistenza Termica (m²K/W):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="resistenzaTermica"
          type="number"
          value={resistenzaTermica || ''}
          onChange={(e) => setResistenzaTermica(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="diffusivitaTermica">
          Diffusività Termica (m²/s):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="diffusivitaTermica"
          type="number"
          value={diffusivitaTermica || ''}
          onChange={(e) => setDiffusivitaTermica(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculate}
      >
        Calcola
      </button>
      {sfasamento !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Sfasamento: {sfasamento.toFixed(2)} ore</p>
        </div>
      )}
      {attenuazione !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Attenuazione: {attenuazione.toFixed(2)} W/m²K</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloSfasamentoOndaTermicaCalculator;
