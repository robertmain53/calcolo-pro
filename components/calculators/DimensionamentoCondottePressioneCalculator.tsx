"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface DimensionamentoCondotteProps {
  portata?: number;
  cadutaPressione?: number;
  viscosita?: number;
  rugosita?: number;
  lunghezza?: number;
}

const DimensionamentoCondotteCalculator: React.FC<DimensionamentoCondotteProps> = ({ portata = 0, cadutaPressione = 0, viscosita = 0, rugosita = 0, lunghezza = 0 }) => {
  const [diametro, setDiametro] = useState<number>(0);

  const handleCalculate = () => {
    // Inserire qui la logica di calcolo del diametro ottimale
    // Questo è un esempio placeholder, sostituire con la formula corretta
    const calculatedDiametro = portata * cadutaPressione / (viscosita * rugosita * lunghezza);
    setDiametro(calculatedDiametro);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Dimensionamento Condotte in Pressione: Calcolo del diametro ottimale</h1>
      <p className="text-gray-600 mb-4">Calcolo del diametro ottimale di una condotta in pressione in base a portata, caduta di pressione, viscosità, rugosità e lunghezza.</p>

      <div className="mb-4">
        <label htmlFor="portata" className="block text-gray-700 font-bold mb-2">Portata (m³/s):</label>
        <input type="number" id="portata" value={portata} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="cadutaPressione" className="block text-gray-700 font-bold mb-2">Caduta di Pressione (Pa):</label>
        <input type="number" id="cadutaPressione" value={cadutaPressione} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="viscosita" className="block text-gray-700 font-bold mb-2">Viscosità (Pa·s):</label>
        <input type="number" id="viscosita" value={viscosita} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="rugosita" className="block text-gray-700 font-bold mb-2">Rugosità (m):</label>
        <input type="number" id="rugosita" value={rugosita} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="lunghezza" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
        <input type="number" id="lunghezza" value={lunghezza} onChange={(e) => {}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <button onClick={handleCalculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>

      {diametro > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Diametro ottimale: {diametro.toFixed(2)} m</p>
        </div>
      )}
    </div>
  );
};

export default DimensionamentoCondotteCalculator;
