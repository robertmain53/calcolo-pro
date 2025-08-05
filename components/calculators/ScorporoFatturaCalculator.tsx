"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorState {
  lordo: number;
  aliquotaIva: number;
  netto: number;
  iva: number;
}

const ScorporoFatturaCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorState>({ lordo: 0, aliquotaIva: 22, netto: 0, iva: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCalculatorData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0,
    }));
  };

  React.useEffect(() => {
    const calculate = () => {
      const { lordo, aliquotaIva } = calculatorData;
      if (lordo > 0) {
        const netto = lordo / (1 + aliquotaIva / 100);
        const iva = lordo - netto;
        setCalculatorData({ ...calculatorData, netto: netto, iva: iva });
      } else {
        setCalculatorData({ ...calculatorData, netto: 0, iva: 0 });
      }
    };
    calculate();
  }, [calculatorData.lordo, calculatorData.aliquotaIva]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Scorporo IVA e Calcolo IVA Inversa</h1>
      <p className="text-gray-600 mb-4">Questo strumento calcola l'IVA e il netto da un importo lordo.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lordo" className="block text-gray-700 font-bold mb-2">Importo Lordo:</label>
          <input
            type="number"
            id="lordo"
            name="lordo"
            value={calculatorData.lordo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="aliquotaIva" className="block text-gray-700 font-bold mb-2">Aliquota IVA (%):</label>
          <input
            type="number"
            id="aliquotaIva"
            name="aliquotaIva"
            value={calculatorData.aliquotaIva}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Netto:</label>
          <p className="text-lg font-medium">{calculatorData.netto.toFixed(2)} €</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">IVA:</label>
          <p className="text-lg font-medium">{calculatorData.iva.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  );
};

export default ScorporoFatturaCalculator;
