"use client";
import React, { useState } from 'react';

const WattInAmpereCalculator: React.FC = () => {
  const [watt, setWatt] = useState<number>(0);
  const [ampere, setAmpere] = useState<number>(0);

  const handleWattChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWatt = parseFloat(e.target.value);
    setWatt(newWatt);
    setAmpere(newWatt / 230); // Assuming 230V
  };

  return (
    <div className="p-4">
      <h1>Watt In Ampere Calculator</h1>
      <p>Converte potenza in corrente con dimensionamento cavi, protezioni e verifiche normative CEI</p>
      <input type="number" value={watt} onChange={handleWattChange} className="border p-2 m-2" />
      <p>Watt: {watt}</p>
      <p>Ampere: {ampere}</p>
    </div>
  );
};

export default WattInAmpereCalculator;