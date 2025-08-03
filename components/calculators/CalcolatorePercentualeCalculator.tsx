"use client";
import React, { useState } from 'react';

const CalcolatorePercentualeCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [percentageValue, setPercentageValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentageValue(parseFloat(e.target.value));
  };

  const calculatePercentage = () => {
    setResult((inputValue * percentageValue) / 100);
  };

  return (
    <div className="p-4">
      <h1>CalcolatorePercentuale</h1>
      <p>Calcolatore multiuso per il calcolo delle percentuali</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <input type="number" value={percentageValue} onChange={handlePercentageChange} className="p-2 m-2 border rounded-lg" />
      <button onClick={calculatePercentage} className="p-2 bg-blue-500 text-white rounded-lg">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcolatorePercentualeCalculator;