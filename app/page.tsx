import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import Breadcrumb from '@/components/layout/Breadcrumb';

async function getCalculators() {
    const calculatorsPath = path.join(process.cwd(), 'content', '/acustica-e-termotecnica');
    try {
        const entries = await fs.readdir(calculatorsPath, { withFileTypes: true });
        return entries
            .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
            .map(entry => {
                const slug = entry.name.replace('.md', '');
                const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return { name, slug };
            });
    } catch (error) { return []; }
}

export default async function HomePage() {
  const calculators = await getCalculators();
  const categoryName = "Calcolo.online";
  const crumbs = [{ name: "Home", path: "/" }];

  return (
    <div className="space-y-8 m-6">
      <Breadcrumb crumbs={crumbs} />
      
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        <p className=" text-xl opacity-90">La cassetta degli attrezzi digitale del professionista</p>
      

      {/* Calculators Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
        <div className="col-span-1">

          <h2 className="text-4xl font-bold mb-4"><a href="/acustica-e-termotecnica">Acustica e Termotecnica</a></h2>
            {calculators.map((calc) => (
                <Link 
                  key={calc.slug} 
                  href={`/acustica-e-termotecnica/${calc.slug}`} 
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {calc.name}  ►
                  </p>
                </Link>
            ))}

          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/computo-sicurezza-e-cantiere-10-calcolatori">Computo sicurezza e cantiere</a></h2>
            {calculators.map((calc) => (
                <Link 
                  key={calc.slug} 
                  href={`/computo-sicurezza-e-cantiere-10-calcolatori/${calc.slug}`} 
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {calc.name}  ►
                  </p>
                </Link>
            ))}

            <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/convertitori-tecnici-avanzati">Convertitori Tecnici Avanzati</a></h2>
            {calculators.map((calc) => (
                <Link 
                  key={calc.slug} 
                  href={`/convertitori-tecnici-avanzati/${calc.slug}`} 
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {calc.name} ►
                  </p>
                </Link>
            ))}

          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/elettrotecnica-ed-elettricita">Elettrotecnica ed Elettricità</a></h2>
            {calculators.map((calc) => (
                <Link 
                  key={calc.slug} 
                  href={`/elettrotecnica-ed-elettricita/${calc.slug}`} 
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {calc.name}  ►
                  </p>
                </Link>
            ))}

            <h2 className="text-4xl font-bold mb-4"><a href="/finanza-e-business"> Finanza e Business</a></h2>
            {calculators.map((calc) => (
                <Link 
                  key={calc.slug} 
                  href={`/finanza-e-business/${calc.slug}`} 
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                    {calc.name} ►
                  </p>
                
                </Link>
            ))}

        </div>
        
        <div className="col-span-1">

          <h2 className="text-4xl font-bold mb-4"><a href="/ingegneria-geotecnica">Ingegneria Geotecnica</a></h2>
          {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={`/ingegneria-geotecnica/${calc.slug}`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name} ►
              </p>
            </Link>
          ))}
         


        

          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/ingegneria-idraulica">Ingegneria Idraulica</a></h2>
          {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={`/ingegneria-idraulica/${calc.slug}`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name} ►
              </p>
            </Link>
          ))}
        


 
          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/ingegneria-strutturale">Ingegneria Strutturale</a></h2>
          {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={`/ingegneria-strutturale/${calc.slug}`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name} ►
              </p>
            </Link>
          ))}
         


 
          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/strumenti-quotidiani">Strumenti quotidiani</a></h2>
          {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={`/strumenti-quotidiani/${calc.slug}`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name} ►
              </p>
            </Link>
          ))}

          <h2 className="text-4xl font-bold mb-4 mt-20"><a href="/topografia-e-matematica-di-base">Topografia e Matematica di Base</a></h2>
          {calculators.map((calc) => (
            <Link 
              key={calc.slug} 
              href={`/topografia-e-matematica-di-base/${calc.slug}`} 
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="font-bold text-xl text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {calc.name} ►
              </p>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}
