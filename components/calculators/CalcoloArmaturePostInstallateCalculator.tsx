"use client";
import React, { useState } from 'react';

const CalcoloArmaturePostInstallateCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica per il calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Calcolo Armature Post-Installate</h1>
      <p>Ancoraggi chimici e meccanici (EC2, EOTA)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="p-2 m-2 border rounded-lg">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloArmaturePostInstallateCalculator;