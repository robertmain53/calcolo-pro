"use client";
import React, { useState } from 'react';

interface KwattCalculatorProps {
  title: string;
  description: string;
}

const KwattCalculator: React.FC<KwattCalculatorProps> = ({ title, description }) => {
  const [kwattH, setKwattH] = useState<number | ''>('');
  const [kwatt, setKwatt] = useState<number | null>(null);
  const [hours, setHours] = useState<number | ''>('');

  const handleKwattHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKwattH(event.target.value ? parseFloat(event.target.value) : '');
    setKwatt(null);
  };

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHours(event.target.value ? parseFloat(event.target.value) : '');
    setKwatt(null);
  };

  const calculateKwatt = () => {
    if (kwattH && hours) {
      setKwatt(kwattH / hours);
    } else {
      setKwatt(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="kwattH">
          KWatt/h:
        </label>
        <input
          type="number"
          id="kwattH"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={kwattH || ''}
          onChange={handleKwattHChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="hours">
          Ore:
        </label>
        <input
          type="number"
          id="hours"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={hours || ''}
          onChange={handleHoursChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculateKwatt}
      >
        Calcola KWatt
      </button>
      {kwatt !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">KWatt: {kwatt.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default KwattCalculator;
