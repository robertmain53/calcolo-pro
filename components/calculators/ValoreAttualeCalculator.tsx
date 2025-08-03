"use client";
import React, { useState } from 'react';

const ValoreAttualeCalculator: React.FC = () => {
  const [futureValue, setFutureValue] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [presentValue, setPresentValue] = useState<number>(0);

  const calculatePresentValue = () => {
    const discountFactor = 1 / Math.pow(1 + interestRate, years);
    const pv = futureValue * discountFactor;
    setPresentValue(pv);
  };

  return (
    <div className="p-4">
      <h1>Valore Attuale Calculator</h1>
      <p>Permette di determinare l'importo equivalente al tempo presente di una o più prestazioni monetarie, o comunque valutabili economicamente, da ricevere o da effettuare a epoche future</p>
      <input type="number" value={futureValue} onChange={(e) => setFutureValue(parseFloat(e.target.value))} />
      <input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} />
      <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
      <button onClick={calculatePresentValue}>Calcola Valore Attuale</button>
      <p>Valore Attuale: {presentValue}</p>
    </div>
  );
};

export default ValoreAttualeCalculator;