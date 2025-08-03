"use client";
import React, { useState } from 'react';

const CalcoloSpintaTerreCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo della spinta delle terre

  return (
    <div className="p-4">
      <h1>Calcolo Spinta delle Terre: Attiva, passiva e a riposo (teorie di Coulomb e Rankine)</h1>
      <p>Attiva, passiva e a riposo (teorie di Coulomb e Rankine)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border border-gray-300 rounded" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloSpintaTerreCalculator;