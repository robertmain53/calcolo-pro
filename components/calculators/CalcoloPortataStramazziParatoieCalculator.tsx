"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  larghezza: number;
  altezza: number;
  coeffScarico: number;
}

const CalcoloPortataStramazziParatoieCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ larghezza: 0, altezza: 0, coeffScarico: 0 });
  const [portata, setPortata] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const calcoloPortata = () => {
      const { larghezza, altezza, coeffScarico } = data;
      if (larghezza > 0 && altezza > 0 && coeffScarico > 0) {
        const risultato = larghezza * altezza * coeffScarico;
        setPortata(risultato);
      } else {
        setPortata(0);
      }
    };
    calcoloPortata();
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Portata Stramazzi e Paratoie</h1>
      <p className="text-gray-600 mb-4">Calcola la portata di stramazzi e paratoie di tipi comuni (Stramazzo Bazin, Thomson, etc.).</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="larghezza" className="block text-gray-700 font-bold mb-2">Larghezza (m):</label>
          <input
            type="number"
            id="larghezza"
            name="larghezza"
            value={data.larghezza}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="altezza" className="block text-gray-700 font-bold mb-2">Altezza (m):</label>
          <input
            type="number"
            id="altezza"
            name="altezza"
            value={data.altezza}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="coeffScarico" className="block text-gray-700 font-bold mb-2">Coefficiente di Scarico:</label>
          <input
            type="number"
            id="coeffScarico"
            name="coeffScarico"
            value={data.coeffScarico}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Portata (m³/s): {portata.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloPortataStramazziParatoieCalculator;
