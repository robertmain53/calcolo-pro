"use client";
import React, { useState } from 'react';

const CalcoloAreaPerimetroPoligonoCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [area, setArea] = useState<number>(0);
  const [perimetro, setPerimetro] = useState<number>(0);

  // Funzione per calcolare area e perimetro
  const calculate = () => {
    // Inserisci qui la logica per il calcolo dell'area e del perimetro
  };

  return (
    <div className="p-4">
      <h1>Calcolo Area e Perimetro Poligono da Coordinate: Formula dell'area di Gauss</h1>
      <p>Formula dell'area di Gauss</p>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 m-2" />
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      <div>
        <p>Area: {area}</p>
        <p>Perimetro: {perimetro}</p>
      </div>
    </div>
  );
};

export default CalcoloAreaPerimetroPoligonoCalculator;