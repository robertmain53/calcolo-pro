"use client";
import React, { useState } from 'react';

const KwCvCalculator: React.FC = () => {
  const [kwValue, setKwValue] = useState(0);
  const [cvValue, setCvValue] = useState(0);

  const handleKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kw = parseFloat(e.target.value);
    setKwValue(kw);
    const cv = kw * 1.35962;
    setCvValue(cv);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cv = parseFloat(e.target.value);
    setCvValue(cv);
    const kw = cv / 1.35962;
    setKwValue(kw);
  };

  return (
    <div className="p-4">
      <h1>Convertitore KW - CV (Cavalli Vapore)</h1>
      <p>Questo calcolatore converte i Kilowatt (KW) in Cavalli Vapore (CV) e viceversa.</p>
      <div className="flex flex-col space-y-4">
        <label htmlFor="kw">Inserisci il valore in Kilowatt (KW):</label>
        <input type="number" id="kw" value={kwValue} onChange={handleKwChange} className="p-2 border border-gray-300 rounded" />
        <label htmlFor="cv">Inserisci il valore in Cavalli Vapore (CV):</label>
        <input type="number" id="cv" value={cvValue} onChange={handleCvChange} className="p-2 border border-gray-300 rounded" />
      </div>
    </div>
  );
};

export default KwCvCalculator;