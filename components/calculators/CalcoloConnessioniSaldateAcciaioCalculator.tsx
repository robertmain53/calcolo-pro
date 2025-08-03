"use client";
import React, { useState } from 'react';

const CalcoloConnessioniSaldateAcciaioCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Connessioni Saldate in Acciaio: A piena e parziale penetrazione (EC3)</h1>
      <p>A piena e parziale penetrazione (EC3)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloConnessioniSaldateAcciaioCalculator;