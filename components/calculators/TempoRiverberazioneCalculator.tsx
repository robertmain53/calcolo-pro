"use client";
import React, { useState } from 'react';

const TempoRiverberazioneCalculator: React.FC = () => {
  const [area, setArea] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [coefficenteAssorbimento, setCoefficenteAssorbimento] = useState<number>(0);
  const [tempoRiverberazioneSabine, setTempoRiverberazioneSabine] = useState<number>(0);
  const [tempoRiverberazioneEyring, setTempoRiverberazioneEyring] = useState<number>(0);

  // Calcolo del tempo di riverberazione secondo la formula di Sabine
  const calculateTempoRiverberazioneSabine = () => {
    const tempo = 0.161 * volume / area * coefficenteAssorbimento;
    setTempoRiverberazioneSabine(tempo);
  };

  // Calcolo del tempo di riverberazione secondo la formula di Eyring
  const calculateTempoRiverberazioneEyring = () => {
    const tempo = 0.049 * volume / area * coefficenteAssorbimento;
    setTempoRiverberazioneEyring(tempo);
  };

  return (
    <div className="p-4">
      <h1>Tempo di Riverberazione (T60​): Formule di Sabine ed Eyring</h1>
      <p>Formule di Sabine ed Eyring</p>
      {/* Input fields and buttons for user interaction */}
    </div>
  );
};

export default TempoRiverberazioneCalculator;