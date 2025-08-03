"use client";
import React, { useState } from 'react';

interface FormData {
  snowLoad: number;
  windLoad: number;
}

const CalcoloCarichiNeveVentoCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ snowLoad: 0, windLoad: 0 });
  const [totalLoad, setTotalLoad] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    setTotalLoad(formData.snowLoad + formData.windLoad);
  }, [formData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Carichi da Neve e Vento</h1>
      <p className="text-gray-600 mb-4">Secondo le mappe e le formule delle NTC 2018</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="snowLoad" className="block text-gray-700 font-bold mb-2">Carico da Neve (kN/m²):</label>
          <input
            type="number"
            id="snowLoad"
            name="snowLoad"
            value={formData.snowLoad}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="windLoad" className="block text-gray-700 font-bold mb-2">Carico da Vento (kN/m²):</label>
          <input
            type="number"
            id="windLoad"
            name="windLoad"
            value={formData.windLoad}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Carico Totale (kN/m²): {totalLoad.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloCarichiNeveVentoCalculator;
