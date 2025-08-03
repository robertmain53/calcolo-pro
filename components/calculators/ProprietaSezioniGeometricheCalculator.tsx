"use client";
import React, { useState } from 'react';

interface SectionProperties {
  area: number;
  centroidX: number;
  centroidY: number;
  momentInertiaX: number;
  momentInertiaY: number;
}

const SectionType = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  T: 't',
  I: 'i',
} as const;

type SectionTypeKey = keyof typeof SectionType;

const ProprietaSezioniGeometricheCalculator: React.FC = () => {
  const [sectionType, setSectionType] = useState<SectionTypeKey>('rectangle');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);
  const [results, setResults] = useState<SectionProperties | null>(null);

  const calculate = () => {
    let area = 0;
    let centroidX = 0;
    let centroidY = 0;
    let momentInertiaX = 0;
    let momentInertiaY = 0;

    switch (sectionType) {
      case 'rectangle':
        area = width * height;
        centroidX = width / 2;
        centroidY = height / 2;
        momentInertiaX = (width * height ** 3) / 12;
        momentInertiaY = (height * width ** 3) / 12;
        break;
      case 'circle':
        area = Math.PI * radius ** 2;
        centroidX = 0;
        centroidY = 0;
        momentInertiaX = Math.PI * radius ** 4 / 4;
        momentInertiaY = Math.PI * radius ** 4 / 4;
        break;
      // Add calculations for T and I sections here
      default:
        break;
    }

    setResults({
      area,
      centroidX,
      centroidY,
      momentInertiaX,
      momentInertiaY,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Calcolo Proprietà Sezioni Geometriche</h1>
      <p className="mb-4">Calcola area, baricentro e momenti d'inerzia per sezioni geometriche comuni.</p>
      <div className="mb-4">
        <label htmlFor="sectionType" className="block text-gray-700 font-bold mb-2">Tipo di Sezione:</label>
        <select
          id="sectionType"
          value={sectionType}
          onChange={(e) => setSectionType(e.target.value as SectionTypeKey)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="rectangle">Rettangolo</option>
          <option value="circle">Cerchio</option>
          <option value="t">T</option>
          <option value="i">I</option>
        </select>
      </div>
      {sectionType === 'rectangle' && (
        <>
          <div className="mb-4">
            <label htmlFor="width" className="block text-gray-700 font-bold mb-2">Larghezza:</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Altezza:</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </>
      )}
      {sectionType === 'circle' && (
        <div className="mb-4">
          <label htmlFor="radius" className="block text-gray-700 font-bold mb-2">Raggio:</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      {results && (
        <div className="mt-4">
          <p>Area: {results.area}</p>
          <p>Centroide X: {results.centroidX}</p>
          <p>Centroide Y: {results.centroidY}</p>
          <p>Momento d'inerzia X: {results.momentInertiaX}</p>
          <p>Momento d'inerzia Y: {results.momentInertiaY}</p>
        </div>
      )}
    </div>
  );
};

export default ProprietaSezioniGeometricheCalculator;
