"use client";
import React, { useState } from 'react';

interface FormData {
  forzaResistenza: number;
  forzaApplicata: number;
}

const VerificaAncoraggiLineeVitaCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ forzaResistenza: 0, forzaApplicata: 0 });
  const [risultato, setRisultato] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: parseFloat(event.target.value) });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { forzaResistenza, forzaApplicata } = formData;
    if (forzaResistenza > 0 && forzaApplicata > 0) {
      const rapporto = forzaResistenza / forzaApplicata;
      setRisultato(rapporto >= 2 ? 'Ancoraggio sufficiente' : 'Ancoraggio insufficiente');
    } else {
      setRisultato('Inserire valori validi');
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo e Verifica Ancoraggi Linee Vita (UNI 11578 / EN 795)</h1>
      <p>Questo calcolatore verifica la resistenza di un ancoraggio per linee vita in base alle norme UNI 11578 e EN 795.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="forzaResistenza" className="block text-gray-700 font-bold mb-2">Forza di Resistenza (kN):</label>
          <input
            type="number"
            id="forzaResistenza"
            name="forzaResistenza"
            value={formData.forzaResistenza}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="forzaApplicata" className="block text-gray-700 font-bold mb-2">Forza Applicata (kN):</label>
          <input
            type="number"
            id="forzaApplicata"
            name="forzaApplicata"
            value={formData.forzaApplicata}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcola
        </button>
      </form>
      <div className="mt-4">
        <p className="text-lg font-bold">Risultato: {risultato}</p>
      </div>
    </div>
  );
};

export default VerificaAncoraggiLineeVitaCalculator;
