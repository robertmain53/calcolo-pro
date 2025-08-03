"use client";
import React, { useState } from 'react';

const ProprietaSezioniComposteCalculator: React.FC = () => {
  const [area1, setArea1] = useState<number>(0);
  const [area2, setArea2] = useState<number>(0);
  const [risultato, setRisultato] = useState<number>(0);

  const calcolaRisultato = () => {
    setRisultato(area1 + area2);
  };

  return (
    <div className="p-4">
      <h1>Proprieta Sezioni Composte Calculator</h1>
      <p>Metodo per somma/sottrazione di aree</p>
      <input type="number" value={area1} onChange={(e) => setArea1(parseInt(e.target.value))} className="p-2 m-2 border rounded-lg" />
      <input type="number" value={area2} onChange={(e) => setArea2(parseInt(e.target.value))} className="p-2 m-2 border rounded-lg" />
      <button onClick={calcolaRisultato} className="p-2 bg-blue-500 text-white rounded-lg">Calcola</button>
      <p>Risultato: {risultato}</p>
    </div>
  );
};

export default ProprietaSezioniComposteCalculator;