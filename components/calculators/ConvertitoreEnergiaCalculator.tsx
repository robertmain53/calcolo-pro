"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface EnergyData {
  joules: number;
  kilowattHours: number;
}

const ConvertitoreEnergiaCalculator: React.FC = () => {
  const [energy, setEnergy] = useState<EnergyData>({ joules: 0, kilowattHours: 0 });

  const handleJoulesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setEnergy({ joules: value, kilowattHours: value / 3600000 });
  };

  const handleKilowattHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setEnergy({ joules: value * 3600000, kilowattHours: value });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Convertitore Unità di Misura: Energia (J, kWh)</h1>
      <p>Questo strumento converte istantaneamente tra Joule (J) e kilowattora (kWh).</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="joules" className="block text-gray-700 font-bold mb-2">Joule (J):</label>
          <input
            type="number"
            id="joules"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={energy.joules}
            onChange={handleJoulesChange}
          />
        </div>
        <div>
          <label htmlFor="kilowattHours" className="block text-gray-700 font-bold mb-2">Kilowattora (kWh):</label>
          <input
            type="number"
            id="kilowattHours"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={energy.kilowattHours}
            onChange={handleKilowattHoursChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertitoreEnergiaCalculator;