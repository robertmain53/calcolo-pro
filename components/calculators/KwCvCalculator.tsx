"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface KwCvCalculatorProps{}

const KwCvCalculator: React.FC<KwCvCalculatorProps> = () => {
  const [kw, setKw] = useState<string>('');
  const [cv, setCv] = useState<string>('');

  const handleKwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKw(event.target.value);
    const cvValue = kw ? (parseFloat(kw) * 1.341).toFixed(2) : '';
    setCv(cvValue);
  };

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCv(event.target.value);
    const kwValue = cv ? (parseFloat(cv) / 1.341).toFixed(2) : '';
    setKw(kwValue);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Convertitore KW - CV (Cavalli Vapore)</h1>
      <p className="text-gray-600 mb-4">Strumento per la conversione della potenza dei veicoli da kW a HP o CV e viceversa</p>
      <div className="mb-4">
        <label htmlFor="kw" className="block text-gray-700 font-bold mb-2">Kilowatt (kW):</label>
        <input
          type="number"
          id="kw"
          value={kw}
          onChange={handleKwChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cv" className="block text-gray-700 font-bold mb-2">Cavalli Vapore (CV):</label>
        <input
          type="number"
          id="cv"
          value={cv}
          onChange={handleCvChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default KwCvCalculator;
