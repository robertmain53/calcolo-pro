"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const StabilitaPendiiRocciaCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    _rowIndex: 35,
    Titolo: "Stabilità dei Pendii in Roccia: Analisi cinematica per cunei e ribaltamento",
    Slug: "stabilita-pendii-roccia",
    Categoria: "Ingegneria Geotecnica ",
    Descrizione: "Analisi cinematica per cunei e ribaltamento",
    Lingua: "it"
  });

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{data.Titolo}</h1>
      <p className="text-gray-600 mb-4">{data.Descrizione}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add input fields and calculation logic here */}
      </div>
    </div>
  );
};

export default StabilitaPendiiRocciaCalculator;