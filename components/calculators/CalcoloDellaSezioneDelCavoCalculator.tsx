"use client";
import React, { useState } from 'react';

interface CalculatorData {
  correnteAssorbita: number;
  tensioneNominale: number;
  cadutaTensioneAmmissibile: number;
  resistivitaConduttore: number;
  lunghezzaCavo: number;
}

const CalcoloDellaSezioneDelCavoCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    correnteAssorbita: 0,
    tensioneNominale: 230,
    cadutaTensioneAmmissibile: 3,
    resistivitaConduttore: 0.0175,
    lunghezzaCavo: 10,
  });

  const [sezioneCavo, setSezioneCavo] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const calculateSezioneCavo = () => {
    // Calcolo semplificato (senza considerare fattori di correzione)
    const sezione = (calculatorData.correnteAssorbita * calculatorData.resistivitaConduttore * calculatorData.lunghezzaCavo) / (calculatorData.cadutaTensioneAmmissibile / 1000 * calculatorData.tensioneNominale);
    setSezioneCavo(sezione);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Sezione Cavi</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore permette di fare un dimensionamento di massima dei conduttori elettrici.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="correnteAssorbita" className="block text-gray-700 font-bold mb-2">Corrente Assorbita (A):</label>
          <input
            type="number"
            id="correnteAssorbita"
            name="correnteAssorbita"
            value={calculatorData.correnteAssorbita}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="tensioneNominale" className="block text-gray-700 font-bold mb-2">Tensione Nominale (V):</label>
          <input
            type="number"
            id="tensioneNominale"
            name="tensioneNominale"
            value={calculatorData.tensioneNominale}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="cadutaTensioneAmmissibile" className="block text-gray-700 font-bold mb-2">Caduta di Tensione Ammissibile (%):</label>
          <input
            type="number"
            id="cadutaTensioneAmmissibile"
            name="cadutaTensioneAmmissibile"
            value={calculatorData.cadutaTensioneAmmissibile}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="resistivitaConduttore" className="block text-gray-700 font-bold mb-2">Resistitivit&agrave; del Conduttore (Ohm*mm/m):</label>
          <input
            type="number"
            id="resistivitaConduttore"
            name="resistivitaConduttore"
            value={calculatorData.resistivitaConduttore}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="lunghezzaCavo" className="block text-gray-700 font-bold mb-2">Lunghezza del Cavo (m):</label>
          <input
            type="number"
            id="lunghezzaCavo"
            name="lunghezzaCavo"
            value={calculatorData.lunghezzaCavo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button onClick={calculateSezioneCavo} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola Sezione
      </button>
      {sezioneCavo > 0 && (
        <p className="mt-4 text-lg font-bold">Sezione del cavo necessaria: {sezioneCavo.toFixed(2)} mm&sup2;</p>
      )}
    </div>
  );
};

export default CalcoloDellaSezioneDelCavoCalculator;
