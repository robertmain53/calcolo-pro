// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Benvenuto su My Website',
  description: 'Esempio di homepage Next.js 15',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="p-6 shadow-md bg-white">
          <h1 className="text-2xl font-bold">My Website</h1>
        </header>

        <main className="p-8">{children}</main>

        <footer className="mt-12 p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Website
        </footer>
      </body>
    </html>
  );
}
