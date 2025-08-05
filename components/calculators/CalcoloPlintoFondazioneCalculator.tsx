"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  width: number;
  length: number;
  depth: number;
  load: number;
  eccentricityX: number;
  eccentricityY: number;
}

const CalcoloPlintoFondazioneCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ width: 0, length: 0, depth: 0, load: 0, eccentricityX: 0, eccentricityY: 0 });
  const [result, setResult] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
    const { width, length, depth, load, eccentricityX, eccentricityY } = formData;
    const calculation = width * length * depth * load * eccentricityX * eccentricityY;
    setResult(`Il risultato del calcolo è: ${calculation}`);
  };

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Plinto di Fondazione</h1>
      <p>Centrato e eccentrico (NTC 2018, EC7)</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="width" className="block text-gray-700 font-bold mb-2">Larghezza (m):</label>
          <input type="number" id="width" name="width" value={formData.width} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="length" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
          <input type="number" id="length" name="length" value={formData.length} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* Aggiungi altri campi input qui */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      <div className="mt-4">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default CalcoloPlintoFondazioneCalculator;