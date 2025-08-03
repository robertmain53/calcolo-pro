"use client";
import React, { useState } from 'react';

interface CalculatorData {
  area: number;
  moduloElasticita: number;
  lunghezzaLibera: number;
  momentoInerzia: number;
}

const CalcoloCaricoCriticoEulerianoPilastriAcciaioCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data) {
      const { area, moduloElasticita, lunghezzaLibera, momentoInerzia } = data;
      const caricoCritico = (Math.PI * Math.PI * moduloElasticita * momentoInerzia) / (lunghezzaLibera * lunghezzaLibera);
      setRisultato(caricoCritico);
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo Carico Critico Euleriano per Pilastri in Acciaio</h1>
      <p>Verifica a instabilità (EC3)</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="area" className="block text-gray-700 font-bold mb-2">Area (m²):</label>
          <input type="number" id="area" name="area" value={data?.area || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="moduloElasticita" className="block text-gray-700 font-bold mb-2">Modulo di Elasticità (Pa):</label>
          <input type="number" id="moduloElasticita" name="moduloElasticita" value={data?.moduloElasticita || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lunghezzaLibera" className="block text-gray-700 font-bold mb-2">Lunghezza Libera (m):</label>
          <input type="number" id="lunghezzaLibera" name="lunghezzaLibera" value={data?.lunghezzaLibera || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="momentoInerzia" className="block text-gray-700 font-bold mb-2">Momento di Inerzia (m⁴):</label>
          <input type="number" id="momentoInerzia" name="momentoInerzia" value={data?.momentoInerzia || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-green-500 font-bold">Carico Critico Euleriano: {risultato.toFixed(2)} N</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCaricoCriticoEulerianoPilastriAcciaioCalculator;
