'use client';

import React, { useState } from 'react';

interface PressureUnit {
  name: string;
  value: number; // fattore rispetto al Pascal
}

const pressureUnits: PressureUnit[] = [
  { name: 'Pascal (Pa)', value: 1 },
  { name: 'Bar (bar)', value: 100_000 },
  { name: 'Psi (psi)', value: 6_894.76 },
  { name: 'Atmosfera (atm)', value: 101_325 },
];

const findUnit = (name: string) => pressureUnits.find(u => u.name === name)!;

const ConvertitorePressioneCalculator: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(pressureUnits[0].name);
  const [toUnit, setToUnit] = useState<string>(pressureUnits[1].name);
  const [result, setResult] = useState<number>(0);

  const handleCalculate = () => {
    const v = parseFloat(inputValue);
    if (isNaN(v)) return setResult(0);

    const from = findUnit(fromUnit);
    const to = findUnit(toUnit);
    setResult((v * from.value) / to.value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <label className="block mb-4">
        <span className="text-gray-700 font-bold">Valore:</span>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-1 w-full border rounded p-2 shadow"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-gray-700 font-bold">Da:</span>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="mt-1 w-full border rounded p-2 shadow"
          >
            {pressureUnits.map((u) => (
              <option key={u.name} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">A:</span>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="mt-1 w-full border rounded p-2 shadow"
          >
            {pressureUnits.map((u) => (
              <option key={u.name} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Converti
      </button>

      <p className="mt-4 text-lg font-bold">
        Risultato: {result.toFixed(2)} {toUnit}
      </p>
    </div>
  );
};

export default ConvertitorePressioneCalculator;
