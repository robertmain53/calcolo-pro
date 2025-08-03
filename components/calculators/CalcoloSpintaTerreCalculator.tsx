"use client";
import React, { useState } from 'react';

interface CalculatorData {
  angoloAttrito: number;
  coesione: number;
  pesoVolumico: number;
  angoloInclinazione: number;
  profondita: number;
}

const CalcoloSpintaTerreCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const [spintaAttiva, setSpintaAttiva] = useState<number | null>(null);
  const [spintaPassiva, setSpintaPassiva] = useState<number | null>(null);
  const [spintaRiposo, setSpintaRiposo] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculate = () => {
    if (!calculatorData) return;
    // Aggiungi qui la logica di calcolo per le spinte attiva, passiva e a riposo
    // Utilizzando le formule di Coulomb e Rankine
    // ...
    // Esempi di calcolo (sostituisci con le formule corrette):
    const ka = 0; // Calcolo coefficiente di spinta attiva
    const kp = 0; // Calcolo coefficiente di spinta passiva
    const kr = 0; // Calcolo coefficiente di spinta a riposo
    setSpintaAttiva(ka * calculatorData.pesoVolumico * calculatorData.profondita);
    setSpintaPassiva(kp * calculatorData.pesoVolumico * calculatorData.profondita);
    setSpintaRiposo(kr * calculatorData.pesoVolumico * calculatorData.profondita);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Spinta delle Terre</h1>
      <p className="text-gray-600 mb-4">Calcolo della spinta attiva, passiva e a riposo (teorie di Coulomb e Rankine)</p>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="angoloAttrito"
          placeholder="Angolo di attrito (gradi)"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="coesione"
          placeholder="Coesione (kPa)"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="pesoVolumico"
          placeholder="Peso volumico (kN/m³)"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="angoloInclinazione"
          placeholder="Angolo di inclinazione (gradi)"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="profondita"
          placeholder="Profondità (m)"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
      </div>
      <button onClick={calculate} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      <div className="mt-4">
        <p>Spinta Attiva: {spintaAttiva ? spintaAttiva.toFixed(2) + " kPa" : "-"}</p>
        <p>Spinta Passiva: {spintaPassiva ? spintaPassiva.toFixed(2) + " kPa" : "-"}</p>
        <p>Spinta a Riposo: {spintaRiposo ? spintaRiposo.toFixed(2) + " kPa" : "-"}</p>
      </div>
    </div>
  );
};

export default CalcoloSpintaTerreCalculator;
