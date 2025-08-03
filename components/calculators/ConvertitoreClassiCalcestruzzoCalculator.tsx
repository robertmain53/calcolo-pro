"use client";
import React, { useState } from 'react';

const ConvertitoreClassiCalcestruzzoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Funzione per il calcolo
  const calculateResult = () => {
    // Inserisci qui la logica per il calcolo
  };

  return (
    <div className="p-4">
      <h1>Convertitore Classi di Resistenza Calcestruzzo</h1>
      <p>Da Rck a classi C (es. C25/30) e viceversa</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <button onClick={calculateResult} className="bg-blue-500 text-white p-2 rounded-lg">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default ConvertitoreClassiCalcestruzzoCalculator;