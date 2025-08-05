"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface ConversionData {
  inches?: number;
  feet?: number;
  yards?: number;
  miles?: number;
  centimeters?: number;
  meters?: number;
  kilometers?: number;
}

const ConvertitoreMisureAnglosassoniCalculator: React.FC = () => {
  const [input, setInput] = useState<ConversionData>({});
  const [results, setResults] = useState<ConversionData>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: parseFloat(e.target.value) });
  };

  React.useEffect(() => {
    const calculateResults = () => {
      const results: ConversionData = {};
      if (input.inches) {
        results.centimeters = input.inches * 2.54;
        results.meters = results.centimeters / 100;
        results.kilometers = results.meters / 1000;
      }
      if (input.feet) {
        results.meters = input.feet * 0.3048;
        results.kilometers = results.meters / 1000;
        results.centimeters = results.meters * 100;
      }
      if (input.yards) {
        results.meters = input.yards * 0.9144;
        results.kilometers = results.meters / 1000;
        results.centimeters = results.meters * 100;
      }
      if (input.miles) {
        results.kilometers = input.miles * 1.60934;
        results.meters = results.kilometers * 1000;
        results.centimeters = results.meters * 100;
      }
      if (input.centimeters) {
        results.inches = input.centimeters / 2.54;
        results.meters = input.centimeters / 100;
        results.kilometers = input.centimeters / 100000;
      }
      if (input.meters) {
        results.inches = input.meters * 39.3701;
        results.feet = input.meters * 3.28084;
        results.yards = input.meters * 1.09361;
        results.kilometers = input.meters / 1000;
        results.centimeters = input.meters * 100;
      }
      if (input.kilometers) {
        results.miles = input.kilometers / 1.60934;
        results.meters = input.kilometers * 1000;
        results.centimeters = results.meters * 100;
      }
      setResults(results);
    };
    calculateResults();
  }, [input]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Convertitore Misure Anglo-Sassoni a Sistema Internazionale</h1>
      <p className="text-gray-600 mb-4">Per disegni e specifiche tecniche internazionali</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="inches" className="block text-gray-700 font-bold mb-2">Pollici (inches):</label>
          <input type="number" id="inches" name="inches" value={input.inches || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="centimeters" className="block text-gray-700 font-bold mb-2">Centimetri:</label>
          <input type="number" id="centimeters" name="centimeters" value={results.centimeters || ''} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" />
        </div>
        <div>
          <label htmlFor="feet" className="block text-gray-700 font-bold mb-2">Piedi (feet):</label>
          <input type="number" id="feet" name="feet" value={input.feet || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="meters" className="block text-gray-700 font-bold mb-2">Metri:</label>
          <input type="number" id="meters" name="meters" value={results.meters || ''} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" />
        </div>
        <div>
          <label htmlFor="yards" className="block text-gray-700 font-bold mb-2">Iarde (yards):</label>
          <input type="number" id="yards" name="yards" value={input.yards || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="kilometers" className="block text-gray-700 font-bold mb-2">Kilometri:</label>
          <input type="number" id="kilometers" name="kilometers" value={results.kilometers || ''} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" />
        </div>
        <div>
          <label htmlFor="miles" className="block text-gray-700 font-bold mb-2">Miglia (miles):</label>
          <input type="number" id="miles" name="miles" value={input.miles || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
    </div>
  );
};

export default ConvertitoreMisureAnglosassoniCalculator;
