"use client";
import React, { useState } from 'react';

const ProgettazioneRilevatiStradaliFerroviariCalculator: React.FC = () => {
  const [inputData, setInputData] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Progettazione Rilevati Stradali e Ferroviari Calculator</h1>
      <p>Verifica stabilità e cedimenti</p>
      <input type="number" value={inputData} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Result: {result}</div>
    </div>
  );
};

export default ProgettazioneRilevatiStradaliFerroviariCalculator;