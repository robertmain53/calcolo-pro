"use client";
import React, { useState } from 'react';

interface SeedIdrisCalculatorProps {
  title: string;
  description: string;
}

const SeedIdrisCalculator: React.FC<SeedIdrisCalculatorProps> = ({ title, description }) => {
  const [CSR, setCSR] = useState<number | null>(null);
  const [CRR, setCRR] = useState<number | null>(null);
  const [a, seta] = useState<number | null>(null);
  const [MSF, setMSF] = useState<number | null>(null);
  const [liquefaction, setLiquefaction] = useState<boolean | null>(null);

  const calculateLiquefaction = () => {
    if (CSR !== null && CRR !== null && a !== null && MSF !== null) {
      const result = CSR / (CRR * a * MSF);
      setLiquefaction(result < 1);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="csr">
            CSR (Cyclic Stress Ratio):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="csr"
            type="number"
            value={CSR || ''}
            onChange={(e) => setCSR(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="crr">
            CRR (Cyclic Resistance Ratio):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="crr"
            type="number"
            value={CRR || ''}
            onChange={(e) => setCRR(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="a">
            Fattore di correzione (a):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="a"
            type="number"
            value={a || ''}
            onChange={(e) => seta(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="msf">
            MSF (Magnitude Scaling Factor):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="msf"
            type="number"
            value={MSF || ''}
            onChange={(e) => setMSF(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={calculateLiquefaction}
      >
        Calcola
      </button>
      {liquefaction !== null && (
        <p className="mt-4">
          Liquefazione:{' '}
          {liquefaction ? 'Probabile' : 'Improbabile'}
        </p>
      )}
    </div>
  );
};

export default SeedIdrisCalculator;
