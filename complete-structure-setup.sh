#!/bin/bash

# complete-structure-setup.sh - Setup completo struttura multilingua statica

echo "🌍 SoCalSolver - Setup Struttura Multilingua Completa"
echo "====================================================="

# ========================================
# CONFIGURAZIONE LINGUE E CATEGORIE
# ========================================

# Lingue supportate
LANGUAGES=("it" "en" "es" "fr")

# Categorie per ogni lingua (slug-based)
declare -A CATEGORIES
CATEGORIES[it]="agricoltura-e-cibo conversioni famiglia-e-vita-quotidiana finanza-personale fisco-e-lavoro-autonomo immobiliare-e-casa matematica-e-geometria pmi-e-impresa risparmio-e-investimenti salute-e-benessere veicoli-e-trasporti vita-quotidiana"
CATEGORIES[en]="agriculture-and-food conversions family-and-daily-life personal-finance tax-and-freelance real-estate-and-home mathematics-and-geometry sme-and-business savings-and-investments health-and-wellness vehicles-and-transport daily-life"
CATEGORIES[es]="agricultura-y-comida conversiones familia-y-vida-diaria finanzas-personales impuestos-y-autonomos inmobiliaria-y-hogar matematicas-y-geometria pyme-y-empresa ahorro-e-inversiones salud-y-bienestar vehiculos-y-transporte vida-diaria"
CATEGORIES[fr]="agriculture-et-alimentation conversions famille-et-vie-quotidienne finances-personnelles fiscalite-et-freelance immobilier-et-maison mathematiques-et-geometrie pme-et-entreprise epargne-et-investissements sante-et-bien-etre vehicules-et-transport vie-quotidienne"

# Nomi human-readable delle categorie per ogni lingua
declare -A CATEGORY_NAMES
CATEGORY_NAMES[it]="Agricoltura e Cibo|Conversioni|Famiglia e Vita Quotidiana|Finanza Personale|Fisco e Lavoro Autonomo|Immobiliare e Casa|Matematica e Geometria|PMI e Impresa|Risparmio e Investimenti|Salute e Benessere|Veicoli e Trasporti|Vita Quotidiana"
CATEGORY_NAMES[en]="Agriculture and Food|Conversions|Family and Daily Life|Personal Finance|Tax and Freelance|Real Estate and Home|Mathematics and Geometry|SME and Business|Savings and Investments|Health and Wellness|Vehicles and Transport|Daily Life"
CATEGORY_NAMES[es]="Agricultura y Comida|Conversiones|Familia y Vida Diaria|Finanzas Personales|Impuestos y Autónomos|Inmobiliaria y Hogar|Matemáticas y Geometría|PyME y Empresa|Ahorro e Inversiones|Salud y Bienestar|Vehículos y Transporte|Vida Diaria"
CATEGORY_NAMES[fr]="Agriculture et Alimentation|Conversions|Famille et Vie Quotidienne|Finances Personnelles|Fiscalité et Freelance|Immobilier et Maison|Mathématiques et Géométrie|PME et Entreprise|Épargne et Investissements|Santé et Bien-être|Véhicules et Transport|Vie Quotidienne"

# Traduzioni testi comuni
declare -A TRANSLATIONS
TRANSLATIONS[it]="Home|Calcolatori Correlati|Altri strumenti utili|Vedi tutti i calcolatori|Calcola ora|Strumenti|Salva Risultato|Esporta PDF|Condividi|Stampa|Info|Risultati|Parametri"
TRANSLATIONS[en]="Home|Related Calculators|Other useful tools|View all calculators|Calculate now|Tools|Save Result|Export PDF|Share|Print|Info|Results|Parameters"
TRANSLATIONS[es]="Inicio|Calculadoras Relacionadas|Otras herramientas útiles|Ver todas las calculadoras|Calcular ahora|Herramientas|Guardar Resultado|Exportar PDF|Compartir|Imprimir|Info|Resultados|Parámetros"
TRANSLATIONS[fr]="Accueil|Calculatrices Connexes|Autres outils utiles|Voir toutes les calculatrices|Calculer maintenant|Outils|Sauvegarder Résultat|Exporter PDF|Partager|Imprimer|Info|Résultats|Paramètres"

