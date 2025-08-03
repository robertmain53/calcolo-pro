"use client";
import React, { useState } from 'react';

const VerificaCondensaGlaserCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Calcolo in tempo reale
  React.useEffect(() => {
    setResult(inputValue * 2); // Esempio di calcolo
  }, [inputValue]);

  return (
    <div className="p-4">
      <h1>VerificaCondensaGlaserCalculator</h1>
      <p>Metodo di Glaser (UNI EN ISO 13788)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <p>Risultato: {result}</p>
    </div>
  );
};

export default VerificaCondensaGlaserCalculator;