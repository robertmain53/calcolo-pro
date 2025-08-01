"use client";
import React, { useState } from 'react';

interface CalculatorProps {}

const CostoTotaleDipendenteCuneoFiscaleCalculator: React.FC<CalculatorProps> = () => {
  const [netSalary, setNetSalary] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const salary = parseFloat(event.target.value);
    if (!isNaN(salary)) {
      setNetSalary(salary);
      const calculatedCost = salary * 1.25; // Simulating total cost calculation
      setTotalCost(calculatedCost);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1>Calcolatore Costo Totale Dipendente (Cuneo Fiscale)</h1>
      <p>Inserisci il salario netto del dipendente per calcolare il costo totale.</p>
      <div className='my-4'>
        <label htmlFor='netSalary' className='block text-sm font-medium text-gray-700'>Salario Netto</label>
        <input type='number' id='netSalary' name='netSalary' value={netSalary} onChange={handleSalaryChange} className='mt-1 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md' />
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>Costo Totale Dipendente</label>
        <p>{totalCost.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CostoTotaleDipendenteCuneoFiscaleCalculator;