'use client';

import React, { useState, useEffect } from 'react';

interface Inputs {
  Uf: string;   // telaio W/m²K
  Ug: string;   // vetro  W/m²K
  psiG: string; // ponte termico W/mK
}

const empty: Inputs = { Uf: '', Ug: '', psiG: '' };

const TrasmittanzaTermicaInfissiUwCalculator: React.FC = () => {
  const [inp, setInp] = useState<Inputs>(empty);
  const [uw, setUw] = useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInp(prev => ({ ...prev, [name as keyof Inputs]: value }));
  };

  useEffect(() => {
    const Uf = parseFloat(inp.Uf);
    const Ug = parseFloat(inp.Ug);
    const psi = parseFloat(inp.psiG);
    if ([Uf, Ug, psi].some((v) => isNaN(v))) return setUw(null);
    setUw(Uf + Ug + psi);
  }, [inp]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Uw infissi</h1>
      <p className="text-gray-600 mb-4">
        Inserisci Uf (telaio), Ug (vetro) e ψ<sub>g</sub> (ponte termico) per
        ottenere la trasmittanza Uw.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {([
          { k: 'Uf', lbl: 'Uf (W/m²K)' },
          { k: 'Ug', lbl: 'Ug (W/m²K)' },
          { k: 'psiG', lbl: 'ψg (W/mK)' },
        ] as const).map(({ k, lbl }) => (
          <label key={k} className="block text-gray-700 font-bold">
            {lbl}
            <input
              type="number"
              name={k}
              value={inp[k]}
              onChange={onChange}
              className="mt-1 w-full border rounded p-2 shadow"
            />
          </label>
        ))}
      </div>

      {uw !== null && (
        <p className="mt-4 text-xl font-bold text-indigo-700">
          Uw ≈ {uw.toFixed(2)} W/m²K
        </p>
      )}
    </div>
  );
};

export default TrasmittanzaTermicaInfissiUwCalculator;
