"use client";
import React, { useState } from 'react';

interface PressureUnit {
  name: string;
  value: number;
}

const pressureUnits: PressureUnit[] = [
  { name: 'Pascal (Pa)', value: 1 },
  { name: 'Bar (bar)', value: 100000 },
  { name: 'Psi (psi)', value: 6894.76 },
  { name: 'Atmosfera (atm)', value: 101325 },
];

const ConvertitorePressioneCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PressureUnit>(pressureUnits[0]);
  const [toUnit, setToUnit] = useState<PressureUnit>(pressureUnits[1]);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCalculate = () => {
    const inputValueNumber = parseFloat(inputValue);
    if (!isNaN(inputValueNumber)) {
      const result = (inputValueNumber * fromUnit.value) / toUnit.value;
      setResult(result);
    } else {
      setResult(0);
    }
  };

  return (
    <div className="p-4">
      <h1>Convertitore Unità di Misura: Pressione (Pa, bar, psi, atm)</h1>
      <p>Converti facilmente tra Pascal, Bar, Psi e Atmosfere.</p>
      <div className="mb-4">
        <label htmlFor="inputValue" className="block text-gray-700 font-bold mb-2">Valore:</label>
        <input
          type="number"
          id="inputValue"
          value={inputValue}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fromUnit" className="block text-gray-700 font-bold mb-2">Da:</label>
        <select
          id="fromUnit"
          value={fromUnit}
          onChange={(e) => setFromUnit(pressureUnits.find((unit) => unit.name === e.target.value) || pressureUnits[0])}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {pressureUnits.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="toUnit" className="block text-gray-700 font-bold mb-2">A:</label>
        <select
          id="toUnit"
          value={toUnit}
          onChange={(e) => setToUnit(pressureUnits.find((unit) => unit.name === e.target.value) || pressureUnits[1])}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {pressureUnits.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCalculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Converti
      </button>
      <div className="mt-4">
        <p className="text-lg font-bold">Risultato: {result.toFixed(2)} {toUnit.name}</p>
      </div>
    </div>
  );
};

export default ConvertitorePressioneCalculator;
