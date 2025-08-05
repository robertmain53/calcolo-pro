'use client';

import React, { useState } from 'react';

interface ForceConverterProps {
  title: string;
  description: string;
}

// util
const format = (num: number) => num.toFixed(2);

const ConvertitoreForzaCalculator: React.FC<ForceConverterProps> = ({
  title,
  description,
}) => {
  // gestiamo gli input come stringhe → nessun conflitto di tipo con ''
  const [newton, setNewton] = useState<string>('');
  const [kilogramForce, setKilogramForce] = useState<string>('');

  const handleNewtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewton(value);
    if (value) {
      const kgf = parseFloat(value) / 9.81;
      setKilogramForce(format(kgf));
    } else {
      setKilogramForce('');
    }
  };

  const handleKilogramForceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setKilogramForce(value);
    if (value) {
      const n = parseFloat(value) * 9.81;
      setNewton(format(n));
    } else {
      setNewton('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-gray-700 font-bold">Newton (N):</span>
          <input
            type="number"
            id="newton"
            value={newton}
            onChange={handleNewtonChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">Kilogram‑forza (kgf):</span>
          <input
            type="number"
            id="kilogramForce"
            value={kilogramForce}
            onChange={handleKilogramForceChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>
      </div>
    </div>
  );
};

export default ConvertitoreForzaCalculator;
