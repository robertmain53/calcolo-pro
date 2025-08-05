"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface SteelGrade {
  oldDesignation: string;
  newDesignation: string;
}

const steelGrades: SteelGrade[] = [
  {"oldDesignation": "FeB44k", "newDesignation": "B450C"},
  {"oldDesignation": "Fe360", "newDesignation": "S275"},
  // Add more steel grades here
];

const ConvertitoreClassiAcciaioCalculator: React.FC = () => {
  const [oldDesignation, setOldDesignation] = useState('');
  const [newDesignation, setNewDesignation] = useState('');

  const handleOldDesignationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldDesignation(event.target.value);
    const matchingGrade = steelGrades.find(grade => grade.oldDesignation.toLowerCase() === event.target.value.toLowerCase());
    setNewDesignation(matchingGrade ? matchingGrade.newDesignation : '');
  };

  return (
    <div className="p-4">
      <h1>Convertitore Classi di Acciaio</h1>
      <p>Converti le designazioni storiche delle classi di acciaio in quelle moderne.</p>
      <div className="mb-4">
        <label htmlFor="oldDesignation" className="block text-gray-700 font-bold mb-2">Designazione Storica:</label>
        <input
          type="text"
          id="oldDesignation"
          value={oldDesignation}
          onChange={handleOldDesignationChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newDesignation" className="block text-gray-700 font-bold mb-2">Designazione Moderna:</label>
        <input
          type="text"
          id="newDesignation"
          value={newDesignation}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default ConvertitoreClassiAcciaioCalculator;
