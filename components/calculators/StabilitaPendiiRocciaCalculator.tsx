"use client";
import React, { useState } from 'react';

const StabilitaPendiiRocciaCalculator: React.FC = () => {
  const [inputData, setInputData] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(parseInt(e.target.value));
  };

  // Inserisci qui la logica per il calcolo

  return (
    <div className="p-4">
      <h1>Stabilità dei Pendii in Roccia: Analisi cinematica per cunei e ribaltamento</h1>
      <p>Analisi cinematica per cunei e ribaltamento</p>
      <input type="number" value={inputData} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default StabilitaPendiiRocciaCalculator;