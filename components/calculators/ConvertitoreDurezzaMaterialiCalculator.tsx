"use client";
import React, { useState } from 'react';

const ConvertitoreDurezzaMaterialiCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setInputValue(value);
    // Perform calculation based on input value
    setResult(value * 2);
  };

  return (
    <div className="p-4">
      <h1>Convertitore Durezza Materiali: Brinell (HB), Rockwell (HRC), Vickers (HV)</h1>
      <p>Brinell (HB), Rockwell (HRC), Vickers (HV)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Result: {result}</p>
    </div>
  );
};

export default ConvertitoreDurezzaMaterialiCalculator;