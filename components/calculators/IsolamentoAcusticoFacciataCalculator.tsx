'use client';

import React, { useState } from 'react';

interface Props {
  /** D2m – livello di pressione sonora esterna normalizzato (dB) */
  D2m?: number;
  /** nT – tempo di riverberazione interno (s) */
  nT?: number;
  /** w – fattore di correzione (dB) */
  w?: number;
}

/**
 * Calcolatore dell’indice di isolamento acustico di facciata Rw.
 * Formula semplificata d’esempio:
 *   Rw = D2m + 10·log10(nT) + w
 *
 * Sostituisci con la relazione UNI EN ISO 12354‑3 se ti occorre precisione.
 */
export default function IsolamentoAcusticoFacciataCalculator({
  D2m: initialD2m = 0,
  nT: initialNT = 0.5,
  w: initialW = 0,
}: Props) {
  // 👉 gestiamo gli input come stringhe: niente undefined e niente NaN
  const [d2m, setD2m] = useState<string>(String(initialD2m));
  const [nT, setNT] = useState<string>(String(initialNT));
  const [w, setW] = useState<string>(String(initialW));

  const calcolaRw = (): number | null => {
    const D = parseFloat(d2m);
    const N = parseFloat(nT);
    const W = parseFloat(w);
    if (isNaN(D) || isNaN(N) || isNaN(W) || N <= 0) return null;
    return D + 10 * Math.log10(N) + W;
  };

  const Rw = calcolaRw();

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Isolamento Acustico di Facciata</h1>

      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">D₂m (dB):</span>
        <input
          type="number"
          step="0.1"
          value={d2m}
          onChange={(e) => setD2m(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">nT (s):</span>
        <input
          type="number"
          step="0.01"
          value={nT}
          onChange={(e) => setNT(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-6">
        <span className="text-sm font-medium text-gray-700">w (dB):</span>
        <input
          type="number"
          step="0.1"
          value={w}
          onChange={(e) => setW(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <p className="text-lg font-semibold">
        R<sub>w</sub>: {Rw !== null ? Rw.toFixed(2) : '—'} dB
      </p>
    </div>
  );
}
