import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { ChevronRightIcon, CalculatorIcon, ChartBarIcon, AcademicCapIcon, ShareIcon } from '@heroicons/react/24/outline';

async function getCategories() {
    const categoriesPath = path.join(process.cwd(), 'app', 'it');
    try {
        const entries = await fs.readdir(categoriesPath, { withFileTypes: true });
        return entries
            .filter(entry => entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('(') && entry.name !== 'api')
            .map(entry => {
                const name = entry.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return { name, slug: entry.name };
            });
    } catch (error) {
        return [];
    }
}

async function getFeaturedCalculators() {
    // Logica per ottenere i calcolatori più popolari
    return [
        { name: "Calcolatore Mutuo", slug: "calcolo-mutuo", category: "immobiliare", description: "Calcola rate, interessi e piano di ammortamento" },
        { name: "Tasse Regime Forfettario", slug: "tasse-forfettario", category: "fisco-e-lavoro-autonomo", description: "Simula tassazione per partite IVA" },
        { name: "Rendimento Investimenti", slug: "rendimento-investimenti", category: "risparmio-e-investimenti", description: "Analizza ROI e crescita del capitale" },
        { name: "Costo Auto Totale", slug: "costo-auto-totale", category: "veicoli-e-trasporti", description: "TCO completo per la tua auto" },
    ];
}

const categoryIcons = {
    'fisco-e-lavoro-autonomo': '💼',
    'veicoli-e-trasporti': '🚗',
    'immobiliare': '🏠',
    'finanza-personale': '💰',
    'salute-e-benessere': '🏥',
    'matematica-e-geometria': '📊',
    'conversioni': '🔄',
    'vita-quotidiana': '📱',
    'risparmio-e-investimenti': '📈',
    'famiglia-e-vita-quotidiana': '👨‍👩‍👧‍👦',
    'agricoltura-e-cibo': '🌾',
    'auto-e-trasporti': '🚗',
    'pmi-e-impresa': '🏢',
    'immobiliare-e-casa': '🏠'
};

export default async function HomePage() {
  const categories = await getCategories();
  const featuredCalculators = await getFeaturedCalculators();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section Potenziata */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-sm font-medium mb-8">
              <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Oltre 1.500 calcolatori professionali disponibili
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Calcoli Professionali
              <br />
              <span className="text-4xl md:text-6xl">Risultati Precisi</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed">
              La piattaforma di calcolatori più avanzata d&apos;Italia. Strumenti professionali per 
              <strong> finanza, fisco, immobiliare, trasporti</strong> e molto altro.
            </p>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CalculatorIcon className="w-8 h-8 text-yellow-300" />
                <span className="font-semibold">Calcoli Verificati</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <ChartBarIcon className="w-8 h-8 text-green-300" />
                <span className="font-semibold">Grafici Interattivi</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <AcademicCapIcon className="w-8 h-8 text-purple-300" />
                <span className="font-semibold">Guide Expert</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="#categories" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Esplora Calcolatori
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#featured" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                Più Popolari
                <ShareIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section id="featured" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Calcolatori Più Utilizzati
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              I nostri strumenti più popolari, scelti da migliaia di utenti ogni giorno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCalculators.map((calc, index) => (
              <Link 
                key={calc.slug} 
                href={`/it/${calc.category}/${calc.slug}`} 
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {calc.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800">
                    Calcola ora
                    <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section Potenziata */}
      <section id="categories" className="py-20 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Tutte le Categorie
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Oltre 20 categorie specializzate con centinaia di calcolatori professionali
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link 
                key={cat.slug} 
                href={`/it/${cat.slug}`} 
                className="group block bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {categoryIcons[cat.slug] || '📊'}
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Perché Scegliere SoCalSolver?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-yellow-300">100%</div>
                <div className="text-xl font-semibold">Gratuito</div>
                <p className="opacity-90">Tutti i calcolatori sempre gratuiti, senza registrazione</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-4xl font-bold text-green-300">1500+</div>
                <div className="text-xl font-semibold">Calcolatori</div>
                <p className="opacity-90">La collezione più vasta d&apos;Italia</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-4xl font-bold text-blue-300">24/7</div>
                <div className="text-xl font-semibold">Disponibili</div>
                <p className="opacity-90">Accesso immediato da qualsiasi dispositivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}