'use client';
import React, { useState, createContext, useContext } from 'react';
import ToolsSidebar from './ToolsSidebar';

interface CalculatorContextType {
  results: Record<string, number>;
  inputs: Record<string, any>;
  updateResults: (results: Record<string, number>) => void;
  updateInputs: (inputs: Record<string, any>) => void;
}

const CalculatorContext = createContext<CalculatorContextType>({
  results: {},
  inputs: {},
  updateResults: () => {},
  updateInputs: () => {},
});

export const useCalculator = () => useContext(CalculatorContext);

interface CalculatorWrapperProps {
  children: React.ReactNode;
  calculatorName: string;
  lang?: string;
}

export default function CalculatorWrapper({ 
  children, 
  calculatorName,
  lang = 'it'
}: CalculatorWrapperProps) {
  const [results, setResults] = useState<Record<string, number>>({});
  const [inputs, setInputs] = useState<Record<string, any>>({});

  const updateResults = (newResults: Record<string, number>) => {
    setResults(newResults);
  };

  const updateInputs = (newInputs: Record<string, any>) => {
    setInputs(newInputs);
  };

  return (
    <CalculatorContext.Provider value={{ results, inputs, updateResults, updateInputs }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-2xl shadow-lg">
          {children}
        </div>
        <ToolsSidebar 
          calculatorName={calculatorName}
          results={results}
          inputs={inputs}
          lang={lang}
        />
      </div>
    </CalculatorContext.Provider>
  );
}
