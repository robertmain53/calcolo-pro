"use client";
import React, { useState } from 'react';

interface InterpolazioneLineareBilineareData {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  x: number;
  y: number;
}

const InterpolazioneLineareBilineareCalculator: React.FC = () => {
  const [data, setData] = useState<InterpolazioneLineareBilineareData | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculate = () => {
    if (!data) return;
    const {
      x1, y1, z1, x2, y2, z2, x, y
    } = data;

    // Interpolazione lineare
    const zInterpolazioneLineare = z1 + (z2 - z1) * (x - x1) / (x2 - x1);

    // Interpolazione bilineare
    const zInterpolazioneBilineare = 
      z1 + (z2 - z1) * (x - x1) / (x2 - x1) + 
      (z1 + (z2 - z1) * (x - x1) / (x2 - x1) - z1) * (y - y1) / (y2 - y1);

    setResult(zInterpolazioneBilineare);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Interpolazione Lineare e Bilineare</h1>
      <p className="mb-4">Calcola l'interpolazione lineare e bilineare da una tabella di valori.</p>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="x1"
          placeholder="x1"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="y1"
          placeholder="y1"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="z1"
          placeholder="z1"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="x2"
          placeholder="x2"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="y2"
          placeholder="y2"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="z2"
          placeholder="z2"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="x"
          placeholder="x"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="y"
          placeholder="y"
          className="border border-gray-300 p-2 rounded"
          onChange={handleInputChange}
        />
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calcola</button>
      {result !== null && (
        <p className="mt-4">Risultato: {result}</p>
      )}
    </div>
  );
};

export default InterpolazioneLineareBilineareCalculator;
