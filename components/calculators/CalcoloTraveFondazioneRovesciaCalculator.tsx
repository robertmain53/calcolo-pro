"use client";
import React, { useState } from 'react';

const CalcoloTraveFondazioneRovesciaCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo della trave di fondazione rovescia

  return (
    <div className="p-4">
      <h1>Calcolo Trave di Fondazione (Trave Rovescia)</h1>
      <p>Su suolo elastico (alla Winkler)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloTraveFondazioneRovesciaCalculator;