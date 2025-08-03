"use client";
import React, { useState } from 'react';

interface CalculatorData {
  area: number;
  depth: number;
  density: number;
}

const CalcoloSpintaIdrostaticaCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ area: 0, depth: 0, density: 1000 });
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    const { area, depth, density } = data;
    const thrust = area * depth * density * 9.81; // 9.81 m/s^2 is the acceleration due to gravity
    setResult(thrust);
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Spinta Idrostatica</h1>
      <p className="text-gray-600 mb-4">Calcola la spinta idrostatica su superfici piane e curve utilizzando il teorema di Archimede e Stevino.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-gray-700 font-bold mb-2">Area (m²):</label>
          <input
            type="number"
            id="area"
            name="area"
            value={data.area}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="depth" className="block text-gray-700 font-bold mb-2">Profondità (m):</label>
          <input
            type="number"
            id="depth"
            name="depth"
            value={data.depth}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="density" className="block text-gray-700 font-bold mb-2">Densità (kg/m³):</label>
          <input
            type="number"
            id="density"
            name="density"
            value={data.density}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Spinta Idrostatica (N): {result.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloSpintaIdrostaticaCalculator;
