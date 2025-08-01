"use client";
import React, { useState } from 'react';

interface CalculatorState {
  reddito: number;
  ires: number;
  irap: number;
}

const CalcoloIresIrapSrlSrlsCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({ reddito: 0, ires: 0, irap: 0 });

  const handleRedditoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reddito = parseFloat(event.target.value);
    const ires = reddito * 0.24; // 24% per l'IRES
    const irap = reddito * 0.036; // 3.6% per l'IRAP
    setState({ reddito, ires, irap });
  };

  return (
    <div className='p-4 max-w-sm mx-auto'>
      <h1 className='text-lg font-bold'>Calcolatore IRES e IRAP per SRL e SRLS</h1>
      <p className='mb-4'>Inserisci il reddito per calcolare l&apos;IRES (24%) e l&apos;IRAP (3.6%) per le Società a Responsabilità Limitata (SRL e SRLS).</p>
      <input
        type='number'
        value={state.reddito.toString()}
        onChange={handleRedditoChange}
        className='input input-bordered w-full mb-4'
        placeholder='Inserisci il reddito in €'
      />
      <p className='mb-2'>Reddito: €{state.reddito.toFixed(2)}</p>
      <p className='mb-2'>IRES: €{state.ires.toFixed(2)}</p>
      <p className='mb-2'>IRAP: €{state.irap.toFixed(2)}</p>
    </div>
  );
};

export default CalcoloIresIrapSrlSrlsCalculator;
