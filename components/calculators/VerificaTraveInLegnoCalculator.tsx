'use client';

import React, { useState } from 'react';

interface InputData {
  span: string;  // L (m)
  b: string;     // base sezione (mm)
  h: string;     // altezza sezione (mm)
  fm: string;    // resistenza a flessione (MPa) – ex fy
  fc: string;    // resistenza a compressione (MPa) – ex fck
  q: string;     // carico distribuito (kN/m)
}

const empty: InputData = { span: '', b: '', h: '', fm: '', fc: '', q: '' };

const VerificaTraveInLegnoCalculator: React.FC = () => {
  const [data, setData] = useState<InputData>(empty);
  const [result, setResult] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name as keyof InputData]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const L = parseFloat(data.span);
    const b = parseFloat(data.b);
    const h = parseFloat(data.h);
    const fm = parseFloat(data.fm);
    const q = parseFloat(data.q);
    if ([L, b, h, fm, q].some(v => isNaN(v) || v <= 0)) return setResult('Compila tutti i campi');

    // 👉 Calcolo semplificato: momento max e verifica σ = M/W ≤ fm
    const Mmax = q * L * L / 8;              // kN·m
    const W = (b * h * h) / 6 / 1e3;         // cm³   (mm³ → cm³)
    const sigma = (Mmax * 1e6) / (W * 1e3);  // da kN·m a N·mm ⇒ MPa

    setResult(
      sigma <= fm
        ? `OK: σ = ${sigma.toFixed(2)} MPa ≤ fm = ${fm} MPa`
        : `NON VERIFICATA: σ = ${sigma.toFixed(2)} MPa > fm = ${fm} MPa`
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Verifica Trave in Legno</h1>
      <p className="text-gray-600 mb-4">Flessione semplificata (NTC 2018 / EC5)</p>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {(
          [
            { n: 'span', lbl: 'Luce L (m)' },
            { n: 'b', lbl: 'Base b (mm)' },
            { n: 'h', lbl: 'Altezza h (mm)' },
            { n: 'fm', lbl: 'Resistenza a flessione fm (MPa)' },
            { n: 'q', lbl: 'Carico q (kN/m)' },
          ] as const
        ).map(({ n, lbl }) => (
          <label key={n} className="block">
            <span className="text-gray-700 font-bold">{lbl}</span>
            <input
              type="number"
              name={n}
              value={data[n]}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
            />
          </label>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Calcola
          </button>
        </div>
      </form>

      {result && <p className="mt-4 font-bold text-indigo-700">{result}</p>}
    </div>
  );
};

export default VerificaTraveInLegnoCalculator;
