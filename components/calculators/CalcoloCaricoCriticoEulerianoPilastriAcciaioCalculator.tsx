"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from "react";

interface CalculatorData {
  area?: number;
  moduloElasticita?: number;
  lunghezzaLibera?: number;
  momentoInerzia?: number;
}

const CalcoloCaricoCriticoEulerianoPilastriAcciaioCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({});
  const [risultato, setRisultato] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value === '' ? undefined : parseFloat(value),
    }));
  };

  const calculate = () => {
    const { moduloElasticita, momentoInerzia, lunghezzaLibera } = data;

    if (
      moduloElasticita === undefined ||
      momentoInerzia === undefined ||
      lunghezzaLibera === undefined
    ) {
      setRisultato(null);
      return;
    }

    // Formula di Eulero per il carico critico: Pcr = (π² * E * I) / (L²)
    const pi = Math.PI;
    const Pcr = (pi * pi * moduloElasticita * momentoInerzia) / (lunghezzaLibera * lunghezzaLibera);
    setRisultato(Pcr);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">
        Calcolo Carico Critico Euleriano - Pilastri in Acciaio
      </h1>
      <p className="mb-4 text-gray-700">
        Calcolo semplificato del carico critico secondo la teoria di Eulero.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          name="moduloElasticita"
          placeholder="Modulo di elasticità E (N/mm²)"
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="momentoInerzia"
          placeholder="Momento di inerzia I (mm⁴)"
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="lunghezzaLibera"
          placeholder="Lunghezza libera L (mm)"
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={calculate}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcola
      </button>
      {risultato !== null && (
        <div className="mt-4 text-lg font-semibold">
          Carico critico P<sub>cr</sub>: {risultato.toFixed(2)} N
        </div>
      )}
    </div>
  );
};

export default CalcoloCaricoCriticoEulerianoPilastriAcciaioCalculator;
