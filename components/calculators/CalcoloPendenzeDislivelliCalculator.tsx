"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorState {
  dislivello: number;
  distanza: number;
  pendenzaPercentuale: number;
  pendenzaGradi: number;
}

const CalcoloPendenzeDislivelliCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({ dislivello: 0, distanza: 0, pendenzaPercentuale: 0, pendenzaGradi: 0 });

  const handleDislivelloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setCalculatorState((prevState) => ({ ...prevState, dislivello: value, pendenzaPercentuale: calculatePendenzaPercentuale(value, prevState.distanza), pendenzaGradi: calculatePendenzaGradi(value, prevState.distanza) }));
  };

  const handleDistanzaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setCalculatorState((prevState) => ({ ...prevState, distanza: value, pendenzaPercentuale: calculatePendenzaPercentuale(prevState.dislivello, value), pendenzaGradi: calculatePendenzaGradi(prevState.dislivello, value) }));
  };

  const calculatePendenzaPercentuale = (dislivello: number, distanza: number): number => {
    if (distanza === 0) return 0;
    return (dislivello / distanza) * 100;
  };

  const calculatePendenzaGradi = (dislivello: number, distanza: number): number => {
    if (distanza === 0) return 0;
    return Math.atan(dislivello / distanza) * (180 / Math.PI);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Calcolo Pendenze (%, gradi) e Dislivelli</h1>
      <p>Calcolatore per determinare pendenze e dislivelli in profili longitudinali.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="dislivello" className="block text-gray-700 font-bold mb-2">Dislivello (m):</label>
          <input type="number" id="dislivello" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={calculatorState.dislivello} onChange={handleDislivelloChange} />
        </div>
        <div>
          <label htmlFor="distanza" className="block text-gray-700 font-bold mb-2">Distanza (m):</label>
          <input type="number" id="distanza" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={calculatorState.distanza} onChange={handleDistanzaChange} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Pendenza (%): {calculatorState.pendenzaPercentuale.toFixed(2)}</p>
        <p className="text-gray-700 font-bold">Pendenza (gradi): {calculatorState.pendenzaGradi.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloPendenzeDislivelliCalculator;
