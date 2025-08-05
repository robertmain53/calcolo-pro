"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  onorario: number;
  spese: number;
  iva: number;
}

const CalcoloParcellaPrivatiCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ onorario: 0, spese: 0, iva: 0 });
  const [totale, setTotale] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  React.useEffect(() => {
    const calcolaTotale = () => {
      const totale = formData.onorario + formData.spese + (formData.iva / 100) * (formData.onorario + formData.spese);
      setTotale(totale);
    };
    calcolaTotale();
  }, [formData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Parcella Professionale Lavori Privati: (D.M. 140/2012)</h1>
      <p className="text-gray-600 mb-4">Calcola il totale della tua parcella professionale per lavori privati, in base al D.M. 140/2012.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="onorario" className="block text-gray-700 font-bold mb-2">Onorario:</label>
          <input
            type="number"
            id="onorario"
            name="onorario"
            value={formData.onorario}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="spese" className="block text-gray-700 font-bold mb-2">Spese:</label>
          <input
            type="number"
            id="spese"
            name="spese"
            value={formData.spese}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="iva" className="block text-gray-700 font-bold mb-2">IVA (%):</label>
          <input
            type="number"
            id="iva"
            name="iva"
            value={formData.iva}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Totale: {totale.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CalcoloParcellaPrivatiCalculator;
