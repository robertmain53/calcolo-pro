"use client";
import React, { useState } from 'react';

const CalcoloPressioneVentoCantiereCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  const calculatePressure = () => {
    // Inserisci qui il calcolo della pressione del vento
    setResult(inputValue * 2);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Pressione del Vento su Elementi di Cantiere</h1>
      <p>(es. teli, cartelloni)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <button onClick={calculatePressure} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloPressioneVentoCantiereCalculator;