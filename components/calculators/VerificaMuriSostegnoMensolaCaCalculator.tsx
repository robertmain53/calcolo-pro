"use client";
import React, { useState } from 'react';

const VerificaMuriSostegnoMensolaCaCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Verifica Muri di Sostegno a Mensola in c.a. Calculator</h1>
      <p>Verifiche strutturali e geotecniche</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default VerificaMuriSostegnoMensolaCaCalculator;