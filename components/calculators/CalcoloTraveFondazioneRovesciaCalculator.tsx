"use client";
import React, { useState } from 'react';

interface CalculatorData {
  lunghezzaTrave: number;
  larghezzaTrave: number;
  altezzaTrave: number;
  moduloElasticita: number;
  momentoInerzia: number;
  coefficienteWinkler: number;
  caricoDistribuito: number;
}

const CalcoloTraveFondazioneRovesciaCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculate = () => {
    if (!calculatorData) return;
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const { lunghezzaTrave, caricoDistribuito } = calculatorData;
    const risultatoCalcolo = lunghezzaTrave * caricoDistribuito;
    setRisultato(risultatoCalcolo);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Trave di Fondazione (Trave Rovescia): Su suolo elastico (alla Winkler)</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina ...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lunghezzaTrave" className="block text-gray-700 font-bold mb-2">Lunghezza Trave (m):</label>
          <input
            type="number"
            id="lunghezzaTrave"
            name="lunghezzaTrave"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="larghezzaTrave" className="block text-gray-700 font-bold mb-2">Larghezza Trave (m):</label>
          <input
            type="number"
            id="larghezzaTrave"
            name="larghezzaTrave"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        {/* Aggiungi altri campi input qui */}
      </div>
      <button onClick={calculate} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Risultato: {risultato}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloTraveFondazioneRovesciaCalculator;