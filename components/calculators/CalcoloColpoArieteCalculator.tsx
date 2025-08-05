"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface AllieviCalculatorProps {
  initialVelocity?: number;
  waveSpeed?: number;
  pipeLength?: number;
  closureTime?: number;
}

const AllieviCalculator: React.FC<AllieviCalculatorProps> = ({ initialVelocity = 0, waveSpeed = 0, pipeLength = 0, closureTime = 0 }) => {
  const [velocity, setVelocity] = useState<number>(initialVelocity);
  const [waveSpeedValue, setWaveSpeed] = useState<number>(waveSpeed);
  const [pipeLengthValue, setPipeLength] = useState<number>(pipeLength);
  const [closureTimeValue, setClosureTime] = useState<number>(closureTime);

  const pressureRise = () => {
    if (waveSpeedValue <=0 || pipeLengthValue <= 0 || closureTimeValue <=0) return 0;
    return (velocity * waveSpeedValue) / (pipeLengthValue / closureTimeValue);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo del Colpo d'Ariete: Formula di Allievi per chiusura rapida</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore utilizza la formula di Allievi per determinare l'aumento di pressione dovuto al colpo d'ariete in una condotta durante una chiusura rapida.</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="velocity" className="block text-gray-700 font-bold mb-2">Velocità iniziale (m/s):</label>
          <input
            type="number"
            id="velocity"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={velocity}
            onChange={(e) => setVelocity(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="waveSpeed" className="block text-gray-700 font-bold mb-2">Velocità d'onda (m/s):</label>
          <input
            type="number"
            id="waveSpeed"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={waveSpeedValue}
            onChange={(e) => setWaveSpeed(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="pipeLength" className="block text-gray-700 font-bold mb-2">Lunghezza condotta (m):</label>
          <input
            type="number"
            id="pipeLength"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={pipeLengthValue}
            onChange={(e) => setPipeLength(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="closureTime" className="block text-gray-700 font-bold mb-2">Tempo di chiusura (s):</label>
          <input
            type="number"
            id="closureTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={closureTimeValue}
            onChange={(e) => setClosureTime(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700 font-bold">Aumento di pressione (m/s): {pressureRise().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AllieviCalculator;
