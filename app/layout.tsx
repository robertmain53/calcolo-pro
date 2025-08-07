// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Se vuoi metadata extra, puoi usare il nuovo sistema in /app/metadata.ts

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Next.js usa Html, Head, Body - MA SOLO in _document, in layout ometti questi tag! */}
      {/* TUTTO quello che metti qui va dentro <body> */}
      {/* Per meta/script globali, crea app/head.tsx */}
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
    </>
  );
}
