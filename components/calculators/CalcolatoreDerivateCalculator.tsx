"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface DerivativeCalculatorProps {
  title: string;
  description: string;
}

const DerivativeCalculator: React.FC<DerivativeCalculatorProps> = ({ title, description }) => {
  const [functionInput, setFunctionInput] = useState('');
  const [derivative, setDerivative] = useState('');
  const [error, setError] = useState('');

  const calculateDerivative = () => {
    setError('');
    try {
      // Replace this with your actual derivative calculation logic
      // This is a placeholder and will not work correctly
      const result = eval(functionInput);
      setDerivative(String(result));
    } catch (e) {
      setError('Errore nel calcolo. Controlla la funzione inserita.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label htmlFor="functionInput" className="block text-gray-700 font-bold mb-2">Funzione:</label>
        <input
          type="text"
          id="functionInput"
          value={functionInput}
          onChange={(e) => setFunctionInput(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={calculateDerivative}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcola Derivata
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {derivative && (
        <div className="mt-4">
          <p className="font-bold">Derivata:</p>
          <p>{derivative}</p>
        </div>
      )}
    </div>
  );
};

export default DerivativeCalculator;
