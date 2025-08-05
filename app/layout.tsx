// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Calcolo.online',
  description: 'Homepage - Calcolo.online',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="min-h-screen   text-gray-900 antialiased">
        <header className="p-6 bg-gray-900">
          <h1 className="text-2xl text-white font-bold ">Calcolo.online</h1>
        </header>

        <main className="p-1 mt-3">{children}</main>

        <footer className="mt-12 p-4 text-center text-sm text-gray-800"> 
        <p>  In qualità di affiliati Amazon, riceviamo un guadagno dagli acquisti idonei effettuati tramite i link presenti sul nostro sito.</p>
          <a href="/chi-siamo">Chi siamo</a> - <a href="/chi-siamo">Privacy-Policy</a> - <a href="/cookie">Cookie Policy</a> - <a href="/contattaci">Contattaci/Feedback</a> - 
          © {new Date().getFullYear()} Calcolo.online
        </footer>
      </body>
    </html>
  );
}
