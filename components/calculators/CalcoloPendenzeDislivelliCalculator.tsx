"use client";
import React, { useState } from 'react';

const CalcoloPendenzeDislivelliCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
    // Perform calculation based on input value
    setResult(inputValue * 2);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Pendenze (%, gradi) e Dislivelli: Per profili longitudinali</h1>
      <p>Per profili longitudinali</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloPendenzeDislivelliCalculator;