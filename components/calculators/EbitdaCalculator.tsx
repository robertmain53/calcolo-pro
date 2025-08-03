"use client";
import React, { useState } from 'react';

const EbitdaCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [ebitda, setEbitda] = useState<number>(0);

  const calculateEbitda = () => {
    setEbitda(revenue - expenses);
  };

  return (
    <div className="p-4">
      <h1>Ebitda Calculator</h1>
      <p>Calculate E.B.I.T.D.A. (Earnings Before Interest, Taxes, Depreciation, and Amortization)</p>
      <input type="number" value={revenue} onChange={(e) => setRevenue(parseFloat(e.target.value))} placeholder="Enter Revenue" className="p-2 m-2 border rounded" />
      <input type="number" value={expenses} onChange={(e) => setExpenses(parseFloat(e.target.value))} placeholder="Enter Expenses" className="p-2 m-2 border rounded" />
      <button onClick={calculateEbitda} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calculate EBITDA</button>
      <p>E.B.I.T.D.A.: {ebitda}</p>
    </div>
  );
};

export default EbitdaCalculator;