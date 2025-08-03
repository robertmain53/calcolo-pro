"use client";
import React, { useState } from 'react';

const CalcoloDeiGiorniTraDueDateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [daysCount, setDaysCount] = useState<number | null>(null);

  const handleCalculateDays = () => {
    if(startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
    }
  };

  return (
    <div className="p-4">
      <h1>Calcolo Dei Giorni Tra Due Date Calculator</h1>
      <p>Determina quanti giorni intercorrono fra due date, una data di partenza e una data finale</p>
      <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
      <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
      <button onClick={handleCalculateDays} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcola</button>
      {daysCount && <p>I giorni tra le due date sono: {daysCount}</p>}
    </div>
  );
};

export default CalcoloDeiGiorniTraDueDateCalculator;