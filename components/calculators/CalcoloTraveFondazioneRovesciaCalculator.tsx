'use client';

import React, { useState } from 'react';

interface CalculatorData {
  lunghezzaTrave: number;      // L (m)
  larghezzaTrave: number;      // b (m)
  altezzaTrave: number;        // h (m)
  moduloElasticita: number;    // E (MPa)
  momentoInerzia: number;      // I (m^4)
  coefficienteWinkler: number; // k_s (kN/m³)
  caricoDistribuito: number;   // q (kN/m)
}

const initialData: CalculatorData = {
  lunghezzaTrave: 0,
  larghezzaTrave: 0,
  altezzaTrave: 0,
  moduloElasticita: 0,
  momentoInerzia: 0,
  coefficienteWinkler: 0,
  caricoDistribuito: 0,
};

const CalcoloTraveFondazioneRovesciaCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>(initialData);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name as keyof CalculatorData]: Number(value) || 0,
    }));
  };

  const calculate = () => {
    // 👉 Placeholder: q · L (sostituisci con Winkler/Beam on elastic foundation)
    const { lunghezzaTrave, caricoDistribuito } = data;
    setRisultato(lunghezzaTrave * caricoDistribuito);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">
        Calcolo Trave di Fondazione Rovescia
      </h1>
      <p className="text-gray-600 mb-4">
        (modello suolo elastico di Winkler – versione semplificata)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-gray-700 font-bold">Lunghezza L (m):</span>
          <input
            type="number"
            name="lunghezzaTrave"
            value={data.lunghezzaTrave}
            onChange={handleInputChange}
            className="mt-1 border rounded w-full p-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">Larghezza b (m):</span>
          <input
            type="number"
            name="larghezzaTrave"
            value={data.larghezzaTrave}
            onChange={handleInputChange}
            className="mt-1 border rounded w-full p-2"
          />
        </label>

        {/* ➜ Aggiungi altri campi allo stesso modo */}
        <label className="block">
          <span className="text-gray-700 font-bold">Carico q (kN/m):</span>
          <input
            type="number"
            name="caricoDistribuito"
            value={data.caricoDistribuito}
            onChange={handleInputChange}
            className="mt-1 border rounded w-full p-2"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={calculate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola
      </button>

      {risultato !== null && (
        <p className="mt-4 text-xl font-bold text-indigo-700">
          Reazione massima: {risultato.toFixed(2)} kN
        </p>
      )}
    </div>
  );
};

export default CalcoloTraveFondazioneRovesciaCalculator;
