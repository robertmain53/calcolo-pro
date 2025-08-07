// app/team/page.tsx
import React from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Azienda | Calcolo.online',
  description:
    'Incontra la company dietro Calcolo.online.',
};
export default function AziendaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm breadcrumbs">
          <ul className="flex space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">Company</li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <UserGroupIcon className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Il Nostro Team: Ing. Candido, MBA - Fondatore e Responsabile Editoriale di Calcolo.online
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Incontra le persone straordinarie che ogni giorno lavorano per rendere{' '}
          <strong>Calcolo.online</strong> la piattaforma di calcolatori più affidabile e innovativa d'Italia.
        </p>
        <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-600">

        
        <p><strong>Il Mio Impegno</strong></p>
        <p>La mia idea con Calcolo.online è fornire a colleghi ingegneri, periti, commercialisti e consulenti tecnici una piattaforma di calcolo che unisca rigore ingegneristico e conformità normativa. In un settore dove la precisione è un imperativo, il mio obiettivo è offrire strumenti che non solo accelerino il lavoro, ma che costituiscano anche un riferimento affidabile per le decisioni quotidiane.</p>
        <p>Ho sviluppato questa piattaforma per rispondere alle stesse esigenze che incontro nella mia attività professionale: la necessità di avere accesso immediato a calcoli complessi, basati su metodologie verificate e allineati con gli standard di settore.</p>
        <p><strong>Formazione ed Esperienze Professionali</strong></p>
        <p>La mia competenza si fonda su un solido percorso accademico e su una vasta esperienza sul campo.</p>
        <ul>
        <li>
        <p><strong>Ingegnere Gestionale</strong>, laureato presso l'Università degli Studi di Udine.</p>
        </li>
        <li>
        <p><strong>Master in Business Administration (MBA)</strong>, conseguito presso il MIB Trieste School of Management.</p>
        </li>
        <li>
        <p><strong>Perito Industriale in Elettrotecnica</strong>, diplomato presso l'I.T.I. A. Malignani di Udine.</p>
        </li>
        </ul>
        <p>La mia carriera professionale si estende per <strong>oltre 20 anni in ruoli tecnici e manageriali all'interno di contesti industriali e di editoria tecnica</strong>, dove ho gestito progetti complessi che richiedevano una profonda comprensione dei principi matematici, fisici e di business.</p>
        <p>Calcolo.online nasce nel 2018 non come un semplice progetto, ma come la sintesi di questo percorso: l'applicazione delle mie competenze di programmazione (JavaScript, Python, SQL) per risolvere problemi pratici e creare valore per la comunità professionale.</p>
        <p><strong>La Metodologia: il Rigore Ingegneristico al Vostro Servizio</strong></p>
        <p>La mia duplice natura, tecnica e gestionale, si riflette nell'approccio con cui ogni strumento viene progettato, sviluppato e mantenuto. L'affidabilità non è un'opzione, è il fondamento.</p>
        <ul>
        <li>
        <p><strong>Validazione delle Fonti:</strong> Ogni calcolatore si basa esclusivamente su formule scientifiche consolidate, normative tecniche (NTC, Eurocodici), disposizioni fiscali e standard industriali riconosciuti.</p>
        </li>
        <li>
        <p><strong>Test Rigorosi:</strong> Prima della pubblicazione, ogni algoritmo viene sottoposto a un intenso processo di testing e di confronto con benchmark noti per garantirne la correttezza in ogni scenario.</p>
        </li>
        <li>
        <p><strong>Revisione tra Pari:</strong> Il processo è rafforzato dalla revisione continua da parte degli esperti di dominio — ingegneri e commercialisti — che collaborano con il nostro team, come descritto nella pagina "Chi Siamo".</p>
        </li>
        <li>
        <p><strong>Manutenzione Proattiva:</strong> Mi impegno personalmente a monitorare le evoluzioni normative e tecnologiche per garantire che gli strumenti rimangano costantemente aggiornati e performanti.</p>
        </li>
        </ul>
        <p><strong>Un Impegno alla Trasparenza e al Miglioramento Continuo</strong></p>
        <p>La vostra fiducia è la metrica più importante del successo di questo progetto. Per questo garantisco la massima trasparenza operativa e la sicurezza della navigazione (crittografia HTTPS e Privacy Policy chiara).</p>
        <p>Il vostro feedback non è solo benvenuto, è una componente essenziale del processo di validazione e miglioramento. Segnalazioni di errori, suggerimenti per nuove funzionalità o richieste di chiarimenti sulle metodologie sono sempre prese in massima considerazione.</p>
        <p>Per qualsiasi comunicazione, potete contattarmi direttamente all'indirizzo: <strong>info [at] yeahup.net</strong>.</p>
        </div>
      </section>
    </div>
  );
}
