"use client";
import React, { useState } from 'react';

interface CalculatorData {
  importo: number;
  percentuale: number;
}

const CalcoloCompensiPubbliciCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({ importo: 0, percentuale: 0 });
  const [risultato, setRisultato] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    const calcolo = calculatorData.importo * (calculatorData.percentuale / 100);
    setRisultato(calcolo);
  }, [calculatorData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Compensi Professionali Lavori Pubblici: (D.M. 17/06/2016)</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore ti aiuta a determinare i compensi professionali per i lavori pubblici in base al D.M. 17/06/2016.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="importo" className="block text-gray-700 font-bold mb-2">Importo:</label>
          <input
            type="number"
            id="importo"
            name="importo"
            value={calculatorData.importo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="percentuale" className="block text-gray-700 font-bold mb-2">Percentuale:</label>
          <input
            type="number"
            id="percentuale"
            name="percentuale"
            value={calculatorData.percentuale}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Risultato: {risultato.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CalcoloCompensiPubbliciCalculator;
