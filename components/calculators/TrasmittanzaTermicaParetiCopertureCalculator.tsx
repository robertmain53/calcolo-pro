"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface TrasmittanzaTermicaData {
  resistenza_superficie_esterna?: number;
  resistenza_materiale1?: number;
  spessore_materiale1?: number;
  conducibilità_materiale1?: number;
  resistenza_materiale2?: number;
  spessore_materiale2?: number;
  conducibilità_materiale2?: number;
  resistenza_superficie_interna?: number;
}

const TrasmittanzaTermicaParetiCopertureCalculator: React.FC = () => {
  const [data, setData] = useState<TrasmittanzaTermicaData>({});
  const [trasmittanza, setTrasmittanza] = useState<number | null>(null);

  const calculateTrasmittanza = () => {
    let totaleResistenza = 0;
    totaleResistenza += data.resistenza_superficie_esterna || 0;
    totaleResistenza += data.resistenza_materiale1 || 0;
    if (data.spessore_materiale1 && data.conducibilità_materiale1) {
      totaleResistenza += data.spessore_materiale1 / data.conducibilità_materiale1;
    }
    totaleResistenza += data.resistenza_materiale2 || 0;
    if (data.spessore_materiale2 && data.conducibilità_materiale2) {
      totaleResistenza += data.spessore_materiale2 / data.conducibilità_materiale2;
    }
    totaleResistenza += data.resistenza_superficie_interna || 0;

    if (totaleResistenza > 0) {
      setTrasmittanza(1 / totaleResistenza);
    } else {
      setTrasmittanza(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Trasmittanza Termica Pareti e Coperture (U)</h1>
      <p className="text-gray-600 mb-4">Calcolo della trasmittanza termica secondo UNI EN ISO 6946.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="resistenza_superficie_esterna">Resistenza superficie esterna (m²K/W):</label>
          <input
            type="number"
            id="resistenza_superficie_esterna"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.resistenza_superficie_esterna || ''}
            onChange={(e) =>
              setData({ ...data, resistenza_superficie_esterna: parseFloat(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="resistenza_materiale1">Resistenza materiale 1 (m²K/W):</label>
          <input
            type="number"
            id="resistenza_materiale1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.resistenza_materiale1 || ''}
            onChange={(e) => setData({ ...data, resistenza_materiale1: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="spessore_materiale1">Spessore materiale 1 (m):</label>
          <input
            type="number"
            id="spessore_materiale1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.spessore_materiale1 || ''}
            onChange={(e) => setData({ ...data, spessore_materiale1: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="conducibilità_materiale1">Conducibilità materiale 1 (W/mK):</label>
          <input
            type="number"
            id="conducibilità_materiale1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.conducibilità_materiale1 || ''}
            onChange={(e) => setData({ ...data, conducibilità_materiale1: parseFloat(e.target.value) })}
          />
        </div>
        {/* Add more material inputs as needed */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="resistenza_superficie_interna">Resistenza superficie interna (m²K/W):</label>
          <input
            type="number"
            id="resistenza_superficie_interna"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.resistenza_superficie_interna || ''}
            onChange={(e) =>
              setData({ ...data, resistenza_superficie_interna: parseFloat(e.target.value) })
            }
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        onClick={calculateTrasmittanza}
      >
        Calcola Trasmittanza
      </button>
      {trasmittanza !== null && (
        <p className="mt-4 text-lg font-bold">Trasmittanza termica (U): {trasmittanza.toFixed(3)} W/m²K</p>
      )}
    </div>
  );
};

export default TrasmittanzaTermicaParetiCopertureCalculator;
