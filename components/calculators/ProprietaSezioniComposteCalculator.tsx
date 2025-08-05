"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface SectionData {
  area: number;
  x_bar: number;
  I_x: number;
}

const ProprietaSezioniComposteCalculator: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([{ area: 0, x_bar: 0, I_x: 0 }]);
  const [totalArea, setTotalArea] = useState(0);
  const [totalXBar, setTotalXBar] = useState(0);
  const [totalIx, setTotalIx] = useState(0);

  const handleAreaChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].area = parseFloat(value) || 0;
    setSections(newSections);
  };

  const handleXBarChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].x_bar = parseFloat(value) || 0;
    setSections(newSections);
  };

  const handleIxChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].I_x = parseFloat(value) || 0;
    setSections(newSections);
  };

  React.useEffect(() => {
    let totalAreaCalc = 0;
    let totalXBarCalc = 0;
    let totalIxCalc = 0;
    for (const section of sections) {
      totalAreaCalc += section.area;
      totalXBarCalc += section.area * section.x_bar;
      totalIxCalc += section.I_x + section.area * Math.pow(section.x_bar, 2);
    }
    setTotalArea(totalAreaCalc);
    setTotalXBar(totalXBarCalc / totalAreaCalc);
    setTotalIx(totalIxCalc - totalAreaCalc * Math.pow(totalXBarCalc / totalAreaCalc, 2));
  }, [sections]);

  const addSection = () => {
    setSections([...sections, { area: 0, x_bar: 0, I_x: 0 }]);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Proprietà Sezioni Composte</h1>
      <p>Metodo per somma/sottrazione di aree</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white shadow-md rounded px-4 py-2">
            <h2 className="text-lg font-bold mb-2">Sezione {index + 1}</h2>
            <div className="mb-2">
              <label htmlFor={`area-${index}`}>Area:</label>
              <input
                type="number"
                id={`area-${index}`}
                value={section.area}
                onChange={(e) => handleAreaChange(index, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`x_bar-${index}`}>x_bar:</label>
              <input
                type="number"
                id={`x_bar-${index}`}
                value={section.x_bar}
                onChange={(e) => handleXBarChange(index, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`I_x-${index}`}>I_x:</label>
              <input
                type="number"
                id={`I_x-${index}`}
                value={section.I_x}
                onChange={(e) => handleIxChange(index, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <button onClick={() => removeSection(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Rimuovi Sezione</button>
          </div>
        ))}
      </div>
      <button onClick={addSection} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Aggiungi Sezione</button>
      <div className="mt-8">
        <p className="font-bold">Area Totale: {totalArea.toFixed(2)}</p>
        <p className="font-bold">x_bar Totale: {totalXBar.toFixed(2)}</p>
        <p className="font-bold">I_x Totale: {totalIx.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProprietaSezioniComposteCalculator;
