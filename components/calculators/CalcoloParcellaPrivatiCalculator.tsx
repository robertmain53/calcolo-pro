"use client";
import React, { useState } from 'react';

const CalcoloParcellaPrivatiCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo della parcella professionale

  return (
    <div className="p-4">
      <h1>Calcolo Parcella Privati</h1>
      <p>(D.M. 140/2012)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="border p-2 m-2" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloParcellaPrivatiCalculator;