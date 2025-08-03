"use client";
import React, { useState } from 'react';

const CalcoloCombinazioniCaricoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo delle combinazioni di carico

  return (
    <div className="p-4">
      <h1>Calcolo Combinazioni di Carico (SLU e SLE)</h1>
      <p>Per carichi permanenti, variabili, neve, vento, sisma (NTC 2018, EC0)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloCombinazioniCaricoCalculator;