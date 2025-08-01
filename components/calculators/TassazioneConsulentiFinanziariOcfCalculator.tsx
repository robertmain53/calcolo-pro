"use client";
import React, { useState } from 'react';

interface CalculatorState {
  income: number;
  tax: number;
}

const TassazioneConsulentiFinanziariOcfCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({ income: 0, tax: 0 });

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const income = parseFloat(event.target.value);
    const tax = income * 0.25; // Assumendo una tassazione fissa del 25%
    setCalculatorState({ income, tax });
  };

  return (
    <div className='p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4'>
      <h1 className='text-xl font-bold text-gray-900'>Calcolatore Tassazione per Consulenti Finanziari (con OCF)</h1>
      <p className='text-gray-500'>Calcola la tassazione stimata basata su un reddito inserito.</p>
      <div>
        <label htmlFor='income' className='block mb-2 text-sm font-medium text-gray-900'>Inserisci il tuo reddito annuale:</label>
        <input
          type='number'
          id='income'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          value={calculatorState.income.toString()}
          onChange={handleIncomeChange}
          placeholder='Reddito in euro'
        />
      </div>
      <div className='mt-4'>
        <p className='text-sm text-gray-600'>Tassazione stimata:</p>
        <p className='text-lg font-semibold text-gray-900'>{calculatorState.tax.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default TassazioneConsulentiFinanziariOcfCalculator;