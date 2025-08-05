import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';

type Props = { params: { slug: string } };

async function getCalculatorComponent(slug: string) {
  try {
    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Calculator';
    return (await import(`@/components/calculators/${componentName}`)).default;
  } catch (error) { return null; }
}

async function getContent(slug: string) {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'computo-sicurezza-e-cantiere-10-calcolatori', `${slug}.md`);
    return await fs.readFile(contentPath, 'utf8');
  } catch (error) { return null; }
}

export default async function CalculatorPage({ params }: Props) {
  const CalculatorComponent = await getCalculatorComponent(params.slug);
  const content = await getContent(params.slug);

  if (!CalculatorComponent) notFound();
  
  const calculatorName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const crumbs = [
      { name: "Home", path: "/" },
      { name: "Computo, Sicurezza e Cantiere (10 Calcolatori)", path: "/computo-sicurezza-e-cantiere-10-calcolatori" },
      { name: calculatorName }
  ];

  return (
    <div className="space-y-8">
        <Breadcrumb crumbs={crumbs} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Calculator */}
            <div className="lg:col-span-2 p-2 bg-white rounded-2xl shadow-lg">
                <CalculatorComponent />
            </div>
            
              {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="p-2  ">

  <RelatedCalculators
            currentCategory="Computo Sicurezza e Cantiere (10 Calcolatori)"
          currentSlug="computo-sicurezza-e-cantiere-10-calcolatori"
          maxItems={7} // opzionale
        />
<div>

 <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6 flex items-center gap-2">
       Prodotti Correlati
      </h3>
      <ul className="space-y-2">
         
          <li>
             <a href="https://amzn.to/40RJ97U"
              className="text-blue-600 hover:underline"
            >
              Libri e manuali di sicurezza e attività on site
               
              
            </a>
          </li>
      </ul>
      <span className="text-gray-80 text-xs my-20">In qualità di Affiliato Amazon < br/> io ricevo un guadagno dagli acquisti idonei</span>


</div>

        
                  
                </div>
            </div>
        </div>
        {/* Content */}
        {content && (
            <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        )}
    </div>
  );
}
