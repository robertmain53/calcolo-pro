'use client';

import React, { useState } from 'react';

interface InputData {
  diametroBullone: number;
  resistenzaBullone: number;
  numeroBulloni: number;
}

const initialInput: InputData = {
  diametroBullone: 0,
  resistenzaBullone: 0,
  numeroBulloni: 1,
};

const CalcoloConnessioniBullonateAcciaioCalculator: React.FC = () => {
  // ✅ unico stato, già inizializzato
  const [inputData, setInputData] = useState<InputData>(initialInput);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // cast di `name` a keyof InputData per accontentare TS
    setInputData(prev => ({
      ...prev,
      [name as keyof InputData]: Number(value) || 0,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { diametroBullone, resistenzaBullone, numeroBulloni } = inputData;

    // calcolo semplificato
    const resistenzaTotale =
      diametroBullone * resistenzaBullone * numeroBulloni;
    setRisultato(resistenzaTotale);
  };

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Connessioni Bullonate in Acciaio</h1>
      <p>Resistenza e scorrimento (EC3)</p>

      <form onSubmit={handleSubmit}>
        {/* —— tutti gli input invariati —— */}
        {/* … */}
      </form>

      {risultato !== null && (
        <p className="mt-4 text-green-500 font-bold">
          Resistenza Totale: {risultato} kN
        </p>
      )}
    </div>
  );
};

export default CalcoloConnessioniBullonateAcciaioCalculator;
