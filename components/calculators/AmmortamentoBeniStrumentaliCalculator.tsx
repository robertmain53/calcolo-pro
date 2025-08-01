"use client";
import React, { useState } from 'react';

interface AmmortamentoInput {
  costoBene: number;
  vitaUtile: number;
  valoreResiduo: number;
}

const AmmortamentoBeneStrumentaliCalculator: React.FC = () => {
  const [input, setInput] = useState<AmmortamentoInput>({ costoBene: 0, vitaUtile: 0, valoreResiduo: 0 });
  const [ammortamentoAnnuo, setAmmortamentoAnnuo] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: parseFloat(e.target.value) });
  };

  React.useEffect(() => {
    const calcolaAmmortamento = () => {
      const { costoBene, vitaUtile, valoreResiduo } = input;
      if (vitaUtile <= 0) return;
      const ammortamento = (costoBene - valoreResiduo) / vitaUtile;
      setAmmortamentoAnnuo(ammortamento);
    };
    calcolaAmmortamento();
  }, [input]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Calcolatore Ammortamento Beni Strumentali</h1>
      <p>Calcola l'ammortamento annuo di un bene strumentale.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="costoBene" className="block text-gray-700 font-bold mb-2">Costo del bene:</label>
          <input
            type="number"
            id="costoBene"
            name="costoBene"
            value={input.costoBene}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="vitaUtile" className="block text-gray-700 font-bold mb-2">Vita utile (anni):</label>
          <input
            type="number"
            id="vitaUtile"
            name="vitaUtile"
            value={input.vitaUtile}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="valoreResiduo" className="block text-gray-700 font-bold mb-2">Valore residuo:</label>
          <input
            type="number"
            id="valoreResiduo"
            name="valoreResiduo"
            value={input.valoreResiduo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Ammortamento annuo: {ammortamentoAnnuo.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default AmmortamentoBeneStrumentaliCalculator;
