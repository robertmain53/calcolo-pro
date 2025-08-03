"use client";
import React, { useState } from 'react';

interface ConvertitoreClassiCalcestruzzoProps {
  rck?: number;
  classeC?: string;
}

const ConvertitoreClassiCalcestruzzoCalculator: React.FC<ConvertitoreClassiCalcestruzzoProps> = ({ rck, classeC }) => {
  const [inputRck, setInputRck] = useState<string | number>(rck || '');
  const [inputClasseC, setInputClasseC] = useState<string>(classeC || '');
  const [risultato, setRisultato] = useState<string>('');

  const handleRckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRck(event.target.value);
    calculate();
  };

  const handleClasseCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputClasseC(event.target.value);
    calculate();
  };

  const calculate = () => {
    if (typeof inputRck === 'number' && inputRck >= 0) {
      // Logica di conversione da Rck a Classe C
      const classeC = calculateClasseC(inputRck);
      setRisultato(`Classe C corrispondente: ${classeC}`);
    } else if (inputClasseC) {
      // Logica di conversione da Classe C a Rck
      const rck = calculateRck(inputClasseC);
      setRisultato(`Rck corrispondente: ${rck}`);
    } else {
      setRisultato('');
    }
  };

  const calculateClasseC = (rck: number): string => {
    // Implementare la logica di conversione da Rck a Classe C
    // Esempio semplificato (sostituire con la logica corretta)
    if (rck >= 25) return 'C25/30';
    if (rck >= 20) return 'C20/25';
    return 'C16/20';
  };

  const calculateRck = (classeC: string): number => {
    // Implementare la logica di conversione da Classe C a Rck
    // Esempio semplificato (sostituire con la logica corretta)
    if (classeC === 'C25/30') return 25;
    if (classeC === 'C20/25') return 20;
    return 16;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Convertitore Classi di Resistenza Calcestruzzo</h1>
      <p>Converte tra Rck e classi C (es. C25/30) del calcestruzzo.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rck" className="block text-gray-700 font-bold mb-2">Rck:</label>
          <input
            type="number"
            id="rck"
            value={typeof inputRck === 'number' ? inputRck : ''}
            onChange={handleRckChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="classeC" className="block text-gray-700 font-bold mb-2">Classe C:</label>
          <input
            type="text"
            id="classeC"
            value={inputClasseC}
            onChange={handleClasseCChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {risultato && <p className="mt-4 font-bold">{risultato}</p>}
    </div>
  );
};

export default ConvertitoreClassiCalcestruzzoCalculator;