echo "🗂️  Configurazione caricata:"
echo "   Lingue: ${LANGUAGES[*]}"
echo "   Categorie per lingua: ${#CATEGORIES[@]} set definiti"

# ========================================
# 1. CREAZIONE STRUTTURA COMPLETA
# ========================================

echo ""
echo "📁 Creazione struttura completa cartelle..."

# Backup se esiste già
if [[ -d "app" ]]; then
    BACKUP_DIR="backups/pre-structure-$(date +%Y%m%d_%H%M%S)"
    echo "💾 Backup struttura esistente in: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    cp -r app "$BACKUP_DIR/" 2>/dev/null || true
fi

# Crea struttura app per ogni lingua
for lang in "${LANGUAGES[@]}"; do
    echo "  🌍 Creazione struttura per lingua: $lang"
    
    # Directory base lingua
    mkdir -p "app/$lang"
    
    # Crea categorie per questa lingua
    IFS=' ' read -ra CATS <<< "${CATEGORIES[$lang]}"
    for category in "${CATS[@]}"; do
        echo "    📂 Categoria: $category"
        mkdir -p "app/$lang/$category"
        mkdir -p "app/$lang/$category/[slug]"
        mkdir -p "content/$lang/$category"
    done
done

# Crea directory componenti se non esistono
mkdir -p components/calculator
mkdir -p components/layout
mkdir -p components/ui

echo "✅ Struttura cartelle creata"

# ========================================
# 2. CREAZIONE COMPONENTI BASE MULTILINGUA
# ========================================

echo ""
echo "🎨 Creazione componenti base multilingua..."

# CalculatorWrapper
cat > components/calculator/CalculatorWrapper.tsx << 'WRAPPER_EOF'
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
WRAPPER_EOF

