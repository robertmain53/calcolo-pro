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
  en: [
    { name: 'Business & Marketing', slug: 'business-and-marketing', icon: '💼' },
    { name: 'Digital Health & Wellbeing', slug: 'digital-health-and-wellbeing', icon: '🏥' },
    { name: 'Education & Career', slug: 'education-and-career', icon: '🎓' },
    { name: 'Finance & Investment', slug: 'finance-and-investment', icon: '💰' },
    { name: 'Gaming & eSports', slug: 'gaming-and-esports', icon: '🎮' },
    { name: 'Health & Sustainability', slug: 'health-and-sustainability', icon: '🌱' },
    { name: 'Health & Wellness', slug: 'health-and-wellness', icon: '🏥' },
    { name: 'Lifestyle & Entertainment', slug: 'lifestyle-and-entertainment', icon: '🎭' },
    { name: 'Lifestyle & Niche', slug: 'lifestyle-and-niche', icon: '✨' },
    { name: 'Professional & Specialized', slug: 'professional-and-specialized', icon: '🔧' },
    { name: 'Real Estate & Housing', slug: 'real-estate-and-housing', icon: '🏠' },
    { name: 'SME & Business', slug: 'sme-and-business', icon: '🏢' },
    { name: 'Savings & Investment', slug: 'savings-and-investment', icon: '📈' },
    { name: 'Smart Home & Technology', slug: 'smart-home-and-technology', icon: '🏠' },
    { name: 'Sustainability & Environment', slug: 'sustainability-and-environment', icon: '🌍' },
    { name: 'Tax & Freelance (UK/US/CA)', slug: 'tax-and-freelance-uk-us-ca', icon: '💼' },
  ],
  es: [
    { name: 'Automóviles y transporte', slug: 'automoviles-y-transporte', icon: '🚗' },
    { name: 'Bienes Raíces y Vivienda', slug: 'bienes-raices-y-vivienda', icon: '🏠' },
    { name: 'Educación y Universidad', slug: 'educacion-y-universidad', icon: '🎓' },
    { name: 'Impuestos y trabajo autónomo', slug: 'impuestos-y-trabajo-autonomo', icon: '💼' },
    { name: 'Impuestos y trabajo autónomo (avanzado)', slug: 'impuestos-y-trabajo-autonomo-avanzado', icon: '💼' },
    { name: 'Legal y Administrativo', slug: 'legal-y-administrativo', icon: '⚖️' },
    { name: 'Miscelánea y vida cotidiana', slug: 'miscelanea-y-vida-cotidiana', icon: '📱' },
    { name: 'PYMES y Empresas', slug: 'pymes-y-empresas', icon: '🏢' },
    { name: 'Salud y bienestar', slug: 'salud-y-bienestar', icon: '🏥' },
  ],
  fr: [
    { name: 'Agriculture et alimentation', slug: 'agriculture-et-alimentation', icon: '🌾' },
    { name: 'Famille et vie quotidienne', slug: 'famille-et-vie-quotidienne', icon: '👨‍👩‍👧‍👦' },
    { name: 'Fiscalité et emploi indépendants', slug: 'fiscalite-et-emploi-independants', icon: '💼' },
    { name: 'Fiscalité et travail indépendant', slug: 'fiscalite-et-travail-independant', icon: '💼' },
    { name: 'Immobilier et maison', slug: 'immobilier-et-maison', icon: '🏠' },
    { name: 'Loisirs et temps libre', slug: 'loisirs-et-temps-libre', icon: '🎭' },
    { name: 'PME et entreprises', slug: 'pme-et-entreprises', icon: '🏢' },
    { name: 'Voitures et transports', slug: 'voitures-et-transports', icon: '🚗' },
    { name: 'Épargne et investissements', slug: 'epargne-et-investissements', icon: '📈' },
  ],
};

/**
 * Traduzioni per i testi del footer
 */
const TRANSLATIONS: Record<string, Record<string, string>> = {
  it: {
    title: 'Calcolatori professionali per ogni esigenza. Oltre 1.500 strumenti gratuiti sempre aggiornati.',
    changeLanguage: 'Cambia Lingua',
    mainCategories: 'Categorie Principali',
    specializedSectors: 'Settori Specializzati',
    usefulTools: 'Strumenti Utili',
    copyright: 'Tutti i diritti riservati.',
    description: 'Calcolatori professionali gratuiti per oltre 20 categorie specializzate.',
    calculators: 'Calcolatori',
    categories: 'Categorie',
    free: 'Gratuito'
  },
  en: {
    title: 'Professional calculators for every need. Over 1,500 free tools always updated.',
    changeLanguage: 'Change Language',
    mainCategories: 'Main Categories',
    specializedSectors: 'Specialized Sectors',
    usefulTools: 'Useful Tools',
    copyright: 'All rights reserved.',
    description: 'Professional free calculators for over 20 specialized categories.',
    calculators: 'Calculators',
    categories: 'Categories',
    free: 'Free'
  },
  es: {
    title: 'Calculadoras profesionales para cada necesidad. Más de 1.500 herramientas gratuitas siempre actualizadas.',
    changeLanguage: 'Cambiar Idioma',
    mainCategories: 'Categorías Principales',
    specializedSectors: 'Sectores Especializados',
    usefulTools: 'Herramientas Útiles',
    copyright: 'Todos los derechos reservados.',
    description: 'Calculadoras profesionales gratuitas para más de 20 categorías especializadas.',
    calculators: 'Calculadoras',
    categories: 'Categorías',
    free: 'Gratis'
  },
  fr: {
    title: 'Calculatrices professionnelles pour chaque besoin. Plus de 1.500 outils gratuits toujours mis à jour.',
    changeLanguage: 'Changer de Langue',
    mainCategories: 'Catégories Principales',
    specializedSectors: 'Secteurs Spécialisés',
    usefulTools: 'Outils Utiles',
    copyright: 'Tous droits réservés.',
    description: 'Calculatrices professionnelles gratuites pour plus de 20 catégories spécialisées.',
    calculators: 'Calculatrices',
    categories: 'Catégories',
    free: 'Gratuit'
  }
};

export default function Footer({ lang }: FooterProps) {
  // Se la lingua non è presente, ripieghiamo sull'italiano.
  const categories: Category[] = CATEGORIES[lang] ?? CATEGORIES.it;
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.it;

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
              {t.title}
            </p>

            {/* Language Switcher */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">{t.changeLanguage}</h4>
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
                {columnIndex === 0 && t.mainCategories}
                {columnIndex === 1 && t.specializedSectors}
                {columnIndex === 2 && t.usefulTools}
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
                © {currentYear} SoCalSolver. {t.copyright}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {t.description}
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-white">1.500+</div>
                <div className="text-xs text-slate-400">{t.calculators}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">20+</div>
                <div className="text-xs text-slate-400">{t.categories}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">{t.free}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
