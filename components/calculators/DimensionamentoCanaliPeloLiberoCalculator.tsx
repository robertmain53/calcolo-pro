"use client";
import React, { useState } from 'react';

interface DimensionamentoCanaliProps {
  k: number;
  i: number;
  r: number;
  q: number;
}

const DimensionamentoCanaliCalculator: React.FC = () => {
  const [k, setK] = useState<number>(0);
  const [i, setI] = useState<number>(0);
  const [r, setR] = useState<number>(0);
  const [q, setQ] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [perimetro, setPerimetro] = useState<number>(0);
  const [raggioIdraulico, setRaggioIdraulico] = useState<number>(0);

  const calculate = () => {
    //Formula di Gauckler-Strickler (Manning): Q = k * A * R^(2/3) * i^(1/2)
    //Dove:
    //Q = portata (m³/s)
    //k = coefficiente di scabrezza di Strickler (s/m^(1/3))
    //A = area della sezione bagnata (m²)
    //R = raggio idraulico (m)
    //i = pendenza del fondo (m/m)

    if (k <= 0 || i <= 0 || r <= 0) {
      setArea(0);
      setPerimetro(0);
      setRaggioIdraulico(0);
      return;
    }

    //Esempio di calcolo per un canale rettangolare:
    //Assumiamo una larghezza b e una profondità y
    //A = b * y
    //Perimetro = b + 2y
    //R = A / Perimetro

    //In questo esempio semplificato, usiamo i valori diretti di A e R forniti dall'utente
    const calculatedQ = k * area * Math.pow(raggioIdraulico, 2/3) * Math.pow(i, 1/2);
    setQ(calculatedQ);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Dimensionamento Canali a Pelo Libero: Formula di Gauckler-Strickler (Manning)</h1>
      <p className="text-gray-600 mb-4">Calcola la portata di un canale a pelo libero utilizzando la formula di Gauckler-Strickler (Manning).</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="k" className="block text-gray-700 font-bold mb-2">Coefficiente di scabrezza (k):</label>
          <input
            type="number"
            id="k"
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="i" className="block text-gray-700 font-bold mb-2">Pendenza (i):</label>
          <input
            type="number"
            id="i"
            value={i}
            onChange={(e) => setI(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="area" className="block text-gray-700 font-bold mb-2">Area (A):</label>
          <input
            type="number"
            id="area"
            value={area}
            onChange={(e) => setArea(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="raggioIdraulico" className="block text-gray-700 font-bold mb-2">Raggio Idraulico (R):</label>
          <input
            type="number"
            id="raggioIdraulico"
            value={raggioIdraulico}
            onChange={(e) => setRaggioIdraulico(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Calcola
      </button>
      {q > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Portata (Q): {q.toFixed(2)} m³/s</p>
        </div>
      )}
    </div>
  );
};

export default DimensionamentoCanaliCalculator;
