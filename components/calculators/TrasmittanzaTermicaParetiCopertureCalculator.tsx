"use client";
import React, { useState } from 'react';

const TrasmittanzaTermicaParetiCopertureCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
    // Perform calculation here
  };

  return (
    <div className="p-4">
      <h1>Trasmittanza Termica Pareti e Coperture (U) Calculator</h1>
      <p>(UNI EN ISO 6946)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default TrasmittanzaTermicaParetiCopertureCalculator;