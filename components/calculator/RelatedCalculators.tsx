'use client';;
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Calculator {
  name: string;
  slug: string;
  description?: string;
}

interface RelatedCalculatorsProps {
  currentCategory: string; // può essere umano (es: "Acustica e Termotecnica") o slug (es: "acustica-e-termotecnica")
  currentSlug: string;
  maxItems?: number;
}

// Mappa nomi umani in slug
const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  'Acustica e Termotecnica': 'acustica-e-termotecnica',
  'Fisco e Lavoro Autonomo': 'fisco-e-lavoro-autonomo',
  'Immobiliare e Casa': 'immobiliare-e-casa',
  'Finanza Personale': 'finanza-personale',
  'PMI e Impresa': 'pmi-e-impresa',
  'Risparmio e Investimenti': 'risparmio-e-investimenti',
  'Veicoli e Trasporti': 'veicoli-e-trasporti',
  'Salute e Benessere': 'salute-e-benessere',
  'Matematica e Geometria': 'matematica-e-geometria',
  'Conversioni': 'conversioni',
  'Famiglia e Vita Quotidiana': 'famiglia-e-vita-quotidiana',
  'Agricoltura e Cibo': 'agricoltura-e-cibo',
  'Vita Quotidiana': 'vita-quotidiana',
  'Computo, Sicurezza e Cantiere (10 Calcolatori)': 'computo-sicurezza-e-cantiere-10-calcolatori'
};

// Converti il nome in slug
function normalizeCategoryName(name: string): string {
  return CATEGORY_NAME_TO_SLUG[name] || name.toLowerCase().replace(/\s+/g, '-');
}

const CATEGORY_CALCULATORS: Record<string, Calculator[]> = {
  'acustica-e-termotecnica': [
    { name: 'Isolamento Acustico Facciata', slug: 'isolamento-acustico-facciata', description: 'Calcola il D2m,nT,W per facciate' },
    { name: 'Trasmittanza Termica Infissi', slug: 'trasmittanza-termica-infissi', description: 'Uw calcolato da Uf, Ug e Ψg' },
    { name: 'Sfasamento Onda Termica', slug: 'sfasamento-onda-termica', description: 'Calcolo sfasamento e attenuazione pareti opache' },
    { name: 'Verifica Condensa Superficiale', slug: 'verifica-condensa-superficiale', description: 'Metodo Glaser per condensa' },
  ],
  // altre categorie...
};

const CATEGORY_ICONS: Record<string, string> = {
  'acustica-e-termotecnica': '🎧',
  'fisco-e-lavoro-autonomo': '💼',
  // altre icone...
};

export default function RelatedCalculators({
  currentCategory,
  currentSlug,
  maxItems = 6,
}: RelatedCalculatorsProps) {
  const [relatedCalculators, setRelatedCalculators] = useState<Calculator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRelatedCalculators = useCallback(() => {
    setIsLoading(true);

    try {
      const normalizedCategory = normalizeCategoryName(currentCategory);
      const categoryCalculators = CATEGORY_CALCULATORS[normalizedCategory] ?? [];

      if (categoryCalculators.length === 0) {
        console.warn(`❗ Categoria non trovata o vuota: "${normalizedCategory}"`);
      }

      const otherCalculators = categoryCalculators.filter(
        (calc) => calc.slug !== currentSlug
      );

      const shuffled = [...otherCalculators].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, maxItems);

      setRelatedCalculators(selected);
    } catch (error) {
      console.error('Errore caricamento calcolatori correlati:', error);
      setRelatedCalculators([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentCategory, currentSlug, maxItems]);

  useEffect(() => {
    loadRelatedCalculators();
  }, [loadRelatedCalculators]);

  if (relatedCalculators.length === 0) return null;

  const categorySlug = normalizeCategoryName(currentCategory);
  const categoryIcon = CATEGORY_ICONS[categorySlug] ?? '📊';

  return (
    <div >
      <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
       Calcolatori Correlati
      </h3>
      <ul className="space-y-2">
        {relatedCalculators.map((calculator) => (
          <li key={calculator.slug}>
            <Link
              href={`/${categorySlug}/${calculator.slug}`}
              className="text-blue-600 hover:underline"
            >
              {calculator.name}
              
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
