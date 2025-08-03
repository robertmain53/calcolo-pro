"use client";
import React, { useState } from 'react';

const CalcoloCompensiPubbliciCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo dei compensi pubblici

  return (
    <div className="p-4">
      <h1>Calcolo Compensi Professionali Lavori Pubblici</h1>
      <p>(D.M. 17/06/2016)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloCompensiPubbliciCalculator;