"use client";
import React, { useState } from 'react';

interface DimensionamentoReteProps {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const DimensionamentoReteCalculator: React.FC<DimensionamentoReteProps> = ({ _rowIndex, Titolo, Slug, Categoria, Descrizione, Lingua }) => {
  const [area, setArea] = useState<number | null>(null);
  const [intensitaPioggia, setIntensitaPioggia] = useState<number | null>(null);
  const [coefficienteScolazione, setCoefficienteScolazione] = useState<number | null>(null);
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleCalculate = () => {
    if (area !== null && intensitaPioggia !== null && coefficienteScolazione !== null) {
      const calcolo = area * intensitaPioggia * coefficienteScolazione;
      setRisultato(calcolo);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{Titolo}</h1>
      <p className="text-gray-600 mb-4">{Descrizione}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="area">
          Area (m²):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="area"
          type="number"
          value={area || ''}
          onChange={(e) => setArea(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="intensitaPioggia">
          Intensità di pioggia (mm/h):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="intensitaPioggia"
          type="number"
          value={intensitaPioggia || ''}
          onChange={(e) => setIntensitaPioggia(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="coefficienteScolazione">
          Coefficiente di scolazione:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="coefficienteScolazione"
          type="number"
          value={coefficienteScolazione || ''}
          onChange={(e) => setCoefficienteScolazione(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleCalculate}
      >
        Calcola
      </button>
      {risultato !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Risultato: {risultato} m³/h</p>
        </div>
      )}
    </div>
  );
};

export default DimensionamentoReteCalculator;
