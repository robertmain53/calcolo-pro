"use client";
import React, { useState } from 'react';

interface BTUWattCalculatorProps{}

const BTUWattCalculator: React.FC<BTUWattCalculatorProps> = () => {
  const [btu, setBtu] = useState<number | ''>(0);
  const [watt, setWatt] = useState<number | ''>(0);

  const handleBTUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setBtu(isNaN(value) ? '' : value);
    setWatt(isNaN(value) ? '' : value * 0.293071);
  };

  const handleWattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setWatt(isNaN(value) ? '' : value);
    setBtu(isNaN(value) ? '' : value / 0.293071);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Conversione BTU/h in Watt</h1>
      <p className="text-gray-600 mb-4">Questo strumento converte la potenza da BTU/h (British Thermal Units per ora) in Watt (W) e viceversa.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="btu">
          BTU/h:
        </label>
        <input
          type="number"
          id="btu"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={typeof btu === 'number' ? btu : ''}
          onChange={handleBTUChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="watt">
          Watt:
        </label>
        <input
          type="number"
          id="watt"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={typeof watt === 'number' ? watt : ''}
          onChange={handleWattChange}
        />
      </div>
    </div>
  );
};

export default BTUWattCalculator;
