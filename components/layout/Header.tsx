'use client';
import Link from "next/link";


export default function Header( ) {
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
         
          <Link href={`/`} className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
           Calcolo.online
          </Link>

    

   
          <div className="md:hidden">
            <button className="p-2 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
