"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface FormData {
  portata: number;
  prevalenza: number;
  rendimento: number;
}

const CalcoloPrevalenzaPotenzaPompeCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ portata: 0, prevalenza: 0, rendimento: 0 });
  const [potenza, setPotenza] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const calculatePotenza = () => {
      const { portata, prevalenza, rendimento } = formData;
      const potenzaKw = (portata * prevalenza * 9.81) / (3600 * rendimento);
      setPotenza(potenzaKw);
    };
    calculatePotenza();
  }, [formData]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Prevalenza e Potenza Pompe</h1>
      <p className="text-gray-600 mb-4">Per impianti di sollevamento</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="portata" className="block text-gray-700 font-bold mb-2">Portata (m³/h):</label>
          <input
            type="number"
            id="portata"
            name="portata"
            value={formData.portata}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="prevalenza" className="block text-gray-700 font-bold mb-2">Prevalenza (m):</label>
          <input
            type="number"
            id="prevalenza"
            name="prevalenza"
            value={formData.prevalenza}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="rendimento" className="block text-gray-700 font-bold mb-2">Rendimento (%):</label>
          <input
            type="number"
            id="rendimento"
            name="rendimento"
            value={formData.rendimento}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Potenza necessaria (kW): {potenza.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalcoloPrevalenzaPotenzaPompeCalculator;
