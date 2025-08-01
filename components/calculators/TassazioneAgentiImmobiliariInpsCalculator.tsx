"use client";
import React, { useState } from 'react';

interface CalculatorState {
  redditoLordo: number;
  speseDeducibili: number;
  redditoNetto: number;
}

const TassazioneAgentiImmobiliariInpsCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    redditoLordo: 0,
    speseDeducibili: 0,
    redditoNetto: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorState((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    const calcolaRedditoNetto = () => {
      const { redditoLordo, speseDeducibili } = calculatorState;
      const redditoNetto = redditoLordo - speseDeducibili;
      setCalculatorState((prevState) => ({ ...prevState, redditoNetto }));
    };
    calcolaRedditoNetto();
  }, [calculatorState.redditoLordo, calculatorState.speseDeducibili]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1>Calcolatore Tassazione per Agenti Immobiliari (con INPS Commercianti)</h1>
      <p>Calcolatore Tassazione per Agenti Immobiliari (con INPS Commercianti)</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="redditoLordo" className="block text-gray-700 font-bold mb-2">
            Reddito Lordo:
          </label>
          <input
            type="number"
            id="redditoLordo"
            name="redditoLordo"
            value={calculatorState.redditoLordo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="speseDeducibili" className="block text-gray-700 font-bold mb-2">
            Spese Deducibili:
          </label>
          <input
            type="number"
            id="speseDeducibili"
            name="speseDeducibili"
            value={calculatorState.speseDeducibili}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-bold mb-2">
          Reddito Netto:
        </label>
        <p className="text-lg font-bold text-green-500">
          {calculatorState.redditoNetto.toFixed(2)} €
        </p>
      </div>
    </div>
  );
};

export default TassazioneAgentiImmobiliariInpsCalculator;
