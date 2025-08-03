"use client";
import React, { useState } from 'react';

interface CalculatorData {
  tensioneNominale: number;
  corrente: number;
  resistenzaLinea: number;
  lunghezzaLinea: number;
  fase: "monofase" | "trifase";
}

const CalcoloCadutaTensioneCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleFaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculatorData((prevData) => ({ ...prevData, fase: event.target.value }));
  };

  const calculate = () => {
    if (!calculatorData) return;
    const { tensioneNominale, corrente, resistenzaLinea, lunghezzaLinea, fase } = calculatorData;
    const cadutaTensione = fase === "monofase" ? 2 * corrente * resistenzaLinea : Math.sqrt(3) * corrente * resistenzaLinea;
    setRisultato(cadutaTensione);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Caduta di Tensione Linea Elettrica</h1>
      <p>Calcola la caduta di tensione in corrente alternata (AC) monofase e trifase.</p>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="tensioneNominale"
          placeholder="Tensione Nominale (V)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="corrente"
          placeholder="Corrente (A)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="resistenzaLinea"
          placeholder="Resistenza Linea (Ω)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="lunghezzaLinea"
          placeholder="Lunghezza Linea (m)"
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="fase"
          onChange={handleFaseChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="monofase">Monofase</option>
          <option value="trifase">Trifase</option>
        </select>
        <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </div>
      {risultato !== null && (
        <div className="mt-4">
          <p>Caduta di Tensione: {risultato.toFixed(2)} V</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCadutaTensioneCalculator;
