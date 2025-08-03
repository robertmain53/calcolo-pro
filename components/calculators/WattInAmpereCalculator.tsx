"use client";
import React, { useState } from 'react';

interface WattAmpereCalculatorProps {
  title: string;
  description: string;
}

const WattAmpereCalculator: React.FC<WattAmpereCalculatorProps> = ({ title, description }) => {
  const [watt, setWatt] = useState<number | ''>('');
  const [voltage, setVoltage] = useState<number | ''>('');
  const [ampere, setAmpere] = useState<number | null>(null);

  const calculateAmpere = () => {
    if (watt && voltage) {
      setAmpere(parseFloat(watt) / parseFloat(voltage));
    } else {
      setAmpere(null);
    }
  };

  const handleWattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWatt(event.target.value);
    calculateAmpere();
  };

  const handleVoltageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoltage(event.target.value);
    calculateAmpere();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="watt">
          Potenza (Watt):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="watt"
          value={watt || ''}
          onChange={handleWattChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="voltage">
          Tensione (Volt):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="voltage"
          value={voltage || ''}
          onChange={handleVoltageChange}
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateAmpere}
        >
          Calcola Ampere
        </button>
      </div>
      {ampere !== null && (
        <p className="text-xl font-bold">Corrente (Ampere): {ampere.toFixed(2)}</p>
      )}
    </div>
  );
};

export default WattAmpereCalculator;
