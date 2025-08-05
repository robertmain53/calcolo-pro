'use client';

import React, { useState } from 'react';

interface Result {
  area: number;
  cx: number;
  cy: number;
  Ix: number;
  Iy: number;
}

type SectionKind = 'rectangle' | 'circle'; // estendi qui per T o I

const ProprietaSezioniGeometricheCalculator: React.FC = () => {
  const [type, setType] = useState<SectionKind>('rectangle');
  const [w, setW] = useState<string>('');  // larghezza o diametro
  const [h, setH] = useState<string>('');  // altezza solo rettangolo
  const [res, setRes] = useState<Result | null>(null);

  const parse = (s: string) => parseFloat(s) || 0;

  const calc = () => {
    const width = parse(w);
    const height = parse(h);
    if (type === 'rectangle' && (width <= 0 || height <= 0)) return;
    if (type === 'circle' && width <= 0) return;

    let area = 0, cx = 0, cy = 0, Ix = 0, Iy = 0;

    if (type === 'rectangle') {
      area = width * height;
      cx = width / 2;
      cy = height / 2;
      Ix = (width * Math.pow(height, 3)) / 12;
      Iy = (height * Math.pow(width, 3)) / 12;
    } else if (type === 'circle') {
      const r = width / 2;
      area = Math.PI * r * r;
      cx = cy = 0;
      Ix = Iy = (Math.PI * Math.pow(r, 4)) / 4;
    }
    setRes({ area, cx, cy, Ix, Iy });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Proprietà Sezioni Geometriche</h1>

      <label className="block mb-4">
        <span className="font-bold text-gray-700">Tipo sezione:</span>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as SectionKind);
            setRes(null);
          }}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="rectangle">Rettangolo</option>
          <option value="circle">Cerchio</option>
        </select>
      </label>

      {type === 'rectangle' && (
        <>
          <label className="block mb-2">
            <span className="text-gray-700">Larghezza b (mm):</span>
            <input
              type="number"
              value={w}
              onChange={(e) => setW(e.target.value)}
              className="mt-1 w-full border rounded p-2"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Altezza h (mm):</span>
            <input
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="mt-1 w-full border rounded p-2"
            />
          </label>
        </>
      )}

      {type === 'circle' && (
        <label className="block mb-4">
          <span className="text-gray-700">Diametro d (mm):</span>
          <input
            type="number"
            value={w}
            onChange={(e) => setW(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </label>
      )}

      <button
        type="button"
        onClick={calc}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calcola
      </button>

      {res && (
        <div className="mt-4 space-y-1 text-gray-800">
          <p>Area A = {res.area.toFixed(2)} mm²</p>
          <p>Centroide (x̄, ȳ) = ({res.cx.toFixed(2)}, {res.cy.toFixed(2)}) mm</p>
          <p>I<sub>x</sub> = {res.Ix.toFixed(2)} mm⁴</p>
          <p>I<sub>y</sub> = {res.Iy.toFixed(2)} mm⁴</p>
        </div>
      )}
    </div>
  );
};

export default ProprietaSezioniGeometricheCalculator;
