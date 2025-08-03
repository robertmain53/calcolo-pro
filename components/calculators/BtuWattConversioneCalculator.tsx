"use client";
import React, { useState } from 'react';

const BtuWattConversioneCalculator: React.FC = () => {
  const [btu, setBtu] = useState<number>(0);
  const [watt, setWatt] = useState<number>(0);

  const handleBtuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const btuValue = parseFloat(e.target.value);
    setBtu(btuValue);
    setWatt(btuValue * 0.293071);
  };

  return (
    <div className="p-4">
      <h1>Conversione BTU/h in Watt</h1>
      <p>Per effettuare la conversione della potenza da BTU all’ora (BTU / ora) in Watt (W)</p>
      <input type="number" value={btu} onChange={handleBtuChange} className="border p-2 m-2" />
      <p>Watt: {watt}</p>
    </div>
  );
};

export default BtuWattConversioneCalculator;