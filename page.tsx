// app/it/[category]/[slug]/page.tsx - Template aggiornato
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CalculatorWrapper from '@/components/calculator/CalculatorWrapper';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';

type Props = { 
  params: { 
    category: string;
    slug: string; 
  } 
};

async function getCalculatorComponent(slug: string) {
  try {
    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Calculator';
    return (await import(`@/components/calculators/${componentName}`)).default;
  } catch (error) { 
    console.error(`Componente ${slug} non trovato:`, error);
    return null; 
  }
}

async function getContent(category: string, slug: string) {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'it', category, `${slug}.md`);
    return await fs.readFile(contentPath, 'utf8');
  } catch (error) { 
    console.warn(`Contenuto ${category}/${slug} non trovato`);
    return null; 
  }
}

// Utility per convertire slug in nome leggibile
function slugToName(slug: string): string {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default async function CalculatorPage({ params }: Props) {
  const { category, slug } = params;
  
  const CalculatorComponent = await getCalculatorComponent(slug);
  const content = await getContent(category, slug);

  if (!CalculatorComponent) {
    notFound();
  }
  
  const calculatorName = slugToName(slug);
  const categoryName = slugToName(category);
  
  const crumbs = [
    { name: "Home", path: "/it" },
    { name: categoryName, path: `/it/${category}` },
    { name: calculatorName }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumb crumbs={crumbs} />
      
      {/* Calculator con Sidebar Integrata */}
      <CalculatorWrapper
        calculatorName={calculatorName}
        category={category}
        slug={slug}
      >
        <CalculatorComponent />
      </CalculatorWrapper>
      
      {/* Contenuto Educational */}
      {content && (
        <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg">
          <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-800 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-800" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
      
      {/* Calcolatori Correlati */}
      <RelatedCalculators
        currentCategory={category}
        currentSlug={slug}
        lang="it"
        maxItems={6}
      />
    </div>
  );
}

// Metadata per SEO
export async function generateMetadata({ params }: Props) {
  const { category, slug } = params;
  const calculatorName = slugToName(slug);
  const categoryName = slugToName(category);
  
  return {
    title: `${calculatorName} | ${categoryName} | SoCalSolver`,
    description: `Calcola ${calculatorName.toLowerCase()} online gratis. Strumento professionale per ${categoryName.toLowerCase()}.`,
  };
}

// ===== components/calculator/CalculatorWrapper.tsx =====
'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import ToolsSidebar from './ToolsSidebar';

// Context per condividere dati tra calcolatore e sidebar
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
  category: string;
  slug: string;
}

export default function CalculatorWrapper({ 
  children, 
  calculatorName, 
  category, 
  slug 
}: CalculatorWrapperProps) {
  const [results, setResults] = useState<Record<string, number>>({});
  const [inputs, setInputs] = useState<Record<string, any>>({});

  const updateResults = (newResults: Record<string, number>) => {
    setResults(newResults);
  };

  const updateInputs = (newInputs: Record<string, any>) => {
    setInputs(newInputs);
  };

  const contextValue: CalculatorContextType = {
    results,
    inputs,
    updateResults,
    updateInputs,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator */}
        <div className="lg:col-span-2 p-8 bg-white rounded-2xl shadow-lg">
          {children}
        </div>
        
        {/* Enhanced Sidebar */}
        <ToolsSidebar 
          calculatorName={calculatorName}
          results={results}
          inputs={inputs}
        />
      </div>
    </CalculatorContext.Provider>
  );
}

// ===== Hook per calcolatori esistenti =====
// Aggiungi questo hook ai calcolatori esistenti per farli funzionare con la sidebar

// Esempio di come modificare un calcolatore esistente:
/*
// TassazionePeritiIndustrialiEppiCalculator.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useCalculator } from '@/components/calculator/CalculatorWrapper';

interface CalculatorState {
  reddito: number;
  deduzioni: number;
  impostaLorda: number;
  impostaNetta: number;
}

const TassazioneperitiIndustrialiEppiCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    reddito: 0,
    deduzioni: 0,
    impostaLorda: 0,
    impostaNetta: 0,
  });

  // Hook per comunicare con ToolsSidebar
  const { updateResults, updateInputs } = useCalculator();

  const handleInputChange = (field: keyof CalculatorState, value: number) => {
    const newState = { ...state, [field]: value };
    
    // Calcoli automatici
    if (field === 'reddito' || field === 'deduzioni') {
      const redditoImponibile = newState.reddito - newState.deduzioni;
      newState.impostaLorda = redditoImponibile * 0.23; // 23% IRPEF
      newState.impostaNetta = newState.impostaLorda; // Semplificato
    }
    
    setState(newState);
    
    // Aggiorna il context per ToolsSidebar
    updateInputs({
      reddito: newState.reddito,
      deduzioni: newState.deduzioni
    });
    
    updateResults({
      'Reddito Imponibile': newState.reddito - newState.deduzioni,
      'Imposta Lorda': newState.impostaLorda,
      'Imposta Netta': newState.impostaNetta
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Calcolatore Tassazione per Periti Industriali (con EPPI)
        </h1>
        <p className="text-gray-600">
          Calcola le imposte per periti industriali considerando gli EPPI.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reddito Lordo (€)
          </label>
          <input
            type="number"
            value={state.reddito}
            onChange={(e) => handleInputChange('reddito', parseFloat(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deduzioni (€)
          </label>
          <input
            type="number"
            value={state.deduzioni}
            onChange={(e) => handleInputChange('deduzioni', parseFloat(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>
      
      {state.reddito > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Risultati</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                €{(state.reddito - state.deduzioni).toLocaleString('it-IT')}
              </div>
              <div className="text-sm text-gray-600">Reddito Imponibile</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                €{state.impostaLorda.toLocaleString('it-IT')}
              </div>
              <div className="text-sm text-gray-600">Imposta Lorda</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                €{state.impostaNetta.toLocaleString('it-IT')}
              </div>
              <div className="text-sm text-gray-600">Imposta Netta</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TassazioneperitiIndustrialiEppiCalculator;
*/
