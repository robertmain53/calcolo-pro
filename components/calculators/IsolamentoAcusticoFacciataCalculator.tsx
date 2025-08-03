'use client';
import React, { useState } from 'react';

interface IsolamentoAcusticoProps {
  /**
   * D2m – livello di pressione sonora esterna normalizzato (dB)
   */
  D2m?: number;
  /**
   * nT – tempo di riverberazione interno (s)
   */
  nT?: number;
  /**
   * w – fattore di correzione (dB)
   */
  w?: number;
}

/**
 * Calcolatore dell’indice di isolamento acustico di facciata R<sub>w</sub>.
 * Formula semplificata di esempio:
 *
 *     Rw = D2m + 10 · log10(nT) + w
 *
 * **N.B.** : Rimpiazza la formula con quella prescritta dalla UNI EN ISO 12354‑3.
 */
export default function IsolamentoAcusticoFacciataCalculator({
  D2m: initialD2m = 0,
  nT: initialNT = 0.5,
  w: initialW = 0,
}: IsolamentoAcusticoProps) {
  const [d2m, setD2m] = useState<number | undefined>(initialD2m);
  const [nT, setNT] = useState<number | undefined>(initialNT);
  const [w, setW] = useState<number | undefined>(initialW);

  const calcolaRw = () => {
    if (d2m === undefined || nT === undefined || w === undefined || nT <= 0) return '';
    return d2m + 10 * Math.log10(nT) + w;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Calcolatore Isolamento Acustico di Facciata</h1>

      {/* Input D2m */}
      <div className="mb-4">
        <label htmlFor="d2m" className="block text-sm font-medium text-gray-700">
          D₂m (dB):
        </label>
        <input
          id="d2m"
          type="number"
          step="0.1"
          value={d2m ?? ''}
          onChange={(e) =>
            setD2m(e.target.value === '' ? undefined : parseFloat(e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Input nT */}
      <div className="mb-4">
        <label htmlFor="nt" className="block text-sm font-medium text-gray-700">
          nT (s):
        </label>
        <input
          id="nt"
          type="number"
          step="0.01"
          value={nT ?? ''}
          onChange={(e) =>
            setNT(e.target.value === '' ? undefined : parseFloat(e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Input w */}
      <div className="mb-6">
        <label htmlFor="w" className="block text-sm font-medium text-gray-700">
          w (dB):
        </label>
        <input
          id="w"
          type="number"
          step="0.1"
          value={w ?? ''}
          onChange={(e) =>
            setW(e.target.value === '' ? undefined : parseFloat(e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Output */}
      <div className="text-lg font-semibold">
        R<sub>w</sub>: {calcolaRw() !== '' ? calcolaRw().toFixed(2) : '—'} dB
      </div>
    </div>
  );
}
