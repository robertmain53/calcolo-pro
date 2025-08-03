"use client";
import React, { useState } from 'react';

const PredimensionamentoVerificaSolaiLaterocementoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Pre-dimensionamento e Verifica Solai in Laterocemento</h1>
      <p>(NTC 2018 §4.1.9)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default PredimensionamentoVerificaSolaiLaterocementoCalculator;