"use client";
import React, { useState } from 'react';

const DiagrammiSollecitazioniCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value));
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Diagrammi Sollecitazioni Calculator</h1>
      <p>Per schemi statici notevoli (trave appoggiata, incastrata, continua)</p>
      <input type="number" value={input} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Result: {result}</div>
    </div>
  );
};

export default DiagrammiSollecitazioniCalculator;