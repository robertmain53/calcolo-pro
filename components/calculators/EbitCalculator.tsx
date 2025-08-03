"use client";
import React, { useState } from 'react';

interface EBITCalculatorProps {
  title: string;
  description: string;
}

const EBITCalculator: React.FC<EBITCalculatorProps> = ({ title, description }) => {
  const [revenue, setRevenue] = useState<number | ''>('');
  const [operatingCosts, setOperatingCosts] = useState<number | ''>('');
  const [ebit, setEBIT] = useState<number | null>(null);

  const calculateEBIT = () => {
    if (typeof revenue === 'number' && typeof operatingCosts === 'number') {
      setEBIT(revenue - operatingCosts);
    } else {
      setEBIT(null);
    }
  };

  const handleRevenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(parseFloat(event.target.value) || '');
  };

  const handleOperatingCostsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperatingCosts(parseFloat(event.target.value) || '');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="revenue">
          Ricavi:
        </label>
        <input
          type="number"
          id="revenue"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={revenue || ''}
          onChange={handleRevenueChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="operatingCosts">
          Costi Operativi:
        </label>
        <input
          type="number"
          id="operatingCosts"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={operatingCosts || ''}
          onChange={handleOperatingCostsChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculateEBIT}
      >
        Calcola EBIT
      </button>
      {ebit !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">EBIT: {ebit.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default EBITCalculator;
