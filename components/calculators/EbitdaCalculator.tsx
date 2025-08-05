"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface EbitdaCalculatorProps {
  revenues: number;
  cogs: number;
  operatingExpenses: number;
  depreciation: number;
  amortization: number;
}

const EbitdaCalculator: React.FC<EbitdaCalculatorProps> = ({revenues, cogs, operatingExpenses, depreciation, amortization}) => {
  const [ebitda, setEbitda] = useState(0);

  React.useEffect(() => {
    const calculatedEbitda = revenues - cogs - operatingExpenses - depreciation - amortization;
    setEbitda(calculatedEbitda);
  }, [revenues, cogs, operatingExpenses, depreciation, amortization]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">E.B.I.T.D.A. Calculator</h1>
      <p className="text-gray-600 mb-4">Calcola l'EBITDA di un'azienda.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="revenues" className="block text-gray-700 font-bold mb-2">Ricavi:</label>
          <input type="number" id="revenues" value={revenues} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="cogs" className="block text-gray-700 font-bold mb-2">Costo del venduto:</label>
          <input type="number" id="cogs" value={cogs} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="operatingExpenses" className="block text-gray-700 font-bold mb-2">Spese operative:</label>
          <input type="number" id="operatingExpenses" value={operatingExpenses} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="depreciation" className="block text-gray-700 font-bold mb-2">Ammortamento:</label>
          <input type="number" id="depreciation" value={depreciation} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="amortization" className="block text-gray-700 font-bold mb-2">Amortizzazione:</label>
          <input type="number" id="amortization" value={amortization} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">EBITDA: {ebitda}</p>
      </div>
    </div>
  );
};

export default EbitdaCalculator;
