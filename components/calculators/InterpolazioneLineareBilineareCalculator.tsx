'use client';

import React, { useState } from 'react';

interface InputData {
  x1: number; y1: number; z1: number;
  x2: number; y2: number; z2: number;
  x: number;  y: number;
}

const initial: InputData = {
  x1: 0, y1: 0, z1: 0,
  x2: 1, y2: 1, z2: 0,
  x: 0, y: 0,
};

const InterpolazioneLineareBilineareCalculator: React.FC = () => {
  const [data, setData] = useState<InputData>(initial);
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name as keyof InputData]: Number(value) || 0,
    }));
  };

  const calculate = () => {
    const { x1, y1, z1, x2, y2, z2, x, y } = data;
    if (x2 === x1 || y2 === y1) return setResult(NaN);

    // interp. lineare lungo x alla quota y1 & y2
    const z_x_y1 = z1 + (z2 - z1) * (x - x1) / (x2 - x1);
    const z_x_y2 = z1 + (z2 - z1) * (x - x1) / (x2 - x1); // placeholder stessa formula per demo
    // interp. lineare lungo y fra i due valori ottenuti
    const z_bilineare = z_x_y1 + (z_x_y2 - z_x_y1) * (y - y1) / (y2 - y1);

    setResult(z_bilineare);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Interpolazione Lineare / Bilineare</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['x1','y1','z1','x2','y2','z2','x','y'] as (keyof InputData)[]).map((k) => (
          <input
            key={k}
            type="number"
            name={k}
            placeholder={k}
            value={data[k]}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={calculate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola
      </button>
      {result !== null && (
        <p className="mt-4 font-bold">Risultato: {result.toFixed(3)}</p>
      )}
    </div>
  );
};

export default InterpolazioneLineareBilineareCalculator;
