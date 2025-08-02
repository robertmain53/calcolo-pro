import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "SoCalSolver - Calculatrices Professionnelles en Ligne",
    template: "%s | SoCalSolver",
  },
  description: "Calculatrices professionnelles en ligne pour business, finance, santé et bien plus.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Header lang="fr" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer lang="fr" />
    </div>
  );
}
