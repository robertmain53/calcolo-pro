"use client";
import React, { useState } from 'react';

interface VerificaTraveCementoArmatoData {
  momentoFlettente: number;
  taglio: number;
  torsione: number;
  resistenzaCalcolo: number;
}

const VerificaTraveCementoArmatoCalculator: React.FC = () => {
  const [data, setData] = useState<VerificaTraveCementoArmatoData>({ momentoFlettente: 0, taglio: 0, torsione: 0, resistenzaCalcolo: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: parseFloat(value) }));
  };

  const calcolaResistenza = () => {
    // Aggiungi qui la logica di calcolo in base a NTC 2018 e EC2
    // Questo è un esempio semplificato, sostituisci con la formula corretta
    const resistenza = data.momentoFlettente + data.taglio + data.torsione;
    setData(prevData => ({ ...prevData, resistenzaCalcolo: resistenza }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Analisi e Verifica Trave in Cemento Armato</h1>
      <p className="text-gray-600 mb-4">Flessione, Taglio, Torsione (NTC 2018, EC2)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="momentoFlettente" className="block text-gray-700 font-bold mb-2">Momento Flettente (kNm):</label>
          <input type="number" id="momentoFlettente" name="momentoFlettente" value={data.momentoFlettente} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="taglio" className="block text-gray-700 font-bold mb-2">Taglio (kN):</label>
          <input type="number" id="taglio" name="taglio" value={data.taglio} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="torsione" className="block text-gray-700 font-bold mb-2">Torsione (kNm):</label>
          <input type="number" id="torsione" name="torsione" value={data.torsione} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <button onClick={calcolaResistenza} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Resistenza al Calcolo: {data.resistenzaCalcolo} </p>
      </div>
    </div>
  );
};

export default VerificaTraveCementoArmatoCalculator;
