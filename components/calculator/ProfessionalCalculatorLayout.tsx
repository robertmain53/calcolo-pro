'use client';
import Script from 'next/script';

import { motion } from 'framer-motion';
import { 
  BookmarkIcon, 
  DocumentArrowDownIcon, 
  ShareIcon,
  PrinterIcon,
  ChartBarIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ProfessionalCalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  category?: string;
  difficulty?: 'Facile' | 'Medio' | 'Avanzato';
  estimatedTime?: string;
  relatedTools?: Array<{
    name: string;
    href: string;
  }>;
  disclaimer?: string;
  breadcrumbs?: Array<{
    name: string;
    path?: string;
  }>;
}

const difficultyConfig = {
  'Facile': { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: '🟢',
    description: 'Semplice da usare, adatto a tutti'
  },
  'Medio': { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    icon: '🟡',
    description: 'Richiede conoscenze di base'
  },
  'Avanzato': { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    icon: '🔴',
    description: 'Per professionisti esperti'
  }
};

export default function ProfessionalCalculatorLayout({
  title,
  description,
  children,
  category = "Generale",
  difficulty = "Medio",
  estimatedTime = "2-5 min",
  relatedTools = [],
  disclaimer,
  breadcrumbs = []
}: ProfessionalCalculatorLayoutProps) {
  const difficultyStyle = difficultyConfig[difficulty];

  const handleSaveResult = () => {
    // Implementare logica di salvataggio
    console.log('Salva risultato');
  };

  const handleExportPDF = () => {
    // Implementare logica export PDF
    console.log('Esporta PDF');
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Qui potresti aggiungere un toast notification
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
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
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 ring-1 ring-blue-200">
                  {category}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${difficultyStyle.color}`}>
                  {difficultyStyle.icon} {difficulty}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {estimatedTime}
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
          
        

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-8"
            >
              {children}
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">


             
      

            {/* Tools Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6"
            >

                       {/* --- AdSense block --- sidebar*/}
                <Script
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9476637732224939"
                  strategy="afterInteractive"
                  crossOrigin="anonymous"
                />
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-9476637732224939"
                  data-ad-slot="6880767372"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
                <Script id="ads-init" strategy="afterInteractive">
                  {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                </Script>



              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
                Strumenti
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleSaveResult}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                >
                  <BookmarkIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-green-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                    Salva Risultato
                  </span>
                </button>
                
                <button 
                  onClick={handleExportPDF}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                    Esporta PDF
                  </span>
                </button>
                
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <ShareIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    Condividi
                  </span>
                </button>
                
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <PrinterIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                    Stampa
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6"
            >
              <h4 className="flex items-center text-base font-semibold text-blue-900 mb-4">
                <InformationCircleIcon className="h-5 w-5 mr-2" />
                Informazioni Calcolatore
              </h4>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Categoria:</span>
                  <span className="font-medium">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficoltà:</span>
                  <span className="font-medium">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo stimato:</span>
                  <span className="font-medium">{estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precisione:</span>
                  <span className="font-medium flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-1" />
                    Alta
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  {difficultyStyle.description}
                </p>
              </div>
            </motion.div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6"
              >
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  Strumenti Correlati
                </h4>
                <div className="space-y-2">
                  {relatedTools.map((tool, index) => (
                    <Link
                      key={index}
                      href={tool.href}
                      className="block px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-800"
                    >
                      {tool.name} →
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            {disclaimer && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl bg-yellow-50 border border-yellow-200 p-6"
              >
                <h4 className="flex items-center text-base font-semibold text-yellow-900 mb-3">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  Importante
                </h4>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  {disclaimer}
                </p>
              </motion.div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}