"use client";
import React, { useState } from 'react';

const IsolamentoAcusticoFacciataCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Calcolo dell'isolamento acustico della facciata
  // Formula: inserire qui la formula di calcolo

  return (
    <div className="p-4">
      <h1>Isolamento Acustico di Facciata (D2m,nT,w​) Calculator</h1>
      <p>(UNI EN ISO 12354-3)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="border p-2 m-2" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default IsolamentoAcusticoFacciataCalculator;