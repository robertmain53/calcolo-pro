"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface VerificaTraveInAcciaioProps {
  lunghezza: number;
  altezza: number;
  larghezza: number;
  carico: number;
}

const VerificaTraveInAcciaioCalculator: React.FC<VerificaTraveInAcciaioProps> = ({ lunghezza, altezza, larghezza, carico }) => {
  const [momentoFlettente, setMomentoFlettente] = useState<number>(0);
  const [taglio, setTaglio] = useState<number>(0);

  React.useEffect(() => {
    // Calcolo momento flettente (semplificato per esempio)
    const momento = (carico * lunghezza) / 4;
    setMomentoFlettente(momento);

    // Calcolo taglio (semplificato per esempio)
    const taglioCalcolato = carico / 2;
    setTaglio(taglioCalcolato);
  }, [carico, lunghezza]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Analisi e Verifica Trave in Acciaio</h1>
      <p className="text-gray-600 mb-4">Flessione, Taglio, Instabilità (NTC 2018, EC3)</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lunghezza" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
          <input type="number" id="lunghezza" value={lunghezza} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled/>
        </div>
        <div>
          <label htmlFor="altezza" className="block text-gray-700 font-bold mb-2">Altezza (m):</label>
          <input type="number" id="altezza" value={altezza} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled/>
        </div>
        <div>
          <label htmlFor="larghezza" className="block text-gray-700 font-bold mb-2">Larghezza (m):</label>
          <input type="number" id="larghezza" value={larghezza} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled/>
        </div>
        <div>
          <label htmlFor="carico" className="block text-gray-700 font-bold mb-2">Carico (kN):</label>
          <input type="number" id="carico" value={carico} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled/>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700 font-bold">Momento Flettente: {momentoFlettente.toFixed(2)} kNm</p>
        <p className="text-gray-700 font-bold">Taglio: {taglio.toFixed(2)} kN</p>
      </div>
    </div>
  );
};

export default VerificaTraveInAcciaioCalculator;
