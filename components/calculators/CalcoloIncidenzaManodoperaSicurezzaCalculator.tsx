"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  manodopera: number;
  costiSicurezza: number;
  costoTotale: number;
}

const CalcoloIncidenzaManodoperaSicurezzaCalculator: React.FC = () => {
  const [manodopera, setManodopera] = useState<number>(0);
  const [costiSicurezza, setCostiSicurezza] = useState<number>(0);
  const [costoTotale, setCostoTotale] = useState<number>(0);

  const handleManodoperaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setManodopera(isNaN(value) ? 0 : value);
  };

  const handleCostiSicurezzaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setCostiSicurezza(isNaN(value) ? 0 : value);
  };

  React.useEffect(() => {
    setCostoTotale(manodopera + costiSicurezza);
  }, [manodopera, costiSicurezza]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Incidenza Manodopera e Costi Sicurezza</h1>
      <p className="text-gray-600 mb-4">Per computo metrico estimativo</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="manodopera">
          Costo Manodopera:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="manodopera"
          value={manodopera}
          onChange={handleManodoperaChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="costiSicurezza">
          Costi Sicurezza:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="costiSicurezza"
          value={costiSicurezza}
          onChange={handleCostiSicurezzaChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="costoTotale">
          Costo Totale:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="costoTotale"
          value={costoTotale}
          readOnly
        />
      </div>
    </div>
  );
};

export default CalcoloIncidenzaManodoperaSicurezzaCalculator;
