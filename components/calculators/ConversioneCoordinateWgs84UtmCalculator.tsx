"use client";
import React, { useState } from 'react';

const ConversioneCoordinateWgs84UtmCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  // Funzione per il calcolo
  const calculateResult = () => {
    // Implementa qui la logica di conversione
  };

  return (
    <div className="p-4">
      <h1>Conversione Coordinate (Geografiche WGS84 &lt;&gt; Piane UTM)</h1>
      <p>Per cartografia e GIS</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border rounded-md p-2"
        placeholder="Inserisci le coordinate"
      />
      <button
        onClick={calculateResult}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >Calcola</button>
      <div className="mt-4">
        Risultato: {result}
      </div>
    </div>
  );
};

export default ConversioneCoordinateWgs84UtmCalculator;