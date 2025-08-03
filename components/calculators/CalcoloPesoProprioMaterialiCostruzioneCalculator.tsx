"use client";
import React, { useState } from 'react';

const CalcoloPesoProprioMaterialiCostruzioneCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
    // Inserisci qui la logica per il calcolo in tempo reale
  };

  return (
    <div className="p-4">
      <h1>Calcolo Peso Proprio Materiali da Costruzione</h1>
      <p>Database di materiali comuni (UNI, NTC 2018)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloPesoProprioMaterialiCostruzioneCalculator;