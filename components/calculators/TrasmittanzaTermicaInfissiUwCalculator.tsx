"use client";
import React, { useState } from 'react';

const TrasmittanzaTermicaInfissiUwCalculator: React.FC = () => {
  const [uf, setUf] = useState<number>(0);
  const [ug, setUg] = useState<number>(0);
  const [psig, setPsig] = useState<number>(0);
  const [uw, setUw] = useState<number>(0);

  // Calcolo della trasmittanza termica Uw
  const calculateUw = () => {
    const calculatedUw = uf + ug + psig;
    setUw(calculatedUw);
  };

  return (
    <div className="p-4">
      <h1>Trasmittanza Termica Infissi (Uw): Calcolo basato su Uf, Ug e ψg</h1>
      <p>Calcolo basato su Uf, Ug e ψg</p>
      <input type="number" value={uf} onChange={(e) => setUf(parseFloat(e.target.value))} />
      <input type="number" value={ug} onChange={(e) => setUg(parseFloat(e.target.value))} />
      <input type="number" value={psig} onChange={(e) => setPsig(parseFloat(e.target.value))} />
      <button onClick={calculateUw}>Calcola Uw</button>
      <p>Risultato Uw: {uw}</p>
    </div>
  );
};

export default TrasmittanzaTermicaInfissiUwCalculator;