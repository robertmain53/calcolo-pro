import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "SoCalSolver - Professional Online Calculators",
    template: "%s | SoCalSolver",
  },
  description: "Professional online calculators for business, finance, health and much more.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Header lang="en" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer lang="en" />
    </div>
  );
}
