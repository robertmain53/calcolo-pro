"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface ICalcIVAProps {
  netto?: number;
  lordo?: number;
  aliquota?: number;
}

const CalcoloDellivaCalcolatoreEGuidaDettagliataCalculator: React.FC<ICalcIVAProps> = ({ netto, lordo, aliquota = 22 }) => {
  const [nettoInput, setNettoInput] = useState<string | number>(netto || '');
  const [lordoInput, setLordoInput] = useState<string | number>(lordo || '');
  const [aliquotaInput, setAliquotaInput] = useState<string | number>(aliquota);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleNettoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNettoInput(e.target.value);
    calculate();
  };

  const handleLordoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLordoInput(e.target.value);
    calculate();
  };

  const handleAliquotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAliquotaInput(parseFloat(e.target.value));
    calculate();
  };

  const calculate = () => {
    let result: number | null = null;
    if (nettoInput && aliquotaInput) {
      result = parseFloat(String(nettoInput)) * (1 + parseFloat(String(aliquotaInput)) / 100);
    } else if (lordoInput && aliquotaInput) {
      result = parseFloat(String(lordoInput)) / (1 + parseFloat(String(aliquotaInput)) / 100);
    }
    setRisultato(result);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Calcolo IVA</h1>
      <p>Questo calcolatore ti aiuta ad aggiungere l'IVA a un prezzo netto o a scorporare l'IVA da un prezzo lordo.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="netto" className="block text-gray-700 font-bold mb-2">Prezzo Netto:</label>
          <input
            type="number"
            id="netto"
            value={nettoInput}
            onChange={handleNettoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="lordo" className="block text-gray-700 font-bold mb-2">Prezzo Lordo:</label>
          <input
            type="number"
            id="lordo"
            value={lordoInput}
            onChange={handleLordoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="aliquota" className="block text-gray-700 font-bold mb-2">Aliquota IVA (%):</label>
          <input
            type="number"
            id="aliquota"
            value={aliquotaInput}
            onChange={handleAliquotaChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Risultato: {risultato.toFixed(2)} €</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloDellivaCalcolatoreEGuidaDettagliataCalculator;
