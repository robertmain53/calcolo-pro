"use client";
import React, { useState } from 'react';

const CalcoloPlintoFondazioneCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value) || 0);
  };

  const calculateResult = () => {
    // Inserisci qui il calcolo specifico per il plinto di fondazione
    setResult(input * 2); // Esempio di calcolo fittizio
  };

  return (
    <div className="p-4">
      <h1>CalcoloPlintoFondazione Calculator</h1>
      <p>Centrato e eccentrico (NTC 2018, EC7)</p>
      <input type="number" value={input} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <button onClick={calculateResult} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default CalcoloPlintoFondazioneCalculator;