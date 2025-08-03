"use client";
import React, { useState } from 'react';

const CalcoloRipartizioneSpeseCantiereCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo della ripartizione delle spese di cantiere

  return (
    <div className="p-4">
      <h1>Calcolo Ripartizione Spese di Cantiere: Per consorzi o imprese associate</h1>
      <p>Per consorzi o imprese associate</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="border p-2 m-2" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloRipartizioneSpeseCantiereCalculator;