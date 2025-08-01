'use client';

export default function Footer({ lang }: { lang: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-slate-300 py-12 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">SoCalSolver</h3>
          <p className="text-lg opacity-90">Calcolatori professionali per ogni esigenza</p>
        </div>
        <div className="border-t border-slate-700 pt-6">
          <p>© {currentYear} SoCalSolver. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
