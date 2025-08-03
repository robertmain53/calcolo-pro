"use client";
import React, { useState } from 'react';

interface ForceConverterProps {
  title: string;
  description: string;
}

const ConvertitoreForzaCalculator: React.FC<ForceConverterProps> = ({ title, description }) => {
  const [newton, setNewton] = useState<number | ''>('');
  const [kilogramForce, setKilogramForce] = useState<number | ''>('');

  const handleNewtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewton(value ? parseFloat(value) : '');
    setKilogramForce(value ? (parseFloat(value) / 9.81).toFixed(2) : '');
  };

  const handleKilogramForceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKilogramForce(value ? parseFloat(value) : '');
    setNewton(value ? (parseFloat(value) * 9.81).toFixed(2) : '');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="newton">
            Newton (N):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="newton"
            value={newton || ''}
            onChange={handleNewtonChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="kilogramForce">
            Kilogram-forza (kgf):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="kilogramForce"
            value={kilogramForce || ''}
            onChange={handleKilogramForceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertitoreForzaCalculator;
