"use client";
import React, { useState } from 'react';

const RoiCalculator: React.FC = () => {
  const [investment, setInvestment] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestment(parseFloat(e.target.value));
  };

  const handleReturnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnAmount(parseFloat(e.target.value));
  };

  const calculateRoi = () => {
    if (investment !== 0) {
      const roiValue = ((returnAmount - investment) / investment) * 100;
      setRoi(roiValue);
    }
  };

  return (
    <div className="p-4">
      <h1>ROI Calculator</h1>
      <p>Calculate the Return on Investment (ROI) based on the investment and return amount.</p>
      <div className="my-4">
        <label>Investment:</label>
        <input type="number" value={investment} onChange={handleInvestmentChange} className="border p-2 m-2" />
      </div>
      <div className="my-4">
        <label>Return Amount:</label>
        <input type="number" value={returnAmount} onChange={handleReturnAmountChange} className="border p-2 m-2" />
      </div>
      <button onClick={calculateRoi} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calculate ROI</button>
      <p className="mt-4">ROI: {roi}%</p>
    </div>
  );
};

export default RoiCalculator;