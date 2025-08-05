"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface SpettroInput {
  ag: number;
  T0: number;
  TB: number;
}

const AnalisiSpettroRispostaSismicoCalculator: React.FC = () => {
  const [input, setInput] = useState<SpettroInput>({ ag: 0, T0: 0, TB: 0 });
  const [Sa, setSa] = useState<number>(0);

  const calculateSa = () => {
    // Calcolo semplificato per esempio, sostituire con la formula corretta
    if (input.T0 <= input.TB) {
      setSa(input.ag * input.T0);
    } else {
      setSa(input.ag * input.TB);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Analisi Spettro di Risposta Sismico</h1>
      <p className="text-gray-600 mb-4">Definizione dello spettro elastico e di progetto (NTC 2018)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ag" className="block text-gray-700 font-bold mb-2">Accelerazione di picco al suolo (ag):</label>
          <input
            type="number"
            id="ag"
            value={input.ag}
            onChange={(e) =>
              setInput({ ...input, ag: parseFloat(e.target.value) })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="T0" className="block text-gray-700 font-bold mb-2">Periodo di ritorno (T0):</label>
          <input
            type="number"
            id="T0"
            value={input.T0}
            onChange={(e) =>
              setInput({ ...input, T0: parseFloat(e.target.value) })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="TB" className="block text-gray-700 font-bold mb-2">Periodo di ritorno (TB):</label>
          <input
            type="number"
            id="TB"
            value={input.TB}
            onChange={(e) =>
              setInput({ ...input, TB: parseFloat(e.target.value) })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button
        onClick={calculateSa}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Calcola Sa
      </button>
      {Sa > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Sa (Accelerazione spettrale): {Sa}</p>
        </div>
      )}
    </div>
  );
};

export default AnalisiSpettroRispostaSismicoCalculator;
