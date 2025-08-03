"use client";
import React, { useState } from 'react';

const KwatthKwCalculator: React.FC = () => {
  const [kwattH, setKwattH] = useState(0);
  const [kwatt, setKwatt] = useState(0);

  const handleKwattHChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setKwattH(value);
    setKwatt(value * 1000);
  };

  return (
    <div className="p-4">
      <h1>Da KWatt/h a KWatt</h1>
      <p>Calcolatore per convertire KWatt/h in KWatt</p>
      <input type="number" value={kwattH} onChange={handleKwattHChange} className="border p-2 m-2" />
      <p>Il risultato è: {kwatt} KWatt</p>
    </div>
  );
};

export default KwatthKwCalculator;