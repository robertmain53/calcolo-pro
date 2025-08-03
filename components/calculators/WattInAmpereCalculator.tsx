"use client";
import React, { useState, useEffect } from 'react';

// Interfaccia per i props, invariata
interface WattAmpereCalculatorProps {
  title: string;
  description: string;
}

// Tipo per definire il sistema elettrico
type SystemType = 'monofase' | 'trifase';

const ProfessionalWattAmpereCalculator: React.FC<WattAmpereCalculatorProps> = ({ title, description }) => {
  // --- STATE MANAGEMENT ---
  // Gestione degli input come stringhe per un controllo più fine
  const [power, setPower] = useState<string>(''); // Potenza (Watt)
  const [voltage, setVoltage] = useState<string>(''); // Tensione (Volt)
  const [powerFactor, setPowerFactor] = useState<string>('0.9'); // Fattore di potenza (cos φ)
  const [systemType, setSystemType] = useState<SystemType>('monofase'); // Tipo di sistema

  // State per il risultato e per eventuali errori di calcolo
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- CALCULATION LOGIC ---
  // useEffect ricalcola il risultato ogni volta che un input cambia.
  // Questo elimina la necessità di un pulsante "Calcola".
  useEffect(() => {
    // Converte gli input stringa in numeri, gestendo i valori vuoti come 0
    const numPower = parseFloat(power);
    const numVoltage = parseFloat(voltage);
    const numPowerFactor = parseFloat(powerFactor);

    // Validazione degli input
    if (!power || !voltage || !powerFactor) {
      setResult(null);
      setError(null);
      return;
    }

    if (numVoltage <= 0) {
      setError('La tensione deve essere maggiore di zero.');
      setResult(null);
      return;
    }

    if (numPowerFactor <= 0 || numPowerFactor > 1) {
      setError('Il fattore di potenza (cos φ) deve essere compreso tra 0 e 1.');
      setResult(null);
      return;
    }

    // Se i dati sono validi, resetta gli errori e procedi
    setError(null);

    let current: number;
    if (systemType === 'monofase') {
      // Formula Monofase: I = P / (V * cos φ)
      current = numPower / (numVoltage * numPowerFactor);
    } else {
      // Formula Trifase: I = P / (V * cos φ * sqrt(3))
      current = numPower / (numVoltage * numPowerFactor * Math.sqrt(3));
    }

    setResult(current);

  }, [power, voltage, powerFactor, systemType]);


  // --- RENDER ---
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-lg mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Calcolo Corrente da Potenza - Watt ad Ampere - per Circuiti AC</h2>
        <p className="text-gray-600">
Questo strumento è progettato per professionisti del settore elettrico, come ingegneri e periti, per calcolare con precisione la corrente (Ampere) assorbita da un carico elettrico a partire dalla sua potenza attiva (Watt).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* TIPO DI SISTEMA */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di Sistema</label>
            <div className="flex items-center space-x-4">
                 <button onClick={() => setSystemType('monofase')} className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${systemType === 'monofase' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    Monofase
                </button>
                 <button onClick={() => setSystemType('trifase')} className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${systemType === 'trifase' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    Trifase
                </button>
            </div>
        </div>
        
        {/* POTENZA */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="power">
            Potenza (Watt)
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            type="number"
            id="power"
            placeholder="es. 3000"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>

        {/* TENSIONE */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="voltage">
            Tensione (Volt)
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            type="number"
            id="voltage"
            placeholder={systemType === 'monofase' ? 'es. 230' : 'es. 400'}
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
          />
        </div>

        {/* FATTORE DI POTENZA */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="powerFactor">
                Fattore di Potenza ($cos\,\phi$)
            </label>
            <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="number"
                id="powerFactor"
                step="0.01"
                min="0"
                max="1"
                placeholder="es. 0.9"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
            />
        </div>
      </div>
      
      {/* SEZIONE RISULTATO ED ERRORI */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}
        
        {result !== null && !error && (
            <div className="text-center">
                 <p className="text-gray-600 text-sm">Corrente Calcolata (Ampere)</p>
                 <p className="text-3xl font-bold text-blue-700 tracking-tight">{result.toFixed(2)} A</p>
            </div>
        )}
         {result === null && !error && (
             <p className="text-gray-500 text-center">Inserisci i valori per calcolare la corrente.</p>
         )}
      </div>
    </div>
  );
};

export default ProfessionalWattAmpereCalculator;