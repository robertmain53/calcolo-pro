"use client";
import React, { useState } from 'react';

const CalcoloFrecciaDeformabilitaTraviSolaiCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
    // Inserire qui la logica per il calcolo in tempo reale
  };

  return (
    <div className="p-4">
      <h1>Calcolo della Freccia e Deformabilità (SLE): Per travi e solai (considerando effetti viscosi)</h1>
      <p>Per travi e solai (considerando effetti viscosi)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloFrecciaDeformabilitaTraviSolaiCalculator;