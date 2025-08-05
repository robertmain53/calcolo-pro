"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface Material {
  name: string;
  density: number; // in kg/m³
}

const materials: Material[] = [
  { name: "Calcestruzzo", density: 2400 },
  { name: "Acciaio", density: 7850 },
  { name: "Legno", density: 500 },
  // Add more materials here...
];

const CalcoloPesoProprioMaterialiCostruzioneCalculator: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Calcestruzzo");
  const [volume, setVolume] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(event.target.value);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setVolume(isNaN(value) ? 0 : value);
  };

  React.useEffect(() => {
    const material = materials.find((m) => m.name === selectedMaterial);
    if (material) {
      setWeight(material.density * volume);
    } else {
      setWeight(0);
    }
  }, [selectedMaterial, volume]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Peso Proprio Materiali da Costruzione</h1>
      <p className="text-gray-600 mb-4">Database di materiali comuni (UNI, NTC 2018)</p>
      <div className="mb-4">
        <label htmlFor="material" className="block text-gray-700 font-bold mb-2">Materiale:</label>
        <select
          id="material"
          value={selectedMaterial}
          onChange={handleMaterialChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {materials.map((material) => (
            <option key={material.name} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="volume" className="block text-gray-700 font-bold mb-2">Volume (m³):</label>
        <input
          type="number"
          id="volume"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold">Peso (kg): {weight.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloPesoProprioMaterialiCostruzioneCalculator;
