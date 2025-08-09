// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Calcolo.online - Calcolatori Professionali per Ingegneri e Architetti',
  description:
    'Oltre 50 calcolatori specializzati per professionisti tecnici. Strumenti certificati per calcoli strutturali, termotecnici, acustici e di sicurezza.',
  keywords:
    'calcolatori, ingegneria, architettura, strutturale, termotecnica, acustica, sicurezza, cantiere',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* --- Analytics & Ads (loaded after hydration) --- */}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CVRZ4R47WY"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CVRZ4R47WY');
          `}
        </Script>

        {/* CMP */}
        <Script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false" strategy="afterInteractive" />
        <Script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false" strategy="afterInteractive" />

        {/* Ezoic */}
        <Script src="https://www.ezojs.com/ezoic/sa.min.js" async strategy="afterInteractive" />
        <Script id="ezoic-init" strategy="afterInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>

        {/* Google Publisher Tag (GPT) for ad slots */}
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          strategy="afterInteractive"
        />
        <Script id="gpt-init" strategy="afterInteractive">
          {`
            window.googletag = window.googletag || { cmd: [] };
            googletag.cmd.push(function() {
              googletag.defineSlot('/21743184043/calcolo.online1', ['fluid'], 'div-gpt-ad-1722880689489-0')
                .addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          `}
        </Script>

        {/* AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9476637732224939"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
