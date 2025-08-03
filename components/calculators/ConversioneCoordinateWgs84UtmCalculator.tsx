"use client";
import React, { useState } from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
  utmZone: number;
  utmEasting: number;
  utmNorthing: number;
}

const ConversioneCoordinateWGS84UTMCalculator: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate>({ latitude: 0, longitude: 0, utmZone: 32, utmEasting: 0, utmNorthing: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCoordinates((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  // Placeholder for conversion logic (replace with actual conversion)
  const convertCoordinates = () => {
    // Implement conversion logic here using a library like proj4js
    console.log('Conversion not yet implemented');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Conversione Coordinate (Geografiche WGS84 &lt;&gt; Piane UTM)</h1>
      <p className="text-gray-600 mb-4">Per cartografia e GIS</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-gray-700 font-bold mb-2">Latitudine (WGS84):</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={coordinates.latitude}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-gray-700 font-bold mb-2">Longitudine (WGS84):</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={coordinates.longitude}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="utmZone" className="block text-gray-700 font-bold mb-2">Zona UTM:</label>
          <input
            type="number"
            id="utmZone"
            name="utmZone"
            value={coordinates.utmZone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="utmEasting" className="block text-gray-700 font-bold mb-2">Easting (UTM):</label>
          <input
            type="number"
            id="utmEasting"
            name="utmEasting"
            value={coordinates.utmEasting}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="utmNorthing" className="block text-gray-700 font-bold mb-2">Northing (UTM):</label>
          <input
            type="number"
            id="utmNorthing"
            name="utmNorthing"
            value={coordinates.utmNorthing}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button onClick={convertCoordinates} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Converti
      </button>
    </div>
  );
};

export default ConversioneCoordinateWGS84UTMCalculator;
