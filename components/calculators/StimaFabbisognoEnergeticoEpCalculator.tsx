"use client";
import React, { useState } from 'react';

interface EnergyNeedsCalculatorProps {
  title: string;
  description: string;
}

const StimaFabbisognoEnergeticoEPCalculator: React.FC<EnergyNeedsNeedsCalculatorProps> = ({ title, description }) => {
  const [surfaceArea, setSurfaceArea] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [climateZone, setClimateZone] = useState<string>('temperate'); // Default to temperate
  const [result, setResult] = useState<number | null>(null);

  const calculateEnergyNeeds = () => {
    if (surfaceArea === null || height === null) {
      setResult(null);
      return;
    }
    // Placeholder calculation - replace with actual formula
    const energyNeeds = surfaceArea * height * (climateZone === 'cold' ? 1.2 : (climateZone === 'hot' ? 0.8 : 1));
    setResult(energyNeeds);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="surfaceArea">
          Superficie (m²):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="surfaceArea"
          value={surfaceArea || ''}
          onChange={(e) => setSurfaceArea(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="height">
          Altezza (m):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="height"
          value={height || ''}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="climateZone">
          Zona climatica:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="climateZone"
          value={climateZone}
          onChange={(e) => setClimateZone(e.target.value)}
        >
          <option value="temperate">Temperata</option>
          <option value="cold">Fredda</option>
          <option value="hot">Calda</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={calculateEnergyNeeds}
      >
        Calcola
      </button>
      {result !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">Fabbisogno Energetico stimato: {result.toFixed(2)} unità</p>
        </div>
      )}
    </div>
  );
};

export default StimaFabbisognoEnergeticoEPCalculator;
