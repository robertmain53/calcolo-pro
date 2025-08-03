"use client";
import React, { useState } from 'react';

const ComputoMaterialiCostruzioneCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo dei materiali da costruzione

  return (
    <div className="p-4">
      <h1>ComputoMaterialiCostruzione Calculator</h1>
      <p>Calcolo volumi calcestruzzo, peso acciaio, numero mattoni, etc.</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default ComputoMaterialiCostruzioneCalculator;