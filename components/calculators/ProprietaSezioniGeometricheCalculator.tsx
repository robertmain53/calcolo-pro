"use client";
import React, { useState } from 'react';

const ProprietaSezioniGeometricheCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [baricentro, setBaricentro] = useState<number>(0);
  const [momentoInerzia, setMomentoInerzia] = useState<number>(0);

  // Funzione per calcolare le proprietà delle sezioni geometriche
  const calculateProperties = () => {
    // Implementa qui il calcolo dell'area, baricentro e momenti d'inerzia
  };

  return (
    <div className="p-4">
      <h1>Proprieta Sezioni Geometriche Calculator</h1>
      <p>Area, Baricentro, Momenti d'inerzia (rettangolo, cerchio, T, I)</p>
      <input type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} className="p-2 m-2 border border-gray-300 rounded" />
      <button onClick={calculateProperties} className="p-2 bg-blue-500 text-white rounded">Calcola</button>
      <div>
        <p>Area: {area}</p>
        <p>Baricentro: {baricentro}</p>
        <p>Momento d'inerzia: {momentoInerzia}</p>
      </div>
    </div>
  );
};

export default ProprietaSezioniGeometricheCalculator;