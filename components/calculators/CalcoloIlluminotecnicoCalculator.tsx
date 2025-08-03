"use client";
import React, { useState } from 'react';

const CalcoloIlluminotecnicoCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo del numero di lampade necessarie

  return (
    <div className="p-4">
      <h1>Calcolo Illuminotecnico (Metodo del Flusso Totale)</h1>
      <p>Per determinare il numero di lampade necessarie</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Numero di lampade necessarie: {result}</div>
    </div>
  );
};

export default CalcoloIlluminotecnicoCalculator;