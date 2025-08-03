"use client";
import React, { useState } from 'react';

interface DimensionamentoImpiantoFotovoltaicoData {
  potenzaKw: number;
  superficieMq: number;
  produzioneAnnuakWh: number;
}

const DimensionamentoImpiantoFotovoltaicoCalculator: React.FC = () => {
  const [potenzaKw, setPotenzaKw] = useState<number>(0);
  const [superficieMq, setSuperficieMq] = useState<number>(0);
  const [produzioneAnnuakWh, setProduzioneAnnuakWh] = useState<number>(0);

  const handlePotenzaKwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPotenzaKw(isNaN(value) ? 0 : value);
  };

  const handleSuperficieMqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setSuperficieMq(isNaN(value) ? 0 : value);
  };

  const handleProduzioneAnnuakWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setProduzioneAnnuakWh(isNaN(value) ? 0 : value);
  };

  // Calcolo (aggiungere logica di calcolo in base alle esigenze)
  // ...

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Dimensionamento Impianto Fotovoltaico</h1>
      <p className="text-gray-600 mb-4">Calcolo potenza, superficie e producibilità</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="potenzaKw" className="block text-gray-700 font-bold mb-2">Potenza (kW):</label>
          <input
            type="number"
            id="potenzaKw"
            value={potenzaKw}
            onChange={handlePotenzaKwChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="superficieMq" className="block text-gray-700 font-bold mb-2">Superficie (m²):</label>
          <input
            type="number"
            id="superficieMq"
            value={superficieMq}
            onChange={handleSuperficieMqChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="produzioneAnnuakWh" className="block text-gray-700 font-bold mb-2">Produzione Annuale (kWh):</label>
          <input
            type="number"
            id="produzioneAnnuakWh"
            value={produzioneAnnuakWh}
            onChange={handleProduzioneAnnuakWhChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {/* Risultati del calcolo */}
    </div>
  );
};

export default DimensionamentoImpiantoFotovoltaicoCalculator;
