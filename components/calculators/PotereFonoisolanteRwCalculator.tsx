"use client";
import React, { useState } from 'react';

const PotereFonoisolanteRwCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
    // Inserisci qui la logica per il calcolo in tempo reale
  };

  return (
    <div className="p-4">
      <h1>Potere Fonoisolante Rw Calculator</h1>
      <p>(UNI EN ISO 12354-1)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default PotereFonoisolanteRwCalculator;