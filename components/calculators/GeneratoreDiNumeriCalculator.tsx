"use client";
import React, { useState } from 'react';

const GeneratoreDiNumeriCalculator: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100);
    setRandomNumber(newRandomNumber);
  };

  return (
    <div className="p-4">
      <h1>Generatore Di Numeri Casuali</h1>
      <p>Genera uno o più numeri casuali.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateRandomNumber}>Genera Numero Casuale</button>
      <p className="mt-4">Numero Casuale Generato: {randomNumber}</p>
    </div>
  );
};

export default GeneratoreDiNumeriCalculator;