"use client";
import React, { useState } from 'react';

const CalcolatoreDerivateCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [risultato, setRisultato] = useState<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value));
    // Inserire qui la logica per il calcolo delle derivate
  };

  return (
    <div className="p-4">
      <h1>Calcolatore Derivate</h1>
      <p>Calcola le derivate matematiche</p>
      <input type="number" value={input} onChange={handleInput} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {risultato}</p>
    </div>
  );
};

export default CalcolatoreDerivateCalculator;