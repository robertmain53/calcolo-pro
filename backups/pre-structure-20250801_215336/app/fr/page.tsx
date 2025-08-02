import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

async function getCategories() {
    const categories = "agriculture-et-alimentation conversions famille-et-vie-quotidienne finances-personnelles fiscalite-et-freelance immobilier-et-maison mathematiques-et-geometrie pme-et-entreprise epargne-et-investissements sante-et-bien-etre vehicules-et-transport vie-quotidienne".split(' ');
    const names = "Agriculture et Alimentation|Conversions|Famille et Vie Quotidienne|Finances Personnelles|Fiscalité et Freelance|Immobilier et Maison|Mathématiques et Géométrie|PME et Entreprise|Épargne et Investissements|Santé et Bien-être|Véhicules et Transport|Vie Quotidienne".split('|');
    
    return categories.map((slug, index) => ({
        name: names[index] || slug,
        slug
    }));
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          SoCalSolver Professional
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
          Professional calculators for taxes, finance, real estate and much more
        </p>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
                 <Link 
                   key={cat.slug} 
                   href={`/fr/${cat.slug}`} 
                   className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                 >
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
