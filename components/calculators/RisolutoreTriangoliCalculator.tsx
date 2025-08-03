"use client";
import React, { useState } from 'react';

const RisolutoreTriangoliCalculator: React.FC = () => {
  const [sideA, setSideA] = useState<number>(0);
  const [sideB, setSideB] = useState<number>(0);
  const [sideC, setSideC] = useState<number>(0);
  const [angleA, setAngleA] = useState<number>(0);
  const [angleB, setAngleB] = useState<number>(0);
  const [angleC, setAngleC] = useState<number>(0);

  // Calcolo in tempo reale

  return (
    <div className="p-4">
      <h1>Risolutore Triangoli</h1>
      <p>Dati lati e/o angoli (Teorema dei seni e del coseno)</p>
      {/* Inserisci qui il codice per il calcolatore */}
    </div>
  );
};

export default RisolutoreTriangoliCalculator;