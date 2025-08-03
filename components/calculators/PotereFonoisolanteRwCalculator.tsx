"use client";
import React, { useState } from 'react';

interface RwCalculatorProps {
  title: string;
  description: string;
}

const PotereFonoisolanteRwCalculator: React.FC<RwCalculatorProps> = ({ title, description }) => {
  const [frequency, setFrequency] = useState<number[]>([]);
  const [levelDifference, setLevelDifference] = useState<number[]>([]);
  const [rw, setRw] = useState<number | null>(null);

  const handleFrequencyChange = (index: number, value: string) => {
    const newFrequency = [...frequency];
    newFrequency[index] = parseFloat(value);
    setFrequency(newFrequency);
  };

  const handleLevelDifferenceChange = (index: number, value: string) => {
    const newLevelDifference = [...levelDifference];
    newLevelDifference[index] = parseFloat(value);
    setLevelDifference(newLevelDifference);
  };

  const calculateRw = () => {
    // Aggiungere qui la logica di calcolo del valore Rw in base a frequenza e differenza di livello
    // Questo è un esempio semplificato, sostituire con la formula corretta
    if (frequency.length > 0 && levelDifference.length > 0 && frequency.length === levelDifference.length) {
      const sum = frequency.reduce((acc, val, i) => acc + val - levelDifference[i], 0);
      setRw(sum / frequency.length);
    } else {
      setRw(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="frequency">
            Frequenze (Hz):
          </label>
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={frequency[index] || ''}
              onChange={(e) => handleFrequencyChange(index, e.target.value)}
            />
          ))}
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="levelDifference">
            Differenza di Livello (dB):
          </label>
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={levelDifference[index] || ''}
              onChange={(e) => handleLevelDifferenceChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={calculateRw}
      >
        Calcola Rw
      </button>
      {rw !== null && (
        <p className="mt-4 text-lg font-bold">Rw: {rw.toFixed(2)} dB</p>
      )}
    </div>
  );
};

export default PotereFonoisolanteRwCalculator;
