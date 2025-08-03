"use client";
import React, { useState } from 'react';

interface CalculatorData {
  larghezzaApertura: number;
  altezzaApertura: number;
  spessoreMuro: number;
  resistenzaAcciaio: number;
}

const CalcoloCerchiatureApertureMuriCalculator: React.FC = () => {
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
      // Aggiungi qui la logica di calcolo.  Questo è un esempio placeholder.
      const calcolo = data.larghezzaApertura * data.altezzaApertura * data.spessoreMuro * data.resistenzaAcciaio;
      setRisultato(calcolo);
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo Cerchiature per Aperture in Muri Portanti</h1>
      <p>Calcolo delle cerchiature per aperture in muri portanti, considerando architravi in acciaio e cordoli.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="larghezzaApertura" className="block text-gray-700 font-bold mb-2">Larghezza Apertura (cm):</label>
          <input type="number" id="larghezzaApertura" name="larghezzaApertura" value={data?.larghezzaApertura || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="altezzaApertura" className="block text-gray-700 font-bold mb-2">Altezza Apertura (cm):</label>
          <input type="number" id="altezzaApertura" name="altezzaApertura" value={data?.altezzaApertura || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="spessoreMuro" className="block text-gray-700 font-bold mb-2">Spessore Muro (cm):</label>
          <input type="number" id="spessoreMuro" name="spessoreMuro" value={data?.spessoreMuro || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="resistenzaAcciaio" className="block text-gray-700 font-bold mb-2">Resistenza Acciaio (N/mm2):</label>
          <input type="number" id="resistenzaAcciaio" name="resistenzaAcciaio" value={data?.resistenzaAcciaio || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calcola</button>
      </form>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-green-500">Risultato: {risultato}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCerchiatureApertureMuriCalculator;
