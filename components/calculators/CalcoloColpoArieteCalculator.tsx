"use client";
import React, { useState } from 'react';

const CalcoloColpoArieteCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  const calculateResult = () => {
    // Inserisci qui la logica per il calcolo del Colpo d'Ariete
  };

  return (
    <div className="p-4">
      <h1>Calcolo del Colpo d'Ariete: Formula di Allievi per chiusura rapida</h1>
      <p>Formula di Allievi per chiusura rapida</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <button onClick={calculateResult} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloColpoArieteCalculator;