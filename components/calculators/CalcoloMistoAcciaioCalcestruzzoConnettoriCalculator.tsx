"use client";
import React, { useState } from 'react';

const CalcoloMistoAcciaioCalcestruzzoConnettoriCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica di calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Calcolo Misto Acciaio-Calcestruzzo: Connettori a Taglio</h1>
      <p>Per solai e travi composte (EC4)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloMistoAcciaioCalcestruzzoConnettoriCalculator;