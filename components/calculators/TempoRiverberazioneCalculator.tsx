"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  volume: number;
  superficieAssorbente: number;
  tempoRiverberazioneSabine: number;
  tempoRiverberazioneEyring: number;
}

const TempoRiverberazioneCalculator: React.FC = () => {
  const [volume, setVolume] = useState<number>(0);
  const [superficieAssorbente, setSuperficieAssorbente] = useState<number>(0);
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({volume:0, superficieAssorbente: 0, tempoRiverberazioneSabine: 0, tempoRiverberazioneEyring: 0});

  const calculate = () => {
    if (volume <=0 || superficieAssorbente <= 0) return;
    const tempoRiverberazioneSabine = 0.161 * volume / superficieAssorbente;
    const tempoRiverberazioneEyring = (0.161 * volume) / (superficieAssorbente + 4*Math.sqrt(superficieAssorbente));
    setCalculatorData({volume: volume, superficieAssorbente: superficieAssorbente, tempoRiverberazioneSabine: tempoRiverberazioneSabine, tempoRiverberazioneEyring: tempoRiverberazioneEyring});
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Tempo di Riverberazione (T60): Formule di Sabine ed Eyring</h1>
      <p className="text-gray-600 mb-4">Calcola il tempo di riverberazione utilizzando le formule di Sabine ed Eyring.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="volume">
          Volume (m³):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="superficieAssorbente">
          Superficie Assorbente (m²):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="superficieAssorbente"
          value={superficieAssorbente}
          onChange={(e) => setSuperficieAssorbente(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={calculate}
      >
        Calcola
      </button>
      {calculatorData.tempoRiverberazioneSabine > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold">Tempo di Riverberazione (Sabine): {calculatorData.tempoRiverberazioneSabine.toFixed(2)} s</p>
          <p className="text-gray-700 font-bold">Tempo di Riverberazione (Eyring): {calculatorData.tempoRiverberazioneEyring.toFixed(2)} s</p>
        </div>
      )}
    </div>
  );
};

export default TempoRiverberazioneCalculator;
