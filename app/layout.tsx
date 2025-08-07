// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Calcolo.online - Calcolatori Professionali per Ingegneri e Architetti',
  description: 'Oltre 50 calcolatori specializzati per professionisti tecnici. Strumenti certificati per calcoli strutturali, termotecnici, acustici e di sicurezza.',
  keywords: 'calcolatori, ingegneria, architettura, strutturale, termotecnica, acustica, sicurezza, cantiere',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* Header Professionale */}
        <Header />

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer Professionale */}
        <Footer />
      </body>
    </html>
  );
}