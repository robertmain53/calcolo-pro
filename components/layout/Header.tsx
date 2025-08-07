'use client';
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, CalculatorIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: 'Acustica e Termotecnica', href: '/acustica-e-termotecnica' },
  { name: 'Ingegneria Strutturale', href: '/ingegneria-strutturale' },
  { name: 'Elettrotecnica ed Elettricità', href: '/elettrotecnica-ed-elettricita' },
  { name: 'Convertitori', href: '/convertitori-tecnici-avanzati' },
  { name: 'Computo Sicurezza e Cantiere', href: '/computo-sicurezza-e-cantiere-10-calcolatori' },
  { name: 'Finanza e Business', href: '/finanza-e-business' },
  { name: 'Ingegneria Geotecnica', href: '/ingegneria-geotecnica' },
  { name: 'Ingegneria Idraulica', href: '/ingegneria-idraulica' },
  { name: 'Strumenti Quotidiani', href: '/strumenti-quotidiani' },
  { name: 'Topografia e Matematica di Base', href: '/topografia-e-matematica-di-base' },

];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CalculatorIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Calcolo.online
                </span>
                <p className="text-xs text-gray-500 font-medium">Calcolatori Professionali</p>
              </div>
            </Link>
          </div>

        

          {/* Mobile menu button */}
          <div className="flex  ">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div  >
            <div className="fixed inset-0 z-50 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                    <CalculatorIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">Calcolo.online</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}