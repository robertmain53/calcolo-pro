"use client";
import React, { useState } from 'react';

interface CalculatorData {
  Uf: number;
  Ug: number;
  ψg: number;
}

const TrasmittanzaTermicaInfissiUwCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    if (data?.Uf && data?.Ug && data?.ψg) {
      const uw = data.Uf + data.Ug + data.ψg;
      setResult(uw);
    } else {
      setResult(null);
    }
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Trasmittanza Termica Infissi (Uw): Calcolo basato su Uf, Ug e ψg</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina la trasmittanza termica degli infissi (Uw) in base ai valori di trasmittanza termica del telaio (Uf), del vetro (Ug) e del ponte termico (ψg).</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="Uf" className="block text-gray-700 font-bold mb-2">Uf (W/m²K):</label>
          <input
            type="number"
            id="Uf"
            name="Uf"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Ug" className="block text-gray-700 font-bold mb-2">Ug (W/m²K):</label>
          <input
            type="number"
            id="Ug"
            name="Ug"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ψg" className="block text-gray-700 font-bold mb-2">ψg (W/mK):</label>
          <input
            type="number"
            id="ψg"
            name="ψg"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
      </div>
      {result !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Uw (W/m²K): {result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default TrasmittanzaTermicaInfissiUwCalculator;
