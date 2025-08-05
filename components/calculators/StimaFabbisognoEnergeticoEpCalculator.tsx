'use client';

import React, { useState } from 'react';

interface Props {
  title: string;
  description: string;
}

type Climate = 'temperate' | 'cold' | 'hot';

const StimaFabbisognoEnergeticoEPCalculator: React.FC<Props> = ({ title, description }) => {
  const [surface, setSurface] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [zone, setZone] = useState<Climate>('temperate');
  const [ep, setEp] = useState<number | null>(null);

  const calcola = () => {
    const S = parseFloat(surface);
    const H = parseFloat(height);
    if (isNaN(S) || isNaN(H) || S <= 0 || H <= 0) return setEp(null);

    const k = zone === 'cold' ? 1.2 : zone === 'hot' ? 0.8 : 1;
    setEp(S * H * k);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Superficie (m²):</span>
        <input
          type="number"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Altezza (m):</span>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Zona climatica:</span>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value as Climate)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="temperate">Temperata</option>
          <option value="cold">Fredda</option>
          <option value="hot">Calda</option>
        </select>
      </label>

      <button
        type="button"
        onClick={calcola}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola
      </button>

      {ep !== null && (
        <p className="mt-4 text-lg font-bold text-indigo-700">
          Fabbisogno energetico: {ep.toFixed(2)} kWh
        </p>
      )}
    </div>
  );
};

export default StimaFabbisognoEnergeticoEPCalculator;
