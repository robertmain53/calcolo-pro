"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface PowerUnit {
  name: string;
  value: number;
}

const powerUnits: PowerUnit[] = [
  { name: "Watt (W)", value: 1 },
  { name: "Kilowatt (kW)", value: 1000 },
  { name: "Horsepower (HP)", value: 745.7 },
  { name: "Cavallo vapore (CV)", value: 735.5 }
];

const ConvertitorePotenzaCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<PowerUnit>(powerUnits[0]);
  const [outputUnit, setOutputUnit] = useState<PowerUnit>(powerUnits[1]);
  const [result, setResult] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputUnit(powerUnits.find((unit) => unit.name === event.target.value)!);
  };

  const handleOutputUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputUnit(powerUnits.find((unit) => unit.name === event.target.value)!);
  };

  React.useEffect(() => {
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      const convertedValue = (parsedValue * inputUnit.value) / outputUnit.value;
      setResult(convertedValue);
    } else {
      setResult(0);
    }
  }, [inputValue, inputUnit, outputUnit]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Convertitore Potenza (W, kW, HP, CV)</h1>
      <p className="text-gray-600 mb-4">Per applicazioni meccaniche ed elettriche</p>
      <div className="mb-4">
        <label htmlFor="inputValue" className="block text-gray-700 font-bold mb-2">Valore:</label>
        <input
          type="number"
          id="inputValue"
          value={inputValue}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="inputUnit" className="block text-gray-700 font-bold mb-2">Unità di ingresso:</label>
        <select
          id="inputUnit"
          value={inputUnit.name}
          onChange={handleInputUnitChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {powerUnits.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="outputUnit" className="block text-gray-700 font-bold mb-2">Unità di uscita:</label>
        <select
          id="outputUnit"
          value={outputUnit.name}
          onChange={handleOutputUnitChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {powerUnits.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold">Risultato: {result.toFixed(2)} {outputUnit.name}</p>
      </div>
    </div>
  );
};

export default ConvertitorePotenzaCalculator;
