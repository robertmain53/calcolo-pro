"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  cedimento1: number;
  cedimento2: number;
  distanza: number;
}

const CalcoloCedimentiDifferenzialiCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ cedimento1: 0, cedimento2: 0, distanza: 0 });
  const [risultato, setRisultato] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const { cedimento1, cedimento2, distanza } = data;
    if (cedimento1 !== 0 && cedimento2 !== 0 && distanza !==0) {
      const diff = Math.abs(cedimento1 - cedimento2);
      const angoloRadianti = Math.atan(diff / distanza);
      const angoloGradi = angoloRadianti * (180 / Math.PI);
      setRisultato(angoloGradi);
    }
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Cedimenti Differenziali: Stima delle distorsioni angolari</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore stima le distorsioni angolari in base ai cedimenti differenziali.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cedimento1" className="block text-gray-700 font-bold mb-2">Cedimento 1 (cm):</label>
          <input
            type="number"
            id="cedimento1"
            name="cedimento1"
            value={data.cedimento1}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="cedimento2" className="block text-gray-700 font-bold mb-2">Cedimento 2 (cm):</label>
          <input
            type="number"
            id="cedimento2"
            name="cedimento2"
            value={data.cedimento2}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="distanza" className="block text-gray-700 font-bold mb-2">Distanza (cm):</label>
          <input
            type="number"
            id="distanza"
            name="distanza"
            value={data.distanza}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Distorsione Angolare (gradi): {risultato.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloCedimentiDifferenzialiCalculator;
