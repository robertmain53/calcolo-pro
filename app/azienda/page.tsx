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
         Calcolo.online:  Strumenti di Calcolo Professionali per Ingegneri, Periti e Commercialisti

        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Precisione, Efficienza e Affidabilità per le Vostre Esigenze Tecniche e Fiscali
        </p>


     
        <p><strong>Il Nostro Obiettivo: Potenziare la Vostra Professione</strong></p>
        <p>Nel mondo della progettazione, della consulenza tecnica e della gestione fiscale, l'accuratezza e l'efficienza non sono un'opzione, ma un requisito fondamentale. Ogni calcolo errato può comportare rischi strutturali, sanzioni economiche o inefficienze operative.</p>
        <p>Calcolo.online nasce per rispondere a questa precisa esigenza: fornire a ingegneri, periti, geometri, commercialisti e altri professionisti del settore tecnico e contabile una suite di strumenti di calcolo avanzati, affidabili e costantemente aggiornati secondo le normative vigenti.</p>
        <p><strong>La Nostra Missione: da Complessità a Efficienza Operativa</strong></p>
        <p>La nostra missione è trasformare complessi calcoli normativi e formule tecniche in soluzioni digitali intuitive e immediate. Vogliamo essere il partner di fiducia che vi permette di:</p>
        <ul>
        <li>
        <p><strong>Velocizzare il workflow:</strong> Ottenendo risultati precisi in pochi istanti.</p>
        </li>
        <li>
        <p><strong>Garantire la conformità:</strong> Basando le vostre analisi su strumenti allineati alle più recenti Norme Tecniche (NTC), Eurocodici e disposizioni fiscali.</p>
        </li>
        <li>
        <p><strong>Prendere decisioni strategiche:</strong> Con la sicurezza che deriva da dati accurati e validati.</p>
        </li>
        </ul>
        <p><strong>Le Nostre Aree di Specializzazione</strong></p>
        <p>La nostra libreria di calcolatori è in continua espansione e si concentra su aree di applicazione professionale:</p>
        <ul>
        <li>
        <p><strong>Ingegneria e Tecnica:</strong> Strumenti per il calcolo strutturale preliminare, la termotecnica, la geotecnica, i computi metrici e la verifica di elementi secondo le normative vigenti (es. NTC 2018, Eurocodici).</p>
        </li>
        <li>
        <p><strong>Fiscale e Contabile:</strong> Calcolatori per l'ammortamento dei beni strumentali, lo scorporo dell'IVA, il calcolo del ravvedimento operoso, l'analisi di indici di bilancio e la gestione della fiscalità d'impresa.</p>
        </li>
        <li>
        <p><strong>Professioni Tecniche (Periti e Geometri):</strong> Utility per stime immobiliari (metodo del costo, del mercato), calcoli catastali, tabelle millesimali e pratiche di successione.</p>
        </li>
        </ul>
        <p><strong>L'Esperienza e il Team Dietro Calcolo.online (Il nostro E-E-A-T)</strong></p>
        <p>Calcolo.online è un progetto strategico di <strong>Yeah Up Srl</strong> (P.IVA: IT02930760307), una digital company specializzata nello sviluppo di soluzioni software data-driven. La nostra forza risiede nella fusione di competenze verticali.</p>
        <p>Il nostro team è composto da:</p>
        <ul>
        <li>
        <p><strong>Esperti di Dominio:</strong> Collaboriamo attivamente con <strong>ingegneri civili e strutturali, dottori commercialisti e revisori contabili</strong> che validano la logica, le formule e la rispondenza normativa di ogni strumento.</p>
        </li>
        <li>
        <p><strong>Sviluppatori Senior:</strong> Ingegneri del software con esperienza specifica nel calcolo computazionale e nella creazione di interfacce utente chiare e funzionali, garantendo performance e sicurezza.</p>
        </li>
        <li>
        <p><strong>Analisti Normativi:</strong> Un team dedicato al monitoraggio costante della Gazzetta Ufficiale, delle circolari dell'Agenzia delle Entrate e delle nuove pubblicazioni normative (UNI, CEI) per garantire che i nostri tool siano sempre aggiornati.</p>
        </li>
        </ul>
        <p><strong>Il Nostro Impegno: Accuratezza e Affidabilità Verificabili</strong></p>
        <p>La vostra fiducia è il nostro asset più importante. La garantiamo attraverso un processo rigoroso:</p>
        <ol>
        <li>
        <p><strong>Fonti Normative Certificate:</strong> Ogni calcolatore cita esplicitamente le fonti normative e le metodologie scientifiche utilizzate (es. "Calcolato secondo il D.M. 17/01/2018", "Conforme alla circolare AdE N.XX/YYYY").</p>
        </li>
        <li>
        <p><strong>Validazione Incrociata:</strong> Prima della pubblicazione, ogni strumento viene testato e validato da professionisti del settore di riferimento, che ne certificano l'accuratezza rispetto a casi reali.</p>
        </li>
        <li>
        <p><strong>Aggiornamento Continuo e Tempestivo:</strong> Ci impegniamo ad aggiornare i calcolatori in concomitanza con ogni modifica normativa o fiscale rilevante, indicando chiaramente la data dell'ultimo aggiornamento.</p>
        </li>
        <li>
        <p><strong>Trasparenza Metodologica:</strong> Laddove applicabile, forniamo note tecniche che illustrano i passaggi logici e le ipotesi alla base del calcolo.</p>
        </li>
        </ol>
        <p><strong>Perché Scegliere Calcolo.online per la Vostra Professione?</strong></p>
        <ul>
        <li>
        <p><strong>Affidabilità Certificata:</strong> Affidatevi a strumenti basati su normative ufficiali e validati da esperti del vostro settore.</p>
        </li>
        <li>
        <p><strong>Efficienza Operativa:</strong> Risparmiate tempo prezioso automatizzando calcoli ricorrenti e complessi.</p>
        </li>
        <li>
        <p><strong>Accesso Immediato e Gratuito:</strong> Tutta la nostra suite di strumenti è disponibile senza costi, registrazioni o barriere all'ingresso.</p>
        </li>
        <li>
        <p><strong>Sviluppato da Professionisti per Professionisti:</strong> Parliamo la vostra lingua e comprendiamo le vostre sfide.</p>
        </li>
        <li>
        <p><strong>In Evoluzione con Voi:</strong> Ascoltiamo i feedback della community professionale per sviluppare nuovi tool che rispondano a esigenze concrete.</p>
        </li>
        </ul>
        <p><strong>Contatti e Suggerimenti</strong></p>
        <p>Il vostro contributo è fondamentale per la crescita di Calcolo.online. Avete bisogno di uno strumento che non è ancora presente? Avete suggerimenti per migliorare un calcolatore esistente o proporre una collaborazione?</p>
        <p>Email: info @ yeahup.srl</p>
        <p>Società: Yeah Up Srl</p>
        <p>Sede Legale: Via Monte Vodice, 33100 Udine (UD), Italia</p>
        <p>Partita IVA: IT02930760307</p>
      

    
      </section>
    </div>
  );
}