# ToolsSidebar multilingua
cat > components/calculator/ToolsSidebar.tsx << 'TOOLS_EOF'
'use client';
import React, { useState } from 'react';
import { 
  BookmarkIcon, 
  DocumentArrowDownIcon, 
  ShareIcon,
  PrinterIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ToolsSidebarProps {
  calculatorName: string;
  results?: Record<string, number>;
  inputs?: Record<string, any>;
  lang?: string;
}

const TRANSLATIONS: Record<string, Record<string, string>> = {
  it: {
    tools: 'Strumenti',
    saveResult: 'Salva Risultato',
    exportPdf: 'Esporta PDF', 
    share: 'Condividi',
    print: 'Stampa',
    info: 'Info',
    results: 'Risultati',
    parameters: 'Parametri',
    saving: 'Salvando...',
    resultSaved: 'Risultato salvato!',
    urlCopied: 'URL copiato!',
    noResults: 'Nessun risultato da salvare'
  },
  en: {
    tools: 'Tools',
    saveResult: 'Save Result',
    exportPdf: 'Export PDF',
    share: 'Share', 
    print: 'Print',
    info: 'Info',
    results: 'Results',
    parameters: 'Parameters',
    saving: 'Saving...',
    resultSaved: 'Result saved!',
    urlCopied: 'URL copied!',
    noResults: 'No results to save'
  },
  es: {
    tools: 'Herramientas',
    saveResult: 'Guardar Resultado',
    exportPdf: 'Exportar PDF',
    share: 'Compartir',
    print: 'Imprimir', 
    info: 'Info',
    results: 'Resultados',
    parameters: 'Parámetros',
    saving: 'Guardando...',
    resultSaved: 'Resultado guardado!',
    urlCopied: 'URL copiado!',
    noResults: 'No hay resultados para guardar'
  },
  fr: {
    tools: 'Outils',
    saveResult: 'Sauvegarder Résultat',
    exportPdf: 'Exporter PDF',
    share: 'Partager',
    print: 'Imprimer',
    info: 'Info', 
    results: 'Résultats',
    parameters: 'Paramètres',
    saving: 'Sauvegarde...',
    resultSaved: 'Résultat sauvegardé!',
    urlCopied: 'URL copié!',
    noResults: 'Aucun résultat à sauvegarder'
  }
};

export default function ToolsSidebar({ 
  calculatorName, 
  results = {}, 
  inputs = {},
  lang = 'it'
}: ToolsSidebarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.it;

  const showToast = (message: string) => {
    // Semplice toast - sostituisci con libreria dedicata
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleSaveResult = () => {
    if (Object.keys(results).length === 0) {
      showToast(t.noResults);
      return;
    }
    
    setIsSaving(true);
    try {
      const saved = JSON.parse(localStorage.getItem('calculator_saves') || '[]');
      saved.push({
        id: Date.now().toString(),
        calculator: calculatorName,
        inputs,
        results,
        savedAt: new Date().toISOString(),
        lang
      });
      localStorage.setItem('calculator_saves', JSON.stringify(saved));
      showToast(t.resultSaved);
    } catch (error) {
      showToast('Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${t.results} ${calculatorName}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast(t.urlCopied);
      }
    } catch (error) {
      showToast('Error');
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2 text-blue-600" />
          {t.tools}
        </h3>
        
        <div className="space-y-3">
          <button 
            onClick={handleSaveResult}
            disabled={isSaving}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <BookmarkIcon className="w-5 h-5 mr-3 text-green-600" />
            <span>{isSaving ? t.saving : `📊 ${t.saveResult}`}</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-3 text-red-600" />
            <span>📄 {t.exportPdf}</span>
          </button>

          <button 
            onClick={handleShare}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <ShareIcon className="w-5 h-5 mr-3 text-blue-600" />
            <span>🔗 {t.share}</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <PrinterIcon className="w-5 h-5 mr-3 text-gray-600" />
            <span>🖨️ {t.print}</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📊 {t.info}</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• {t.results}: {Object.keys(results).length}</p>
            <p>• {t.parameters}: {Object.keys(inputs).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
TOOLS_EOF

# RelatedCalculators multilingua
cat > components/calculator/RelatedCalculators.tsx << 'RELATED_EOF'
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Calculator {
  name: string;
  slug: string;
  description: string;
}

interface RelatedCalculatorsProps {
  currentCategory: string;
  currentSlug: string;
  lang?: string;
  maxItems?: number;
}

// Sample calculators - da popolare con dati reali
const SAMPLE_CALCULATORS: Record<string, Calculator[]> = {
  'fisco-e-lavoro-autonomo': [
    { name: 'Tasse Regime Forfettario', slug: 'tasse-regime-forfettario', description: 'Calcola tasse e acconti per regime forfettario' },
    { name: 'Tassazione Periti Industriali', slug: 'tassazione-periti-industriali-eppi', description: 'Imposte per periti industriali con EPPI' },
    { name: 'Calcolo IRPEF', slug: 'calcolo-irpef', description: 'Imposta sul reddito delle persone fisiche' }
  ]
};

const TRANSLATIONS: Record<string, Record<string, string>> = {
  it: { 
    relatedCalculators: 'Calcolatori Correlati',
    otherTools: 'Altri strumenti utili in questa categoria',
    refresh: 'Rinnova',
    calculateNow: 'Calcola ora',
    viewAll: 'Vedi tutti i calcolatori'
  },
  en: { 
    relatedCalculators: 'Related Calculators',
    otherTools: 'Other useful tools in this category', 
    refresh: 'Refresh',
    calculateNow: 'Calculate now',
    viewAll: 'View all calculators'
  },
  es: { 
    relatedCalculators: 'Calculadoras Relacionadas',
    otherTools: 'Otras herramientas útiles en esta categoría',
    refresh: 'Actualizar', 
    calculateNow: 'Calcular ahora',
    viewAll: 'Ver todas las calculadoras'
  },
  fr: { 
    relatedCalculators: 'Calculatrices Connexes',
    otherTools: 'Autres outils utiles dans cette catégorie',
    refresh: 'Actualiser',
    calculateNow: 'Calculer maintenant', 
    viewAll: 'Voir toutes les calculatrices'
  }
};

export default function RelatedCalculators({ 
  currentCategory, 
  currentSlug, 
  lang = 'it',
  maxItems = 6 
}: RelatedCalculatorsProps) {
  const [relatedCalculators, setRelatedCalculators] = useState<Calculator[]>([]);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.it;

  useEffect(() => {
    const allCalculators = SAMPLE_CALCULATORS[currentCategory] || [];
    const filtered = allCalculators.filter(calc => calc.slug !== currentSlug);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setRelatedCalculators(shuffled.slice(0, maxItems));
  }, [currentCategory, currentSlug, maxItems]);

  if (relatedCalculators.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-3xl mr-3">📊</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{t.relatedCalculators}</h3>
            <p className="text-gray-600">{t.otherTools}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-white border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <SparklesIcon className="w-4 h-4 mr-2" />
          {t.refresh}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCalculators.map((calculator, index) => (
          <Link
            key={`${calculator.slug}-${index}`}
            href={`/${lang}/${currentCategory}/${calculator.slug}`}
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                {calculator.name}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{calculator.description}</p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                <span>{t.calculateNow}</span>
                <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${lang}/${currentCategory}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          <span>{t.viewAll}</span>
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
RELATED_EOF

echo "✅ Componenti base creati"

# ========================================
# 3. CREAZIONE TEMPLATE PAGINE MULTILINGUA
# ========================================

echo ""
echo "📄 Creazione template pagine per tutte le lingue..."

# Funzione per ottenere nome categoria tradotto
get_category_name() {
    local lang="$1"
    local category_slug="$2"
    
    IFS=' ' read -ra CATS <<< "${CATEGORIES[$lang]}"
    IFS='|' read -ra NAMES <<< "${CATEGORY_NAMES[$lang]}"
    
    for i in "${!CATS[@]}"; do
        if [[ "${CATS[$i]}" == "$category_slug" ]]; then
            echo "${NAMES[$i]}"
            return
        fi
    done
    
    # Fallback: converte slug in nome
    echo "$category_slug" | sed 's/-/ /g' | sed 's/\b\w/\U&/g'
}

# Funzione per creare template [slug]/page.tsx
create_slug_template() {
    local lang="$1"
    local category="$2"
    
    local category_name=$(get_category_name "$lang" "$category")
    
    cat > "app/$lang/$category/[slug]/page.tsx" << EOF
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CalculatorWrapper from '@/components/calculator/CalculatorWrapper';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';

type Props = { params: { slug: string } };

async function getCalculatorComponent(slug: string) {
  try {
    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Calculator';
    return (await import(\`@/components/calculators/\${componentName}\`)).default;
  } catch (error) { 
    return null; 
  }
}

async function getContent(slug: string) {
  try {
    const contentPath = path.join(process.cwd(), 'content', '$lang', '$category', \`\${slug}.md\`);
    return await fs.readFile(contentPath, 'utf8');
  } catch (error) { 
    return null; 
  }
}

export default async function CalculatorPage({ params }: Props) {
  const CalculatorComponent = await getCalculatorComponent(params.slug);
  const content = await getContent(params.slug);

  if (!CalculatorComponent) notFound();
  
  const calculatorName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const homeText = '$lang' === 'it' ? 'Home' : '$lang' === 'en' ? 'Home' : '$lang' === 'es' ? 'Inicio' : 'Accueil';
  
  const crumbs = [
      { name: homeText, path: "/$lang" },
      { name: "$category_name", path: "/$lang/$category" },
      { name: calculatorName }
  ];

  return (
    <div className="space-y-8">
        <Breadcrumb crumbs={crumbs} />
        
        <CalculatorWrapper calculatorName={calculatorName} lang="$lang">
          <CalculatorComponent />
        </CalculatorWrapper>
        
        {content && (
            <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        )}
        
        <RelatedCalculators
          currentCategory="$category"
          currentSlug={params.slug}
          lang="$lang"
        />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const calculatorName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: \`\${calculatorName} | $category_name | SoCalSolver\`,
    description: \`Calculate \${calculatorName.toLowerCase()} online free. Professional tool for $category_name.\`,
  };
}
EOF
}

# Funzione per creare template categoria page.tsx
create_category_template() {
    local lang="$1"
    local category="$2"
    
    local category_name=$(get_category_name "$lang" "$category")
    
    cat > "app/$lang/$category/page.tsx" << EOF
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import Breadcrumb from '@/components/layout/Breadcrumb';

async function getCalculators() {
    const calculatorsPath = path.join(process.cwd(), 'content', '$lang', '$category');
    try {
        const entries = await fs.readdir(calculatorsPath, { withFileTypes: true });
        return entries
            .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
            .map(entry => {
                const slug = entry.name.replace('.md', '');
                const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return { name, slug };
            });
    } catch (error) { return []; }
}

export default async function CategoryPage() {
  const calculators = await getCalculators();
  const categoryName = "$category_name";
  
  const homeText = '$lang' === 'it' ? 'Home' : '$lang' === 'en' ? 'Home' : '$lang' === 'es' ? 'Inicio' : 'Accueil';
  const crumbs = [{ name: homeText, path: "/$lang" }, { name: categoryName }];

  return (
    <div className="space-y-8">
      <Breadcrumb crumbs={crumbs} />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        <p className="text-xl opacity-90">Professional calculators for {categoryName.toLowerCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={\`/$lang/$category/\${calc.slug}\`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name}
              </h2>
              <p className="text-gray-600">Professional calculation for {calc.name.toLowerCase()}</p>
            </Link>
        ))}
      </div>
    </div>
  );
}
EOF
}

# Crea tutti i template per tutte le lingue e categorie
for lang in "${LANGUAGES[@]}"; do
    echo "  🌍 Templates per lingua: $lang"
    
    IFS=' ' read -ra CATS <<< "${CATEGORIES[$lang]}"
    for category in "${CATS[@]}"; do
        echo "    📂 $category"
        create_slug_template "$lang" "$category"
        create_category_template "$lang" "$category"
    done
done

# ========================================
# 4. LAYOUT MULTILINGUA
# ========================================

echo ""
echo "🎨 Creazione layout multilingua..."

for lang in "${LANGUAGES[@]}"; do
    echo "  🌍 Layout per: $lang"
    
    cat > "app/$lang/layout.tsx" << EOF
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "SoCalSolver - Professional Online Calculators",
    template: "%s | SoCalSolver",
  },
  description: "Professional calculators for taxes, finance, health and much more.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Header lang="$lang" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer lang="$lang" />
    </div>
  );
}
EOF

    # Homepage per ogni lingua
    cat > "app/$lang/page.tsx" << EOF
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

async function getCategories() {
    const categories = "${CATEGORIES[$lang]}".split(' ');
    const names = "${CATEGORY_NAMES[$lang]}".split('|');
    
    return categories.map((slug, index) => ({
        name: names[index] || slug,
        slug
    }));
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          SoCalSolver Professional
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
          Professional calculators for taxes, finance, real estate and much more
        </p>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
                 <Link 
                   key={cat.slug} 
                   href={\`/$lang/\${cat.slug}\`} 
                   className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                 >
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
EOF
done

# ========================================
# 5. TEST E VERIFICA
# ========================================

echo ""
echo "🧪 Test struttura creata..."

# Conta file creati
TOTAL_PAGES=0
for lang in "${LANGUAGES[@]}"; do
    IFS=' ' read -ra CATS <<< "${CATEGORIES[$lang]}"
    LANG_PAGES=$((${#CATS[@]} * 2)) # page.tsx + [slug]/page.tsx per categoria
    TOTAL_PAGES=$((TOTAL_PAGES + LANG_PAGES + 1)) # +1 per homepage
    echo "  🌍 $lang: ${#CATS[@]} categorie, $LANG_PAGES pagine"
done

echo ""
echo "✅ SETUP STRUTTURA COMPLETO!"
echo "============================"
echo ""
echo "📊 STATISTICHE:"
echo "  🌍 Lingue: ${#LANGUAGES[@]}"
echo "  📂 Categorie totali: $(($(echo "${CATEGORIES[*]}" | wc -w)))"
echo "  📄 Pagine create: $TOTAL_PAGES"
echo "  🎨 Componenti: 3 componenti multilingua"
echo ""
echo "📁 STRUTTURA CREATA:"
echo "  app/"
for lang in "${LANGUAGES[@]}"; do
    echo "    $lang/"
    IFS=' ' read -ra CATS <<< "${CATEGORIES[$lang]}"
    for category in "${CATS[@]:0:3}"; do # Mostra solo primi 3
        echo "      $category/"
        echo "        [slug]/page.tsx"
        echo "        page.tsx"
    done
    if [[ ${#CATS[@]} -gt 3 ]]; then
        echo "      ... e altre $((${#CATS[@]} - 3)) categorie"
    fi
done
echo ""
echo "🧪 PROSSIMI PASSI:"
echo "  1. npm run build          # Test build"
echo "  2. npm run dev            # Test sviluppo" 
echo "  3. Popola i SAMPLE_CALCULATORS con dati reali"
echo "  4. Aggiungi traduzioni mancanti"
echo ""
echo "🎯 PRONTO PER L'AUTOMAZIONE MULTILINGUA!"
