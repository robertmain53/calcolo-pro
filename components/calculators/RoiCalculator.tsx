"use client";
import React, { useState } from 'react';

interface RoiCalculatorProps {
  title: string;
  description: string;
}

const RoiCalculator: React.FC<RoiCalculatorProps> = ({ title, description }) => {
  const [investment, setInvestment] = useState<number | ''>('');
  const [profit, setProfit] = useState<number | ''>('');
  const [roi, setRoi] = useState<number | null>(null);

  const calculateRoi = () => {
    if (investment && profit) {
      const roiValue = (Number(profit) / Number(investment)) * 100;
      setRoi(roiValue);
    } else {
      setRoi(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="investment">
          Investimento:
        </label>
        <input
          type="number"
          id="investment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={investment || ''}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="profit">
          Profitto:
        </label>
        <input
          type="number"
          id="profit"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={profit || ''}
          onChange={(e) => setProfit(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculateRoi}
      >
        Calcola ROI
      </button>
      {roi !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">ROI: {roi.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default RoiCalculator;
