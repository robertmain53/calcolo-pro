'use client';

import React, { useState } from 'react';

interface PenetroData {
  Nspt: number; // colpi SPT
  qc: number;   // punta CPT (MPa)
  fs: number;   // manica CPT (kPa)
}

const initialData: PenetroData = { Nspt: 0, qc: 0, fs: 0 };

const CorrelazioniProvePenetrometricheCalculator: React.FC = () => {
  const [data, setData] = useState<PenetroData>(initialData);
  const [phiPrima, setPhiPrima] = useState<number | null>(null);
  const [cu, setCu] = useState<number | null>(null);
  const [Ed, setEd] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name as keyof PenetroData]: Number(value) || 0,
    }));
  };

  const calculate = () => {
    const { Nspt, qc, fs } = data;

    // 👉 Correlazioni esemplificative – sostituisci con formule valide
    const phi  = 27 + 0.3 * Nspt;     // deg
    const cu_kPa = 0.22 * qc;         // kPa
    const Ed_MPa = 2 * fs;            // MPa

    setPhiPrima(phi);
    setCu(cu_kPa);
    setEd(Ed_MPa);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">
        Correlazioni Penetrometriche (ϕ′, cu, Ed)
      </h1>
      <p className="text-gray-600 mb-4">
        Stima dei parametri geotecnici da SPT &amp; CPT – formule indicative.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="font-bold text-gray-700">Nspt:</span>
          <input
            type="number"
            name="Nspt"
            value={data.Nspt}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700">qc (MPa):</span>
          <input
            type="number"
            name="qc"
            value={data.qc}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700">fs (kPa):</span>
          <input
            type="number"
            name="fs"
            value={data.fs}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded p-2"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={calculate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola
      </button>

      <div className="mt-6 space-y-1 text-gray-800">
        {phiPrima !== null && <p>ϕ′ ≈ {phiPrima.toFixed(1)}°</p>}
        {cu !== null && <p>cu ≈ {cu.toFixed(1)} kPa</p>}
        {Ed !== null && <p>Ed ≈ {Ed.toFixed(1)} MPa</p>}
      </div>
    </div>
  );
};

export default CorrelazioniProvePenetrometricheCalculator;
