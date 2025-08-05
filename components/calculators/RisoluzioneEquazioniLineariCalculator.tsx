'use client';

import React, { useState } from 'react';

/** Coefficienti di un sistema 2×2:
 *  a·x + b·y = e
 *  c·x + d·y = f
 */
interface Eq2 {
  a: string; b: string; c: string; d: string; e: string; f: string;
}

const empty2: Eq2 = { a: '', b: '', c: '', d: '', e: '', f: '' };

const RisoluzioneEquazioniLineariCalculator: React.FC = () => {
  const [sys2, setSys2] = useState<Eq2>(empty2);
  const [result, setResult] = useState<string>('');

  const handle2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSys2(prev => ({ ...prev, [name as keyof Eq2]: value }));
  };

  const solve2x2 = () => {
    const { a, b, c, d, e, f } = sys2;
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c), D = parseFloat(d), E = parseFloat(e), F = parseFloat(f);
    if ([A,B,C,D].some(n => isNaN(n))) return setResult('Inserisci tutti i coefficienti');
    const det = A * D - B * C;
    if (det === 0) return setResult('Il sistema non ha soluzione unica');
    const x = (E * D - B * F) / det;
    const y = (A * F - E * C) / det;
    setResult(`x ≈ ${x.toFixed(3)}, y ≈ ${y.toFixed(3)}`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sistemi lineari 2×2</h1>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {(['a','b','c','d','e','f'] as (keyof Eq2)[]).map((k) => (
          <input
            key={k}
            name={k}
            type="number"
            placeholder={k}
            value={sys2[k]}
            onChange={handle2Change}
            className="border rounded p-2"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={solve2x2}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Risolvi 2×2
      </button>

      <p className="mt-4 font-bold text-indigo-700">{result}</p>

      <h2 className="mt-8 text-xl font-semibold">Sistema 3×3</h2>
      <p className="text-gray-600">Funzionalità in sviluppo.</p>
    </div>
  );
};

export default RisoluzioneEquazioniLineariCalculator;
