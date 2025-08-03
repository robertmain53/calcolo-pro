"use client";
import React, { useState } from 'react';

const PerditeCaricoConcentrateCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    // Add your calculation logic here
  };

  return (
    <div className="p-4">
      <h1>Perdite Carico Concentrate Calculator</h1>
      <p>Calcolo per curve, valvole, raccordi</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default PerditeCaricoConcentrateCalculator;