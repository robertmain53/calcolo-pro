"use client";
import React, { useState } from 'react';

interface Temperature {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

const ConvertitoreTemperaturaCalculator: React.FC = () => {
  const [celsius, setCelsius] = useState<number>(0);
  const [fahrenheit, setFahrenheit] = useState<number>(32);
  const [kelvin, setKelvin] = useState<number>(273.15);

  const handleCelsiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setCelsius(value);
    setFahrenheit((value * 9/5) + 32);
    setKelvin(value + 273.15);
  };

  const handleFahrenheitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setFahrenheit(value);
    setCelsius((value - 32) * 5/9);
    setKelvin((value - 32) * 5/9 + 273.15);
  };

  const handleKelvinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setKelvin(value);
    setCelsius(value - 273.15);
    setFahrenheit((value - 273.15) * 9/5 + 32);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Convertitore di temperatura °C °F Kelvin</h1>
      <p>Converti facilmente tra gradi Celsius, Fahrenheit e Kelvin.</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label htmlFor="celsius" className="block text-gray-700 font-bold mb-2">Celsius:</label>
          <input
            type="number"
            id="celsius"
            value={celsius}
            onChange={handleCelsiusChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="fahrenheit" className="block text-gray-700 font-bold mb-2">Fahrenheit:</label>
          <input
            type="number"
            id="fahrenheit"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="kelvin" className="block text-gray-700 font-bold mb-2">Kelvin:</label>
          <input
            type="number"
            id="kelvin"
            value={kelvin}
            onChange={handleKelvinChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertitoreTemperaturaCalculator;
