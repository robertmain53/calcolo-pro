'use client';

import React, { useState } from 'react';

interface SoilData {
  fines: number;       // % passante al 0,063 mm
  cohesion: number;    // c (kPa)
  plasticity: number;  // Ip
}

const initialSoil: SoilData = {
  fines: 0,
  cohesion: 0,
  plasticity: 0,
};

const ClassificazioneTerreniCalculator: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData>(initialSoil);
  const [classification, setClassification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoilData(prev => ({
      ...prev,
      [name as keyof SoilData]: Number(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fines, plasticity } = soilData;

    // ➜ logica semplificata di esempio
    let result = '';
    if (fines > 50 && plasticity > 7) result = 'Clay (CH/CL)';
    else if (fines > 50) result = 'Silt (MH/ML)';
    else result = 'Sand / Gravel (SW, SP, GW, GP)';

    setClassification(result);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">
        Classificazione Terreni (USCS / AGI)
      </h1>
      <p className="text-gray-600 mb-4">
        Inserisci percentuale di fini, coesione e indice di plasticità.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-bold text-gray-700">Fini &lt; 0,063&nbsp;mm (%):</span>
          <input
            type="number"
            name="fines"
            value={soilData.fines}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700">Coesione c (kPa):</span>
          <input
            type="number"
            name="cohesion"
            value={soilData.cohesion}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700">Indice di plasticità Ip:</span>
          <input
            type="number"
            name="plasticity"
            value={soilData.plasticity}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Classifica
        </button>
      </form>

      {classification && (
        <p className="mt-4 text-green-600 font-bold">
          Classificazione: {classification}
        </p>
      )}
    </div>
  );
};

export default ClassificazioneTerreniCalculator;
