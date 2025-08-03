"use client";
import React, { useState } from 'react';

interface CalculatorProps {
  title: string;
  description: string;
}

const CalcoloCorrenteCortocircuitoCalculator: React.FC<CalculatorProps> = ({ title, description }) => {
  const [voltage, setVoltage] = useState<number | ''>('');
  const [resistance, setResistance] = useState<number | ''>('');
  const [current, setCurrent] = useState<number | null>(null);

  const calculateCurrent = () => {
    if (voltage && resistance) {
      setCurrent(parseFloat(voltage) / parseFloat(resistance));
    } else {
      setCurrent(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="voltage">
          Tensione (V):
        </label>
        <input
          type="number"
          id="voltage"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="resistance">
          Resistenza (Ω):
        </label>
        <input
          type="number"
          id="resistance"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={resistance}
          onChange={(e) => setResistance(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculateCurrent}
      >
        Calcola Corrente
      </button>
      {current !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Corrente (A): {current.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCorrenteCortocircuitoCalculator;
