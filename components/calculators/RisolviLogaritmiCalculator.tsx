"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface LogarithmCalculatorProps {
  title: string;
  description: string;
}

const RisolviLogaritmiCalculator: React.FC<LogarithmCalculatorProps> = ({ title, description }) => {
  const [numero, setNumero] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      const num = parseFloat(numero);
      const bas = parseFloat(base);
      if (isNaN(num) || isNaN(bas) || bas <= 0 || bas === 1 || num <=0) {
        setRisultato(null);
        return;
      }
      setRisultato(Math.log(num) / Math.log(bas));
    } catch (error) {
      setRisultato(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="numero">
          Numero:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="base">
          Base:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCalculate}
      >
        Calcola
      </button>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">Risultato: {risultato.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default RisolviLogaritmiCalculator;
