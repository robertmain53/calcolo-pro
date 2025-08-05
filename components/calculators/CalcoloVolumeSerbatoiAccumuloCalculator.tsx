"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const CalcoloVolumeSerbatoiAccumuloCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    _rowIndex: 54,
    Titolo: "Calcolo Volume Serbatoi di Accumulo: Per laminazione delle piene o riserva idrica",
    Slug: "calcolo-volume-serbatoi-accumulo",
    Categoria: "Ingegneria Idraulica",
    Descrizione: "Per laminazione delle piene o riserva idrica",
    Lingua: "it"
  });

  const [lunghezza, setLunghezza] = useState<number>(0);
  const [larghezza, setLarghezza] = useState<number>(0);
  const [altezza, setAltezza] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);

  const handleCalculate = () => {
    const calculatedVolume = lunghezza * larghezza * altezza;
    setVolume(calculatedVolume);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{data.Titolo}</h1>
      <p className="text-gray-600 mb-4">{data.Descrizione}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lunghezza">
          Lunghezza (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="lunghezza"
          value={lunghezza}
          onChange={(e) => setLunghezza(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="larghezza">
          Larghezza (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="larghezza"
          value={larghezza}
          onChange={(e) => setLarghezza(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="altezza">
          Altezza (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="altezza"
          value={altezza}
          onChange={(e) => setAltezza(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCalculate}
      >
        Calcola Volume
      </button>
      {volume > 0 && (
        <div className="mt-4">
          <p className="text-xl font-bold">Volume: {volume} m³</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloVolumeSerbatoiAccumuloCalculator;
