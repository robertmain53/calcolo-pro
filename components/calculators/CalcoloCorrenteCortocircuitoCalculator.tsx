'use client';

import React, { useState } from 'react';

interface CalculatorProps {
  title: string;
  description: string;
}

const CalcoloCorrenteCortocircuitoCalculator: React.FC<CalculatorProps> = ({
  title,
  description,
}) => {
  // 🔹 Gestiamo tensione e resistenza come stringhe controllate dal form
  const [voltage, setVoltage] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [current, setCurrent] = useState<number | null>(null);

  const calculateCurrent = () => {
    const v = parseFloat(voltage);
    const r = parseFloat(resistance);

    if (!isNaN(v) && !isNaN(r) && r !== 0) {
      setCurrent(v / r);
    } else {
      setCurrent(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* —— Input Tensione —— */}
      <div className="mb-4">
        <label htmlFor="voltage" className="block text-gray-700 font-bold mb-2">
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

      {/* —— Input Resistenza —— */}
      <div className="mb-4">
        <label htmlFor="resistance" className="block text-gray-700 font-bold mb-2">
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
        type="button"
        onClick={calculateCurrent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcola Corrente
      </button>

      {current !== null && (
        <p className="mt-4 text-xl font-bold">
          Corrente (A): {current.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default CalcoloCorrenteCortocircuitoCalculator;
