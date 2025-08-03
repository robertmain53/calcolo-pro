"use client";
import React, { useState } from 'react';

interface CableSectionCalculatorProps {
  title: string;
  description: string;
}

const CableSectionCalculator: React.FC<CableSectionCalculatorProps> = ({ title, description }) => {
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    setResult(0); // Reset result when input changes
  };

  // Calculation logic here

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 border border-gray-300 rounded-md mb-2" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setResult(inputValue * 2)}>Calculate</button>
      <p className="mt-4">Result: {result}</p>
    </div>
  );
};

export default CableSectionCalculator;