"use client";
import React, { useState } from 'react';

const InterpolazioneLineareBilineareCalculator: React.FC = () => {
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  // Funzione per il calcolo
  const calculateResult = () => {
    // Implementazione del calcolo
    setResult(0); // Sostituire con il calcolo effettivo
  };

  return (
    <div className="p-4">
      <h1>Interpolazione Lineare e Bilineare Calculator</h1>
      <p>Per la stima di valori intermedi da tabelle</p>
      <input type="number" value={input1} onChange={(e) => setInput1(parseInt(e.target.value))} className="p-2 m-2 border rounded" />
      <input type="number" value={input2} onChange={(e) => setInput2(parseInt(e.target.value))} className="p-2 m-2 border rounded" />
      <button onClick={calculateResult} className="p-2 bg-blue-500 text-white rounded">Calcola</button>
      <p>Risultato: {result}</p>
    </div>
  );
};

export default InterpolazioneLineareBilineareCalculator;