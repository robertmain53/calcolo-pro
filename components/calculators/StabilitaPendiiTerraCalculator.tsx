"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  altezzaPendio: number;
  angoloPendio: number;
  coesione: number;
  angoloAttrito: number;
  pesoVolumico: number;
}

const StabilitaPendiiTerraCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    altezzaPendio: 0,
    angoloPendio: 0,
    coesione: 0,
    angoloAttrito: 0,
    pesoVolumico: 0,
  });

  const [fattoreSicurezzaFellenius, setFattoreSicurezzaFellenius] = useState<number>(0);
  const [fattoreSicurezzaBishop, setFattoreSicurezzaBishop] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: parseFloat(event.target.value) });
  };

  const calculate = () => {
    // Calcolo Metodo di Fellenius
    const fFellenius = (formData.coesione / (formData.pesoVolumico * formData.altezzaPendio * Math.sin(formData.angoloPendio * Math.PI / 180))) + (Math.tan(formData.angoloAttrito * Math.PI / 180) / Math.tan(formData.angoloPendio * Math.PI / 180));
    setFattoreSicurezzaFellenius(fFellenius);

    // Calcolo Metodo di Bishop semplificato (approssimazione)
    const fBishop = (formData.coesione / (formData.pesoVolumico * formData.altezzaPendio * Math.sin(formData.angoloPendio * Math.PI / 180) )) + (Math.tan(formData.angoloAttrito * Math.PI / 180) / Math.tan(formData.angoloPendio * Math.PI / 180));
    setFattoreSicurezzaBishop(fBishop);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Stabilità dei Pendii in Terra</h1>
      <p className="text-gray-600 mb-4">Metodo di Fellenius e Bishop semplificato (equilibrio limite)</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="altezzaPendio" className="block text-gray-700 font-bold mb-2">Altezza del pendio (m):</label>
          <input type="number" id="altezzaPendio" name="altezzaPendio" value={formData.altezzaPendio} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="angoloPendio" className="block text-gray-700 font-bold mb-2">Angolo del pendio (gradi):</label>
          <input type="number" id="angoloPendio" name="angoloPendio" value={formData.angoloPendio} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="coesione" className="block text-gray-700 font-bold mb-2">Coesione (kPa):</label>
          <input type="number" id="coesione" name="coesione" value={formData.coesione} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="angoloAttrito" className="block text-gray-700 font-bold mb-2">Angolo di attrito (gradi):</label>
          <input type="number" id="angoloAttrito" name="angoloAttrito" value={formData.angoloAttrito} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="pesoVolumico" className="block text-gray-700 font-bold mb-2">Peso volumico (kN/m³):</label>
          <input type="number" id="pesoVolumico" name="pesoVolumico" value={formData.pesoVolumico} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <button onClick={calculate} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Calcola
      </button>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Fattore di sicurezza (Fellenius): {fattoreSicurezzaFellenius.toFixed(2)}</p>
        <p className="text-gray-700 font-bold">Fattore di sicurezza (Bishop semplificato): {fattoreSicurezzaBishop.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StabilitaPendiiTerraCalculator;
