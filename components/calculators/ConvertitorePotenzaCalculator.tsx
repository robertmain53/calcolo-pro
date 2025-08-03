"use client";
import React, { useState } from 'react';

const ConvertitorePotenzaCalculator: React.FC = () => {
  const [watt, setWatt] = useState<number>(0);
  const [kilowatt, setKilowatt] = useState<number>(0);
  const [horsepower, setHorsepower] = useState<number>(0);
  const [cv, setCv] = useState<number>(0);

  const handleWattChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWatt(value);
    setKilowatt(value / 1000);
    setHorsepower(value * 0.00134102);
    setCv(value * 0.00135962);
  };

  return (
    <div className="p-4">
      <h1>Convertitore Potenza (W, kW, HP, CV)</h1>
      <p>Per applicazioni meccaniche ed elettriche</p>
      <input type="number" value={watt} onChange={handleWattChange} className="border p-2 m-2" />
      <p>Kilowatt: {kilowatt}</p>
      <p>Horsepower: {horsepower}</p>
      <p>Cavalli Vapore (CV): {cv}</p>
    </div>
  );
};

export default ConvertitorePotenzaCalculator;