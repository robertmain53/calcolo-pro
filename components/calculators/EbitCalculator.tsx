"use client";
import React, { useState } from 'react';

interface EbitCalculatorProps {
  title: string;
  description: string;
}

const EbitCalculator: React.FC<EbitCalculatorProps> = ({ title, description }) => {
  const [revenue, setRevenue] = useState<number>(0);
  const [operatingCosts, setOperatingCosts] = useState<number>(0);
  const [ebit, setEbit] = useState<number>(0);

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(parseFloat(e.target.value) || 0);
  };

  const handleOperatingCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperatingCosts(parseFloat(e.target.value) || 0);
  };

  React.useEffect(() => {
    setEbit(revenue - operatingCosts);
  }, [revenue, operatingCosts]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <input type="number" value={revenue} onChange={handleRevenueChange} className="border p-2 mb-2" placeholder="Inserisci il valore delle vendite" />
      <input type="number" value={operatingCosts} onChange={handleOperatingCostsChange} className="border p-2 mb-2" placeholder="Inserisci i costi operativi" />
      <p className="text-lg font-bold">EBIT: {ebit}</p>
    </div>
  );
};

export default EbitCalculator;