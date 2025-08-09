// app/acustica-e-termotecnica/[slug]/page.tsx - USANDO CONFIGURAZIONI CENTRALIZZATE
import Script from 'next/script';

import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ProfessionalCalculatorLayout from '@/components/calculator/ProfessionalCalculatorLayout';
import { getCategoryConfig, getCalculatorConfig } from '@/lib/calculator-configs';

type Props = { params: { slug: string } };

const CATEGORY_SLUG = 'ingegneria-idraulica';

async function getCalculatorComponent(slug: string) {
  try {
    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Calculator';
    return (await import(`@/components/calculators/${componentName}`)).default;
  } catch (error) { return null; }
}

async function getContent(slug: string) {
  const categoryConfig = getCategoryConfig(CATEGORY_SLUG);
  if (!categoryConfig) return null;
  
  try {
    const contentPath = path.join(process.cwd(), 'content', categoryConfig.contentPath, `${slug}.md`);
    return await fs.readFile(contentPath, 'utf8');
  } catch (error) { return null; }
}

export default async function CalculatorPage({ params }: Props) {
  const CalculatorComponent = await getCalculatorComponent(params.slug);
  const content = await getContent(params.slug);

  if (!CalculatorComponent) notFound();
  
  // 👇 USA LE CONFIGURAZIONI CENTRALIZZATE
  const categoryConfig = getCategoryConfig(CATEGORY_SLUG);
  const calculatorConfig = getCalculatorConfig(CATEGORY_SLUG, params.slug);
  
  if (!categoryConfig) notFound();
  
  const calculatorName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: categoryConfig.name, path: `/${categoryConfig.path}` },
    { name: calculatorName }
  ];

  return (
    <ProfessionalCalculatorLayout
      title={calculatorName}
      description={calculatorConfig?.description || `Calcolo professionale per ${calculatorName.toLowerCase()} secondo normative tecniche vigenti`}
      category={categoryConfig.name}
      difficulty={calculatorConfig?.difficulty || 'Medio'}
      estimatedTime={calculatorConfig?.estimatedTime || '2-5 min'}
      relatedTools={calculatorConfig?.relatedTools || []}
      disclaimer={calculatorConfig?.disclaimer}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        <CalculatorComponent />
        
        {content && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <article className="prose lg:prose-lg max-w-none">


             {/* --- AdSense block --- sidebar*/}22222
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

              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </ProfessionalCalculatorLayout>
  );
}