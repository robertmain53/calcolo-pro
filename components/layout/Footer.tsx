'use client';
import Link from 'next/link';

interface FooterProps {
  /** Codice lingua, ad esempio "it", "en", ecc. */
  lang: string;
}

/** Singola categoria mostrata nel footer. */
interface Category {
  name: string;
  slug: string;
  icon: string;
}

/** Lingue supportate dal language‑switcher. */
const LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const;

/**
 * Mappa delle categorie per lingua.
 * Con `Record<string, Category[]>` aggiungiamo la firma d’indicizzazione
 * che mancava, eliminando l’errore «Element implicitly has an 'any' type…».
 */
const CATEGORIES: Record<string, Category[]> = {
  it: [
    { name: 'Fisco e Lavoro Autonomo', slug: 'fisco-e-lavoro-autonomo', icon: '💼' },
    { name: 'Immobiliare e Casa', slug: 'immobiliare-e-casa', icon: '🏠' },
    { name: 'Finanza Personale', slug: 'finanza-personale', icon: '💰' },
    { name: 'Veicoli e Trasporti', slug: 'veicoli-e-trasporti', icon: '🚗' },
    { name: 'Salute e Benessere', slug: 'salute-e-benessere', icon: '🏥' },
    { name: 'PMI e Impresa', slug: 'pmi-e-impresa', icon: '🏢' },
    { name: 'Risparmio e Investimenti', slug: 'risparmio-e-investimenti', icon: '📈' },
    { name: 'Matematica e Geometria', slug: 'matematica-e-geometria', icon: '📊' },
    { name: 'Conversioni', slug: 'conversioni', icon: '🔄' },
    { name: 'Famiglia e Vita Quotidiana', slug: 'famiglia-e-vita-quotidiana', icon: '👨‍👩‍👧‍👦' },
    { name: 'Agricoltura e Cibo', slug: 'agricoltura-e-cibo', icon: '🌾' },
    { name: 'Vita Quotidiana', slug: 'vita-quotidiana', icon: '📱' },
  ],
  // Altre lingue possono essere aggiunte qui.
};

export default function Footer({ lang }: FooterProps) {
  // Se la lingua non è presente, ripieghiamo sull’italiano.
  const categories: Category[] = CATEGORIES[lang] ?? CATEGORIES.it;

  const currentYear = new Date().getFullYear();

  const categoriesPerColumn = Math.ceil(categories.length / 3);
  const categoryColumns: Category[][] = [
    categories.slice(0, categoriesPerColumn),
    categories.slice(categoriesPerColumn, categoriesPerColumn * 2),
    categories.slice(categoriesPerColumn * 2),
  ];

  return (
    <footer className="bg-slate-800 text-slate-300 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="text-2xl font-bold text-white mb-4 block">
              SoCalSolver
            </Link>
            <p className="text-lg opacity-90 mb-6">
              Calcolatori professionali per ogni esigenza. Oltre 1.500 strumenti gratuiti sempre aggiornati.
            </p>

            {/* Language Switcher */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Cambia Lingua</h4>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((language) => (
                  <Link
                    key={language.code}
                    href={`/${language.code}`}
                    className={`inline-flex items-center px-3 py-2 rounded-lg transition-colors ${
                      lang === language.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <span className="mr-2">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Columns */}
          {categoryColumns.map((columnCategories, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              <h4 className="text-white font-semibold text-lg">
                {columnIndex === 0 && 'Categorie Principali'}
                {columnIndex === 1 && 'Settori Specializzati'}
                {columnIndex === 2 && 'Strumenti Utili'}
              </h4>
              <ul className="space-y-2">
                {columnCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/${lang}/${category.slug}`}
                      className="flex items-center text-slate-300 hover:text-white transition-colors group"
                    >
                      <span className="mr-2 group-hover:scale-110 transition-transform">
                        {category.icon}
                      </span>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm">
                © {currentYear} SoCalSolver. Tutti i diritti riservati.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Calcolatori professionali gratuiti per oltre 20 categorie specializzate.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-white">1.500+</div>
                <div className="text-xs text-slate-400">Calcolatori</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">20+</div>
                <div className="text-xs text-slate-400">Categorie</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
