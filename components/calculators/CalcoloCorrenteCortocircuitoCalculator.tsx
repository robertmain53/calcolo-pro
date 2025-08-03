"use client";
import React, { useState } from 'react';

const CalcoloCorrenteCortocircuitoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    setResult(parseInt(e.target.value) * 2); // Esempio di calcolo
  };

  return (
    <div className="p-4">
      <h1>Calcolo Corrente di CC</h1>
      <p>Descrizione: -</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloCorrenteCortocircuitoCalculator;