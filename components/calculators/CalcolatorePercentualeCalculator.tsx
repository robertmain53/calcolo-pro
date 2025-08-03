"use client";
import React, { useState } from 'react';

interface PercentageCalculatorProps {
  title: string;
  description: string;
}

const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ title, description }) => {
  const [value1, setValue1] = useState<number | ''>('');
  const [value2, setValue2] = useState<number | ''>('');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    if (value1 === '' || value2 === '') {
      setPercentage(null);
      setResult(null);
      return;
    }
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    const calcPercentage = (num2 / num1) * 100;
    setPercentage(calcPercentage);
    setResult(num2);
  };

  const calculateValue = () => {
    if (value1 === '' || value2 === '') {
      setPercentage(null);
      setResult(null);
      return;
    }
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    const calcValue = (num1 * num2) / 100;
    setPercentage(num2);
    setResult(calcValue);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="value1">
          Valore 1:
        </label>
        <input
          type="number"
          id="value1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="value2">
          Valore 2:
        </label>
        <input
          type="number"
          id="value2"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculatePercentage}
        >
          Calcola Percentuale
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateValue}
        >
          Calcola Valore
        </button>
      </div>
      {percentage !== null && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Percentuale: {percentage.toFixed(2)}%</p>
          <p className="text-gray-700 font-bold">Risultato: {result}</p>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;
