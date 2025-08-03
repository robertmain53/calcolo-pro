"use client";
import React, { useState } from 'react';

interface CalculatorData {
  velocitàVento: number;
  superficie: number;
  coefficientePressione: number;
}

const CalcoloPressioneVentoCantiereCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({ velocitàVento: 0, superficie: 0, coefficientePressione: 1 });
  const [pressioneVento, setPressioneVento] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const calcolo = calculatorData.velocitàVento * calculatorData.velocitàVento * calculatorData.coefficientePressione * 0.6125; //Formula semplificata per la pressione del vento
    setPressioneVento(calcolo);
  }, [calculatorData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Pressione del Vento su Elementi di Cantiere</h1>
      <p className="text-gray-600 mb-4">Calcola la pressione del vento su elementi come teli e cartelloni nei cantieri.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="velocitàVento" className="block text-gray-700 font-bold mb-2">Velocità del Vento (m/s):</label>
          <input
            type="number"
            id="velocitàVento"
            name="velocitàVento"
            value={calculatorData.velocitàVento}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="superficie" className="block text-gray-700 font-bold mb-2">Superficie (m²):</label>
          <input
            type="number"
            id="superficie"
            name="superficie"
            value={calculatorData.superficie}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="coefficientePressione" className="block text-gray-700 font-bold mb-2">Coefficiente di Pressione:</label>
          <input
            type="number"
            id="coefficientePressione"
            name="coefficientePressione"
            value={calculatorData.coefficientePressione}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Pressione del Vento (Pa): {pressioneVento.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloPressioneVentoCantiereCalculator;
