"use client";
import React, { useState } from 'react';

interface HardnessData {
  brinell: number | null;
  rockwell: number | null;
  vickers: number | null;
}

const ConvertitoreDurezzaMaterialiCalculator: React.FC = () => {
  const [hardness, setHardness] = useState<HardnessData>({ brinell: null, rockwell: null, vickers: null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHardness((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : null,
    }));
  };

  // Conversion functions (replace with actual conversion logic)
  const convertBrinellToRockwell = (brinell: number): number => {
    // Implement conversion logic here
    return brinell * 0.5; // Placeholder
  };

  const convertBrinellToVickers = (brinell: number): number => {
    // Implement conversion logic here
    return brinell * 0.8; // Placeholder
  };

  const convertRockwellToBrinell = (rockwell: number): number => {
    // Implement conversion logic here
    return rockwell * 2; // Placeholder
  };

  const convertRockwellToVickers = (rockwell: number): number => {
    // Implement conversion logic here
    return rockwell * 1.6; // Placeholder
  };

  const convertVickersToBrinell = (vickers: number): number => {
    // Implement conversion logic here
    return vickers * 1.25; // Placeholder
  };

  const convertVickersToRockwell = (vickers: number): number => {
    // Implement conversion logic here
    return vickers * 0.625; // Placeholder
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Convertitore Durezza Materiali</h1>
      <p className="text-gray-600 mb-4">Converte tra Brinell (HB), Rockwell (HRC) e Vickers (HV).</p>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="brinell" className="block text-gray-700 font-bold mb-2">Brinell (HB):</label>
          <input
            type="number"
            id="brinell"
            name="brinell"
            value={hardness.brinell || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {hardness.brinell !== null && (
            <>
              <p>Rockwell (HRC): {convertBrinellToRockwell(hardness.brinell)}</p>
              <p>Vickers (HV): {convertBrinellToVickers(hardness.brinell)}</p>
            </>
          )}
        </div>
        <div>
          <label htmlFor="rockwell" className="block text-gray-700 font-bold mb-2">Rockwell (HRC):</label>
          <input
            type="number"
            id="rockwell"
            name="rockwell"
            value={hardness.rockwell || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {hardness.rockwell !== null && (
            <>
              <p>Brinell (HB): {convertRockwellToBrinell(hardness.rockwell)}</p>
              <p>Vickers (HV): {convertRockwellToVickers(hardness.rockwell)}</p>
            </>
          )}
        </div>
        <div>
          <label htmlFor="vickers" className="block text-gray-700 font-bold mb-2">Vickers (HV):</label>
          <input
            type="number"
            id="vickers"
            name="vickers"
            value={hardness.vickers || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {hardness.vickers !== null && (
            <>
              <p>Brinell (HB): {convertVickersToBrinell(hardness.vickers)}</p>
              <p>Rockwell (HRC): {convertVickersToRockwell(hardness.vickers)}</p>
            <>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvertitoreDurezzaMaterialiCalculator;
