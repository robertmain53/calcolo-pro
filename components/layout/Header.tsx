'use client';
import Link from "next/link";

export default function Header({ lang }: { lang: string }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-2xl font-bold text-blue-600">
          SoCalSolver
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href={`/${lang}`} className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href={`/${lang}/fisco-e-lavoro-autonomo`} className="text-gray-700 hover:text-blue-600 transition-colors">
            Fisco
          </Link>
          <Link href={`/${lang}/immobiliare-e-casa`} className="text-gray-700 hover:text-blue-600 transition-colors">
            Immobiliare
          </Link>
        </div>
      </nav>
    </header>
  );
}
