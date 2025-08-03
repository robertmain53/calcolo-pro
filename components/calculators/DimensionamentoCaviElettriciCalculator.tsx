"use client";
import React, { useState } from 'react';

const DimensionamentoCaviElettriciCalculator: React.FC = () => {
  const [portata, setPortata] = useState<number>(0);
  const [cadutaTensione, setCadutaTensione] = useState<number>(0);
  const [tipoPosa, setTipoPosa] = useState<string>('');
  const [sezioneCavo, setSezioneCavo] = useState<number>(0);

  // Funzione per calcolare la sezione del cavo
  const calcolaSezioneCavo = () => {
    // Calcoli per determinare la sezione del cavo in base ai dati inseriti
    const risultato = 0; // Sostituire con il calcolo effettivo
    setSezioneCavo(risultato);
  };

  return (
    <div className="p-4">
      <h1>Dimensionamento Cavi Elettrici Calculator</h1>
      <p>In base a portata, caduta di tensione e tipo di posa (CEI 64-8)</p>
      <input type="number" value={portata} onChange={(e) => setPortata(parseInt(e.target.value))} />
      <input type="number" value={cadutaTensione} onChange={(e) => setCadutaTensione(parseInt(e.target.value))} />
      <input type="text" value={tipoPosa} onChange={(e) => setTipoPosa(e.target.value)} />
      <button onClick={calcolaSezioneCavo}>Calcola Sezione Cavo</button>
      <p>Sezione del cavo: {sezioneCavo}</p>
    </div>
  );
};

export default DimensionamentoCaviElettriciCalculator;