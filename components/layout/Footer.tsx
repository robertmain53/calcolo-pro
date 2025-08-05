'use client';;
import MathBlock from '@/components/ui/MathBlock';

import Link from "next/link";


export default function Footer() {
 

  return (
    <footer className="bg-slate-800 text-slate-300 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <Link href={`/`} className="text-2xl font-bold text-white mb-4 block">
              Calcolo.online
            </Link>
            <p className="text-lg opacity-90 mb-6">
             Calcolo.online
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
