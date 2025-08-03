"use client";
import React, { useState } from 'react';

const CalcoloLunghezzaAncoraggioSovrapposizioneCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    // Perform calculation here
  };

  return (
    <div className="p-4">
      <h1>Calcolo Lunghezza di Ancoraggio e Sovrapposizione Armature</h1>
      <p>Per barre ad aderenza migliorata (NTC 2018)</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="p-2 m-2 border rounded-lg" />
      <div className="m-2">Risultato: {result}</div>
    </div>
  );
};

export default CalcoloLunghezzaAncoraggioSovrapposizioneCalculator;