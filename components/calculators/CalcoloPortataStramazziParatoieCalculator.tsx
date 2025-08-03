"use client";
import React, { useState } from 'react';

const CalcoloPortataStramazziParatoieCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo della portata

  return (
    <div className="p-4">
      <h1>Calcolo Portata Stramazzi e Paratoie</h1>
      <p>Tipi comuni (Stramazzo Bazin, Thomson, etc.)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloPortataStramazziParatoieCalculator;