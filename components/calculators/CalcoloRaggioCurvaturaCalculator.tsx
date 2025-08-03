"use client";
import React, { useState } from 'react';

const CalcoloRaggioCurvaturaCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    setResult(2 * Math.PI * inputValue);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Raggio di Curvatura: Per tracciati stradali e ferroviari</h1>
      <p>Per tracciati stradali e ferroviari</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p className="m-2">Il raggio di curvatura è: {result}</p>
    </div>
  );
};

export default CalcoloRaggioCurvaturaCalculator;