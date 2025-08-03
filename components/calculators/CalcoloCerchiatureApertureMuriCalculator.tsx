"use client";
import React, { useState } from 'react';

const CalcoloCerchiatureApertureMuriCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    // Perform calculation based on input value
    setResult(inputValue * 2);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Cerchiature per Aperture in Muri Portanti: Architravi in acciaio e cordoli</h1>
      <p>Architravi in acciaio e cordoli</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p className="text-lg">Risultato: {result}</p>
    </div>
  );
};

export default CalcoloCerchiatureApertureMuriCalculator;