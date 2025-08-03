"use client";
import React, { useState } from 'react';

interface FormData {
  nome: string;
  cognome: string;
  comune: string;
  dataNascita: string;
}

const CodiceFiscaleCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ nome: '', cognome: '', comune: '', dataNascita: '' });
  const [codiceFiscale, setCodiceFiscale] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const calculateCodiceFiscale = () => {
    // Implementare la logica di calcolo del codice fiscale
    // ... (logica complessa omessa per brevità)
    const calculatedCodiceFiscale = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'; // Sostituire con il codice fiscale calcolato
    setCodiceFiscale(calculatedCodiceFiscale);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Codice Fiscale Italiano ed Estero</h1>
      <p>Calcolo del codice fiscale di una persona a partire dai dati anagrafici: nome, cognome, comune e data di nascita.</p>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">Nome:</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="cognome" className="block text-gray-700 font-bold mb-2">Cognome:</label>
        <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="comune" className="block text-gray-700 font-bold mb-2">Comune:</label>
        <input type="text" id="comune" name="comune" value={formData.comune} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="dataNascita" className="block text-gray-700 font-bold mb-2">Data di Nascita:</label>
        <input type="date" id="dataNascita" name="dataNascita" value={formData.dataNascita} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button onClick={calculateCodiceFiscale} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calcola Codice Fiscale</button>
      {codiceFiscale && (
        <div className="mt-4">
          <p className="text-green-500 font-bold">Codice Fiscale: {codiceFiscale}</p>
        </div>
      )}
    </div>
  );
};

export default CodiceFiscaleCalculator;
