"use client";
import React, { useState } from 'react';

interface CalculatorState {
  profitto: number;
  ires: number;
  irap: number;
}

const CalcoloIresIrapSrlSrlsCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({ profitto: 0, ires: 0, irap: 0 });

  const handleProfittoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const profitto = parseFloat(event.target.value) || 0;
    setCalculatorState({ ...calculatorState, profitto, ires: calculateIres(profitto), irap: calculateIrap(profitto) });
  };

  const calculateIres = (profitto: number): number => {
    // Inserire logica di calcolo IRES
    // Questo è un esempio, sostituire con la logica corretta
    return profitto * 0.24;
  };

  const calculateIrap = (profitto: number): number => {
    // Inserire logica di calcolo IRAP
    // Questo è un esempio, sostituire con la logica corretta
    return profitto * 0.19;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1>Calcolatore IRES e IRAP per SRL e SRLS</h1>
      <p>Calcola rapidamente IRES e IRAP per SRL e SRLS.</p>
      <div className="mb-4">
        <label htmlFor="profitto" className="block text-gray-700 font-bold mb-2">Profitto:</label>
        <input
          type="number"
          id="profitto"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={calculatorState.profitto}
          onChange={handleProfittoChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">IRES:</label>
        <p className="text-gray-900 text-lg font-medium">{calculatorState.ires.toFixed(2)} €</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">IRAP:</label>
        <p className="text-gray-900 text-lg font-medium">{calculatorState.irap.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CalcoloIresIrapSrlSrlsCalculator;
