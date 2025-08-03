"use client";
import React, { useState } from 'react';

interface CalculatorData {
  potenzaAttiva: number;
  cosFiAttuale: number;
  cosFiTarget: number;
}

const CalcoloRifasamentoCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({ potenzaAttiva: 0, cosFiAttuale: 0, cosFiTarget: 0 });
  const [risultato, setRisultato] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const { potenzaAttiva, cosFiAttuale, cosFiTarget } = calculatorData;
    if (potenzaAttiva > 0 && cosFiAttuale > 0 && cosFiTarget > 0) {
      // Calcolo potenza reattiva
      const potenzaReattivaAttuale = potenzaAttiva * Math.tan(Math.acos(cosFiAttuale));
      const potenzaReattivaTarget = potenzaAttiva * Math.tan(Math.acos(cosFiTarget));
      const potenzaReattivaDaCompenare = potenzaReattivaAttuale - potenzaReattivaTarget;
      setRisultato(potenzaReattivaDaCompenare);
    } else {
      setRisultato(0);
    }
  }, [calculatorData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Potenza per Rifasamento Impianti</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina la potenza reattiva da compensare per raggiungere un cosϕ target.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="potenzaAttiva" className="block text-gray-700 font-bold mb-2">Potenza Attiva (kW):</label>
          <input
            type="number"
            id="potenzaAttiva"
            name="potenzaAttiva"
            value={calculatorData.potenzaAttiva}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cosFiAttuale" className="block text-gray-700 font-bold mb-2">cosϕ Attuale:</label>
          <input
            type="number"
            id="cosFiAttuale"
            name="cosFiAttuale"
            value={calculatorData.cosFiAttuale}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cosFiTarget" className="block text-gray-700 font-bold mb-2">cosϕ Target:</label>
          <input
            type="number"
            id="cosFiTarget"
            name="cosFiTarget"
            value={calculatorData.cosFiTarget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Potenza Reattiva da Compensare (kvar): {risultato.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloRifasamentoCalculator;
