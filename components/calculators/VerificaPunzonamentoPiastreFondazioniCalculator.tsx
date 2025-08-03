"use client";
import React, { useState } from 'react';

const VerificaPunzonamentoPiastreFondazioniCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo del punzonamento

  return (
    <div className="p-4">
      <h1>Verifica Punzonamento Piastre e Fondazioni</h1>
      <p>(NTC 2018, EC2)</p>
      <input type="number" value={input} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Risultato: {result}</div>
    </div>
  );
};

export default VerificaPunzonamentoPiastreFondazioniCalculator;