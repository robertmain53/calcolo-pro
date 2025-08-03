"use client";
import React, { useState } from 'react';

interface FormData {
  area1: number;
  area2: number;
  lunghezza: number;
}

const CalcoloScaviRinterriCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ area1: 0, area2: 0, lunghezza: 0 });
  const [risultato, setRisultato] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const calcolo = (formData.area1 + formData.area2) / 2 * formData.lunghezza;
    setRisultato(calcolo);
  }, [formData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Quantità Scavi e Rinterri</h1>
      <p className="text-gray-600 mb-4">Calcola la quantità di scavi e rinterri da sezioni trasversali.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="area1" className="block text-gray-700 font-bold mb-2">Area Sezione 1 (m²):</label>
          <input
            type="number"
            id="area1"
            name="area1"
            value={formData.area1}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="area2" className="block text-gray-700 font-bold mb-2">Area Sezione 2 (m²):</label>
          <input
            type="number"
            id="area2"
            name="area2"
            value={formData.area2}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="lunghezza" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
          <input
            type="number"
            id="lunghezza"
            name="lunghezza"
            value={formData.lunghezza}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Risultato: {risultato} m³</p>
      </div>
    </div>
  );
};

export default CalcoloScaviRinterriCalculator;
