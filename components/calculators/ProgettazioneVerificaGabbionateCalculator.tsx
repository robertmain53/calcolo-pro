"use client";
import React, { useState } from 'react';

const ProgettazioneVerificaGabbionateCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
    setResult(parseInt(e.target.value) || 0); // Esempio di calcolo
  };

  return (
    <div className="p-4">
      <h1>ProgettazioneVerificaGabbionate Calculator</h1>
      <p>Per opere di sostegno e di sistemazione idraulica</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default ProgettazioneVerificaGabbionateCalculator;