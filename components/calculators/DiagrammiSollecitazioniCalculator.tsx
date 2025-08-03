"use client";
import React, { useState } from 'react';

interface DiagrammiSollecitazioniData {
  lunghezzaTrave: number;
  caricoConcentrato: number;
  caricoDistribuito: number;
  tipoTrave: string; // 'appoggiata', 'incastrata', 'continua'
}

const DiagrammiSollecitazioniCalculator: React.FC = () => {
  const [data, setData] = useState<DiagrammiSollecitazioniData>({ lunghezzaTrave: 0, caricoConcentrato: 0, caricoDistribuito: 0, tipoTrave: 'appoggiata' });
  const [risultati, setRisultati] = useState<{ sforzoNormale: number; taglio: number; momento: number }>({ sforzoNormale: 0, taglio: 0, momento: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: parseFloat(value) }));
  };

  const handleTraveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData(prevData => ({ ...prevData, tipoTrave: event.target.value }));
  };

  const calculate = () => {
    // Aggiungi qui la logica di calcolo in base al tipo di trave e ai carichi
    // Questo è un esempio semplificato, sostituisci con i calcoli corretti
    let sforzoNormale = 0;
    let taglio = 0;
    let momento = 0;

    if (data.tipoTrave === 'appoggiata') {
      taglio = data.caricoConcentrato / 2;
      momento = (data.caricoConcentrato * data.lunghezzaTrave) / 4;
    } else if (data.tipoTrave === 'incastrata') {
      momento = (data.caricoConcentrato * data.lunghezzaTrave) / 2;
    } else {
      // Calcoli per trave continua
    }
    setRisultati({ sforzoNormale, taglio, momento });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Diagrammi Sollecitazioni</h1>
      <p className="text-gray-600 mb-4">Calcola sforzo normale, taglio e momento per travi appoggiate, incastrate e continue.</p>
      <div className="mb-4">
        <label htmlFor="lunghezzaTrave" className="block text-gray-700 font-bold mb-1">Lunghezza Trave (m):</label>
        <input type="number" id="lunghezzaTrave" name="lunghezzaTrave" value={data.lunghezzaTrave} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="caricoConcentrato" className="block text-gray-700 font-bold mb-1">Carico Concentrato (kN):</label>
        <input type="number" id="caricoConcentrato" name="caricoConcentrato" value={data.caricoConcentrato} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="caricoDistribuito" className="block text-gray-700 font-bold mb-1">Carico Distribuito (kN/m):</label>
        <input type="number" id="caricoDistribuito" name="caricoDistribuito" value={data.caricoDistribuito} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="tipoTrave" className="block text-gray-700 font-bold mb-1">Tipo di Trave:</label>
        <select id="tipoTrave" name="tipoTrave" value={data.tipoTrave} onChange={handleTraveChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="appoggiata">Appoggiata</option>
          <option value="incastrata">Incastrata</option>
          <option value="continua">Continua</option>
        </select>
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      <div className="mt-4">
        <p className="font-bold">Risultati:</p>
        <p>Sforzo Normale: {risultati.sforzoNormale} kN</p>
        <p>Taglio: {risultati.taglio} kN</p>
        <p>Momento: {risultati.momento} kNm</p>
      </div>
    </div>
  );
};

export default DiagrammiSollecitazioniCalculator;
