"use client";
import React, { useState } from 'react';

interface TriangleData {
  a?: number;
  b?: number;
  c?: number;
  A?: number;
  B?: number;
  C?: number;
}

const RisolutoreTriangoliCalculator: React.FC = () => {
  const [triangleData, setTriangleData] = useState<TriangleData>({});
  const [result, setResult] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTriangleData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculate = () => {
    // Implement your triangle solving logic here using triangleData
    // This is a placeholder, replace with actual calculations
    let output = 'Calcolo in corso...';
    if (triangleData.a && triangleData.b && triangleData.c) {
      output = `Lato a: ${triangleData.a}, Lato b: ${triangleData.b}, Lato c: ${triangleData.c}`;
    } else if (triangleData.a && triangleData.A && triangleData.B) {
      output = `Lato a: ${triangleData.a}, Angolo A: ${triangleData.A}, Angolo B: ${triangleData.B}`;
    }
    setResult(output);
  };

  return (
    <div className="p-4">
      <h1>Risolutore Triangoli</h1>
      <p>Risolvi triangoli usando il teorema dei seni e del coseno.</p>
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="a" placeholder="Lato a" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
        <input type="number" name="b" placeholder="Lato b" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
        <input type="number" name="c" placeholder="Lato c" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
        <input type="number" name="A" placeholder="Angolo A" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
        <input type="number" name="B" placeholder="Angolo B" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
        <input type="number" name="C" placeholder="Angolo C" onChange={handleInputChange} className="border border-gray-300 p-2 rounded" />
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calcola</button>
      <div className="mt-4">
        <p>Risultato: {result}</p>
      </div>
    </div>
  );
};

export default RisolutoreTriangoliCalculator;
