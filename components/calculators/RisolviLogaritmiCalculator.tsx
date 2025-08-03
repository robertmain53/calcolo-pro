"use client";
import React, { useState } from 'react';

const RisolviLogaritmiCalculator: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<number>(0);
  const [inputBase, setInputBase] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    setResult(Math.log(inputNumber) / Math.log(inputBase));
  };

  return (
    <div className="p-4">
      <h1>Risolvi Logaritmi Calculator</h1>
      <p>Il calcolatore consente di calcolare il logaritmo di un numero in una base specificata.</p>
      <input type="number" className="p-2 m-2" value={inputNumber} onChange={(e) => setInputNumber(parseInt(e.target.value))} />
      <input type="number" className="p-2 m-2" value={inputBase} onChange={(e) => setInputBase(parseInt(e.target.value))} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCalculate}>Calcola</button>
      {result && <p className="m-2">Il risultato è: {result}</p>}
    </div>
  );
};

export default RisolviLogaritmiCalculator;