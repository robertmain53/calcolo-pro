"use client";
import React, { useState } from 'react';

interface EquationSystem2x2 {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

interface EquationSystem3x3 {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
  h: number;
  i: number;
  j: number;
  k: number;
  l: number;
}

const RisoluzioneEquazioniLineariCalculator: React.FC = () => {
  const [system2x2, setSystem2x2] = useState<EquationSystem2x2 | null>(null);
  const [system3x3, setSystem3x3] = useState<EquationSystem3x3 | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handle2x2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSystem2x2({ ...system2x2, [name]: parseFloat(value) });
  };

  const handle3x3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSystem3x3({ ...system3x3, [name]: parseFloat(value) });
  };

  const calculate2x2 = () => {
    if (system2x2) {
      const determinant = system2x2.a * system2x2.d - system2x2.b * system2x2.c;
      if (determinant === 0) {
        setResult('Il sistema non ha una soluzione unica.');
      } else {
        const x = (system2x2.e * system2x2.d - system2x2.b * system2x2.f) / determinant;
        const y = (system2x2.a * system2x2.f - system2x2.e * system2x2.c) / determinant;
        setResult(`x = ${x}, y = ${y}`);
      }
    }
  };

  const calculate3x3 = () => {
    setResult('Calcolo 3x3 non ancora implementato.');
  };

  return (
    <div className="p-4">
      <h1>Risoluzione Sistemi di Equazioni Lineari (2x2 e 3x3)</h1>
      <p>Questo calcolatore risolve sistemi di equazioni lineari 2x2 e 3x3.</p>
      <div className="mb-4">
        <h2>Sistema 2x2</h2>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" name="a" onChange={handle2x2Change} placeholder="a" className="border border-gray-300 p-2" />
          <input type="number" name="b" onChange={handle2x2Change} placeholder="b" className="border border-gray-300 p-2" />
          <input type="number" name="c" onChange={handle2x2Change} placeholder="c" className="border border-gray-300 p-2" />
          <input type="number" name="d" onChange={handle2x2Change} placeholder="d" className="border border-gray-300 p-2" />
          <input type="number" name="e" onChange={handle2x2Change} placeholder="e" className="border border-gray-300 p-2" />
          <input type="number" name="f" onChange={handle2x2Change} placeholder="f" className="border border-gray-300 p-2" />
        </div>
        <button onClick={calculate2x2} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      </div>
      <div className="mb-4">
        <h2>Sistema 3x3</h2>
        <p>Funzionalità in fase di sviluppo.</p>
      </div>
      {result && <p>Risultato: {result}</p>}
    </div>
  );
};

export default RisoluzioneEquazioniLineariCalculator;
