"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  totalCost: number;
  participants: number;
}

const CalcoloRipartizioneSpeseCantiereCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ totalCost: 0, participants: 0 });
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    if (formData.totalCost > 0 && formData.participants > 0) {
      setResult(formData.totalCost / formData.participants);
    } else {
      setResult(0);
    }
  }, [formData.totalCost, formData.participants]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Ripartizione Spese di Cantiere</h1>
      <p className="text-gray-600 mb-4">Per consorzi o imprese associate</p>
      <div className="mb-4">
        <label htmlFor="totalCost" className="block text-gray-700 font-bold mb-2">Costo Totale:</label>
        <input
          type="number"
          id="totalCost"
          name="totalCost"
          value={formData.totalCost}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="participants" className="block text-gray-700 font-bold mb-2">Numero Partecipanti:</label>
        <input
          type="number"
          id="participants"
          name="participants"
          value={formData.participants}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold">Costo a Partecipante: {result.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CalcoloRipartizioneSpeseCantiereCalculator;
