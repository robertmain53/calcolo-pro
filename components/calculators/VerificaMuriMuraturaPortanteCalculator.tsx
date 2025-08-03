"use client";
import React, { useState } from 'react';

interface FormData {
  altezza: number;
  spessore: number;
  lunghezza: number;
  resistenza_muratura: number;
  carico_assiale: number;
  momento_flettente: number;
}

const VerificaMuriMuraturaPortanteCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    altezza: 0,
    spessore: 0,
    lunghezza: 0,
    resistenza_muratura: 0,
    carico_assiale: 0,
    momento_flettente: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  // Calcolo semplificato (da sostituire con calcolo completo secondo NTC 2018 e EC6)
  const calcolaResistenza = () => {
    // Questo è un esempio semplificato, sostituire con il calcolo effettivo
    return formData.resistenza_muratura * formData.spessore * formData.altezza;
  };

  const resistenza = calcolaResistenza();

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1>Verifica Muri in Muratura Portante</h1>
      <p>Pressoflessione nel piano e fuori piano (NTC 2018, EC6)</p>
      <form>
        <div className="mb-4">
          <label htmlFor="altezza" className="block text-gray-700 font-bold mb-2">Altezza (m):</label>
          <input
            type="number"
            id="altezza"
            name="altezza"
            value={formData.altezza}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Altri campi input analoghi per spessore, lunghezza, ecc. */}
        <div className="mb-4">
          <label htmlFor="spessore" className="block text-gray-700 font-bold mb-2">Spessore (m):</label>
          <input
            type="number"
            id="spessore"
            name="spessore"
            value={formData.spessore}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lunghezza" className="block text-gray-700 font-bold mb-2">Lunghezza (m):</label>
          <input
            type="number"
            id="lunghezza"
            name="lunghezza"
            value={formData.lunghezza}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resistenza_muratura" className="block text-gray-700 font-bold mb-2">Resistenza Muratura (MPa):</label>
          <input
            type="number"
            id="resistenza_muratura"
            name="resistenza_muratura"
            value={formData.resistenza_muratura}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carico_assiale" className="block text-gray-700 font-bold mb-2">Carico Assiale (kN):</label>
          <input
            type="number"
            id="carico_assiale"
            name="carico_assiale"
            value={formData.carico_assiale}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="momento_flettente" className="block text-gray-700 font-bold mb-2">Momento Flettente (kNm):</label>
          <input
            type="number"
            id="momento_flettente"
            name="momento_flettente"
            value={formData.momento_flettente}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={calcolaResistenza}>
          Calcola
        </button>
        <p>Resistenza: {resistenza} </p>
      </form>
    </div>
  );
};

export default VerificaMuriMuraturaPortanteCalculator;
