"use client";
import React, { useState } from 'react';

interface CalculatorState {
  ricavi: number;
  spese: number;
  aliquota: number;
  acconto1: number;
  acconto2: number;
  saldo: number;
}

const TasseRegimeForfettarioCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    ricavi: 0,
    spese: 0,
    aliquota: 15, 
    acconto1: 0,
    acconto2: 0,
    saldo: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorState((prevState) => ({ ...prevState, [name]: parseFloat(value) }));
  };

  const calculateTaxes = () => {
    const { ricavi, spese, aliquota } = calculatorState;
    const reddito = ricavi - spese;
    const imposta = reddito * (aliquota / 100);
    const acconto1 = imposta * 0.4;
    const acconto2 = imposta * 0.6;
    const saldo = imposta - acconto1 - acconto2;
    setCalculatorState((prevState) => ({ ...prevState, acconto1, acconto2, saldo, imposta: imposta }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1>Calcolatore Tasse Regime Forfettario (con simulazione acconti e saldi)</h1>
      <p>Calcola le tasse dovute con il regime forfettario, simulando gli acconti e il saldo.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="ricavi" className="block text-gray-700 font-bold mb-2">Ricavi:</label>
          <input
            type="number"
            id="ricavi"
            name="ricavi"
            value={calculatorState.ricavi}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="spese" className="block text-gray-700 font-bold mb-2">Spese:</label>
          <input
            type="number"
            id="spese"
            name="spese"
            value={calculatorState.spese}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="aliquota" className="block text-gray-700 font-bold mb-2">Aliquota (%):</label>
          <input
            type="number"
            id="aliquota"
            name="aliquota"
            value={calculatorState.aliquota}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button onClick={calculateTaxes} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Calcola
      </button>
      <div className="mt-4">
        <p className="font-bold">Imposta:</p> <p>{calculatorState.acconto1 + calculatorState.acconto2 + calculatorState.saldo}</p>
        <p className="font-bold">Acconto 1:</p> <p>{calculatorState.acconto1}</p>
        <p className="font-bold">Acconto 2:</p> <p>{calculatorState.acconto2}</p>
        <p className="font-bold">Saldo:</p> <p>{calculatorState.saldo}</p>
      </div>
    </div>
  );
};

export default TasseRegimeForfettarioCalculator;
