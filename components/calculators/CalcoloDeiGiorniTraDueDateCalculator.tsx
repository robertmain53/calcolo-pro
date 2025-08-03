"use client";
import React, { useState } from 'react';

interface DateDifferenceCalculatorProps {
  title: string;
  description: string;
}

const DateDifferenceCalculator: React.FC<DateDifferenceCalculatorProps> = ({ title, description }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [difference, setDifference] = useState<number | null>(null);

  const calculateDifference = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDifference(diffDays);
    } else {
      setDifference(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="startDate">
          Data di partenza:
        </label>
        <input
          type="date"
          id="startDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="endDate">
          Data di arrivo:
        </label>
        <input
          type="date"
          id="endDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={calculateDifference}
      >
        Calcola
      </button>
      {difference !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Differenza: {difference} giorni</p>
        </div>
      )}
    </div>
  );
};

export default DateDifferenceCalculator;
