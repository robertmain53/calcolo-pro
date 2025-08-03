"use client";
import React, { useState } from 'react';

const VerificaFessurazioneElementiCaCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
    // Inserisci qui la logica per il calcolo dell'apertura delle fessure wk​
  };

  return (
    <div className="p-4">
      <h1>Verifica Fessurazione Elementi in c.a. (SLE) Calculator</h1>
      <p>Calcolo dell'apertura delle fessure wk​</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default VerificaFessurazioneElementiCaCalculator;