import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ChevronRightIcon, ClockIcon, StarIcon, TrendingUpIcon, FireIcon } from '@heroicons/react/24/outline';

async function getCalculators(categorySlug: string) {
    const calculatorsPath = path.join(process.cwd(), 'content', 'it', categorySlug);
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

// Simulazione di dati aggiuntivi che potresti avere
async function getCalculatorMetadata(categorySlug: string) {
    // In una implementazione reale, questi dati potrebbero venire da un database o API
    const metadata = {
        'fisco-e-lavoro-autonomo': {
            icon: '💼',
            description: 'Strumenti professionali per gestire tasse, contributi e adempimenti fiscali per partite IVA, freelance e piccole imprese.',
            color: 'from-blue-600 to-indigo-700',
            stats: { calculators: 45, users: '12.5K', rating: 4.8 },
            featured: ['tasse-forfettario', 'contributi-inps', 'detrazioni-professionali'],
            tips: [
                'Mantieni sempre aggiornate le tue conoscenze fiscali',
                'Usa i calcolatori per confrontare diversi regimi',
                'Consulta sempre un commercialista per decisioni importanti'
            ]
        },
        'immobiliare': {
            icon: '🏠',
            description: 'Calcola mutui, rendimenti immobiliari, tasse sulla casa e valutazioni di investimenti nel settore immobiliare.',
            color: 'from-green-600 to-emerald-700',
            stats: { calculators: 32, users: '18.2K', rating: 4.9 },
            featured: ['calcolo-mutuo', 'rendimento-affitto', 'tasse-casa'],
            tips: [
                'Confronta sempre più opzioni di mutuo',
                'Considera tutti i costi nascosti',
                'Valuta l&apos;ubicazione nell&apos;investimento immobiliare'
            ]
        },
        // Aggiungi altri metadata per le altre categorie...
    };
    
    return metadata[categorySlug] || {
        icon: '📊',
        description: 'Calcolatori professionali per questa categoria specifica.',
        color: 'from-purple-600 to-pink-700',
        stats: { calculators: 25, users: '8.5K', rating: 4.7 },
        featured: [],
        tips: []
    };
}

interface CategoryPageProps {
    params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const categorySlug = params.category;
    const calculators = await getCalculators(categorySlug);
    const metadata = await getCalculatorMetadata(categorySlug);
    
    const categoryName = categorySlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const crumbs = [{ name: "Home", path: "/it" }, { name: categoryName }];
    
    // Raggruppa i calcolatori per tipologia (simulazione)
    const popularCalculators = calculators.slice(0, 6);
    const recentCalculators = calculators.slice(-4);
    const allCalculators = calculators;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <Breadcrumb crumbs={crumbs} />
            </div>

            {/* Hero Section della Categoria */}
            <section className={`relative overflow-hidden bg-gradient-to-r ${metadata.color} text-white mt-4`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-6">
                                <span className="text-6xl mr-4">{metadata.icon}</span>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                        {categoryName}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-sm opacity-90">
                                        <span className="flex items-center">
                                            <CalculatorIcon className="w-4 h-4 mr-1" />
                                            {metadata.stats.calculators} calcolatori
                                        </span>
                                        <span className="flex items-center">
                                            <StarIcon className="w-4 h-4 mr-1" />
                                            {metadata.stats.rating}/5
                                        </span>
                                        <span className="flex items-center">
                                            <TrendingUpIcon className="w-4 h-4 mr-1" />
                                            {metadata.stats.users} utenti
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-xl opacity-90 mb-8 leading-relaxed">
                                {metadata.description}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link 
                                    href="#popular" 
                                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
                                >
                                    <FireIcon className="w-5 h-5 mr-2" />
                                    Più Popolari
                                </Link>
                                <Link 
                                    href="#all" 
                                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                                >
                                    Vedi Tutti
                                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">{metadata.stats.calculators}</div>
                                <div className="text-sm opacity-90">Calcolatori Disponibili</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">{metadata.stats.users}</div>
                                <div className="text-sm opacity-90">Utenti Attivi</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">{metadata.stats.rating}</div>
                                <div className="text-sm opacity-90">Rating Medio</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">24/7</div>
                                <div className="text-sm opacity-90">Sempre Disponibili</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calcolatori Popolari */}
            {popularCalculators.length > 0 && (
                <section id="popular" className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                                    <FireIcon className="w-8 h-8 inline mr-3 text-orange-500" />
                                    Più Popolari
                                </h2>
                                <p className="text-xl text-slate-600">
                                    I calcolatori più utilizzati in questa categoria
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {popularCalculators.map((calc, index) => (
                                <Link 
                                    key={calc.slug} 
                                    href={`/it/${categorySlug}/${calc.slug}`}
                                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                                >
                                    {/* Badge Popular */}
                                    {index < 3 && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-red-500 text-white">
                                                <FireIcon className="w-3 h-3 mr-1" />
                                                #{index + 1}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                                            {metadata.icon}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {calc.name}
                                        </h3>
                                        
                                        <p className="text-slate-600 mb-6">
                                            Calcolo professionale per {calc.name.toLowerCase()}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800">
                                                Calcola ora
                                                <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Expert Tips Sidebar */}
            {metadata.tips.length > 0 && (
                <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
                                💡 Consigli degli Esperti
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {metadata.tips.map((tip, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                            {index + 1}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Tutti i Calcolatori */}
            <section id="all" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                            Tutti i Calcolatori
                        </h2>
                        <p className="text-xl text-slate-600">
                            Collezione completa di {allCalculators.length} strumenti professionali
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allCalculators.map((calc) => (
                            <Link 
                                key={calc.slug} 
                                href={`/it/${categorySlug}/${calc.slug}`}
                                className="group block bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                                        {metadata.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                                            {calc.name}
                                        </h3>
                                        <div className="flex items-center mt-2 text-sm text-slate-500">
                                            <ClockIcon className="w-4 h-4 mr-1" />
                                            <span>Calcolo rapido</span>
                                        </div>
                                    </div>
                                    <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}