"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface GeotechnicalParameters {
  edometricTest: number;
  triaxialTest: number;
  directShearTest: number;
}

const CalcoloParametriGeotecniciLaboratorioCalculator: React.FC = () => {
  const [edometricTest, setEdometricTest] = useState<number>(0);
  const [triaxialTest, setTriaxialTest] = useState<number>(0);
  const [directShearTest, setDirectShearTest] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    // Aggiungi qui la logica di calcolo
    // Esempio: somma dei tre valori
    const sum = edometricTest + triaxialTest + directShearTest;
    setResult(`Il risultato del calcolo è: ${sum}`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Parametri Geotecnici da Prove di Laboratorio</h1>
      <p className="text-gray-600 mb-4">Edometriche, triassiali, taglio diretto</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="edometricTest">
          Prova Edometrica:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="edometricTest"
          value={edometricTest}
          onChange={(e) => setEdometricTest(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="triaxialTest">
          Prova Triassiale:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="triaxialTest"
          value={triaxialTest}
          onChange={(e) => setTriaxialTest(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="directShearTest">
          Prova a Taglio Diretto:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="directShearTest"
          value={directShearTest}
          onChange={(e) => setDirectShearTest(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={calculate}
      >
        Calcola
      </button>
      <p className="mt-4">{result}</p>
    </div>
  );
};

export default CalcoloParametriGeotecniciLaboratorioCalculator;
