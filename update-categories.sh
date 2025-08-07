#!/bin/bash

# Script per aggiornare automaticamente tutte le pagine di categoria
# Uso: ./update-categories.sh
# Requisiti: Essere nella root del progetto Next.js

set -e  # Esci se c'è un errore

echo "🚀 AGGIORNAMENTO CATEGORIE CALCOLO.ONLINE"
echo "=========================================="

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funzione per creare il file page.tsx per ogni categoria
create_category_page() {
    local category=$1
    local category_name=$2
    local description=$3
    local icon=$4
    local gradient=$5
    local content_path=$6
    local stats_calc=$7
    local stats_prof=$8
    local stats_calc_total=$9
    local stats_precision=${10}
    local feature1_name=${11}
    local feature1_desc=${12}
    local feature2_name=${13}
    local feature2_desc=${14}
    local feature3_name=${15}
    local feature3_desc=${16}
    local calculator_meta=${17}

    echo -e "${BLUE}📁 Processando: $category${NC}"

    # Backup file esistente
    if [ -f "app/$category/page.tsx" ]; then
        echo -e "   ${YELLOW}💾 Backup: app/$category/page.tsx.backup${NC}"
        cp "app/$category/page.tsx" "app/$category/page.tsx.backup"
    fi

    # Crea il nuovo file
    cat > "app/$category/page.tsx" << EOF
// app/$category/page.tsx - Generato automaticamente
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { 
  ClockIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const CATEGORY_CONFIG = {
  slug: '$category',
  name: '$category_name',
  description: '$description',
  icon: '$icon',
  gradient: '$gradient',
  contentPath: '$content_path',
  stats: {
    calculators: '$stats_calc',
    professionals: '$stats_prof',
    calculations: '$stats_calc_total',
    precision: '$stats_precision'
  },
  features: [
    {
      name: '$feature1_name',
      description: '$feature1_desc',
      icon: CheckCircleIcon
    },
    {
      name: '$feature2_name',
      description: '$feature2_desc',
      icon: DocumentTextIcon
    },
    {
      name: '$feature3_name',
      description: '$feature3_desc',
      icon: UserGroupIcon
    }
  ]
};

$calculator_meta

const difficultyConfig = {
  'Facile': { color: 'bg-green-100 text-green-800 border-green-200', icon: '🟢' },
  'Medio': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🟡' },
  'Avanzato': { color: 'bg-red-100 text-red-800 border-red-200', icon: '🔴' }
};

async function getCalculators() {
  const calculatorsPath = path.join(process.cwd(), 'content', CATEGORY_CONFIG.contentPath);
  try {
    const entries = await fs.readdir(calculatorsPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
      .map(entry => {
        const slug = entry.name.replace('.md', '');
        const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const meta = calculatorMeta[slug] || {};
        return { 
          name, 
          slug, 
          href: \`/\${CATEGORY_CONFIG.slug}/\${slug}\`,
          ...meta
        };
      });
  } catch (error) { 
    return []; 
  }
}

export default async function CategoryPage() {
  const calculators = await getCalculators();
  const featuredCalculators = calculators.filter(calc => calc.featured);
  const otherCalculators = calculators.filter(calc => !calc.featured);

  const breadcrumbs = [
    { name: "Home", path: "/" }, 
    { name: CATEGORY_CONFIG.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {crumb.path ? (
                    <Link href={crumb.path} className="hover:text-blue-600 transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">{crumb.name}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className={\`bg-gradient-to-r \${CATEGORY_CONFIG.gradient} text-white\`}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">{CATEGORY_CONFIG.icon}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {CATEGORY_CONFIG.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-3xl mx-auto">
              {CATEGORY_CONFIG.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#calcolatori"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                Scopri i Calcolatori
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {Object.entries(CATEGORY_CONFIG.stats).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <dt className="text-sm leading-6 text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' \$1')}
                </dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Perché scegliere i nostri calcolatori
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Strumenti progettati specificamente per professionisti del settore
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {CATEGORY_CONFIG.features.map((feature) => (
                <div key={feature.name} className="flex flex-col items-start">
                  <div className={\`rounded-lg bg-gradient-to-br \${CATEGORY_CONFIG.gradient} p-2 ring-1 ring-white/20\`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Featured Calculators */}
      {featuredCalculators.length > 0 && (
        <div id="calcolatori" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Calcolatori in Evidenza
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                I nostri strumenti più utilizzati dai professionisti
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
              {featuredCalculators.map((calc) => (
                <article key={calc.slug} className="group relative flex flex-col rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 hover:shadow-2xl hover:ring-blue-300 transition-all duration-300 hover:-translate-y-2">
                  <div className={\`h-2 bg-gradient-to-r \${CATEGORY_CONFIG.gradient} rounded-t-2xl\`} />
                  <div className="p-8 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <StarIcon className="h-6 w-6 text-yellow-500" />
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-200">
                        In evidenza
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold leading-8 text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      <Link href={calc.href}>
                        <span className="absolute inset-0" />
                        {calc.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {calc.description || \`Calcolo professionale per \${calc.name.toLowerCase()}\`}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        {calc.difficulty && (
                          <span className={\`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border \${difficultyConfig[calc.difficulty].color}\`}>
                            {difficultyConfig[calc.difficulty].icon} {calc.difficulty}
                          </span>
                        )}
                        {calc.estimatedTime && (
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{calc.estimatedTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 pt-0">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      Inizia il calcolo
                    </span>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Calculators */}
      <div className={\`\${featuredCalculators.length > 0 ? 'bg-gray-50' : ''} py-24\`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {featuredCalculators.length > 0 ? 'Altri Calcolatori' : 'Tutti i Calcolatori'}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Strumenti completi per ogni esigenza professionale
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
            {(featuredCalculators.length > 0 ? otherCalculators : calculators).map((calc) => (
              <Link
                key={calc.slug}
                href={calc.href}
                className="group relative flex flex-col rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <ChartBarIcon className="h-8 w-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  {calc.difficulty && (
                    <span className={\`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border \${difficultyConfig[calc.difficulty].color}\`}>
                      {difficultyConfig[calc.difficulty].icon} {calc.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {calc.description || \`Calcolo professionale per \${calc.name.toLowerCase()}\`}
                </p>
                <div className="flex items-center justify-between">
                  {calc.estimatedTime && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      <span>{calc.estimatedTime}</span>
                    </div>
                  )}
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={\`bg-gradient-to-r \${CATEGORY_CONFIG.gradient}\`}>
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto per iniziare?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
              Unisciti ai migliaia di professionisti che utilizzano i nostri calcolatori ogni giorno.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#calcolatori"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-300"
              >
                Inizia ora
              </Link>
              <Link href="/contattaci" className="text-base font-semibold leading-7 text-white hover:text-white/80 transition-colors">
                Contattaci <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

    echo -e "   ${GREEN}✅ Creato: app/$category/page.tsx${NC}"
}

# Verifica che siamo nella directory corretta
if [ ! -f "package.json" ] || [ ! -d "app" ]; then
    echo -e "${RED}❌ Errore: Esegui lo script dalla root del progetto Next.js${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Creazione pagine di categoria professionali...${NC}"
echo ""

# 🏗️ COMPUTO SICUREZZA E CANTIERE
create_category_page \
    "computo-sicurezza-e-cantiere-10-calcolatori" \
    "Computo, Sicurezza e Cantiere" \
    "Strumenti per computi metrici, sicurezza sul lavoro, gestione cantieri e verifiche strutturali secondo normative D.Lgs. 81/08 e NTC 2018" \
    "🏗️" \
    "from-orange-500 to-red-500" \
    "computo-sicurezza-e-cantiere-10-calcolatori" \
    "10" \
    "3.2k+" \
    "22k+" \
    "99.5%" \
    "Conformità Normativa" \
    "Calcoli secondo D.Lgs. 81/08, D.M. 17/06/2016, UNI 11578" \
    "Sicurezza Garantita" \
    "Verifiche strutturali e di sicurezza per cantieri" \
    "Computi Precisi" \
    "Stime accurate per materiali e manodopera" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  "calcolo-compensi-pubblici": {
    difficulty: "Facile",
    estimatedTime: "1-2 min",
    featured: true,
    description: "Calcolo compensi professionali secondo D.M. 17/06/2016"
  },
  "verifica-ancoraggi-linee-vita": {
    difficulty: "Avanzato",
    estimatedTime: "5-8 min",
    featured: true,
    description: "Verifica ancoraggi secondo UNI 11578 ed EN 795"
  },
  "verifica-stabilita-ponteggi": {
    difficulty: "Avanzato",
    estimatedTime: "7-10 min",
    featured: true,
    description: "Verifica stabilità ponteggi a tubi e giunti"
  },
  "calcolo-scavi-rinterri": {
    difficulty: "Medio",
    estimatedTime: "3-5 min",
    description: "Calcolo volumi di scavo e rinterro"
  },
  "calcolo-parcella-privati": {
    difficulty: "Facile",
    estimatedTime: "1-2 min",
    description: "Calcolo parcelle per lavori privati secondo D.M. 140/2012"
  },
  "computo-materiali-costruzione": {
    difficulty: "Medio",
    estimatedTime: "3-6 min",
    description: "Computo quantità materiali da costruzione"
  },
  "calcolo-pressione-vento-cantiere": {
    difficulty: "Medio",
    estimatedTime: "2-4 min",
    description: "Calcolo pressione vento su elementi temporanei di cantiere"
  },
  "calcolo-ripartizione-spese-cantiere": {
    difficulty: "Facile",
    estimatedTime: "1-2 min",
    description: "Ripartizione costi tra partecipanti al cantiere"
  },
  "calcolo-incidenza-manodopera-sicurezza": {
    difficulty: "Medio",
    estimatedTime: "2-3 min",
    description: "Calcolo incidenza costi manodopera e sicurezza"
  }
};'

# 🔄 CONVERTITORI TECNICI AVANZATI
create_category_page \
    "convertitori-tecnici-avanzati" \
    "Convertitori Tecnici Avanzati" \
    "Conversioni professionali per unità di misura, classi di materiali, pressioni e grandezze fisiche secondo standard internazionali" \
    "🔄" \
    "from-purple-500 to-pink-500" \
    "convertitori-tecnici-avanzati" \
    "8" \
    "5k+" \
    "50k+" \
    "100%" \
    "Standard Internazionali" \
    "Conversioni basate su normative ISO, ASTM, EN" \
    "Precisione Assoluta" \
    "Algoritmi di conversione certificati e validati" \
    "Interfaccia Intuitiva" \
    "Conversioni immediate con aggiornamento in tempo reale" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  "convertitore-energia": {
    difficulty: "Facile",
    estimatedTime: "1 min",
    featured: true,
    description: "Conversione istantanea Joule/kWh"
  },
  "convertitore-classi-acciaio": {
    difficulty: "Medio",
    estimatedTime: "2-3 min",
    featured: true,
    description: "Conversione classi acciaio storiche/moderne"
  },
  "convertitore-misure-anglosassoni": {
    difficulty: "Facile",
    estimatedTime: "1 min",
    featured: true,
    description: "Conversione pollici/metri istantanea"
  },
  "convertitore-forza": {
    difficulty: "Facile",
    estimatedTime: "1 min",
    description: "Conversione Newton/kilogrammo-forza"
  },
  "convertitore-pressione": {
    difficulty: "Facile",
    estimatedTime: "1 min",
    description: "Conversione Pascal/Bar/Psi/Atmosfere"
  },
  "convertitore-classi-calcestruzzo": {
    difficulty: "Medio",
    estimatedTime: "2-3 min",
    description: "Conversione Rck/Classe C calcestruzzo"
  },
  "convertitore-durezza-materiali": {
    difficulty: "Medio",
    estimatedTime: "2-3 min",
    description: "Conversione Brinell/Rockwell/Vickers"
  }
};'

# ⚡ ELETTROTECNICA ED ELETTRICITÀ
create_category_page \
    "elettrotecnica-ed-elettricita" \
    "Elettrotecnica ed Elettricità" \
    "Calcoli per impianti elettrici, dimensionamento conduttori, protezioni e verifiche secondo norma CEI 64-8 e IEC" \
    "⚡" \
    "from-yellow-400 to-orange-500" \
    "elettrotecnica-ed-elettricita" \
    "15" \
    "4k+" \
    "35k+" \
    "99.9%" \
    "Conformità CEI" \
    "Calcoli secondo CEI 64-8, CEI 11-17, IEC 60364" \
    "Sicurezza Elettrica" \
    "Verifiche di protezione e dimensionamento sicuro" \
    "Impianti Completi" \
    "Dalla progettazione alla verifica finale" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  // Inserisci qui i tuoi calcolatori elettrotecnici
  "calcolo-corrente-elettrica": {
    difficulty: "Medio",
    estimatedTime: "2-4 min",
    featured: true,
    description: "Calcolo corrente elettrica secondo legge di Ohm"
  }
};'

# 🏢 INGEGNERIA STRUTTURALE
create_category_page \
    "ingegneria-strutturale" \
    "Ingegneria Strutturale" \
    "Calcoli strutturali, verifiche sismiche, dimensionamento elementi e analisi secondo Norme Tecniche per le Costruzioni NTC 2018" \
    "🏢" \
    "from-gray-600 to-slate-700" \
    "elettrotecnica-ed-elettricita" \
    "20" \
    "6k+" \
    "40k+" \
    "99.7%" \
    "NTC 2018 Compliant" \
    "Calcoli conformi alle Norme Tecniche per le Costruzioni" \
    "Analisi Sismica" \
    "Verifiche sismiche e spettri di risposta" \
    "Elementi Strutturali" \
    "Dimensionamento travi, pilastri, fondazioni" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  "analisi-spettro-risposta-sismico": {
    difficulty: "Avanzato",
    estimatedTime: "10-15 min",
    featured: true,
    description: "Analisi spettro di risposta sismico secondo NTC 2018"
  }
};'

# 💧 INGEGNERIA IDRAULICA
create_category_page \
    "ingegneria-idraulica" \
    "Ingegneria Idraulica" \
    "Calcoli per sistemi idraulici, dimensionamento condotte, perdite di carico e reti di distribuzione idrica" \
    "💧" \
    "from-blue-400 to-cyan-600" \
    "ingegneria-idraulica" \
    "12" \
    "1.8k+" \
    "12k+" \
    "99.6%" \
    "Formule Classiche" \
    "Hazen-Williams, Darcy-Weisbach, Manning" \
    "Reti Complesse" \
    "Analisi di reti di distribuzione e collettori" \
    "Perdite di Carico" \
    "Calcoli precisi per ogni tipologia di sistema" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  // Inserisci qui i tuoi calcolatori idraulici
};'

# 🌍 INGEGNERIA GEOTECNICA
create_category_page \
    "ingegneria-geotecnica" \
    "Ingegneria Geotecnica" \
    "Calcoli geotecnici, stabilità pendii, portanza fondazioni e verifiche secondo Eurocodice 7 e NTC 2018" \
    "🌍" \
    "from-green-600 to-emerald-700" \
    "ingegneria-geotecnica" \
    "10" \
    "1.5k+" \
    "8k+" \
    "99.4%" \
    "Eurocodice 7" \
    "Calcoli secondo EC7 e NTC 2018 per geotecnica" \
    "Stabilità Pendii" \
    "Analisi di stabilità con diversi metodi" \
    "Fondazioni" \
    "Calcolo portanza e cedimenti fondazioni" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  // Inserisci qui i tuoi calcolatori geotecnici
};'

# 💼 FINANZA E BUSINESS
create_category_page \
    "finanza-e-business" \
    "Finanza e Business" \
    "Calcoli finanziari, analisi investimenti, valutazioni economiche e strumenti per decisioni aziendali" \
    "💼" \
    "from-indigo-500 to-purple-600" \
    "finanza-e-business" \
    "15" \
    "3.5k+" \
    "25k+" \
    "99.9%" \
    "Analisi Finanziaria" \
    "VAN, TIR, payback period e analisi di fattibilità" \
    "Valutazioni Aziendali" \
    "DCF, multipli di mercato, business plan" \
    "Decisioni Strategiche" \
    "Strumenti per il management e la pianificazione" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  // Inserisci qui i tuoi calcolatori finanziari
};'

# 🔧 STRUMENTI QUOTIDIANI
create_category_page \
    "strumenti-quotidiani" \
    "Strumenti Quotidiani" \
    "Calcolatori pratici per uso quotidiano: conversioni rapide, calcoli matematici e utilità per professionisti" \
    "🔧" \
    "from-teal-400 to-green-500" \
    "strumenti-quotidiani" \
    "8" \
    "8k+" \
    "80k+" \
    "100%" \
    "Utilizzo Immediato" \
    "Interfaccia semplice e risultati istantanei" \
    "Multifunzione" \
    "Dalle percentuali alle aree, tutto in un posto" \
    "Sempre Disponibili" \
    "Accesso rapido per calcoli di tutti i giorni" \
'const calculatorMeta: Record<string, {
  difficulty?: "Facile" | "Medio" | "Avanzato";
  estimatedTime?: string;
  featured?: boolean;
  description?: string;
}> = {
  // Inserisci qui i tuoi strumenti quotidiani
};'

echo ""
echo -e "${GREEN}🎉 COMPLETATO! Tutte le categorie sono state aggiornate!${NC}"
echo ""
echo -e "${BLUE}📋 RIEPILOGO:${NC}"
echo -e "   ✅ computo-sicurezza-e-cantiere-10-calcolatori"
echo -e "   ✅ convertitori-tecnici-avanzati"
echo -e "   ✅ elettrotecnica-ed-elettricita"
echo -e "   ✅ ingegneria-strutturale"
echo -e "   ✅ ingegneria-idraulica"
echo -e "   ✅ ingegneria-geotecnica"
echo -e "   ✅ finanza-e-business"
echo -e "   ✅ strumenti-quotidiani"
echo ""
echo -e "${YELLOW}📝 PROSSIMI PASSI:${NC}"
echo -e "1. Verifica i file generati: ${BLUE}app/[categoria]/page.tsx${NC}"
echo -e "2. Personalizza calculatorMeta per ogni categoria con i tuoi calcolatori"
echo -e "3. Testa il sito: ${BLUE}npm run dev${NC}"
echo -e "4. I backup sono salvati come ${BLUE}.backup${NC} se vuoi confrontare"
echo ""
echo -e "${GREEN}🚀 Il tuo sito è ora completamente professionale!${NC}"
echo ""
echo -e "${YELLOW}💡 SUGGERIMENTO:${NC}"
echo -e "   - Alcune categorie hanno calculatorMeta vuoti (commenti)"  
echo -e "   - Aggiungi i tuoi calcolatori specifici per ogni categoria"
echo -e "   - Tutti i gradienti e colori sono già ottimizzati"