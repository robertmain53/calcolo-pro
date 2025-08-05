'use client';

import React, { useState } from 'react';

interface Props {
  title: string;
  description: string;
}

const RoiCalculator: React.FC<Props> = ({ title, description }) => {
  // gestiamo gli input come stringhe, poi li convertiamo al calcolo
  const [investment, setInvestment] = useState<string>('');
  const [profit, setProfit] = useState<string>('');
  const [roi, setRoi] = useState<number | null>(null);

  const calculateRoi = () => {
    const inv = parseFloat(investment);
    const prof = parseFloat(profit);
    if (isNaN(inv) || isNaN(prof) || inv === 0) return setRoi(null);
    setRoi((prof / inv) * 100);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Investimento (€):</span>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Profitto (€):</span>
        <input
          type="number"
          value={profit}
          onChange={(e) => setProfit(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <button
        type="button"
        onClick={calculateRoi}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola ROI
      </button>

      {roi !== null && (
        <p className="mt-4 text-xl font-bold text-indigo-700">
          ROI: {roi.toFixed(2)}%
        </p>
      )}
    </div>
  );
};

export default RoiCalculator;
