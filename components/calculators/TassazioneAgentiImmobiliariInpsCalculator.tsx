"use client";
import React, { useState } from 'react';

interface TassazioneAgentiImmobilariInpsCalculatorProps {}

const TassazioneAgentiImmobilariInpsCalculator: React.FC<TassazioneAgentiImmobilariInpsCalculatorProps> = () => {
    const [income, setIncome] = useState<string>('');
    const [tax, setTax] = useState<number>(0);

    const calculateTax = (income: string) => {
        const numericIncome = parseFloat(income);
        if (!isNaN(numericIncome)) {
            const inpsTax = numericIncome * 0.25; // Assumed INPS tax rate
            const additionalTax = numericIncome * 0.10; // Assumed additional tax rate
            const totalTax = inpsTax + additionalTax;
            setTax(totalTax);
        }
    };

    return (
        <div className='p-4 bg-gray-50 rounded-lg shadow-md'>
            <h1 className='text-xl font-bold text-gray-700'>Calcolatore Tassazione per Agenti Immobiliari (con INPS Commercianti)</h1>
            <p className='mb-4 text-gray-600'>Calcola le tasse dovute includendo l&apos;INPS per l&apos;attività di agente immobiliare.</p>
            <input type='text'
                   className='px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                   value={income}
                   onChange={e => setIncome(e.target.value)}
                   onBlur={() => calculateTax(income)}
                   placeholder='Inserisci il tuo reddito'/>
            <p className='mt-2 text-gray-800'>Tassa calcolata: € {tax.toFixed(2)}</p>
        </div>
    );
};

export default TassazioneAgentiImmobilariInpsCalculator;
