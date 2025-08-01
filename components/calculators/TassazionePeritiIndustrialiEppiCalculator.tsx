"use client";
import React, { useState } from 'react';

interface CalculatorState {
  income: string;
  tax: number;
}

const TassazionePeritiIndustrialiEppiCalculator: React.FC = () => {
  const [values, setValues] = useState<CalculatorState>({ income: '', tax: 0 });

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const income = event.target.value;
    const tax = parseFloat(income) * 0.33; // Assumed tax rate is 33%
    setValues({ income, tax });
  };

  return (
    <div className='p-4 max-w-xl mx-auto shadow-sm rounded bg-white'>
      <h1 className='text-2xl font-bold text-center text-gray-700 mb-4'>Calcolatore Tassazione per Periti Industriali (con EPPI)</h1>
      <p className='text-gray-600 mb-5'>Calcola in tempo reale la tassazione per i Periti Industriali includendo l&apos;EPPI.</p>
      <input
        type='text'
        value={values.income}
        onChange={handleIncomeChange}
        className='p-2 border-2 border-gray-300 rounded w-full mb-3'
        placeholder='Inserisci il tuo reddito annuale'
      />
      <div className='text-right'>
        <span className='font-semibold'>Tassa stimata: </span>
        <span>{values.tax.toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default TassazionePeritiIndustrialiEppiCalculator;
