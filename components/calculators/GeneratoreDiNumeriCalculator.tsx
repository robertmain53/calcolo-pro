"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface RandomNumberGeneratorProps {
  min?: number;
  max?: number;
  count?: number;
}

const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ min = 1, max = 100, count = 1 }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [numCount, setNumCount] = useState<number>(count);

  const generateNumbers = () => {
    const generatedNumbers = [];
    for (let i = 0; i < numCount; i++) {
      generatedNumbers.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
    setNumbers(generatedNumbers);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Generatore di numeri casuali</h1>
      <p className="text-gray-600 mb-4">Genera numeri casuali tra un minimo e un massimo specificato.</p>
      <div className="mb-4">
        <label htmlFor="min" className="block text-gray-700 font-bold mb-2">Minimo:</label>
        <input
          type="number"
          id="min"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={minVal}
          onChange={(e) => setMinVal(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="max" className="block text-gray-700 font-bold mb-2">Massimo:</label>
        <input
          type="number"
          id="max"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={maxVal}
          onChange={(e) => setMaxVal(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="count" className="block text-gray-700 font-bold mb-2">Quantità:</label>
        <input
          type="number"
          id="count"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={numCount}
          onChange={(e) => setNumCount(parseInt(e.target.value, 10))}
        />
      </div>
      <button
        onClick={generateNumbers}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Genera Numeri
      </button>
      <div className="mt-4">
        {numbers.length > 0 && (
          <p className="text-gray-700">Numeri generati: {numbers.join(', ') }</p>
        )}
      </div>
    </div>
  );
};

export default RandomNumberGenerator;
