"use client";
import React, { useState } from 'react';

interface CalculatorData {
  area: number;
  lux: number;
  flussoLuminosoSingolaLampada: number;
}

const CalcoloIlluminotecnicoCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({ area: 0, lux: 0, flussoLuminosoSingolaLampada: 0 });
  const [numeroLampade, setNumeroLampade] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    if (data.area > 0 && data.lux > 0 && data.flussoLuminosoSingolaLampada > 0) {
      const risultato = (data.area * data.lux) / data.flussoLuminosoSingolaLampada;
      setNumeroLampade(Math.ceil(risultato));
    }
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Illuminotecnico (Metodo del Flusso Totale)</h1>
      <p className="text-gray-600 mb-4">Determina il numero di lampade necessarie per illuminare un ambiente.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-gray-700 font-bold mb-2">Area (m²):</label>
          <input
            type="number"
            id="area"
            name="area"
            value={data.area}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="lux" className="block text-gray-700 font-bold mb-2">Illuminamento Lux:</label>
          <input
            type="number"
            id="lux"
            name="lux"
            value={data.lux}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="flussoLuminosoSingolaLampada" className="block text-gray-700 font-bold mb-2">Flusso Luminoso Singola Lampada (lm):</label>
          <input
            type="number"
            id="flussoLuminosoSingolaLampada"
            name="flussoLuminosoSingolaLampada"
            value={data.flussoLuminosoSingolaLampada}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Numero di lampade necessarie: {numeroLampade}</p>
      </div>
    </div>
  );
};

export default CalcoloIlluminotecnicoCalculator;
