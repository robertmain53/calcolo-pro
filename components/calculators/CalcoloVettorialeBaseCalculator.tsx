"use client";
import React, { useState } from 'react';

interface Vector {
  x: number;
  y: number;
  z: number;
}

const CalcoloVettorialeBaseCalculator: React.FC = () => {
  const [vectorA, setVectorA] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const [vectorB, setVectorB] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const [sum, setSum] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const [dotProduct, setDotProduct] = useState<number>(0);
  const [crossProduct, setCrossProduct] = useState<Vector>({ x: 0, y: 0, z: 0 });

  const handleVectorAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVectorA(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleVectorBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVectorB(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    setSum({ x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y, z: vectorA.z + vectorB.z });
    setDotProduct(vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z);
    setCrossProduct({
      x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
      y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
      z: vectorA.x * vectorB.y - vectorA.y * vectorB.x,
    });
  }, [vectorA, vectorB]);

  return (
    <div className="p-4">
      <h1>Calcolo Vettoriale di Base</h1>
      <p>Questo calcolatore esegue la somma, il prodotto scalare e il prodotto vettoriale di due vettori tridimensionali.</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold">Vettore A</h2>
          <input type="number" name="x" value={vectorA.x} onChange={handleVectorAChange} className="w-full p-2 border border-gray-300 rounded" placeholder="x" />
          <input type="number" name="y" value={vectorA.y} onChange={handleVectorAChange} className="w-full p-2 border border-gray-300 rounded" placeholder="y" />
          <input type="number" name="z" value={vectorA.z} onChange={handleVectorAChange} className="w-full p-2 border border-gray-300 rounded" placeholder="z" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Vettore B</h2>
          <input type="number" name="x" value={vectorB.x} onChange={handleVectorBChange} className="w-full p-2 border border-gray-300 rounded" placeholder="x" />
          <input type="number" name="y" value={vectorB.y} onChange={handleVectorBChange} className="w-full p-2 border border-gray-300 rounded" placeholder="y" />
          <input type="number" name="z" value={vectorB.z} onChange={handleVectorBChange} className="w-full p-2 border border-gray-300 rounded" placeholder="z" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Risultati</h2>
        <p><b>Somma:</b> ({sum.x}, {sum.y}, {sum.z})</p>
        <p><b>Prodotto Scalare:</b> {dotProduct}</p>
        <p><b>Prodotto Vettoriale:</b> ({crossProduct.x}, {crossProduct.y}, {crossProduct.z})</p>
      </div>
    </div>
  );
};

export default CalcoloVettorialeBaseCalculator;
