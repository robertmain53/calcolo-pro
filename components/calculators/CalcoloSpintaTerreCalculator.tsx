'use client';

import React, { useState } from 'react';

interface CalculatorData {
  angoloAttrito: number;        // φ (°)
  coesione: number;             // c  (kPa)
  pesoVolumico: number;         // γ  (kN/m³)
  angoloInclinazione: number;   // β (°) inclinazione del terreno
  profondita: number;           // H  (m)
}

const initialData: CalculatorData = {
  angoloAttrito: 0,
  coesione: 0,
  pesoVolumico: 0,
  angoloInclinazione: 0,
  profondita: 0,
};

const CalcoloSpintaTerreCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>(initialData);
  const [spintaAttiva, setSpintaAttiva] = useState<number | null>(null);
  const [spintaPassiva, setSpintaPassiva] = useState<number | null>(null);
  const [spintaRiposo, setSpintaRiposo] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name as keyof CalculatorData]: Number(value) || 0,
    }));
  };

  const calculate = () => {
    const { angoloAttrito, coesione, pesoVolumico, angoloInclinazione, profondita } = data;

    // —— Calcolo semplificato dei coefficienti (placeholder) ——
    const rad = Math.PI / 180;
    const φ = angoloAttrito * rad;
    const β = angoloInclinazione * rad;

    // Rankine semplificato (terreno orizzontale, parete verticale)
    const ka = Math.tan(Math.PI / 4 - φ / 2) ** 2;          // coeff. spinta attiva
    const kp = Math.tan(Math.PI / 4 + φ / 2) ** 2;          // coeff. spinta passiva
    const k0 = 1 - Math.sin(φ);                             // coeff. spinta a riposo

    // Pressione lineare: σ = k · γ · H   (trascurata la coesione qui)
    setSpintaAttiva(ka * pesoVolumico * profondita);
    setSpintaPassiva(kp * pesoVolumico * profondita);
    setSpintaRiposo(k0 * pesoVolumico * profondita);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Spinta delle Terre</h1>
      <p className="text-gray-600 mb-4">
        Spinta attiva, passiva e a riposo (formule di Rankine – segnaposto)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="angoloAttrito"
          value={data.angoloAttrito}
          placeholder="Angolo di attrito φ (°)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="coesione"
          value={data.coesione}
          placeholder="Coesione c (kPa)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="pesoVolumico"
          value={data.pesoVolumico}
          placeholder="Peso volumico γ (kN/m³)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="angoloInclinazione"
          value={data.angoloInclinazione}
          placeholder="Inclinazione β (°)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="profondita"
          value={data.profondita}
          placeholder="Profondità H (m)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
      </div>

      <button
        type="button"
        onClick={calculate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Calcola
      </button>

      <div className="mt-6 space-y-1 text-gray-800">
        <p>Spinta Attiva: {spintaAttiva !== null ? `${spintaAttiva.toFixed(2)} kPa` : '-'}</p>
        <p>Spinta Passiva: {spintaPassiva !== null ? `${spintaPassiva.toFixed(2)} kPa` : '-'}</p>
        <p>Spinta a Riposo: {spintaRiposo !== null ? `${spintaRiposo.toFixed(2)} kPa` : '-'}</p>
      </div>
    </div>
  );
};

export default CalcoloSpintaTerreCalculator;
