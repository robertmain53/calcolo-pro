"use client";
import React, { useState } from 'react';

interface CalculatorState {
  redditoLordo: number;
  ocf: number;
  tasse: number;
  redditoNetto: number;
}

const TassazioneConsulentiFinanziariOcfCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({ 
    redditoLordo: 0,
    ocf: 0,
    tasse: 0,
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
    // Calcolo tasse (logica semplificata per esempio)
    const tasse = calculatorState.redditoLordo * 0.25 - calculatorState.ocf; // esempio di calcolo
    const redditoNetto = calculatorState.redditoLordo - tasse;
    setCalculatorState((prevState) => ({...prevState, tasse, redditoNetto}));
  }, [calculatorState.redditoLordo, calculatorState.ocf]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Calcolatore Tassazione per Consulenti Finanziari (con OCF)</h1>
      <p>Calcolatore Tassazione per Consulenti Finanziari (con OCF)</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="redditoLordo" className="block text-gray-700 font-bold mb-2">Reddito Lordo:</label>
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
          <label htmlFor="ocf" className="block text-gray-700 font-bold mb-2">OCF:</label>
          <input
            type="number"
            id="ocf"
            name="ocf"
            value={calculatorState.ocf}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="tasse" className="block text-gray-700 font-bold mb-2">Tasse:</label>
          <input
            type="number"
            id="tasse"
            name="tasse"
            value={calculatorState.tasse}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="redditoNetto" className="block text-gray-700 font-bold mb-2">Reddito Netto:</label>
          <input
            type="number"
            id="redditoNetto"
            name="redditoNetto"
            value={calculatorState.redditoNetto}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
};

export default TassazioneConsulentiFinanziariOcfCalculator;
