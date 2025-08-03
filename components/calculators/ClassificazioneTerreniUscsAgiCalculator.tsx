"use client";
import React, { useState } from 'react';

interface SoilData {
  fines: number;
  cohesion: number;
  plasticity: number;
}

const ClassificazioneTerreniCalculator: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [classification, setClassification] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSoilData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aggiungi qui la logica di classificazione basata su soilData
    // Questo è un esempio placeholder, sostituisci con la logica effettiva
    if (soilData) {
      const { fines, cohesion, plasticity } = soilData;
      let result = "";
      if (fines > 50 && plasticity > 7) {
        result = "Clay";
      } else if (fines > 50 && plasticity <= 7) {
        result = "Silt";
      } else {
        result = "Sand";
      }
      setClassification(result);
    }
  };

  return (
    <div className="p-4">
      <h1>Classificazione dei Terreni: Triangolo USCS e AGI</h1>
      <p>Questo calcolatore aiuta a classificare i terreni in base ai parametri del triangolo USCS e AGI.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fines" className="block text-gray-700 font-bold mb-2">Percentuale di fini:</label>
          <input type="number" id="fines" name="fines" value={soilData?.fines || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="cohesion" className="block text-gray-700 font-bold mb-2">Coesione:</label>
          <input type="number" id="cohesion" name="cohesion" value={soilData?.cohesion || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="plasticity" className="block text-gray-700 font-bold mb-2">Indice di plasticità:</label>
          <input type="number" id="plasticity" name="plasticity" value={soilData?.plasticity || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Classifica
        </button>
      </form>
      {classification && (
        <div className="mt-4">
          <p className="text-green-500 font-bold">Classificazione del terreno: {classification}</p>
        </div>
      )}
    </div>
  );
};

export default ClassificazioneTerreniCalculator;
