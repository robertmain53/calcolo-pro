"use client";
import React, { useState } from 'react';

const CalcoloCarichiNeveVentoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo dei carichi da neve e vento

  return (
    <div className="p-4">
      <h1>Calcolo Carichi da Neve e Vento</h1>
      <p>Secondo le mappe e le formule delle NTC 2018</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloCarichiNeveVentoCalculator;