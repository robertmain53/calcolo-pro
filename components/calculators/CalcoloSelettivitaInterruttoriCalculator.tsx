"use client";
import React, { useState } from 'react';

interface CalculatorData {
  In:
  number;
  In2:
  number;
  Result:
  number;
}

const CalcoloSelettivitaInterruttoriCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ In: 0, In2: 0, Result: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  // Placeholder per il calcolo. Sostituisci con la logica effettiva.
  React.useEffect(() => {
    const result = data.In * data.In2; // esempio di calcolo
    setData((prevData) => ({ ...prevData, Result: result }));
  }, [data.In, data.In2]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Selettività Interruttori Magnetotermici</h1>
      <p className="text-gray-600 mb-4">
        Protezione da sovraccarichi e cortocircuiti
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="In" className="block text-gray-700 font-bold mb-2">Input 1:</label>
          <input
            type="number"
            id="In"
            name="In"
            value={data.In}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="In2" className="block text-gray-700 font-bold mb-2">Input 2:</label>
          <input
            type="number"
            id="In2"
            name="In2"
            value={data.In2}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-bold mb-2">Risultato:</label>
        <p className="text-lg font-bold text-blue-500">{data.Result}</p>
      </div>
    </div>
  );
};

export default CalcoloSelettivitaInterruttoriCalculator;
