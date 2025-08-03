"use client";
import React, { useState } from 'react';

const TassazioneConsulentiFinanziariOcfCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  // Inserisci qui la logica di calcolo

  return (
    <div className="p-4">
      <h1>Calcolatore Tassazione per Consulenti Finanziari (con OCF)</h1>
      <p>Calcola carico fiscale e contributivo tipico dei consulenti finanziari iscritti all'Albo OCF, con dettaglio di acconti e saldo.</p>
      <input type="number" value={inputValue} onChange={handleInputChange} className="border p-2 m-2" />
      <div>Risultato: {result}</div>
    </div>
  );
};

export default TassazioneConsulentiFinanziariOcfCalculator;