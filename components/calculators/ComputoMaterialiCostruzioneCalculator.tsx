"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface ComputoMaterialiData {
  volumeCalcestruzzo?: number;
  pesoAcciaio?: number;
  numeroMattoni?: number;
}

const ComputoMaterialiCalculator: React.FC = () => {
  const [data, setData] = useState<ComputoMaterialiData>({});
  const [results, setResults] = useState<ComputoMaterialiData>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    // Calcolo dei risultati (esempio)
    if (data.volumeCalcestruzzo) {
      setResults(prevResults => ({ ...prevResults, volumeCalcestruzzo: data.volumeCalcestruzzo }));
    }
    if (data.pesoAcciaio) {
      setResults(prevResults => ({ ...prevResults, pesoAcciaio: data.pesoAcciaio }));
    }
    if (data.numeroMattoni) {
      setResults(prevResults => ({ ...prevResults, numeroMattoni: data.numeroMattoni }));
    }
  }, [data]);

  return (
    <div className="p-4">
      <h1>Computo Materiali da Costruzione</h1>
      <p>Calcolo volumi calcestruzzo, peso acciaio, numero mattoni, etc.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="volumeCalcestruzzo" className="block text-gray-700 font-bold mb-2">Volume Calcestruzzo (m³):</label>
          <input
            type="number"
            id="volumeCalcestruzzo"
            name="volumeCalcestruzzo"
            value={data.volumeCalcestruzzo || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="pesoAcciaio" className="block text-gray-700 font-bold mb-2">Peso Acciaio (kg):</label>
          <input
            type="number"
            id="pesoAcciaio"
            name="pesoAcciaio"
            value={data.pesoAcciaio || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="numeroMattoni" className="block text-gray-700 font-bold mb-2">Numero Mattoni:</label>
          <input
            type="number"
            id="numeroMattoni"
            name="numeroMattoni"
            value={data.numeroMattoni || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2>Risultati</h2>
        <p>Volume Calcestruzzo: {results.volumeCalcestruzzo || 'N/A'} m³</p>
        <p>Peso Acciaio: {results.pesoAcciaio || 'N/A'} kg</p>
        <p>Numero Mattoni: {results.numeroMattoni || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ComputoMaterialiCalculator;
