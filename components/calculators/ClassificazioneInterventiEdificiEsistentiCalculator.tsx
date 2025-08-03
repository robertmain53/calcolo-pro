"use client";
import React, { useState } from 'react';

const ClassificazioneInterventiEdificiEsistentiCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Classificazione Interventi su Edifici Esistenti: Adeguamento, miglioramento, intervento locale (NTC 2018 Cap. 8)</h1>
      <p>Adeguamento, miglioramento, intervento locale (NTC 2018 Cap. 8)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Result: {result}</div>
    </div>
  );
};

export default ClassificazioneInterventiEdificiEsistentiCalculator;