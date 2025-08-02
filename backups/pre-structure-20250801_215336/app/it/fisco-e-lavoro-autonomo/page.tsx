import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CalculatorWrapper from '@/components/calculator/CalculatorWrapper';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';

type Props = { params: { slug: string } };

async function getCalculatorComponent(slug: string) {
  try {
    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Calculator';
    return (await import(`@/components/calculators/${componentName}`)).default;
  } catch (error) { 
    return null; 
  }
}

async function getContent(slug: string) {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'it', 'fisco-e-lavoro-autonomo', `${slug}.md`);
    return await fs.readFile(contentPath, 'utf8');
  } catch (error) { 
    return null; 
  }
}

export default async function CalculatorPage({ params }: Props) {
  const CalculatorComponent = await getCalculatorComponent(params.slug);
  const content = await getContent(params.slug);

  if (!CalculatorComponent) notFound();
  
  const calculatorName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const crumbs = [
      { name: "Home", path: "/it" },
      { name: "Fisco e Lavoro Autonomo", path: "/it/fisco-e-lavoro-autonomo" },
      { name: calculatorName }
  ];

  return (
    <div className="space-y-8">
        <Breadcrumb crumbs={crumbs} />
        
        <CalculatorWrapper calculatorName={calculatorName}>
          <CalculatorComponent />
        </CalculatorWrapper>
        
        {content && (
            <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        )}
        
        <RelatedCalculators
          currentCategory="fisco-e-lavoro-autonomo"
          currentSlug={params.slug}
          lang="it"
        />
    </div>
  );
}

