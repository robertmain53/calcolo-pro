"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface DimensionamentoCaviProps {
  correnteNominale: number;
  tensioneNominale: number;
  lunghezzaCavo: number;
  cadutaTensioneMax: number;
  tipoPosa: string;
}

const DimensionamentoCaviCalculator: React.FC = () => {
  const [correnteNominale, setCorrenteNominale] = useState<number>(0);
  const [tensioneNominale, setTensioneNominale] = useState<number>(0);
  const [lunghezzaCavo, setLunghezzaCavo] = useState<number>(0);
  const [cadutaTensioneMax, setCadutaTensioneMax] = useState<number>(0);
  const [tipoPosa, setTipoPosa] = useState<string>('Aria');
  const [sezioneCavo, setSezioneCavo] = useState<string>('');

  const handleCalculate = () => {
    // Aggiungi qui la logica di calcolo della sezione del cavo in base alla normativa CEI 64-8
    // Questo è un esempio semplificato, sostituisci con la logica effettiva
    const sezione = 'Calcolo in corso...';
    setSezioneCavo(sezione);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Dimensionamento Sezione Cavi Elettrici</h1>
      <p className="text-gray-600 mb-4">Calcola la sezione del cavo elettrico necessaria in base a portata, caduta di tensione e tipo di posa (CEI 64-8).</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="correnteNominale">
          Corrente Nominale (A):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="correnteNominale"
          value={correnteNominale}
          onChange={(e) => setCorrenteNominale(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="tensioneNominale">
          Tensione Nominale (V):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="tensioneNominale"
          value={tensioneNominale}
          onChange={(e) => setTensioneNominale(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lunghezzaCavo">
          Lunghezza Cavo (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="lunghezzaCavo"
          value={lunghezzaCavo}
          onChange={(e) => setLunghezzaCavo(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="cadutaTensioneMax">
          Caduta di Tensione Max (%):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="cadutaTensioneMax"
          value={cadutaTensioneMax}
          onChange={(e) => setCadutaTensioneMax(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="tipoPosa">
          Tipo di Posa:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tipoPosa"
          value={tipoPosa}
          onChange={(e) => setTipoPosa(e.target.value)}
        >
          <option value="Aria">Aria</option>
          <option value="Tubo">Tubo</option>
          {/* Aggiungi altre opzioni di tipo posa */}
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleCalculate}
      >
        Calcola
      </button>
      <div className="mt-4">
        <p className="text-gray-700">Sezione Cavo: {sezioneCavo}</p>
      </div>
    </div>
  );
};

export default DimensionamentoCaviCalculator;
