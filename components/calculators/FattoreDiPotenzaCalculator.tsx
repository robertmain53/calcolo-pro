'use client';

import React, { useState, useEffect } from 'react';

const FattoreDiPotenzaCalculator: React.FC = () => {
  const [potenzaAttiva, setPotenzaAttiva] = useState<number>(0);
  const [potenzaApparente, setPotenzaApparente] = useState<number>(0);
  const [fp, setFp] = useState<number>(0); // cos φ

  useEffect(() => {
    setFp(potenzaApparente > 0 ? potenzaAttiva / potenzaApparente : 0);
  }, [potenzaAttiva, potenzaApparente]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Fattore di Potenza</h1>
      <p className="text-gray-600 mb-4">
        Il fattore di potenza (cos&nbsp;φ) indica l'efficienza con cui l'energia
        elettrica viene utilizzata in un circuito.
      </p>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Potenza Attiva P (W):</span>
        <input
          type="number"
          value={potenzaAttiva}
          onChange={(e) => setPotenzaAttiva(Number(e.target.value) || 0)}
          className="mt-1 w-full border rounded p-2 shadow"
        />
      </label>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Potenza Apparente S (VA):</span>
        <input
          type="number"
          value={potenzaApparente}
          onChange={(e) => setPotenzaApparente(Number(e.target.value) || 0)}
          className="mt-1 w-full border rounded p-2 shadow"
        />
      </label>

      <p className="font-bold text-gray-700">
        Fattore di Potenza cos&nbsp;φ:&nbsp;
        <span className="text-indigo-700 text-lg">
          {fp.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default FattoreDiPotenzaCalculator;
