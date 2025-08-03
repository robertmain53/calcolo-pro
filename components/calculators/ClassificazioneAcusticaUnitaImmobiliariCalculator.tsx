"use client";
import React, { useState } from 'react';

const ClassificazioneAcusticaUnitaImmobiliariCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
    setResult(parseInt(e.target.value) || 0); // Esempio di calcolo in tempo reale
  };

  return (
    <div className="p-4">
      <h1>Classificazione Acustica Unità Immobiliari Calculator</h1>
      <p>(UNI 11367)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default ClassificazioneAcusticaUnitaImmobiliariCalculator;