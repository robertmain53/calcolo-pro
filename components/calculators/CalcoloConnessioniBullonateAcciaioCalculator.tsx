"use client";
import React, { useState } from 'react';

interface InputData {
  diametroBullone: number;
  resistenzaBullone: number;
  numeroBulloni: number;
}

const CalcoloConnessioniBullonateAcciaioCalculator: React.FC = () => {
  const [inputData, setInputData] = useState<InputData | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputData) {
      // Calcolo semplificato (sostituire con calcolo EC3 reale)
      const resistenzaTotale = inputData.diametroBullone * inputData.resistenzaBullone * inputData.numeroBulloni;
      setRisultato(resistenzaTotale);
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Connessioni Bullonate in Acciaio</h1>
      <p>Resistenza e scorrimento (EC3)</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="diametroBullone" className="block text-gray-700 font-bold mb-2">Diametro Bullone (mm):</label>
          <input
            type="number"
            id="diametroBullone"
            name="diametroBullone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resistenzaBullone" className="block text-gray-700 font-bold mb-2">Resistenza Bullone (kN/mm):</label>
          <input
            type="number"
            id="resistenzaBullone"
            name="resistenzaBullone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numeroBulloni" className="block text-gray-700 font-bold mb-2">Numero Bulloni:</label>
          <input
            type="number"
            id="numeroBulloni"
            name="numeroBulloni"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-green-500 font-bold">Resistenza Totale: {risultato} kN</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloConnessioniBullonateAcciaioCalculator;
