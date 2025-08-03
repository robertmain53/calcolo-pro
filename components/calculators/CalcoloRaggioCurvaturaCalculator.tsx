"use client";
import React, { useState } from 'react';

interface CalculatorData {
  angolo?: number;
  corda?: number;
}

const CalcoloRaggioCurvaturaCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({});
  const [raggio, setRaggio] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculateRaggio = () => {
    if (data.angolo && data.corda) {
      const angoloRadianti = data.angolo * Math.PI / 180;
      const raggioCalcolato = data.corda / (2 * Math.sin(angoloRadianti / 2));
      setRaggio(raggioCalcolato);
    } else {
      setRaggio(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Raggio di Curvatura</h1>
      <p className="text-gray-600 mb-4">Calcola il raggio di curvatura per tracciati stradali e ferroviari.</p>
      <div className="mb-4">
        <label htmlFor="angolo" className="block text-gray-700 font-bold mb-2">Angolo (gradi):</label>
        <input
          type="number"
          id="angolo"
          name="angolo"
          value={data.angolo || ''}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="corda" className="block text-gray-700 font-bold mb-2">Lunghezza Corda:</label>
        <input
          type="number"
          id="corda"
          name="corda"
          value={data.corda || ''}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={calculateRaggio}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcola
      </button>
      {raggio !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">Raggio di Curvatura: {raggio.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloRaggioCurvaturaCalculator;
