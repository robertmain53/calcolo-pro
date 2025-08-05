"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CorrezioneAcusticaAmbientiCalculatorProps {
  volume?: number;
  superficie?: number;
  coefficienteAssorbimento?: number;
}

const CorrezioneAcusticaAmbientiCalculator: React.FC<CorrezioneAcusticaAmbientiCalculatorProps> = ({ volume = 0, superficie = 0, coefficienteAssorbimento = 0 }) => {
  const [volumeInput, setVolumeInput] = useState<string>(volume.toString());
  const [superficieInput, setSuperficieInput] = useState<string>(superficie.toString());
  const [coefficienteAssorbimentoInput, setCoefficienteAssorbimentoInput] = useState<string>(coefficienteAssorbimento.toString());

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeInput(event.target.value);
  };

  const handleSuperficieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuperficieInput(event.target.value);
  };

  const handleCoefficienteAssorbimentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoefficienteAssorbimentoInput(event.target.value);
  };

  const calculatedResult = () => {
    const volumeNum = parseFloat(volumeInput);
    const superficieNum = parseFloat(superficieInput);
    const coefficienteAssorbimentoNum = parseFloat(coefficienteAssorbimentoInput);

    if (isNaN(volumeNum) || isNaN(superficieNum) || isNaN(coefficienteAssorbimentoNum)) {
      return 0;
    }

    // Aggiungi qui la tua logica di calcolo
    // Esempio:  return volumeNum * superficieNum * coefficienteAssorbimentoNum;
    return 0; // Sostituisci con il tuo calcolo
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Correzione Acustica Ambienti: Calcolo del materiale fonoassorbente necessario</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore aiuta a determinare la quantità di materiale fonoassorbente necessaria per migliorare l'acustica di un ambiente.</p>
      <div className="mb-4">
        <label htmlFor="volume" className="block text-gray-700 font-bold mb-2">Volume (m³):</label>
        <input
          type="number"
          id="volume"
          value={volumeInput}
          onChange={handleVolumeChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="superficie" className="block text-gray-700 font-bold mb-2">Superficie (m²):</label>
        <input
          type="number"
          id="superficie"
          value={superficieInput}
          onChange={handleSuperficieChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coefficienteAssorbimento" className="block text-gray-700 font-bold mb-2">Coefficiente di assorbimento:</label>
        <input
          type="number"
          id="coefficienteAssorbimento"
          value={coefficienteAssorbimentoInput}
          onChange={handleCoefficienteAssorbimentoChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </div>
      <p className="text-gray-600">Risultato: {calculatedResult()}</p>
    </div>
  );
};

export default CorrezioneAcusticaAmbientiCalculator;
