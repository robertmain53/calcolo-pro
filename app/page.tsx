import Link from 'next/link';
import { 
  WrenchScrewdriverIcon, 
  BuildingOfficeIcon, 
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    title: "Acustica e Termotecnica",
    description: "Calcoli specializzati per isolamento acustico, trasmittanza termica e analisi energetica",
    href: "/acustica-e-termotecnica",
    icon: WrenchScrewdriverIcon,
    color: "from-blue-500 to-cyan-500",
    calculators: 12
  },
  {
    title: "Computo Sicurezza e Cantiere", 
    description: "Strumenti per computi metrici, sicurezza sul lavoro, gestione cantieri e verifiche strutturali secondo normative D.Lgs. 81/08 e NTC 2018",
    href: "/computo-sicurezza-e-cantiere-10-calcolatori",
    icon: BuildingOfficeIcon,
    color: "from-emerald-500 to-teal-500",
    calculators: 15
  },
  {
    title: "Topografia e Matematica di Bae",
    description: "Calcolatori professionali per topografia e matematica di base",
    href: "/topografia-e-matematica-di-base",
    icon: CogIcon,
    color: "from-orange-500 to-red-500",
    calculators: 10
  },
  {
    title: "Convertitori Tecnici",
    description: "Conversioni avanzate per unità di misura, materiali e specifiche tecniche",
    href: "/convertitori-tecnici-avanzati",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Elettrotecnica ed Elettricità",
    description: "Calcoli per impianti elettrici, dimensionamento conduttori, protezioni e verifiche secondo norma CEI 64-8 e IEC",
    href: "/elettrotecnica-ed-elettricita",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Finanza e Business",
    description: "Calcoli finanziari, analisi investimenti, valutazioni economiche e strumenti per decisioni aziendali",
    href: "/finanza-e-business",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Ingegneria Geotecnica",
    description: "Calcoli geotecnici, stabilità pendii, portanza fondazioni e verifiche secondo Eurocodice 7 e NTC 2018",
    href: "/ingegneria-geotecnica",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Ingegneria Idraulica",
    description: "Calcoli per sistemi idraulici, dimensionamento condotte, perdite di carico e reti di distribuzione idrica",
    href: "/ingegneria-idraulica",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Ingegneria Strutturale",
    description: "Calcoli strutturali, verifiche sismiche, dimensionamento elementi e analisi secondo Norme Tecniche per le Costruzioni NTC 2018",
    href: "/ingegneria-strutturale",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  },
  {
    title: "Strumenti Quotidiani",
    description: "Calcolatori pratici per uso quotidiano: conversioni rapide, calcoli matematici e utilità per professionisti",
    href: "/strumenti-quotidiani",
    icon: ArrowRightIcon,
    color: "from-purple-500 to-pink-500",
    calculators: 8
  }
];

const features = [
  {
    name: 'Calcoli Certificati',
    description: 'Algoritmi validati secondo normative tecniche europee e internazionali',
    icon: CheckCircleIcon,
  },
  {
    name: 'Interfaccia Professionale',
    description: 'Design ottimizzato per professionisti tecnici con risultati chiari e precisi',
    icon: UserGroupIcon,
  },
  {
    name: 'Risultati Immediati',
    description: 'Calcoli istantanei con possibilità di esportare report dettagliati',
    icon: ClockIcon,
  },
  {
    name: 'Sempre Aggiornato',
    description: 'Database costantemente aggiornato con le ultime normative del settore',
    icon: ChartBarIcon,
  },
];

export default function ProfessionalHomepage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              La cassetta degli attrezzi
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}digitale{' '}
              </span>
              del professionista
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Più di 50 calcolatori specializzati per ingegneri, architetti e tecnici. 
              Strumenti professionali certificati per calcoli strutturali, termotecnici, 
              acustici e di sicurezza.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#calcolatori"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Scopri i Calcolatori
              </Link>
              <Link 
                href="/azienda" 
                className="text-base font-semibold leading-7 text-gray-900 hover:text-blue-600 transition-colors"
              >
                Chi siamo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Professionalità</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tutto quello che serve al tuo lavoro
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Strumenti progettati specificamente per professionisti tecnici, 
            con la precisione e l'affidabilità richieste dal tuo settore.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-2 ring-1 ring-blue-600/10">
                  <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Categories Section */}
      <div id="calcolatori" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="1" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Categorie di Calcolatori
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Scegli la categoria più adatta alle tue esigenze professionali
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="mt-6 text-xl font-semibold leading-8 text-gray-900 group-hover:text-gray-600">
                  {category.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {category.calculators} calcolatori disponibili
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Inizia a utilizzare i nostri calcolatori
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Migliaia di professionisti si affidano già ai nostri strumenti. 
              Unisciti a loro e scopri l'efficienza dei calcoli automatizzati.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/#1"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all duration-300"
              >
                Inizia ora
              </Link>
              <Link href="mailto:info@yeahup.net" className="text-base font-semibold leading-7 text-white hover:text-blue-100 transition-colors">
                Contattaci <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}