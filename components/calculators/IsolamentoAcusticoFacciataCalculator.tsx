"use client";
import React, { useState } from 'react';

interface IsolamentoAcusticoProps {
  D2m?: number;
  nT?: number;
  w?: number;
}

const IsolamentoAcusticoFacciataCalculator: React.FC<IsolamentoAcusticoProps> = ({ D2m, nT, w }) => {
  const [d2m, setD2m] = useState<number | undefined>(D2m);
  const [nT, setnT] = useState<number | undefined>(nT);
  const [w, setW] = useState<number | undefined>(w);

  const handleD2mChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setD2m(parseFloat(event.target.value));
  };

  const handleNTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnT(parseFloat(event.target.value));
  };

  const handleWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setW(parseFloat(event.target.value));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Calcolatore Isolamento Acustico di Facciata</h1>
      <p>Questo calcolatore aiuta a determinare l'isolamento acustico di una facciata secondo la norma UNI EN ISO 12354-3.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label htmlFor="d2m" className="block text-gray-700 font-bold mb-2">D2m:</label>
          <input
            type="number"
            id="d2m"
            value={d2m || ''}
            onChange={handleD2mChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="nT" className="block text-gray-700 font-bold mb-2">nT:</label>
          <input
            type="number"
            id="nT"
            value={nT || ''}
            onChange={handleNTChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="w" className="block text-gray-700 font-bold mb-2">w:</label>
          <input
            type="number"
            id="w"
            value={w || ''}
            onChange={handleWChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {/* Aggiungere qui la logica di calcolo e visualizzazione dei risultati */}
    </div>
  );
};

export default IsolamentoAcusticoFacciataCalculator;
