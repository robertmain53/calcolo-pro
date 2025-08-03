"use client";
import React, { useState } from 'react';

const StimaFabbisognoEnergeticoEpCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Calcolo del fabbisogno energetico
  // Inserisci qui la logica per il calcolo

  return (
    <div className="p-4">
      <h1>StimaFabbisognoEnergeticoEp Calculator</h1>
      <p>Per riscaldamento e raffrescamento (semplificato)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default StimaFabbisognoEnergeticoEpCalculator;