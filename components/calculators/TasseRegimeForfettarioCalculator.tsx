"use client";
import React, { useState } from 'react';

interface CalculatorState {
  reddito: number;
  tasse: number;
  acconti: number;
  saldo: number;
}

const TasseRegimeForfettarioCalculator: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [results, setResults] = useState<CalculatorState>({ reddito: 0, tasse: 0, acconti: 0, saldo: 0 });

  const calculateTax = () => {
    const tasse = input * 0.15;
    const acconti = tasse * 0.9;
    const saldo = tasse - acconti;
    setResults({ reddito: input, tasse, acconti, saldo });
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-xl font-bold text-center mb-4'>Calcolatore Tasse Regime Forfettario (con simulazione acconti e saldi)</h1>
      <p className='text-sm text-center mb-4'>Calcolatore Tasse Regime Forfettario (con simulazione acconti e saldi)</p>
      <input type='number' className='border p-2 w-full mb-4' value={input} onChange={e => setInput(Number(e.target.value))} onBlur={calculateTax} />
      <div className='mt-4'>
        <p>Reddito Imponibile: {results.reddito.toFixed(2)}€</p>
        <p>Tasse Stimata: {results.tasse.toFixed(2)}€</p>
        <p>Acconti: {results.acconti.toFixed(2)}€</p>
        <p>Saldo: {results.saldo.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default TasseRegimeForfettarioCalculator;