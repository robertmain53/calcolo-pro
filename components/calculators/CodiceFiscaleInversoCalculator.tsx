"use client";
import React, { useState } from 'react';

interface FormData {
  codiceFiscale: string;
}

const CodiceFiscaleInversoCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ codiceFiscale: '' });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, codiceFiscale: e.target.value });
    // Aggiungi qui la logica per il calcolo in tempo reale (se necessario)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aggiungi qui la logica per elaborare il codice fiscale
    // ... (logica per decodificare il codice fiscale)
    // Esempio di risultato (sostituisci con la tua logica):
    const simulatedResult = `Nome: Mario Rossi\nData di nascita: 01/01/1980\nComune di nascita: Roma`;
    setResult(simulatedResult);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Calcolo Codice Fiscale Inverso (Italiano ed Estero)</h1>
      <p className="mb-6">Decodifica e verifica qualsiasi codice fiscale estraendo alcune informazioni anagrafiche del titolare.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="codiceFiscale" className="block text-gray-700 font-bold mb-2">Codice Fiscale:</label>
          <input
            type="text"
            id="codiceFiscale"
            value={formData.codiceFiscale}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Decodifica
        </button>
      </form>
      {result && (
        <div className="mt-6 border border-gray-300 p-4 rounded">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default CodiceFiscaleInversoCalculator;
