"use client";
import React, { useState } from 'react';

interface CalculatorData {
  potenzaAttiva: number;
  potenzaApparente: number;
}

const FattoreDiPotenzaCalculator: React.FC = () => {
  const [potenzaAttiva, setPotenzaAttiva] = useState<number>(0);
  const [potenzaApparente, setPotenzaApparente] = useState<number>(0);
  const [fattoreDiPotenza, setFattoreDiPotenza] = useState<number>(0);

  const handlePotenzaAttivaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPotenzaAttiva(parseFloat(event.target.value));
  };

  const handlePotenzaApparenteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPotenzaApparente(parseFloat(event.target.value));
  };

  React.useEffect(() => {
    if (potenzaApparente > 0) {
      setFattoreDiPotenza((potenzaAttiva / potenzaApparente).toFixed(2));
    } else {
      setFattoreDiPotenza(0);
    }
  }, [potenzaAttiva, potenzaApparente]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Fattore di potenza: cos'è e come si calcola</h1>
      <p className="text-gray-600 mb-4">Il fattore di potenza è un parametro che indica l'efficienza con cui l'energia elettrica viene utilizzata in un circuito.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="potenzaAttiva">
          Potenza Attiva (W):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="potenzaAttiva"
          value={potenzaAttiva}
          onChange={handlePotenzaAttivaChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="potenzaApparente">
          Potenza Apparente (VA):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="potenzaApparente"
          value={potenzaApparente}
          onChange={handlePotenzaApparenteChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="fattoreDiPotenza">
          Fattore di Potenza (cos φ):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="fattoreDiPotenza"
          value={fattoreDiPotenza}
          readOnly
        />
      </div>
    </div>
  );
};

export default FattoreDiPotenzaCalculator;
