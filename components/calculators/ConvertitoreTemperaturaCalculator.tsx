"use client";
import React, { useState } from 'react';

const ConvertitoreTemperaturaCalculator: React.FC = () => {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);

  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCelsius(value);
    setFahrenheit((value * 9/5) + 32);
    setKelvin(value + 273.15);
  };

  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFahrenheit(value);
    setCelsius((value - 32) * 5/9);
    setKelvin((value - 32) * 5/9 + 273.15);
  };

  const handleKelvinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setKelvin(value);
    setCelsius(value - 273.15);
    setFahrenheit((value - 273.15) * 9/5 + 32);
  };

  return (
    <div className="p-4">
      <h1>Convertitore di temperatura °C °F Kelvin</h1>
      <p>Questo calcolatore converte la temperatura tra Celsius, Fahrenheit e Kelvin.</p>
      <div className="flex flex-col space-y-4">
        <label>Celsius:</label>
        <input type="number" value={celsius} onChange={handleCelsiusChange} className="p-2 border border-gray-300 rounded" />
        <label>Fahrenheit:</label>
        <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} className="p-2 border border-gray-300 rounded" />
        <label>Kelvin:</label>
        <input type="number" value={kelvin} onChange={handleKelvinChange} className="p-2 border border-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ConvertitoreTemperaturaCalculator;