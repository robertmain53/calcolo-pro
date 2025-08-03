"use client";
import React, { useState } from 'react';

interface CalculatorData {
  resistance: number;
  capacitiveReactance: number;
  inductiveReactance: number;
}

const CalcoloImpedenzaCircuitoCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ resistance: 0, capacitiveReactance: 0, inductiveReactance: 0 });
  const [impedance, setImpedance] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const { resistance, capacitiveReactance, inductiveReactance } = data;
    const impedanceValue = Math.sqrt(resistance**2 + (inductiveReactance - capacitiveReactance)**2);
    setImpedance(impedanceValue);
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Impedenza Circuito</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina l'impedenza di un circuito elettrico RLC.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="resistance" className="block text-gray-700 font-bold mb-2">Resistenza (Ω):</label>
          <input
            type="number"
            id="resistance"
            name="resistance"
            value={data.resistance}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="capacitiveReactance" className="block text-gray-700 font-bold mb-2">Reattanza Capacitiva (Ω):</label>
          <input
            type="number"
            id="capacitiveReactance"
            name="capacitiveReactance"
            value={data.capacitiveReactance}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="inductiveReactance" className="block text-gray-700 font-bold mb-2">Reattanza Induttiva (Ω):</label>
          <input
            type="number"
            id="inductiveReactance"
            name="inductiveReactance"
            value={data.inductiveReactance}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Impedenza (Ω): {impedance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloImpedenzaCircuitoCalculator;
