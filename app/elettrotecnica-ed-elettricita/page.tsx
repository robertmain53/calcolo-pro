// app/elettrotecnica-ed-elettricita/page.tsx - Generato automaticamente
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
  slug: 'elettrotecnica-ed-elettricita',
  name: 'Elettrotecnica ed Elettricità',
  description: 'Calcoli per impianti elettrici, dimensionamento conduttori, protezioni e verifiche secondo norma CEI 64-8 e IEC',
  icon: '⚡',
  gradient: 'from-yellow-400 to-orange-500',
  contentPath: 'elettrotecnica-ed-elettricita',
  stats: {
    calculators: '15',
    professionals: '4k+',
    calculations: '35k+',
    precision: '99.9%'
  },
  features: [
    {
      name: 'Conformità CEI',
      description: 'Calcoli secondo CEI 64-8, CEI 11-17, IEC 60364',
      icon: CheckCircleIcon
    },
    {
      name: 'Sicurezza Elettrica',
      description: 'Verifiche di protezione e dimensionamento sicuro',
      icon: DocumentTextIcon
    },
    {
      name: 'Impianti Completi',
      description: 'Dalla progettazione alla verifica finale',
      icon: UserGroupIcon
    }
  ]
};

const calculatorMeta: Record<string, {
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
};

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
          href: `/${CATEGORY_CONFIG.slug}/${slug}`,
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
      <div className={`bg-gradient-to-r ${CATEGORY_CONFIG.gradient} text-white`}>
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
                  {key.replace(/([A-Z])/g, ' $1')}
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
                  <div className={`rounded-lg bg-gradient-to-br ${CATEGORY_CONFIG.gradient} p-2 ring-1 ring-white/20`}>
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
                  <div className={`h-2 bg-gradient-to-r ${CATEGORY_CONFIG.gradient} rounded-t-2xl`} />
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
                      {calc.description || `Calcolo professionale per ${calc.name.toLowerCase()}`}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        {calc.difficulty && (
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${difficultyConfig[calc.difficulty].color}`}>
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
      <div className={`${featuredCalculators.length > 0 ? 'bg-gray-50' : ''} py-24`}>
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
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${difficultyConfig[calc.difficulty].color}`}>
                      {difficultyConfig[calc.difficulty].icon} {calc.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {calc.description || `Calcolo professionale per ${calc.name.toLowerCase()}`}
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
      <div className={`bg-gradient-to-r ${CATEGORY_CONFIG.gradient}`}>
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
