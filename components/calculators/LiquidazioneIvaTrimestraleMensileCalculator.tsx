"use client";
import React, { useState } from 'react';

interface LiquidazioneIVAState {
  trimestrale: number;
  mensile: number;
  differenza: number;
}

const LiquidazioneIvaTrimestraleMensileCalculator: React.FC = () => {
  const [liquidazione, setLiquidazione] = useState<LiquidazioneIVAState>({ trimestrale: 0, mensile: 0, differenza: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    setLiquidazione((prev) => ({
      ...prev,
      [name]: isNaN(parsedValue) ? 0 : parsedValue,
      differenza: parsedValue - prev[name === 'trimestrale' ? 'mensile' : 'trimestrale'],
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1>Calcolatore Liquidazione IVA Trimestrale vs. Mensile</h1>
      <p>Confronta la liquidazione IVA trimestrale con quella mensile.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="trimestrale" className="block text-gray-700 font-bold mb-2">Liquidazione Trimestrale:</label>
          <input
            type="number"
            id="trimestrale"
            name="trimestrale"
            value={liquidazione.trimestrale}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="mensile" className="block text-gray-700 font-bold mb-2">Liquidazione Mensile:</label>
          <input
            type="number"
            id="mensile"
            name="mensile"
            value={liquidazione.mensile}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Differenza: {liquidazione.differenza}</p>
      </div>
    </div>
  );
};

export default LiquidazioneIvaTrimestraleMensileCalculator;