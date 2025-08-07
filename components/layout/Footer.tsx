'use client';
import Link from "next/link";
import { CalculatorIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

const navigation = {
  calcolatori: [
    { name: 'Acustica e Termotecnica', href: '/acustica-e-termotecnica' },
    { name: 'Ingegneria Strutturale', href: '/ingegneria-strutturale' },
    { name: 'Sicurezza e Cantiere', href: '/computo-sicurezza-e-cantiere-10-calcolatori' },
    { name: 'Convertitori Tecnici', href: '/convertitori-tecnici-avanzati' },
    { name: 'Elettrotecnica ed Elettricità', href: '/elettrotecnica-ed-elettricita' },

  ],
  strumenti: [
    { name: 'Ingegneria Idraulica', href: '/ingegneria-idraulica' },
    { name: 'Ingegneria Geotecnica', href: '/ingegneria-geotecnica' },
    { name: 'Finanza e Business', href: '/finanza-e-business' },
    { name: 'Strumenti Quotidiani', href: '/strumenti-quotidiani' },
    { name: 'Topografia e Matematica di Base', href: '/topografia-e-matematica-di-base' },

  ],
  azienda: [
    { name: 'Azienda', href: '/azienda' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie' },
    { name: 'Contattaci', href: '/contattaci' },
  ],
  legale: [
    { name: 'Termini di Servizio', href: '/termini' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Feedback', href: '/contattaci' },
  ]
};

const stats = [
  { name: 'Calcolatori Attivi', value: '50+' },
  { name: 'Professionisti', value: '10k+' },
  { name: 'Calcoli Eseguiti', value: '100k+' },
  { name: 'Precisione', value: '99.9%' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col items-center">
                <dt className="text-sm leading-6 text-gray-400">{stat.name}</dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <CalculatorIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Calcolo.online</span>
                <p className="text-sm text-gray-400">Calcolatori Professionali</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-400 max-w-sm">
              La piattaforma di riferimento per professionisti tecnici. 
              Oltre 50 calcolatori specializzati per ingegneri, architetti e tecnici del settore edile.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPinIcon className="h-5 w-5" />
                <span>Udine, Friuli Venezia Giulia, Italia</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <EnvelopeIcon className="h-5 w-5" />
                <Link href="mailto:info@yeahup.net" className="hover:text-white transition-colors">
                  Contattaci
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Calcolatori Principali</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.calcolatori.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Altri Strumenti</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.strumenti.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Azienda</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.azienda.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Supporto</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legale.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-800 pt-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Calcolo.online. Tutti i diritti riservati.
            </p>
            <p className="text-s leading-5 text-gray-500 mt-2">
              In qualità di Affiliato Amazon, riceviamo un guadagno dagli acquisti idonei effettuati tramite i link presenti sul nostro sito.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <p className="text-xs leading-5 text-gray-400">
              Progettato e sviluppato con ❤️ in Italia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}